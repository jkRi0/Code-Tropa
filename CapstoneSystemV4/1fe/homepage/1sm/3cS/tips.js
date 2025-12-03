(function() {
    const tipsData = {
        ep2: {
            easy: {
                question: "What is the main method in C#?",
                options: {
                    a: "A variable declaration",
                    b: "The program entry point",
                    c: "A data type",
                    d: "A loop structure"
                },
                correctAnswer: "b",
                tips: [
                    "Start with: `using System;`",
                    "Create main method: `static void Main(string[] args) { ... }`",
                    "Use Console.WriteLine() for output: `Console.WriteLine(\"Hello World\");`",
                    "C# is case-sensitive, so be careful with capitalization",
                    "Use semicolons to end statements"
                ]
            }
        },
        ep3: {
            easy: {
                question: "What data type should you use for storing text in C#?",
                options: {
                    a: "int",
                    b: "string",
                    c: "double",
                    d: "bool"
                },
                correctAnswer: "b",
                tips: [
                    "Use string for text: `string name = \"Hello\";`",
                    "Use Console.WriteLine() to display strings",
                    "You can concatenate with + operator: `Console.WriteLine(\"Hello \" + name);`",
                    "Remember to use double quotes for string literals",
                    "Strings are immutable in C#"
                ]
            }
        },
        ep4: {
            easy: {
                question: "What operator should you use to add numbers in C#?",
                options: {
                    a: "Multiplication (*)",
                    b: "Addition (+)",
                    c: "Division (/)",
                    d: "Modulus (%)"
                },
                correctAnswer: "b",
                tips: [
                    "Use + for addition: `int sum = a + b;`",
                    "You can add multiple numbers: `int total = a + b + c;`",
                    "Use parentheses for order: `int result = (a + b) * c;`",
                    "Display with Console.WriteLine(): `Console.WriteLine(\"Sum: \" + sum);`",
                    "Test your calculations with different values"
                ]
            }
        },
        ep5: {
            easy: {
                question: "What control structure should you use to make decisions in C#?",
                options: {
                    a: "for loop",
                    b: "if statement",
                    c: "while loop",
                    d: "switch statement"
                },
                correctAnswer: "b",
                tips: [
                    "Use if for decisions: `if (condition) { ... }`",
                    "Add else for alternatives: `if (condition) { ... } else { ... }`",
                    "Use comparison operators: ==, !=, <, >, <=, >=",
                    "Test conditions with different values",
                    "Use curly braces for code blocks"
                ]
            }
        },
        ep6: {
            easy: {
                question: "What data structure should you use to store multiple values in C#?",
                options: {
                    a: "Single variable",
                    b: "Array",
                    c: "Method",
                    d: "Class"
                },
                correctAnswer: "b",
                tips: [
                    "Declare arrays: `int[] numbers = new int[5];`",
                    "Initialize arrays: `int[] numbers = {1, 2, 3, 4, 5};`",
                    "Access elements: `numbers[0]` for first element",
                    "Use loops: `for (int i = 0; i < numbers.Length; i++)`",
                    "Arrays have fixed size in C#"
                ]
            }
        },
        ep7: {
            easy: {
                question: "What should you use to create reusable code in C#?",
                options: {
                    a: "Variables",
                    b: "Methods",
                    c: "Arrays",
                    d: "Loops"
                },
                correctAnswer: "b",
                tips: [
                    "Create methods: `static void MethodName() { ... }`",
                    "Add parameters: `static void Greet(string name) { ... }`",
                    "Call methods: `MethodName();` or `Greet(\"John\");`",
                    "Methods help organize and reuse code",
                    "Use descriptive names for your methods"
                ]
            }
        }
    };

    // Expose tips data globally for the shared UI
    window.tipsData = tipsData;
    window.dispatchEvent(new Event('tipsDataLoaded'));
    return;
})();
