window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 5 - C# String Operations",
        objectives: [
            "Use string methods like ToUpper() to format text",
            "Apply string methods like Length and Substring() to manipulate text",
            "Use Replace() to modify strings and Contains() to check for text",
            "Understand how to format and validate radio messages using string operations",
            "Your task is to help Hans format radio dedications using string operations"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// Hans is learning about String operations from DJ Lyka for radio dedications.
// Write C# code that demonstrates:
// - String ToUpper() to capitalize names
// - Length to check message length
// - Substring() to truncate long messages
// - Replace() to modify words
// - Contains() to validate messages

// Expected output:
MARIA
Message too long! Truncating...
happy anniversary maria!
Message ready for air!`
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

