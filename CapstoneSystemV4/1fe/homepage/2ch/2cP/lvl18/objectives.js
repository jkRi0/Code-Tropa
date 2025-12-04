// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 18 - Miss Barangay Scoring System (Easy) - C++",
        objectives: [
            "Create a C++ program with main function",
            "Include necessary headers (iostream, string, iomanip)",
            "Store 3 contestants and their scores in arrays",
            "Use parallel arrays: string contestants[] and double scores[]",
            "Print each contestant's name and score using a loop"
        ]
    },
    average: {
        title: "Level 18 - Miss Barangay Scoring System (Average) - C++",
        objectives: [
            "Use loops and conditionals to find winner and sort rankings",
            "Create a system that:\n  - Uses loops to find contestant with highest score\n  - Uses bubble sort algorithm to sort contestants by score\n  - Displays ranked results (1st, 2nd, 3rd place)\n  - Announces the winner",
            "Use loops, conditionals, and sorting algorithms"
        ]
    },
    difficult: {
        title: "Level 18 - Miss Barangay Scoring System (Difficult) - C++",
        objectives: [
            "Use multiple arrays and loops to implement weighted scoring and detailed rankings",
            "Create a system that:\n  - Uses arrays to store talent, beauty, and intelligence scores separately\n  - Uses loops to calculate weighted scores (talent×0.40 + beauty×0.30 + intelligence×0.30)\n  - Uses bubble sort to rank contestants by weighted score\n  - Displays detailed scoring analysis showing category breakdowns and final rankings",
            "Use multiple arrays, nested loops, weighted calculations, and sorting"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Miss Barangay Scoring System
===========================
Contestant 1: Maria Santos - 85.5 points
Contestant 2: Ana Garcia - 92.0 points
Contestant 3: Sofia Rodriguez - 88.5 points
==========================`,
    
    average: `
// Expected output:
Miss Barangay Scoring System
===========================
Contestant 1: Maria Santos - 85.5 points
Contestant 2: Ana Garcia - 92.0 points
Contestant 3: Sofia Rodriguez - 88.5 points
==========================

Scoring Results:
1st Place: Ana Garcia (92.0 points)
2nd Place: Sofia Rodriguez (88.5 points)
3rd Place: Maria Santos (85.5 points)

Winner: Ana Garcia - Miss Barangay 2024!
==========================`,
    
    difficult: `
// Expected output:
Miss Barangay Scoring System
===========================
Contestant 1: Maria Santos - 85.5 points
Contestant 2: Ana Garcia - 92.0 points
Contestant 3: Sofia Rodriguez - 88.5 points
==========================

Detailed Scoring Analysis:
Maria Santos:
  Talent: 90.0 (40%) = 36.0
  Beauty: 80.0 (30%) = 24.0
  Intelligence: 85.0 (30%) = 25.5
  Total: 85.5

Ana Garcia:
  Talent: 95.0 (40%) = 38.0
  Beauty: 90.0 (30%) = 27.0
  Intelligence: 90.0 (30%) = 27.0
  Total: 92.0

Sofia Rodriguez:
  Talent: 85.0 (40%) = 34.0
  Beauty: 95.0 (30%) = 28.5
  Intelligence: 87.0 (30%) = 26.1
  Total: 88.6

Final Rankings:
1st Place: Ana Garcia (92.0 points)
2nd Place: Sofia Rodriguez (88.6 points)
3rd Place: Maria Santos (85.5 points)

Winner: Ana Garcia - Miss Barangay 2024!
==========================
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
