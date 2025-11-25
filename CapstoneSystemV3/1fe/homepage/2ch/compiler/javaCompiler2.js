let code = `
public class MainDemo {
    public static void main(String[] args) {

        // === PRIMITIVES ===
        byte byteVar = 10;
        short shortVar = 300;
        int intVar = 50000;
        long longVar = 90000000000L;

        float floatVar = 3.14f;
        double doubleVar = 3.14159265359;

        char charVar = 'A';
        boolean boolVar = true;

        // === NON-PRIMITIVES ===
        String stringVar = "Hello Java!";
        Integer wrapperInt = 42;
        Double wrapperDouble = 10.5;
        Boolean wrapperBoolean = false;

        // Print primitives
        System.out.println("=== PRIMITIVES ===");
        System.out.println("byte: " + byteVar);
        System.out.println("short: " + shortVar);
        System.out.println("int: " + intVar);
        System.out.println("long: " + longVar);
        System.out.println("float: " + floatVar);
        System.out.println("double: " + doubleVar);
        System.out.println("char: " + charVar);
        System.out.println("boolean: " + boolVar);

        System.out.println("\n=== NON-PRIMITIVES ===");
        System.out.println("String: " + stringVar);
        System.out.println("Integer wrapper: " + wrapperInt);
        System.out.println("Double wrapper: " + wrapperDouble);
        System.out.println("Boolean wrapper: " + wrapperBoolean);

        System.out.println("\n123" + "456");
        System.out.print(" 123" + 456);
        System.out.println(123 + 456);


        // === ARRAYS ===
        int[] numArray = {1, 2, 3, 4, 5};
        String[] strArray = {"One", "Two", "Three"};
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6}
        };

        System.out.print("\n1D Array: ");
        for (int num : numArray) System.out.print(num + " ");
        System.out.println();

        System.out.print("String Array: ");
        for (String s : strArray) System.out.print(s + " ");
        System.out.println();

        System.out.println("2D Array:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }

        // === CONTROL FLOW ===
        int value = 10;
        if (value > 5) {
            System.out.println("\nValue is greater than 5");
        } else {
            System.out.println("\nValue is 5 or less");
        }

        int day = 3;
        switch (day) {
            case 1: System.out.println("Monday"); break;
            case 2: System.out.println("Tuesday"); break;
            case 3: System.out.println("Wednesday"); break;
            default: System.out.println("Another day");
        }


        // === LOOPS ===
        System.out.print("\nFor Loop: ");
        for (int i = 1; i <= 5; i++) System.out.print(i + " ");
        System.out.println();

        System.out.print("While Loop: ");
        int w = 1;
        while (w <= 5) {
            System.out.print(w + " ");
            w++;
        }
        System.out.println();

        System.out.print("Do-While Loop: ");
        int d = 1;
        do {
            System.out.print(d + " ");
            d++;
        } while (d <= 5);
        System.out.println();

        System.out.print("Enhanced For Loop (numArray): ");
        for (int num : numArray) System.out.print(num + " ");
        System.out.println();



        // === SIMPLE CALCULATION INSIDE MAIN ===
        int sum = 10 + 20;
        System.out.println("\nSum of 10 + 20 = " + sum);

        String message = "This is a message inside main!";
        System.out.println(message);



        System.out.println("Sum via method: " + addNumbers(10, 20));
        printMessage("This is a custom message!");

        System.out.println("Message from method: " + getMessage());
    }

    // Method returning a value
    public static int addNumbers(int a, int b) {
        return a + b;
    }

    // Method with no return
    public static void printMessage(String msg) {
        System.out.println("Message: " + msg);
    }

    public static String getMessage() {
        return "This is a message from the method!";
    }
}

`;


const primitiveTypes = new Set([
    "byte",
    "short",
    "int",
    "long",
    "float",
    "double",
    "char",
    "boolean",
]);

const nonPrimitiveTypes = new Set(["String", "Integer", "Double", "Boolean"]);

function extractDeclarations(src) {
    const declarationPattern =
        /\b(byte|short|int|long|float|double|char|boolean|String|Integer|Double|Boolean)\s+([A-Za-z_]\w*)\s*=\s*([^;]+);/g;
    const declarations = {};
    const errors = [];

    let match;
    while ((match = declarationPattern.exec(src)) !== null) {
        const [, type, name, value] = match;
        const trimmedValue = value.trim();
        const validation = validateLiteral(type, trimmedValue);

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

function stripSuffix(raw, suffixes) {
    const trimmed = raw.trim();
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

function validateLiteral(type, rawValue) {
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
            const validation = validateNumericRange(parsed, -128, 127, "byte");
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
            const validation = validateNumericRange(
                parsed,
                -32768,
                32767,
                "short",
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
        case "int":
        case "Integer": {
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
        case "long": {
            const parsed = parseNumericLiteral(rawValue, ["l"]);
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
            const parsed = parseNumericLiteral(rawValue, ["f"]);
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
        case "double":
        case "Double": {
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
        case "boolean":
        case "Boolean": {
            if (normalizedBoolean !== "true" && normalizedBoolean !== "false") {
                return {
                    ...result,
                    isValid: false,
                    message: "boolean must be true or false",
                };
            }
            return {
                ...result,
                jsValue: normalizedBoolean === "true",
                printValue: normalizedBoolean,
            };
        }
        case "String": {
            const trimmed = rawValue.trim();
            if (
                !trimmed.startsWith('"') ||
                !trimmed.endsWith('"') ||
                trimmed.length < 2
            ) {
                return {
                    ...result,
                    isValid: false,
                    message: "String must use double quotes",
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

function findInvalidSystemOutCalls(src) {
    const invalidCalls = [];
    const systemOutPattern = /System\.out\.([A-Za-z_]\w*)\s*\(/g;
    let match;

    while ((match = systemOutPattern.exec(src)) !== null) {
        const method = match[1];
        if (method !== "print" && method !== "println") {
            const line = src.slice(0, match.index).split("\n").length;
            invalidCalls.push(
                `MainDemo.java:${line}: error: Unsupported System.out method "${method}". Only print and println are supported.`,
            );
        }
    }

    return invalidCalls;
}

function extractMainMethodBody(src) {
    const mainIndex = src.indexOf("public static void main");
    if (mainIndex === -1) {
        return null;
    }
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

function convertMultiDimArrayDeclarations(source) {
    const typePattern =
        "(?:byte|short|int|long|float|double|char|boolean|String|Integer|Double|Boolean)";
    const multiPattern = new RegExp(
        `(\\s*)${typePattern}(?:\\s*\\[\\s*\\])+\\s+([A-Za-z_]\\w*)\\s*=\\s*(\\{[\\s\\S]*?\\})\\s*;`,
        "g",
    );

    return source.replace(multiPattern, (_, indent, name, initializer) => {
        const convertedInitializer = initializer.replace(/\{/g, "[").replace(/\}/g, "]");
        return `${indent}let ${name} = ${convertedInitializer};`;
    });
}

function convertArrayDeclarations(source) {
    const typePattern =
        "(?:byte|short|int|long|float|double|char|boolean|String|Integer|Double|Boolean)";
    const arrayPattern = new RegExp(
        `(\\s*)${typePattern}\\s*\\[\\s*\\]\\s+([A-Za-z_]\\w*)\\s*=\\s*\\{([\\s\\S]*?)\\};`,
        "g",
    );

    return source.replace(arrayPattern, (_, indent, name, values) => {
        const normalizedValues = values.replace(/\s*\n\s*/g, " ").trim();
        return `${indent}let ${name} = [${normalizedValues}];`;
    });
}

function convertEnhancedForLoops(source) {
    const typePattern =
        "(?:final\\s+)?(?:byte|short|int|long|float|double|char|boolean|String|Integer|Double|Boolean)";
    const enhancedPattern = new RegExp(
        `for\\s*\\(\\s*${typePattern}\\s+([A-Za-z_]\\w*)\\s*:\\s*([^\\)]+)\\)`,
        "g",
    );

    return source.replace(enhancedPattern, (_, iterator, iterable) => {
        return `for (const ${iterator} of ${iterable.trim()})`;
    });
}

function transformJavaBodyToJs(body) {
    let transformed = body;
    transformed = convertMultiDimArrayDeclarations(transformed);
    transformed = convertArrayDeclarations(transformed);
    transformed = convertEnhancedForLoops(transformed);
    transformed = transformed.replace(/System\.out\.println/g, "__println");
    transformed = transformed.replace(/System\.out\.print/g, "__print");
    transformed = transformed.replace(
        /\b(byte|short|int|long|float|double|char|boolean|String|Integer|Double|Boolean)\s+([A-Za-z_]\w*)\s*=/g,
        "let $2 =",
    );
    transformed = transformed.replace(/(\d+)[lL]\b/g, "$1");
    transformed = transformed.replace(/(\d+(?:\.\d+)?)[fF]\b/g, "$1");
    transformed = escapeNewlinesInStringLiterals(transformed);
    return transformed;
}

function wrapMethodReturnStatements(body, method) {
    const errors = [];
    const returnRegex = /return(?:\s+([^;]*))?;/g;
    let hasReturn = false;
    const linePrefix = method.line ? `MainDemo.java:${method.line}: ` : "MainDemo.java: ";

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

function extractMethodDefinitions(src) {
    const methods = [];
    const methodPattern =
        /(public|private|protected)?\s*(static\s+)?([A-Za-z0-9_<>\[\]]+)\s+([A-Za-z_]\w*)\s*\(([^)]*)\)\s*\{/g;
    let match;

    while ((match = methodPattern.exec(src)) !== null) {
        const name = match[4];
        if (name === "main") {
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
            access: accessModifier || "package-private",
            isStatic: Boolean(match[2]),
            returnType: (match[3] || "").trim(),
            line,
        });
        methodPattern.lastIndex = braceEnd + 1;
    }

    return methods;
}

function convertMethodParameters(paramList) {
    if (!paramList || !paramList.trim()) {
        return "";
    }

    return paramList
        .split(",")
        .map((segment) => {
            const clean = segment.replace(/\bfinal\b/g, "").replace(/\.\.\./g, "").trim();
            if (!clean) {
                return "";
            }
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

function validateReturnTypeName(returnType, methodName, lineNumber) {
    const validTypes = new Set([
        "byte",
        "short",
        "int",
        "long",
        "float",
        "double",
        "char",
        "boolean",
        "void",
        "String",
        "Integer",
        "Double",
        "Boolean",
    ]);

    const trimmed = (returnType || "").trim();
    const prefix = lineNumber ? `MainDemo.java:${lineNumber}: ` : "MainDemo.java: ";

    if (!trimmed) {
        return `${prefix}error: invalid return type for method ${methodName}()`;
    }

    if (!validTypes.has(trimmed)) {
        const lower = trimmed.toLowerCase();
        if (lower === "string") {
            return `${prefix}error: cannot find symbol: class string (should be String)`;
        }
        if (lower === "integer") {
            return `${prefix}error: cannot find symbol: class integer (should be int or Integer)`;
        }
        return `${prefix}error: cannot find symbol: class ${trimmed}`;
    }

    return null;
}

function convertMethodsToJs(src) {
    const methods = extractMethodDefinitions(src);
    const conversionErrors = [];

    methods.forEach((method) => {
        const typeError = validateReturnTypeName(method.returnType, method.name, method.line);
        if (typeError) {
            conversionErrors.push(typeError);
        }
    });

    const code = methods
        .map((method) => {
            const paramsJs = convertMethodParameters(method.params);
            const transformedBody = transformJavaBodyToJs(method.body).trim();
            const { body, errors } = wrapMethodReturnStatements(transformedBody, method);
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

function findStaticInvocationErrors(mainBody, methods) {
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
                `MainDemo.java: error: non-static method ${method.name}(${paramsSignature}) cannot be referenced from a static context`,
            );
        }
    });

    return errors;
}

function executeJavaMain(src) {
    const mainBody = extractMainMethodBody(src);
    if (!mainBody) {
        throw new Error("Unable to locate the main method body.");
    }

    const methodConversion = convertMethodsToJs(src);
    const methodErrors = [...methodConversion.errors];
    const staticInvocationErrors = findStaticInvocationErrors(
        mainBody,
        methodConversion.metadata,
    );
    const combinedErrors = [...methodErrors, ...staticInvocationErrors];
    if (combinedErrors.length > 0) {
        return {
            outputs: [],
            methods: methodConversion.metadata,
            errors: combinedErrors,
        };
    }

    const jsBody = transformJavaBodyToJs(mainBody);

    try {
        const prefix = `
            const outputs = [];
            let currentLine = "";
            const __print = (value = "") => {
                currentLine += String(value ?? "");
            };
            const __println = (value = "") => {
                outputs.push(currentLine + String(value ?? ""));
                currentLine = "";
            };
            const __numericTypes = ["byte","short","int","long","float","double","integer"];
            const __integerTypes = ["byte","short","int","long","integer"];
            const __describeJsType = (value) => {
                if (value === null) return "null";
                if (value === undefined) return "undefined";
                if (Number.isNaN(value)) return "NaN";
                if (typeof value === "string") return "String";
                if (typeof value === "number") return Number.isInteger(value) ? "int" : "double";
                if (typeof value === "boolean") return "boolean";
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
                if (normalized === "boolean" || normalized === "Boolean") {
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
                if (normalized === "String") {
                    if (typeof value !== "string") {
                        return "incompatible return type: expected String but received " + __describeJsType(value);
                    }
                    return "";
                }
                if (normalized === "Integer") {
                    if (typeof value !== "number" || !Number.isFinite(value) || !Number.isInteger(value)) {
                        return \`incompatible return type: expected Integer but received \${__describeJsType(value)}\`;
                    }
                    return "";
                }
                if (normalized === "Double") {
                    if (typeof value !== "number" || !Number.isFinite(value)) {
                        return \`incompatible return type: expected Double but received \${__describeJsType(value)}\`;
                    }
                    return "";
                }
                return "";
            };
            const __validateMethodReturn = (methodName, expectedType, value, lineNumber = 0) => {
                const error = __checkReturnType(expectedType, value);
                if (error) {
                    const linePrefix = lineNumber ? \`MainDemo.java:\${lineNumber}:\` : "MainDemo.java:";
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
        const runner = new Function(`${prefix}${methodConversion.code}\n${jsBody}${suffix}`);

        return {
            outputs: runner(),
            methods: methodConversion.metadata,
            errors: [],
        };
    } catch (error) {
        throw new Error(`Failed to execute Java snippet: ${error.message}`);
    }
}

function simulateSystemOutPrinting(src) {
    const { errors } = extractDeclarations(src);
    const syntaxErrors = findInvalidSystemOutCalls(src);
    const allErrors = [...errors, ...syntaxErrors];
    let executionResult = { outputs: [], methods: [], errors: [] };

    if (allErrors.length === 0) {
        try {
            executionResult = executeJavaMain(src);
            if (executionResult.errors && executionResult.errors.length > 0) {
                allErrors.push(...executionResult.errors);
            }
        } catch (error) {
            allErrors.push(error.message);
        }
    }

    if (allErrors.length > 0) {
        // console.error("=== ERRORS DETECTED ===");
        let temp=``;
        allErrors.forEach((message) => temp+=message+"\n");
        return ' '+temp;
    }

    let temp=``;
    executionResult.outputs.forEach((line) => temp+=line+"\n");
    return temp;
}
console.log(simulateSystemOutPrinting(code));

window.simulateJavaOutput = simulateSystemOutPrinting;