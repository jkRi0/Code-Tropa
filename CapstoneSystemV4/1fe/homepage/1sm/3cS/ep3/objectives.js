// Storymode objectives (easy only) – structured like 2ch lvl1
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 3 - C# Operators and Expressions",
        objectives: [
            "Use arithmetic, comparison, and logical operators in C# expressions",
            "Apply what you've learned about +, -, *, /, %, >, <, ==, and &&",
            "Understand how operators interact with variables to calculate values and make decisions",
            "Your task is to help Mary compute the fare, check if payment is sufficient, and verify if trike is available and affordable"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// Mary is learning about operators from Kuya Renz for calculating jeepney fares.
// Write C# code using arithmetic and logical operators to:
// - Calculate the total fare based on base fare and distance
// - Compare payment with fare
// - Use a boolean expression to check if trike is available and affordable

// Expected output:
Total Pamasahe: ₱27.5
True
Sakay na!`
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

