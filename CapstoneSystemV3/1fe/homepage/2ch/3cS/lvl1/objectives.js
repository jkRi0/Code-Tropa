// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 1 - Taho Time! (Easy) - C#",
        objectives: [
            "Create a C# program with Main method",
            "Use System namespace",
            "Print 'Tahooo!' as the vendor's call",
            "Print a simple price list with two items:\n  - Regular Taho: ₱20\n  - Large Taho: ₱25"
        ]
    },
    average: {
        title: "Level 1 - Taho Time! (Average) - C#",
        objectives: [
            "Create a formatted price menu using string formatting",
            "Add single-line comments (//) to explain the vendor's call",
            "Add a multi-line comment (/* */) to describe the Filipino taho tradition",
            "Print a complete menu with prices and sizes using proper spacing",
            "Use Console.WriteLine for output"
        ]
    },
    difficult: {
        title: "Level 1 - Taho Time! (Difficult) - C#",
        objectives: [
            "Fix the syntax errors in the provided code:",
            "- Missing semicolons in statements",
            "- Incorrect namespace usage",
            "- Improper string literals",
            "<pre class=\"code-to-debug\">\nusing System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine(\" MANILA TAHO STORE ; \n        Console.WriteLine(\"=====================\");\n\n        Console.WriteLine(\"Menu:\");\n        Console.WriteLine(\"1. Regular Taho    ₱20\");\n        Console.WriteLine(\"2. Large Taho      ₱25\");\n        Console.WriteLine(\"Extra Syrup: \" + 5 + \"₱\");\n\n        Console.WriteLine(\"=====================\");\n        Console.WriteLine(\"Salamat po!\");\n    }\n}</pre>",
            "Create a well-formatted receipt-style output with:\n  - Store name\n  - Price list\n  - Total amount\n  - Thank you message"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
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
})();// objectives for level 1 - C#