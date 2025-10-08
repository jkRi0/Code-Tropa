function compileJavaCode(code) {
    let allIssues = [];

    function getLineOfIndex(entire, idx) {
        return entire.substring(0, idx).split('\n').length;
    }

    // ================================
    // PHASE 1: LEXICAL ANALYSIS (simplified for now, main focus on higher phases)
    // ================================
    function lexicalAnalysis(code) {
        // Basic check for unclosed strings
        const lines = code.split('\n');
        lines.forEach((line, i) => {
            try {
                const cleaned = line.replace(/\\"/g, '');
                const count = (cleaned.match(/"/g) || []).length;
                if (count % 2 === 1) {
                    allIssues.push({
                        id: 'unclosed-string',
                        severity: 'error',
                        title: 'Unclosed string literal',
                        desc: 'Double-quoted string not terminated.',
                        line: i + 1,
                        excerpt: line.trim()
                    });
                }
            } catch (e) { /* ignore */ }
        });
    }

    // ================================
    // PHASE 2: SYNTAX ANALYSIS
    // ================================
    function syntaxAnalysis(code) {
        const lines = code.split('\n');
        const syntaxRules = window.SYNTAX_RULES_V2 || [];

        syntaxRules.forEach(rule => {
            if (typeof rule.match.test === 'function') {
                // Function-based test (e.g., for reserved words, unclosed strings)
                if (rule.id === 'unclosed-string') {
                    // Handled in lexicalAnalysis, avoid re-running
                    return;
                }
                // Some function-based rules (like 'reserved-word-identifier') might need the whole code
                if (rule.id === 'reserved-word-identifier') {
                    if (rule.match.test(code)) {
                         // This rule does not provide specific line numbers easily, so we add it as a general issue.
                        allIssues.push(Object.assign({ line: 1, excerpt: code.substring(0, 100) + '...' }, rule));
                    }
                } else {
                     lines.forEach((line, i) => {
                        try {
                            if (rule.match.test(line)) {
                                allIssues.push(Object.assign({ line: i + 1, excerpt: line.trim() }, rule));
                            }
                        } catch (e) { /* ignore */ }
                    });
                }

            } else if (rule.match instanceof RegExp) {
                // Regex-based test
                lines.forEach((line, i) => {
                    try {
                        if (rule.match.test(line)) {
                            allIssues.push(Object.assign({ line: i + 1, excerpt: line.trim() }, rule));
                        }
                    } catch (e) { /* ignore */ }
                });
            }
        });
    }

    // ================================
    // PHASE 3: SEMANTIC ANALYSIS
    // ================================
    function semanticAnalysis(code) {
        const lines = code.split('\n');
        const semanticRules = window.SEMANTIC_RULES_V2 || [];

        semanticRules.forEach(rule => {
            lines.forEach((line, i) => {
                try {
                    if (rule.match.test(line)) {
                        allIssues.push(Object.assign({ line: i + 1, excerpt: line.trim() }, rule));
                    }
                } catch (e) { /* ignore */ }
            });
        });
    }

    // ================================
    // PHASE 4: STRUCTURE ANALYSIS
    // ================================
    function structureAnalysis(code) {
        const structureHelpers = window.STRUCTURE_HELPERS_V2 || {};
        if (structureHelpers.checkBalancedChars) {
            allIssues = allIssues.concat(structureHelpers.checkBalancedChars(code));
        }
        if (structureHelpers.findMultiplePublicClasses) {
            allIssues = allIssues.concat(structureHelpers.findMultiplePublicClasses(code));
        }
        if (structureHelpers.findMethodNesting) {
            allIssues = allIssues.concat(structureHelpers.findMethodNesting(code));
        }
        // Advanced heuristics from main.js (if not already covered by rules)
        allIssues = allIssues.concat(detectMissingReturn(code));
        allIssues = allIssues.concat(detectUnreachableAfterReturn(code));
        allIssues = allIssues.concat(detectDuplicateCaseLabels(code));
    }

    // detect missing return in non-void methods (heuristic) - adapted from main.js
    function detectMissingReturn(code) {
        const issues = [];
        const methodRegex = /\b(public|protected|private)?\s*(static\s+)?([\w<>\[\]]+)\s+(\w+)\s*\(([^)]*)\)\s*\{/g;
        let m;
        while ((m = methodRegex.exec(code)) !== null) {
            const returnType = m[3];
            const name = m[4];
            const start = m.index;
            if (returnType === 'void') continue;

            let depth = 0;
            let found = false;
            for (let i = start; i < code.length; i++) {
                if (code[i] === '{') depth++;
                else if (code[i] === '}') depth--;
                if (code.substring(i, i + 6) === 'return') found = true;
                if (depth === 0 && i > start) break;
            }
            if (!found) issues.push({
                id: 'missing-return',
                severity: 'error',
                title: 'Missing return in method',
                desc: `Method '${name}' declares return type '${returnType}' but no return found (heuristic).`,
                line: getLineOfIndex(code, start)
            });
        }
        return issues;
    }

    // detect statements after return in same block (unreachable) - adapted from main.js
    function detectUnreachableAfterReturn(code) {
        const issues = [];
        const lines = code.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (/\breturn\b/.test(lines[i])) {
                // scan until next closing brace on same indentation level
                for (let j = i + 1; j < lines.length && j < i + 6; j++) {
                    if (lines[j].trim() !== '' && !/^\s*\/\//.test(lines[j])) issues.push({
                        id: 'unreachable-code',
                        severity: 'warn',
                        title: 'Code after return',
                        desc: 'Code after return is unreachable (within nearby lines).',
                        line: j + 1,
                        excerpt: lines[j].trim()
                    });
                }
            }
        }
        return issues;
    }

    // detect duplicate case labels inside switches (heuristic) - adapted from main.js
    function detectDuplicateCaseLabels(code) {
        const issues = [];
        const switchRegex = /switch\s*\(([^)]+)\)\s*\{/g;
        let m;
        while ((m = switchRegex.exec(code)) !== null) {
            const start = m.index;
            const bodyStart = code.indexOf('{', start);
            if (bodyStart < 0) continue;
            let depth = 0;
            let i = bodyStart;
            const labels = {};
            for (; i < code.length; i++) {
                if (code[i] === '{') depth++;
                else if (code[i] === '}') depth--;
                if (depth === 0) break;
                const sub = code.substring(i);
                const caseMatch = sub.match(/case\s+([^:]+)\s*:/);
                if (caseMatch) {
                    const lbl = caseMatch[1].trim();
                    if (labels[lbl]) issues.push({
                        id: 'duplicate-case',
                        severity: 'error',
                        title: 'Duplicate case label',
                        desc: `Case label ${lbl} repeated in same switch.`,
                        line: getLineOfIndex(code, i)
                    });
                    labels[lbl] = true;
                }
            }
        }
        return issues;
    }

    // ================================
    // PHASE 5: RUNTIME SIMULATION (kept as is)
    // ================================
    function simulateRuntime(code) {
        const printRegex = /System\.out\.(println|print)\s*\((.*?)\)\s*;/g;
        let output = "";
        let match;
        const symbolTable = {}; // Initialize symbol table

        // Regex to find variable declarations like 'int okay=1;'
        const varDeclRegex = /(\b(public|protected|private)?\s*(static\s+)?([\w<>\[\]]+)\s+(\w+)\s*=\s*([^;]+);)/g;
        while ((match = varDeclRegex.exec(code)) !== null) {
            const [_, accessModifier, staticModifier, type, name, value] = match;
            const start = match.index;
            const end = start + match[0].length;
            const line = getLineOfIndex(code, start);
            const excerpt = match[0].trim();

            try {
                let evaluatedValue = value.trim();
                if (evaluatedValue.startsWith('"') && evaluatedValue.endsWith('"')) {
                    evaluatedValue = evaluatedValue.substring(1, evaluatedValue.length - 1);
                } else if (evaluatedValue.startsWith("'") && evaluatedValue.endsWith("'")) {
                    evaluatedValue = evaluatedValue.substring(1, evaluatedValue.length - 1);
                }
                symbolTable[name] = { type, value: evaluatedValue, line, excerpt };
            } catch (e) {
                allIssues.push({
                    id: 'runtime-var-decl-error',
                    severity: 'error',
                    title: 'Runtime Variable Declaration Error',
                    desc: `Cannot evaluate value for variable '${name}' during simulation: ${e.message}`,
                    line: line,
                    excerpt: excerpt
                });
            }
        }

        while ((match = printRegex.exec(code)) !== null) {
            const [_, method, expr] = match;

            try {
                // Basic evaluation for string literals and simple variables
                let evaluatedExpr = expr.trim();

                // Handle string concatenations with variables
                const parts = evaluatedExpr.split(/\+/);
                let result = "";
                for (const part of parts) {
                    const trimmedPart = part.trim();
                    if (trimmedPart.startsWith('"') && trimmedPart.endsWith('"')) {
                        result += trimmedPart.substring(1, trimmedPart.length - 1);
                    } else if (trimmedPart.startsWith("'") && trimmedPart.endsWith("'")) {
                        result += trimmedPart.substring(1, trimmedPart.length - 1);
                    } else if (symbolTable[trimmedPart]) {
                        result += symbolTable[trimmedPart].value;
                    } else {
                        // If it's not a string and not in symbol table, treat as literal for now
                        result += trimmedPart;
                    }
                }
                output += result + (method === "println" ? "\n" : "");
            } catch (e) {
                allIssues.push({
                    id: 'runtime-eval-error',
                    severity: 'error',
                    title: 'Runtime Evaluation Error',
                    desc: `Cannot evaluate expression '${expr}' during simulation: ${e.message}`,
                    line: getLineOfIndex(code, match.index),
                    excerpt: match[0].trim()
                });
            }
        }
        return output;
    }

    // ================================
    // EXECUTION PIPELINE
    // ================================
    lexicalAnalysis(code);
    syntaxAnalysis(code);
    semanticAnalysis(code);
    structureAnalysis(code);

    // Deduplicate issues (logic from main.js)
    const seen = {};
    allIssues = allIssues.filter(it => {
        const k = [it.id, it.line, it.excerpt || ''].join('|');
        if (seen[k]) return false;
        seen[k] = true;
        return true;
    }).sort((a, b) => a.line - b.line || (a.severity === 'error' ? -1 : 1));

    let programOutput = "";
    if (allIssues.length === 0) {
        programOutput = simulateRuntime(code);
    }

    return {
        success: allIssues.length === 0,
        output: programOutput || (allIssues.length === 0 ? "Program compiled successfully but had no output." : ""),
        errors: allIssues
    };
}

// Export to window (browser environment)
window.compileJavaCode = compileJavaCode;
