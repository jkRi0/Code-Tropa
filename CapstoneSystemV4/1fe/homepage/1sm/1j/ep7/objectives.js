window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 7 - Java (Easy)",
        objectives: [
            "Declare an int day = 3",
            "Use switch-case to print a day name",
            "Provide a default case"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Expected output:
Wed`
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

