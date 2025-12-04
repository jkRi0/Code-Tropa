// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 12 - Simbang Gabi Checker (Easy) - C++",
        objectives: [
            "Create a C++ program with main function",
            "Include necessary headers (iostream, string)",
            "Store 3 consecutive days and their attendance status",
            "Use parallel arrays: string days[] and bool attended[]",
            "Use a for loop to print each day's attendance status",
            "Use conditional (if-else) to display 'Attended' or 'Missed'"
        ]
    },
    average: {
        title: "Level 12 - Simbang Gabi Checker (Average) - C++",
        objectives: [
            "Use loops to count attended days and calculate percentage",
            "Create a system that:\n  - Uses a loop to count how many days were attended (count true values)\n  - Calculates missed days (total - attended)\n  - Calculates completion percentage (attended ÷ total × 100)\n  - Displays attendance summary with counts and percentage",
            "Use loops, conditionals, and mathematical calculations"
        ]
    },
    difficult: {
        title: "Level 12 - Simbang Gabi Checker (Difficult) - C++",
        objectives: [
            "Use loops and conditionals to track streaks and provide encouragement",
            "Create a system that:\n  - Uses loops to track consecutive attendance streaks\n  - Identifies current streak and longest streak\n  - Uses conditional statements to provide encouragement messages based on completion percentage\n  - Shows detailed attendance analysis with streak information",
            "Use loops, nested conditionals, streak tracking logic, and string operations"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Simbang Gabi Attendance Tracker
===============================
Day 1: December 16 - Attended
Day 2: December 17 - Missed
Day 3: December 18 - Attended
===============================`,
    
    average: `
// Expected output:
Simbang Gabi Attendance Tracker
===============================
Day 1: December 16 - Attended
Day 2: December 17 - Missed
Day 3: December 18 - Attended
===============================

Attendance Summary:
Total Days: 3
Attended: 2
Missed: 1
Completion: 66.7%
===============================`,
    
    difficult: `
// Expected output:
Simbang Gabi Attendance Tracker
===============================
Day 1: December 16 - Attended
Day 2: December 17 - Missed
Day 3: December 18 - Attended
Day 4: December 19 - Attended
Day 5: December 20 - Missed
===============================

Detailed Analysis:
Total Days: 5
Attended: 3
Missed: 2
Completion: 60.0%

Streak Analysis:
Current Streak: 0 days
Longest Streak: 2 days
Encouragement: Keep going! You're doing great!
===============================
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
