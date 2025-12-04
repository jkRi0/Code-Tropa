window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 4 - C++ Control Flow",
        objectives: [
            "Use if-else statements to make decisions based on scores and conditions",
            "Apply else-if chains for multiple condition checks",
            "Use string comparison in conditional statements",
            "Understand how control flow helps organize decision-making logic"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// Ica needs to compute scores and assign awards for Quiz Bee and Sabayang Pagbigkas.
// Write C++ code using control flow to:
// - Assign Gold/Silver/Needs Improvement based on score
// - Display judging criteria based on category

// Expected Console Output:
Score: 85
Silver Medalist!
Category: Sabayang Pagbigkas
Judging criteria: Unity and Delivery.`
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

