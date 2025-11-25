// Shared function to simplify and make ANTLR error messages more specific
function simplifyErrorMessage(msg, offendingSymbol, code, line) {
    const symbol = offendingSymbol ? offendingSymbol.text : '';
    
    // Handle "extraneous input" errors
    if (msg.includes('extraneous input')) {
        const match = msg.match(/extraneous input '([^']+)' expecting/);
        if (match) {
            const found = match[1];
            const expectingPart = msg.substring(msg.indexOf('expecting') + 9).trim();
            
            // Extract most relevant expected tokens
            const commonTokens = [';', '}', ')', ']', ',', '{', '(', '['];
            const foundInExpecting = commonTokens.filter(t => expectingPart.includes(`'${t}'`));
            
            if (foundInExpecting.length > 0) {
                return `Unexpected '${found}' found. Expected: ${foundInExpecting.join(' or ')}`;
            }
            
            // Check for common keywords
            const keywords = ['class', 'public', 'private', 'static', 'void', 'int', 'String', 'return', 'if', 'for', 'while'];
            const foundKeywords = keywords.filter(k => expectingPart.includes(k));
            
            if (foundKeywords.length > 0) {
                return `Unexpected '${found}' found. Expected a statement or declaration.`;
            }
            
            return `Unexpected '${found}' found at this location.`;
        }
    }
    
    // Handle "mismatched input" errors
    if (msg.includes('mismatched input')) {
        const match = msg.match(/mismatched input '([^']+)' expecting '([^']+)'/);
        if (match) {
            const found = match[1];
            const expected = match[2];
            return `Expected '${expected}' but found '${found}'`;
        }
    }
    
    // Handle "missing" errors
    if (msg.includes('missing')) {
        const match = msg.match(/missing '([^']+)' at/);
        if (match) {
            const missing = match[1];
            return `Missing '${missing}'`;
        }
    }
    
    // Handle "no viable alternative" errors
    if (msg.includes('no viable alternative')) {
        return `Invalid syntax at this location`;
    }
    
    // Handle "token recognition error" (lexical errors)
    if (msg.includes('token recognition error')) {
        return `Invalid character or token: '${symbol}'`;
    }
    
    // For long error messages with many expected tokens, simplify
    if (msg.length > 100 && msg.includes('expecting')) {
        const beforeExpecting = msg.substring(0, msg.indexOf('expecting')).trim();
        if (beforeExpecting) {
            return beforeExpecting;
        }
    }
    
    // Default: return original message if it's short, otherwise simplify
    if (msg.length < 80) {
        return msg;
    }
    
    // Try to extract the key part before the long list
    const parts = msg.split(' expecting ');
    if (parts.length > 0 && parts[0].length < 100) {
        return parts[0] + ' (syntax error)';
    }
    
    return 'Syntax error at this location';
}

function formatAstString(astString) {
    if (!astString || typeof astString !== 'string') {
        return '';
    }

    const tokens = astString
        .replace(/\(/g, ' ( ')
        .replace(/\)/g, ' ) ')
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    const stack = [];
    let root = null;

    tokens.forEach(token => {
        if (token === '(') {
            const node = { name: null, values: [], children: [] };
            if (stack.length) {
                stack[stack.length - 1].children.push(node);
            } else {
                root = node;
            }
            stack.push(node);
        } else if (token === ')') {
            stack.pop();
        } else if (stack.length) {
            const current = stack[stack.length - 1];
            if (!current.name) {
                current.name = token;
            } else {
                current.values.push(token);
            }
        }
    });

    if (!root) {
        return astString;
    }

    const formatNode = (node, depth) => {
        const indent = '  '.repeat(depth);
        const header = node.values.length
            ? `${indent}${node.name}: ${node.values.join(' ')}`
            : `${indent}${node.name}`;
        const lines = [header];

        node.children.forEach(child => {
            lines.push(formatNode(child, depth + 1));
        });

        return lines.join('\n');
    };

    return formatNode(root, 0);
}

function compileJavaCode(code, difficulty) {
    let allIssues = [];
    let astRepresentation = '';

    // ANTLR-based grammar analysis
    function analyzeJavaGrammar(code) {
        // Check if ANTLR4 is available
        if (!window.antlr4Ready || typeof window.antlr4 === 'undefined') {
            console.warn('ANTLR4 not loaded yet, skipping grammar analysis');
            allIssues.push({
                id: 'antlr4-missing',
                severity: 'error',
                title: 'Analysis System Error',
                desc: 'Grammar analysis system is not available. Please refresh the page and try again.',
                line: 1,
                excerpt: 'System error - analysis dependencies missing'
            });
            return null;
        }

        if (typeof window.JavaLexer === 'undefined' || typeof window.JavaParser === 'undefined') {
            console.warn('Java ANTLR modules not loaded');
            allIssues.push({
                id: 'antlr4-missing',
                severity: 'error',
                title: 'Analysis System Error',
                desc: 'Java grammar modules are not available. Please refresh the page and try again.',
                line: 1,
                excerpt: 'System error - grammar modules missing'
            });
            return null;
        }

        try {
            const chars = new window.antlr4.InputStream(code);
            const lexer = new window.JavaLexer(chars);
            const tokens = new window.antlr4.CommonTokenStream(lexer);
            const parser = new window.JavaParser(tokens);
            parser.buildParseTrees = true;

            // Custom error listener to capture syntax errors
            const errorListener = new window.antlr4.error.ErrorListener();
            errorListener.syntaxError = (recognizer, offendingSymbol, line, column, msg, e) => {
                const simplifiedMsg = simplifyErrorMessage(msg, offendingSymbol, code, line);
                const lineContent = code.split('\n')[line - 1]?.trim() || '';
                
                allIssues.push({
                    id: 'syntax-error',
                    severity: 'error',
                    title: 'Syntax Error',
                    desc: simplifiedMsg,
                    line: line,
                    excerpt: offendingSymbol ? offendingSymbol.text : lineContent
                });
            };

            parser.removeErrorListeners();
            parser.addErrorListener(errorListener);
            lexer.removeErrorListeners();
            lexer.addErrorListener(errorListener);

            // Parse the code - this will trigger error listener if there are syntax errors
            const tree = parser.compilationUnit();
            if (tree && typeof tree.toStringTree === 'function') {
                const rawAst = tree.toStringTree(parser.ruleNames);
                astRepresentation = formatAstString(rawAst);

                // console.log(astRepresentation);  
            }
            
        } catch (error) {
            console.error('Exception during grammar analysis:', error);
            allIssues.push({
                id: 'grammar-exception',
                severity: 'error',
                title: 'Grammar Analysis Exception',
                desc: error.message,
                line: 1,
                excerpt: code.split('\n')[0]?.trim() || ''
            });
        }
    }

    // Run ANTLR grammar analysis
    analyzeJavaGrammar(code);

    // Deduplicate issues
    const seen = {};
    allIssues = allIssues.filter(it => {
        const k = [it.id, it.line, it.excerpt || ''].join('|');
        if (seen[k]) return false;
        seen[k] = true;
        return true;
    }).sort((a, b) => a.line - b.line);

    return {
        success: allIssues.length === 0,
        output: allIssues.length === 0 ? "" : "",
        ast: astRepresentation,
        errors: allIssues
    };
}

// Export to window (browser environment)
window.compileJavaCode = compileJavaCode;

