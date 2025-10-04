// Monaco Editor initialization and Java compilation functionality
require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.29.1/min/vs' }});
require(['vs/editor/editor.main'], function() {
    var editor = monaco.editor.create(document.getElementById('monaco-container'), {
        value: [
            'public class MyClass {',
            '    public static void main(String[] args) {',
            '        System.out.println("Hello Java!");',
            '    }',
            '}'
        ].join('\n'),
        language: "java",
        theme: "vs-dark",
        automaticLayout: true,
        fontSize: 16,
        minimap: { enabled: false }
    });

    const outputTerminal = document.getElementById('outputTerminal');

    // Redirect console.log and console.error to the output terminal
    (function () {
        var oldLog = console.log;
        var oldError = console.error;
        console.log = function (message) {
            oldLog.apply(console, arguments);
            outputTerminal.textContent += message + '\n';
        };
        console.error = function (message) {
            oldError.apply(console, arguments);
            outputTerminal.textContent += message + '\n';
        };
    })();

    document.getElementById('getValueButton').addEventListener('click', function() {
        function compileJavaCode(code) {
            const errors = [];

            // PHASE 1: LEXICAL ANALYSIS
            function lexicalAnalysis(code) {
                const tokenRegex = /\b(int|double|float|char|boolean|String|if|else|for|while|return|void|class|static|public|private)\b|[A-Za-z_]\w*|\d+|==|!=|<=|>=|&&|\|\||[+\-*/=<>!{}()[\];,.]/g;
                const tokens = code.match(tokenRegex);
                if (!tokens) {
                errors.push("Lexical Error: No recognizable tokens found.");
                }
                return tokens;
            }

            // PHASE 2: SYNTAX ANALYSIS
            function syntaxAnalysis(code) {
                if (!/class\s+\w+/.test(code)) {
                errors.push("Syntax Error: Missing class declaration.");
                }

                if (!/public\s+static\s+void\s+main\s*\(\s*String\s*\[\]\s*\w+\s*\)/.test(code)) {
                errors.push("Syntax Error: Missing or malformed main method.");
                }

                const openBraces = (code.match(/{/g) || []).length;
                const closeBraces = (code.match(/}/g) || []).length;
                if (openBraces !== closeBraces) {
                errors.push("Syntax Error: Mismatched braces.");
                }

                if (code.includes("/*") && !code.includes("*/")) {
                errors.push("Syntax Error: Unclosed block comment.");
                }

                // Simple semicolon check
                const lines = code.split('\n');
                lines.forEach((line, index) => {
                const trimmed = line.trim();
                if (
                    trimmed &&
                    !trimmed.startsWith("//") &&
                    !trimmed.endsWith(";") &&
                    !trimmed.endsWith("{") &&
                    !trimmed.endsWith("}") &&
                    !trimmed.includes("class") &&
                    !trimmed.includes("if") &&
                    !trimmed.includes("else") &&
                    !trimmed.includes("for") &&
                    !trimmed.includes("while")
                ) {
                    errors.push(`Syntax Error: Missing semicolon at line ${index + 1}.`);
                }
                });
            }

            // PHASE 3: SEMANTIC ANALYSIS
            function semanticAnalysis(code) {
                // Check invalid variable name
                if (/\b(int|double|String|boolean)\s+\d\w*/.test(code)) {
                errors.push("Semantic Error: Variable name cannot start with a number.");
                }

                // Check assigning string to int
                if (/int\s+\w+\s*=\s*".*?"/.test(code)) {
                errors.push("Semantic Error: Cannot assign a string literal to an int.");
                }

                // Check if conditions not boolean
                if (/if\s*\(\s*\d+\s*\)/.test(code)) {
                errors.push("Semantic Error: 'if' condition must be a boolean expression.");
                }

                // Check array declaration
                if (/int\s+\w+\(\)/.test(code)) {
                errors.push("Semantic Error: Invalid array declaration. Use [] instead of ().");
                }

                // Check undeclared variable usage (very simple check)
                if (/[^;\s]\s*=\s*[^=]/.test(code) && !/(int|String|boolean|double)/.test(code)) {
                errors.push("Semantic Error: Variable might be used before declaration.");
                }

                // Check return in non-void methods
                const methodRegex = /int\s+(\w+)\s*\([^)]*\)\s*{([^}]*)}/g;
                let match;
                while ((match = methodRegex.exec(code)) !== null) {
                const methodBody = match[2];
                if (!/return\s+.*?;/.test(methodBody)) {
                    errors.push(`Semantic Error: Method '${match[1]}' must return a value.`);
                }
                }
            }

            const tokens = lexicalAnalysis(code);
            syntaxAnalysis(code);
            semanticAnalysis(code);

            // Output results
            if (errors.length === 0) {
                console.log("✅ Code compiled successfully. No compile-time errors found.");
            } else {
                console.error("\n\n\n\n❌ Compile-time errors found:");
                errors.forEach((err, i) => console.error(`${i + 1}. ${err}`));
            }

            return errors;
        }

        var code = editor.getValue();
        outputTerminal.textContent = ''; // Clear terminal before new output
        console.log("Running code...");
        compileJavaCode(code);
    });
});
