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
                question: "What is the primary purpose of the 'Main' method in a C# program?",
                options: {
                    a: "To declare global variables",
                    b: "To define a class constructor",
                    c: "To serve as the entry point for program execution",
                    d: "To handle exceptions"
                },
                correctAnswer: "c",
                tips: [
                    'Start with: using System;',
                    'Create your class: class Program {',
                    'Add the Main method: static void Main() {',
                    'Print the vendor call: Console.WriteLine("Tahooo!");',
                    'Print the price list: Console.WriteLine("Taho: ₱15"); and Console.WriteLine("Syrup: ₱5");',
                    'Close the Main method with } and the class with }'
                ]
            },
            average: {
                question: "Which of the following is the correct way to add a single-line comment in C#?",
                options: {
                    a: "/* This is a comment */",
                    b: "// This is a comment",
                    c: "# This is a comment",
                    d: "--This is a comment"
                },
                correctAnswer: "b",
                tips: [
                    'Add single-line comments with // before each line of code',
                    'Use \\n for newlines: Console.WriteLine("Tahooo!\\n");',
                    'Use \\t for tabs: Console.WriteLine("\\tTaho: ₱15");',
                    'Add multi-line comments with /* */ around your vendor description',
                    'Format your output with proper spacing and borders using = characters'
                ]
            },
            difficult: {
                question: "Which C# class is commonly used for formatted output to the console?",
                options: {
                    a: "Console.WriteLine()",
                    b: "Console.Read()",
                    c: "Console.Error()",
                    d: "Console.Out()"
                },
                correctAnswer: "a",
                tips: [
                    'Fix the missing quotes: Console.WriteLine("Tahooo!");',
                    'Fix string concatenation: Console.WriteLine("Total: " + (15 + 5) + "₱");',
                    'Use parentheses to group the addition: (15 + 5) before concatenating',
                    'Check that all strings have proper opening and closing quotes',
                    'Test your output to match: Tahooo!, Taho: ₱15, Syrup: ₱5, Total: 20₱'
                ]
            }
        },
        // Placeholder data for levels 2-20
        lvl2: {
            easy: {
                question: "What data type should you use to store product names in C#?",
                options: {
                    a: "int",
                    b: "string",
                    c: "double",
                    d: "bool"
                },
                correctAnswer: "b",
                tips: [
                    'Create your class: class Program {',
                    'Declare string variables: string suka = "Vinegar"; string itlog = "Eggs"; string tinapay = "Bread";',
                    'Print each product: Console.WriteLine(suka); Console.WriteLine(itlog); Console.WriteLine(tinapay);',
                    'Make sure to use double quotes around text values',
                    'Test your output to match: Vinegar, Eggs, Bread (each on new line)'
                ]
            },
            average: {
                question: "How do you calculate the total inventory value in C#?",
                options: {
                    a: "Add all prices together",
                    b: "Multiply price by quantity for each item, then sum all results",
                    c: "Count the number of items",
                    d: "Divide total by number of items"
                },
                correctAnswer: "b",
                tips: [
                    'Add price variables: double sukaPrice = 25.50; double itlogPrice = 8.00; double tinapayPrice = 35.00;',
                    'Add quantity variables: int sukaStock = 50; int itlogStock = 100; int tinapayStock = 30;',
                    'Calculate individual values: double sukaValue = sukaPrice * sukaStock;',
                    'Calculate total: double totalValue = sukaValue + itlogValue + tinapayValue;',
                    'Use string interpolation: Console.WriteLine($"{suka}: {sukaStock} units @ ₱{sukaPrice:F2} = ₱{sukaValue:F2}");'
                ]
            },
            difficult: {
                question: "What should you use to get user input for updating stock levels?",
                options: {
                    a: "Console.WriteLine()",
                    b: "Console.ReadLine() with int.Parse()",
                    c: "Console.Read()",
                    d: "Math.Random()"
                },
                correctAnswer: "b",
                tips: [
                    'Get user input: Console.Write($"Enter new stock for {suka}: ");',
                    'Read and parse input: int sukaStock = int.Parse(Console.ReadLine());',
                    'Use string interpolation for prompts: Console.Write($"Enter new stock for {suka}: ");',
                    'Check threshold: if (sukaStock < 20) { Console.WriteLine($"⚠️ RESTOCK ALERT: {suka} is below threshold ({sukaStock} < 20)"); }',
                    'Use string interpolation for formatted output: Console.WriteLine($"{suka}: {sukaStock} units @ ₱{sukaPrice:F2} = ₱{sukaValue:F2}");'
                ]
            }
        },
        lvl3: {
            easy: {
                question: "What operator should you use to add multiple costs together?",
                options: {
                    a: "Multiplication (*)",
                    b: "Addition (+)",
                    c: "Division (/)",
                    d: "Modulus (%)"
                },
                correctAnswer: "b",
                tips: [
                    'Create your class: class Program {',
                    'Declare cost variables: int banderitas = 500; int lechon = 3000; int soundSystem = 2000;',
                    'Calculate total: int totalCost = banderitas + lechon + soundSystem;',
                    'Print formatted output with headers and currency symbols',
                    'Test your output to show: Banderitas: ₱500, Lechon: ₱3,000, Sound System: ₱2,000, Total Cost: ₱5,500'
                ]
            },
            average: {
                question: "How do you apply a 10% discount in C#?",
                options: {
                    a: "Multiply by 0.1",
                    b: "Multiply by 0.9",
                    c: "Divide by 10",
                    d: "Add 10"
                },
                correctAnswer: "b",
                tips: [
                    'Add optional items: int balloons = 300; int candles = 200;',
                    'Calculate subtotal: int subtotal = banderitas + lechon + soundSystem + balloons + candles;',
                    'Apply discount: double discount = subtotal * 0.10; double finalTotal = subtotal - discount;',
                    'Display breakdown: Console.WriteLine($"Subtotal: ₱{subtotal}"); Console.WriteLine($"Discount (10%): ₱{discount:F0}");',
                    'Show final total: Console.WriteLine($"Final Total: ₱{finalTotal:F0}");'
                ]
            },
            difficult: {
                question: "What approach should you use to maximize items within a budget?",
                options: {
                    a: "Buy the most expensive items first",
                    b: "Use a greedy algorithm to select items by value",
                    c: "Buy items randomly",
                    d: "Always buy the cheapest items"
                },
                correctAnswer: "b",
                tips: [
                    'Add using statements: using System.Collections.Generic; using System.Linq;',
                    'Create items list: var items = new List<(string name, int price)> { ("Banderitas", 500), ("Lechon", 3000), ("Sound System", 2000), ("Balloons", 300), ("Candles", 200) };',
                    'Sort by price: items = items.OrderBy(x => x.price).ToList();',
                    'Use greedy selection: foreach (var item in items) { if (totalCost + item.price <= budget) { ... } }',
                    'Display selected items and remaining budget'
                ]
            }
        },
        lvl4: {
            easy: {
                question: "What control structure should you use to check if it's past 10 PM?",
                options: {
                    a: "for loop",
                    b: "if-else statement",
                    c: "while loop",
                    d: "switch statement"
                },
                correctAnswer: "b",
                tips: [
                    'Create your class: class Program {',
                    'Get user input: Console.Write("Enter current hour (0-23): "); int currentHour = int.Parse(Console.ReadLine());',
                    'Use if statement: if (currentHour >= 22) { Console.WriteLine("⚠️ CURFEW VIOLATION! It\'s past 10 PM."); }',
                    'Add else for safe time: else { Console.WriteLine("✅ No curfew violation. You\'re safe!"); }',
                    'Test with different time values to verify your logic works'
                ]
            },
            average: {
                question: "How do you check if someone is a minor in C#?",
                options: {
                    a: "if (age > 18)",
                    b: "if (age < 18)",
                    c: "if (age == 18)",
                    d: "if (age >= 18)"
                },
                correctAnswer: "b",
                tips: [
                    'Get user input: Console.Write("Enter your age: "); int age = int.Parse(Console.ReadLine());',
                    'Check for minor: if (age < 18) { Console.WriteLine("✅ EXEMPTION: Minors are exempt from curfew."); }',
                    'Check for senior: else if (age >= 65) { Console.WriteLine("✅ EXEMPTION: Senior citizens are exempt."); }',
                    'Add else for adults: else { Console.WriteLine("⚠️ CURFEW VIOLATION! It\'s past 10 PM and you\'re not exempt."); }',
                    'Use nested if statements to handle different scenarios'
                ]
            },
            difficult: {
                question: "What data structure should you use to store multiple residents' data?",
                options: {
                    a: "Single variables",
                    b: "Arrays",
                    c: "Constants",
                    d: "Methods"
                },
                correctAnswer: "b",
                tips: [
                    'Create parallel arrays: string[] names = {"Juan", "Maria", "Pedro", "Ana"};',
                    'Add age array: int[] ages = {25, 16, 70, 30};',
                    'Add reason array: string[] reasons = {"Work", "School", "Medical", "Emergency"};',
                    'Use for loop: for (int i = 0; i < names.Length; i++) { ... }',
                    'Create CheckCurfewViolation method: static string CheckCurfewViolation(int age, string reason, int currentHour) { ... }'
                ]
            }
        },
        lvl5: {
            easy: {
                question: "What should you use to create a function that greets helpers by name?",
                options: {
                    a: "A variable",
                    b: "A method with parameters",
                    c: "A loop",
                    d: "An array"
                },
                correctAnswer: "b",
                tips: [
                    'Create your class: class Program {',
                    'Create greeting method: static void GreetHelper(string name) { Console.WriteLine($"Hello, {name}! Thank you for helping with the move."); }',
                    'Call the method: GreetHelper("Juan"); GreetHelper("Maria"); GreetHelper("Pedro");',
                    'Make sure to pass the name as a parameter in quotes',
                    'Test your output to show personalized greetings for each helper'
                ]
            },
            average: {
                question: "How do you assign roles based on age ranges?",
                options: {
                    a: "Use if-else statements with age conditions",
                    b: "Use only loops",
                    c: "Use only arrays",
                    d: "Use only constants"
                },
                correctAnswer: "a",
                tips: [
                    'Create role assignment method: static void AssignRole(string name, int age) { ... }',
                    'Create DetermineRole method: static string DetermineRole(int age) { ... }',
                    'Check age ranges: if (age >= 18 && age <= 40) { return "Lifter"; }',
                    'Add more conditions: else if (age >= 25 && age <= 60) { return "Cook"; }',
                    'Print assignment: Console.WriteLine($"Helper: {name} ({age})"); Console.WriteLine($"Assigned Role: {role}");'
                ]
            },
            difficult: {
                question: "How do you prevent duplicate role assignments?",
                options: {
                    a: "Use arrays to track assigned roles",
                    b: "Ignore the problem",
                    c: "Assign roles randomly",
                    d: "Use only one role type"
                },
                correctAnswer: "a",
                tips: [
                    'Add using statement: using System.Collections.Generic;',
                    'Create tracking arrays: string[] requiredRoles = {"Lifter", "Cook", "Driver", "Assistant", "Coordinator"}; bool[] roleFilled = new bool[requiredRoles.Length];',
                    'Create IsEligibleForRole method: static bool IsEligibleForRole(int age, string role) { ... }',
                    'Create AssignAvailableRole method: static string AssignAvailableRole(string name, int age, string[] roles, bool[] filled) { ... }',
                    'Use for loop to assign roles ensuring no duplicates'
                ]
            }
        },
        lvl6: {
            easy: {
                question: "What data structure should you use to store 5 destinations?",
                options: {
                    a: "Single string variable",
                    b: "string array",
                    c: "int variable",
                    d: "bool variable"
                },
                correctAnswer: "b",
                tips: [
                    'Create your class: class Program {',
                    'Create destinations array: string[] destinations = {"Quiapo", "Makati", "Cubao", "Ortigas", "BGC"};',
                    'Create distances array: int[] distances = {0, 350, 500, 250, 400};',
                    'Use for loop to display: for (int i = 0; i < destinations.Length; i++) { Console.WriteLine($"{destinations[i]}: {distances[i]} km"); }',
                    'Test your output to show all destinations with their distances'
                ]
            },
            average: {
                question: "How do you calculate total fare for multiple destinations?",
                options: {
                    a: "Add all fares together",
                    b: "Use parallel arrays for destinations and fares, then sum",
                    c: "Multiply by number of destinations",
                    d: "Divide by number of destinations"
                },
                correctAnswer: "b",
                tips: [
                    'Create parallel arrays: string[] destinations = {"Quiapo", "Makati", "Cubao", "Ortigas", "BGC"};',
                    'Add fare array: double[] fares = {0.0, 15.0, 25.0, 12.0, 20.0};',
                    'Initialize total: double totalFare = 0.0;',
                    'Use for loop to sum: for (int i = 0; i < destinations.Length; i++) { totalFare += fares[i]; }',
                    'Display breakdown: show each destination with its fare and the total'
                ]
            },
            difficult: {
                question: "How do you validate if a destination exists in your list?",
                options: {
                    a: "Use a loop to search through the destinations array",
                    b: "Use random selection",
                    c: "Use only the first destination",
                    d: "Ignore validation"
                },
                correctAnswer: "a",
                tips: [
                    'Get user input: Console.Write("Enter destination: "); string userDestination = Console.ReadLine();',
                    'Search with loop: bool found = false; for (int i = 0; i < destinations.Length; i++) { if (destinations[i] == userDestination) { found = true; ... } }',
                    'Handle found case: if (found) { Console.WriteLine($"Fare to {userDestination}: ₱{fares[i]}"); }',
                    'Handle not found: else { Console.WriteLine("Destination not found!"); }',
                    'Use string comparison for exact matches'
                ]
            }
        },
        lvl7: {
            easy: {
                question: "What data types should you use for player names and scores?",
                options: {
                    a: "string[] for names, int[] for scores",
                    b: "int[] for both",
                    c: "string[] for both",
                    d: "double[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: class Program {',
                    'Create names array: string[] names = {"Juan", "Maria", "Pedro"};',
                    'Create scores array: int[] scores = {85, 92, 78};',
                    'Display players: for (int i = 0; i < names.Length; i++) { Console.WriteLine($"Player {i + 1}: {names[i]} - {scores[i]} points"); }',
                    'Test your output to show each player with their score'
                ]
            },
            average: {
                question: "How do you sort players by score in descending order?",
                options: {
                    a: "Use LINQ OrderByDescending with a custom comparator",
                    b: "Use only loops",
                    c: "Use only if statements",
                    d: "Use only variables"
                },
                correctAnswer: "a",
                tips: [
                    'Add using statement: using System.Linq;',
                    'Create Player class: class Player { public string Name { get; set; } public int Score { get; set; } }',
                    'Create Player objects: Player[] players = new Player[names.Length]; for (int i = 0; i < names.Length; i++) { players[i] = new Player(names[i], scores[i]); }',
                    'Sort by score: players = players.OrderByDescending(p => p.Score).ToArray();',
                    'Display ranked results: Console.WriteLine($"{positions[i]}: {players[i].Name} - {players[i].Score} points");'
                ]
            },
            difficult: {
                question: "How do you handle tied scores in the leaderboard?",
                options: {
                    a: "Use tie-breaking logic and display tied rankings",
                    b: "Ignore ties",
                    c: "Use only the first score",
                    d: "Use random ordering"
                },
                correctAnswer: "a",
                tips: [
                    'Create GetRankText method: static string GetRankText(int rank) { switch (rank) { case 1: return "1st"; case 2: return "2nd"; case 3: return "3rd"; default: return $"{rank}th"; } }',
                    'Implement tie handling: int currentRank = 1; if (i > 0 && players[i].Score != players[i-1].Score) { currentRank = i + 1; }',
                    'Display formatted leaderboard: Console.WriteLine($"{rankText,-4}  {players[i].Name,-6}  {players[i].Score}{tieNote}");',
                    'Calculate statistics: int highest = scores.Max(); int lowest = scores.Min(); double average = scores.Average();',
                    'Show comprehensive statistics with proper formatting'
                ]
            }
        },
        lvl8: {
            easy: {
                question: "What data types should you use for driver names and availability?",
                options: {
                    a: "string[] for drivers, bool[] for available",
                    b: "int[] for both",
                    c: "string[] for both",
                    d: "bool[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: class Program {',
                    'Create drivers array: string[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};',
                    'Create availability array: bool[] available = {true, false, true};',
                    'Display driver status: for (int i = 0; i < drivers.Length; i++) { string status = available[i] ? "Available" : "Busy"; Console.WriteLine($"Driver {i + 1}: {drivers[i]} - {status}"); }',
                    'Test your output to show each driver with their availability status'
                ]
            },
            average: {
                question: "How do you calculate fare based on distance?",
                options: {
                    a: "Multiply distance by fare rate per kilometer",
                    b: "Use only the distance",
                    c: "Use only the fare rate",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Add passenger and distance arrays: string[] passengers = {"Maria", "Ana"}; double[] distances = {2.5, 3.0};',
                    'Use nested loops to assign passengers: for (int i = 0; i < drivers.Length && passengerIndex < passengers.Length; i++) { if (available[i]) { ... } }',
                    'Calculate fare: double fare = distance * 10; // ₱10 per km',
                    'Display result: Console.WriteLine($"Passenger: {passenger}"); Console.WriteLine($"Assigned Driver: {driver}"); Console.WriteLine($"Fare: ₱{fare:F2}");',
                    'Use string interpolation for formatted output'
                ]
            },
            difficult: {
                question: "How do you optimize driver assignments?",
                options: {
                    a: "Use algorithms to find the closest available driver",
                    b: "Use only random assignment",
                    c: "Use only the first driver",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create earnings tracking: double[] driverEarnings = {0.0, 0.0, 0.0}; int[] tripCounts = {0, 0, 0};',
                    'Find closest available driver: int bestDriverIndex = -1; double minDistance = double.MaxValue;',
                    'Use distance optimization: for (int i = 0; i < drivers.Length; i++) { if (available[i] && driverDistance < minDistance) { minDistance = driverDistance; bestDriverIndex = i; } }',
                    'Update driver earnings: driverEarnings[bestDriverIndex] += fare; tripCounts[bestDriverIndex]++;',
                    'Display performance: Console.WriteLine($"{drivers[i]}: {tripCounts[i]} trip{(tripCounts[i] != 1 ? "s" : "")}, ₱{driverEarnings[i]:F2} earned");'
                ]
            }
        },
        lvl9: {
            easy: {
                question: "What data types should you use for driver names and availability?",
                options: {
                    a: "string[] for drivers, bool[] for available",
                    b: "int[] for both",
                    c: "string[] for both",
                    d: "bool[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: class Program {',
                    'Create drivers array: string[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};',
                    'Create availability array: bool[] available = {true, false, true};',
                    'Display driver status: for (int i = 0; i < drivers.Length; i++) { string status = available[i] ? "Available" : "Busy"; Console.WriteLine($"Driver {i + 1}: {drivers[i]} - {status}"); }',
                    'Test your output to show each driver with their availability status'
                ]
            },
            average: {
                question: "How do you calculate fare based on distance?",
                options: {
                    a: "Multiply distance by fare rate per kilometer",
                    b: "Use only the distance",
                    c: "Use only the fare rate",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Add passenger and distance arrays: string[] passengers = {"Maria", "Ana"}; double[] distances = {2.5, 3.0};',
                    'Use nested loops to assign passengers: for (int i = 0; i < drivers.Length && passengerIndex < passengers.Length; i++) { if (available[i]) { ... } }',
                    'Calculate fare: double fare = distance * 10; // ₱10 per km',
                    'Display result: Console.WriteLine($"Passenger: {passenger}"); Console.WriteLine($"Assigned Driver: {driver}"); Console.WriteLine($"Fare: ₱{fare:F2}");',
                    'Use string interpolation for formatted output'
                ]
            },
            difficult: {
                question: "How do you optimize driver assignments?",
                options: {
                    a: "Use algorithms to find the closest available driver",
                    b: "Use only random assignment",
                    c: "Use only the first driver",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create earnings tracking: double[] driverEarnings = {0.0, 0.0, 0.0}; int[] tripCounts = {0, 0, 0};',
                    'Find closest available driver: int bestDriverIndex = -1; double minDistance = double.MaxValue;',
                    'Use distance optimization: for (int i = 0; i < drivers.Length; i++) { if (available[i] && driverDistance < minDistance) { minDistance = driverDistance; bestDriverIndex = i; } }',
                    'Update driver earnings: driverEarnings[bestDriverIndex] += fare; tripCounts[bestDriverIndex]++;',
                    'Display performance: Console.WriteLine($"{drivers[i]}: {tripCounts[i]} trip{(tripCounts[i] != 1 ? "s" : "")}, ₱{driverEarnings[i]:F2} earned");'
                ]
            }
        },
        lvl10: {
            easy: {
                question: "What data types should you use for player names and scores?",
                options: {
                    a: "string[] for names, int[] for scores",
                    b: "int[] for both",
                    c: "string[] for both",
                    d: "double[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: class Program {',
                    'Create names array: string[] names = {"Juan", "Maria", "Pedro"};',
                    'Create scores array: int[] scores = {85, 92, 78};',
                    'Display players: for (int i = 0; i < names.Length; i++) { Console.WriteLine($"Player {i + 1}: {names[i]} - {scores[i]} points"); }',
                    'Test your output to show each player with their score'
                ]
            },
            average: {
                question: "How do you sort players by score in descending order?",
                options: {
                    a: "Use LINQ OrderByDescending with a custom comparator",
                    b: "Use only loops",
                    c: "Use only if statements",
                    d: "Use only variables"
                },
                correctAnswer: "a",
                tips: [
                    'Add using statement: using System.Linq;',
                    'Create Player class: class Player { public string Name { get; set; } public int Score { get; set; } }',
                    'Create Player objects: Player[] players = new Player[names.Length]; for (int i = 0; i < names.Length; i++) { players[i] = new Player(names[i], scores[i]); }',
                    'Sort by score: players = players.OrderByDescending(p => p.Score).ToArray();',
                    'Display ranked results: Console.WriteLine($"{positions[i]}: {players[i].Name} - {players[i].Score} points");'
                ]
            },
            difficult: {
                question: "How do you handle tied scores in the leaderboard?",
                options: {
                    a: "Use tie-breaking logic and display tied rankings",
                    b: "Ignore ties",
                    c: "Use only the first score",
                    d: "Use random ordering"
                },
                correctAnswer: "a",
                tips: [
                    'Create GetRankText method: static string GetRankText(int rank) { switch (rank) { case 1: return "1st"; case 2: return "2nd"; case 3: return "3rd"; default: return $"{rank}th"; } }',
                    'Implement tie handling: int currentRank = 1; if (i > 0 && players[i].Score != players[i-1].Score) { currentRank = i + 1; }',
                    'Display formatted leaderboard: Console.WriteLine($"{rankText,-4}  {players[i].Name,-6}  {players[i].Score}{tieNote}");',
                    'Calculate statistics: int highest = scores.Max(); int lowest = scores.Min(); double average = scores.Average();',
                    'Show comprehensive statistics with proper formatting'
                ]
            }
        },
        lvl11: {
            easy: {
                question: "What data types should you use for driver names and availability?",
                options: {
                    a: "string[] for drivers, bool[] for available",
                    b: "int[] for both",
                    c: "string[] for both",
                    d: "bool[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: class Program {',
                    'Create drivers array: string[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};',
                    'Create availability array: bool[] available = {true, false, true};',
                    'Display driver status: for (int i = 0; i < drivers.Length; i++) { string status = available[i] ? "Available" : "Busy"; Console.WriteLine($"Driver {i + 1}: {drivers[i]} - {status}"); }',
                    'Test your output to show each driver with their availability status'
                ]
            },
            average: {
                question: "How do you calculate fare based on distance?",
                options: {
                    a: "Multiply distance by fare rate per kilometer",
                    b: "Use only the distance",
                    c: "Use only the fare rate",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Add passenger and distance arrays: string[] passengers = {"Maria", "Ana"}; double[] distances = {2.5, 3.0};',
                    'Use nested loops to assign passengers: for (int i = 0; i < drivers.Length && passengerIndex < passengers.Length; i++) { if (available[i]) { ... } }',
                    'Calculate fare: double fare = distance * 10; // ₱10 per km',
                    'Display result: Console.WriteLine($"Passenger: {passenger}"); Console.WriteLine($"Assigned Driver: {driver}"); Console.WriteLine($"Fare: ₱{fare:F2}");',
                    'Use string interpolation for formatted output'
                ]
            },
            difficult: {
                question: "How do you optimize driver assignments?",
                options: {
                    a: "Use algorithms to find the closest available driver",
                    b: "Use only random assignment",
                    c: "Use only the first driver",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create earnings tracking: double[] driverEarnings = {0.0, 0.0, 0.0}; int[] tripCounts = {0, 0, 0};',
                    'Find closest available driver: int bestDriverIndex = -1; double minDistance = double.MaxValue;',
                    'Use distance optimization: for (int i = 0; i < drivers.Length; i++) { if (available[i] && driverDistance < minDistance) { minDistance = driverDistance; bestDriverIndex = i; } }',
                    'Update driver earnings: driverEarnings[bestDriverIndex] += fare; tripCounts[bestDriverIndex]++;',
                    'Display performance: Console.WriteLine($"{drivers[i]}: {tripCounts[i]} trip{(tripCounts[i] != 1 ? "s" : "")}, ₱{driverEarnings[i]:F2} earned");'
                ]
            }
        },
        lvl12: {
            easy: {
                question: "What data types should you use for driver names and availability?",
                options: {
                    a: "string[] for drivers, bool[] for available",
                    b: "int[] for both",
                    c: "string[] for both",
                    d: "bool[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: class Program {',
                    'Create drivers array: string[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};',
                    'Create availability array: bool[] available = {true, false, true};',
                    'Display driver status: for (int i = 0; i < drivers.Length; i++) { string status = available[i] ? "Available" : "Busy"; Console.WriteLine($"Driver {i + 1}: {drivers[i]} - {status}"); }',
                    'Test your output to show each driver with their availability status'
                ]
            },
            average: {
                question: "How do you calculate fare based on distance?",
                options: {
                    a: "Multiply distance by fare rate per kilometer",
                    b: "Use only the distance",
                    c: "Use only the fare rate",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Add passenger and distance arrays: string[] passengers = {"Maria", "Ana"}; double[] distances = {2.5, 3.0};',
                    'Use nested loops to assign passengers: for (int i = 0; i < drivers.Length && passengerIndex < passengers.Length; i++) { if (available[i]) { ... } }',
                    'Calculate fare: double fare = distance * 10; // ₱10 per km',
                    'Display result: Console.WriteLine($"Passenger: {passenger}"); Console.WriteLine($"Assigned Driver: {driver}"); Console.WriteLine($"Fare: ₱{fare:F2}");',
                    'Use string interpolation for formatted output'
                ]
            },
            difficult: {
                question: "How do you optimize driver assignments?",
                options: {
                    a: "Use algorithms to find the closest available driver",
                    b: "Use only random assignment",
                    c: "Use only the first driver",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create earnings tracking: double[] driverEarnings = {0.0, 0.0, 0.0}; int[] tripCounts = {0, 0, 0};',
                    'Find closest available driver: int bestDriverIndex = -1; double minDistance = double.MaxValue;',
                    'Use distance optimization: for (int i = 0; i < drivers.Length; i++) { if (available[i] && driverDistance < minDistance) { minDistance = driverDistance; bestDriverIndex = i; } }',
                    'Update driver earnings: driverEarnings[bestDriverIndex] += fare; tripCounts[bestDriverIndex]++;',
                    'Display performance: Console.WriteLine($"{drivers[i]}: {tripCounts[i]} trip{(tripCounts[i] != 1 ? "s" : "")}, ₱{driverEarnings[i]:F2} earned");'
                ]
            }
        },
        lvl13: {
            easy: {
                question: "What data types should you use for driver names and availability?",
                options: {
                    a: "string[] for drivers, bool[] for available",
                    b: "int[] for both",
                    c: "string[] for both",
                    d: "bool[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: class Program {',
                    'Create drivers array: string[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};',
                    'Create availability array: bool[] available = {true, false, true};',
                    'Display driver status: for (int i = 0; i < drivers.Length; i++) { string status = available[i] ? "Available" : "Busy"; Console.WriteLine($"Driver {i + 1}: {drivers[i]} - {status}"); }',
                    'Test your output to show each driver with their availability status'
                ]
            },
            average: {
                question: "How do you calculate fare based on distance?",
                options: {
                    a: "Multiply distance by fare rate per kilometer",
                    b: "Use only the distance",
                    c: "Use only the fare rate",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Add passenger and distance arrays: string[] passengers = {"Maria", "Ana"}; double[] distances = {2.5, 3.0};',
                    'Use nested loops to assign passengers: for (int i = 0; i < drivers.Length && passengerIndex < passengers.Length; i++) { if (available[i]) { ... } }',
                    'Calculate fare: double fare = distance * 10; // ₱10 per km',
                    'Display result: Console.WriteLine($"Passenger: {passenger}"); Console.WriteLine($"Assigned Driver: {driver}"); Console.WriteLine($"Fare: ₱{fare:F2}");',
                    'Use string interpolation for formatted output'
                ]
            },
            difficult: {
                question: "How do you optimize driver assignments?",
                options: {
                    a: "Use algorithms to find the closest available driver",
                    b: "Use only random assignment",
                    c: "Use only the first driver",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create earnings tracking: double[] driverEarnings = {0.0, 0.0, 0.0}; int[] tripCounts = {0, 0, 0};',
                    'Find closest available driver: int bestDriverIndex = -1; double minDistance = double.MaxValue;',
                    'Use distance optimization: for (int i = 0; i < drivers.Length; i++) { if (available[i] && driverDistance < minDistance) { minDistance = driverDistance; bestDriverIndex = i; } }',
                    'Update driver earnings: driverEarnings[bestDriverIndex] += fare; tripCounts[bestDriverIndex]++;',
                    'Display performance: Console.WriteLine($"{drivers[i]}: {tripCounts[i]} trip{(tripCounts[i] != 1 ? "s" : "")}, ₱{driverEarnings[i]:F2} earned");'
                ]
            }
        },
        lvl14: {
            easy: {
                question: "What data types should you use for driver names and availability?",
                options: {
                    a: "string[] for drivers, bool[] for available",
                    b: "int[] for both",
                    c: "string[] for both",
                    d: "bool[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: class Program {',
                    'Create drivers array: string[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};',
                    'Create availability array: bool[] available = {true, false, true};',
                    'Display driver status: for (int i = 0; i < drivers.Length; i++) { string status = available[i] ? "Available" : "Busy"; Console.WriteLine($"Driver {i + 1}: {drivers[i]} - {status}"); }',
                    'Test your output to show each driver with their availability status'
                ]
            },
            average: {
                question: "How do you calculate fare based on distance?",
                options: {
                    a: "Multiply distance by fare rate per kilometer",
                    b: "Use only the distance",
                    c: "Use only the fare rate",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Add passenger and distance arrays: string[] passengers = {"Maria", "Ana"}; double[] distances = {2.5, 3.0};',
                    'Use nested loops to assign passengers: for (int i = 0; i < drivers.Length && passengerIndex < passengers.Length; i++) { if (available[i]) { ... } }',
                    'Calculate fare: double fare = distance * 10; // ₱10 per km',
                    'Display result: Console.WriteLine($"Passenger: {passenger}"); Console.WriteLine($"Assigned Driver: {driver}"); Console.WriteLine($"Fare: ₱{fare:F2}");',
                    'Use string interpolation for formatted output'
                ]
            },
            difficult: {
                question: "How do you optimize driver assignments?",
                options: {
                    a: "Use algorithms to find the closest available driver",
                    b: "Use only random assignment",
                    c: "Use only the first driver",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create earnings tracking: double[] driverEarnings = {0.0, 0.0, 0.0}; int[] tripCounts = {0, 0, 0};',
                    'Find closest available driver: int bestDriverIndex = -1; double minDistance = double.MaxValue;',
                    'Use distance optimization: for (int i = 0; i < drivers.Length; i++) { if (available[i] && driverDistance < minDistance) { minDistance = driverDistance; bestDriverIndex = i; } }',
                    'Update driver earnings: driverEarnings[bestDriverIndex] += fare; tripCounts[bestDriverIndex]++;',
                    'Display performance: Console.WriteLine($"{drivers[i]}: {tripCounts[i]} trip{(tripCounts[i] != 1 ? "s" : "")}, ₱{driverEarnings[i]:F2} earned");'
                ]
            }
        },
        lvl15: {
            easy: {
                question: "What data types should you use for driver names and availability?",
                options: {
                    a: "string[] for drivers, bool[] for available",
                    b: "int[] for both",
                    c: "string[] for both",
                    d: "bool[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: class Program {',
                    'Create drivers array: string[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};',
                    'Create availability array: bool[] available = {true, false, true};',
                    'Display driver status: for (int i = 0; i < drivers.Length; i++) { string status = available[i] ? "Available" : "Busy"; Console.WriteLine($"Driver {i + 1}: {drivers[i]} - {status}"); }',
                    'Test your output to show each driver with their availability status'
                ]
            },
            average: {
                question: "How do you calculate fare based on distance?",
                options: {
                    a: "Multiply distance by fare rate per kilometer",
                    b: "Use only the distance",
                    c: "Use only the fare rate",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Add passenger and distance arrays: string[] passengers = {"Maria", "Ana"}; double[] distances = {2.5, 3.0};',
                    'Use nested loops to assign passengers: for (int i = 0; i < drivers.Length && passengerIndex < passengers.Length; i++) { if (available[i]) { ... } }',
                    'Calculate fare: double fare = distance * 10; // ₱10 per km',
                    'Display result: Console.WriteLine($"Passenger: {passenger}"); Console.WriteLine($"Assigned Driver: {driver}"); Console.WriteLine($"Fare: ₱{fare:F2}");',
                    'Use string interpolation for formatted output'
                ]
            },
            difficult: {
                question: "How do you optimize driver assignments?",
                options: {
                    a: "Use algorithms to find the closest available driver",
                    b: "Use only random assignment",
                    c: "Use only the first driver",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create earnings tracking: double[] driverEarnings = {0.0, 0.0, 0.0}; int[] tripCounts = {0, 0, 0};',
                    'Find closest available driver: int bestDriverIndex = -1; double minDistance = double.MaxValue;',
                    'Use distance optimization: for (int i = 0; i < drivers.Length; i++) { if (available[i] && driverDistance < minDistance) { minDistance = driverDistance; bestDriverIndex = i; } }',
                    'Update driver earnings: driverEarnings[bestDriverIndex] += fare; tripCounts[bestDriverIndex]++;',
                    'Display performance: Console.WriteLine($"{drivers[i]}: {tripCounts[i]} trip{(tripCounts[i] != 1 ? "s" : "")}, ₱{driverEarnings[i]:F2} earned");'
                ]
            }
        },
        lvl16: {
            easy: {
                question: "What data types should you use for driver names and availability?",
                options: {
                    a: "string[] for drivers, bool[] for available",
                    b: "int[] for both",
                    c: "string[] for both",
                    d: "bool[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: class Program {',
                    'Create drivers array: string[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};',
                    'Create availability array: bool[] available = {true, false, true};',
                    'Display driver status: for (int i = 0; i < drivers.Length; i++) { string status = available[i] ? "Available" : "Busy"; Console.WriteLine($"Driver {i + 1}: {drivers[i]} - {status}"); }',
                    'Test your output to show each driver with their availability status'
                ]
            },
            average: {
                question: "How do you calculate fare based on distance?",
                options: {
                    a: "Multiply distance by fare rate per kilometer",
                    b: "Use only the distance",
                    c: "Use only the fare rate",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Add passenger and distance arrays: string[] passengers = {"Maria", "Ana"}; double[] distances = {2.5, 3.0};',
                    'Use nested loops to assign passengers: for (int i = 0; i < drivers.Length && passengerIndex < passengers.Length; i++) { if (available[i]) { ... } }',
                    'Calculate fare: double fare = distance * 10; // ₱10 per km',
                    'Display result: Console.WriteLine($"Passenger: {passenger}"); Console.WriteLine($"Assigned Driver: {driver}"); Console.WriteLine($"Fare: ₱{fare:F2}");',
                    'Use string interpolation for formatted output'
                ]
            },
            difficult: {
                question: "How do you optimize driver assignments?",
                options: {
                    a: "Use algorithms to find the closest available driver",
                    b: "Use only random assignment",
                    c: "Use only the first driver",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create earnings tracking: double[] driverEarnings = {0.0, 0.0, 0.0}; int[] tripCounts = {0, 0, 0};',
                    'Find closest available driver: int bestDriverIndex = -1; double minDistance = double.MaxValue;',
                    'Use distance optimization: for (int i = 0; i < drivers.Length; i++) { if (available[i] && driverDistance < minDistance) { minDistance = driverDistance; bestDriverIndex = i; } }',
                    'Update driver earnings: driverEarnings[bestDriverIndex] += fare; tripCounts[bestDriverIndex]++;',
                    'Display performance: Console.WriteLine($"{drivers[i]}: {tripCounts[i]} trip{(tripCounts[i] != 1 ? "s" : "")}, ₱{driverEarnings[i]:F2} earned");'
                ]
            }
        },
        lvl17: {
            easy: {
                question: "What data types should you use for driver names and availability?",
                options: {
                    a: "string[] for drivers, bool[] for available",
                    b: "int[] for both",
                    c: "string[] for both",
                    d: "bool[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: class Program {',
                    'Create drivers array: string[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};',
                    'Create availability array: bool[] available = {true, false, true};',
                    'Display driver status: for (int i = 0; i < drivers.Length; i++) { string status = available[i] ? "Available" : "Busy"; Console.WriteLine($"Driver {i + 1}: {drivers[i]} - {status}"); }',
                    'Test your output to show each driver with their availability status'
                ]
            },
            average: {
                question: "How do you calculate fare based on distance?",
                options: {
                    a: "Multiply distance by fare rate per kilometer",
                    b: "Use only the distance",
                    c: "Use only the fare rate",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Add passenger and distance arrays: string[] passengers = {"Maria", "Ana"}; double[] distances = {2.5, 3.0};',
                    'Use nested loops to assign passengers: for (int i = 0; i < drivers.Length && passengerIndex < passengers.Length; i++) { if (available[i]) { ... } }',
                    'Calculate fare: double fare = distance * 10; // ₱10 per km',
                    'Display result: Console.WriteLine($"Passenger: {passenger}"); Console.WriteLine($"Assigned Driver: {driver}"); Console.WriteLine($"Fare: ₱{fare:F2}");',
                    'Use string interpolation for formatted output'
                ]
            },
            difficult: {
                question: "How do you optimize driver assignments?",
                options: {
                    a: "Use algorithms to find the closest available driver",
                    b: "Use only random assignment",
                    c: "Use only the first driver",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create earnings tracking: double[] driverEarnings = {0.0, 0.0, 0.0}; int[] tripCounts = {0, 0, 0};',
                    'Find closest available driver: int bestDriverIndex = -1; double minDistance = double.MaxValue;',
                    'Use distance optimization: for (int i = 0; i < drivers.Length; i++) { if (available[i] && driverDistance < minDistance) { minDistance = driverDistance; bestDriverIndex = i; } }',
                    'Update driver earnings: driverEarnings[bestDriverIndex] += fare; tripCounts[bestDriverIndex]++;',
                    'Display performance: Console.WriteLine($"{drivers[i]}: {tripCounts[i]} trip{(tripCounts[i] != 1 ? "s" : "")}, ₱{driverEarnings[i]:F2} earned");'
                ]
            }
        },
        lvl18: {
            easy: {
                question: "What data types should you use for driver names and availability?",
                options: {
                    a: "string[] for drivers, bool[] for available",
                    b: "int[] for both",
                    c: "string[] for both",
                    d: "bool[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: class Program {',
                    'Create drivers array: string[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};',
                    'Create availability array: bool[] available = {true, false, true};',
                    'Display driver status: for (int i = 0; i < drivers.Length; i++) { string status = available[i] ? "Available" : "Busy"; Console.WriteLine($"Driver {i + 1}: {drivers[i]} - {status}"); }',
                    'Test your output to show each driver with their availability status'
                ]
            },
            average: {
                question: "How do you calculate fare based on distance?",
                options: {
                    a: "Multiply distance by fare rate per kilometer",
                    b: "Use only the distance",
                    c: "Use only the fare rate",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Add passenger and distance arrays: string[] passengers = {"Maria", "Ana"}; double[] distances = {2.5, 3.0};',
                    'Use nested loops to assign passengers: for (int i = 0; i < drivers.Length && passengerIndex < passengers.Length; i++) { if (available[i]) { ... } }',
                    'Calculate fare: double fare = distance * 10; // ₱10 per km',
                    'Display result: Console.WriteLine($"Passenger: {passenger}"); Console.WriteLine($"Assigned Driver: {driver}"); Console.WriteLine($"Fare: ₱{fare:F2}");',
                    'Use string interpolation for formatted output'
                ]
            },
            difficult: {
                question: "How do you optimize driver assignments?",
                options: {
                    a: "Use algorithms to find the closest available driver",
                    b: "Use only random assignment",
                    c: "Use only the first driver",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create earnings tracking: double[] driverEarnings = {0.0, 0.0, 0.0}; int[] tripCounts = {0, 0, 0};',
                    'Find closest available driver: int bestDriverIndex = -1; double minDistance = double.MaxValue;',
                    'Use distance optimization: for (int i = 0; i < drivers.Length; i++) { if (available[i] && driverDistance < minDistance) { minDistance = driverDistance; bestDriverIndex = i; } }',
                    'Update driver earnings: driverEarnings[bestDriverIndex] += fare; tripCounts[bestDriverIndex]++;',
                    'Display performance: Console.WriteLine($"{drivers[i]}: {tripCounts[i]} trip{(tripCounts[i] != 1 ? "s" : "")}, ₱{driverEarnings[i]:F2} earned");'
                ]
            }
        },
        lvl19: {
            easy: {
                question: "What data types should you use for driver names and availability?",
                options: {
                    a: "string[] for drivers, bool[] for available",
                    b: "int[] for both",
                    c: "string[] for both",
                    d: "bool[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: class Program {',
                    'Create drivers array: string[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};',
                    'Create availability array: bool[] available = {true, false, true};',
                    'Display driver status: for (int i = 0; i < drivers.Length; i++) { string status = available[i] ? "Available" : "Busy"; Console.WriteLine($"Driver {i + 1}: {drivers[i]} - {status}"); }',
                    'Test your output to show each driver with their availability status'
                ]
            },
            average: {
                question: "How do you calculate fare based on distance?",
                options: {
                    a: "Multiply distance by fare rate per kilometer",
                    b: "Use only the distance",
                    c: "Use only the fare rate",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Add passenger and distance arrays: string[] passengers = {"Maria", "Ana"}; double[] distances = {2.5, 3.0};',
                    'Use nested loops to assign passengers: for (int i = 0; i < drivers.Length && passengerIndex < passengers.Length; i++) { if (available[i]) { ... } }',
                    'Calculate fare: double fare = distance * 10; // ₱10 per km',
                    'Display result: Console.WriteLine($"Passenger: {passenger}"); Console.WriteLine($"Assigned Driver: {driver}"); Console.WriteLine($"Fare: ₱{fare:F2}");',
                    'Use string interpolation for formatted output'
                ]
            },
            difficult: {
                question: "How do you optimize driver assignments?",
                options: {
                    a: "Use algorithms to find the closest available driver",
                    b: "Use only random assignment",
                    c: "Use only the first driver",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create earnings tracking: double[] driverEarnings = {0.0, 0.0, 0.0}; int[] tripCounts = {0, 0, 0};',
                    'Find closest available driver: int bestDriverIndex = -1; double minDistance = double.MaxValue;',
                    'Use distance optimization: for (int i = 0; i < drivers.Length; i++) { if (available[i] && driverDistance < minDistance) { minDistance = driverDistance; bestDriverIndex = i; } }',
                    'Update driver earnings: driverEarnings[bestDriverIndex] += fare; tripCounts[bestDriverIndex]++;',
                    'Display performance: Console.WriteLine($"{drivers[i]}: {tripCounts[i]} trip{(tripCounts[i] != 1 ? "s" : "")}, ₱{driverEarnings[i]:F2} earned");'
                ]
            }
        },
        lvl20: {
            easy: {
                question: "What data types should you use for driver names and availability?",
                options: {
                    a: "string[] for drivers, bool[] for available",
                    b: "int[] for both",
                    c: "string[] for both",
                    d: "bool[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: class Program {',
                    'Create drivers array: string[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose"};',
                    'Create availability array: bool[] available = {true, false, true};',
                    'Display driver status: for (int i = 0; i < drivers.Length; i++) { string status = available[i] ? "Available" : "Busy"; Console.WriteLine($"Driver {i + 1}: {drivers[i]} - {status}"); }',
                    'Test your output to show each driver with their availability status'
                ]
            },
            average: {
                question: "How do you calculate fare based on distance?",
                options: {
                    a: "Multiply distance by fare rate per kilometer",
                    b: "Use only the distance",
                    c: "Use only the fare rate",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Add passenger and distance arrays: string[] passengers = {"Maria", "Ana"}; double[] distances = {2.5, 3.0};',
                    'Use nested loops to assign passengers: for (int i = 0; i < drivers.Length && passengerIndex < passengers.Length; i++) { if (available[i]) { ... } }',
                    'Calculate fare: double fare = distance * 10; // ₱10 per km',
                    'Display result: Console.WriteLine($"Passenger: {passenger}"); Console.WriteLine($"Assigned Driver: {driver}"); Console.WriteLine($"Fare: ₱{fare:F2}");',
                    'Use string interpolation for formatted output'
                ]
            },
            difficult: {
                question: "How do you optimize driver assignments?",
                options: {
                    a: "Use algorithms to find the closest available driver",
                    b: "Use only random assignment",
                    c: "Use only the first driver",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create earnings tracking: double[] driverEarnings = {0.0, 0.0, 0.0}; int[] tripCounts = {0, 0, 0};',
                    'Find closest available driver: int bestDriverIndex = -1; double minDistance = double.MaxValue;',
                    'Use distance optimization: for (int i = 0; i < drivers.Length; i++) { if (available[i] && driverDistance < minDistance) { minDistance = driverDistance; bestDriverIndex = i; } }',
                    'Update driver earnings: driverEarnings[bestDriverIndex] += fare; tripCounts[bestDriverIndex]++;',
                    'Display performance: Console.WriteLine($"{drivers[i]}: {tripCounts[i]} trip{(tripCounts[i] != 1 ? "s" : "")}, ₱{driverEarnings[i]:F2} earned");'
                ]
            }
        }
    };

    // Expose tips data globally for the shared UI and exit early to avoid duplicate handlers
    window.tipsData = tipsData;
    window.dispatchEvent(new Event('tipsDataLoaded'));
    return;
})();

