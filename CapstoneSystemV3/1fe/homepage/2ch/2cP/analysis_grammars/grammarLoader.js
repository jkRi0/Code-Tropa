import antlr4 from './antlr/antlr4.web.js';
import CPP14Lexer from './antlr/CPP14Lexer.js';
import CPP14Parser from './antlr/CPP14Parser.js';

// Make sure the classes are properly loaded
window.antlr4 = antlr4;
window.CPP14Lexer = CPP14Lexer;
window.CPP14Parser = CPP14Parser;

// Signal that ANTLR4 is ready
window.antlr4Ready = true;
console.log('ANTLR4 C++ modules loaded successfully:', {
    antlr4: typeof window.antlr4,
    CPP14Lexer: typeof window.CPP14Lexer,
    CPP14Parser: typeof window.CPP14Parser
});
