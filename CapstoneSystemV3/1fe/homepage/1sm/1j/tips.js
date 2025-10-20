(function() {
    const tipsData = {
        ep2: {
            easy: {
                question: "What data type should you use for storing the number of noodle packs (10) in Java?",
                options: {
                    a: "String",
                    b: "int",
                    c: "double",
                    d: "boolean"
                },
                correctAnswer: "b",
                tips: [
                    "Use `int` for whole numbers like 10",
                    "Use `String` for text like \"Lucky Me\" (with double quotes)",
                    "Use `boolean` for true/false values like availability",
                    "Use `double` for decimal numbers like 13.75",
                    "Remember to end each statement with a semicolon (;)",
                    "Variable names should be descriptive: noodles, brand, available, price"
                ]
            }
        },
        ep3: {
            easy: {
                question: "What data type should you use for storing text in Java?",
                options: {
                    a: "int",
                    b: "String",
                    c: "double",
                    d: "boolean"
                },
                correctAnswer: "b",
                tips: [
                    "Use String for text data: `String name = \"Hello\";`",
                    "Remember to use double quotes for strings",
                    "Use System.out.println() to display strings",
                    "You can concatenate strings with + operator",
                    "Practice with different string operations"
                ]
            }
        },
        ep4: {
            easy: {
                question: "What operator should you use to add numbers in Java?",
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
                    "Use parentheses to control order: `int result = (a + b) * c;`",
                    "Display results with System.out.println()",
                    "Test your calculations with different values"
                ]
            }
        },
        ep5: {
            easy: {
                question: "What control structure should you use to make decisions in Java?",
                options: {
                    a: "for loop",
                    b: "if statement",
                    c: "while loop",
                    d: "switch statement"
                },
                correctAnswer: "b",
                tips: [
                    "Use if for simple decisions: `if (condition) { ... }`",
                    "Add else for alternative actions: `if (condition) { ... } else { ... }`",
                    "Use comparison operators: ==, !=, <, >, <=, >=",
                    "Test your conditions with different values",
                    "Remember to use curly braces for code blocks"
                ]
            }
        },
        ep6: {
            easy: {
                question: "What data structure should you use to store multiple values in Java?",
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
                    "Use loops to process arrays: `for (int i = 0; i < numbers.length; i++)`",
                    "Arrays have fixed size once created"
                ]
            }
        },
        ep7: {
            easy: {
                question: "What should you use to create reusable code in Java?",
                options: {
                    a: "Variables",
                    b: "Methods",
                    c: "Arrays",
                    d: "Loops"
                },
                correctAnswer: "b",
                tips: [
                    "Create methods: `public static void methodName() { ... }`",
                    "Add parameters: `public static void greet(String name) { ... }`",
                    "Call methods: `methodName();` or `greet(\"John\");`",
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
