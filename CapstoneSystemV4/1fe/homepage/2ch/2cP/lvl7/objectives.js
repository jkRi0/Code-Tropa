// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 7 - Pamamanhikan Planner (Easy) - C++",
        objectives: [
            "Create a C++ program with main function",
            "Include necessary headers (iostream, string)",
            "Create a function that returns a welcome message for visitors",
            "Use function parameters to customize the welcome message",
            "Call the function to display welcome messages"
        ]
    },
    average: {
        title: "Level 7 - Pamamanhikan Planner (Average) - C++",
        objectives: [
            "Use parameters to assign specific gift tasks to participants",
            "Create functions that assign different gift responsibilities",
            "Create a system that:\n  - Takes participant names as input\n  - Assigns gift tasks (flowers, food, jewelry)\n  - Displays assignment confirmations",
            "Use multiple functions with different parameters and return values"
        ]
    },
    difficult: {
        title: "Level 7 - Pamamanhikan Planner (Difficult) - C++",
        objectives: [
            "Use arrays and functions to validate all expected gifts are present",
            "Create a function that returns boolean to check if all gifts are assigned",
            "Create a system that:\n  - Uses arrays to store required gifts and assigned participants\n  - Uses a function with return value to validate all gifts are present\n  - Uses loops to check each gift\n  - Generates completion report showing which gifts are assigned",
            "Use arrays, loops, and functions with return values"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Pamamanhikan Welcome Messages
============================
Welcome, Santos Family! We're honored by your visit.
Welcome, Garcia Family! We're honored by your visit.
Welcome, Rodriguez Family! We're honored by your visit.`,
    
    average: `
// Expected output:
Pamamanhikan Gift Assignment
===========================
Participant: Juan
Assigned Gift: Flowers
Status: ✅ Task assigned successfully

Participant: Maria
Assigned Gift: Food
Status: ✅ Task assigned successfully

Participant: Pedro
Assigned Gift: Jewelry
Status: ✅ Task assigned successfully`,
    
    difficult: `
// Expected output:
Pamamanhikan Gift Validation
===========================
Required Gifts Checklist:
✅ Flowers - Assigned to: Juan
✅ Food - Assigned to: Maria
✅ Jewelry - Assigned to: Pedro
✅ Traditional Items - Assigned to: Ana

All gifts accounted for!
Pamamanhikan is ready to proceed.
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
