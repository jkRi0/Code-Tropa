window.objectivesData = window.objectivesData || {
    easy: {
        title: "Episode 5 - Java String Operations",
        objectives: [
            "Use String concatenation with the + operator to combine text",
            "Apply String methods like substring() to extract parts of text",
            "Understand how to manipulate and format strings in Java",
            "Your task is to help Axle create formatted messages using string operations"
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// Kuya Pao is teaching Axle about String operations in Java.
// Write Java code that demonstrates:
// - String concatenation to create greetings
// - Using substring() to extract parts of names

// Expected output:
Hello, Axle!
Full Name: Axle Rivera
First Name: Axle`
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

