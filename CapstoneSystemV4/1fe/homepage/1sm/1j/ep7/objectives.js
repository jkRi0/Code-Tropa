window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 7 - Java Methods and Functions",
        objectives: [
            "Create methods (functions) to organize code into reusable blocks",
            "Use method parameters to pass data to functions",
            "Return values from methods using the return statement",
            "Call methods from the main method to execute code",
            "Understand how methods help avoid code repetition",
            "Your task is to help Manong Code create reusable functions"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// Manong Code is teaching Axle about methods/functions in Java.
// Write Java code that creates a method and calls it from main.

// Expected output:
Aling Rosa the Aswang
Pedro the Aswang
Maria the Aswang`
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

