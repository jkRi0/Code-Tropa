import antlr4 from './antlr/antlr4.web.js';
import JavaLexer from './antlr/JavaLexer.js';
import JavaParser from './antlr/JavaParser.js';

// Make sure the classes are properly loaded
window.antlr4 = antlr4;
window.JavaLexer = JavaLexer;
window.JavaParser = JavaParser;

// Signal that ANTLR4 is ready
window.antlr4Ready = true;
console.log('ANTLR4 java modules loaded successfully:', {
    antlr4: typeof window.antlr4,
    JavaLexer: typeof window.JavaLexer,
    JavaParser: typeof window.JavaParser
});
