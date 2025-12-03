(function() {
    const tipsModal = document.getElementById('tipsModal');
    const showTipsBtn = document.getElementById('showTipsBtn');
    const closeTipsBtn = document.querySelector('.close-tips');
    const tipQuestionDiv = document.getElementById('tipQuestion');
    const tipOptionsDiv = document.getElementById('tipOptions');
    const submitAnswerBtn = document.getElementById('submitAnswerBtn');
    const tipFeedbackDiv = document.getElementById('tipFeedback');
    const tipContentDiv = document.getElementById('tipContent');

    let currentQuestion = null;
    let currentAnswer = null;
    let selectedLevel = null;
    let selectedDifficulty = null;

    const tipsData = {
        lvl1: {
            easy: {
                question: "What is the primary purpose of the 'main' function in a C++ program?",
                options: {
                    a: "To declare global variables",
                    b: "To define a class constructor",
                    c: "To serve as the entry point for program execution",
                    d: "To handle exceptions"
                },
                correctAnswer: "c",
                tip: "The 'main' function is crucial because it's where the C++ program starts executing. Every C++ program must have exactly one main function! To create a basic taho vendor program, start with #include <iostream> and int main() { }. Use std::cout to display 'Tahooo!' and menu items. Remember to include return 0; at the end of main()."
            },
            average: {
                question: "Which of the following is the correct way to add a single-line comment in C++?",
                options: {
                    a: "/* This is a comment */",
                    b: "// This is a comment",
                    c: "# This is a comment",
                    d: "--This is a comment"
                },
                correctAnswer: "b",
                tip: "Single-line comments in C++ start with two forward slashes (//). They are used to explain a single line or a small block of code. For the taho menu program, use comments to describe the program purpose and add proper formatting with std::endl for line breaks. Use escape sequences like \\t for tab spacing in your output."
            },
            difficult: {
                question: "Which C++ stream object is commonly used for formatted output to the console?",
                options: {
                    a: "cout",
                    b: "cin",
                    c: "cerr",
                    d: "clog"
                },
                correctAnswer: "a",
                tip: "The 'cout' object is part of the iostream library and is used for standard output. It's the C++ equivalent of printf in C, but with type safety and easier formatting. For the taho vendor program, use cout to display the vendor's call, menu items, and total price. Remember to use the << operator to chain multiple outputs and include proper string literals in quotes."
            }
        },
        // Placeholder data for levels 2-20
        lvl2: {
            easy: {
                question: "Which keyword is used to declare a variable in C++?",
                options: {
                    a: "var",
                    b: "int",
                    c: "declare",
                    d: "variable"
                },
                correctAnswer: "b",
                tip: "In C++, you declare variables by specifying the data type first (like 'int', 'float', 'char'), followed by the variable name. The 'int' keyword is used for integer variables, which is one of the most fundamental data types in C++. For the sari-sari store program, use std::string for product names like 'suka', 'itlog', and 'tinapay'. Remember to include #include <string> header for string variables."
            },
            average: {
                question: "What is the correct syntax to declare and initialize a variable in C++?",
                options: {
                    a: "int x = 5;",
                    b: "int x; x = 5;",
                    c: "Both a and b are correct",
                    d: "x = 5;"
                },
                correctAnswer: "c",
                tip: "Both syntaxes are valid in C++. You can declare and initialize in one line (int x = 5;) or declare first then assign later (int x; x = 5;). The semicolon (;) is required to end the statement. For the inventory program, declare string variables for product names, double variables for prices, and int variables for stock quantities. Use std::cout with proper formatting to display the inventory report."
            },
            difficult: {
                question: "Which of the following is NOT a valid variable name in C++?",
                options: {
                    a: "_myVariable",
                    b: "myVariable123",
                    c: "123myVariable",
                    d: "my_variable"
                },
                correctAnswer: "c",
                tip: "Variable names in C++ cannot start with a digit. They must begin with a letter or underscore, followed by letters, digits, or underscores. Names are case-sensitive and cannot be C++ keywords. For the advanced inventory program, use std::cin to get user input for stock levels, calculate inventory values by multiplying price × stock, and use if statements to check for restock alerts when stock is below threshold (20 units)."
            }
        },
        lvl3: {
            easy: {
                question: "What is the correct way to include the iostream library in C++?",
                options: {
                    a: "#include <iostream>",
                    b: "#include iostream",
                    c: "import iostream",
                    d: "using iostream"
                },
                correctAnswer: "a",
                tip: "The #include directive is used to include header files in C++. For standard libraries like iostream, use angle brackets < >. This allows you to use input/output operations like cout and cin. For the fiesta budget calculator, start with #include <iostream> and declare int variables for banderitas (500), lechon (3000), and soundSystem (2000). Calculate the total cost and display the budget breakdown using cout."
            },
            average: {
                question: "Which statement is used to read input from the user in C++?",
                options: {
                    a: "cout",
                    b: "cin",
                    c: "input",
                    d: "read"
                },
                correctAnswer: "b",
                tip: "The 'cin' object is used for standard input in C++. It's paired with the extraction operator (>>) to read data from the keyboard. For example: cin >> variableName; For the advanced fiesta budget, add optional items like balloons (300) and candles (200), calculate subtotal, apply 10% discount for 5+ items, and use #include <iomanip> with std::fixed and std::setprecision for proper number formatting."
            },
            difficult: {
                question: "What will be the output of: cout << \"Hello\" << \" World\";",
                options: {
                    a: "Hello World",
                    b: "HelloWorld",
                    c: "Hello World ",
                    d: "Compilation error"
                },
                correctAnswer: "b",
                tip: "The << operator concatenates strings without adding spaces. To get 'Hello World' with a space, you need: cout << \"Hello \" << \"World\"; or cout << \"Hello\" << \" \" << \"World\"; For the complex fiesta budget optimizer, use #include <vector> and #include <algorithm>, create a struct Item with name and price, use std::sort with lambda functions for greedy selection, and implement budget constraints to maximize items within ₱5000 budget."
            }
        },
        lvl4: {
            easy: {
                question: "Which data type is used to store whole numbers in C++?",
                options: {
                    a: "float",
                    b: "int",
                    c: "char",
                    d: "string"
                },
                correctAnswer: "b",
                tip: "The 'int' data type is used for storing whole numbers (integers) in C++. It typically uses 4 bytes of memory and can store values from -2,147,483,648 to 2,147,483,647 on most systems. For the barangay curfew check program, use int for currentHour variable, get user input with std::cin, and use if statements to check if currentHour >= 22 (10 PM). Display appropriate messages for curfew violations."
            },
            average: {
                question: "What is the size of a 'char' data type in C++?",
                options: {
                    a: "1 byte",
                    b: "2 bytes",
                    c: "4 bytes",
                    d: "8 bytes"
                },
                correctAnswer: "a",
                tip: "A 'char' data type is exactly 1 byte (8 bits) in C++. It can store a single character or small integer values from -128 to 127 (signed) or 0 to 255 (unsigned). For the advanced curfew check, use int for age and currentHour variables, implement exemption logic for minors (< 18) and seniors (>= 65), and use nested if statements to handle different scenarios with appropriate status messages."
            },
            difficult: {
                question: "Which of the following is the correct way to declare a constant in C++?",
                options: {
                    a: "const int x = 10;",
                    b: "int const x = 10;",
                    c: "Both a and b are correct",
                    d: "constant int x = 10;"
                },
                correctAnswer: "c",
                tip: "Both 'const int x = 10;' and 'int const x = 10;' are valid ways to declare constants in C++. The 'const' keyword makes the variable immutable - its value cannot be changed after initialization. For the complex curfew system, create a function checkCurfewViolation() that takes age, reason, and currentHour parameters, use std::vector for storing resident data, implement role-based exemptions, and track violation counts with proper status reporting."
            }
        },
        lvl5: {
            easy: {
                question: "What is the result of 5 + 3 * 2 in C++?",
                options: {
                    a: "16",
                    b: "11",
                    c: "13",
                    d: "10"
                },
                correctAnswer: "b",
                tip: "In C++, multiplication (*) has higher precedence than addition (+). So 3 * 2 = 6, then 5 + 6 = 11. Remember: multiplication and division are evaluated before addition and subtraction. For the bayanihan helper greetings program, create a function greetHelper() that takes a const std::string& name parameter, use std::cout to display personalized greetings, and call the function multiple times for different helpers like 'Juan', 'Maria', and 'Pedro'."
            },
            average: {
                question: "Which operator is used for integer division in C++?",
                options: {
                    a: "/",
                    b: "//",
                    c: "div",
                    d: "All of the above"
                },
                correctAnswer: "a",
                tip: "The forward slash (/) is used for division in C++. When both operands are integers, it performs integer division (truncates the decimal part). For example: 7 / 2 = 3, not 3.5. For the bayanihan role assignment, create a function determineRole() that takes age as parameter and returns role based on age ranges (Lifter: 18-40, Cook: 25-60, Driver: 21-65, Assistant: others), then create assignRole() function that calls determineRole() and displays the assignment with proper formatting."
            },
            difficult: {
                question: "What is the value of 17 % 5 in C++?",
                options: {
                    a: "3.4",
                    b: "2",
                    c: "3",
                    d: "4"
                },
                correctAnswer: "b",
                tip: "The modulo operator (%) returns the remainder of division. 17 ÷ 5 = 3 with remainder 2, so 17 % 5 = 2. The modulo operator is very useful for checking if numbers are even/odd or for cycling through values. For the complex bayanihan scheduler, create isEligibleForRole() function with age and role parameters, implement assignAvailableRole() function that uses std::vector for roles and filled status, use for loops to assign roles ensuring no duplicates, and display comprehensive assignment results with proper status tracking."
            }
        },
        lvl6: {
            easy: {
                question: "Which keyword is used to create conditional statements in C++?",
                options: {
                    a: "condition",
                    b: "if",
                    c: "when",
                    d: "check"
                },
                correctAnswer: "b",
                tip: "The 'if' keyword is used to create conditional statements in C++. It allows the program to execute different code blocks based on whether a condition is true or false. The syntax is: if (condition) { code; } For the jeepney destinations program, create a string array with 5 destinations, use a for loop to iterate through the array, and display each destination with proper numbering using (i + 1) for 1-based indexing."
            },
            average: {
                question: "What is the correct syntax for an if-else statement in C++?",
                options: {
                    a: "if (condition) { code1; } else { code2; }",
                    b: "if condition: code1 else: code2",
                    c: "if (condition) code1; else code2;",
                    d: "Both a and c are correct"
                },
                correctAnswer: "d",
                tip: "Both syntaxes are valid in C++. You can use braces {} for multiple statements or omit them for single statements. The condition must be in parentheses and the else is optional. For the jeepney fare calculator, create parallel arrays for destinations and fares, use a for loop to display destinations with fares, calculate total fare by accumulating fares in the loop, and display the total with proper formatting."
            },
            difficult: {
                question: "What will be the output of: int x = 5; if (x > 3) cout << \"Yes\"; else cout << \"No\";",
                options: {
                    a: "Yes",
                    b: "No",
                    c: "Compilation error",
                    d: "Nothing"
                },
                correctAnswer: "a",
                tip: "Since x = 5 and 5 > 3 is true, the condition is satisfied, so 'Yes' will be printed. The if-else statement evaluates the condition first, then executes the appropriate code block. For the advanced jeepney fare system, use std::getline for string input, std::transform with ::tolower for case-insensitive comparison, implement destination validation with for loop and break, apply 20% discount for seniors/students, and use proper error handling for invalid destinations."
            }
        },
        lvl7: {
            easy: {
                question: "Which loop is used when you know the exact number of iterations?",
                options: {
                    a: "while loop",
                    b: "for loop",
                    c: "do-while loop",
                    d: "if loop"
                },
                correctAnswer: "b",
                tip: "The 'for' loop is ideal when you know exactly how many times you want to repeat a block of code. It has three parts: initialization, condition, and increment/decrement. For the larong kalye leaderboard, create string and int arrays for player names and scores, use a for loop to iterate through the arrays, and display each player with their score using proper formatting."
            },
            average: {
                question: "What is the correct syntax for a for loop in C++?",
                options: {
                    a: "for (int i = 0; i < 5; i++)",
                    b: "for i in range(5)",
                    c: "for (i = 0; i < 5; i++)",
                    d: "Both a and c are correct"
                },
                correctAnswer: "d",
                tip: "Both syntaxes are valid. You can declare the variable inside the loop (int i = 0) or declare it beforehand. The for loop has three parts: initialization, condition, and update. For the advanced leaderboard, create a Player struct with name and score, use std::vector to store Player objects, implement std::sort with lambda function for score-based sorting, and display ranked results with position labels."
            },
            difficult: {
                question: "How many times will this loop execute: for (int i = 1; i <= 5; i++)?",
                options: {
                    a: "4 times",
                    b: "5 times",
                    c: "6 times",
                    d: "Infinite loop"
                },
                correctAnswer: "b",
                tip: "The loop starts at i = 1 and continues while i <= 5. It will execute for i = 1, 2, 3, 4, 5, which is exactly 5 times. The loop stops when i becomes 6. For the complex leaderboard system, implement tie handling with currentRank tracking, create getRankText() function for proper rank formatting, use std::max_element and std::min_element for statistics, calculate average with std::accumulate, and display comprehensive statistics with proper formatting using std::setw and std::left."
            }
        },
        lvl8: {
            easy: {
                question: "Which loop executes at least once regardless of the condition?",
                options: {
                    a: "while loop",
                    b: "for loop",
                    c: "do-while loop",
                    d: "if loop"
                },
                correctAnswer: "c",
                tip: "The 'do-while' loop executes the code block first, then checks the condition. This guarantees that the loop body runs at least once, even if the condition is false initially. For the tricycle dispatch system, create string arrays for driver names and bool arrays for availability status, use a for loop to display driver status with ternary operator for status text, and implement proper formatting for the dispatch system output."
            },
            average: {
                question: "What is the correct syntax for a do-while loop in C++?",
                options: {
                    a: "do { code; } while (condition);",
                    b: "do { code; } while condition;",
                    c: "do { code; } while (condition)",
                    d: "while (condition) do { code; }"
                },
                correctAnswer: "a",
                tip: "The do-while loop syntax is: do { code; } while (condition); Note the semicolon after the while statement. The condition is checked after each iteration. For the advanced dispatch system, add passenger and distance arrays, use nested loops to assign passengers to available drivers, calculate fare using distance * 10 (₱10 per km), and use std::fixed and std::setprecision for proper fare formatting."
            },
            difficult: {
                question: "What will be the output of: int i = 5; do { cout << i; i++; } while (i < 3);",
                options: {
                    a: "5",
                    b: "No output",
                    c: "Compilation error",
                    d: "Infinite loop"
                },
                correctAnswer: "a",
                tip: "The do-while loop executes first (prints 5, then i becomes 6), then checks the condition (6 < 3 is false). Since the condition is false, the loop stops. So only '5' is printed. For the complex dispatch optimizer, implement driver earnings tracking with double arrays, use distance optimization to find closest available drivers, track trip counts and earnings per driver, and display comprehensive performance statistics with proper pluralization handling."
            }
        },
        lvl9: {
            easy: {
                question: "What is an array in C++?",
                options: {
                    a: "A collection of variables of different types",
                    b: "A collection of variables of the same type",
                    c: "A single variable",
                    d: "A function"
                },
                correctAnswer: "b",
                tip: "An array is a collection of variables of the same data type stored in contiguous memory locations. Each element can be accessed using an index, starting from 0. For the tricycle dispatch system, use string arrays for driver names and bool arrays for availability status, implement proper array initialization, and use for loops to iterate through arrays for displaying driver information."
            },
            average: {
                question: "How do you declare an array of 5 integers in C++?",
                options: {
                    a: "int array[5];",
                    b: "int array(5);",
                    c: "array int[5];",
                    d: "int[5] array;"
                },
                correctAnswer: "a",
                tip: "The syntax for declaring an array is: dataType arrayName[size]; So 'int array[5];' creates an array of 5 integers. The size must be a constant expression. For the advanced dispatch system, create parallel arrays for drivers, availability, earnings, and trip counts, use nested loops for passenger assignment, implement fare calculation with distance * 10, and display comprehensive driver performance with proper formatting."
            },
            difficult: {
                question: "What is the index of the first element in an array?",
                options: {
                    a: "1",
                    b: "0",
                    c: "-1",
                    d: "Depends on the array"
                },
                correctAnswer: "b",
                tip: "Array indexing in C++ starts from 0, not 1. So for an array of size 5, the valid indices are 0, 1, 2, 3, 4. This is called zero-based indexing. For the complex dispatch optimizer, implement distance-based driver selection algorithms, use multiple arrays to track driver performance, implement closest driver logic with minimum distance calculations, and display optimized dispatch results with earnings tracking and trip count statistics."
            }
        },
        lvl10: {
            easy: {
                question: "What is a function in C++?",
                options: {
                    a: "A variable",
                    b: "A block of code that performs a specific task",
                    c: "A data type",
                    d: "A loop"
                },
                correctAnswer: "b",
                tip: "A function is a block of code that performs a specific task and can be called from other parts of the program. Functions help organize code, make it reusable, and improve readability. For the bayanihan helper greetings program, create a greetHelper() function that takes a const std::string& name parameter, use std::cout to display personalized greetings, and call the function multiple times for different helpers."
            },
            average: {
                question: "What is the correct syntax for defining a function in C++?",
                options: {
                    a: "functionName() { code; }",
                    b: "returnType functionName(parameters) { code; }",
                    c: "def functionName(): code",
                    d: "function functionName() { code; }"
                },
                correctAnswer: "b",
                tip: "The syntax is: returnType functionName(parameters) { code; } The returnType specifies what the function returns (void if nothing), functionName is the identifier, and parameters are optional inputs. For the bayanihan role assignment, create determineRole() function that takes age parameter and returns role based on age ranges, implement assignRole() function that calls determineRole() and displays assignment with proper formatting."
            },
            difficult: {
                question: "What does 'void' mean when used as a return type?",
                options: {
                    a: "The function returns an integer",
                    b: "The function returns nothing",
                    c: "The function is empty",
                    d: "The function has no parameters"
                },
                correctAnswer: "b",
                tip: "The 'void' return type means the function does not return any value. It's commonly used for functions that perform actions (like printing) but don't need to return data to the caller. For the complex bayanihan scheduler, create isEligibleForRole() function with age and role parameters, implement assignAvailableRole() function using std::vector for roles and filled status, use for loops to assign roles ensuring no duplicates, and display comprehensive assignment results with proper status tracking."
            }
        },
        lvl11: {
            easy: {
                question: "What is a pointer in C++?",
                options: {
                    a: "A data type",
                    b: "A variable that stores the address of another variable",
                    c: "A function",
                    d: "A loop"
                },
                correctAnswer: "b",
                tip: "A pointer is a variable that stores the memory address of another variable. Pointers allow you to indirectly access and manipulate data, which is essential for dynamic memory allocation and efficient programming. For the larong kalye leaderboard, create string and int arrays for player names and scores, use for loops to iterate through arrays, and display each player with their score using proper formatting."
            },
            average: {
                question: "What symbol is used to declare a pointer in C++?",
                options: {
                    a: "*",
                    b: "&",
                    c: "->",
                    d: "."
                },
                correctAnswer: "a",
                tip: "The asterisk (*) is used to declare pointers. For example: int *ptr; declares a pointer to an integer. The & operator gets the address of a variable, while * dereferences a pointer. For the advanced leaderboard, create a Player struct with name and score, use std::vector to store Player objects, implement std::sort with lambda function for score-based sorting, and display ranked results with position labels."
            },
            difficult: {
                question: "What does the '&' operator do in C++?",
                options: {
                    a: "Dereferences a pointer",
                    b: "Gets the address of a variable",
                    c: "Multiplies two numbers",
                    d: "Creates a reference"
                },
                correctAnswer: "b",
                tip: "The '&' operator (address-of operator) returns the memory address of a variable. For example: int x = 5; int *ptr = &x; stores the address of x in the pointer ptr. For the complex leaderboard system, implement tie handling with currentRank tracking, create getRankText() function for proper rank formatting, use std::max_element and std::min_element for statistics, calculate average with std::accumulate, and display comprehensive statistics with proper formatting using std::setw and std::left."
            }
        },
        lvl12: {
            easy: {
                question: "What is dynamic memory allocation in C++?",
                options: {
                    a: "Allocating memory at compile time",
                    b: "Allocating memory at runtime",
                    c: "Using arrays",
                    d: "Declaring variables"
                },
                correctAnswer: "b",
                tip: "Dynamic memory allocation allows you to allocate memory during program execution (runtime) rather than at compile time. This is done using operators like 'new' and 'delete' in C++. For the tricycle dispatch system, create string arrays for driver names and bool arrays for availability status, use for loops to display driver status with ternary operator for status text, and implement proper formatting for the dispatch system output."
            },
            average: {
                question: "Which operator is used for dynamic memory allocation in C++?",
                options: {
                    a: "malloc",
                    b: "new",
                    c: "alloc",
                    d: "create"
                },
                correctAnswer: "b",
                tip: "The 'new' operator is used for dynamic memory allocation in C++. For example: int *ptr = new int; allocates memory for an integer. Remember to use 'delete' to free the memory when done. For the advanced dispatch system, add passenger and distance arrays, use nested loops to assign passengers to available drivers, calculate fare using distance * 10 (₱10 per km), and use std::fixed and std::setprecision for proper fare formatting."
            },
            difficult: {
                question: "What happens if you don't free dynamically allocated memory?",
                options: {
                    a: "Nothing, it's automatically freed",
                    b: "Memory leak occurs",
                    c: "Program crashes immediately",
                    d: "Memory becomes faster"
                },
                correctAnswer: "b",
                tip: "If you don't free dynamically allocated memory using 'delete', it causes a memory leak. The memory remains allocated even after the program ends, which can lead to performance issues and system instability. For the complex dispatch optimizer, implement driver earnings tracking with double arrays, use distance optimization to find closest available drivers, track trip counts and earnings per driver, and display comprehensive performance statistics with proper pluralization handling."
            }
        },
        lvl13: {
            easy: {
                question: "What is a class in C++?",
                options: {
                    a: "A function",
                    b: "A blueprint for creating objects",
                    c: "A variable",
                    d: "A loop"
                },
                correctAnswer: "b",
                tip: "A class is a blueprint or template for creating objects in C++. It defines the properties (data members) and behaviors (member functions) that objects of that class will have."
            },
            average: {
                question: "What keyword is used to create a class in C++?",
                options: {
                    a: "object",
                    b: "class",
                    c: "struct",
                    d: "Both b and c are correct"
                },
                correctAnswer: "d",
                tip: "Both 'class' and 'struct' can be used to create classes in C++. The main difference is that members of a 'struct' are public by default, while members of a 'class' are private by default."
            },
            difficult: {
                question: "What is the difference between public and private members in a class?",
                options: {
                    a: "No difference",
                    b: "Public members can be accessed from outside the class, private cannot",
                    c: "Private members are faster",
                    d: "Public members use more memory"
                },
                correctAnswer: "b",
                tip: "Public members can be accessed from outside the class, while private members can only be accessed from within the class itself. This is called encapsulation - a fundamental principle of object-oriented programming."
            }
        },
        lvl14: {
            easy: {
                question: "What is inheritance in C++?",
                options: {
                    a: "A loop",
                    b: "A mechanism where a class can inherit properties from another class",
                    c: "A function",
                    d: "A variable"
                },
                correctAnswer: "b",
                tip: "Inheritance allows a class (derived class) to inherit properties and methods from another class (base class). This promotes code reusability and establishes an 'is-a' relationship between classes."
            },
            average: {
                question: "What keyword is used for inheritance in C++?",
                options: {
                    a: "extends",
                    b: "inherits",
                    c: ":",
                    d: "Both a and c are correct"
                },
                correctAnswer: "c",
                tip: "In C++, inheritance is specified using a colon (:). For example: class Derived : public Base. The access specifier (public, protected, private) determines how inherited members are accessible."
            },
            difficult: {
                question: "What is the difference between public, protected, and private inheritance?",
                options: {
                    a: "No difference",
                    b: "Public inheritance preserves access levels, protected makes public members protected, private makes all members private",
                    c: "They are the same",
                    d: "Only public inheritance is allowed"
                },
                correctAnswer: "b",
                tip: "Public inheritance preserves the original access levels, protected inheritance makes public members protected in the derived class, and private inheritance makes all inherited members private in the derived class."
            }
        },
        lvl15: {
            easy: {
                question: "What is polymorphism in C++?",
                options: {
                    a: "A data type",
                    b: "The ability of objects to take on many forms",
                    c: "A loop",
                    d: "A function"
                },
                correctAnswer: "b",
                tip: "Polymorphism allows objects of different types to be treated as objects of a common base type. It enables the same interface to be used for different underlying forms, making code more flexible and maintainable."
            },
            average: {
                question: "What is function overriding in C++?",
                options: {
                    a: "Creating a new function",
                    b: "Redefining a function in a derived class with the same signature as in the base class",
                    c: "Deleting a function",
                    d: "Calling a function"
                },
                correctAnswer: "b",
                tip: "Function overriding occurs when a derived class provides its own implementation of a function that already exists in the base class. The function must have the same name, parameters, and return type."
            },
            difficult: {
                question: "What is the difference between function overloading and function overriding?",
                options: {
                    a: "No difference",
                    b: "Overloading is multiple functions with same name but different parameters, overriding is redefining a function in derived class",
                    c: "Overriding is multiple functions, overloading is redefining",
                    d: "They are the same"
                },
                correctAnswer: "b",
                tip: "Function overloading allows multiple functions with the same name but different parameters in the same scope. Function overriding is redefining a function in a derived class that already exists in the base class."
            }
        },
        lvl16: {
            easy: {
                question: "What is a constructor in C++?",
                options: {
                    a: "A function that destroys objects",
                    b: "A special member function that initializes objects",
                    c: "A loop",
                    d: "A variable"
                },
                correctAnswer: "b",
                tip: "A constructor is a special member function that is automatically called when an object is created. It initializes the object's data members and sets up the object for use."
            },
            average: {
                question: "What is the name of a constructor in C++?",
                options: {
                    a: "constructor",
                    b: "init",
                    c: "Same as the class name",
                    d: "build"
                },
                correctAnswer: "c",
                tip: "A constructor has the same name as the class it belongs to. For example, if the class is 'Car', the constructor would be 'Car()'. Constructors don't have a return type, not even void."
            },
            difficult: {
                question: "What is a destructor in C++?",
                options: {
                    a: "A function that creates objects",
                    b: "A special member function that cleans up when an object is destroyed",
                    c: "A loop",
                    d: "A variable"
                },
                correctAnswer: "b",
                tip: "A destructor is a special member function that is automatically called when an object is destroyed. It's used to clean up resources like memory, file handles, or other resources that the object was using."
            }
        },
        lvl17: {
            easy: {
                question: "What is a virtual function in C++?",
                options: {
                    a: "A function that doesn't exist",
                    b: "A function that can be overridden in derived classes",
                    c: "A function that runs faster",
                    d: "A function that takes no parameters"
                },
                correctAnswer: "b",
                tip: "A virtual function is a function in a base class that can be overridden in derived classes. It enables polymorphism by allowing the correct function to be called based on the actual object type, not the pointer type."
            },
            average: {
                question: "What keyword is used to declare a virtual function?",
                options: {
                    a: "virtual",
                    b: "override",
                    c: "polymorphic",
                    d: "dynamic"
                },
                correctAnswer: "a",
                tip: "The 'virtual' keyword is used to declare virtual functions. For example: virtual void display(); This allows the function to be overridden in derived classes and enables runtime polymorphism."
            },
            difficult: {
                question: "What is a pure virtual function in C++?",
                options: {
                    a: "A function that is very fast",
                    b: "A function that has no implementation in the base class",
                    c: "A function that cannot be overridden",
                    d: "A function that takes many parameters"
                },
                correctAnswer: "b",
                tip: "A pure virtual function is declared with '= 0' and has no implementation in the base class. It makes the base class abstract, meaning you cannot create objects of that class directly."
            }
        },
        lvl18: {
            easy: {
                question: "What is a template in C++?",
                options: {
                    a: "A file",
                    b: "A blueprint for creating generic functions or classes",
                    c: "A variable",
                    d: "A loop"
                },
                correctAnswer: "b",
                tip: "Templates allow you to write generic code that works with different data types. They enable you to create functions and classes that can work with any type without rewriting the code for each type."
            },
            average: {
                question: "What keyword is used to declare a template in C++?",
                options: {
                    a: "template",
                    b: "generic",
                    c: "type",
                    d: "class"
                },
                correctAnswer: "a",
                tip: "The 'template' keyword is used to declare templates. For example: template <class T> or template <typename T>. The 'T' is a placeholder for the actual type that will be used."
            },
            difficult: {
                question: "What is the difference between 'class' and 'typename' in template declarations?",
                options: {
                    a: "No difference, they are interchangeable",
                    b: "class is for classes only, typename is for all types",
                    c: "typename is newer and preferred",
                    d: "Both a and c are correct"
                },
                correctAnswer: "d",
                tip: "In template declarations, 'class' and 'typename' are interchangeable and mean the same thing. However, 'typename' is generally preferred in modern C++ as it's more descriptive and clear about its purpose."
            }
        },
        lvl19: {
            easy: {
                question: "What is exception handling in C++?",
                options: {
                    a: "A loop",
                    b: "A mechanism to handle runtime errors gracefully",
                    c: "A function",
                    d: "A variable"
                },
                correctAnswer: "b",
                tip: "Exception handling allows you to deal with runtime errors gracefully. It uses try, catch, and throw blocks to handle unexpected situations without crashing the program."
            },
            average: {
                question: "What are the three keywords used in exception handling?",
                options: {
                    a: "if, else, switch",
                    b: "try, catch, throw",
                    c: "for, while, do",
                    d: "int, float, char"
                },
                correctAnswer: "b",
                tip: "The three keywords for exception handling are: 'try' (contains code that might throw exceptions), 'catch' (handles exceptions), and 'throw' (throws an exception). This provides a structured way to handle errors."
            },
            difficult: {
                question: "What happens if an exception is thrown but not caught?",
                options: {
                    a: "Nothing",
                    b: "The program continues normally",
                    c: "The program terminates with an error",
                    d: "The exception is ignored"
                },
                correctAnswer: "c",
                tip: "If an exception is thrown but not caught by any catch block, the program will terminate with an error. This is why it's important to have proper exception handling in your code."
            }
        },
        lvl20: {
            easy: {
                question: "What is the STL (Standard Template Library) in C++?",
                options: {
                    a: "A compiler",
                    b: "A collection of template classes and functions",
                    c: "A data type",
                    d: "A loop"
                },
                correctAnswer: "b",
                tip: "The STL is a powerful collection of template classes and functions that provide common data structures and algorithms. It includes containers (like vector, list), iterators, and algorithms (like sort, find)."
            },
            average: {
                question: "Which STL container is most commonly used for dynamic arrays?",
                options: {
                    a: "array",
                    b: "vector",
                    c: "list",
                    d: "set"
                },
                correctAnswer: "b",
                tip: "The 'vector' is the most commonly used STL container for dynamic arrays. It provides dynamic sizing, random access, and efficient insertion/deletion at the end. It's like an array that can grow and shrink as needed."
            },
            difficult: {
                question: "What is the main advantage of using STL containers over traditional arrays?",
                options: {
                    a: "They are faster",
                    b: "They provide built-in functionality like size(), push_back(), and automatic memory management",
                    c: "They use less memory",
                    d: "They are easier to declare"
                },
                correctAnswer: "b",
                tip: "STL containers provide many built-in functions like size(), push_back(), pop_back(), and automatic memory management. They also offer type safety and are more flexible than traditional arrays, making code more robust and maintainable."
            }
        }
    };

    // Expose tips data globally for the shared UI and exit early to avoid duplicate handlers
    window.tipsData = tipsData;
    window.dispatchEvent(new Event('tipsDataLoaded'));
    return;
})();

