// Storymode objectives (easy only) – structured like 2ch lvl1
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 3 - Java Operators and Expressions",
        objectives: [
            "Use arithmetic, comparison, and logical operators in Java expressions.",
            "Apply what you've learned about +, -, *, /, %, >, <, ==, and &&.",
            "Understand how operators interact with variables to calculate values and make decisions.",
            "Your task is to help Axle compute the total cost, check if the team is within budget, and verify if the recipe is ready to cook (only if all ingredients are complete and the budget is enough)."
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Player Task:
// Write Java code using arithmetic and logical operators to:
// - Calculate the total ingredient cost.
// - Compare it with the budget.
// - Use a boolean expression to check if cooking can proceed.

// Expected output:
Total Cost: 335
Within Budget: true
Ready to Cook: true`
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

