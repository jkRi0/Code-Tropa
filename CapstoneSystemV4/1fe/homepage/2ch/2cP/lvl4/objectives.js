// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 4 - Barangay Curfew Check (Easy) - C++",
        objectives: [
            "Create a C++ program with main function",
            "Include necessary headers (iostream)",
            "Declare a variable for current hour (e.g., int currentHour = 22)",
            "Check if current time is after 10 PM (22:00) using if statement",
            "If true, display a curfew violation message",
            "Use simple conditional statements (if-else) and std::cout"
        ]
    },
    average: {
        title: "Level 4 - Barangay Curfew Check (Average) - C++",
        objectives: [
            "Add conditional checks for exemptions",
            "Check for minors (age < 18) and senior citizens (age >= 65)",
            "Create a system that:\n  - Takes age as input\n  - Checks if time is after 10 PM\n  - Applies exemption rules\n  - Displays appropriate messages",
            "Use nested if-else statements and std::cin for input"
        ]
    },
    difficult: {
        title: "Level 4 - Barangay Curfew Check (Difficult) - C++",
        objectives: [
            "Iterate over a list of residents with name, age, and reason for being outside",
            "Apply layered conditionals to determine who is violating curfew",
            "Create a system that:\n  - Stores resident data in arrays\n  - Checks each resident against curfew rules\n  - Considers exemptions and valid reasons\n  - Generates violation reports",
            "Use loops, arrays, and complex conditional logic"
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
Current Time: 22:30
⚠️ CURFEW VIOLATION! It's past 10 PM.`,
    
    average: `
// Expected output (with age input: 16):
Barangay Curfew Check
====================
Enter your age: 16
Current Time: 22:30
✅ EXEMPTION: Minors are exempt from curfew.`,
    
    difficult: `
// Expected output:
Barangay Curfew Check Report
============================
Resident: Juan (25) - Work
Status: ⚠️ VIOLATION - No valid reason

Resident: Maria (16) - School
Status: ✅ EXEMPT - Minor

Resident: Pedro (70) - Medical
Status: ✅ EXEMPT - Senior citizen

Resident: Ana (30) - Emergency
Status: ✅ VALID - Emergency reason

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
