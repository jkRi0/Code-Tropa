document.addEventListener('DOMContentLoaded', function() {
    const objectivesData = {
        easy: {
            title: "Level 1 - Taho Time! (Easy)",
            objectives: [
                "Create a Java class named 'TahoVendor'",
                "Add a main method to start your program",
                "Print 'Tahooo!' as the vendor's call",
                "Print a simple price list with two items:\n  - Regular Taho: ₱20\n  - Large Taho: ₱25"
            ]
        },
        average: {
            title: "Level 1 - Taho Time! (Average)",
            objectives: [
                "Create a formatted price menu using tabs and newlines",
                "Add single-line comments (//) to explain the vendor's call",
                "Add a multi-line comment (/* */) to describe the Filipino taho tradition",
                "Print a complete menu with prices and sizes using proper spacing"
            ]
        },
        difficult: {
            title: "Level 1 - Taho Time! (Difficult)",
            objectives: [
                "Fix the syntax errors in the provided code:",
                "- Missing quotation marks in print statements",
                "- Incorrect semicolon placement",
                "- Improper string concatenation",
                "Create a well-formatted receipt-style output with:\n  - Store name\n  - Price list\n  - Total amount\n  - Thank you message"
            ]
        }
    };

    // Example solutions to show in comments
    const examples = {
        easy: `
// Expected output:
Tahooo!
Regular Taho: ₱20
Large Taho: ₱25`,
        
        average: `
// Expected output:
================
   TAHO MENU
================
Regular Taho    ₱20
Large Taho      ₱25
Extra Syrup     ₱5
================`,
        
        difficult: `
// Expected output:
MANILA TAHO STORE
=====================
Menu:
1. Regular Taho    ₱20
2. Large Taho      ₱25
3. Extra Syrup     ₱5
=====================
Salamat po! 
`
    };

    const selectedData = localStorage.getItem('selectedChallenge');
    const data = JSON.parse(selectedData);

    function displayObjectives(difficulty) {
        const objectivesContainer = document.querySelector('.objectives-container');
        const difficultyData = objectivesData[difficulty.toLowerCase()];

        if (difficultyData) {
            const content = `
                <h3>${difficultyData.title}</h3>
                <ul>
                    ${difficultyData.objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
                <div class="example-output">
                    <pre>${examples[difficulty.toLowerCase()]}</pre>
                </div>
            `;
            objectivesContainer.innerHTML = content;
        }
    }

    // Initialize objectives based on selected difficulty
    displayObjectives(data.difficulty);

    // Export function for use in other scripts
    window.displayObjectives = displayObjectives;
});