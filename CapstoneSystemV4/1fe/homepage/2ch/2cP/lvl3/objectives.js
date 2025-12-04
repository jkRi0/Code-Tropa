// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 3 - Fiesta Budget Planner (Easy) - C++",
        objectives: [
            "Create a C++ program with main function",
            "Include necessary headers (iostream)",
            "Calculate the total cost of three fixed items:\n  - Banderitas: ₱500\n  - Lechon: ₱3000\n  - Sound System: ₱2000",
            "Print the total cost using arithmetic operators and std::cout"
        ]
    },
    average: {
        title: "Level 3 - Fiesta Budget Planner (Average) - C++",
        objectives: [
            "Add optional items and apply discount logic",
            "Use variables to store item prices and quantities",
            "Apply 10% discount when total items exceed 5",
            "Calculate and display:\n  - Individual item costs\n  - Subtotal before discount\n  - Discount amount (if applicable)\n  - Final total cost",
            "Use std::cout and std::endl for output"
        ]
    },
    difficult: {
        title: "Level 3 - Fiesta Budget Planner (Difficult) - C++",
        objectives: [
            "Given a ₱5,000 budget and arrays of item names and prices, use loops and conditionals to select items",
            "Implement selection logic to maximize items within budget using arrays and loops",
            "Create a system that:\n  - Uses arrays to store item names and prices\n  - Iterates through items using loops\n  - Uses conditional statements to check if item fits budget\n  - Tracks selected items and calculates remaining budget\n  - Displays selected items and remaining budget",
            "Use arrays, loops, and conditional statements to optimize selection"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Fiesta Budget Calculator
=======================
Banderitas: ₱500
Lechon: ₱3,000
Sound System: ₱2,000
=======================
Total Cost: ₱5,500`,
    
    average: `
// Expected output:
Fiesta Budget Calculator
=======================
Banderitas: ₱500
Lechon: ₱3,000
Sound System: ₱2,000
Balloons: ₱300
Candles: ₱200
Subtotal: ₱6,000
Discount (10%): ₱600
=======================
Final Total: ₱5,400`,
    
    difficult: `
// Expected output:
Fiesta Budget Optimizer (₱5,000 Budget)
=====================================
Available Items:
1. Banderitas - ₱500
2. Lechon - ₱3,000
3. Sound System - ₱2,000
4. Balloons - ₱300
5. Candles - ₱200

Selected Items:
- Balloons: ₱300
- Candles: ₱200
- Banderitas: ₱500
- Sound System: ₱2,000
Total Selected: ₱3,000
Remaining Budget: ₱2,000
`
};

// Use namespace to avoid conflicts
window.displayObjectives = window.displayObjectives || function(difficulty) {
    const selectedData = localStorage.getItem('selectedChallenge');
    const data = JSON.parse(selectedData);
    const objectivesContainer = document.querySelector('.objectives-container');
    const difficultyData = window.objectivesData[difficulty.toLowerCase()];

    if (difficultyData) {
        const content = `
                <h3>${difficultyData.title}</h3>
                <ul>
                    ${difficultyData.objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
                <div class="example-output">
                    <pre>${window.examples[difficulty.toLowerCase()]}</pre>
                </div>
            `;
        objectivesContainer.innerHTML = content;
    }
};

// Initialize objectives based on selected difficulty
(function() {
    const selectedData = localStorage.getItem('selectedChallenge');
    const data = JSON.parse(selectedData);
    window.displayObjectives(data.difficulty);
})();