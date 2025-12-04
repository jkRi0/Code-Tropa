window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 7 - C# Methods and Functions",
        objectives: [
            "Create methods (functions) to organize code into reusable blocks",
            "Use method parameters to pass data to functions",
            "Return values from methods using the return statement",
            "Call methods from the Main method to execute code",
            "Understand how methods help avoid code repetition",
            "Your task is to help Mang Lando create reusable methods for hilot treatments"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// Mang Lando is teaching Juan about methods in C#.
// Write C# code that creates methods and calls them from Main.

// Expected output:
Applying coconut oil on temples...
Treatment completed successfully!`
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

