// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 10 - Larong Kalye Leaderboard (Easy) - C++",
        objectives: [
            "Create a C++ program with main function",
            "Include necessary headers (iostream, string)",
            "Store 3 player names and scores in arrays",
            "Use parallel arrays: string names[] and int scores[]",
            "Print each player's name and score using a loop"
        ]
    },
    average: {
        title: "Level 10 - Larong Kalye Leaderboard (Average) - C++",
        objectives: [
            "Sort and print the top 3 scores",
            "Create a system that:\n  - Uses loops to sort players by score (highest first) using manual sorting\n  - Displays ranked leaderboard\n  - Shows position, name, and score",
            "Use manual sorting (bubble sort or selection sort) with loops and conditionals"
        ]
    },
    difficult: {
        title: "Level 10 - Larong Kalye Leaderboard (Difficult) - C++",
        objectives: [
            "Handle score ties, compute the average, and display a formatted leaderboard",
            "Create a system that:\n  - Handles tied scores properly\n  - Calculates average score\n  - Displays formatted leaderboard with rankings\n  - Shows statistics (highest, lowest, average)",
            "Use complex sorting, tie-breaking logic, and formatted output"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Larong Kalye Leaderboard
=======================
Player 1: Juan - 85 points
Player 2: Maria - 92 points
Player 3: Pedro - 78 points
=======================`,
    
    average: `
// Expected output:
Larong Kalye Leaderboard (Sorted)
================================
1st Place: Maria - 92 points
2nd Place: Juan - 85 points
3rd Place: Pedro - 78 points
================================`,
    
    difficult: `
// Expected output:
Larong Kalye Leaderboard (Complete)
==================================
Rank  Name    Score
----  ----    -----
1st   Maria   92
2nd   Juan    85
3rd   Pedro   78
4th   Ana     85 (tied with Juan)
5th   Carlos  70

Statistics:
Highest Score: 92
Lowest Score: 70
Average Score: 82.0
==================================
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
