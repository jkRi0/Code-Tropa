// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 1 - Taho Time! (Easy) - C++",
        objectives: [
            "Create a C++ program with main function",
            "Include necessary headers (iostream)",
            "Print 'Tahooo!' as the vendor's call",
            "Print a simple price list with two items:\n  - Taho: ₱15\n  - Syrup: ₱5"
        ]
    },
    average: {
        title: "Level 1 - Taho Time! (Average) - C++",
        objectives: [
            "Declare variables to store prices: int tahoPrice = 15 and int syrupPrice = 5",
            "Calculate the total price by adding tahoPrice and syrupPrice",
            "Format the output with proper spacing and menu structure",
            "Print the vendor's call, menu items with prices, and the calculated total",
            "Add comments explaining your code",
            "Use std::cout and std::endl for output"
        ]
    },
    difficult: {
        title: "Level 1 - Taho Time! (Difficult) - C++",
        objectives: [
            "Declare variables for at least 3 menu items with their prices:\n  - Taho: ₱15\n  - Syrup: ₱5\n  - Extra Taho: ₱10",
            "Declare quantity variables for each item (e.g., int tahoQty = 2, int syrupQty = 1, int extraTahoQty = 1)",
            "Calculate subtotals for each item (price × quantity)",
            "Calculate the grand total by adding all subtotals",
            "Display a formatted receipt showing:\n  - Vendor's call\n  - Itemized list with quantities and subtotals\n  - Grand total",
            "Use proper string concatenation and formatting for professional output",
            "Add comments explaining your code"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Tahooo!
Taho: ₱15
Syrup: ₱5`,
    
    average: `
// Expected output:
================
   TAHO MENU
================
Taho:     ₱15
Syrup:    ₱5
================
Total:    ₱20
================`,
    
    difficult: `
// Expected output:
Tahooo!
====================
   TAHO ORDER
====================
Taho (x2):      ₱30
Syrup (x1):     ₱5
Extra Taho (x1): ₱10
====================
Grand Total:    ₱45
====================
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
})();// objectives for level 1 - C++