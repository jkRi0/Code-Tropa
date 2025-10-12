const objectivesData = {
    easy: {
        title: "Level 2 - Taho Time! (Easy) - C#",
        objectives: [
            "Create a C# program with Main method",
            "Use System namespace",
            "Print 'Tahooo!' as the vendor's call",
            "Print a simple price list with two items:\n  - Regular Taho: ₱20\n  - Large Taho: ₱25"
        ]
    },
    average: {
        title: "Level 2 - Taho Time! (Average) - C#",
        objectives: [
            "Create a formatted price menu using string formatting",
            "Add single-line comments (//) to explain the vendor's call",
            "Add a multi-line comment (/* */) to describe the Filipino taho tradition",
            "Print a complete menu with prices and sizes using proper spacing",
            "Use Console.WriteLine for output"
        ]
    },
    difficult: {
        title: "Level 2 - Taho Time! (Difficult) - C#",
        objectives: [
            "Fix the syntax errors in the provided code:",
            "- Missing semicolons in statements",
            "- Incorrect namespace usage",
            "- Improper string literals",
            "Create a well-formatted receipt-style output with:",
            "- Store name using string variables",
            "- Price list with proper formatting",
            "- Total amount calculation",
            "- Thank you message"
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
displayObjectives(data.difficulty);// objectives for level 2 - C#
