document.addEventListener('DOMContentLoaded', function() {
    const objectivesData = {
        easy: {
            title: "Level 1 - Easy Objectives",
            objectives: [
                "Create a simple Java class named 'MyClass'",
                "Implement the main method correctly",
                "Print 'Hello World' to the console",
                "Follow proper Java naming conventions"
            ]
        },
        average: {
            title: "Level 1 - Average Objectives",
            objectives: [
                "Create a Java class with proper access modifier",
                "Implement a main method with correct parameters",
                "Use System.out.println() for console output",
                "Add basic comments to explain the code"
            ]
        },
        difficult: {
            title: "Level 1 - Difficult Objectives",
            objectives: [
                "Create a fully documented Java class",
                "Implement main method with error handling",
                "Use formatted output with System.out.printf()",
                "Add JavaDoc comments and inline documentation"
            ]
        }
    };

    const selectedData = localStorage.getItem('selectedChallenge');
    const data = JSON.parse(selectedData);
    function displayObjectives(difficulty) {
        const objectivesContainer = document.querySelector('.objectives-container');
        const difficultyData = objectivesData[difficulty.toLowerCase()];

        if (difficultyData) {
            const content = `
                <h3>${difficultyData.title}</h3>
                <ul>
                    ${difficultyData.objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
            `;
            objectivesContainer.innerHTML = content;
        }
    }

    // Initialize objectives based on selected difficulty
    const urlParams = new URLSearchParams(window.location.search);
    const difficulty = urlParams.get('difficulty') || 'easy';
    displayObjectives(data.difficulty);

    // Export function for use in other scripts
    window.displayObjectives = displayObjectives;
});