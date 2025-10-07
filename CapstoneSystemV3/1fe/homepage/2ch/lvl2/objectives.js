document.addEventListener('DOMContentLoaded', function() {
    const objectivesData = {
        easy: {
            title: "Level 2 - Easy Objectives",
            objectives: [
                "Create a simple Java class named 'TahoVendor'",
                "Implement the main method correctly",
                "Print basic taho menu items",
                "Display prices in Philippine Peso (₱)"
            ]
        },
        average: {
            title: "Level 2 - Average Objectives",
            objectives: [
                "Create a formatted taho menu display",
                "Add proper header and footer sections",
                "Use tab formatting for price alignment",
                "Include basic comments explaining the code"
            ]
        },
        difficult: {
            title: "Level 2 - Difficult Objectives",
            objectives: [
                "Implement error handling with try-catch",
                "Use proper string formatting with printf",
                "Add comprehensive JavaDoc comments",
                "Include menu items with proper numbering"
            ]
        }
    };

    function displayObjectives(difficulty) {
        try {
            // Update splash screen
            const splashLevel = document.getElementById('splashLevel');
            const splashDifficulty = document.getElementById('splashDifficulty');
            const selectedLevel = document.getElementById('selectedLevel');
            const selectedDifficulty = document.getElementById('selectedDifficulty');

            if (splashLevel) splashLevel.textContent = 'Level 2';
            if (splashDifficulty) splashDifficulty.textContent = difficulty;
            if (selectedLevel) selectedLevel.textContent = '2';
            if (selectedDifficulty) selectedDifficulty.textContent = difficulty;

            // Update objectives
            const objectivesContainer = document.querySelector('.objectives-container');
            if (!objectivesContainer) {
                console.error('Objectives container not found');
                return;
            }

            const difficultyData = objectivesData[difficulty.toLowerCase()];
            if (!difficultyData) {
                console.error('Invalid difficulty level:', difficulty);
                return;
            }

            const content = `
                <h3>${difficultyData.title}</h3>
                <ul>
                    ${difficultyData.objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
            `;
            objectivesContainer.innerHTML = content;

            // Hide splash screen after a delay
            setTimeout(() => {
                const splashScreen = document.getElementById('splashScreen');
                if (splashScreen) {
                    splashScreen.style.display = 'none';
                }
            }, 2000);

        } catch (error) {
            console.error('Error displaying objectives:', error);
        }
    }

    // Initialize objectives based on URL parameters
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const difficulty = urlParams.get('difficulty') || localStorage.getItem('selectedDifficulty') || 'easy';
        
        // Store the current difficulty
        localStorage.setItem('selectedDifficulty', difficulty);
        
        // Display objectives and update UI
        displayObjectives(difficulty);
    } catch (error) {
        console.error('Error initializing objectives:', error);
    }

    // Export function for use in other scripts
    window.displayObjectives = displayObjectives;
});