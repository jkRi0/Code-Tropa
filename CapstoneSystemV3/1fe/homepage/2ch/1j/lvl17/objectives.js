// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 17 - Palarong Barangay Medal Tally (Easy) - Java",
        objectives: [
            "Create a Java class named 'PalarongBarangay'",
            "Add a main method to start your program",
            "Store 3 barangay teams and their medal counts in arrays",
            "Use parallel arrays: String[] teams and int[] medals",
            "Print each team's name and medal count using a loop"
        ]
    },
    average: {
        title: "Level 17 - Palarong Barangay Medal Tally (Average) - Java",
        objectives: [
            "Calculate total medals and determine the winning team",
            "Create a system that:\n  - Calculates total medals for each team\n  - Determines the winning team\n  - Displays medal standings and winner",
            "Use loops and conditional logic"
        ]
    },
    difficult: {
        title: "Level 17 - Palarong Barangay Medal Tally (Difficult) - Java",
        objectives: [
            "Track different medal types and generate detailed standings",
            "Create a system that:\n  - Tracks gold, silver, and bronze medals separately\n  - Calculates weighted scores (gold=3, silver=2, bronze=1)\n  - Generates detailed standings with tie-breaking\n  - Displays comprehensive medal analysis",
            "Use complex logic, weighted scoring, and tie-breaking algorithms"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Palarong Barangay Medal Tally
============================
Team 1: Barangay San Jose - 5 medals
Team 2: Barangay Santa Maria - 7 medals
Team 3: Barangay San Pedro - 4 medals
============================`,
    
    average: `
// Expected output:
Palarong Barangay Medal Tally
============================
Team 1: Barangay San Jose - 5 medals
Team 2: Barangay Santa Maria - 7 medals
Team 3: Barangay San Pedro - 4 medals
============================

Medal Standings:
1st Place: Barangay Santa Maria (7 medals)
2nd Place: Barangay San Jose (5 medals)
3rd Place: Barangay San Pedro (4 medals)
============================`,
    
    difficult: `
// Expected output:
Palarong Barangay Medal Tally
============================
Team 1: Barangay San Jose - 5 medals
Team 2: Barangay Santa Maria - 7 medals
Team 3: Barangay San Pedro - 4 medals
============================

Detailed Medal Analysis:
Barangay San Jose: 2 Gold, 2 Silver, 1 Bronze (Score: 11)
Barangay Santa Maria: 3 Gold, 1 Silver, 3 Bronze (Score: 14)
Barangay San Pedro: 1 Gold, 3 Silver, 0 Bronze (Score: 9)

Final Standings:
1st Place: Barangay Santa Maria (Score: 14)
2nd Place: Barangay San Jose (Score: 11)
3rd Place: Barangay San Pedro (Score: 9)
============================
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