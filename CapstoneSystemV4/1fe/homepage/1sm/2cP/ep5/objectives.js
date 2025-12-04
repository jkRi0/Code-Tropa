window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 5 - C++ String Operations",
        objectives: [
            "Use string concatenation with the + operator to combine text",
            "Apply string methods like length() and substr() to manipulate text",
            "Understand how to compare strings using == operator",
            "Your task is to help Ica format name tags and certificates using string operations"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// Kuya Pao is teaching Ica about String operations in C++.
// Write C++ code that demonstrates:
// - String length() to check name length
// - Using substr() to extract first name
// - String concatenation to create greetings

// Expected output:
Characters: 18
First name: Maria
Congratulations, Gng. Maria Santos!`
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

