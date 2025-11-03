// Storymode objectives (easy only) – structured like 2ch lvl1
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 1 - Fiesta Syntax!",
        objectives: [
            "Identify valid C++ syntax.",
            "Understand program structure (#include, int main(), { }, return 0;).",
            "Differentiate between code and comments.",
            "Practice using single-line // and multi-line /* ... */ comments."
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// The Barangay Captain asks Axle to fix the fiesta program announcement code.
// The draft code is messy—some parts are missing semicolons, others need proper comments.

// Player Task: Correct the program below by:
// - Adding the missing semicolons.
// - Placing comments to explain each part.
// - Making sure it compiles properly.

// Draft (Fix This):
#include <iostream>
using namespace std

int main() {
    cout << "Welcome sa Fiesta 2025!" << endl
    cout << "Handog ng Barangay San Juan" << endl

    return 0
}`
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

