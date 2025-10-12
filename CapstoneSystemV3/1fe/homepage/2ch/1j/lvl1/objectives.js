// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 1 - Taho Time! (Easy) - Java",
        objectives: [
            "Create a Java class named 'TahoVendor'",
            "Add a main method to start your program",
            "Print 'Tahooo!' as the vendor's call",
            "Print a simple price list with two items:\n  - Taho: ₱15\n  - Syrup: ₱5"
        ]
    },
    average: {
        title: "Level 1 - Taho Time! (Average) - Java",
        objectives: [
            "Format the printed output with newlines and tabs for better readability",
            "Add single-line comments (//) explaining each line of code",
            "Add a multi-line comment (/* */) describing the taho vendor tradition",
            "Print a complete menu with proper spacing and formatting"
        ]
    },
    difficult: {
        title: "Level 1 - Taho Time! (Difficult) - Java",
        objectives: [
            "Debug a provided set of print statements with various syntax errors:",
            "- Missing quotes in string literals",
            "- Misplaced semicolons",
            "- Incorrect string concatenation",
            "<pre class=\"code-to-debug\">\npublic class TahoVendor {\n    public static void main(String[] args) {\n        System.out.println(Tahooo!);\n        System.out.println(\"Taho: ₱15\");\n        System.out.println(\"Syrup: ₱5\");\n        System.out.println(\"Total: \" + 15 + 5 + \"₱\");\n    }\n}</pre>",
            "Ensure correct output formatting and proper syntax"
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
================`,
    
    difficult: `
// Expected output:
Tahooo!
Taho: ₱15
Syrup: ₱5
Total: 20₱
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