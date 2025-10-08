// syntaxRules_v2_fixed.js — Safe, fixed version of syntax rules
// This file is intended to replace or be used in place of syntaxRules_v2.js
window.SYNTAX_RULES_V2 = [
  // Dots and member access
  {id:'consecutive-dots',severity:'error',title:'Consecutive dots','desc':'Found ".." or more in member access (e.g. System..out).',match:/\.{2,}/},
  {id:'empty-member-after-dot',severity:'error',title:'Missing member after dot','desc':'Dot followed by dot or parenthesis (e.g. obj.( or System..).',match:/\.[\s]*\.|\.[\s]*\(/},

  // Print misuse
  {id:'print-no-args',severity:'error',title:'Print with no args','desc':'System.out.print() has no zero-arg overload; use println() or pass an arg.',match:/System\s*\.\s*out\s*\.\s*print\s*\(\s*\)/},

  // Semicolons
  {id:'missing-semicolon-line',severity:'error',title:'Missing semicolon (line)',desc:'Line likely needs a semicolon.',match:/[^;{}\s][^;{\n\r]*$/},
  {id:'extra-semicolon-after-if',severity:'warn',title:'Extra semicolon after if',desc:'Semicolon directly after if(condition); causes empty statement.',match:/if\s*\([^)]*\)\s*;\s*$/},

  // Braces/parens
  // we'll handle unclosed strings using function-based test below (safer)
  {id:'invalid-escape',severity:'error',title:'Invalid escape sequence',desc:'Invalid escape in string literal.',match:/\\[^btnfr"'\\u]/},

  // Char/string
  {id:'char-multi',severity:'error',title:'Char literal too long',desc:'Char literal must contain exactly one character.',match:/\'[^'\\]{2,}\'/},
  {id:'string-single-quotes',severity:'warn',title:'Single quotes used for string',desc:'Strings should use double quotes in Java.',match:/\bString\b[^=]*=[^;]*\'[^']*\'/},

  // Identifier / keywords
  {id:'invalid-identifier-start',severity:'error',title:'Invalid identifier start',desc:'Identifiers cannot start with a digit.',match:/\b\d+\w+\b/},
  // Conservative reserved-word detection: function-based to reduce false positives
  {id:'reserved-word-identifier',severity:'error',title:'Reserved word used as identifier',desc:'Keyword used as variable or method name.',
    match: {
      test: function(line){
        try{
          const reserved = ['class','interface','enum','public','private','protected','static','final','void','new','this','super','return'];
          // If reserved appears followed by assignment/semicolon/comma/closing-paren, it's likely used as an identifier
          const reFollow = new RegExp('\\\b(' + reserved.join('|') + ')\\\b\\s*(=|;|,|\\))');
          if(reFollow.test(line)) return true;
          // detect patterns like: int class = 5; => a type followed by a reserved word used as a variable name
          const types = ['byte','short','int','long','float','double','boolean','char','String'];
          const reTypeName = new RegExp('\\\b(' + types.join('|') + ')\\\b\\s+(' + reserved.join('|') + ')\\\b\\s*(=|;|,)');
          if(reTypeName.test(line)) return true;
          return false;
        }catch(e){ return false; }
      }
    }
  },
  {id:'wrong-case-keyword',severity:'warn',title:'Keyword case incorrect',desc:'Java keywords are lowercase (e.g. public, class).',match:/\bPublic\b|\bClass\b/},

  // Imports/packages order
  {id:'package-after-import',severity:'error',title:'package declaration after imports',desc:'package must be first statement in file (except comments).',match:/import[\s\S]*package\s+\w+/},
  {id:'import-after-class',severity:'error',title:'import after class',desc:'import statements must appear before type declarations.',match:/class\s+\w+[\s\S]*import\s+/},

  // Method and declaration problems
  {id:'method-inside-method',severity:'error',title:'Method declared inside another method',desc:'Java does not allow method definitions nested inside methods.',match:/\)\s*\{[\s\S]*\b(public|private|protected)\s+\w+\s+\w+\s*\(/},
  {id:'constructor-with-return',severity:'error',title:'Constructor has return type',desc:'Constructors must not have a return type.',match:/\b(public|protected|private)\s+\w+\s+\w+\s*\(/},

  // Arrays
  {id:'array-index-out-of-bounds-literal',severity:'warn',title:'Array index likely out of bounds',desc:'Accessing array index with literal likely out of bounds (heuristic).',match:/\w+\s*\[\s*\d+\s*\]/},
  {id:'array-length-call',severity:'error',title:'Using length() on array',desc:'Use array.length (no parentheses) for arrays.',match:/\.[\s]*length\s*\(/},

  // Numeric literals
  {id:'invalid-octal',severity:'error',title:'Invalid octal literal',desc:'Numeric literal starting with 0 contains 8 or 9.',match:/\b0[89]\d*\b/},
  {id:'bad-hex',severity:'error',title:'Malformed hex literal',desc:'Hex literal contains non-hex digits.',match:/0x[^0-9a-fA-F_]+/},
  {id:'bad-binary',severity:'error',title:'Malformed binary literal',desc:'Binary literal contains digits other than 0 or 1.',match:/0b[0-9A-Fa-f_]+/},

  // Switch/case
  {id:'duplicate-case',severity:'error',title:'Duplicate case label',desc:'Duplicate case labels in switch block (heuristic scanning done later).',match:/\bcase\b/},

  // Misc
  {id:'dangling-operator',severity:'error',title:'Dangling operator',desc:'Expression ends with operator or has consecutive operators.',match:/[+\-*/%&|^<>!]=?\s*$/},
  {id:'trailing-comma-in-array',severity:'warn',title:'Trailing comma in array initializer',desc:'Trailing comma in array initializer may be syntax error.',match:/\{[^}]+,\s*\}/},

  // SAFER unclosed-string detection (function-based, gives fewer false positives)
  {id:'unclosed-string',severity:'error',title:'Unclosed string literal',desc:'Double-quoted string not terminated.',
    match: {
      test: function(line){
        try{
          // remove escaped quotes (\") so they don't count
          const cleaned = line.replace(/\\"/g, '');
          const count = (cleaned.match(/"/g) || []).length;
          return count % 2 === 1;
        }catch(e){ return false; }
      }
    }
  }
];

// End of syntaxRules_v2_fixed.js


// syntaxRules_v2_enhanced.js — builds on top of syntaxRules_v2_fixed.js
// Adds additional structural and logic-based checks (safe and tested)

if (window.SYNTAX_RULES_V2) {
  window.SYNTAX_RULES_V2.push(
    // --- CLASS / STRUCTURE CHECKS ---
    {
      id: 'missing-class-keyword',
      severity: 'error',
      title: 'Missing class keyword',
      desc: 'Possible missing "class" keyword before class name (e.g. public HelloWorld {).',
      match: {
        test: function(line) {
          try {
            // match: public HelloWorld {   OR   HelloWorld {
            return /\b(public|private|protected)?\s*[A-Z]\w*\s*\{/.test(line) &&
                   !/\bclass\s+[A-Z]\w*/.test(line);
          } catch(e) { return false; }
        }
      }
    },

    {
      id: 'invalid-main-signature',
      severity: 'error',
      title: 'Invalid main() method signature',
      desc: 'Main method must be declared as public static void main(String[] args).',
      match: {
        test: function(line) {
          try {
            if (!/main\s*\(/.test(line)) return false;
            return !/public\s+static\s+void\s+main\s*\(\s*String\[\]\s*\w+\s*\)/.test(line);
          } catch(e) { return false; }
        }
      }
    },

    {
      id: 'missing-brace-after-class',
      severity: 'error',
      title: 'Missing opening brace after class declaration',
      desc: 'Class declarations must be followed by an opening brace "{"',
      match: {
        test: function(line) {
          return /\bclass\s+\w+\s*$/.test(line);
        }
      }
    },


    // --- CONTROL FLOW ---
    {
      id: 'missing-parentheses-control',
      severity: 'error',
      title: 'Missing parentheses in control statement',
      desc: 'Control statements like if/for/while/switch need parentheses.',
      match: /\b(if|for|while|switch)\s+[^{(]/
    },

    // --- METHODS ---
    {
        id: 'invalid-method-declaration',
        severity: 'error',
        title: 'Invalid method declaration syntax',
        desc: 'Possible malformed method declaration (missing return type or name).',
        match: {
            test: function(line) {
            try {
                // skip obvious calls (dot notation or assignments)
                if (/\.\s*\w+\s*\(/.test(line)) return false;
                if (/=\s*\w*\s*\(/.test(line)) return false;
                if (!/\(/.test(line)) return false;

                // detect: missing return type or malformed header
                const isDeclaration =
                /\b(public|private|protected)?\s*(static\s+)?\w+\s+\w+\s*\(.*\)/.test(line);
                const looksLikeHeader =
                /\b(public|private|protected|static|final|void|int|double|float|char|boolean|String)\b/.test(line);

                // If it looks like a header but not valid declaration
                return looksLikeHeader && !isDeclaration;
            } catch (e) {
                return false;
            }
            }
        }
    },


    {
      id: 'constructor-has-return',
      severity: 'error',
      title: 'Constructor has return type',
      desc: 'Constructors should not declare a return type.',
      match: /\b(public|protected|private)\s+\w+\s+\w+\s*\(/
    },

    // --- VARIABLES & NAMING ---
    {
      id: 'capitalized-variable',
      severity: 'warn',
      title: 'Variable naming style',
      desc: 'Variables should start with lowercase letters by convention.',
      match: /\b(int|float|double|boolean|char|String)\s+[A-Z]\w*\b/
    },

    // --- RETURN USAGE ---
    {
      id: 'invalid-return-outside-method',
      severity: 'error',
      title: 'Return used outside method',
      desc: 'Return appears outside of any method or constructor.',
      match: /^\s*return\b/
    }
  );
}

console.log("✅ syntaxRules_v2_enhanced.js loaded successfully with", window.SYNTAX_RULES_V2.length, "rules.");
