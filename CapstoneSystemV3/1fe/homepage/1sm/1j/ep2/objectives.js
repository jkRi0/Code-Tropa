// Use namespace to avoid conflicts (storymode uses easy only)
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 2 - Java (Easy)",
        objectives: [
            "Create a Java class named 'Greeting'",
            "Add a main method",
            "Print 'Hello, Storymode!' to the console"
        ]
    }
};

// Example output to display under objectives
window.examples = window.examples || {
    easy: `
// Expected output:
Hello, Storymode!`
};

// Display objectives in the storymode challenge UI
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

// Initialize objectives (easy only in storymode)
(function() {
    window.displayObjectives('easy');
})();

