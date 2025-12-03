// C# Compiler Simulation - Based on Java Compiler
// Adapts Java compiler logic for C# syntax and conventions

const csharpPrimitiveTypes = new Set([
    "byte",
    "sbyte",
    "short",
    "ushort",
    "int",
    "uint",
    "long",
    "ulong",
    "float",
    "double",
    "char",
    "bool",
]);

const csharpNonPrimitiveTypes = new Set(["string"]);

function getCsharpSourceLabel(src) {
    const classMatch = src.match(/\bclass\s+([A-Za-z_]\w*)/);
    const className = classMatch ? classMatch[1] : "Program";
    return `${className}.cs`;
}

function extractCsharpDeclarations(src) {
    const declarationPattern =
        /\b(byte|sbyte|short|ushort|int|uint|long|ulong|float|double|char|bool|string)\s+([A-Za-z_]\w*)\s*=\s*([^;]+);/g;
    const declarations = {};
    const errors = [];

    let match;
    while ((match = declarationPattern.exec(src)) !== null) {
        const [, type, name, value] = match;
        const trimmedValue = value.trim();

        // Only validate if the value is a simple literal
        if (
            /^[-+]?\d+$/.test(trimmedValue) || // Integer literal
            /^[-+]?\d*\.\d+$/.test(trimmedValue) || // Floating
            /^(["']).*\1$/.test(trimmedValue) || // Quoted string
            trimmedValue === "true" || trimmedValue === "false"
        ) {
            const validation = validateCsharpLiteral(type, trimmedValue);
            if (!validation.isValid) {
                errors.push(
                    `Invalid value for ${type} ${name}: ${validation.message}`,
                );
            }
            declarations[name] = {
                type,
                literal: trimmedValue,
                valueForPrinting: validation.printValue,
                jsValue: validation.jsValue,
                isValid: validation.isValid,
            };
        } else {
            // Do NOT validate expressions (e.g., x + y), just store
            declarations[name] = {
                type,
                literal: trimmedValue,
                valueForPrinting: trimmedValue,
                jsValue: null,
                isValid: true,
            };
        }
    }

    return { declarations, errors };
}

function unquoteLiteral(literal) {
    const trimmed = literal.trim();
    if (
        (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
        return trimmed
            .slice(1, -1)
            .replace(/\\n/g, "\n")
            .replace(/\\t/g, "\t")
            .replace(/\\r/g, "\r");
    }
    return trimmed;
}

function validateNumericRange(value, min, max, typeLabel) {
    if (!Number.isFinite(value) || !Number.isInteger(value)) {
        return {
            isValid: false,
            message: `${typeLabel} must be an integer`,
        };
    }

    if (value < min || value > max) {
        return {
            isValid: false,
            message: `${typeLabel} out of range (${min}..${max})`,
        };
    }

    return { isValid: true };
}

function stripSuffix(raw, suffixes = []) {
    const trimmed = raw.trim();
    if (suffixes.length === 0) return trimmed;
    const lastChar = trimmed.slice(-1).toLowerCase();
    if (suffixes.includes(lastChar)) {
        return trimmed.slice(0, -1);
    }
    return trimmed;
}

function evaluateMathExpression(rawValue) {
    const normalized = rawValue
        .replace(/([0-9])([lLfF])/g, "$1")
        .replace(/\s+/g, " ")
        .trim();

    if (!normalized) {
        return Number.NaN;
    }

    if (!/^[0-9+\-*/().% \s]+$/.test(normalized)) {
        return Number.NaN;
    }

    try {
        const evaluator = new Function(`"use strict"; return (${normalized});`);
        const result = evaluator();
        if (typeof result === "number" && Number.isFinite(result)) {
            return result;
        }
    } catch {
        // Ignore evaluation errors and fall back to NaN
    }

    return Number.NaN;
}

function parseNumericLiteral(rawValue, suffixes = []) {
    const stripped = stripSuffix(rawValue, suffixes);
    const direct = Number(stripped);
    if (!Number.isNaN(direct)) {
        return direct;
    }
    return evaluateMathExpression(stripped);
}

function validateCsharpLiteral(type, rawValue) {
    const result = {
        isValid: true,
        message: "",
        jsValue: null,
        printValue: rawValue,
    };

    const normalizedBoolean = rawValue.toLowerCase();

    switch (type) {
        case "byte": {
            const parsed = parseNumericLiteral(rawValue);
            const validation = validateNumericRange(parsed, 0, 255, "byte");
            if (!validation.isValid) {
                return { ...result, ...validation };
            }
            return {
                ...result,
                jsValue: parsed,
                printValue: String(parsed),
            };
        }
        case "sbyte": {
            const parsed = parseNumericLiteral(rawValue);
            const validation = validateNumericRange(parsed, -128, 127, "sbyte");
            if (!validation.isValid) {
                return { ...result, ...validation };
            }
            return {
                ...result,
                jsValue: parsed,
                printValue: String(parsed),
            };
        }
        case "short": {
            const parsed = parseNumericLiteral(rawValue);
            const validation = validateNumericRange(parsed, -32768, 32767, "short");
            if (!validation.isValid) {
                return { ...result, ...validation };
            }
            return {
                ...result,
                jsValue: parsed,
                printValue: String(parsed),
            };
        }
        case "ushort": {
            const parsed = parseNumericLiteral(rawValue);
            const validation = validateNumericRange(parsed, 0, 65535, "ushort");
            if (!validation.isValid) {
                return { ...result, ...validation };
            }
            return {
                ...result,
                jsValue: parsed,
                printValue: String(parsed),
            };
        }
        case "int":
        case "uint": {
            const parsed = parseNumericLiteral(rawValue);
            const validation = validateNumericRange(
                parsed,
                -2147483648,
                2147483647,
                "int",
            );
            if (!validation.isValid) {
                return { ...result, ...validation };
            }
            return {
                ...result,
                jsValue: parsed,
                printValue: String(parsed),
            };
        }
        case "long":
        case "ulong": {
            const parsed = parseNumericLiteral(rawValue, ["l", "L"]);
            if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) {
                return {
                    ...result,
                    isValid: false,
                    message: "long must be an integer literal",
                };
            }
            return {
                ...result,
                jsValue: parsed,
                printValue: String(parsed),
            };
        }
        case "float": {
            const parsed = parseNumericLiteral(rawValue, ["f", "F"]);
            if (!Number.isFinite(parsed)) {
                return {
                    ...result,
                    isValid: false,
                    message: "float must be numeric",
                };
            }
            return {
                ...result,
                jsValue: parsed,
                printValue: String(parsed),
            };
        }
        case "double": {
            const parsed = parseNumericLiteral(rawValue);
            if (!Number.isFinite(parsed)) {
                return {
                    ...result,
                    isValid: false,
                    message: "double must be numeric",
                };
            }
            return {
                ...result,
                jsValue: parsed,
                printValue: String(parsed),
            };
        }
        case "char": {
            const trimmed = rawValue.trim();
            if (
                !trimmed.startsWith("'") ||
                !trimmed.endsWith("'") ||
                trimmed.length < 3
            ) {
                return {
                    ...result,
                    isValid: false,
                    message: "char must use single quotes",
                };
            }
            const charValue = unquoteLiteral(trimmed);
            if (charValue.length !== 1) {
                return {
                    ...result,
                    isValid: false,
                    message: "char must be exactly one character",
                };
            }
            return {
                ...result,
                jsValue: charValue,
                printValue: charValue,
            };
        }
        case "bool": {
            if (normalizedBoolean !== "true" && normalizedBoolean !== "false") {
                return {
                    ...result,
                    isValid: false,
                    message: "bool must be true or false",
                };
            }
            return {
                ...result,
                jsValue: normalizedBoolean === "true",
                printValue: normalizedBoolean,
            };
        }
        case "string": {
            const trimmed = rawValue.trim();
            if (
                !trimmed.startsWith('"') ||
                !trimmed.endsWith('"') ||
                trimmed.length < 2
            ) {
                return {
                    ...result,
                    isValid: false,
                    message: "string must use double quotes",
                };
            }
            const strValue = unquoteLiteral(trimmed);
            return {
                ...result,
                jsValue: strValue,
                printValue: strValue,
            };
        }
        default:
            return result;
    }
}

function findInvalidConsoleCalls(src, sourceLabel = "Program.cs") {
    const invalidCalls = [];
    const consolePattern = /Console\.([A-Za-z_]\w*)\s*\(/g;
    let match;

    while ((match = consolePattern.exec(src)) !== null) {
        const method = match[1];
        if (method !== "Write" && method !== "WriteLine") {
            const line = src.slice(0, match.index).split("\n").length;
            invalidCalls.push(
                `${sourceLabel}:${line}: error: Unsupported Console method "${method}". Only Write and WriteLine are supported.`,
            );
        }
    }

    return invalidCalls;
}

function extractCsharpMainMethodBody(src) {
    // C# Main can be: static void Main(string[] args) or static void Main() or static int Main(string[] args)
    const mainPatterns = [
        /static\s+(?:void|int)\s+Main\s*\(\s*(?:string\s*\[\s*\]\s+\w+\s*)?\)/i,
    ];
    
    for (const pattern of mainPatterns) {
        const match = src.match(pattern);
        if (match) {
            const mainIndex = match.index;
            const braceStart = src.indexOf("{", mainIndex);
            if (braceStart === -1) {
                return null;
            }
            const braceEnd = findMatchingBrace(src, braceStart);
            if (braceEnd === -1) {
                return null;
            }
            return src.slice(braceStart + 1, braceEnd);
        }
    }
    
    return null;
}

function findMatchingBrace(src, openBraceIndex) {
    let depth = 0;
    let inString = false;
    let stringChar = null;

    for (let i = openBraceIndex; i < src.length; i++) {
        const ch = src[i];
        const prev = src[i - 1];

        if (inString) {
            if (ch === stringChar && prev !== "\\") {
                inString = false;
                stringChar = null;
            }
            continue;
        }

        if ((ch === '"' || ch === "'") && prev !== "\\") {
            inString = true;
            stringChar = ch;
            continue;
        }

        if (ch === "{") {
            depth += 1;
            continue;
        }

        if (ch === "}") {
            depth -= 1;
            if (depth === 0) {
                return i;
            }
        }
    }

    return -1;
}

function escapeNewlinesInStringLiterals(source) {
    let result = "";
    let inString = false;
    let stringChar = null;

    for (let i = 0; i < source.length; i++) {
        const ch = source[i];
        const prev = source[i - 1];

        if (inString) {
            if (ch === "\n") {
                result += "\\n";
                continue;
            }
            if (ch === "\r") {
                result += "\\r";
                continue;
            }
            if (ch === stringChar && prev !== "\\") {
                inString = false;
                stringChar = null;
            }
            result += ch;
            continue;
        }

        if ((ch === '"' || ch === "'") && prev !== "\\") {
            inString = true;
            stringChar = ch;
            result += ch;
            continue;
        }

        result += ch;
    }

    return result;
}

const CSHARP_TYPES_PATTERN =
    "byte|sbyte|short|ushort|int|uint|long|ulong|float|double|char|bool|string";

function convertMultiDimArrayDeclarations(source) {
    const multiPattern = new RegExp(
        `(\\s*)(${CSHARP_TYPES_PATTERN})(?:\\s*\\[\\s*\\])+\\s+([A-Za-z_]\\w*)\\s*=\\s*(\\{[\\s\\S]*?\\})\\s*;`,
        "g",
    );

    return source.replace(multiPattern, (_, indent, type, name, initializer) => {
        const convertedInitializer = initializer.replace(/\{/g, "[").replace(/\}/g, "]");
        return `${indent}let ${name} = __wrapArray(${convertedInitializer}, "${type}");`;
    });
}

function convertArrayDeclarations(source) {
    const arrayPattern = new RegExp(
        `(\\s*)(${CSHARP_TYPES_PATTERN})\\s*\\[\\s*\\]\\s+([A-Za-z_]\\w*)\\s*=\\s*\\{([\\s\\S]*?)\\};`,
        "g",
    );

    return source.replace(arrayPattern, (_, indent, type, name, values) => {
        const normalizedValues = values.replace(/\s*\n\s*/g, " ").trim();
        return `${indent}let ${name} = __wrapArray([${normalizedValues}], "${type}");`;
    });
}

function convertForeachLoops(source) {
    // C# foreach: foreach (type var in collection)
    // We need to match the foreach pattern carefully, handling both single-line and multi-line cases
    // Pattern: foreach (type var in collection) or foreach (var var in collection)
    
    let result = source;
    let changed = true;
    let iterations = 0;
    
    while (changed && iterations < 20) {
        iterations++;
        changed = false;
        const before = result;
        
        // Match foreach with type: foreach (int num in array)
        const foreachWithType = new RegExp(
            `foreach\\s*\\(\\s*(${CSHARP_TYPES_PATTERN})\\s+([A-Za-z_]\\w*)\\s+in\\s+([A-Za-z_][A-Za-z0-9_]*)\\s*\\)`,
            "g",
        );
        
        result = result.replace(foreachWithType, (match, type, iterator, iterable) => {
            changed = true;
            return `for (const ${iterator} of ${iterable})`;
        });
        
        // Match foreach with var: foreach (var item in collection)
        const foreachWithVar = new RegExp(
            `foreach\\s*\\(\\s*var\\s+([A-Za-z_]\\w*)\\s+in\\s+([A-Za-z_][A-Za-z0-9_]*)\\s*\\)`,
            "g",
        );
        
        result = result.replace(foreachWithVar, (match, iterator, iterable) => {
            changed = true;
            return `for (const ${iterator} of ${iterable})`;
        });
        
        if (result === before) {
            changed = false;
        }
    }
    
    return result;
}

function convertArrayInstantiations(source) {
    const singleDimPattern = new RegExp(
        `new\\s+(${CSHARP_TYPES_PATTERN})\\s*\\[\\s*([^\\]\\[]+)\\s*\\]`,
        "g",
    );

    return source.replace(
        singleDimPattern,
        (_, type, size) => `__createArray("${type}", ${size.trim()})`,
    );
}

function convertCsharpMultiDimArrayDeclarations(source) {
    // Handle C# rectangular arrays: int[,] matrix = { {1,2}, {3,4} };
    // Pattern matches: type[,] or type[,,] etc.
    const rectArrayPattern = new RegExp(
        `(\\s*)(${CSHARP_TYPES_PATTERN})\\s*\\[\\s*,\\s*\\]\\s+([A-Za-z_]\\w*)\\s*=\\s*(\\{[\\s\\S]*?\\})\\s*;`,
        "g",
    );

    return source.replace(rectArrayPattern, (match, indent, type, name, initializer) => {
        // Convert C# rectangular array syntax to JavaScript nested arrays
        // { {1,2,3}, {4,5,6} } -> [[1,2,3], [4,5,6]]
        let converted = initializer.trim();
        // Remove outer braces
        if (converted.startsWith('{') && converted.endsWith('}')) {
            converted = converted.slice(1, -1).trim();
        }
        // Replace inner braces with brackets, being careful about nested structures
        // Process from inside out by replacing innermost braces first
        let changed = true;
        let iterations = 0;
        while (changed && iterations < 50) {
            iterations++;
            const before = converted;
            // Replace innermost { } pairs with [ ]
            converted = converted.replace(/\{([^{}]*)\}/g, '[$1]');
            changed = (before !== converted);
        }
        // Wrap the entire thing in brackets
        converted = `[${converted}]`;
        return `${indent}let ${name} = __wrapArray(${converted}, "${type}");`;
    });
}

function convertCommaArrayAccess(source) {
    // Convert C# comma-separated array access: matrix[i, j] -> matrix[i][j]
    // This handles multi-dimensional array access
    // We need to be very careful to only match actual array access, not declarations
    let result = source;
    let lastResult = "";
    let iterations = 0;
    const maxIterations = 50; // Safety limit
    
    // Helper to check if match is a type declaration
    function isTypeDeclaration(text, offset) {
        if (offset <= 0) return false;
        const before = text.substring(Math.max(0, offset - 50), offset);
        return /\b(byte|sbyte|short|ushort|int|uint|long|ulong|float|double|char|bool|string|var|let)\s+[A-Za-z_]\w*\s*\[/.test(before);
    }
    
    // Match variable indices: matrix[i, j]
    // Skip if already converted (contains ][)
    const varPattern = /\b([A-Za-z_]\w*)\s*\[\s*([A-Za-z_]\w*)\s*,\s*([A-Za-z_]\w*)\s*\]/g;
    result = result.replace(varPattern, (match, arrayName, index1, index2, offset) => {
        // Check if already converted
        const context = result.substring(Math.max(0, offset - 2), Math.min(result.length, offset + match.length + 2));
        if (context.includes('][')) return match;
        if (isTypeDeclaration(source, offset)) return match;
        return `${arrayName}[${index1}][${index2}]`;
    });
    
    // Match numeric indices: matrix[0, 1]
    const numPattern = /\b([A-Za-z_]\w*)\s*\[\s*(\d+)\s*,\s*(\d+)\s*\]/g;
    result = result.replace(numPattern, (match, arrayName, index1, index2, offset) => {
        const context = result.substring(Math.max(0, offset - 2), Math.min(result.length, offset + match.length + 2));
        if (context.includes('][')) return match;
        if (isTypeDeclaration(source, offset)) return match;
        return `${arrayName}[${index1}][${index2}]`;
    });
    
    // Match mixed: matrix[i, 0] or matrix[0, j]
    const mixedPattern = /\b([A-Za-z_]\w*)\s*\[\s*([A-Za-z_]\w*)\s*,\s*(\d+)\s*\]|\b([A-Za-z_]\w*)\s*\[\s*(\d+)\s*,\s*([A-Za-z_]\w*)\s*\]/g;
    result = result.replace(mixedPattern, (match, arr1, idx1a, idx2a, arr2, idx1b, idx2b, offset) => {
        const context = result.substring(Math.max(0, offset - 2), Math.min(result.length, offset + match.length + 2));
        if (context.includes('][')) return match;
        if (isTypeDeclaration(source, offset)) return match;
        const arrayName = arr1 || arr2;
        const idx1 = idx1a || idx1b;
        const idx2 = idx2a || idx2b;
        return `${arrayName}[${idx1}][${idx2}]`;
    });
    
    return result;
}

function transformCsharpBodyToJs(body) {
    let transformed = body;
    // Convert C# rectangular arrays (int[,]) before jagged arrays (int[][])
    transformed = convertCsharpMultiDimArrayDeclarations(transformed);
    transformed = convertMultiDimArrayDeclarations(transformed);
    transformed = convertArrayDeclarations(transformed);
    transformed = convertForeachLoops(transformed);
    transformed = convertArrayInstantiations(transformed);
    // Convert comma-separated array access (matrix[i, j]) to bracket notation (matrix[i][j])
    transformed = convertCommaArrayAccess(transformed);
    transformed = transformed.replace(/Console\.WriteLine/g, "__println");
    transformed = transformed.replace(/Console\.Write/g, "__print");
    // Replace declarations with initialization
    const baseTypePattern = `(?:${CSHARP_TYPES_PATTERN})`;
    // Handle rectangular array declarations: int[,] arr = ...
    transformed = transformed.replace(
        new RegExp(
            `\\b${baseTypePattern}\\s*\\[\\s*,\\s*\\]\\s+([A-Za-z_]\\w*)(\\s*=[^;]+?;)`,
            "g",
        ),
        "let $1$2",
    );
    // Convert variable declarations, but be careful not to match inside for loops incorrectly
    // We'll do this in two passes: first handle standalone declarations, then for loop declarations
    transformed = transformed.replace(
        new RegExp(
            `\\b${baseTypePattern}(?:\\s*\\[\\s*\\])*\\s+([A-Za-z_]\\w*)(\\s*=[^;]+?;)`,
            "g",
        ),
        (match, varName, assignment, offset) => {
            // Check if this is inside a for loop - if so, handle it differently
            const before = transformed.substring(Math.max(0, offset - 20), offset);
            if (before.includes('for (')) {
                // In a for loop, just replace the type, keep the rest
                return `let ${varName}${assignment}`;
            }
            return `let ${varName}${assignment}`;
        },
    );
    // Replace declarations without initialization (including arrays)
    transformed = transformed.replace(
        new RegExp(`\\b${baseTypePattern}\\s*\\[\\s*,\\s*\\]\\s+([A-Za-z_]\\w*)\\s*;`, "g"),
        "let $1;",
    );
    transformed = transformed.replace(
        new RegExp(`\\b${baseTypePattern}(?:\\s*\\[\\s*\\])*\\s+([A-Za-z_]\\w*)\\s*;`, "g"),
        "let $1;",
    );
    transformed = transformed.replace(/(\d+)[lL]\b/g, "$1");
    transformed = transformed.replace(/(\d+(?:\.\d+)?)[fF]\b/g, "$1");
    transformed = escapeNewlinesInStringLiterals(transformed);
    return transformed;
}

function wrapMethodReturnStatements(body, method, sourceLabel) {
    const errors = [];
    const returnRegex = /return(?:\s+([^;]*))?;/g;
    let hasReturn = false;
    const linePrefix = method.line ? `${sourceLabel}:${method.line}: ` : `${sourceLabel}: `;

    const replaced = body.replace(returnRegex, (_, expr = "") => {
        const trimmedExpr = expr.trim();
        if (method.returnType === "void") {
            if (trimmedExpr) {
                errors.push(
                `${linePrefix}error: cannot return a value from method ${method.name}() whose return type is void`,
                );
            }
            return "return;";
        }

        hasReturn = true;
        if (!trimmedExpr) {
            errors.push(
                `${linePrefix}error: method ${method.name}() must return a value of type ${method.returnType}`,
            );
            return `return __validateMethodReturn("${method.name}", "${method.returnType}", undefined, ${method.line ||
                0});`;
        }

        return `return __validateMethodReturn("${method.name}", "${method.returnType}", ${trimmedExpr}, ${method.line ||
            0});`;
    });

    if (method.returnType !== "void" && !hasReturn) {
        errors.push(
            `${linePrefix}error: missing return statement in method ${method.name} with return type ${method.returnType}`,
        );
    }

    return { body: replaced, errors };
}

function extractCsharpMethodDefinitions(src) {
    const methods = [];
    // C# method pattern: [access] [static] returnType methodName(params) {
    const methodPattern =
        /(public|private|protected|internal)?\s*(static\s+)?([A-Za-z0-9_<>\[\]]+)\s+([A-Za-z_]\w*)\s*\(([^)]*)\)\s*\{/g;
    let match;

    while ((match = methodPattern.exec(src)) !== null) {
        const name = match[4];
        if (name === "Main") {
            continue;
        }
        const methodStartIndex = match.index;
        const line =
            src
                .slice(0, methodStartIndex)
                .split("\n").length;
        const braceStart = methodPattern.lastIndex - 1;
        const braceEnd = findMatchingBrace(src, braceStart);
        if (braceEnd === -1) {
            break;
        }
        const paramsRaw = match[5] || "";
        const accessModifier = (match[1] || "").trim();
        methods.push({
            name,
            params: paramsRaw,
            body: src.slice(braceStart + 1, braceEnd),
            access: accessModifier || "internal",
            isStatic: Boolean(match[2]),
            returnType: (match[3] || "").trim(),
            line,
        });
        methodPattern.lastIndex = braceEnd + 1;
    }

    return methods;
}

function convertCsharpMethodParameters(paramList) {
    if (!paramList || !paramList.trim()) {
        return "";
    }

    return paramList
        .split(",")
        .map((segment) => {
            const clean = segment.replace(/\s+/g, " ").trim();
            if (!clean) {
                return "";
            }
            // C# params: type name or type[] name
            const tokens = clean.split(/\s+/);
            const last = tokens[tokens.length - 1] || "";
            return last.replace(/\[\]/g, "");
        })
        .filter(Boolean)
        .join(", ");
}

function indentLines(code, indent = "    ") {
    return code
        .split("\n")
        .map((line) => {
            if (!line.trim()) {
                return line;
            }
            return `${indent}${line}`;
        })
        .join("\n");
}

function validateCsharpReturnTypeName(returnType, methodName, lineNumber, sourceLabel) {
    const validTypes = new Set([
        "byte",
        "sbyte",
        "short",
        "ushort",
        "int",
        "uint",
        "long",
        "ulong",
        "float",
        "double",
        "char",
        "bool",
        "void",
        "string",
    ]);

    const trimmed = (returnType || "").trim();
    const prefix = lineNumber ? `${sourceLabel}:${lineNumber}: ` : `${sourceLabel}: `;

    if (!trimmed) {
        return `${prefix}error: invalid return type for method ${methodName}()`;
    }

    if (!validTypes.has(trimmed)) {
        const lower = trimmed.toLowerCase();
        if (lower === "string" && trimmed !== "string") {
            return `${prefix}error: The type or namespace name '${trimmed}' could not be found (did you mean 'string'?)`;
        }
        if (lower === "boolean") {
            return `${prefix}error: The type or namespace name 'boolean' could not be found (did you mean 'bool'?)`;
        }
        return `${prefix}error: The type or namespace name '${trimmed}' could not be found`;
    }

    return null;
}

function convertCsharpMethodsToJs(src, sourceLabel) {
    const methods = extractCsharpMethodDefinitions(src);
    const conversionErrors = [];

    methods.forEach((method) => {
        const typeError = validateCsharpReturnTypeName(method.returnType, method.name, method.line, sourceLabel);
        if (typeError) {
            conversionErrors.push(typeError);
        }
    });

    const code = methods
        .map((method) => {
            const paramsJs = convertCsharpMethodParameters(method.params);
            const transformedBody = transformCsharpBodyToJs(method.body).trim();
            const { body, errors } = wrapMethodReturnStatements(transformedBody, method, sourceLabel);
            conversionErrors.push(...errors);
            const indentedBody = body ? indentLines(body) : "";
            return `function ${method.name}(${paramsJs}) {\n${indentedBody}\n}\n`;
        })
        .join("\n");

    return {
        code,
        metadata: methods.map((method) => ({
            name: method.name,
            params: method.params,
            access: method.access,
            isStatic: method.isStatic,
            returnType: method.returnType,
        })),
        errors: conversionErrors,
    };
}

function normalizeParamSignature(params) {
    if (!params) {
        return "";
    }
    return params
        .split(",")
        .map((segment) => segment.replace(/\s+/g, " ").trim())
        .filter(Boolean)
        .join(", ");
}

function findStaticInvocationErrors(mainBody, methods, sourceLabel) {
    const errors = [];

    methods.forEach((method) => {
        if (method.isStatic) {
            return;
        }
        const pattern = new RegExp(`(^|[^.\\w])${method.name}\\s*\\(`, "m");
        pattern.lastIndex = 0;
        if (pattern.test(mainBody)) {
            const paramsSignature = normalizeParamSignature(method.params);
            errors.push(
                `${sourceLabel}: error: An object reference is required for the non-static field, method, or property '${method.name}'`,
            );
        }
    });

    return errors;
}

function executeCsharpMain(src, sourceLabel) {
    const mainBody = extractCsharpMainMethodBody(src);
    if (!mainBody) {
        throw new Error(`Error: "Main" method not found in class, please define the main method as: static void Main(string[] args)`);
    }

    const methodConversion = convertCsharpMethodsToJs(src, sourceLabel);
    const methodErrors = [...methodConversion.errors];
    const staticInvocationErrors = findStaticInvocationErrors(
        mainBody,
        methodConversion.metadata,
        sourceLabel,
    );
    const combinedErrors = [...methodErrors, ...staticInvocationErrors];
    if (combinedErrors.length > 0) {
        return {
            outputs: [],
            methods: methodConversion.metadata,
            errors: combinedErrors,
        };
    }

    const jsBody = transformCsharpBodyToJs(mainBody);
    if (typeof process !== "undefined" && process.env && process.env.DEBUG_JS_BODY) {
        console.log("=== TRANSFORMED MAIN BODY ===");
        console.log(jsBody);
        console.log("=== END TRANSFORMED MAIN BODY ===");
    }

    try {
        // Log the transformed code for debugging
        if (typeof window !== "undefined" && window.DEBUG_CSHARP) {
            console.log("=== TRANSFORMED C# CODE ===");
            console.log(jsBody);
            console.log("=== END ===");
        }
        const prefix = `
            const outputs = [];
            let currentLine = "";
            const __sourceLabel = ${JSON.stringify(sourceLabel)};
            const __print = (value = "") => {
                currentLine += String(value ?? "");
            };
            const __println = (value = "") => {
                outputs.push(currentLine + String(value ?? ""));
                currentLine = "";
            };
            const __arrayBoundsError = (index, length) => {
                throw new Error(\`\${__sourceLabel}: error: IndexOutOfRangeException: Index was outside the bounds of the array. Index: \${index}, Length: \${length}\`);
            };
            const __isArrayIndex = (prop) => {
                if (typeof prop === "symbol") return false;
                if (prop === "") return false;
                const key = String(prop);
                if (!/^-?\\d+$/.test(key)) return false;
                return true;
            };
            const __wrappedArrayToken = Symbol("csharpArrayProxy");
            const __wrapArray = (arrayInstance, type = "") => {
                if (!Array.isArray(arrayInstance)) {
                    return arrayInstance;
                }
                if (arrayInstance[__wrappedArrayToken]) {
                    return arrayInstance[__wrappedArrayToken];
                }
                for (let i = 0; i < arrayInstance.length; i++) {
                    if (Array.isArray(arrayInstance[i])) {
                        arrayInstance[i] = __wrapArray(arrayInstance[i], type);
                    }
                }
                const handler = {
                    get(target, prop, receiver) {
                        if (prop === "__isCsharpArray") return true;
                        if (prop === "Length") {
                            return target.length;
                        }
                        if (prop === "length") {
                            return target.length;
                        }
                        if (prop === Symbol.iterator) {
                            return function* iterator() {
                                for (let i = 0; i < target.length; i++) {
                                    yield target[i];
                                }
                            };
                        }
                        if (typeof prop === "symbol") {
                            return Reflect.get(target, prop, receiver);
                        }
                        if (__isArrayIndex(prop)) {
                            const index = Number(prop);
                            if (!Number.isInteger(index) || index < 0 || index >= target.length) {
                                __arrayBoundsError(index, target.length);
                            }
                            const value = target[index];
                            if (Array.isArray(value) && !value[__wrappedArrayToken]) {
                                target[index] = __wrapArray(value, type);
                                return target[index];
                            }
                            return value;
                        }
                        const value = Reflect.get(target, prop, receiver);
                        if (typeof value === "function") {
                            const methodName = String(prop);
                            if (methodName === "push" || methodName === "pop" || methodName === "shift" || methodName === "unshift" || methodName === "splice") {
                                return () => {
                                    throw new Error(\`\${__sourceLabel}: error: C# arrays have fixed length; method \${methodName}() is not supported\`);
                                };
                            }
                            return value.bind(target);
                        }
                        return value;
                    },
                    set(target, prop, value) {
                        if (prop === "Length" || prop === "length") {
                            throw new Error(\`\${__sourceLabel}: error: cannot assign to the Length of a C# array\`);
                        }
                        if (__isArrayIndex(prop)) {
                            const index = Number(prop);
                            if (!Number.isInteger(index) || index < 0 || index >= target.length) {
                                __arrayBoundsError(index, target.length);
                            }
                            const normalized = Array.isArray(value)
                                ? __wrapArray(value, type)
                                : value;
                            target[index] = normalized;
                            return true;
                        }
                        target[prop] = value;
                        return true;
                    },
                };
                const proxy = new Proxy(arrayInstance, handler);
                Object.defineProperty(arrayInstance, __wrappedArrayToken, {
                    value: proxy,
                    writable: false,
                    configurable: false,
                    enumerable: false,
                });
                return proxy;
            };
            const __defaultArrayValue = (type) => {
                const normalized = (type || "").trim();
                switch (normalized) {
                    case "byte":
                    case "sbyte":
                    case "short":
                    case "ushort":
                    case "int":
                    case "uint":
                    case "long":
                    case "ulong":
                    case "float":
                    case "double":
                        return 0;
                    case "bool":
                        return false;
                    case "char":
                        return "\\u0000";
                    case "string":
                        return null;
                    default:
                        return null;
                }
            };
            const __createArray = (type, lengthValue) => {
                const length = Number(lengthValue);
                if (!Number.isFinite(length) || !Number.isInteger(length) || length < 0) {
                    throw new Error(\`\${__sourceLabel}: error: invalid array size specified\`);
                }
                const backing = Array.from({ length }, () => __defaultArrayValue(type));
                return __wrapArray(backing, type);
            };
            const __numericTypes = ["byte","sbyte","short","ushort","int","uint","long","ulong","float","double"];
            const __integerTypes = ["byte","sbyte","short","ushort","int","uint","long","ulong"];
            const __describeJsType = (value) => {
                if (value === null) return "null";
                if (value === undefined) return "undefined";
                if (Number.isNaN(value)) return "NaN";
                if (typeof value === "string") return "string";
                if (typeof value === "number") return Number.isInteger(value) ? "int" : "double";
                if (typeof value === "boolean") return "bool";
                return typeof value;
            };
            const __checkReturnType = (expectedType, value) => {
                const normalized = (expectedType || "").trim();
                const lower = normalized.toLowerCase();
                if (normalized === "void") {
                    if (typeof value !== "undefined") {
                        return "void method cannot return a value";
                    }
                    return "";
                }
                if (__numericTypes.includes(lower)) {
                    if (typeof value !== "number" || !Number.isFinite(value)) {
                        return \`incompatible return type: expected \${expectedType} but received \${__describeJsType(value)}\`;
                    }
                    if (__integerTypes.includes(lower) && !Number.isInteger(value)) {
                        return \`incompatible return type: expected integer-compatible type \${expectedType} but received \${value}\`;
                    }
                    return "";
                }
                if (normalized === "bool") {
                    if (typeof value !== "boolean") {
                        return \`incompatible return type: expected \${normalized} but received \${__describeJsType(value)}\`;
                    }
                    return "";
                }
                if (normalized === "char") {
                    if (typeof value !== "string" || value.length !== 1) {
                        return "incompatible return type: expected char but received value that is not a single character";
                    }
                    return "";
                }
                if (normalized === "string") {
                    if (typeof value !== "string") {
                        return "incompatible return type: expected string but received " + __describeJsType(value);
                    }
                    return "";
                }
                return "";
            };
            const __validateMethodReturn = (methodName, expectedType, value, lineNumber = 0) => {
                const error = __checkReturnType(expectedType, value);
                if (error) {
                    const linePrefix = lineNumber ? \`\${__sourceLabel}:\${lineNumber}:\` : \`\${__sourceLabel}:\`;
                    throw new Error(\`\${linePrefix} error: \${error} in method \${methodName}()\`);
                }
                return value;
            };
        `;
        const suffix = `
            if (currentLine) {
                outputs.push(currentLine);
            }
            return outputs;
        `;
        // Create the full code to execute
        const fullCode = `${prefix}${methodConversion.code}\n${jsBody}${suffix}`;
        
        // Log for debugging - always log on error to help diagnose
        const shouldDebug = typeof window !== "undefined" && (window.DEBUG_CSHARP || true); // Temporarily always true for debugging
        if (shouldDebug) {
            // console.log("=== TRANSFORMED JS BODY ===");
            // console.log(jsBody);
            // console.log("=== METHOD CODE ===");
            // console.log(methodConversion.code);
            // console.log("=== END DEBUG ===");
        }
        
        let runner;
        try {
            runner = new Function(fullCode);
        } catch (funcError) {
            // Parse the error to extract line number and provide better error message
            const errorMsg = funcError.message || String(funcError);
            let detailedError = `Syntax error in generated JavaScript: ${errorMsg}`;
            
            // Try to extract line number from error message (e.g., "line 5" or "at line 5")
            const lineMatch = errorMsg.match(/line\s+(\d+)/i) || errorMsg.match(/:\s*(\d+):/);
            if (lineMatch) {
                const jsLineNum = parseInt(lineMatch[1], 10);
                // The prefix has multiple lines, so we need to account for that
                const prefixLines = prefix.split('\n').length;
                const methodLines = methodConversion.code.split('\n').length;
                // Calculate which line in the main body this corresponds to
                const bodyLineNum = Math.max(1, jsLineNum - prefixLines - methodLines);
                
                // Get the problematic line from the transformed body
                const bodyLines = jsBody.split('\n');
                if (bodyLineNum > 0 && bodyLineNum <= bodyLines.length) {
                    const problematicLine = bodyLines[bodyLineNum - 1];
                    const contextStart = Math.max(0, bodyLineNum - 3);
                    const contextEnd = Math.min(bodyLines.length, bodyLineNum + 2);
                    const context = bodyLines.slice(contextStart, contextEnd);
                    
                    detailedError += `\n\nError at line ${bodyLineNum} in generated code:`;
                    detailedError += `\n${context.map((line, idx) => {
                        const lineNum = contextStart + idx + 1;
                        const marker = lineNum === bodyLineNum ? ' >>> ' : '     ';
                        return `${marker}${lineNum}: ${line}`;
                    }).join('\n')}`;
                    
                    // Try to map back to original C# code
                    const originalLines = mainBody.split('\n');
                    if (bodyLineNum <= originalLines.length) {
                        const originalLine = originalLines[bodyLineNum - 1];
                        detailedError += `\n\nCorresponding C# code (approximate):`;
                        detailedError += `\n     ${bodyLineNum}: ${originalLine.trim()}`;
                    }
                }
            } else {
                // If we can't extract line number, show the last part of the code
                const bodyLines = jsBody.split('\n');
                const lastLines = bodyLines.slice(Math.max(0, bodyLines.length - 5));
                detailedError += `\n\nLast few lines of generated code:`;
                detailedError += `\n${lastLines.map((line, idx) => {
                    const lineNum = bodyLines.length - lastLines.length + idx + 1;
                    return `     ${lineNum}: ${line}`;
                }).join('\n')}`;
            }
            
            throw new Error(detailedError);
        }

        try {
            return {
                outputs: runner(),
                methods: methodConversion.metadata,
                errors: [],
            };
        } catch (runtimeError) {
            // Handle runtime errors with better line number reporting
            const errorMsg = runtimeError.message || String(runtimeError);
            let detailedError = `Runtime error: ${errorMsg}`;
            
            // Try to extract line number from error (format: "Program.cs:5: error: ...")
            const lineMatch = errorMsg.match(/:(\d+):/) || errorMsg.match(/line\s+(\d+)/i);
            if (lineMatch) {
                const errorLineNum = parseInt(lineMatch[1], 10);
                const originalLines = mainBody.split('\n');
                if (errorLineNum > 0 && errorLineNum <= originalLines.length) {
                    const problematicLine = originalLines[errorLineNum - 1];
                    const contextStart = Math.max(0, errorLineNum - 3);
                    const contextEnd = Math.min(originalLines.length, errorLineNum + 2);
                    const context = originalLines.slice(contextStart, contextEnd);
                    
                    detailedError += `\n\nError at line ${errorLineNum} in C# code:`;
                    detailedError += `\n${context.map((line, idx) => {
                        const lineNum = contextStart + idx + 1;
                        const marker = lineNum === errorLineNum ? ' >>> ' : '     ';
                        return `${marker}${lineNum}: ${line}`;
                    }).join('\n')}`;
                }
            }
            
            throw new Error(detailedError);
        }
    } catch (error) {
        // Re-throw if it's already a detailed error, otherwise wrap it
        if (error.message && error.message.includes('\n\nError at line')) {
            throw error;
        }
        const errorMsg = error.message || String(error);
        throw new Error(`Failed to execute C# snippet: ${errorMsg}`);
    }
}

function validateCsharpSyntax(src, sourceLabel) {
    const errors = [];
    const lines = src.split('\n');
    
    // Check for unclosed strings and chars
    lines.forEach((line, index) => {
        const lineNum = index + 1;
        const trimmed = line.trim();
        
        // Skip empty lines and comments
        if (!trimmed || trimmed.startsWith('//')) return;
        
        // Check for unclosed double-quoted strings
        let inString = false;
        let escaped = false;
        let stringStart = -1;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (escaped) {
                escaped = false;
                continue;
            }
            
            if (char === '\\') {
                escaped = true;
                continue;
            }
            
            if (char === '"') {
                if (inString) {
                    inString = false;
                } else {
                    inString = true;
                    stringStart = i;
                }
            }
        }
        
        if (inString) {
            errors.push(`${sourceLabel}:${lineNum}: error: Unclosed string literal`);
            return;
        }
        
        // Check for unclosed single-quoted chars
        let inChar = false;
        let charStart = -1;
        escaped = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (escaped) {
                escaped = false;
                continue;
            }
            
            if (char === '\\') {
                escaped = true;
                continue;
            }
            
            if (char === "'") {
                if (inChar) {
                    inChar = false;
                } else {
                    inChar = true;
                    charStart = i;
                }
            }
        }
        
        if (inChar) {
            errors.push(`${sourceLabel}:${lineNum}: error: Unclosed character literal`);
            return;
        }
    });
    
    // If we found string/char errors, return early
    if (errors.length > 0) {
        return errors;
    }
    
    // Remove string literals and char literals to avoid false positives
    function removeStringsAndChars(text) {
        // Remove string literals
        let result = text.replace(/"(?:[^"\\]|\\.)*"/g, '""');
        // Remove char literals
        result = result.replace(/'(?:[^'\\]|\\.)*'/g, "''");
        return result;
    }
    
    // Check for malformed for loops, Console errors, and missing semicolons
    lines.forEach((line, index) => {
        const lineNum = index + 1;
        const trimmed = line.trim();
        
        // Skip empty lines and comments
        if (!trimmed || trimmed.startsWith('//')) return;
        
        // Check for .WriteLine (missing Console)
        if (trimmed.match(/^\s*\.(Write|WriteLine)/)) {
            errors.push(`${sourceLabel}:${lineNum}: error: Unexpected symbol '.' - did you mean 'Console.'?`);
            return;
        }
        
        // Check for Console.. (double dot)
        if (trimmed.match(/Console\.\./)) {
            errors.push(`${sourceLabel}:${lineNum}: error: Unexpected symbol '.' - did you mean 'Console.Write' or 'Console.WriteLine'?`);
            return;
        }
        
        // Check for Console.( without method name
        if (trimmed.match(/Console\.\s*\(/)) {
            errors.push(`${sourceLabel}:${lineNum}: error: Unexpected symbol '(' - missing method name after 'Console.'`);
            return;
        }
        
        // Check for missing semicolon after Console.Write/WriteLine calls
        // Simple check: if line contains Console.Write/WriteLine, ends with ) but not );, likely missing semicolon
        if ((trimmed.includes('Console.Write') || trimmed.includes('Console.WriteLine')) && 
            trimmed.endsWith(')') && 
            !trimmed.endsWith(');') && 
            !trimmed.endsWith('); ')) {
            // Check if next line continues the statement (e.g., with + operator or starts a block)
            const nextLine = index + 1 < lines.length ? lines[index + 1].trim() : '';
            // If next line doesn't continue with +, ., or start a block, it's missing semicolon
            if (!nextLine.match(/^(\+|\||&|\.)/) && !nextLine.startsWith('{') && !nextLine.startsWith('}') && nextLine !== '') {
                errors.push(`${sourceLabel}:${lineNum}: error: Expected ';'`);
                return;
            }
        }
        
        // Check for missing semicolon after variable assignments
        // Pattern: type variable = value (without semicolon)
        const varAssignPattern = new RegExp(`\\b(${CSHARP_TYPES_PATTERN})\\s+[A-Za-z_]\\w*\\s*=\\s*[^;]+$`);
        if (varAssignPattern.test(trimmed) && !trimmed.endsWith(';') && !trimmed.endsWith('{') && !trimmed.endsWith('}')) {
            const nextLine = index + 1 < lines.length ? lines[index + 1].trim() : '';
            if (!nextLine.match(/^(\+|\||&|\.)/) && !nextLine.startsWith('{') && !nextLine.startsWith('}') && nextLine !== '') {
                errors.push(`${sourceLabel}:${lineNum}: error: Expected ';'`);
                return;
            }
        }
        
        // Check for missing semicolon after method calls (general pattern)
        // Pattern: identifier(...) without semicolon, but not if/for/while/etc
        if (!trimmed.match(/^(if|else|for|while|do|switch|foreach|using|namespace|class|return|break|continue|case|default)\b/i) &&
            !trimmed.endsWith(';') && 
            !trimmed.endsWith('{') && 
            !trimmed.endsWith('}') && 
            !trimmed.endsWith(':') &&
            trimmed.match(/[A-Za-z_]\w*\s*\([^)]*\)\s*$/)) {
            const nextLine = index + 1 < lines.length ? lines[index + 1].trim() : '';
            // If next line is not empty and doesn't continue the statement, missing semicolon
            if (nextLine && !nextLine.match(/^(\+|\||&|\.)/) && !nextLine.startsWith('{') && !nextLine.startsWith('}') && 
                !nextLine.match(/^(if|else|for|while|do|switch|foreach|return|break|continue|case|default)\b/i)) {
                errors.push(`${sourceLabel}:${lineNum}: error: Expected ';'`);
                return;
            }
        }
        
        if (trimmed.startsWith('for')) {
            const forMatch = trimmed.match(/for\s*\((.*?)\)/);
            if (forMatch) {
                const forContent = forMatch[1];
                // for loop should have 2 semicolons (3 parts) unless it's foreach
                if (!forContent.includes('in') && !forContent.includes('foreach')) {
                    const semicolonCount = (forContent.match(/;/g) || []).length;
                    if (semicolonCount !== 2) {
                        errors.push(`${sourceLabel}:${lineNum}: error: Invalid expression term ')'`);
                    }
                }
            }
        }
    });
    
    // Check for unmatched brackets across the entire file
    let bracketBalance = 0;
    
    lines.forEach((line, index) => {
        const lineNum = index + 1;
        const cleanLine = removeStringsAndChars(line);
        
        // Skip comments
        if (line.trim().startsWith('//')) return;
        
        // Count brackets
        for (const char of cleanLine) {
            if (char === '[') bracketBalance++;
            if (char === ']') {
                bracketBalance--;
                if (bracketBalance < 0 && errors.length === 0) {
                    errors.push(`${sourceLabel}:${lineNum}: error: Unexpected symbol ']'`);
                    return;
                }
            }
        }
    });
    
    // If brackets are still unbalanced at the end, report it
    if (bracketBalance > 0 && errors.length === 0) {
        // Find the last line with an opening bracket
        for (let i = lines.length - 1; i >= 0; i--) {
            const cleanLine = removeStringsAndChars(lines[i]);
            if (cleanLine.includes('[')) {
                errors.push(`${sourceLabel}:${i + 1}: error: Expected ']'`);
                break;
            }
        }
    }
    
    return errors;
}

function simulateCsharpOutput(src) {
    const sourceLabel = getCsharpSourceLabel(src);
    const syntaxErrors = validateCsharpSyntax(src, sourceLabel);
    
    if (syntaxErrors.length > 0) {
        let temp = '';
        syntaxErrors.forEach((message) => temp += message + "\n");
        return ' ' + temp;
    }
    
    const { errors } = extractCsharpDeclarations(src);
    const consoleErrors = findInvalidConsoleCalls(src, sourceLabel);
    const allErrors = [...errors, ...consoleErrors];
    let executionResult = { outputs: [], methods: [], errors: [] };

    if (allErrors.length === 0) {
        try {
            executionResult = executeCsharpMain(src, sourceLabel);
            if (executionResult.errors && executionResult.errors.length > 0) {
                allErrors.push(...executionResult.errors);
            }
        } catch (error) {
            // Format error message to include line numbers if available
            const errorMsg = error.message || String(error);
            
            // Check if error already has line number format (e.g., "Program.cs:5: error: ...")
            if (errorMsg.includes(':') && /:\d+:/.test(errorMsg)) {
                allErrors.push(errorMsg);
            } else {
                // Try to extract line number from error or provide context
                const lineMatch = errorMsg.match(/line\s+(\d+)/i) || errorMsg.match(/at\s+line\s+(\d+)/i);
                if (lineMatch) {
                    const lineNum = parseInt(lineMatch[1], 10);
                    const srcLines = src.split('\n');
                    if (lineNum > 0 && lineNum <= srcLines.length) {
                        const problematicLine = srcLines[lineNum - 1];
                        allErrors.push(`${sourceLabel}:${lineNum}: error: ${errorMsg.replace(/line\s+\d+/i, '').trim()}`);
                        allErrors.push(`     ${problematicLine.trim()}`);
                    } else {
                        allErrors.push(`${sourceLabel}: error: ${errorMsg}`);
                    }
                } else {
                    // For syntax errors, try to extract more specific information
                    if (errorMsg.includes('missing )') || errorMsg.includes('Syntax error') || errorMsg.includes('Expected')) {
                        // Try to find the problematic line by looking at the error message
                        // or by analyzing the code structure
                        const srcLines = src.split('\n');
                        
                        // If error message contains line info, use it
                        const errorLineMatch = errorMsg.match(/line\s+(\d+)/i) || errorMsg.match(/at\s+line\s+(\d+)/i);
                        if (errorLineMatch) {
                            const lineNum = parseInt(errorLineMatch[1], 10);
                            if (lineNum > 0 && lineNum <= srcLines.length) {
                                const problematicLine = srcLines[lineNum - 1];
                                const contextStart = Math.max(0, lineNum - 3);
                                const contextEnd = Math.min(srcLines.length, lineNum + 2);
                                const context = srcLines.slice(contextStart, contextEnd);
                                
                                allErrors.push(`${sourceLabel}:${lineNum}: error: ${errorMsg.replace(/line\s+\d+/i, '').trim()}`);
                                context.forEach((line, idx) => {
                                    const ctxLineNum = contextStart + idx + 1;
                                    const marker = ctxLineNum === lineNum ? ' >>> ' : '     ';
                                    allErrors.push(`${marker}${ctxLineNum}: ${line}`);
                                });
                            } else {
                                allErrors.push(`${sourceLabel}: error: ${errorMsg}`);
                            }
                        } else {
                            // If no line number, just show the error without "near the end" message
                            allErrors.push(`${sourceLabel}: error: ${errorMsg}`);
                        }
                    } else {
                        allErrors.push(`${sourceLabel}: error: ${errorMsg}`);
                    }
                }
            }
        }
    }

    if (allErrors.length > 0) {
        let temp = ``;
        allErrors.forEach((message) => temp += message + "\n");
        return ' ' + temp;
    }

    let temp = ``;
    executionResult.outputs.forEach((line) => temp += line + "\n");
    return temp;
}
window.simulateCsharpOutput = simulateCsharpOutput;
