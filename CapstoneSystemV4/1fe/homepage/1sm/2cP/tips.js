(function() {
    const tipsData = {
        ep1: {
            easy: {
                question: "What is the correct way to include the iostream library in C++?",
                options: {
                    a: "#include iostream",
                    b: "#include <iostream>",
                    c: "import iostream",
                    d: "using iostream"
                },
                correctAnswer: "b",
                tips: [
                    "Start with: `#include <iostream>` for input/output",
                    "Add: `using namespace std;` to use standard library",
                    "Create main function: `int main() { ... }`",
                    "Use cout for output: `cout << \"Hello World\";`",
                    "End statements with semicolons: `;`",
                    "Use `return 0;` at the end of main function",
                    "Add comments with `//` for single-line or `/* */` for multi-line",
                    "Example structure: `#include <iostream>` then `using namespace std;` then `int main() { ... return 0; }`"
                ]
            }
        },
        ep2: {
            easy: {
                question: "What data type should you use for storing whole numbers in C++?",
                options: {
                    a: "string",
                    b: "int",
                    c: "float",
                    d: "bool"
                },
                correctAnswer: "b",
                tips: [
                    "Use `int` for whole numbers: `int itlog = 12;`",
                    "Use `float` for decimal numbers: `float suka = 15.50;`",
                    "Use `string` for text: `string chichirya = \"Piattos\";`",
                    "Use `bool` for true/false values: `bool available = true;`",
                    "Remember to use double quotes for string literals",
                    "Variable names should be descriptive: itlog, suka, toyo, chichirya",
                    "Display variables with cout: `cout << \"Itlog: \" << itlog << endl;`"
                ]
            }
        },
        ep3: {
            easy: {
                question: "What operator should you use to add numbers in C++?",
                options: {
                    a: "Multiplication (*)",
                    b: "Addition (+)",
                    c: "Division (/)",
                    d: "Modulus (%)"
                },
                correctAnswer: "b",
                tips: [
                    "Use + for addition: `int total = kareKareMeat + gulay + haloHalo;`",
                    "Use - for subtraction: `int difference = a - b;`",
                    "Use * for multiplication: `int product = a * b;`",
                    "Use / for division: `int quotient = a / b;`",
                    "Use % for modulus (remainder): `int remainder = a % b;`",
                    "Use comparison operators: `>`, `<`, `==`, `<=`, `>=`",
                    "Use logical operators: `&&` (AND), `||` (OR), `!` (NOT)",
                    "Example: `if (total > 1000) { cout << \"Lagpas na sa budget!\"; }`",
                    "Example: `if (hasKareKare && hasHaloHalo) { cout << \"Complete!\"; }`"
                ]
            }
        },
        ep4: {
            easy: {
                question: "Which control structure should you use to make decisions based on conditions in C++?",
                options: {
                    a: "for loop",
                    b: "if statement",
                    c: "while loop",
                    d: "switch statement"
                },
                correctAnswer: "b",
                tips: [
                    "Use if for decisions: `if (score >= 90) { cout << \"Gold Medalist!\"; }`",
                    "Add else for alternatives: `if (condition) { ... } else { ... }`",
                    "Use else if for multiple conditions: `if (score >= 90) { ... } else if (score >= 75) { ... }`",
                    "Use comparison operators: `==`, `!=`, `<`, `>`, `<=`, `>=`",
                    "String comparison: `if (category == \"Quiz Bee\") { ... }`",
                    "Test conditions with different values",
                    "Use curly braces {} for code blocks",
                    "Example: `if (score >= 90) { cout << \"Gold!\"; } else if (score >= 75) { cout << \"Silver!\"; } else { cout << \"Needs Improvement.\"; }`"
                ]
            }
        },
        ep5: {
            easy: {
                question: "How do you extract part of a string in C++?",
                options: {
                    a: "Using the + operator",
                    b: "Using the .substr() method",
                    c: "Using the * operator",
                    d: "Using the / operator"
                },
                correctAnswer: "b",
                tips: [
                    "Use .length() to get string length: `int len = fullName.length();`",
                    "Use .substr() to extract parts: `string firstName = fullName.substr(5, 5);`",
                    "substr(start, length) extracts from start index for specified length",
                    "Use + for string concatenation: `string greeting = \"Hello, \" + name + \"!\";`",
                    "Use == for string comparison: `if (name1 == name2) { ... }`",
                    "String indices start at 0: \"Gng. Maria\" has indices 0='G', 1='n', etc.",
                    "Example: `\"Gng. Maria Santos\".substr(5, 5)` returns \"Maria\"",
                    "You can concatenate strings: `string certificate = \"Congratulations, \" + fullName + \"!\";`"
                ]
            }
        },
        ep6: {
            easy: {
                question: "What data structure should you use to store multiple values in C++?",
                options: {
                    a: "Single variable",
                    b: "Array",
                    c: "Function",
                    d: "Class"
                },
                correctAnswer: "b",
                tips: [
                    "Declare arrays: `int numbers[5];`",
                    "Initialize arrays: `int numbers[] = {1, 2, 3, 4, 5};`",
                    "Access elements: `numbers[0]` for first element",
                    "Use loops: `for (int i = 0; i < 5; i++)`",
                    "Arrays have fixed size in C++"
                ]
            }
        },
        ep7: {
            easy: {
                question: "What should you use to create reusable code in C++?",
                options: {
                    a: "Variables",
                    b: "Functions",
                    c: "Arrays",
                    d: "Loops"
                },
                correctAnswer: "b",
                tips: [
                    "Create functions: `void functionName() { ... }`",
                    "Add parameters: `void greet(string name) { ... }`",
                    "Call functions: `functionName();` or `greet(\"John\");`",
                    "Functions help organize and reuse code",
                    "Use descriptive names for your functions"
                ]
            }
        }
    };

    // Expose tips data globally for the shared UI
    window.tipsData = tipsData;
    window.dispatchEvent(new Event('tipsDataLoaded'));
    return;
})();
