window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 6 - C# Arrays",
        objectives: [
            "Declare and initialize arrays to store multiple values",
            "Access array elements using index notation (array[index])",
            "Use arrays to store related data like examinee names and scores",
            "Understand how parallel arrays work (matching indices for related data)",
            "Use for loops to process array elements",
            "Use array Length property to iterate through arrays",
            "Your task is to help Maria track LTO exam results using arrays"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// Maria needs to track exam results for multiple examinees at the LTO.
// Write C# code that uses arrays to store examinee names and their scores.

// Expected output:
LTO Exam Results
================
Anna - PASSED
Ben - PASSED
Carlo - FAILED
Diana - FAILED`
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
            <div class=\"example-output\"> 
                <pre>${(window.examples && window.examples[difficultyKey]) || ''}</pre>
            </div>
        `;
    objectivesContainer.innerHTML = content;
};

(function() { window.displayObjectives('easy'); })();

