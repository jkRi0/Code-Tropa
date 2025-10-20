// Storymode objectives (easy only) – structured like 2ch lvl1
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 3 - Java (Easy)",
        objectives: [
            "Create a method named 'sum' that takes two ints",
            "Return the sum of the two numbers",
            "Call 'sum' in main and print the result"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Expected output:
5`
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
            <div class="example-output">
                <pre>${(window.examples && window.examples[difficultyKey]) || ''}</pre>
            </div>
        `;
    objectivesContainer.innerHTML = content;
};

(function() { window.displayObjectives('easy'); })();

