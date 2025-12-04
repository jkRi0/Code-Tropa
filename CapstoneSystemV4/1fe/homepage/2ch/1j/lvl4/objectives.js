// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 4 - Barangay Curfew Check (Easy) - Java",
        objectives: [
            "Create a Java class named 'CurfewChecker'",
            "Add a main method to start your program",
            "Declare a variable for current hour (e.g., int currentHour = 22)",
            "Check if current time is after 10 PM (22:00) using if statement",
            "If true, display a curfew violation message",
            "Use simple conditional statements (if-else)"
        ]
    },
    average: {
        title: "Level 4 - Barangay Curfew Check (Average) - Java",
        objectives: [
            "Add conditional checks for exemptions using nested if-else",
            "Declare variables for age and current hour",
            "Check for minors (age < 18) and senior citizens (age >= 65)",
            "Create a system that:\n  - Uses variables to store age and time\n  - Checks if time is after 10 PM\n  - Applies exemption rules with nested conditionals\n  - Displays appropriate messages based on conditions",
            "Use nested if-else statements for complex conditions"
        ]
    },
    difficult: {
        title: "Level 4 - Barangay Curfew Check (Difficult) - Java",
        objectives: [
            "Use arrays to store multiple residents with name, age, and reason",
            "Iterate over residents using loops and apply conditionals to determine violations",
            "Create a system that:\n  - Uses arrays to store resident names, ages, and reasons\n  - Loops through each resident\n  - Uses conditional statements to check curfew rules\n  - Considers exemptions (minors, seniors) and valid reasons (Medical, Emergency)\n  - Generates violation report with counts",
            "Use arrays, loops, and complex conditional logic"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Barangay Curfew Check
====================
Current Time: 22:00
CURFEW VIOLATION! It's past 10 PM.`,
    
    average: `
// Expected output:
Barangay Curfew Check
====================
Age: 16
Current Time: 22:00
EXEMPTION: Minors are exempt from curfew.`,
    
    difficult: `
// Expected output:
Barangay Curfew Check Report
============================
Resident: Juan (25) - Work
Status: VIOLATION - No valid reason

Resident: Maria (16) - School
Status: EXEMPT - Minor

Resident: Pedro (70) - Medical
Status: EXEMPT - Senior citizen

Resident: Ana (30) - Emergency
Status: VALID - Emergency reason

Total Violations: 1
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