// Storymode objectives (easy only) – structured like 2ch lvl1
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 1 - Fiesta Syntax!",
        objectives: [
            "Create a complete C++ program with proper syntax.",
            "Understand program structure (#include, int main(), { }, return 0;).",
            "Use cout to display messages to the console.",
            "Add comments to explain your code using // and /* ... */."
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// The Barangay Captain asks Ica to create a fiesta program announcement.
// Write a complete C++ program that displays a welcome message for the fiesta.

// Player Task: Create a C++ program that:
// - Includes the necessary header file
// - Uses the standard namespace
// - Has a main function
// - Displays at least 2 messages about the fiesta
// - Includes comments explaining each part
// - Returns 0 at the end

// Expected Output:
Welcome sa Fiesta 2025!
Handog ng Barangay San Juan
Mabuhay ang mga bisita!`
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

