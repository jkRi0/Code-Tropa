// Storymode objectives (easy only) – structured like 2ch lvl1
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 2 - C++ Variables Challenge",
        objectives: [
            "Declare and initialize C++ variables using correct data types",
            "Apply what you've learned about int, float, string, and bool",
            "Understand proper C++ syntax: use of semicolons, naming conventions, and quotation marks for strings",
            "Use cout to display variable values"
        ]
    }
};

// Example output to display under objectives
window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// Ica wants to help Aling Nena manage her tindahan inventory in code form.
// Write C++ statements that declare the variables needed to track:
// - Price of itlog: 12 pesos
// - Price of suka: 15.50 pesos
// - Price of toyo: 8.75 pesos
// - Brand name: "Piattos"
// - Are they available? Yes

// Expected Output:
int itlog = 12;
float suka = 15.50;
float toyo = 8.75;
string chichirya = "Piattos";
bool available = true;`
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

