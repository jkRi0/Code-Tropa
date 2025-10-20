// Placeholder objectives for Java Storymode Episode 6
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 6 - Java (Easy)",
        objectives: [
            "Read an integer variable",
            "Print 'Positive' if > 0, 'Negative' if < 0, 'Zero' otherwise"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Expected output (for 5):
Positive`
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

