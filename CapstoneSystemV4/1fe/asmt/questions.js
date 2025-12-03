// Question banks for Pre-Test and Post-Test
// Each question has: topic, question, code (optional), options, correctAnswer

const javaQuestions = [
    // Topic 1: Basic Syntax, Code Structure, and Comments
    {
        topic: "Basic Syntax & Code Structure",
        question: "What is the correct way to write a single-line comment in Java?",
        options: [
            "/* This is a comment */",
            "// This is a comment",
            "# This is a comment",
            "<!-- This is a comment -->"
        ],
        correctAnswer: 1
    },
    {
        topic: "Basic Syntax & Code Structure",
        question: "Which of the following is the correct syntax for a main method in Java?",
        options: [
            "public void main(String[] args)",
            "public static void main(String[] args)",
            "static void main(String args[])",
            "void main()"
        ],
        correctAnswer: 1
    },
    {
        topic: "Basic Syntax & Code Structure",
        question: "What is the file extension for Java source code files?",
        options: [
            ".class",
            ".exe",
            ".java",
            ".txt"
        ],
        correctAnswer: 2
    },
    // {
    //     topic: "Basic Syntax & Code Structure",
    //     question: "Which symbol is used to mark the end of a statement in Java?",
    //     options: [
    //         ".",
    //         ",",
    //         ";",
    //         ":"
    //     ],
    //     correctAnswer: 2
    // },
    // {
    //     topic: "Basic Syntax & Code Structure",
    //     question: "What is the purpose of multi-line comments in Java?",
    //     options: [
    //         "To execute multiple lines of code",
    //         "To comment out large blocks of text or code",
    //         "To create variables",
    //         "To import packages"
    //     ],
    //     correctAnswer: 1
    // },

    // // Topic 2: Variables and Data Types
    // {
    //     topic: "Variables & Data Types",
    //     question: "Which of the following is a valid variable declaration in Java?",
    //     options: [
    //         "int 123variable;",
    //         "int variable_123;",
    //         "int variable-123;",
    //         "int #variable;"
    //     ],
    //     correctAnswer: 1
    // },
    // {
    //     topic: "Variables & Data Types",
    //     question: "What is the default value of a boolean variable in Java?",
    //     options: [
    //         "true",
    //         "false",
    //         "0",
    //         "null"
    //     ],
    //     correctAnswer: 1
    // },
    // {
    //     topic: "Variables & Data Types",
    //     question: "Which data type would you use to store the value 3.14159?",
    //     options: [
    //         "int",
    //         "boolean",
    //         "double",
    //         "char"
    //     ],
    //     correctAnswer: 2
    // },
    // {
    //     topic: "Variables & Data Types",
    //     question: "What is the range of the byte data type in Java?",
    //     options: [
    //         "0 to 255",
    //         "-128 to 127",
    //         "-32768 to 32767",
    //         "0 to 65535"
    //     ],
    //     correctAnswer: 1
    // },
    // {
    //     topic: "Variables & Data Types",
    //     question: "Which keyword is used to declare a constant in Java?",
    //     options: [
    //         "const",
    //         "constant",
    //         "final",
    //         "static"
    //     ],
    //     correctAnswer: 2
    // },

    // // Topic 3: Operators and Expressions
    // {
    //     topic: "Operators & Expressions",
    //     question: "What is the result of 10 % 3 in Java?",
    //     options: [
    //         "3",
    //         "1",
    //         "0",
    //         "3.33"
    //     ],
    //     correctAnswer: 1
    // },
    // {
    //     topic: "Operators & Expressions",
    //     question: "What does the ++ operator do?",
    //     options: [
    //         "Adds two numbers",
    //         "Increments a value by 1",
    //         "Multiplies by 2",
    //         "Compares two values"
    //     ],
    //     correctAnswer: 1
    // },
    // {
    //     topic: "Operators & Expressions",
    //     question: "Which operator is used for logical AND in Java?",
    //     options: [
    //         "&",
    //         "&&",
    //         "AND",
    //         "||"
    //     ],
    //     correctAnswer: 1
    // },
    // {
    //     topic: "Operators & Expressions",
    //     question: "What will be the output of the following expression: 5 + 3 * 2?",
    //     options: [
    //         "16",
    //         "11",
    //         "13",
    //         "10"
    //     ],
    //     correctAnswer: 1
    // },
    // {
    //     topic: "Operators & Expressions",
    //     question: "Which operator is used to compare two values for equality?",
    //     options: [
    //         "=",
    //         "==",
    //         "===",
    //         "equals()"
    //     ],
    //     correctAnswer: 1
    // },

    // // Topic 4: Control Flow
    // {
    //     topic: "Control Flow",
    //     question: "Which statement is used to exit a loop prematurely?",
    //     options: [
    //         "exit",
    //         "stop",
    //         "break",
    //         "return"
    //     ],
    //     correctAnswer: 2
    // },
    // {
    //     topic: "Control Flow",
    //     question: "What is the purpose of the 'else if' statement?",
    //     options: [
    //         "To test multiple conditions sequentially",
    //         "To create loops",
    //         "To declare variables",
    //         "To define methods"
    //     ],
    //     correctAnswer: 0
    // },
    // {
    //     topic: "Control Flow",
    //     question: "Which loop is guaranteed to execute at least once?",
    //     options: [
    //         "for loop",
    //         "while loop",
    //         "do-while loop",
    //         "foreach loop"
    //     ],
    //     correctAnswer: 2
    // },
    // {
    //     topic: "Control Flow",
    //     question: "What is the purpose of the 'continue' statement in a loop?",
    //     options: [
    //         "Exits the loop completely",
    //         "Skips the current iteration and continues with the next",
    //         "Pauses the loop",
    //         "Restarts the loop from the beginning"
    //     ],
    //     correctAnswer: 1
    // },
    // {
    //     topic: "Control Flow",
    //     question: "In a switch statement, what happens if you omit the 'break' keyword?",
    //     options: [
    //         "Compilation error",
    //         "The program crashes",
    //         "Fall-through occurs to the next case",
    //         "The switch statement ends"
    //     ],
    //     correctAnswer: 2
    // },

    // // Topic 5: String Operations
    // {
    //     topic: "String Operations",
    //     question: "Which method is used to find the length of a string in Java?",
    //     options: [
    //         "size()",
    //         "length()",
    //         "count()",
    //         "len()"
    //     ],
    //     correctAnswer: 1
    // },
    // {
    //     topic: "String Operations",
    //     question: "What does the concat() method do?",
    //     options: [
    //         "Compares two strings",
    //         "Joins two strings together",
    //         "Converts string to uppercase",
    //         "Splits a string"
    //     ],
    //     correctAnswer: 1
    // },
    // {
    //     topic: "String Operations",
    //     question: "Which method would you use to convert a string to uppercase?",
    //     options: [
    //         "upper()",
    //         "toUpper()",
    //         "toUpperCase()",
    //         "uppercase()"
    //     ],
    //     correctAnswer: 2
    // },
    // {
    //     topic: "String Operations",
    //     question: "How do you compare two strings for equality in Java?",
    //     options: [
    //         "Using == operator",
    //         "Using equals() method",
    //         "Using compare() method",
    //         "Using is() method"
    //     ],
    //     correctAnswer: 1
    // },
    // {
    //     topic: "String Operations",
    //     question: "What does the substring() method do?",
    //     options: [
    //         "Replaces part of a string",
    //         "Extracts a portion of a string",
    //         "Deletes characters from a string",
    //         "Adds characters to a string"
    //     ],
    //     correctAnswer: 1
    // },

    // // Topic 6: Arrays
    // {
    //     topic: "Arrays",
    //     question: "How do you declare an integer array in Java?",
    //     options: [
    //         "int array[];",
    //         "array int[];",
    //         "int[] array;",
    //         "Both A and C are correct"
    //     ],
    //     correctAnswer: 3
    // },
    // {
    //     topic: "Arrays",
    //     question: "What is the index of the first element in a Java array?",
    //     options: [
    //         "1",
    //         "0",
    //         "-1",
    //         "Depends on array size"
    //     ],
    //     correctAnswer: 1
    // },
    // {
    //     topic: "Arrays",
    //     question: "Which property is used to find the length of an array?",
    //     options: [
    //         "size",
    //         "length",
    //         "count",
    //         "size()"
    //     ],
    //     correctAnswer: 1
    // },
    // {
    //     topic: "Arrays",
    //     question: "What happens if you try to access an array element beyond its bounds?",
    //     options: [
    //         "Returns null",
    //         "Returns 0",
    //         "ArrayIndexOutOfBoundsException is thrown",
    //         "Creates a new element"
    //     ],
    //     correctAnswer: 2
    // },
    // {
    //     topic: "Arrays",
    //     question: "How do you create an array with 5 elements in Java?",
    //     options: [
    //         "int[] arr = new int[5];",
    //         "int[] arr = new int(5);",
    //         "int[] arr = array[5];",
    //         "int[] arr = [5];"
    //     ],
    //     correctAnswer: 0
    // },

    // // Topic 7: Methods/Functions
    // {
    //     topic: "Methods / Functions",
    //     question: "What is a method in Java?",
    //     options: [
    //         "A variable",
    //         "A reusable block of code",
    //         "A data type",
    //         "A loop structure"
    //     ],
    //     correctAnswer: 1
    // },
    // {
    //     topic: "Methods / Functions",
    //     question: "Which keyword is used to return a value from a method?",
    //     options: [
    //         "give",
    //         "send",
    //         "return",
    //         "output"
    //     ],
    //     correctAnswer: 2
    // },
    // {
    //     topic: "Methods / Functions",
    //     question: "What is the return type of a method that doesn't return any value?",
    //     options: [
    //         "null",
    //         "void",
    //         "empty",
    //         "none"
    //     ],
    //     correctAnswer: 1
    // },
    // {
    //     topic: "Methods / Functions",
    //     question: "What are parameters in a method?",
    //     options: [
    //         "Return values",
    //         "Variables declared inside the method",
    //         "Values passed to the method when it's called",
    //         "Method names"
    //     ],
    //     correctAnswer: 2
    // },
    // {
    //     topic: "Methods / Functions",
    //     question: "Can a method have multiple return statements?",
    //     options: [
    //         "No, never",
    //         "Yes, but only one will execute",
    //         "Yes, all of them execute",
    //         "Only in special cases"
    //     ],
    //     correctAnswer: 1
    // }
];

const cppQuestions = [
    // Topic 1: Basic Syntax, Code Structure, and Comments
    {
        topic: "Basic Syntax & Code Structure",
        question: "What is the correct way to write a single-line comment in C++?",
        options: [
            "/* This is a comment */",
            "// This is a comment",
            "# This is a comment",
            "<!-- This is a comment -->"
        ],
        correctAnswer: 1
    },
    {
        topic: "Basic Syntax & Code Structure",
        question: "Which header file is required for input/output operations in C++?",
        options: [
            "#include <stdio.h>",
            "#include <iostream>",
            "#include <io.h>",
            "#include <stream>"
        ],
        correctAnswer: 1
    },
    {
        topic: "Basic Syntax & Code Structure",
        question: "What is the file extension for C++ source code files?",
        options: [
            ".c",
            ".cpp",
            ".exe",
            ".h"
        ],
        correctAnswer: 1
    },
    {
        topic: "Basic Syntax & Code Structure",
        question: "Which namespace is commonly used in C++ programs?",
        options: [
            "using namespace system;",
            "using namespace standard;",
            "using namespace std;",
            "using namespace cpp;"
        ],
        correctAnswer: 2
    },
    {
        topic: "Basic Syntax & Code Structure",
        question: "What symbol marks the end of a statement in C++?",
        options: [
            ".",
            ",",
            ";",
            ":"
        ],
        correctAnswer: 2
    },

    // Topic 2: Variables and Data Types
    {
        topic: "Variables & Data Types",
        question: "Which of the following is a valid variable name in C++?",
        options: [
            "2variable",
            "_variable2",
            "variable-2",
            "variable 2"
        ],
        correctAnswer: 1
    },
    {
        topic: "Variables & Data Types",
        question: "What is the size of an int in C++ (typically)?",
        options: [
            "1 byte",
            "2 bytes",
            "4 bytes",
            "8 bytes"
        ],
        correctAnswer: 2
    },
    {
        topic: "Variables & Data Types",
        question: "Which data type is used to store single characters in C++?",
        options: [
            "string",
            "char",
            "character",
            "text"
        ],
        correctAnswer: 1
    },
    {
        topic: "Variables & Data Types",
        question: "What is the keyword to declare a constant variable in C++?",
        options: [
            "constant",
            "const",
            "final",
            "static"
        ],
        correctAnswer: 1
    },
    {
        topic: "Variables & Data Types",
        question: "Which data type would you use for true/false values?",
        options: [
            "boolean",
            "bool",
            "bit",
            "flag"
        ],
        correctAnswer: 1
    },

    // Topic 3: Operators and Expressions
    {
        topic: "Operators & Expressions",
        question: "What is the result of 15 / 4 in C++ (integer division)?",
        options: [
            "3.75",
            "3",
            "4",
            "3.0"
        ],
        correctAnswer: 1
    },
    {
        topic: "Operators & Expressions",
        question: "What does the -- operator do?",
        options: [
            "Subtracts two numbers",
            "Decrements a value by 1",
            "Divides by 2",
            "Compares two values"
        ],
        correctAnswer: 1
    },
    {
        topic: "Operators & Expressions",
        question: "Which operator is used for logical OR in C++?",
        options: [
            "|",
            "||",
            "OR",
            "&&"
        ],
        correctAnswer: 1
    },
    {
        topic: "Operators & Expressions",
        question: "What is the modulus operator in C++?",
        options: [
            "/",
            "%",
            "mod",
            "\\"
        ],
        correctAnswer: 1
    },
    {
        topic: "Operators & Expressions",
        question: "Which operator is used to access members of a pointer?",
        options: [
            ".",
            "->",
            "::",
            "*"
        ],
        correctAnswer: 1
    },

    // Topic 4: Control Flow
    {
        topic: "Control Flow",
        question: "What is the syntax for an if statement in C++?",
        options: [
            "if (condition) then { }",
            "if condition { }",
            "if (condition) { }",
            "if [condition] { }"
        ],
        correctAnswer: 2
    },
    {
        topic: "Control Flow",
        question: "Which loop structure checks the condition before executing?",
        options: [
            "do-while",
            "while",
            "for",
            "Both B and C"
        ],
        correctAnswer: 3
    },
    {
        topic: "Control Flow",
        question: "What keyword is used to skip to the next iteration of a loop?",
        options: [
            "skip",
            "next",
            "continue",
            "break"
        ],
        correctAnswer: 2
    },
    {
        topic: "Control Flow",
        question: "In a for loop, which part is executed only once?",
        options: [
            "Initialization",
            "Condition",
            "Update",
            "Body"
        ],
        correctAnswer: 0
    },
    {
        topic: "Control Flow",
        question: "What is the purpose of the default case in a switch statement?",
        options: [
            "It's mandatory in all switch statements",
            "It handles cases that don't match any other case",
            "It's the first case to be checked",
            "It exits the switch statement"
        ],
        correctAnswer: 1
    },

    // Topic 5: String Operations
    {
        topic: "String Operations",
        question: "Which header is needed to use the string class in C++?",
        options: [
            "#include <str>",
            "#include <string>",
            "#include <strings>",
            "#include <text>"
        ],
        correctAnswer: 1
    },
    {
        topic: "String Operations",
        question: "How do you find the length of a string in C++?",
        options: [
            "str.length()",
            "str.size()",
            "strlen(str)",
            "All of the above"
        ],
        correctAnswer: 3
    },
    {
        topic: "String Operations",
        question: "Which function concatenates two strings?",
        options: [
            "str.add()",
            "str.concat()",
            "str + str2 or str.append()",
            "str.join()"
        ],
        correctAnswer: 2
    },
    {
        topic: "String Operations",
        question: "How do you access individual characters in a C++ string?",
        options: [
            "str[index]",
            "str.at(index)",
            "str.charAt(index)",
            "Both A and B"
        ],
        correctAnswer: 3
    },
    {
        topic: "String Operations",
        question: "Which method extracts a substring from a C++ string?",
        options: [
            "str.extract()",
            "str.substring()",
            "str.substr()",
            "str.slice()"
        ],
        correctAnswer: 2
    },

    // Topic 6: Arrays
    {
        topic: "Arrays",
        question: "How do you declare an array of 10 integers in C++?",
        options: [
            "int arr[10];",
            "array<int, 10> arr;",
            "int[] arr = new int[10];",
            "Both A and B"
        ],
        correctAnswer: 3
    },
    {
        topic: "Arrays",
        question: "What is the index of the last element in an array of size 5?",
        options: [
            "5",
            "4",
            "6",
            "0"
        ],
        correctAnswer: 1
    },
    {
        topic: "Arrays",
        question: "Can array size be changed after declaration in C++?",
        options: [
            "Yes, always",
            "No, arrays have fixed size",
            "Yes, but only to a smaller size",
            "Only if using dynamic arrays"
        ],
        correctAnswer: 3
    },
    {
        topic: "Arrays",
        question: "How do you initialize an array with values in C++?",
        options: [
            "int arr[] = {1, 2, 3, 4, 5};",
            "int arr[] = [1, 2, 3, 4, 5];",
            "int arr[] = (1, 2, 3, 4, 5);",
            "int arr = {1, 2, 3, 4, 5};"
        ],
        correctAnswer: 0
    },
    {
        topic: "Arrays",
        question: "What happens when you access an out-of-bounds array element?",
        options: [
            "Compilation error",
            "Runtime error is thrown",
            "Undefined behavior (may crash or return garbage)",
            "Returns 0"
        ],
        correctAnswer: 2
    },

    // Topic 7: Methods/Functions
    {
        topic: "Methods / Functions",
        question: "What is the basic structure of a function in C++?",
        options: [
            "returnType functionName(parameters) { }",
            "function functionName(parameters) : returnType { }",
            "def functionName(parameters) { }",
            "functionName(parameters) -> returnType { }"
        ],
        correctAnswer: 0
    },
    {
        topic: "Methods / Functions",
        question: "What does void mean as a return type?",
        options: [
            "The function returns null",
            "The function doesn't return any value",
            "The function returns an empty string",
            "The function returns 0"
        ],
        correctAnswer: 1
    },
    {
        topic: "Methods / Functions",
        question: "What is function overloading?",
        options: [
            "Calling a function multiple times",
            "Having multiple functions with the same name but different parameters",
            "A function that does too much",
            "A function with too many parameters"
        ],
        correctAnswer: 1
    },
    {
        topic: "Methods / Functions",
        question: "How do you pass an array to a function in C++?",
        options: [
            "void func(int arr[]);",
            "void func(int* arr);",
            "void func(int arr[], int size);",
            "All of the above"
        ],
        correctAnswer: 3
    },
    {
        topic: "Methods / Functions",
        question: "What is the difference between pass by value and pass by reference?",
        options: [
            "No difference",
            "Pass by value copies the data, pass by reference passes the memory address",
            "Pass by reference is faster for all data types",
            "Pass by value is always better"
        ],
        correctAnswer: 1
    }
];

const csharpQuestions = [
    // Topic 1: Basic Syntax, Code Structure, and Comments
    {
        topic: "Basic Syntax & Code Structure",
        question: "What is the correct way to write a single-line comment in C#?",
        options: [
            "/* This is a comment */",
            "// This is a comment",
            "# This is a comment",
            "' This is a comment"
        ],
        correctAnswer: 1
    },
    {
        topic: "Basic Syntax & Code Structure",
        question: "Which keyword is used to define a class in C#?",
        options: [
            "Class",
            "class",
            "define",
            "struct"
        ],
        correctAnswer: 1
    },
    {
        topic: "Basic Syntax & Code Structure",
        question: "What is the entry point of a C# application?",
        options: [
            "Start() method",
            "Begin() method",
            "Main() method",
            "Run() method"
        ],
        correctAnswer: 2
    },
    {
        topic: "Basic Syntax & Code Structure",
        question: "Which namespace is required for basic console operations in C#?",
        options: [
            "using System;",
            "using Console;",
            "using System.IO;",
            "using Standard;"
        ],
        correctAnswer: 0
    },
    {
        topic: "Basic Syntax & Code Structure",
        question: "What character marks the end of a statement in C#?",
        options: [
            ".",
            ",",
            ";",
            ":"
        ],
        correctAnswer: 2
    },

    // Topic 2: Variables and Data Types
    {
        topic: "Variables & Data Types",
        question: "Which keyword is used to declare a variable with inferred type in C#?",
        options: [
            "auto",
            "var",
            "dynamic",
            "type"
        ],
        correctAnswer: 1
    },
    {
        topic: "Variables & Data Types",
        question: "What is the default value of a bool variable in C#?",
        options: [
            "true",
            "false",
            "null",
            "0"
        ],
        correctAnswer: 1
    },
    {
        topic: "Variables & Data Types",
        question: "Which data type would you use for decimal numbers with high precision?",
        options: [
            "float",
            "double",
            "decimal",
            "int"
        ],
        correctAnswer: 2
    },
    {
        topic: "Variables & Data Types",
        question: "What is a nullable type in C#?",
        options: [
            "A type that always contains null",
            "A value type that can also contain null",
            "A type with no value",
            "An invalid type"
        ],
        correctAnswer: 1
    },
    {
        topic: "Variables & Data Types",
        question: "How do you declare a nullable integer in C#?",
        options: [
            "int? x;",
            "nullable int x;",
            "int x = null;",
            "Nullable<int> x;"
        ],
        correctAnswer: 0
    },

    // Topic 3: Operators and Expressions
    {
        topic: "Operators & Expressions",
        question: "What is the null-coalescing operator in C#?",
        options: [
            "??",
            "?:",
            "!",
            "?."
        ],
        correctAnswer: 0
    },
    {
        topic: "Operators & Expressions",
        question: "What does the %= operator do?",
        options: [
            "Divides and assigns",
            "Multiplies and assigns",
            "Finds modulus and assigns",
            "Adds percentage"
        ],
        correctAnswer: 2
    },
    {
        topic: "Operators & Expressions",
        question: "Which operator is used for string concatenation?",
        options: [
            "&",
            "+",
            ".",
            "concat"
        ],
        correctAnswer: 1
    },
    {
        topic: "Operators & Expressions",
        question: "What is the result of 10 / 3 in C# (integer division)?",
        options: [
            "3.33",
            "3",
            "4",
            "3.0"
        ],
        correctAnswer: 1
    },
    {
        topic: "Operators & Expressions",
        question: "What does the is operator do in C#?",
        options: [
            "Checks equality",
            "Checks if an object is of a certain type",
            "Assigns a value",
            "Performs arithmetic"
        ],
        correctAnswer: 1
    },

    // Topic 4: Control Flow
    {
        topic: "Control Flow",
        question: "Which statement would you use for multiple condition checking?",
        options: [
            "if-else if-else",
            "switch",
            "Both A and B",
            "Neither A nor B"
        ],
        correctAnswer: 2
    },
    {
        topic: "Control Flow",
        question: "What is the syntax for a foreach loop in C#?",
        options: [
            "foreach (var item in collection) { }",
            "foreach item in collection { }",
            "for each (item : collection) { }",
            "foreach (collection as item) { }"
        ],
        correctAnswer: 0
    },
    {
        topic: "Control Flow",
        question: "What happens if no break statement is used in a switch case (with code)?",
        options: [
            "Fall-through occurs automatically",
            "Compilation error",
            "The switch exits",
            "Nothing happens"
        ],
        correctAnswer: 1
    },
    {
        topic: "Control Flow",
        question: "Which keyword is used to exit a method and return a value?",
        options: [
            "exit",
            "break",
            "return",
            "yield"
        ],
        correctAnswer: 2
    },
    {
        topic: "Control Flow",
        question: "What is the purpose of the goto statement?",
        options: [
            "To jump to a labeled statement",
            "To exit a loop",
            "To call a function",
            "It doesn't exist in C#"
        ],
        correctAnswer: 0
    },

    // Topic 5: String Operations
    {
        topic: "String Operations",
        question: "How do you find the length of a string in C#?",
        options: [
            "str.length",
            "str.Length",
            "str.size()",
            "length(str)"
        ],
        correctAnswer: 1
    },
    {
        topic: "String Operations",
        question: "Which method converts a string to uppercase?",
        options: [
            "str.Upper()",
            "str.ToUpper()",
            "str.uppercase()",
            "str.UPPER()"
        ],
        correctAnswer: 1
    },
    {
        topic: "String Operations",
        question: "What is string interpolation in C#?",
        options: [
            "Concatenating strings with +",
            "Using $\"text {variable}\" syntax",
            "Using String.Format()",
            "Combining multiple strings"
        ],
        correctAnswer: 1
    },
    {
        topic: "String Operations",
        question: "How do you check if a string contains a substring?",
        options: [
            "str.Contains(substring)",
            "str.Has(substring)",
            "str.Includes(substring)",
            "str.Find(substring)"
        ],
        correctAnswer: 0
    },
    {
        topic: "String Operations",
        question: "What does the Trim() method do?",
        options: [
            "Removes all spaces from a string",
            "Removes leading and trailing whitespace",
            "Shortens the string",
            "Splits the string"
        ],
        correctAnswer: 1
    },

    // Topic 6: Arrays
    {
        topic: "Arrays",
        question: "How do you declare an array in C#?",
        options: [
            "int[] numbers;",
            "int numbers[];",
            "array<int> numbers;",
            "Both A and B"
        ],
        correctAnswer: 0
    },
    {
        topic: "Arrays",
        question: "What property gives you the length of an array?",
        options: [
            "size",
            "Length",
            "Count",
            "length"
        ],
        correctAnswer: 1
    },
    {
        topic: "Arrays",
        question: "How do you initialize an array with values?",
        options: [
            "int[] arr = new int[] {1, 2, 3};",
            "int[] arr = {1, 2, 3};",
            "Both A and B",
            "Neither A nor B"
        ],
        correctAnswer: 2
    },
    {
        topic: "Arrays",
        question: "What is a jagged array?",
        options: [
            "An array with uneven edges",
            "An array of arrays with different sizes",
            "A one-dimensional array",
            "An array that can't be modified"
        ],
        correctAnswer: 1
    },
    {
        topic: "Arrays",
        question: "What happens when you access an invalid array index?",
        options: [
            "Returns null",
            "Returns 0",
            "IndexOutOfRangeException is thrown",
            "Creates a new element"
        ],
        correctAnswer: 2
    },

    // Topic 7: Methods/Functions
    {
        topic: "Methods / Functions",
        question: "What is the correct syntax for declaring a method in C#?",
        options: [
            "returnType MethodName(parameters) { }",
            "function MethodName(parameters) : returnType { }",
            "def MethodName(parameters) { }",
            "method MethodName(parameters) -> returnType { }"
        ],
        correctAnswer: 0
    },
    {
        topic: "Methods / Functions",
        question: "What is method overloading?",
        options: [
            "A method that calls itself",
            "Multiple methods with the same name but different parameters",
            "A method with too many lines of code",
            "A method that runs too slowly"
        ],
        correctAnswer: 1
    },
    {
        topic: "Methods / Functions",
        question: "What keyword is used for output parameters?",
        options: [
            "output",
            "out",
            "ref",
            "return"
        ],
        correctAnswer: 1
    },
    {
        topic: "Methods / Functions",
        question: "What is the difference between 'ref' and 'out' parameters?",
        options: [
            "No difference",
            "ref requires initialization before passing, out doesn't",
            "out is faster",
            "ref is deprecated"
        ],
        correctAnswer: 1
    },
    {
        topic: "Methods / Functions",
        question: "Can a method have optional parameters in C#?",
        options: [
            "No",
            "Yes, by providing default values",
            "Only in static methods",
            "Only in constructors"
        ],
        correctAnswer: 1
    }
];

// Function to get questions for a specific language
function getQuestionsForLanguage(language) {
    switch(language.toLowerCase()) {
        case 'java':
            return javaQuestions;
        case 'c++':
            return cppQuestions;
        case 'c#':
            return csharpQuestions;
        default:
            return [];
    }
}

// Function to get random questions (for post-test variation)
function getRandomQuestions(language, count = null) {
    const questions = getQuestionsForLanguage(language);
    if (!count || count >= questions.length) {
        return questions;
    }
    
    // Shuffle and return subset
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}





