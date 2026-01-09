// Quiz questions data - C++ basics (Episode 1)
const quizQuestions = [
    {
        question: "Which of the following is a correct C++ program structure?",
        options: [
            "main() {}",
            "int main() {}",
            "void main()",
            "start() {}"
        ],
        correct: 1
    },
    {
        question: "Which header file is required for cout?",
        options: [
            "<stdio.h>",
            "<iostream>",
            "<conio.h>",
            "<stdlib.h>"
        ],
        correct: 1
    },
    {
        question: "Which symbol is used to end a C++ statement?",
        options: [
            ":",
            ".",
            ";",
            ","
        ],
        correct: 2
    },
    {
        question: "What is the correct syntax to print output in C++?",
        options: [
            "print(\"Hello\");",
            "cout << \"Hello\";",
            "printf(\"Hello\");",
            "echo \"Hello\";"
        ],
        correct: 1
    },
    {
        question: "Which namespace is used for standard C++ objects?",
        options: [
            "system",
            "std",
            "basic",
            "global"
        ],
        correct: 1
    },
    {
        question: "What does using namespace std; do?",
        options: [
            "Imports all C++ libraries",
            "Allows using standard names without std::",
            "Compiles faster",
            "Defines a new namespace"
        ],
        correct: 1
    },
    {
        question: "Which of the following is a single-line comment?",
        options: [
            "<!-- comment -->",
            "/* comment */",
            "// comment",
            "# comment"
        ],
        correct: 2
    },
    {
        question: "Which syntax is used for multi-line comments?",
        options: [
            "// comment //",
            "<!-- -->",
            "/* comment */",
            "# comment #"
        ],
        correct: 2
    },
    {
        question: "Which of the following is a valid variable name?",
        options: [
            "2num",
            "num_2",
            "int",
            "num-2"
        ],
        correct: 1
    },
    {
        question: "Which keyword is used to declare a variable?",
        options: [
            "var",
            "define",
            "int",
            "declare"
        ],
        correct: 2
    },
    {
        question: "What is the size of int (typically)?",
        options: [
            "1 byte",
            "2 bytes",
            "4 bytes",
            "8 bytes"
        ],
        correct: 2
    },
    {
        question: "Which data type stores decimal values?",
        options: [
            "int",
            "char",
            "float",
            "bool"
        ],
        correct: 2
    },
    {
        question: "Which data type is used to store a single character?",
        options: [
            "string",
            "char",
            "int",
            "float"
        ],
        correct: 1
    },
    {
        question: "Which symbol is used to assign a value?",
        options: [
            "==",
            "=",
            "!=",
            "<="
        ],
        correct: 1
    },
    {
        question: "What is the default return type of main()?",
        options: [
            "void",
            "float",
            "int",
            "double"
        ],
        correct: 2
    },
    {
        question: "Which of the following is a correct variable declaration?",
        options: [
            "int 2num;",
            "int num;",
            "num int;",
            "int-num;"
        ],
        correct: 1
    },
    {
        question: "What does endl do?",
        options: [
            "Ends program",
            "Inserts newline",
            "Clears screen",
            "Prints error"
        ],
        correct: 1
    },
    {
        question: "Which of these is NOT a C++ data type?",
        options: [
            "int",
            "float",
            "real",
            "char"
        ],
        correct: 2
    },
    {
        question: "Which operator is used for input?",
        options: [
            "<<",
            ">>",
            "<>",
            "=="
        ],
        correct: 1
    },
    {
        question: "What is the correct syntax to take input?",
        options: [
            "cin << x;",
            "cin >> x;",
            "input x;",
            "read x;"
        ],
        correct: 1
    },
    {
        question: "Which data type holds true or false?",
        options: [
            "int",
            "bool",
            "char",
            "float"
        ],
        correct: 1
    },
    {
        question: "Which is a correct constant declaration?",
        options: [
            "const int x = 5;",
            "int const = 5;",
            "constant x = 5;",
            "final int x = 5;"
        ],
        correct: 0
    },
    {
        question: "Which character is used to start preprocessor directives?",
        options: [
            "$",
            "@",
            "#",
            "%"
        ],
        correct: 2
    },
    {
        question: "Which of these is a keyword in C++?",
        options: [
            "printf",
            "main",
            "cout",
            "int"
        ],
        correct: 3
    },
    {
        question: "What is the correct way to declare multiple variables?",
        options: [
            "int a b c;",
            "int a, b, c;",
            "int a; b; c;",
            "int (a, b, c);"
        ],
        correct: 1
    },
    {
        question: "Which data type consumes the most memory?",
        options: [
            "char",
            "int",
            "float",
            "double"
        ],
        correct: 3
    },
    {
        question: "Which is a valid C++ comment?",
        options: [
            "/**/",
            "// comment",
            "/* comment */",
            "All of the above"
        ],
        correct: 3
    },
    {
        question: "What is the entry point of a C++ program?",
        options: [
            "start()",
            "main()",
            "program()",
            "run()"
        ],
        correct: 1
    },
    {
        question: "Which data type stores whole numbers only?",
        options: [
            "float",
            "double",
            "int",
            "bool"
        ],
        correct: 2
    },
    {
        question: "Which operator compares two values?",
        options: [
            "=",
            "==",
            "!=",
            "Both B and C"
        ],
        correct: 3
    },
    {
        question: "What is the value of an uninitialized local variable?",
        options: [
            "0",
            "Garbage value",
            "NULL",
            "Undefined behavior error"
        ],
        correct: 1
    },
    {
        question: "Which of the following is a correct char initialization?",
        options: [
            "char c = \"A\";",
            "char c = 'A';",
            "char c = A;",
            "char c = 65;"
        ],
        correct: 1
    },
    {
        question: "Which header is needed for cin?",
        options: [
            "<stdio.h>",
            "<iostream>",
            "<math.h>",
            "<string>"
        ],
        correct: 1
    },
    {
        question: "What does return 0; indicate?",
        options: [
            "Program failed",
            "Successful execution",
            "Loop break",
            "Function error"
        ],
        correct: 1
    },
    {
        question: "Which keyword is used to define a constant?",
        options: [
            "define",
            "const",
            "final",
            "static"
        ],
        correct: 1
    },
    {
        question: "Which data type is best for storing large decimal values?",
        options: [
            "float",
            "int",
            "double",
            "char"
        ],
        correct: 2
    },
    {
        question: "Which operator inserts data into output stream?",
        options: [
            ">>",
            "<<",
            "=",
            "<>"
        ],
        correct: 1
    },
    {
        question: "Which variable name is invalid?",
        options: [
            "_count",
            "count2",
            "2count",
            "count_2"
        ],
        correct: 2
    },
    {
        question: "Which of the following is a correct boolean value?",
        options: [
            "yes",
            "true",
            "1.0",
            "\"true\""
        ],
        correct: 1
    },
    {
        question: "What is the purpose of #include?",
        options: [
            "Run program",
            "Add library files",
            "Define variables",
            "Print output"
        ],
        correct: 1
    },
    {
        question: "Which symbol is used for scope resolution?",
        options: [
            ".",
            ":",
            "::",
            "->"
        ],
        correct: 2
    },
    {
        question: "Which of the following is a valid integer literal?",
        options: [
            "12.5",
            "'12'",
            "12",
            "\"12\""
        ],
        correct: 2
    },
    {
        question: "Which type is used for true/false logic?",
        options: [
            "int",
            "bool",
            "char",
            "float"
        ],
        correct: 1
    },
    {
        question: "Which of these is not a built-in data type?",
        options: [
            "int",
            "float",
            "string",
            "double"
        ],
        correct: 2
    },
    {
        question: "Which line prints text and moves cursor to next line?",
        options: [
            "cout << \"Hi\";",
            "cout << endl;",
            "cout << \"Hi\" << endl;",
            "Both B and C"
        ],
        correct: 3
    },
    {
        question: "Which of the following is case-sensitive?",
        options: [
            "C++ language",
            "Variables",
            "Keywords",
            "All of the above"
        ],
        correct: 3
    },
    {
        question: "Which data type uses the least memory?",
        options: [
            "int",
            "float",
            "char",
            "double"
        ],
        correct: 2
    },
    {
        question: "Which is the correct way to declare a float?",
        options: [
            "float x = 10;",
            "float x = 10.5;",
            "float = x 10.5;",
            "x float = 10.5;"
        ],
        correct: 1
    },
    {
        question: "What is the output of cout << 5 + 5;?",
        options: [
            "55",
            "10",
            "5+5",
            "Error"
        ],
        correct: 1
    },
    {
        question: "Which data type can store the largest number?",
        options: [
            "int",
            "float",
            "double",
            "char"
        ],
        correct: 2
    }
];
