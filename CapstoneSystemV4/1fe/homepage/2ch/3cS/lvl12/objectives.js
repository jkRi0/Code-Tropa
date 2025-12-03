// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 12 - Simbang Gabi Checker (Easy) - C#",
        objectives: [
            "Create a C# program with Main method",
            "Use System namespace",
            "Store 3 consecutive days and their attendance status",
            "Use parallel arrays: string[] days and bool[] attended",
            "Print each day's attendance status using a loop"
        ]
    },
    average: {
        title: "Level 12 - Simbang Gabi Checker (Average) - C#",
        objectives: [
            "Count total attended days and calculate completion percentage",
            "Create a system that:\n  - Counts how many days were attended\n  - Calculates completion percentage\n  - Displays attendance summary",
            "Use loops and mathematical calculations"
        ]
    },
    difficult: {
        title: "Level 12 - Simbang Gabi Checker (Difficult) - C#",
        objectives: [
            "Track consecutive attendance streaks and provide encouragement messages",
            "Create a system that:\n  - Tracks consecutive attendance streaks\n  - Identifies longest streak\n  - Provides encouragement based on attendance\n  - Shows detailed attendance analysis",
            "Use complex logic, streak tracking, and conditional messaging"
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
Day 1: December 16 - ✅ Attended
Day 2: December 17 - ❌ Missed
Day 3: December 18 - ✅ Attended
===============================`,
    
    average: `
// Expected output:
Simbang Gabi Attendance Tracker
===============================
Day 1: December 16 - ✅ Attended
Day 2: December 17 - ❌ Missed
Day 3: December 18 - ✅ Attended
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
Day 1: December 16 - ✅ Attended
Day 2: December 17 - ❌ Missed
Day 3: December 18 - ✅ Attended
Day 4: December 19 - ✅ Attended
Day 5: December 20 - ❌ Missed
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
