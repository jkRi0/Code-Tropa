// let code = `
// public class MainDemo {
//     public static void main(String[] args) {
//         for(int i=0;i<10;i++){
//             if(i%2==0){
//                 System.out.println("Even");
//             }else{
//                 System.out.println("Odd");
//             }
//         }

//         // === PRIMITIVES ===
//         byte byteVar = 10;
//         short shortVar = 300;
//         int intVar = 50000;
//         long longVar = 90000000000L;

//         float floatVar = 3.14f;
//         double doubleVar = 3.14159265359;

//         char charVar = 'A';
//         boolean boolVar = true;

//         // === NON-PRIMITIVES ===
//         String stringVar = "Hello Java!";
//         Integer wrapperInt = 42;
//         Double wrapperDouble = 10.5;
//         Boolean wrapperBoolean = false;

//         // Print primitives
//         System.out.println("=== PRIMITIVES ===");
//         System.out.println("byte: " + byteVar);
//         System.out.println("short: " + shortVar);
//         System.out.println("int: " + intVar);
//         System.out.println("long: " + longVar);
//         System.out.println("float: " + floatVar);
//         System.out.println("double: " + doubleVar);
//         System.out.println("char: " + charVar);
//         System.out.println("boolean: " + boolVar);

//         System.out.println("\n=== NON-PRIMITIVES ===");
//         System.out.println("String: " + stringVar);
//         System.out.println("Integer wrapper: " + wrapperInt);
//         System.out.println("Double wrapper: " + wrapperDouble);
//         System.out.println("Boolean wrapper: " + wrapperBoolean);

//         System.out.println("\n123" + "456");
//         System.out.print(" 123" + 456);
//         System.out.println(123 + 456);


//         // === ARRAYS ===
//         int[] numArray = {1, 2, 3, 4, 5};
//         String[] strArray = {"One", "Two", "Three"};
//         int[][] matrix = {
//             {1, 2, 3},
//             {4, 5, 6}
//         };

//         System.out.print("\n1D Array: ");
//         for (int num : numArray) System.out.print(num + " ");
//         System.out.println();

//         System.out.print("String Array: ");
//         for (String s : strArray) System.out.print(s + " ");
//         System.out.println();

//         System.out.println("2D Array:");
//         for (int i = 0; i < matrix.length; i++) {
//             for (int j = 0; j < matrix[i].length; j++) {
//                 System.out.print(matrix[i][j] + " ");
//             }
//             System.out.println();
//         }

//         // === CONTROL FLOW ===
//         int value = 10;
//         if (value > 5) {
//             System.out.println("\nValue is greater than 5");
//         } else {
//             System.out.println("\nValue is 5 or less");
//         }

//         int day = 3;
//         switch (day) {
//             case 1: System.out.println("Monday"); break;
//             case 2: System.out.println("Tuesday"); break;
//             case 3: System.out.println("Wednesday"); break;
//             default: System.out.println("Another day");
//         }


//         // === LOOPS ===
//         System.out.print("\nFor Loop: ");
//         for (int i = 1; i <= 5; i++) System.out.print(i + " ");
//         System.out.println();

//         System.out.print("While Loop: ");
//         int w = 1;
//         while (w <= 5) {
//             System.out.print(w + " ");
//             w++;
//         }
//         System.out.println();

//         System.out.print("Do-While Loop: ");
//         int d = 1;
//         do {
//             System.out.print(d + " ");
//             d++;
//         } while (d <= 5);
//         System.out.println();

//         System.out.print("Enhanced For Loop (numArray): ");
//         for (int num : numArray) System.out.print(num + " ");
//         System.out.println();



//         // === SIMPLE CALCULATION INSIDE MAIN ===
//         int sum = 10 + 20;
//         System.out.println("\nSum of 10 + 20 = " + sum);

//         String message = "This is a message inside main!";
//         System.out.println(message);



//         System.out.println("Sum via method: " + addNumbers(10, 20));
//         printMessage("This is a custom message!");

//         System.out.println("Message from method: " + getMessage());
//     }

//     // Method returning a value
//     public static int addNumbers(int a, int b) {
//         return a + b;
//     }

//     // Method with no return
//     public static void printMessage(String msg) {
//         System.out.println("Message: " + msg);
//     }

//     public static String getMessage() {
//         return "This is a message from the method!";
//     }
// }

// `;


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

function getSourceLabel(src) {
    const classMatch = src.match(/\bclass\s+([A-Za-z_]\w*)/);
    const className = classMatch ? classMatch[1] : "MainDemo";
    return `${className}.java`;
}

function extractDeclarations(src) {
    const declarationPattern =
        /\b(byte|short|int|long|float|double|char|boolean|String|Integer|Double|Boolean)\s+([A-Za-z_]\w*)\s*=\s*([^;]+);/g;
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

function findInvalidSystemOutCalls(src, sourceLabel = "MainDemo.java") {
    const invalidCalls = [];
    const systemOutPattern = /System\.out\.([A-Za-z_]\w*)\s*\(/g;
    let match;

    while ((match = systemOutPattern.exec(src)) !== null) {
        const method = match[1];
        if (method !== "print" && method !== "println") {
            const line = src.slice(0, match.index).split("\n").length;
            invalidCalls.push(
                `${sourceLabel}:${line}: error: Unsupported System.out method "${method}". Only print and println are supported.`,
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

const JAVA_TYPES_PATTERN =
    "byte|short|int|long|float|double|char|boolean|String|Integer|Double|Boolean";

function convertMultiDimArrayDeclarations(source) {
    const multiPattern = new RegExp(
        `(\\s*)(${JAVA_TYPES_PATTERN})(?:\\s*\\[\\s*\\])+\\s+([A-Za-z_]\\w*)\\s*=\\s*(\\{[\\s\\S]*?\\})\\s*;`,
        "g",
    );

    return source.replace(multiPattern, (_, indent, type, name, initializer) => {
        const convertedInitializer = initializer.replace(/\{/g, "[").replace(/\}/g, "]");
        return `${indent}let ${name} = __wrapArray(${convertedInitializer}, "${type}");`;
    });
}

function convertArrayDeclarations(source) {
    const arrayPattern = new RegExp(
        `(\\s*)(${JAVA_TYPES_PATTERN})\\s*\\[\\s*\\]\\s+([A-Za-z_]\\w*)\\s*=\\s*\\{([\\s\\S]*?)\\};`,
        "g",
    );

    return source.replace(arrayPattern, (_, indent, type, name, values) => {
        const normalizedValues = values.replace(/\s*\n\s*/g, " ").trim();
        return `${indent}let ${name} = __wrapArray([${normalizedValues}], "${type}");`;
    });
}

function convertEnhancedForLoops(source) {
    const enhancedPattern = new RegExp(
        `for\\s*\\(\\s*(?:final\\s+)?(?:${JAVA_TYPES_PATTERN})\\s+([A-Za-z_]\\w*)\\s*:\\s*([^\\)]+)\\)`,
        "g",
    );

    return source.replace(enhancedPattern, (_, iterator, iterable) => {
        return `for (const ${iterator} of ${iterable.trim()})`;
    });
}

function convertArrayInstantiations(source) {
    const singleDimPattern = new RegExp(
        `new\\s+(${JAVA_TYPES_PATTERN})\\s*\\[\\s*([^\\]\\[]+)\\s*\\]`,
        "g",
    );

    return source.replace(
        singleDimPattern,
        (_, type, size) => `__createArray("${type}", ${size.trim()})`,
    );
}

function transformJavaBodyToJs(body) {
    let transformed = body;
    transformed = convertMultiDimArrayDeclarations(transformed);
    transformed = convertArrayDeclarations(transformed);
    transformed = convertEnhancedForLoops(transformed);
    transformed = convertArrayInstantiations(transformed);
    transformed = transformed.replace(/System\.out\.println/g, "__println");
    transformed = transformed.replace(/System\.out\.print/g, "__print");
    // Replace declarations with initialization
    const baseTypePattern = `(?:${JAVA_TYPES_PATTERN})`;
    transformed = transformed.replace(
        new RegExp(
            `\\b${baseTypePattern}(?:\\s*\\[\\s*\\])*\\s+([A-Za-z_]\\w*)(\\s*=[^;]+;)`,
            "g",
        ),
        "let $1$2",
    );
    // Replace declarations without initialization (including arrays)
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

function validateReturnTypeName(returnType, methodName, lineNumber, sourceLabel) {
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
    const prefix = lineNumber ? `${sourceLabel}:${lineNumber}: ` : `${sourceLabel}: `;

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

function convertMethodsToJs(src, sourceLabel) {
    const methods = extractMethodDefinitions(src);
    const conversionErrors = [];

    methods.forEach((method) => {
        const typeError = validateReturnTypeName(method.returnType, method.name, method.line, sourceLabel);
        if (typeError) {
            conversionErrors.push(typeError);
        }
    });

    const code = methods
        .map((method) => {
            const paramsJs = convertMethodParameters(method.params);
            const transformedBody = transformJavaBodyToJs(method.body).trim();
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
                `${sourceLabel}: error: non-static method ${method.name}(${paramsSignature}) cannot be referenced from a static context`,
            );
        }
    });

    return errors;
}

function executeJavaMain(src, sourceLabel) {
    const mainBody = extractMainMethodBody(src);
    if (!mainBody) {
        throw new Error(`Error: "main" method not found in class, please define the main method as: public static void main(String[] args)`);}

    const methodConversion = convertMethodsToJs(src, sourceLabel);
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

    const jsBody = transformJavaBodyToJs(mainBody);
    if (typeof process !== "undefined" && process.env && process.env.DEBUG_JS_BODY) {
        console.log("=== TRANSFORMED MAIN BODY ===");
        console.log(jsBody);
        console.log("=== END TRANSFORMED MAIN BODY ===");
    }

    try {
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
                throw new Error(\`\${__sourceLabel}: error: ArrayIndexOutOfBoundsException: Index \${index} out of bounds for length \${length}\`);
            };
            const __isArrayIndex = (prop) => {
                if (typeof prop === "symbol") return false;
                if (prop === "") return false;
                const key = String(prop);
                if (!/^-?\\d+$/.test(key)) return false;
                return true;
            };
            const __wrappedArrayToken = Symbol("javaArrayProxy");
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
                        if (prop === "__isJavaArray") return true;
                        if (prop === Symbol.iterator) {
                            return function* iterator() {
                                for (let i = 0; i < target.length; i++) {
                                    yield target[i];
                                }
                            };
                        }
                        if (prop === "length" || typeof prop === "symbol") {
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
                                    throw new Error(\`\${__sourceLabel}: error: Java arrays have fixed length; method \${methodName}() is not supported\`);
                                };
                            }
                            return value.bind(target);
                        }
                        return value;
                    },
                    set(target, prop, value) {
                        if (prop === "length") {
                            throw new Error(\`\${__sourceLabel}: error: cannot assign to the length of a Java array\`);
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
                    case "short":
                    case "int":
                    case "long":
                    case "float":
                    case "double":
                    case "Integer":
                    case "Double":
                        return 0;
                    case "boolean":
                    case "Boolean":
                        return false;
                    case "char":
                        return "\u0000";
                    case "String":
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

function validateJavaSyntax(src, sourceLabel) {
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
            errors.push(`${sourceLabel}:${lineNum}: error: unclosed string literal`);
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
            errors.push(`${sourceLabel}:${lineNum}: error: unclosed character literal`);
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
    
    // Check for malformed for loops and System.out errors
    lines.forEach((line, index) => {
        const lineNum = index + 1;
        const trimmed = line.trim();
        
        // Skip empty lines and comments
        if (!trimmed || trimmed.startsWith('//')) return;
        
        // Check for .out.println (missing System)
        if (trimmed.match(/^\s*\.out\.(print|println)/)) {
            errors.push(`${sourceLabel}:${lineNum}: error: illegal start of expression - did you mean 'System.out'?`);
            return;
        }
        
        // Check for System.. (double dot)
        if (trimmed.match(/System\.\./)) {
            errors.push(`${sourceLabel}:${lineNum}: error: '.' not expected here - did you mean 'System.out'?`);
            return;
        }
        
        // Check for System.out.( without method name
        if (trimmed.match(/System\.out\.\s*\(/)) {
            errors.push(`${sourceLabel}:${lineNum}: error: '(' not expected here - missing method name after 'System.out.'`);
            return;
        }
        
        if (trimmed.startsWith('for')) {
            const forMatch = trimmed.match(/for\s*\((.*?)\)/);
            if (forMatch) {
                const forContent = forMatch[1];
                // for loop should have 2 semicolons (3 parts)
                const semicolonCount = (forContent.match(/;/g) || []).length;
                if (semicolonCount !== 2 && !forContent.includes(':')) { // unless it's enhanced for
                    errors.push(`${sourceLabel}:${lineNum}: error: malformed for loop - missing ';' in for statement`);
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
                    errors.push(`${sourceLabel}:${lineNum}: error: unexpected ']'`);
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
                errors.push(`${sourceLabel}:${i + 1}: error: ']' expected`);
                break;
            }
        }
    }
    
    return errors;
}

function simulateSystemOutPrinting(src) {
    const sourceLabel = getSourceLabel(src);
    const syntaxErrors = validateJavaSyntax(src, sourceLabel);
    
    if (syntaxErrors.length > 0) {
        let temp = '';
        syntaxErrors.forEach((message) => temp += message + "\n");
        return ' ' + temp;
    }
    
    const { errors } = extractDeclarations(src);
    const systemOutErrors = findInvalidSystemOutCalls(src, sourceLabel);
    const allErrors = [...errors, ...systemOutErrors];
    let executionResult = { outputs: [], methods: [], errors: [] };

    if (allErrors.length === 0) {
        try {
            executionResult = executeJavaMain(src, sourceLabel);
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
// console.log(simulateSystemOutPrinting(code));

window.simulateJavaOutput = simulateSystemOutPrinting;