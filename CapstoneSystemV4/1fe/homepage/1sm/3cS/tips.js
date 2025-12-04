(function() {
    const tipsData = {
        ep1: {
            easy: {
                question: "What is the correct way to include System namespace in C#?",
                options: {
                    a: "#include System",
                    b: "using System;",
                    c: "import System",
                    d: "require System"
                },
                correctAnswer: "b",
                tips: [
                    "Start with: `using System;` for basic functionality",
                    "Create main method: `static void Main(string[] args) { ... }`",
                    "Use Console.WriteLine() for output: `Console.WriteLine(\"Hello World\");`",
                    "C# is case-sensitive, so be careful with capitalization",
                    "Use semicolons to end statements: `;`",
                    "Add comments with `//` for single-line or `/* */` for multi-line",
                    "Example structure: `using System;` then `class Program { static void Main() { ... } }`"
                ]
            }
        },
        ep2: {
            easy: {
                question: "What data type should you use for storing whole numbers in C#?",
                options: {
                    a: "string",
                    b: "int",
                    c: "double",
                    d: "bool"
                },
                correctAnswer: "b",
                tips: [
                    "Use `int` for whole numbers: `int kiloBigas = 25;`",
                    "Use `double` for decimal numbers: `double presyoBangus = 180.50;`",
                    "Use `string` for text: `string gulay = \"Talong\";`",
                    "Use `bool` for true/false values: `bool available = true;`",
                    "Remember to use double quotes for string literals",
                    "Variable names should be descriptive: kiloBigas, presyoBangus, gulay",
                    "Display variables with Console.WriteLine: `Console.WriteLine(\"Total: \" + total);`"
                ]
            }
        },
        ep3: {
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
                    "Use + for addition: `double fare = baseFare + (distance * 5);`",
                    "Use - for subtraction: `int difference = a - b;`",
                    "Use * for multiplication: `int product = a * b;`",
                    "Use / for division: `int quotient = a / b;`",
                    "Use % for modulus (remainder): `int remainder = a % b;`",
                    "Use comparison operators: `>`, `<`, `==`, `<=`, `>=`",
                    "Use logical operators: `&&` (AND), `||` (OR), `!` (NOT)",
                    "Example: `if (trikeAvailable && affordable) { Console.WriteLine(\"Sakay na!\"); }`",
                    "Example: `Console.WriteLine(bayad >= fare);` // comparison operator"
                ]
            }
        },
        ep4: {
            easy: {
                question: "Which control structure should you use to make decisions based on conditions in C#?",
                options: {
                    a: "for loop",
                    b: "if statement",
                    c: "while loop",
                    d: "switch statement"
                },
                correctAnswer: "b",
                tips: [
                    "Use if for decisions: `if (time >= 22 && age < 18) { ... }`",
                    "Add else for alternatives: `if (condition) { ... } else { ... }`",
                    "Use else if for multiple conditions: `if (condition1) { ... } else if (condition2) { ... }`",
                    "Use comparison operators: `==`, `!=`, `<`, `>`, `<=`, `>=`",
                    "Use logical operators to combine conditions: `&&` (AND), `||` (OR)",
                    "Test conditions with different values",
                    "Use curly braces {} for code blocks",
                    "Example: `if (time >= 22 && age < 18) { Console.WriteLine(\"Curfew! Pauwiin agad.\"); }`"
                ]
            }
        },
        ep5: {
            easy: {
                question: "How do you convert a string to uppercase in C#?",
                options: {
                    a: "Using the + operator",
                    b: "Using the .ToUpper() method",
                    c: "Using the * operator",
                    d: "Using the / operator"
                },
                correctAnswer: "b",
                tips: [
                    "Use .ToUpper() to convert to uppercase: `string name = \"mArIa\"; Console.WriteLine(name.ToUpper());`",
                    "Use .Length to get string length: `int len = message.Length;`",
                    "Use .Substring() to extract parts: `string part = message.Substring(0, 20);`",
                    "Use .Replace() to modify strings: `string newMsg = message.Replace(\"birthday\", \"anniversary\");`",
                    "Use .Contains() to check for text: `if (message.Contains(\"maria\")) { ... }`",
                    "String methods: Length, ToUpper(), Substring(), Replace(), Contains()",
                    "Example: `if (message.Length > 20) { Console.WriteLine(message.Substring(0, 20) + \"...\"); }`",
                    "You can chain string methods: `message.ToUpper().Replace(\"A\", \"B\");`"
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
