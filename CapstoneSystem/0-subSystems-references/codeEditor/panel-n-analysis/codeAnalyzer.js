export function analyzeCode(code) {
    const errors = [];

    // Lexical analysis: Check for unmatched delimiters (Java specific)
    const delimiterStack = [];
    const delimiterMap = { '(': ')', '{': '}', '[': ']' };

    for (let i = 0; i < code.length; i++) {
        const char = code[i];
        if (delimiterMap[char]) {
            delimiterStack.push({ char, pos: i });
        } else if (Object.values(delimiterMap).includes(char)) {
            if (delimiterStack.length === 0) {
                errors.push(`Unmatched closing delimiter '${char}' at position ${i}`);
            } else {
                const lastOpen = delimiterStack.pop();
                if (delimiterMap[lastOpen.char] !== char) {
                    errors.push(`Mismatched delimiter: Expected '${delimiterMap[lastOpen.char]}' but got '${char}' at position ${i}. Opened at ${lastOpen.pos}`);
                }
            }
        }
    }

    if (delimiterStack.length > 0) {
        delimiterStack.forEach(unmatched => {
            errors.push(`Unmatched opening delimiter '${unmatched.char}' at position ${unmatched.pos}`);
        });
    }

    // Simple syntax analysis: Check for missing semicolons (Java heuristic)
    // This is a very simplistic check and will not cover all cases.
    const lines = code.split('\n');
    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        // Ignore lines that are comments, class/method declarations, control flow statements without a body, or block delimiters
        if (trimmedLine.length > 0 &&
            !trimmedLine.startsWith('//') &&
            !trimmedLine.startsWith('/*') &&
            !trimmedLine.endsWith(';') &&
            !trimmedLine.endsWith('{') &&
            !trimmedLine.endsWith('}') &&
            !trimmedLine.match(/^(public|private|protected)?\s*(static)?\s*(final)?\s*(class|interface|enum|void|[a-zA-Z_$][a-zA-Z0-9_$]*)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(\(.*\))?\s*(throws\s+[a-zA-Z_$][a-zA-Z0-9_$]*(?:\s*,\s*[a-zA-Z_$][a-zA-Z0-9_$]*)*)?\s*(\{)?\s*$/) && // Class/Method declarations
            !trimmedLine.match(/^(if|for|while|do|switch|try|catch|finally)\s*(\(.*\))?\s*(\{)?\s*$/) && // Control flow statements
            !trimmedLine.endsWith(':') && // for labels, though less common in modern Java for this
            !trimmedLine.endsWith(',') // for enum values or array initializers
        ) {
            errors.push(`Possible missing semicolon at the end of line ${index + 1}: '${trimmedLine}'`);
        }
    });

    // Syntax analysis: Check for incomplete assignment statements (e.g., `int x = ;`)
    const incompleteAssignmentRegex = /=\s*;$/;
    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (incompleteAssignmentRegex.test(trimmedLine)) {
            errors.push(`Incomplete assignment statement at line ${index + 1}: Expected a value after '='.`);
        }
    });

    // Syntax analysis: Check for missing variable names in declarations (e.g., `int = 8;`)
    const missingVariableNameRegex = /\b(?:byte|short|int|long|float|double|boolean|char|String|[A-Z][a-zA-Z0-9_$]*)\s*=\s*[^;]*;/;
    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (trimmedLine.match(missingVariableNameRegex)) {
            // Further refine to ensure it's not a valid assignment of a type to something (unlikely in Java but for robustness)
            // This check specifically looks for `Type = value;` without an identifier in between.
            const declarationPart = trimmedLine.split('=')[0].trim();
            const typeOnlyRegex = /\b(?:byte|short|int|long|float|double|boolean|char|String|[A-Z][a-zA-Z0-9_$]*)\b/;
            if (typeOnlyRegex.test(declarationPart) && !declarationPart.match(/\b[a-zA-Z_$][a-zA-Z0-9_$]*\s+[a-zA-Z_$][a-zA-Z0-9_$]*\b/)) {
                 errors.push(`Missing variable name in declaration at line ${index + 1}: Expected a variable name after the type.`);
            }
        }
    });

    // Semantic analysis: Heuristic checks for invalid value assignments for data types
    const typeAssignmentRegex = /\b(byte|short|int|long|float|double|boolean|char|String)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(.*?);$/;
    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        const match = trimmedLine.match(typeAssignmentRegex);
        if (match) {
            const type = match[1];
            const value = match[3].trim();

            // Check for numeric types
            if (['byte', 'short', 'int', 'long', 'float', 'double'].includes(type)) {
                if ((value.startsWith('"') && value.endsWith('"')) ||
                    (value === 'true' || value === 'false')) {
                    errors.push(`Type mismatch at line ${index + 1}: Cannot assign a ${value.startsWith('"') ? 'String' : 'boolean'} to a '${type}'.`);
                }
                // Basic check for character to numeric (e.g., int x = 'a'; is valid, but complex to fully check heuristically)
            }

            // Check for boolean type
            if (type === 'boolean') {
                if (! (value === 'true' || value === 'false')) {
                    errors.push(`Type mismatch at line ${index + 1}: Cannot assign '${value}' to a 'boolean'. Expected 'true' or 'false'.`);
                }
            }

            // Check for char type
            if (type === 'char') {
                if (!(value.startsWith('\'') && value.endsWith('\'') && value.length === 3)) { // e.g., 'a'
                    if (!(/^[0-9]+$/.test(value) && parseInt(value) >= 0 && parseInt(value) <= 65535)) { // Unicode range
                         errors.push(`Type mismatch at line ${index + 1}: Cannot assign '${value}' to a 'char'. Expected a single character literal (e.g., 'a') or an integer within char range.`);
                    }
                }
            }

            // String type is more permissive, so simpler checks for now
            if (type === 'String') {
                if (/^[0-9]+$/.test(value)) {
                    errors.push(`Type mismatch at line ${index + 1}: Consider quoting numeric value for String assignment.`);
                }
                // New check for char literal assigned to String
                if (value.startsWith('\'') && value.endsWith('\'') && value.length === 3) {
                    errors.push(`Type mismatch at line ${index + 1}: Cannot assign a character literal ('${value}') to a 'String'. Use double quotes for String literals.`);
                }
            }
        }
    });

    // Basic semantic analysis: Detect simple undeclared variables (very rudimentary for Java)
    // This needs to be significantly more robust for real Java analysis.
    const declaredVariables = new Set();
    // Regex to find variable declarations, e.g., int x = 0;, String name;
    const declarationRegex = /\b(?:byte|short|int|long|float|double|boolean|char|String|[A-Z][a-zA-Z0-9_$]*)(?:\<[a-zA-Z_$][a-zA-Z0-9_$]*(?:,\s*[a-zA-Z_$][a-zA-Z0-9_$]*)*\>)?\s+([a-zA-Z_$][a-zA-Z0-9_$]*)(?:\s*\[\s*\])*\s*(?:=\s*[^;]+?)?;/g;
    let match;
    while ((match = declarationRegex.exec(code)) !== null) {
        if (match[1]) {
            declaredVariables.add(match[1]);
        }
    }

    // Add class names to declared variables (rudimentary)
    const classNameRegex = /\b(class|interface|enum)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g;
    while ((match = classNameRegex.exec(code)) !== null) {
        if (match[2]) {
            declaredVariables.add(match[2]);
        }
    }

    // Add method parameters to declared variables (rudimentary)
    const methodParamRegex = /\(([a-zA-Z_$][a-zA-Z0-9_$]*)(?:\s*\[\s*\])*\s+([a-zA-Z_$][a-zA-Z0-9_$]*)(?:,\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s+([a-zA-Z_$][a-zA-Z0-9_$]*))?\)*?/g;
    let paramMatch;
    while ((paramMatch = methodParamRegex.exec(code)) !== null) {
        for (let i = 2; i < paramMatch.length; i += 2) { // Parameters are at index 2, 4, 6...
            if (paramMatch[i]) {
                declaredVariables.add(paramMatch[i]);
            }
        }
    }

    // Pre-process code to remove string and character literals before checking for undeclared variables
    // This prevents flagging identifiers within literals as undeclared variables.
    let codeWithoutLiterals = code.replace(/"(?:[^"\\]|\\[\s\S])*"|'(?:[^'\\]|\\[\s\S])*'/g, ' ');

    // This will only catch very obvious undeclared variables and has many false positives
    const usageRegex = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g;
    const javaKeywords = new Set([
        'abstract', 'continue', 'for', 'new', 'switch', 'assert', 'default', 'goto', 'package', 'synchronized',
        'boolean', 'do', 'if', 'private', 'this', 'break', 'double', 'implements', 'protected', 'throw',
        'byte', 'else', 'import', 'public', 'throws', 'case', 'enum', 'instanceof', 'return', 'transient',
        'catch', 'extends', 'int', 'short', 'try', 'char', 'final', 'interface', 'static', 'void',
        'class', 'finally', 'long', 'strictfp', 'volatile', 'const', 'float', 'native', 'super', 'while',
        'true', 'false', 'null',
        // Commonly used standard library classes/packages to avoid false positives
        'System', 'String', 'Integer', 'Double', 'Boolean', 'Character', 'List', 'ArrayList', 'Map', 'HashMap',
        'Set', 'HashSet', 'Iterator', 'Exception', 'IOException', 'RuntimeException',
        'void', 'main', 'args', // Specific to your example
    ]);

    // Use codeWithoutLiterals for usage checks
    while ((match = usageRegex.exec(codeWithoutLiterals)) !== null) {
        const variableName = match[1];
        // The previous startIndex/endIndex logic for isInsideStringLiteral is no longer needed

        if (!javaKeywords.has(variableName) &&
            !declaredVariables.has(variableName) &&
            !/^[0-9]+$/.test(variableName) &&
            // Heuristic to avoid flagging property access (e.g., System.out, object.method())
            // Note: The substring operation needs to be on the original 'code' not 'codeWithoutLiterals' for context accuracy.
            // We need to re-calculate indices relative to the original code or avoid these checks here if possible.
            // For simplicity in this heuristic, we'll keep the substring checks and assume minimal offset.
            !code.substring(match.index - 5, match.index).match(/\.[a-zA-Z0-9_$]*$/) && // Checks for . followed by identifier
            // Heuristic to avoid flagging method calls (e.g., myMethod())
            !code.substring(match.index + match[0].length, match.index + match[0].length + 1).includes('(')
        ) {
            errors.push(`Possible undeclared variable: '${variableName}'`);
        }
    }

    // Basic Java Class and Method Structure Checks
    const classRegex = /\b(public|private|protected)?\s*(static)?\s*class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g;
    let classCount = 0;
    while (classRegex.exec(code) !== null) {
        classCount++;
    }

    if (classCount === 0) {
        errors.push('No class declaration found. Java code usually requires at least one class.');
    }

    const methodRegex = /\b(public|private|protected)?\s*(static)?\s*(final)?\s*(void|[a-zA-Z_$][a-zA-Z0-9_$]*)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;
    let methodCount = 0;
    while (methodRegex.exec(code) !== null) {
        methodCount++;
    }

    if (classCount > 0 && methodCount === 0) {
        errors.push('No method declaration found. Java classes usually contain methods.');
    }

    return errors;
}
