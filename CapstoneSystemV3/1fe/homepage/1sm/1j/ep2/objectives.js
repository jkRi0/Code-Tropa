// Use namespace to avoid conflicts (storymode uses easy only)
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 2 - Java Variables Challenge",
        objectives: [
            "Declare and initialize Java variables using correct data types",
            "Apply what you've learned about int, String, boolean, and double",
            "Understand proper Java syntax: use of semicolons, naming conventions, and quotation marks for strings"
        ]
    }
};

// Example output to display under objectives
window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// Axle wants to help Ate Kim manage her tindahan inventory in code form.
// Write Java statements that declare the variables needed to track:
// - 10 packs of noodles
// - Brand name: "Lucky Me"
// - Are they available? Yes
// - Price per pack: 13.75 pesos

// Expected Output:
int noodles = 10;
String brand = "Lucky Me";
boolean available = true;
double price = 13.75;`
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

