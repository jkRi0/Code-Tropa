window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 4 - Java (Easy)",
        objectives: [
            "Use a for-loop to print numbers 1 to 10"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Expected output:
1\n2\n3\n4\n5\n6\n7\n8\n9\n10`
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

