// Quiz questions data - C# basics questions (Beginner level)
const quizQuestions = [
    {
        question: "Which keyword is used to define a class in C#?",
        options: [
            "struct",
            "define",
            "class",
            "object"
        ],
        correct: 2
    },
    {
        question: "Which method is the entry point of a C# program?",
        options: [
            "Start()",
            "Main()",
            "Run()",
            "Init()"
        ],
        correct: 1
    },
    {
        question: "Which symbol is used to end a statement in C#?",
        options: [
            ":",
            ".",
            ";",
            ","
        ],
        correct: 2
    },
    {
        question: "Which file extension is used for C# source code?",
        options: [
            ".java",
            ".cpp",
            ".cs",
            ".csharp"
        ],
        correct: 2
    },
    {
        question: "Which symbol is used for single-line comments?",
        options: [
            "/*",
            "//",
            "##",
            "--"
        ],
        correct: 1
    },
    {
        question: "Which symbol is used for multi-line comments?",
        options: [
            "//",
            "##",
            "/* */",
            "<>"
        ],
        correct: 2
    },
    {
        question: "Comments in C# are used for?",
        options: [
            "Execution",
            "Compilation",
            "Documentation",
            "Debugging only"
        ],
        correct: 2
    },
    {
        question: "What is a variable?",
        options: [
            "A function",
            "A data type",
            "A storage location",
            "A class"
        ],
        correct: 2
    },
    {
        question: "Which of the following is a valid variable declaration?",
        options: [
            "int 1num;",
            "int num1;",
            "int num-1;",
            "int num#;"
        ],
        correct: 1
    },
    {
        question: "Variables must be declared ______ use.",
        options: [
            "after",
            "during",
            "before",
            "without"
        ],
        correct: 2
    },
    {
        question: "What is the default value of an int variable?",
        options: [
            "null",
            "1",
            "0",
            "undefined"
        ],
        correct: 2
    },
    {
        question: "Which keyword makes a variable constant?",
        options: [
            "static",
            "readonly",
            "final",
            "const"
        ],
        correct: 3
    },
    {
        question: "Variable names in C# are?",
        options: [
            "Case-insensitive",
            "Case-sensitive",
            "Uppercase only",
            "Lowercase only"
        ],
        correct: 1
    },
    {
        question: "Which data type stores whole numbers?",
        options: [
            "float",
            "double",
            "int",
            "decimal"
        ],
        correct: 2
    },
    {
        question: "Which data type stores true or false?",
        options: [
            "bool",
            "int",
            "char",
            "string"
        ],
        correct: 0
    },
    {
        question: "Which data type stores a single character?",
        options: [
            "string",
            "char",
            "bool",
            "int"
        ],
        correct: 1
    },
    {
        question: "Which data type stores text?",
        options: [
            "char",
            "string",
            "bool",
            "int"
        ],
        correct: 1
    },
    {
        question: "Which statement prints output to the console?",
        options: [
            "Console.Read()",
            "Console.Print()",
            "Console.WriteLine()",
            "Print.Console()"
        ],
        correct: 2
    },
    {
        question: "Which symbol starts a code block?",
        options: [
            "(",
            "[",
            "{",
            "<"
        ],
        correct: 2
    },
    {
        question: "Which symbol ends a code block?",
        options: [
            "}",
            "]",
            ")",
            ">"
        ],
        correct: 0
    },
    {
        question: "What are braces {} used for in C#?",
        options: [
            "To group code blocks and define scope",
            "To make the code look prettier",
            "To separate different files",
            "To indicate comments"
        ],
        correct: 0
    },
    {
        question: "Which data type is used for decimal values?",
        options: [
            "int",
            "char",
            "float",
            "bool"
        ],
        correct: 2
    },
    {
        question: "Which is the correct way to print a message in C#?",
        options: [
            "Console.log(\"Hello!\");",
            "Console.WriteLine(\"Hello!\");",
            "print(\"Hello!\");",
            "System.out.println(\"Hello!\");"
        ],
        correct: 1
    },
    {
        question: "How do you write a single-line comment in C#?",
        options: [
            "<!-- comment -->",
            "# comment",
            "// comment",
            "** comment **"
        ],
        correct: 2
    },
    {
        question: "What is the correct class declaration syntax in C#?",
        options: [
            "function HelloWorld {}",
            "public HelloWorld class {}",
            "class HelloWorld {}",
            "HelloWorld class()"
        ],
        correct: 2
    },
    {
        question: "Which keyword is used to create an object?",
        options: [
            "class",
            "new",
            "object",
            "create"
        ],
        correct: 1
    },
    {
        question: "Which of the following is NOT a valid C# data type?",
        options: [
            "int",
            "bool",
            "string",
            "varchar"
        ],
        correct: 3
    },
    {
        question: "Which data type is used for true/false conditions?",
        options: [
            "bit",
            "bool",
            "int",
            "char"
        ],
        correct: 1
    },
    {
        question: "Which keyword is used to return a value?",
        options: [
            "break",
            "exit",
            "return",
            "continue"
        ],
        correct: 2
    },
    {
        question: "What happens if you forget a semicolon at the end of a statement?",
        options: [
            "Nothing, it still works",
            "The program won't compile",
            "The program runs slower",
            "It becomes a comment"
        ],
        correct: 1
    },
    {
        question: "Which is the correct way to write a String in C#?",
        options: [
            "'Hello'",
            "\"Hello\"",
            "Hello",
            "/Hello/"
        ],
        correct: 1
    },
    {
        question: "What must every C# program have?",
        options: [
            "A namespace",
            "A Main method",
            "An import statement",
            "A constructor"
        ],
        correct: 1
    },
    {
        question: "Which is NOT a primitive data type?",
        options: [
            "int",
            "float",
            "String",
            "char"
        ],
        correct: 2
    },
    {
        question: "What is the minimum requirement for a C# program to run?",
        options: [
            "A class and a Main method",
            "Just a class",
            "Just a Main method",
            "A namespace and a class"
        ],
        correct: 0
    },
    {
        question: "Which is used to store multiple characters?",
        options: [
            "char",
            "string",
            "int",
            "bool"
        ],
        correct: 1
    },
    {
        question: "What is the output of: Console.WriteLine(\"Hello\" + \" World\");",
        options: [
            "Hello",
            "World",
            "Hello World",
            "Error"
        ],
        correct: 2
    },
    {
        question: "Which is the correct syntax for a variable that cannot change?",
        options: [
            "var number = 5;",
            "const int number = 5;",
            "readonly number = 5;",
            "static number = 5;"
        ],
        correct: 1
    },
    {
        question: "Which is used to combine two strings in C#?",
        options: [
            "+",
            "-",
            "*",
            "/"
        ],
        correct: 0
    },
    {
        question: "What is the correct way to write the number 10 in C# code?",
        options: [
            "'10'",
            "\"10\"",
            "10",
            "(10)"
        ],
        correct: 2
    },
    {
        question: "Which is NOT a valid C# identifier (variable name)?",
        options: [
            "myVariable",
            "_myVar",
            "myVar123",
            "123myVar"
        ],
        correct: 3
    },
    {
        question: "What is the purpose of the Main method in C#?",
        options: [
            "To define a class",
            "To start program execution",
            "To print output",
            "To declare variables"
        ],
        correct: 1
    },
    {
        question: "Which symbol is used for string concatenation?",
        options: [
            "&",
            "+",
            "-",
            "*"
        ],
        correct: 1
    },
    {
        question: "What happens when you use Console.Write() multiple times?",
        options: [
            "Each print appears on a new line",
            "All prints appear on the same line",
            "Only the last print shows",
            "An error occurs"
        ],
        correct: 1
    },
    {
        question: "Which data type would you use to store someone's age?",
        options: [
            "string",
            "int",
            "bool",
            "char"
        ],
        correct: 1
    },
    {
        question: "Which data type would you use to store someone's name?",
        options: [
            "int",
            "char",
            "string",
            "bool"
        ],
        correct: 2
    },
    {
        question: "What does 'void' mean in a method?",
        options: [
            "The method returns nothing",
            "The method returns a value",
            "The method is empty",
            "The method is void"
        ],
        correct: 0
    },
    {
        question: "Which is the correct way to declare a variable in C#?",
        options: [
            "int number = 5;",
            "number = 5;",
            "var number = 5;",
            "number int = 5;"
        ],
        correct: 0
    },
    {
        question: "Which symbol is used to separate parameters in a method?",
        options: [
            ":",
            ".",
            ";",
            ","
        ],
        correct: 3
    },
    {
        question: "What does 'WriteLine' do differently from 'Write'?",
        options: [
            "Nothing, they're the same",
            "Adds a new line after printing",
            "Prints in uppercase",
            "Prints numbers only"
        ],
        correct: 1
    },
    {
        question: "What is the purpose of curly braces {} in C#?",
        options: [
            "To separate statements",
            "To define blocks of code",
            "To create comments",
            "To print output"
        ],
        correct: 1
    },
    {
        question: "C# is:",
        options: [
            "Case-sensitive",
            "Case-insensitive",
            "Both",
            "None"
        ],
        correct: 0
    },
    {
        question: "Which statement is true about C#?",
        options: [
            "Platform dependent",
            "Platform independent",
            "OS dependent",
            "Machine dependent"
        ],
        correct: 1
    },
    {
        question: "Which is used to display text on the screen?",
        options: [
            "Console.Read()",
            "Console.WriteLine()",
            "Console.Error()",
            "Console.Input()"
        ],
        correct: 1
    }
];
