// Storymode objectives (easy only) – structured like 2ch lvl1
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 1 - C# Syntax Basics!",
        objectives: [
            "Create a complete C# program with proper syntax",
            "Understand program structure (using System, class, static void Main, { }, Console.WriteLine)",
            "Use Console.WriteLine to display messages to the console",
            "Add comments to explain your code using // and /* ... */"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// Kuya Jomar asks Ann to create a jeepney route announcement program.
// Write a complete C# program that displays route information for passengers.

// Player Task: Create a C# program that:
// - Includes the using System statement
// - Has a Program class
// - Contains a Main method
// - Displays at least 2 messages about jeepney routes
// - Includes comments explaining each part

// Expected Output:
Sakay na sa C#!
Quiapo to Cubao
Mabuhay ang mga pasahero!`
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

