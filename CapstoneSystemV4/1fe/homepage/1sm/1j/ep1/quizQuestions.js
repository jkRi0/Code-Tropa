// Quiz questions data - Beginner level (Episode 1)
const quizQuestions = [
    {
        question: "Which method is the entry point of a Java program?",
        options: [
            "start()",
            "main()",
            "init()",
            "run()"
        ],
        correct: 1
    },
    {
        question: "Which keyword is used to define a class in Java?",
        options: [
            "define",
            "class",
            "struct",
            "object"
        ],
        correct: 1
    },
    {
        question: "Java source code files have which extension?",
        options: [
            ".jav",
            ".java",
            ".class",
            ".js"
        ],
        correct: 1
    },
    {
        question: "Which symbol is used to end a statement in Java?",
        options: [
            ":",
            ".",
            ";",
            ","
        ],
        correct: 2
    },
    {
        question: "Which is a single-line comment in Java?",
        options: [
            "/* comment */",
            "// comment",
            "<!-- comment -->",
            "# comment"
        ],
        correct: 1
    },
    {
        question: "What is the purpose of comments in Java?",
        options: [
            "Improve performance",
            "Hide code from compiler",
            "Explain code",
            "Execute code"
        ],
        correct: 2
    },
    {
        question: "What is a variable in Java?",
        options: [
            "A method",
            "A data type",
            "A storage location",
            "A class"
        ],
        correct: 2
    },
    {
        question: "Which data type is used to store whole numbers?",
        options: [
            "float",
            "int",
            "char",
            "boolean"
        ],
        correct: 1
    },
    {
        question: "Which data type is used to store text?",
        options: [
            "int",
            "char",
            "String",
            "boolean"
        ],
        correct: 2
    },
    {
        question: "Which data type is used to store true or false?",
        options: [
            "int",
            "boolean",
            "char",
            "float"
        ],
        correct: 1
    },
    {
        question: "Which data type stores a single character?",
        options: [
            "String",
            "char",
            "byte",
            "int"
        ],
        correct: 1
    },
    {
        question: "Which is the correct print statement?",
        options: [
            "System.out.print()",
            "print(System.out)",
            "System.print.out()",
            "output.print()"
        ],
        correct: 0
    },
    {
        question: "Which statement is used to display output?",
        options: [
            "print()",
            "System.out.println()",
            "echo",
            "write"
        ],
        correct: 1
    },
    {
        question: "Java is:",
        options: [
            "Case-sensitive",
            "Case-insensitive",
            "Both",
            "None"
        ],
        correct: 0
    },
    {
        question: "Which of the following is a valid variable name?",
        options: [
            "2num",
            "num-1",
            "_num",
            "num#"
        ],
        correct: 2
    },
    {
        question: "Statements inside a class must be written inside:",
        options: [
            "()",
            "[]",
            "{}",
            "<>"
        ],
        correct: 2
    },
    {
        question: "What does JVM stand for?",
        options: [
            "Java Variable Machine",
            "Java Virtual Machine",
            "Java Visual Machine",
            "Java Verified Machine"
        ],
        correct: 1
    },
    {
        question: "Java programs are executed inside a:",
        options: [
            "Compiler",
            "JVM",
            "Editor",
            "Browser"
        ],
        correct: 1
    },
    {
        question: "Which operator is used for assignment?",
        options: [
            "==",
            "=",
            ":=",
            "=>"
        ],
        correct: 1
    },
    {
        question: "Which statement is true about Java?",
        options: [
            "Platform dependent",
            "Platform independent",
            "OS dependent",
            "Machine dependent"
        ],
        correct: 1
    },
    {
        question: "What is the correct way to print a message in Java?",
        options: [
            "Console.log(\"Hello!\");",
            "System.out.println(\"Hello!\");",
            "print(\"Hello!\");",
            "Write(\"Hello!\");"
        ],
        correct: 1
    },
    {
        question: "How do you start a comment in Java?",
        options: [
            "##",
            "<!-- -->",
            "//",
            "**"
        ],
        correct: 2
    },
    {
        question: "Which is a multi-line comment in Java?",
        options: [
            "// comment",
            "/* comment */",
            "# comment",
            "<!-- comment -->"
        ],
        correct: 1
    },
    {
        question: "What is the correct class declaration syntax in Java?",
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
        question: "Which of these is NOT a Java keyword?",
        options: [
            "static",
            "boolean",
            "include",
            "void"
        ],
        correct: 2
    },
    {
        question: "Java programs are compiled into:",
        options: [
            "Machine code",
            "Bytecode",
            "Assembly code",
            "Source code"
        ],
        correct: 1
    },
    {
        question: "Which data type is used for decimal values?",
        options: [
            "int",
            "char",
            "float",
            "boolean"
        ],
        correct: 2
    },
    {
        question: "Which is a valid char value?",
        options: [
            "'A'",
            "\"A\"",
            "65",
            "AB"
        ],
        correct: 0
    },
    {
        question: "What is the correct way to declare a variable in Java?",
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
        question: "What does 'println' do differently from 'print'?",
        options: [
            "Nothing, they're the same",
            "Adds a new line after printing",
            "Prints in uppercase",
            "Prints numbers only"
        ],
        correct: 1
    },
    {
        question: "Which is the correct way to write a String in Java?",
        options: [
            "'Hello'",
            "\"Hello\"",
            "Hello",
            "/Hello/"
        ],
        correct: 1
    },
    {
        question: "What must every Java program have?",
        options: [
            "A package",
            "A main method",
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
        question: "What is the minimum requirement for a Java program to run?",
        options: [
            "A class and a main method",
            "Just a class",
            "Just a main method",
            "A package and a class"
        ],
        correct: 0
    },
    {
        question: "Which is used to store multiple characters?",
        options: [
            "char",
            "String",
            "int",
            "boolean"
        ],
        correct: 1
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
        question: "Which is the correct order for a basic Java program structure?",
        options: [
            "main method, then class",
            "class, then main method",
            "import, then class, then main",
            "package, then import, then class, then main"
        ],
        correct: 2
    },
    {
        question: "What does 'public' mean in 'public static void main'?",
        options: [
            "The method is private",
            "The method can be accessed from anywhere",
            "The method returns a value",
            "The method is static"
        ],
        correct: 1
    },
    {
        question: "Which is used to display text on the screen?",
        options: [
            "System.in.read()",
            "System.out.println()",
            "System.err.print()",
            "System.input.get()"
        ],
        correct: 1
    },
    {
        question: "What is the purpose of curly braces {} in Java?",
        options: [
            "To separate statements",
            "To define blocks of code",
            "To create comments",
            "To print output"
        ],
        correct: 1
    },
    {
        question: "Which data type would you use to store someone's age?",
        options: [
            "String",
            "int",
            "boolean",
            "char"
        ],
        correct: 1
    },
    {
        question: "Which data type would you use to store someone's name?",
        options: [
            "int",
            "char",
            "String",
            "boolean"
        ],
        correct: 2
    },
    {
        question: "What is the output of: System.out.println(\"Hello\" + \" World\");",
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
            "final int number = 5;",
            "const number = 5;",
            "static number = 5;"
        ],
        correct: 1
    },
    {
        question: "What does 'void' mean in 'public static void main'?",
        options: [
            "The method returns nothing",
            "The method returns a value",
            "The method is empty",
            "The method is void"
        ],
        correct: 0
    },
    {
        question: "Which is used to combine two strings in Java?",
        options: [
            "+",
            "-",
            "*",
            "/"
        ],
        correct: 0
    },
    {
        question: "What is the correct way to write the number 10 in Java code?",
        options: [
            "'10'",
            "\"10\"",
            "10",
            "(10)"
        ],
        correct: 2
    },
    {
        question: "Which is NOT a valid Java identifier (variable name)?",
        options: [
            "myVariable",
            "_myVar",
            "myVar123",
            "123myVar"
        ],
        correct: 3
    },
    {
        question: "What is the purpose of the main method in Java?",
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
        question: "What happens when you use System.out.print() multiple times?",
        options: [
            "Each print appears on a new line",
            "All prints appear on the same line",
            "Only the last print shows",
            "An error occurs"
        ],
        correct: 1
    }
];
