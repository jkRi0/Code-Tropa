window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 6 - C++ Arrays",
        objectives: [
            "Declare and initialize arrays to store multiple values",
            "Access array elements using index notation (array[index])",
            "Use arrays to store related data like player names and scores",
            "Understand how parallel arrays work (matching indices for related data)",
            "Use for loops to process array elements",
            "Your task is to help Ica track game scores using arrays"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// Ica needs to track scores for multiple players in the fiesta games.
// Write C++ code that uses arrays to store player names and their scores.

// Expected output:
Fiesta Game Scores
==================
Juan - 5 points
Ana - 3 points
Pedro - 7 points
Liza - 2 points
Kiko - 4 points
Top Player: Pedro with 7 points!`
};

window.displayObjectives = window.displayObjectives || function(difficulty) {
    const objectivesContainer = document.querySelector('.objectives-container');
    const difficultyKey = (difficulty || 'easy').toLowerCase();
    const difficultyData = window.objectivesData[difficultyKey];
    if (!objectivesContainer || !difficultyData) return;
    const content = `
            <h3>${difficultyData.title}</h3>
            <ul>
                ${difficultyData.objectives.map(obj => `<li>${obj}</li>`).join('')}
            </ul>
            <div class=\"example-output\"> 
                <pre>${(window.examples && window.examples[difficultyKey]) || ''}</pre>
            </div>
        `;
    objectivesContainer.innerHTML = content;
};

(function() { window.displayObjectives('easy'); })();

