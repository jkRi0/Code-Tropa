// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 8 - Tikbalang Path Puzzle (Easy) - C++",
        objectives: [
            "Create a C++ program with main function",
            "Include necessary headers (iostream, string)",
            "Use a loop to print a sequence of 3 predefined moves",
            "Create an array of moves: [\"straight\", \"left\", \"right\"]",
            "Print each move using a for loop and std::cout"
        ]
    },
    average: {
        title: "Level 8 - Tikbalang Path Puzzle (Average) - C++",
        objectives: [
            "Add random choices with different outcomes",
            "Use rand() function to generate random moves",
            "Create a system that:\n  - Generates random moves (straight, offer gift, hide)\n  - Shows different outcomes for each move\n  - Uses if-else statements for move consequences",
            "Use loops and conditional statements together"
        ]
    },
    difficult: {
        title: "Level 8 - Tikbalang Path Puzzle (Difficult) - C++",
        objectives: [
            "Track health and path history in arrays",
            "End loop if player chooses wrong sequence or encounters trap",
            "Create a system that:\n  - Maintains player health (starts at 100)\n  - Tracks path history\n  - Applies damage for wrong moves\n  - Ends game if health reaches 0\n  - Shows escape success if correct path taken",
            "Use complex loops, arrays, and game logic"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Tikbalang Escape Route
=====================
Move 1: straight
Move 2: left
Move 3: right
=====================`,
    
    average: `
// Expected output:
Tikbalang Forest Adventure
=========================
Move 1: offer gift
Outcome: Tikbalang accepts gift! Safe passage.
Move 2: straight
Outcome: You find a hidden path!
Move 3: hide
Outcome: You successfully hide from danger!
=========================`,
    
    difficult: `
// Expected output:
Tikbalang Escape Game
===================
Health: 100
Path History: []

Move 1: straight
Outcome: Safe path! Health: 100
Path History: [straight]

Move 2: left
Outcome: Wrong turn! Health: 80
Path History: [straight, left]

Move 3: offer gift
Outcome: Tikbalang accepts! You escape!
Final Health: 80
===================
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
