// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 5 - Bayanihan Scheduler (Easy) - Java",
        objectives: [
            "Create a Java class named 'BayanihanScheduler'",
            "Add a main method to start your program",
            "Create a function that greets each helper by name",
            "Use method parameters to pass helper names",
            "Call the greeting function for at least 3 helpers"
        ]
    },
    average: {
        title: "Level 5 - Bayanihan Scheduler (Average) - Java",
        objectives: [
            "Create a function that assigns roles based on age using parameters",
            "Use method parameters to pass helper name and age",
            "Assign specific roles based on age ranges:\n  - Lifter (age 18-40)\n  - Cook (age 25-60)\n  - Driver (age 21-65)\n  - Assistant (others)",
            "Create a system that:\n  - Uses a function with parameters to assign roles\n  - Uses conditional logic inside the function\n  - Displays assignment confirmation for each helper",
            "Use multiple methods with different parameters and return values"
        ]
    },
    difficult: {
        title: "Level 5 - Bayanihan Scheduler (Difficult) - Java",
        objectives: [
            "Use arrays to store helpers and functions to assign roles",
            "Use functions with return values to check role eligibility",
            "Create a system that:\n  - Uses arrays to store helper names and ages\n  - Uses a function to determine role eligibility based on age\n  - Uses loops to assign roles to all helpers\n  - Prevents duplicate role assignments using arrays\n  - Displays complete role assignment report",
            "Use arrays, loops, and multiple functions with return values"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Bayanihan Helper Greetings
=========================
Hello, Juan! Thank you for helping with the move.
Hello, Maria! Thank you for helping with the move.
Hello, Pedro! Thank you for helping with the move.`,
    
    average: `
// Expected output:
Bayanihan Role Assignment
========================
Helper: Juan (25)
Assigned Role: Lifter
Status: Role assigned successfully

Helper: Maria (45)
Assigned Role: Cook
Status: Role assigned successfully

Helper: Pedro (30)
Assigned Role: Driver
Status: Role assigned successfully`,
    
    difficult: `
// Expected output:
Bayanihan Complete Scheduler
===========================
Available Helpers: Juan(25), Maria(45), Pedro(30), Ana(35), Carlos(50)

Role Assignments:
Lifter: Juan (25)
Cook: Maria (45)
Driver: Pedro (30)
Assistant: Ana (35)
Coordinator: Carlos (50)

All roles filled successfully!
===========================
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