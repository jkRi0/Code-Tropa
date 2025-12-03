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
                question: "What is the primary purpose of the 'main' method in a Java program?",
                options: {
                    a: "To declare global variables",
                    b: "To define a class constructor",
                    c: "To serve as the entry point for program execution",
                    d: "To handle exceptions"
                },
                correctAnswer: "c",
                tips: [
                    "Start your class with: `public class TahoVendor {`",
                    "Add the main method: `public static void main(String[] args) {`",
                    "Print the vendor call: `System.out.println(\"Tahooo!\");`",
                    "Print the price list: `System.out.println(\"Taho: ₱15\");` and `System.out.println(\"Syrup: ₱5\");`",
                    "Close the main method with `}` and the class with `}`"
                ]
            },
            average: {
                question: "Which of the following is the correct way to add a single-line comment in Java?",
                options: {
                    a: "/* This is a comment */",
                    b: "// This is a comment",
                    c: "# This is a comment",
                    d: "--This is a comment"
                },
                correctAnswer: "b",
                tips: [
                    "Add single-line comments with `//` before each line of code",
                    "Use `\\n` for newlines: `System.out.println(\"Tahooo!\\n\");`",
                    "Use `\\t` for tabs: `System.out.println(\"\\tTaho: ₱15\");`",
                    "Add multi-line comments with `/* */` around your vendor description",
                    "Format your output with proper spacing and borders using `=` characters"
                ]
            },
            difficult: {
                question: "Which Java method is commonly used for formatted output to the console?",
                options: {
                    a: "System.out.println()",
                    b: "System.out.print()",
                    c: "System.out.format()",
                    d: "System.out.write()"
                },
                correctAnswer: "c",
                tips: [
                    "Fix the missing quotes: `System.out.println(\"Tahooo!\");`",
                    "Fix string concatenation: `System.out.println(\"Total: \" + (15 + 5) + \"₱\");`",
                    "Use parentheses to group the addition: `(15 + 5)` before concatenating",
                    "Check that all strings have proper opening and closing quotes",
                    "Test your output to match: Tahooo!, Taho: ₱15, Syrup: ₱5, Total: 20₱"
                ]
            }
        },
        lvl2: {
            easy: {
                question: "What data type should you use to store product names in Java?",
                options: {
                    a: "int",
                    b: "String",
                    c: "double",
                    d: "boolean"
                },
                correctAnswer: "b",
                tips: [
                    "Create your class: `public class SariSariStore {`",
                    "Declare String variables: `String suka = \"Vinegar\"; String itlog = \"Eggs\"; String tinapay = \"Bread\";`",
                    "Print each product: `System.out.println(suka); System.out.println(itlog); System.out.println(tinapay);`",
                    "Make sure to use double quotes around text values",
                    "Test your output to match: Vinegar, Eggs, Bread (each on new line)"
                ]
            },
            average: {
                question: "How do you calculate the total inventory value in Java?",
                options: {
                    a: "Add all prices together",
                    b: "Multiply price by quantity for each item, then sum all results",
                    c: "Count the number of items",
                    d: "Divide total by number of items"
                },
                correctAnswer: "b",
                tips: [
                    "Add price variables: `double sukaPrice = 25.50; double itlogPrice = 8.00; double tinapayPrice = 35.00;`",
                    "Add quantity variables: `int sukaStock = 50; int itlogStock = 100; int tinapayStock = 30;`",
                    "Calculate individual values: `double sukaValue = sukaPrice * sukaStock;`",
                    "Calculate total: `double totalValue = sukaValue + itlogValue + tinapayValue;`",
                    "Print formatted output with currency symbols and proper alignment"
                ]
            },
            difficult: {
                question: "What should you use to get user input for updating stock levels?",
                options: {
                    a: "System.out.println()",
                    b: "Scanner class",
                    c: "String methods",
                    d: "Math.random()"
                },
                correctAnswer: "b",
                tips: [
                    "Import Scanner: `import java.util.Scanner;`",
                    "Create Scanner object: `Scanner input = new Scanner(System.in);`",
                    "Prompt for input: `System.out.print(\"Enter new stock for Vinegar: \");`",
                    "Read input: `int newSukaStock = input.nextInt();`",
                    "Check threshold: `if (newSukaStock < 20) { System.out.println(\"⚠️ RESTOCK ALERT: Vinegar is below threshold\"); }`"
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
                    "Create your class: `public class FiestaPlanner {`",
                    "Declare cost variables: `int banderitas = 500; int lechon = 3000; int soundSystem = 2000;`",
                    "Calculate total: `int totalCost = banderitas + lechon + soundSystem;`",
                    "Print formatted output with headers and currency symbols",
                    "Test your output to show: Banderitas: ₱500, Lechon: ₱3,000, Sound System: ₱2,000, Total Cost: ₱5,500"
                ]
            },
            average: {
                question: "How do you apply a 10% discount in Java?",
                options: {
                    a: "Multiply by 0.1",
                    b: "Multiply by 0.9",
                    c: "Divide by 10",
                    d: "Add 10"
                },
                correctAnswer: "b",
                tips: [
                    "Add optional items: `int balloons = 300; int candles = 200;`",
                    "Calculate subtotal: `int subtotal = banderitas + lechon + soundSystem + balloons + candles;`",
                    "Check if discount applies: `if (totalItems > 5) { double discount = subtotal * 0.1; }`",
                    "Calculate final total: `double finalTotal = subtotal - discount;`",
                    "Display breakdown: subtotal, discount amount, and final total"
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
                    "Create arrays for items and prices: `String[] items = {\"Banderitas\", \"Lechon\", \"Sound System\", \"Balloons\", \"Candles\"};`",
                    "Sort items by price (cheapest first): use nested loops or Arrays.sort()",
                    "Use a loop to select items within budget: `while (currentTotal + itemPrice <= budget) { ... }`",
                    "Track selected items and remaining budget",
                    "Display selected items, total cost, and remaining budget"
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
                    "Create your class: `public class CurfewChecker {`",
                    "Set current time: `int currentTime = 22;` (22 = 10 PM in 24-hour format)",
                    "Use if statement: `if (currentTime > 22) { System.out.println(\"⚠️ CURFEW VIOLATION! It's past 10 PM.\"); }`",
                    "Add else for safe time: `else { System.out.println(\"✅ Still safe time.\"); }`",
                    "Test with different time values to verify your logic works"
                ]
            },
            average: {
                question: "How do you check if someone is a minor in Java?",
                options: {
                    a: "if (age > 18)",
                    b: "if (age < 18)",
                    c: "if (age == 18)",
                    d: "if (age >= 18)"
                },
                correctAnswer: "b",
                tips: [
                    "Import Scanner: `import java.util.Scanner;`",
                    "Get user input: `Scanner input = new Scanner(System.in); System.out.print(\"Enter your age: \"); int age = input.nextInt();`",
                    "Check for minor: `if (age < 18) { System.out.println(\"✅ EXEMPTION: Minors are exempt from curfew.\"); }`",
                    "Check for senior: `else if (age >= 65) { System.out.println(\"✅ EXEMPTION: Senior citizens are exempt.\"); }`",
                    "Add else for adults: `else { System.out.println(\"⚠️ CURFEW VIOLATION!\"); }`"
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
                    "Create parallel arrays: `String[] names = {\"Juan\", \"Maria\", \"Pedro\", \"Ana\"};`",
                    "Add age array: `int[] ages = {25, 16, 70, 30};`",
                    "Add reason array: `String[] reasons = {\"Work\", \"School\", \"Medical\", \"Emergency\"};`",
                    "Use for loop: `for (int i = 0; i < names.length; i++) { ... }`",
                    "Check each resident: `if (ages[i] < 18 || ages[i] >= 65 || reasons[i].equals(\"Emergency\")) { ... }`"
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
                    "Create your class: `public class BayanihanScheduler {`",
                    "Create greeting method: `public static void greetHelper(String name) { System.out.println(\"Hello, \" + name + \"! Thank you for helping with the move.\"); }`",
                    "Call the method: `greetHelper(\"Juan\"); greetHelper(\"Maria\"); greetHelper(\"Pedro\");`",
                    "Make sure to pass the name as a parameter in quotes",
                    "Test your output to show personalized greetings for each helper"
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
                    "Create role assignment method: `public static void assignRole(String name, int age) { ... }`",
                    "Check age ranges: `if (age >= 18 && age <= 40) { role = \"Lifter\"; }`",
                    "Add more conditions: `else if (age >= 25 && age <= 60) { role = \"Cook\"; }`",
                    "Add driver condition: `else if (age >= 21 && age <= 65) { role = \"Driver\"; }`",
                    "Print assignment: `System.out.println(\"Helper: \" + name + \" (\" + age + \")\"); System.out.println(\"Assigned Role: \" + role);`"
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
                    "Create tracking arrays: `boolean[] rolesAssigned = new boolean[5]; String[] assignedHelpers = new String[5];`",
                    "Check if role is available: `if (!rolesAssigned[roleIndex]) { ... }`",
                    "Assign role and mark as taken: `rolesAssigned[roleIndex] = true; assignedHelpers[roleIndex] = helperName;`",
                    "Use a loop to find next available role: `for (int i = 0; i < rolesAssigned.length; i++) { if (!rolesAssigned[i]) { ... } }`",
                    "Display final assignments and check that all roles are filled"
                ]
            }
        },
        lvl6: {
            easy: {
                question: "What data structure should you use to store 5 destinations?",
                options: {
                    a: "Single String variable",
                    b: "String array",
                    c: "int variable",
                    d: "boolean variable"
                },
                correctAnswer: "b",
                tips: [
                    "Create your class: `public class TravelPlanner {`",
                    "Create destinations array: `String[] destinations = {\"Quiapo\", \"Makati\", \"Cubao\", \"Ortigas\", \"BGC\"};`",
                    "Create distances array: `int[] distances = {0, 350, 500, 250, 400};`",
                    "Use for loop to display: `for (int i = 0; i < destinations.length; i++) { System.out.println(destinations[i] + \": \" + distances[i] + \" km\"); }`",
                    "Test your output to show all destinations with their distances"
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
                    "Create parallel arrays: `String[] destinations = {\"Quiapo\", \"Makati\", \"Cubao\", \"Ortigas\", \"BGC\"};`",
                    "Add fare array: `double[] fares = {0.0, 15.0, 25.0, 12.0, 20.0};`",
                    "Initialize total: `double totalFare = 0.0;`",
                    "Use for loop to sum: `for (int i = 0; i < destinations.length; i++) { totalFare += fares[i]; }`",
                    "Display breakdown: show each destination with its fare and the total"
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
                    "Import Scanner: `import java.util.Scanner;`",
                    "Get user input: `Scanner input = new Scanner(System.in); System.out.print(\"Enter destination: \"); String userDestination = input.nextLine();`",
                    "Search with loop: `boolean found = false; for (int i = 0; i < destinations.length; i++) { if (destinations[i].equals(userDestination)) { found = true; ... } }`",
                    "Handle found case: `if (found) { System.out.println(\"Fare to \" + userDestination + \": ₱\" + fares[i]); }`",
                    "Handle not found: `else { System.out.println(\"Destination not found!\"); }`"
                ]
            }
        },
        lvl7: {
            easy: {
                question: "What should you use to create a welcome message function?",
                options: {
                    a: "A method that returns a String",
                    b: "A variable only",
                    c: "A loop only",
                    d: "An array only"
                },
                correctAnswer: "a",
                tips: [
                    "Create your class: `public class FamilyReunion {`",
                    "Create welcome method: `public static String getWelcomeMessage(String familyName) { return \"Welcome, \" + familyName + \"! We're honored by your visit.\"; }`",
                    "Call the method: `String message = getWelcomeMessage(\"Santos\"); System.out.println(message);`",
                    "Add multiple families: `getWelcomeMessage(\"Garcia\"); getWelcomeMessage(\"Reyes\");`",
                    "Test your output to show personalized welcome messages for each family"
                ]
            },
            average: {
                question: "How do you assign different gift tasks to participants?",
                options: {
                    a: "Use methods with parameters to assign specific gifts",
                    b: "Use only loops",
                    c: "Use only constants",
                    d: "Use only arrays"
                },
                correctAnswer: "a",
                tips: [
                    "Create gift assignment method: `public static void assignGift(String participant, String gift) { System.out.println(participant + \" assigned to: \" + gift); }`",
                    "Call with different participants: `assignGift(\"Tita Maria\", \"Lechon\"); assignGift(\"Kuya Juan\", \"Drinks\");`",
                    "Add more assignments: `assignGift(\"Ate Ana\", \"Dessert\"); assignGift(\"Tito Pedro\", \"Decorations\");`",
                    "Create a method to display all assignments",
                    "Test your output to show each participant with their assigned gift"
                ]
            },
            difficult: {
                question: "How do you ensure all required gifts are present?",
                options: {
                    a: "Use arrays to track required gifts and validate assignments",
                    b: "Ignore the requirement",
                    c: "Use random assignment",
                    d: "Use only one gift type"
                },
                correctAnswer: "a",
                tips: [
                    "Create required gifts array: `String[] requiredGifts = {\"Lechon\", \"Drinks\", \"Dessert\", \"Decorations\", \"Music\"};`",
                    "Create tracking array: `boolean[] assignedGifts = new boolean[requiredGifts.length];`",
                    "Mark assigned gifts: `assignedGifts[0] = true; assignedGifts[1] = true;` (when gifts are assigned)",
                    "Check for missing: `for (int i = 0; i < requiredGifts.length; i++) { if (!assignedGifts[i]) { System.out.println(\"Missing: \" + requiredGifts[i]); } }`",
                    "Display final status: show which gifts are assigned and which are missing"
                ]
            }
        },
        lvl8: {
            easy: {
                question: "What should you use to print a sequence of 3 predefined moves?",
                options: {
                    a: "A for loop with an array of moves",
                    b: "Three separate print statements",
                    c: "A while loop only",
                    d: "A switch statement only"
                },
                correctAnswer: "a",
                tips: [
                    "Create your class: `public class AdventureGame {`",
                    'Create moves array: `String[] moves = {"straight", "left", "right"};`',
                    'Use for loop: `for (int i = 0; i < moves.length; i++) { System.out.println("Move " + (i+1) + ": " + moves[i]); }`',
                    'Add move descriptions: `System.out.println("Going " + moves[i] + "...");`',
                    "Test your output to show: Move 1: straight, Move 2: left, Move 3: right"
                ]
            },
            average: {
                question: "How do you generate random moves in Java?",
                options: {
                    a: "Use Math.random() to generate random indices",
                    b: "Use only fixed moves",
                    c: "Use only loops",
                    d: "Use only constants"
                },
                correctAnswer: "a",
                tips: [
                    'Create moves array: `String[] moves = {"straight", "left", "right", "back", "jump"};`',
                    'Generate random index: `int randomIndex = (int)(Math.random() * moves.length);`',
                    "Get random move: `String randomMove = moves[randomIndex];`",
                    'Display result: `System.out.println("Random move: " + randomMove);`',
                    "Add multiple random moves in a loop to test randomness"
                ]
            },
            difficult: {
                question: "How do you track health and end the game when health reaches 0?",
                options: {
                    a: "Use a health variable and check it in a loop condition",
                    b: "Ignore health tracking",
                    c: "Use only arrays",
                    d: "Use only methods"
                },
                correctAnswer: "a",
                tips: [
                    "Initialize health: `int health = 100;`",
                    "Create game loop: `while (health > 0) { ... }`",
                    'Check health condition: `if (health <= 0) { System.out.println("Game Over!"); break; }`',
                    "Decrease health for wrong moves: `health -= 20;`",
                    'Display current health: `System.out.println("Health: " + health + "/100");`'
                ]
            }
        },
        lvl9: {
            easy: {
                question: "What String method converts text to uppercase?",
                options: {
                    a: "toUpperCase()",
                    b: "toLowerCase()",
                    c: "length()",
                    d: "charAt()"
                },
                correctAnswer: "a",
                tips: [
                    "Create your class: `public class SloganMaker {`",
                    'Create slogan variable: `String slogan = "Mabuhay ang Fiesta!";`',
                    "Convert to uppercase: `String upperSlogan = slogan.toUpperCase();`",
                    'Display result: `System.out.println("Original: " + slogan); System.out.println("Uppercase: " + upperSlogan);`',
                    "Test with different slogans to verify the conversion works"
                ]
            },
            average: {
                question: "How do you count words in a slogan?",
                options: {
                    a: "Split by spaces and count the array length",
                    b: "Use only length() method",
                    c: "Use only charAt() method",
                    d: "Use only toUpperCase() method"
                },
                correctAnswer: "a",
                tips: [
                    'Create slogan: `String slogan = "Mabuhay ang Fiesta!";`',
                    'Split by spaces: `String[] words = slogan.split(" ");`',
                    "Count words: `int wordCount = words.length;`",
                    'Display each word: `for (int i = 0; i < words.length; i++) { System.out.println("Word " + (i+1) + ": " + words[i]); }`',
                    'Show total count: `System.out.println("Total words: " + wordCount);`'
                ]
            },
            difficult: {
                question: "How do you filter out inappropriate words from slogans?",
                options: {
                    a: "Use arrays to store inappropriate words and check against them",
                    b: "Ignore the requirement",
                    c: "Use only random filtering",
                    d: "Use only length checking"
                },
                correctAnswer: "a",
                tips: [
                    'Create inappropriate words array: `String[] inappropriateWords = {"bad", "ugly", "hate"};`',
                    "Get user input: `Scanner input = new Scanner(System.in); String userSlogan = input.nextLine();`",
                    "Check each word: `for (int i = 0; i < inappropriateWords.length; i++) { if (userSlogan.toLowerCase().contains(inappropriateWords[i])) { ... } }`",
                    'Handle inappropriate content: `System.out.println("Inappropriate word detected: " + inappropriateWords[i]);`',
                    'Allow clean slogans: `System.out.println("Slogan approved: " + userSlogan);`'
                ]
            }
        },
        lvl10: {
            easy: {
                question: "What data types should you use for player names and scores?",
                options: {
                    a: "String[] for names, int[] for scores",
                    b: "int[] for both",
                    c: "String[] for both",
                    d: "double[] for both"
                },
                correctAnswer: "a",
                tips: [
                    "Create your class: `public class GameLeaderboard {`",
                    "Create names array: `String[] playerNames = {\"Juan\", \"Maria\", \"Pedro\", \"Ana\", \"Luis\"};`",
                    "Create scores array: `int[] scores = {85, 92, 78, 95, 88};`",
                    "Display players: `for (int i = 0; i < playerNames.length; i++) { System.out.println(playerNames[i] + \": \" + scores[i] + \" points\"); }`",
                    "Test your output to show each player with their score"
                ]
            },
            average: {
                question: "How do you sort players by score in descending order?",
                options: {
                    a: "Use Arrays.sort() with a custom comparator",
                    b: "Use only loops",
                    c: "Use only if statements",
                    d: "Use only variables"
                },
                correctAnswer: "a",
                tips: [
                    "Initialize max variables: `int maxScore = scores[0]; int winnerIndex = 0;`",
                    "Find highest score: `for (int i = 1; i < scores.length; i++) { if (scores[i] > maxScore) { maxScore = scores[i]; winnerIndex = i; } }`",
                    "Display winner: `System.out.println(\"Winner: \" + playerNames[winnerIndex] + \" with \" + maxScore + \" points!\");`",
                    "Calculate average: `int total = 0; for (int score : scores) { total += score; } double average = (double) total / scores.length;`",
                    "Show statistics: winner, highest score, and average score"
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
                    "Implement bubble sort: `for (int i = 0; i < scores.length - 1; i++) { for (int j = 0; j < scores.length - i - 1; j++) { if (scores[j] < scores[j + 1]) { ... } } }`",
                    "Swap scores: `int tempScore = scores[j]; scores[j] = scores[j + 1]; scores[j + 1] = tempScore;`",
                    "Swap names: `String tempName = playerNames[j]; playerNames[j] = playerNames[j + 1]; playerNames[j + 1] = tempName;`",
                    "Display sorted leaderboard: `for (int i = 0; i < playerNames.length; i++) { System.out.println((i+1) + \". \" + playerNames[i] + \": \" + scores[i]); }`",
                    "Test with different score combinations to verify sorting works"
                ]
            }
        },
        lvl11: {
            easy: {
                question: "What data types should you use for barangay names and populations?",
                options: {
                    a: "String[] for names, int[] for populations",
                    b: "int[] for both",
                    c: "String[] for both",
                    d: "double[] for both"
                },
                correctAnswer: "a",
                tips: [
                    "Create your class: `public class BarangayCensus {`",
                    "Create barangay names: `String[] barangays = {\"San Jose\", \"Santa Maria\", \"San Pedro\", \"San Miguel\", \"San Antonio\"};`",
                    "Create populations: `int[] populations = {15000, 22000, 18500, 12000, 28000};`",
                    "Display data: `for (int i = 0; i < barangays.length; i++) { System.out.println(barangays[i] + \": \" + populations[i] + \" residents\"); }`",
                    "Test your output to show each barangay with its population"
                ]
            },
            average: {
                question: "How do you calculate the average population?",
                options: {
                    a: "Sum all populations and divide by number of barangays",
                    b: "Use only the first population",
                    c: "Use only the last population",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    "Initialize total: `int totalPopulation = 0;`",
                    "Sum all populations: `for (int i = 0; i < populations.length; i++) { totalPopulation += populations[i]; }`",
                    "Calculate average: `double averagePopulation = (double) totalPopulation / populations.length;`",
                    "Find largest: `int maxPop = populations[0]; int largestIndex = 0; for (int i = 1; i < populations.length; i++) { if (populations[i] > maxPop) { maxPop = populations[i]; largestIndex = i; } }`",
                    "Display results: total population, average, and largest barangay"
                ]
            },
            difficult: {
                question: "How do you find the barangay with the highest population?",
                options: {
                    a: "Use a loop to find the maximum value and its index",
                    b: "Use only the first value",
                    c: "Use only random selection",
                    d: "Use only arrays"
                },
                correctAnswer: "a",
                tips: [
                    "Import Scanner: `import java.util.Scanner;`",
                    "Get user input: `Scanner input = new Scanner(System.in); System.out.print(\"Enter barangay name: \"); String searchName = input.nextLine();`",
                    "Search with loop: `boolean found = false; for (int i = 0; i < barangays.length; i++) { if (barangays[i].equalsIgnoreCase(searchName)) { found = true; ... } }`",
                    "Handle found case: `if (found) { System.out.println(\"Population of \" + barangays[i] + \": \" + populations[i] + \" residents\"); }`",
                    "Handle not found: `else { System.out.println(\"Barangay not found!\"); }`"
                ]
            }
        },
        lvl12: {
            easy: {
                question: "What data types should you use for days and attendance status?",
                options: {
                    a: "String[] for days, boolean[] for attended",
                    b: "int[] for both",
                    c: "String[] for both",
                    d: "boolean[] for both"
                },
                correctAnswer: "a",
                tips: [
                    "Create your class: `public class AttendanceTracker {`",
                    'Create days array: `String[] days = {"Dec 16", "Dec 17", "Dec 18", "Dec 19", "Dec 20"};`',
                    "Create attendance array: `boolean[] attended = {true, false, true, true, false};`",
                    'Display attendance: `for (int i = 0; i < days.length; i++) { System.out.println(days[i] + ": " + (attended[i] ? "Present" : "Absent")); }`',
                    "Test your output to show each day with attendance status"
                ]
            },
            average: {
                question: "How do you calculate completion percentage?",
                options: {
                    a: "Count true values, divide by total, multiply by 100",
                    b: "Use only the first value",
                    c: "Use only loops",
                    d: "Use only arrays"
                },
                correctAnswer: "a",
                tips: [
                    "Initialize counter: `int attendedCount = 0;`",
                    "Count attended days: `for (int i = 0; i < attended.length; i++) { if (attended[i]) { attendedCount++; } }`",
                    "Calculate percentage: `double percentage = (double) attendedCount / attended.length * 100;`",
                    'Display results: `System.out.println("Days attended: " + attendedCount + "/" + attended.length); System.out.println("Completion: " + String.format("%.1f", percentage) + "%");`',
                    'Add status message: if percentage >= 80, show "Excellent attendance!"'
                ]
            },
            difficult: {
                question: "How do you track consecutive attendance streaks?",
                options: {
                    a: "Use loops to count consecutive true values",
                    b: "Use only the first value",
                    c: "Use only random counting",
                    d: "Use only arrays"
                },
                correctAnswer: "a",
                tips: [
                    "Initialize streak variables: `int currentStreak = 0; int longestStreak = 0;`",
                    "Track consecutive attendance: `for (int i = 0; i < attended.length; i++) { if (attended[i]) { currentStreak++; longestStreak = Math.max(longestStreak, currentStreak); } else { currentStreak = 0; } }`",
                    'Display streak info: `System.out.println("Current streak: " + currentStreak + " days"); System.out.println("Longest streak: " + longestStreak + " days");`',
                    'Add streak rewards: if longestStreak >= 5, show "Streak Master!"',
                    "Show attendance pattern: highlight consecutive present/absent days"
                ]
            }
        },
        lvl13: {
            easy: {
                question: "What data types should you use for dish names and prices?",
                options: {
                    a: "String[] for dishes, double[] for prices",
                    b: "int[] for both",
                    c: "String[] for both",
                    d: "boolean[] for both"
                },
                correctAnswer: "a",
                tips: [
                    "Create your class: `public class RestaurantMenu {`",
                    "Create dishes array: `String[] dishes = {\"Adobo\", \"Sinigang\", \"Kare-Kare\", \"Lechon\", \"Pancit\"};`",
                    "Create prices array: `double[] prices = {150.0, 180.0, 220.0, 500.0, 120.0};`",
                    "Display menu: `for (int i = 0; i < dishes.length; i++) { System.out.println(dishes[i] + \": ₱\" + prices[i]); }`",
                    "Test your output to show each dish with its price"
                ]
            },
            average: {
                question: "How do you apply a 10% family discount?",
                options: {
                    a: "Multiply total by 0.9",
                    b: "Multiply total by 0.1",
                    c: "Divide total by 10",
                    d: "Add 10 to total"
                },
                correctAnswer: "a",
                tips: [
                    "Apply family discount: `for (int i = 0; i < prices.length; i++) { double discountedPrice = prices[i] * 0.9; }`",
                    "Display discounted prices: `System.out.println(dishes[i] + \" (Family): ₱\" + String.format(\"%.2f\", discountedPrice));`",
                    "Calculate savings: `double savings = prices[i] - discountedPrice; System.out.println(\"You save: ₱\" + String.format(\"%.2f\", savings));`",
                    "Show both original and discounted prices for comparison",
                    "Add family discount header to clearly indicate the special pricing"
                ]
            },
            difficult: {
                question: "How do you generate personalized menu recommendations?",
                options: {
                    a: "Use arrays and logic to suggest dishes based on preferences",
                    b: "Use only random selection",
                    c: "Use only the first dish",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    "Find most expensive: `double maxPrice = prices[0]; int expensiveIndex = 0; for (int i = 1; i < prices.length; i++) { if (prices[i] > maxPrice) { maxPrice = prices[i]; expensiveIndex = i; } }`",
                    "Find cheapest: `double minPrice = prices[0]; int cheapIndex = 0; for (int i = 1; i < prices.length; i++) { if (prices[i] < minPrice) { minPrice = prices[i]; cheapIndex = i; } }`",
                    "Display results: `System.out.println(\"Most expensive: \" + dishes[expensiveIndex] + \" - ₱\" + maxPrice);`",
                    "Show cheapest: `System.out.println(\"Most affordable: \" + dishes[cheapIndex] + \" - ₱\" + minPrice);`",
                    "Calculate price range: `double priceRange = maxPrice - minPrice; System.out.println(\"Price range: ₱\" + priceRange);`"
                ]
            }
        },
        lvl14: {
            easy: {
                question: "What data types should you use for names and their lengths?",
                options: {
                    a: "String[] for names, int[] for lengths",
                    b: "int[] for both",
                    c: "String[] for both",
                    d: "boolean[] for both"
                },
                correctAnswer: "a",
                tips: [
                    "Create your class: `public class NameAnalyzer {`",
                    "Create names array: `String[] names = {\"Maria\", \"Jose\", \"Ana\", \"Pedro\", \"Isabella\"};`",
                    "Calculate lengths: `int[] lengths = new int[names.length]; for (int i = 0; i < names.length; i++) { lengths[i] = names[i].length(); }`",
                    "Display results: `for (int i = 0; i < names.length; i++) { System.out.println(names[i] + \": \" + lengths[i] + \" letters\"); }`",
                    "Test your output to show each name with its character count"
                ]
            },
            average: {
                question: "How do you count vowels in a name?",
                options: {
                    a: "Loop through each character and check if it's a vowel",
                    b: "Use only the first character",
                    c: "Use only random counting",
                    d: "Use only arrays"
                },
                correctAnswer: "a",
                tips: [
                    "Create vowel counting method: `public static int countVowels(String name) { int vowelCount = 0; ... }`",
                    "Loop through characters: `for (int i = 0; i < name.length(); i++) { char c = Character.toLowerCase(name.charAt(i)); }`",
                    "Check for vowels: `if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') { vowelCount++; }`",
                    'Display results: `System.out.println(name + " has " + vowelCount + " vowels");`',
                    "Test with different names to verify vowel counting works correctly"
                ]
            },
            difficult: {
                question: "How do you identify common Filipino name patterns?",
                options: {
                    a: "Use arrays to store common patterns and check against them",
                    b: "Use only random checking",
                    c: "Use only the first name",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create common patterns array: `String[] commonPatterns = {"Maria", "Jose", "Ana", "Pedro", "Isabella"};`',
                    "Check for patterns: `for (int i = 0; i < names.length; i++) { for (int j = 0; j < commonPatterns.length; j++) { if (names[i].contains(commonPatterns[j])) { ... } } }`",
                    'Identify patterns: `System.out.println(names[i] + " contains common pattern: " + commonPatterns[j]);`',
                    "Count pattern matches: `int patternCount = 0; if (names[i].contains(commonPatterns[j])) { patternCount++; }`",
                    "Display pattern analysis: show which names follow common Filipino naming patterns"
                ]
            }
        },
        lvl15: {
            easy: {
                question: "What data types should you use for driver names and availability?",
                options: {
                    a: "String[] for drivers, boolean[] for available",
                    b: "int[] for both",
                    c: "String[] for both",
                    d: "boolean[] for both"
                },
                correctAnswer: "a",
                tips: [
                    "Create your class: `public class JeepneyDispatch {`",
                    'Create drivers array: `String[] drivers = {"Mang Juan", "Mang Pedro", "Mang Jose", "Mang Carlos", "Mang Miguel"};`',
                    "Create availability array: `boolean[] available = {true, false, true, true, false};`",
                    'Display driver status: `for (int i = 0; i < drivers.length; i++) { System.out.println(drivers[i] + ": " + (available[i] ? "Available" : "Busy")); }`',
                    "Test your output to show each driver with their availability status"
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
                    "Set fare rate: `double fareRate = 10.0; // ₱10 per kilometer`",
                    'Get distance input: `Scanner input = new Scanner(System.in); System.out.print("Enter distance (km): "); double distance = input.nextDouble();`',
                    "Calculate fare: `double fare = distance * fareRate;`",
                    'Display result: `System.out.println("Distance: " + distance + " km"); System.out.println("Fare: ₱" + String.format("%.2f", fare));`',
                    'Add minimum fare: `if (fare < 12.0) { fare = 12.0; System.out.println("Minimum fare applied: ₱12.00"); }`'
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
                    "Create distance array: `double[] distances = {2.5, 1.8, 3.2, 0.9, 4.1}; // km from passenger`",
                    "Find closest available: `double minDistance = Double.MAX_VALUE; int closestDriver = -1; for (int i = 0; i < drivers.length; i++) { if (available[i] && distances[i] < minDistance) { minDistance = distances[i]; closestDriver = i; } }`",
                    'Display assignment: `if (closestDriver != -1) { System.out.println("Assigned: " + drivers[closestDriver] + " (Distance: " + minDistance + " km)"); }`',
                    'Handle no available drivers: `else { System.out.println("No drivers available at the moment."); }`',
                    "Update availability: `available[closestDriver] = false;` after assignment"
                ]
            }
        },
        lvl16: {
            easy: {
                question: "What data types should you use for potion names and effects?",
                options: {
                    a: "String[] for potions, String[] for effects",
                    b: "int[] for both",
                    c: "boolean[] for both",
                    d: "double[] for both"
                },
                correctAnswer: "a",
                tips: [
                    "Create your class: `public class HerbalPotionShop {`",
                    'Create potions array: `String[] potions = {"Sampaguita Tea", "Ginger Root", "Turmeric Mix", "Lagundi Syrup", "Ampalaya Extract"};`',
                    'Create effects array: `String[] effects = {"Calming effect", "Digestive aid", "Anti-inflammatory", "Cough relief", "Blood sugar control"};`',
                    'Display potions: `for (int i = 0; i < potions.length; i++) { System.out.println(potions[i] + ": " + effects[i]); }`',
                    "Test your output to show each potion with its effect"
                ]
            },
            average: {
                question: "How do you calculate success rates for potions?",
                options: {
                    a: "Divide successful uses by total uses, multiply by 100",
                    b: "Use only the first value",
                    c: "Use only random calculation",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    "Create success tracking: `int[] successfulUses = {45, 38, 52, 41, 35}; int[] totalUses = {50, 45, 60, 48, 40};`",
                    "Calculate success rates: `for (int i = 0; i < potions.length; i++) { double successRate = (double) successfulUses[i] / totalUses[i] * 100; }`",
                    'Display rates: `System.out.println(potions[i] + ": " + String.format("%.1f", successRate) + "% success rate");`',
                    "Find most effective: `double maxRate = 0; int bestPotion = 0; if (successRate > maxRate) { maxRate = successRate; bestPotion = i; }`",
                    'Show best potion: `System.out.println("Most effective: " + potions[bestPotion] + " (" + String.format("%.1f", maxRate) + "%)");`'
                ]
            },
            difficult: {
                question: "How do you generate potion recommendations?",
                options: {
                    a: "Use arrays and logic to suggest potions based on effectiveness",
                    b: "Use only random selection",
                    c: "Use only the first potion",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create symptom mapping: `String[] symptoms = {"anxiety", "digestion", "inflammation", "cough", "diabetes"};`',
                    'Get user input: `Scanner input = new Scanner(System.in); System.out.print("Enter your symptom: "); String userSymptom = input.nextLine().toLowerCase();`',
                    'Find matching potion: `for (int i = 0; i < symptoms.length; i++) { if (symptoms[i].equals(userSymptom)) { System.out.println("Recommended: " + potions[i] + " - " + effects[i]); } }`',
                    'Check success rate: `if (successRate > 80) { System.out.println("Highly recommended (High success rate)"); }`',
                    'Handle no match: `System.out.println("Please consult with a herbalist for your specific condition.");`'
                ]
                
            }
        },
        lvl17: {
            easy: {
                question: "What data types should you use for team names and medal counts?",
                options: {
                    a: "String[] for teams, int[] for medals",
                    b: "int[] for both",
                    c: "String[] for both",
                    d: "boolean[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: `public class BarangayOlympics {`',
                    'Create teams array: `String[] teams = {\"San Jose\", \"Santa Maria\", \"San Pedro\", \"San Miguel\", \"San Antonio\"};`',
                    'Create medals array: `int[] medals = {5, 7, 4, 6, 8};`',
                    'Display standings: `for (int i = 0; i < teams.length; i++) { System.out.println(teams[i] + \": \" + medals[i] + \" medals\"); }`',
                    'Test your output to show each team with their medal count'
                ]
            },
            average: {
                question: "How do you determine the winning team?",
                options: {
                    a: "Find the team with the highest medal count",
                    b: "Use only the first team",
                    c: "Use only random selection",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Find winning team: `int maxMedals = medals[0]; int winnerIndex = 0; for (int i = 1; i < medals.length; i++) { if (medals[i] > maxMedals) { maxMedals = medals[i]; winnerIndex = i; } }`',
                    'Display winner: `System.out.println(\"WINNER: \" + teams[winnerIndex] + \" with \" + maxMedals + \" medals!\");`',
                    'Calculate total medals: `int totalMedals = 0; for (int medal : medals) { totalMedals += medal; }`',
                    'Show statistics: `System.out.println(\"Total medals awarded: \" + totalMedals);`',
                    'Add podium display: show top 3 teams with their medal counts'
                ]
            },
            difficult: {
                question: "How do you implement weighted scoring for different medal types?",
                options: {
                    a: "Use separate arrays for gold, silver, bronze and calculate weighted scores",
                    b: "Use only total medals",
                    c: "Use only random scoring",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create medal type arrays: `int[] gold = {2, 3, 1, 2, 4}; int[] silver = {2, 1, 3, 2, 2}; int[] bronze = {1, 3, 0, 2, 2};`',
                    'Calculate weighted scores: `int[] scores = new int[teams.length]; for (int i = 0; i < teams.length; i++) { scores[i] = gold[i]*3 + silver[i]*2 + bronze[i]*1; }`',
                    'Display detailed results: `System.out.println(teams[i] + \": \" + gold[i] + \"G \" + silver[i] + \"S \" + bronze[i] + \"B = \" + scores[i] + \" points\");`',
                    'Find overall winner: `int maxScore = scores[0]; int overallWinner = 0; for (int i = 1; i < scores.length; i++) { if (scores[i] > maxScore) { maxScore = scores[i]; overallWinner = i; } }`',
                    'Show weighted champion: `System.out.println(\"WEIGHTED CHAMPION: \" + teams[overallWinner] + \" with \" + maxScore + \" points!\");`'
                ]
            }
        },
        lvl18: {
            easy: {
                question: "What data types should you use for contestant names and scores?",
                options: {
                    a: "String[] for contestants, double[] for scores",
                    b: "int[] for both",
                    c: "String[] for both",
                    d: "boolean[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: `public class BeautyPageant {`',
                    'Create contestants array: `String[] contestants = {\"Maria Santos\", \"Ana Garcia\", \"Sofia Rodriguez\", \"Isabella Cruz\", \"Gabriela Reyes\"};`',
                    'Create scores array: `double[] scores = {85.5, 92.0, 88.5, 90.0, 87.5};`',
                    'Display contestants: `for (int i = 0; i < contestants.length; i++) { System.out.println(contestants[i] + \": \" + scores[i] + \" points\"); }`',
                    'Test your output to show each contestant with their score'
                ]
            },
            average: {
                question: "How do you calculate average scores for each contestant?",
                options: {
                    a: "Sum all scores and divide by number of judges",
                    b: "Use only the first score",
                    c: "Use only random calculation",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create judge scores: `double[][] judgeScores = {{85.5, 90.0, 88.0}, {92.0, 89.5, 91.0}, {88.5, 87.0, 90.5}};`',
                    'Calculate averages: `for (int i = 0; i < contestants.length; i++) { double total = 0; for (int j = 0; j < judgeScores[i].length; j++) { total += judgeScores[i][j]; } double average = total / judgeScores[i].length; }`',
                    'Display results: `System.out.println(contestants[i] + \": \" + String.format(\"%.2f\", average) + \" average\");`',
                    'Find winner: `double maxAverage = 0; int winnerIndex = 0; if (average > maxAverage) { maxAverage = average; winnerIndex = i; }`',
                    'Show winner: `System.out.println(\"👑 WINNER: \" + contestants[winnerIndex] + \" with \" + String.format(\"%.2f\", maxAverage) + \" points!\");`'
                ]
            },
            difficult: {
                question: "How do you implement weighted scoring for different categories?",
                options: {
                    a: "Use separate arrays for each category and apply weights",
                    b: "Use only total scores",
                    c: "Use only random weighting",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create category arrays: `double[] talent = {90.0, 95.0, 85.0, 88.0, 92.0}; double[] beauty = {80.0, 90.0, 95.0, 87.0, 89.0}; double[] intelligence = {85.0, 90.0, 87.0, 91.0, 88.0};`',
                    'Calculate weighted scores: `double[] weightedScores = new double[contestants.length]; for (int i = 0; i < contestants.length; i++) { weightedScores[i] = talent[i]*0.4 + beauty[i]*0.3 + intelligence[i]*0.3; }`',
                    'Display detailed scores: `System.out.println(contestants[i] + \": Talent(\" + talent[i] + \") Beauty(\" + beauty[i] + \") Intelligence(\" + intelligence[i] + \") = \" + String.format(\"%.2f\", weightedScores[i]));`',
                    'Find overall winner: `double maxWeighted = 0; int overallWinner = 0; for (int i = 0; i < weightedScores.length; i++) { if (weightedScores[i] > maxWeighted) { maxWeighted = weightedScores[i]; overallWinner = i; } }`',
                    'Show weighted champion: `System.out.println(\"👑 WEIGHTED CHAMPION: \" + contestants[overallWinner] + \" with \" + String.format(\"%.2f\", maxWeighted) + \" points!\");`'
                ]
            }
        },
        lvl19: {
            easy: {
                question: "What data types should you use for alert locations and threat levels?",
                options: {
                    a: "String[] for locations, int[] for threatLevels",
                    b: "int[] for both",
                    c: "String[] for both",
                    d: "boolean[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: `public class EmergencyAlertSystem {`',
                    'Create locations array: `String[] locations = {\"San Jose\", \"Santa Maria\", \"San Pedro\", \"San Miguel\", \"San Antonio\"};`',
                    'Create threat levels: `int[] threatLevels = {2, 5, 3, 1, 4};`',
                    'Display alerts: `for (int i = 0; i < locations.length; i++) { System.out.println(locations[i] + \": Threat Level \" + threatLevels[i]); }`',
                    'Test your output to show each location with its threat level'
                ]
            },
            average: {
                question: "How do you categorize alerts by threat level?",
                options: {
                    a: "Use if-else statements to check threat level ranges",
                    b: "Use only the first value",
                    c: "Use only random categorization",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Categorize threats: `for (int i = 0; i < locations.length; i++) { String category; if (threatLevels[i] <= 2) { category = \"Low\"; } else if (threatLevels[i] <= 4) { category = \"Medium\"; } else { category = \"High\"; } }`',
                    'Display categories: `System.out.println(locations[i] + \": \" + category + \" Threat (Level \" + threatLevels[i] + \")\");`',
                    'Add color coding: `if (category.equals(\"High\")) { System.out.println(\"🚨 HIGH ALERT: \" + locations[i]); }`',
                    'Count by category: `int lowCount = 0, mediumCount = 0, highCount = 0;` and increment accordingly',
                    'Show summary: `System.out.println(\"Alert Summary: \" + lowCount + \" Low, \" + mediumCount + \" Medium, \" + highCount + \" High\");`'
                ]
            },
            difficult: {
                question: "How do you implement alert prioritization and evacuation plans?",
                options: {
                    a: "Use algorithms to sort by threat level and proximity, then generate evacuation routes",
                    b: "Use only random prioritization",
                    c: "Use only the first alert",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Sort by threat level: `for (int i = 0; i < threatLevels.length - 1; i++) { for (int j = 0; j < threatLevels.length - i - 1; j++) { if (threatLevels[j] < threatLevels[j + 1]) { // swap both arrays } } }`',
                    'Create evacuation zones: `String[] safeZones = {\"Evacuation Center A\", \"Evacuation Center B\", \"Evacuation Center C\"};`',
                    'Calculate distances: `double[] distances = {2.5, 1.8, 3.2, 0.9, 4.1}; // km to nearest safe zone`',
                    'Generate evacuation plans: `System.out.println(\"EVACUATION PLAN for \" + locations[i] + \":\"); System.out.println(\"Threat Level: \" + threatLevels[i]); System.out.println(\"Nearest Safe Zone: \" + safeZones[i] + \" (\" + distances[i] + \" km away)\");`',
                    'Add priority handling: `if (threatLevels[i] >= 4) { System.out.println(\"IMMEDIATE EVACUATION REQUIRED!\"); }`'
                ]
            }
        },
        lvl20: {
            easy: {
                question: "What data types should you use for route names and base fares?",
                options: {
                    a: "String[] for routes, double[] for baseFares",
                    b: "int[] for both",
                    c: "String[] for both",
                    d: "boolean[] for both"
                },
                correctAnswer: "a",
                tips: [
                    'Create your class: `public class JeepneyFareSystem {`',
                    'Create routes array: `String[] routes = {\"Quiapo to Cubao\", \"Cubao to Makati\", \"Makati to Alabang\", \"Alabang to Las Pinas\", \"Las Pinas to Paranaque\"};`',
                    'Create base fares: `double[] baseFares = {12.0, 15.0, 18.0, 20.0, 22.0};`',
                    'Display routes: `for (int i = 0; i < routes.length; i++) { System.out.println(routes[i] + \": ₱\" + baseFares[i]); }`',
                    'Test your output to show each route with its base fare'
                ]
            },
            average: {
                question: "How do you apply student/senior discounts?",
                options: {
                    a: "Multiply total fare by 0.8 for 20% discount",
                    b: "Multiply total fare by 0.2",
                    c: "Add 20 to total fare",
                    d: "Divide total fare by 20"
                },
                correctAnswer: "a",
                tips: [
                    'Get user input: `Scanner input = new Scanner(System.in); System.out.print(\"Enter route number (1-5): \"); int routeChoice = input.nextInt();`',
                    'Apply student/senior discount: `double fare = baseFares[routeChoice - 1]; double discountedFare = fare * 0.8;`',
                    'Display fare breakdown: `System.out.println(\"Route: \" + routes[routeChoice - 1]); System.out.println(\"Base fare: ₱\" + fare); System.out.println(\"Student/Senior fare: ₱\" + String.format(\"%.2f\", discountedFare));`',
                    'Calculate savings: `double savings = fare - discountedFare; System.out.println(\"You save: ₱\" + String.format(\"%.2f\", savings));`',
                    'Add validation: `if (routeChoice < 1 || routeChoice > 5) { System.out.println(\"Invalid route number!\"); }`'
                ]
            },
            difficult: {
                question: "How do you implement fare optimization and route planning?",
                options: {
                    a: "Use algorithms to find cheapest routes and calculate optimal paths",
                    b: "Use only random selection",
                    c: "Use only the first route",
                    d: "Use only loops"
                },
                correctAnswer: "a",
                tips: [
                    'Create distance matrix: `double[][] distances = {{0, 8.5, 15.2, 22.1, 28.3}, {8.5, 0, 6.7, 13.6, 19.8}, {15.2, 6.7, 0, 6.9, 13.1}};`',
                    'Implement route optimization: `for (int i = 0; i < routes.length; i++) { for (int j = i + 1; j < routes.length; j++) { double directCost = baseFares[i] + baseFares[j]; double optimizedCost = calculateOptimizedCost(i, j); } }`',
                    'Compare costs: `if (optimizedCost < directCost) { System.out.println(\"Optimized route: \" + routes[i] + \" + \" + routes[j] + \" = ₱\" + String.format(\"%.2f\", optimizedCost)); }`',
                    'Find cheapest combination: `double minCost = Double.MAX_VALUE; String bestRoute = \"\";` and track the minimum',
                    'Display recommendations: `System.out.println(\"Best route combination: \" + bestRoute + \" (₱\" + String.format(\"%.2f\", minCost) + \")\");`'
                ]
            }
        }
    };

    // Expose tips data globally for the shared UI and exit early to avoid duplicate handlers
    window.tipsData = tipsData;
    window.dispatchEvent(new Event('tipsDataLoaded'));
    return;
})();

