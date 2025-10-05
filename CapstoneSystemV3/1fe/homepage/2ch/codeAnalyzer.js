function compileJavaCode(code) {
    const errors = [];

    // ================================
    // PHASE 1: LEXICAL ANALYSIS
    // ================================
    function lexicalAnalysis(code) {
        const tokens = [];
        const tokenRegex = /\b(int|double|float|char|boolean|String|if|else|for|while|do|switch|case|break|continue|return|void|class|static|public|private|protected|final|abstract|interface|extends|implements|try|catch|throw|throws|new)\b|[A-Za-z_]\w*|\d+(\.\d+)?|==|!=|<=|>=|&&|\|\||[+\-*/=<>!%&|^~]|\+\+|--|->|<<|>>|>>>|\+=|-=|\*=|\/=|&=|\|=|\^=|%=|<<=|>>=|>>>=|"[^"]*"|'[^']*'|\/\/[^\n]*|\/\*[\s\S]*?\*\/|[{}()\[\];,.]/g;
        
        const lines = code.split("\n");
        lines.forEach((line, lineNum) => {
            let match;
            while ((match = tokenRegex.exec(line)) !== null) {
                tokens.push({ value: match[0], line: lineNum + 1 });
            }
        });

        if (tokens.length === 0) {
            errors.push("Lexical Error: No recognizable tokens found.");
        }

        return tokens;
    }

    // ================================
    // PHASE 2: SYNTAX ANALYSIS
    // ================================
    function syntaxAnalysis(code) {
        if (!/class\s+\w+(\s+extends\s+\w+)?(\s+implements\s+\w+(\s*,\s*\w+)*)?/.test(code)) {
            errors.push("Syntax Error: Invalid or missing class declaration.");
        }

        if (!/public\s+static\s+void\s+main\s*\(\s*String\s*(\[\s*\]|\[\])\s*\w+\s*\)/.test(code)) {
            errors.push("Syntax Error: Missing or malformed main method.");
        }

        // Bracket Matching
        const brackets = { '{': '}', '(': ')', '[': ']' };
        const stack = [];
        const lines = code.split('\n');
        lines.forEach((line, lineNum) => {
            for (const char of line) {
                if (brackets[char]) {
                    stack.push({ char, line: lineNum + 1 });
                } else if (Object.values(brackets).includes(char)) {
                    if (stack.length === 0) {
                        errors.push(`Syntax Error: Unexpected closing '${char}' at line ${lineNum + 1}`);
                    } else {
                        const last = stack.pop();
                        if (brackets[last.char] !== char) {
                            errors.push(`Syntax Error: Mismatched brackets at line ${lineNum + 1}. Expected '${brackets[last.char]}' but found '${char}'`);
                        }
                    }
                }
            }
        });
        if (stack.length > 0) {
            const last = stack.pop();
            errors.push(`Syntax Error: Unclosed bracket '${last.char}' from line ${last.line}`);
        }

        // System.out.println check
        const systemOutPattern = /System\.out\.(\w+)\s*\(/g;
        let match;
        while ((match = systemOutPattern.exec(code)) !== null) {
            if (!["println", "print"].includes(match[1])) {
                errors.push(`Syntax Error: Invalid System.out call '${match[1]}'. Use println() or print()`);
            }
        }

        // Common mistakes
        const commonMistakes = [
            { pattern: /System\.out[^.]/, message: "Syntax Error: Missing dot after 'System.out'" },
            { pattern: /System\s+\./, message: "Syntax Error: Unexpected space between 'System' and '.'" },
            { pattern: /println\s+\(/, message: "Syntax Error: Unexpected space between 'println' and '('." }
        ];
        commonMistakes.forEach(({ pattern, message }) => {
            if (pattern.test(code)) {
                errors.push(message);
            }
        });
    }

    // ================================
    // PHASE 3: SEMANTIC ANALYSIS
    // ================================
    function semanticAnalysis(code) {
        const declared = new Map(); // varName -> { type, line, used }
        const varDeclRegex = /\b(int|double|String|boolean|char)\s+(\w+)\s*=?\s*([^;]*)?;/g;
        let match;

        while ((match = varDeclRegex.exec(code)) !== null) {
            const [_, type, name, value] = match;
            const line = getLineOfMatch(code, match.index);

            // Redeclaration check
            if (declared.has(name)) {
                errors.push(`Semantic Error: Variable '${name}' redeclared at line ${line}`);
            } else {
                declared.set(name, { type, used: false, line });
            }

            // Type checking on initialization
            if (value) {
                const v = value.trim();
                switch (type) {
                    case "int":
                        if (!/^\d+$/.test(v)) {
                            errors.push(`Semantic Error: Invalid int value for '${name}' at line ${line}`);
                        }
                        break;
                    case "double":
                        if (!/^\d*\.?\d+$/.test(v)) {
                            errors.push(`Semantic Error: Invalid double value for '${name}' at line ${line}`);
                        }
                        break;
                    case "boolean":
                        if (!/^(true|false)$/.test(v)) {
                            errors.push(`Semantic Error: Invalid boolean value for '${name}' at line ${line}`);
                        }
                        break;
                    case "String":
                        if (!/^".*"$/.test(v)) {
                            errors.push(`Semantic Error: Invalid String value for '${name}' at line ${line}`);
                        }
                        break;
                    case "char":
                        if (!/^'.'$/.test(v)) {
                            errors.push(`Semantic Error: Invalid char value for '${name}' at line ${line}`);
                        }
                        break;
                }
            }
        }

        // Usage check
        declared.forEach((info, name) => {
            const regex = new RegExp(`\\b${name}\\b`, "g");
            let count = 0;
            while (regex.exec(code)) count++;
            if (count <= 1) {
                errors.push(`Warning: Variable '${name}' declared at line ${info.line} but never used.`);
            }
        });

        // Undefined variable usage
        const usageRegex = /\b([a-zA-Z_]\w*)\b/g;
        let usageMatch;
        while ((usageMatch = usageRegex.exec(code)) !== null) {
            const name = usageMatch[1];
            if (!declared.has(name) && !["System", "out", "print", "println", "main"].includes(name)) {
                const line = getLineOfMatch(code, usageMatch.index);
                errors.push(`Semantic Error: Variable '${name}' used before declaration at line ${line}`);
            }
        }
    }

    function getLineOfMatch(code, index) {
        return code.substring(0, index).split("\n").length;
    }

    // ================================
    // PHASE 4: RUNTIME SIMULATION
    // ================================
    function simulateRuntime(code) {
        const printRegex = /System\.out\.(println|print)\s*\((.*?)\)\s*;/g;
        let output = "";
        let match;

        while ((match = printRegex.exec(code)) !== null) {
            const [_, method, expr] = match;

            try {
                const cleanExpr = expr
                    .replace(/["']/g, "")              // remove quotes
                    .replace(/[A-Za-z_]\w*/g, v => `"${v}"`);  // replace vars with names
                const result = eval(cleanExpr); // Caution: eval is mocked here for output simulation only
                output += result + (method === "println" ? "\n" : "");
            } catch {
                errors.push(`Runtime Error: Cannot evaluate expression '${expr}'`);
            }
        }
        return output;
    }

    // ================================
    // EXECUTION PIPELINE
    // ================================
    const tokens = lexicalAnalysis(code);
    syntaxAnalysis(code);
    semanticAnalysis(code);

    if (errors.length > 0) {
        return {
            success: false,
            output: "",
            errors
        };
    }

    const output = simulateRuntime(code);
    return {
        success: true,
        output: output || "Program compiled successfully but had no output.",
        errors: []
    };
}

// Export to window (browser environment)
window.compileJavaCode = compileJavaCode;
