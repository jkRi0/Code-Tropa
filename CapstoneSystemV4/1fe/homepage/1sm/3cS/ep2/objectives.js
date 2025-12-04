// Storymode objectives (easy only) – structured like 2ch lvl1
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 2 - C# Variables Challenge",
        objectives: [
            "Declare and initialize C# variables using correct data types",
            "Apply what you've learned about int, double, string, and bool",
            "Understand proper C# syntax: use of semicolons, naming conventions, and quotation marks for strings",
            "Use Console.WriteLine to display variable values"
        ]
    }
};

// Example output to display under objectives
window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// Hans wants to help Aling Marites manage her palengke inventory in code form.
// Write C# statements that declare the variables needed to track:
// - Price of bigas per kilo: 25 pesos
// - Price of bangus: 180.50 pesos
// - Vegetable name: "Talong"
// - Is it available? Yes

// Expected Output:
int kiloBigas = 25;
double presyoBangus = 180.50;
string gulay = "Talong";
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

