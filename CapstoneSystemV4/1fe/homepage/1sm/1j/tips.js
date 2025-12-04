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
                question: "How do you initialize a boolean variable using a comparison operator in Java?",
                options: {
                    a: "boolean result = true;",
                    b: "boolean result = (5 > 3);",
                    c: "boolean result = \"true\";",
                    d: "boolean result = 1;"
                },
                correctAnswer: "b",
                tips: [
                    "Use arithmetic operators for calculations: `int cost = 85 * 3;` (multiplication)",
                    "Use comparison operators to create boolean expressions: `boolean withinBudget = totalCost <= budget;`",
                    "The <= operator means 'less than or equal to' and returns true or false",
                    "Initialize boolean variables with comparison expressions: `boolean ready = (cost > 0);`",
                    "Use logical operators to combine conditions: `boolean readyToCook = (withinBudget && totalCost > 0);`",
                    "The && operator means 'AND' - both conditions must be true for the result to be true",
                    "Example: Calculate total cost first, then check if it's within budget: `int totalCost = peanutButter + vegetables; boolean withinBudget = totalCost <= 400;`",
                    "Parentheses help group expressions: `boolean result = (a > b) && (c > 0);`"
                ]
            }
        },
        ep4: {
            easy: {
                question: "Which control structure should you use to repeat code a specific number of times in Java?",
                options: {
                    a: "if statement",
                    b: "for loop",
                    c: "switch statement",
                    d: "while loop"
                },
                correctAnswer: "b",
                tips: [
                    "Use if-else for decisions: `if (arrivalTime.equals(\"7:05 AM\")) { ... } else { ... }`",
                    "Use switch for multiple choices: `switch(rowNumber) { case 1: group = \"A\"; break; }`",
                    "Use for loops for fixed repetitions: `for (int i = 1; i <= 4; i++) { System.out.println(\"Student \" + i + \" seated.\"); }`",
                    "Use while loops for dynamic conditions: `while (cardsGiven < totalCards) { cardsGiven++; }`",
                    "Remember to use break in switch cases to prevent fall-through",
                    "Curly braces {} are required for code blocks in if, for, and while",
                    "For loops: `for (initialization; condition; increment) { ... }`",
                    "While loops: `while (condition) { ... }` - check condition before each iteration"
                ]
            }
        },
        ep5: {
            easy: {
                question: "How do you combine two strings together in Java?",
                options: {
                    a: "Using the + operator",
                    b: "Using the * operator",
                    c: "Using the - operator",
                    d: "Using the / operator"
                },
                correctAnswer: "a",
                tips: [
                    "Use + for string concatenation: `String greeting = \"Hello, \" + name + \"!\";`",
                    "You can concatenate multiple strings: `String full = first + \" \" + last;`",
                    "Use substring() to extract parts: `String firstName = fullName.substring(0, 5);`",
                    "substring(start, end) extracts from start index (inclusive) to end index (exclusive)",
                    "String indices start at 0: \"Axle\" has indices 0='A', 1='x', 2='l', 3='e'",
                    "Example: `\"Axle Rivera\".substring(0, 5)` returns \"Axle\" (indices 0-4)",
                    "You can concatenate strings with variables: `String message = \"Name: \" + name;`",
                    "String methods: length() for size, toUpperCase() for uppercase, substring() for extraction"
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
