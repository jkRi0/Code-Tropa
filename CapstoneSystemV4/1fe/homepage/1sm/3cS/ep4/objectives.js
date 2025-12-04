window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 4 - C# Control Flow",
        objectives: [
            "Use if-else statements to make decisions based on age and time conditions",
            "Apply else-if chains for multiple condition checks",
            "Use logical operators (&&) to combine conditions",
            "Understand how control flow helps organize decision-making logic for curfew enforcement"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// Tin is learning about control flow from Kuya Ben for barangay curfew enforcement.
// Write C# code using control flow to:
// - Check if person should be sent home based on age and time
// - Display appropriate message based on conditions

// Expected Console Output:
Age: 16
Time: 22
Curfew! Pauwiin agad.`
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

