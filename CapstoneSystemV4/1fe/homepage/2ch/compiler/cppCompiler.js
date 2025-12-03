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
            const keywords = ['class', 'public', 'private', 'static', 'void', 'int', 'return', 'if', 'for', 'while', 'namespace', 'using'];
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

async function compileCppCode(code, difficulty) {
    let allIssues = [];

    // ANTLR-based grammar analysis
    async function analyzeCppGrammar(code) {
        // Wait for ANTLR4 to be ready if it's still loading
        if (!window.antlr4Ready || typeof window.antlr4 === 'undefined') {
            if (window.antlr4LoadPromise) {
                try {
                    console.log('Waiting for ANTLR4 to load...');
                    await window.antlr4LoadPromise;
                    // Give it a moment to set window.antlr4Ready
                    await new Promise(resolve => setTimeout(resolve, 100));
                } catch (error) {
                    console.error('ANTLR4 failed to load:', error);
                }
            }
            
            // Check again after waiting
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
        }

        if (typeof window.CPP14Lexer === 'undefined' || typeof window.CPP14Parser === 'undefined') {
            console.warn('C++ ANTLR modules not loaded');
            allIssues.push({
                id: 'antlr4-missing',
                severity: 'error',
                title: 'Analysis System Error',
                desc: 'C++ grammar modules are not available. Please refresh the page and try again.',
                line: 1,
                excerpt: 'System error - grammar modules missing'
            });
            return null;
        }

        try {
            const chars = new window.antlr4.InputStream(code);
            const lexer = new window.CPP14Lexer(chars);
            const tokens = new window.antlr4.CommonTokenStream(lexer);
            const parser = new window.CPP14Parser(tokens);
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
            parser.translationUnit();
            
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
    await analyzeCppGrammar(code);

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
        errors: allIssues
    };
}

// Export to window (browser environment)
window.compileCppCode = compileCppCode;

