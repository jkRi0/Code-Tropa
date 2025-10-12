import antlr4 from './antlr/antlr4.web.js';
import CSharpLexer from './antlr/CSharpLexer.js';
import CSharpParser from './antlr/CSharpParser.js';

// Make sure the classes are properly loaded
window.antlr4 = antlr4;
window.CSharpLexer = CSharpLexer;
window.CSharpParser = CSharpParser;

// Signal that ANTLR4 is ready
window.antlr4Ready = true;
console.log('ANTLR4 C# modules loaded successfully:', {
    antlr4: typeof window.antlr4,
    CSharpLexer: typeof window.CSharpLexer,
    CSharpParser: typeof window.CSharpParser
});
