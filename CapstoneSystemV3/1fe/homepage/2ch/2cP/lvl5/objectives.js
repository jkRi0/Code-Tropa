// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 5 - Bayanihan Scheduler (Easy) - C++",
        objectives: [
            "Create a C++ program with main function",
            "Include necessary headers (iostream, string)",
            "Create a function that greets each helper by name",
            "Use function parameters to pass helper names",
            "Call the greeting function for at least 3 helpers"
        ]
    },
    average: {
        title: "Level 5 - Bayanihan Scheduler (Average) - C++",
        objectives: [
            "Create a function that assigns roles based on age",
            "Use parameters to assign specific roles:\n  - Lifter (age 18-40)\n  - Cook (age 25-60)\n  - Driver (age 21-65)",
            "Create a system that:\n  - Takes helper name and age as input\n  - Assigns appropriate role\n  - Displays assignment confirmation",
            "Use multiple functions with different parameters"
        ]
    },
    difficult: {
        title: "Level 5 - Bayanihan Scheduler (Difficult) - C++",
        objectives: [
            "Use functions to assign roles while checking availability",
            "Prevent duplicate role assignments and ensure all roles are filled",
            "Create a system that:\n  - Maintains a list of available helpers\n  - Checks role availability before assignment\n  - Prevents duplicate assignments\n  - Ensures all critical roles are covered",
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
Status: ✅ Role assigned successfully

Helper: Maria (45)
Assigned Role: Cook
Status: ✅ Role assigned successfully

Helper: Pedro (30)
Assigned Role: Driver
Status: ✅ Role assigned successfully`,
    
    difficult: `
// Expected output:
Bayanihan Complete Scheduler
===========================
Available Helpers: Juan(25), Maria(45), Pedro(30), Ana(35), Carlos(50)

Role Assignments:
✅ Lifter: Juan (25)
✅ Cook: Maria (45)
✅ Driver: Pedro (30)
✅ Assistant: Ana (35)
✅ Coordinator: Carlos (50)

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
