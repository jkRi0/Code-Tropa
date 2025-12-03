window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 5 - Java (Easy)",
        objectives: [
            "Create a class 'Person' with fields name and age",
            "Add a constructor to set both fields",
            "Instantiate and print the fields in main"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Expected output:
Axle, 18`
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

