window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 6 - Java Arrays",
        objectives: [
            "Declare and initialize arrays to store multiple values",
            "Access array elements using index notation (array[index])",
            "Use arrays to store related data like player names and scores",
            "Understand how parallel arrays work (matching indices for related data)",
            "Your task is to help Kuya Caloy track game scores using arrays"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// Kuya Caloy needs help tracking scores for mini-games during the fiesta.
// Write Java code that uses arrays to store player names and their scores.

// Expected output:
Fiesta Game Scores
==================
Turn ni: Marco
Score ni Jenny: 2
All Players:
Liza: 3
Marco: 5
Jenny: 2`
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

