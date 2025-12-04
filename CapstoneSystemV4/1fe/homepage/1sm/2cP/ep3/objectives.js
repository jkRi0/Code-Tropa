// Storymode objectives (easy only) – structured like 2ch lvl1
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 3 - C++ Operators and Expressions",
        objectives: [
            "Use arithmetic, comparison, and logical operators in C++ expressions",
            "Apply what you've learned about +, -, *, /, %, >, <, ==, and &&",
            "Understand how operators interact with variables to calculate values and make decisions",
            "Your task is to help Ica compute the total budget, check if it's within limit, and verify if the handa is complete"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// Ica is helping the Kapitan budget for the cooking contest.
// Write C++ code using arithmetic and logical operators to:
// - Calculate the total ingredient cost
// - Compare it with the budget
// - Use a boolean expression to check if cooking can proceed

// Expected output:
Total budget: 850
Lagpas na sa budget!
Complete ang handa!`
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

