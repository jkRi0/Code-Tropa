window.objectivesData = window.objectivesData || {
    easy: {
        title: "Chapter 2: Episode 1 – \"Loop the Rows!\"",
        objectives: [
            "Use if-else to make decisions based on student information.",
            "Apply switch to assign group names or activity types.",
            "Use for loops to simulate repeated seating or task distribution.",
            "Use while loops to manage dynamic conditions (e.g., waiting for tracking progress)."
        ]
    }
};

window.examples = window.examples || {
    easy: `
// Challenge Scenario:
// During the final school assembly practice, Ma'am Reyes needs help arranging the students into rows, assigning them into groups, and preparing activity cards. Axle offers to help using his programming skills!

// Player Task:
// Simulate the following using Java control flow:
// - Use if-else to check if a student is late or on time based on the arrivalTime.
// - Use switch to assign them to a group (A, B, or C) based on their row number.
// - Use a for loop to seat 12 students, 3 rows, 4 students per row.
// - Use a while loop to wait until all activity cards (5 total) have been distributed.

// Expected Console Output:
Student arrived at 7:05 AM — On time!
Assigned to Group A
Student 1 seated.
Student 2 seated.
Student 3 seated.
Student 4 seated.

Row 2 – Group B
Student 1 seated.
Student 2 seated.
Student 3 seated.
Student 4 seated.

Row 3 – Group C
Student 1 seated.
Student 2 seated.
Student 3 seated.
Student 4 seated.

Distributing activity cards...
Card 1 given.
Card 2 given.
Card 3 given.
Card 4 given.
Card 5 given.
All tasks complete. Class is ready!`
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
