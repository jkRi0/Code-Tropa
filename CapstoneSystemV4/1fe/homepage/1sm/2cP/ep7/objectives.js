window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 7 - C++ Methods and Functions",
        objectives: [
            "Create functions (methods) to organize code into reusable blocks",
            "Use function parameters to pass data to functions",
            "Return values from functions using the return statement",
            "Call functions from the main method to execute code",
            "Understand how functions help avoid code repetition",
            "Your task is to help the Albularyo create reusable functions for rituals"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// The Albularyo is teaching Ica about functions in C++.
// Write C++ code that creates functions and calls them from main.

// Expected output:
Kumukuha ng bawang...
Kumukuha ng dahon ng lagundi...
Isinasagawa ang ritwal para sa: Protection...
Ritwal successful!`
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

