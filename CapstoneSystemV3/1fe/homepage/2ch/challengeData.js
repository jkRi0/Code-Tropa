// Load and display selected challenge data from localStorage
function loadSelectedChallengeData() {
    try {
        const selectedData = localStorage.getItem('selectedChallenge');
        if (selectedData) {
            const data = JSON.parse(selectedData);
            const splashLevelNumber = data.level.replace('lev', 'level');
            
            // Update splash screen
            document.getElementById('splashLevel').textContent = splashLevelNumber || 'Unknown Level';
            document.getElementById('splashDifficulty').textContent = data.difficulty || 'Unknown Difficulty';
            
            // Update verification panel
    document.getElementById('selectedLevel').textContent = splashLevelNumber || 'Not available';
            document.getElementById('selectedDifficulty').textContent = data.difficulty || 'Not available';
            
            if (data.timestamp) {
                const date = new Date(data.timestamp);
                document.getElementById('selectedTime').textContent = date.toLocaleString();
            } else {
                document.getElementById('selectedTime').textContent = 'Not available';
            }
            
            console.log('Loaded challenge data:', data);
            
            // Dynamically update the image source based on difficulty and level
            const imgContainer = document.querySelector('.image-container img');
            if (data.difficulty && data.level) {
                const difficultyUpper = data.difficulty.toUpperCase();
                const levelNumber = data.level.replace('lev', 'lvl');
                console.log(data.level+" "+difficultyUpper+" "+levelNumber);
                imgContainer.src = `1j/${levelNumber}/assets/${difficultyUpper}.png`;
                imgContainer.alt = `${data.level} - ${data.difficulty}`;
                console.log(`Updated image to: ${levelNumber}/assets/${difficultyUpper}.png`);
            }
            
            // Start splash screen fade out after 2 seconds
            setTimeout(() => {
                const splashScreen = document.getElementById('splashScreen');
                splashScreen.classList.add('fade-out');
                
                // Hide splash screen completely after fade animation
                setTimeout(() => {
                    splashScreen.classList.add('hidden');
                }, 1000); // Wait for fade animation to complete
            }, 2000);
            
        } else {
            // Handle case where no data is available
            document.getElementById('splashLevel').textContent = 'No Data';
            document.getElementById('splashDifficulty').textContent = 'No Data';
            document.getElementById('selectedLevel').textContent = 'No data available';
            document.getElementById('selectedDifficulty').textContent = 'No data available';
            document.getElementById('selectedTime').textContent = 'No data Available';
            console.log('No challenge data found in localStorage');
            
            // Still fade out splash screen even with no data
            setTimeout(() => {
                const splashScreen = document.getElementById('splashScreen');
                splashScreen.classList.add('fade-out');
                setTimeout(() => {
                    splashScreen.classList.add('hidden');
                }, 1000);
            }, 2000);
        }
    } catch (error) {
        console.error('Error loading challenge data:', error);
        document.getElementById('splashLevel').textContent = 'Error';
        document.getElementById('splashDifficulty').textContent = 'Error';
        document.getElementById('selectedLevel').textContent = 'Error loading data';
        document.getElementById('selectedDifficulty').textContent = 'Error loading data';
        document.getElementById('selectedTime').textContent = 'Error loading data';
        
        // Still fade out splash screen on error
        setTimeout(() => {
            const splashScreen = document.getElementById('splashScreen');
            splashScreen.classList.add('fade-out');
            setTimeout(() => {
                splashScreen.classList.add('hidden');
            }, 1000);
        }, 2000);
    }
}

// Add this function to handle dynamic script loading
function loadLevelScripts(level) {
    // Remove existing level scripts if any
    removeExistingScripts();
    
    // Create and append new script elements
    const objectivesScript = document.createElement('script');
    const solutionsScript = document.createElement('script');
    
    objectivesScript.src = `1j/lvl${level}/objectives.js`;
    solutionsScript.src = `1j/lvl${level}/solutions.js`;
    
    document.body.appendChild(objectivesScript);
    document.body.appendChild(solutionsScript);
}

function removeExistingScripts() {
    const scripts = document.querySelectorAll('script[src*="lvl"]');
    scripts.forEach(script => script.remove());
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadSelectedChallengeData);

document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = '../index.html'; // Redirects to homepage
});

document.getElementById('submitCodeBtn').addEventListener('click', async function() {
    const code = window.editor.getValue(); // Assuming 'editor' is the global Monaco editor instance
    const selectedData = JSON.parse(localStorage.getItem('selectedChallenge'));
    const difficulty = selectedData ? selectedData.difficulty.toLowerCase() : 'easy'; // Default to 'easy' if not found

    window.showLoadingAnimation(); // Show loading animation

    // Simulate a delay for analysis and then hide loading and show results
    setTimeout(() => {
        const result = window.compileJavaCode(code, difficulty); // Pass difficulty
        window.hideLoadingAnimation(); // Hide loading animation

        if (result.scoring) {
            window.showScoringModal(result.scoring);
            
            // Get solution code for AI feedback
            const solutionCode = window.tahoSolutions[difficulty];
            
            // Get AI Feedback
            window.getGeminiFeedback(code, solutionCode, difficulty, result.scoring).then(feedback => {
                document.getElementById('geminiAiFeedback').textContent = feedback;
            }).catch(error => {
                console.error("Error getting Gemini feedback:", error);
                document.getElementById('geminiAiFeedback').textContent = "Failed to load AI feedback.";
            });
        } else {
            // Handle cases where scoring might not be available (e.g., compile errors)
            // For now, we can just show a message in the output terminal
            const outputTerminal = document.getElementById('outputTerminal');
            outputTerminal.style.color = '#ff0000'; // Make error message red
            outputTerminal.textContent = "❌ Scoring not available due to compilation issues or missing solution.";
            if (result.errors && result.errors.length > 0) {
                outputTerminal.textContent += "\nErrors: " + result.errors.map(err => err.title + " at line " + err.line).join("; ");
            }
        }
    }, 1500); // Simulate 1.5 seconds of analysis time
});