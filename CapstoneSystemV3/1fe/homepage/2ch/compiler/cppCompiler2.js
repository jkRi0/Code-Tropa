const fs = require('fs');
const code = fs.readFileSync('./misc/sampleCppCode.txt', 'utf-8').replace(/^\uFEFF/, '');

// === Simulation/Transformation Engine ===
const cppTypeValidators = {
    short: { min: -32768, max: 32767, integer: true },
    int: { min: -2147483648, max: 2147483647, integer: true },
    long: { min: -9223372036854775808, max: 9223372036854775807, integer: true },
    float: { integer: false },
    double: { integer: false },
    char: { kind: "char" },
    bool: { kind: "bool" },
    string: { kind: "string" },
    "std::string": { kind: "string" },
};
function sanitizeNumericSuffixes(rawValue) {
    return rawValue.replace(/(\d+(?:\.\d+)?)(?:[uU](?:ll|l)?|ll|LL|l|L|f|F)\b/g, "$1");
}
function evaluateNumericExpression(rawValue) {
    const sanitized = sanitizeNumericSuffixes(rawValue).replace(/\s+/g, " ").trim();
    if (!sanitized) return Number.NaN;
    if (!/^[0-9+\-*/().% \s]+$/.test(sanitized)) return Number.NaN;
    try {
        return Function(`return (${sanitized})`)();
    } catch {
        return Number.NaN;
    }
}
function validateInteger(value, { min, max }) {
    if (!Number.isFinite(value) || !Number.isInteger(value)) {
        return { isValid: false, message: "value must be an integer" };
    }
    if (value < min || value > max) {
        return { isValid: false, message: `value out of range (${min}..${max})` };
    }
    return { isValid: true };
}
function unquoteLiteral(literal) {
    const trimmed = literal.trim();
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
        return trimmed.slice(1, -1).replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\r/g, "\r");
    }
    return trimmed;
}
function validateCppLiteral(type, rawValue) {
    const normalizedType = type.replace(/\s+/g, " ").trim();
    const config = cppTypeValidators[normalizedType];
    if (!config) return { isValid: true };
    if (config.kind === "char") {
        const trimmed = rawValue.trim();
        if (!trimmed.startsWith("'") || !trimmed.endsWith("'") || trimmed.length < 3) {
            return { isValid: false, message: "char literal must use single quotes" };
        }
        const value = unquoteLiteral(trimmed);
        if (value.length !== 1) {
            return { isValid: false, message: "char literal must contain exactly one character" };
        }
        return { isValid: true };
    }
    if (config.kind === "bool") {
        const normalized = rawValue.trim().toLowerCase();
        if (normalized !== "true" && normalized !== "false") {
            return { isValid: false, message: "bool literal must be true or false" };
        }
        return { isValid: true };
    }
    if (config.kind === "string") {
        const trimmed = rawValue.trim();
        if (!trimmed.startsWith('"') || !trimmed.endsWith('"') || trimmed.length < 2) {
            return { isValid: false, message: "string literal must use double quotes" };
        }
        return { isValid: true };
    }
    const parsedValue = evaluateNumericExpression(rawValue);
    if (!Number.isFinite(parsedValue)) {
        return { isValid: false, message: "value must be numeric" };
    }
    if (config.integer) return validateInteger(parsedValue, config);
    return { isValid: true };
}
function extractCppDeclarations(source) {
    const typePattern = "(long\\s+long|short|int|long|float|double|char|bool|string|std::string)";
    const declarationRegex = new RegExp(`\\b${typePattern}\\s+([A-Za-z_]\\w*)\\s*=\\s*([^;]+);`, "g");
    const errors = [];
    let match;
    while ((match = declarationRegex.exec(source)) !== null) {
        const [_, type, name, rawValue] = match;
        const validation = validateCppLiteral(type, rawValue);
        if (!validation.isValid) {
            errors.push(`Invalid value for ${type} ${name}: ${validation.message}`);
        }
    }
    return { errors };
}
function findMatchingBrace(src, openIndex) {
    let depth = 0, inString = false, stringChar = null;
    for (let i = openIndex; i < src.length; i++) {
        const ch = src[i], prev = src[i - 1];
        if (inString) { if (ch === stringChar && prev !== "\\") { inString = false; stringChar = null; } continue; }
        if ((ch === '"' || ch === "'") && prev !== "\\") { inString = true; stringChar = ch; continue; }
        if (ch === '{') { depth++; continue; }
        if (ch === '}') { depth--; if (depth === 0) return i; }
    }
    return -1;
}
function findMatchingParen(src, openIndex) {
    let depth = 0, inString = false, stringChar = null;
    for (let i = openIndex; i < src.length; i++) {
        const ch = src[i], prev = src[i - 1];
        if (inString) { if (ch === stringChar && prev !== "\\") { inString = false; stringChar = null; } continue; }
        if ((ch === '"' || ch === "'") && prev !== "\\") { inString = true; stringChar = ch; continue; }
        if (ch === '(') { depth++; continue; }
        if (ch === ')') { depth--; if (depth === 0) return i; }
    }
    return -1;
}
function extractCppMainBody(source) {
    const mainPattern = /\bmain\s*\(/g;
    let match;
    while ((match = mainPattern.exec(source)) !== null) {
        const mainIndex = match.index;
        const charBefore = source[mainIndex - 1];
        if (charBefore && /[A-Za-z0-9_]/.test(charBefore)) continue;
        const openParenIndex = source.indexOf("(", mainIndex);
        if (openParenIndex === -1) continue;
        const closeParenIndex = findMatchingParen(source, openParenIndex);
        if (closeParenIndex === -1) continue;
        let cursor = closeParenIndex + 1;
        const skipWhitespace = () => { while (cursor < source.length && /\s/.test(source[cursor])) cursor++; };
        skipWhitespace();
        if (source.slice(cursor, cursor + 2) === "->") { cursor += 2; skipWhitespace(); while (cursor < source.length && /[A-Za-z0-9_<>\s:*&]/.test(source[cursor])) cursor++; skipWhitespace(); }
        if (source.slice(cursor, cursor + 8) === "noexcept") { cursor += 8; skipWhitespace(); }
        if (source[cursor] !== "{") continue;
        const braceEnd = findMatchingBrace(source, cursor);
        if (braceEnd === -1) return null;
        return source.slice(cursor + 1, braceEnd);
    }
    // Fallback
    const firstBrace = source.indexOf("{");
    const lastBrace = source.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        return source.slice(firstBrace + 1, lastBrace);
    }
    return null;
}
function splitCoutExpression(expr) {
    const parts = [];
    let current = "", inString = false, stringChar = null, depth = 0;
    for (let i = 0; i < expr.length; i++) {
        const ch = expr[i], next = expr[i + 1], prev = expr[i - 1];
        if (inString) { current += ch; if (ch === stringChar && prev !== "\\") { inString = false; stringChar = null; } continue; }
        if (ch === '"' || ch === "'") { inString = true; stringChar = ch; current += ch; continue; }
        if (ch === '(' || ch === '[' || ch === '{') { depth++; current += ch; continue; }
        if (ch === ')' || ch === ']' || ch === '}') { depth = Math.max(0, depth - 1); current += ch; continue; }
        if (ch === '<' && next === '<' && depth === 0) { if (current.trim()) parts.push(current.trim()); current = ""; i++; continue; }
        current += ch;
    }
    if (current.trim()) parts.push(current.trim());
    return parts;
}
function convertCoutStatements(source) {
    const coutRegex = /(?:std::)?cout\s*<<\s*([^;]+);/g;
    return source.replace(coutRegex, (_, expr) => {
        const tokens = splitCoutExpression(expr);
        const statements = tokens
            .map((token) => {
                if (/^(std::)?endl$/.test(token)) return "__coutEndl();";
                if (/^(std::)?boolalpha$/.test(token)) return "__coutSetBoolalpha(true);";
                if (/^(std::)?noboolalpha$/.test(token)) return "__coutSetBoolalpha(false);";
                return `__coutValue(() => (${token}), ${JSON.stringify(token)});`;
            })
            .join("\n");
        return statements;
    });
}
function transformCppBodyToJs(body) {
    let transformed = body;
    transformed = transformed.split("\n")
        .filter(line => !/^\s*#/.test(line) && !/^\s*using\s+namespace\s+.*;\s*$/.test(line) && !/^\s*(?:[a-zA-Z_][a-zA-Z0-9_<> ,\*&]*)\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\([^)]*\)\s*\{/.test(line.trim()))
        .join("\n");
    transformed = transformed.replace(/std::cout/g, "cout");
    transformed = transformed.replace(/std::endl/g, "endl");
    transformed = transformed.replace(/std::boolalpha/g, "boolalpha");
    transformed = transformed.replace(/std::noboolalpha/g, "noboolalpha");
    transformed = transformed.replace(
        /\b(long\s+long|short|int|long|float|double|char|bool|string|std::string)\s+([A-Za-z_]\w*)\s*=/g, "let $2 =");
    transformed = transformed.replace(/(\d+(?:\.\d+)?)(?:[uU](?:ll|l)?|ll|LL|l|L|f|F)\b/g, "$1");
    transformed = transformed.replace(/^(?!\s*(?:let|const|var)\b)\s*[a-zA-Z_][\w<>:]*\s+([a-zA-Z_][\w\[\]\.]*\s*=)/gm, "let $1");
    transformed = convertCoutStatements(transformed);
    return transformed;
}
function executeCppMain(source) {
    let body = extractCppMainBody(source);
    if (!body) {
        console.warn("[cppCompiler2] Could not extract main function body. Fallback to running all code block.");
        body = source;
        console.log("[cppCompiler2] Fallback JS body:", transformCppBodyToJs(body));
    }
    const jsBody = transformCppBodyToJs(body);
    const runner = new Function(
        'const __outputs = [];' +
        'let __lineBuffer = "";' +
        'const __errors = [];' +
        'const __expressionChecks = [];' +
        'const __coutState = { boolalpha: false };' +
        'const __recordError = (message) => { __errors.push(message); };' +
        'const __formatValue = (value) => { if (typeof value === "boolean") { return __coutState.boolalpha ? (value ? "true" : "false") : (value ? "1" : "0"); } return value ?? ""; };' +
        'const __classifyPlusExpression = (raw, value) => { if (!raw || raw.indexOf("+") === -1) { return ""; } if (typeof value === "number" && Number.isFinite(value)) { return "arithmetic"; } return "concatenation"; };' +
        'const __coutValue = (expressionFactory, rawExpr) => { if (__errors.length) { return; } try { const computed = expressionFactory(); const classification = __classifyPlusExpression(rawExpr, computed); if (classification) { __expressionChecks.push(`${rawExpr} => ${classification}`); } __lineBuffer += String(__formatValue(computed)); } catch (error) { __recordError(`Runtime error while evaluating \"${rawExpr}\": ${error.message}`); } };' +
        'const __coutEndl = () => { __outputs.push(__lineBuffer); __lineBuffer = ""; };' +
        'const __coutSetBoolalpha = (enabled) => { __coutState.boolalpha = !!enabled; };' +
        'const __flushPending = () => { if (__lineBuffer) { __outputs.push(__lineBuffer); __lineBuffer = ""; } };' +
        jsBody +
        '; __flushPending();' +
        'return { outputs: __outputs, errors: __errors, expressionChecks: __expressionChecks };'
    );
    return runner();
}
function simulateCppOutput(source) {
    const declarationResult = extractCppDeclarations(source);
    const collectedErrors = [...declarationResult.errors];
    if (collectedErrors.length === 0) {
        try {
            const execution = executeCppMain(source);
            collectedErrors.push(...execution.errors);
            if (collectedErrors.length === 0) {
                const lines = [...execution.outputs];
                if (execution.expressionChecks.length > 0) {
                    lines.push("");
                    lines.push("[Expression Analysis]");
                    execution.expressionChecks.forEach((entry) => lines.push(entry));
                }
                return lines.join("\n");
            }
        } catch (error) {
            collectedErrors.push(error.message);
        }
    }
    return collectedErrors.join("\n");
}
console.log(simulateCppOutput(code));




