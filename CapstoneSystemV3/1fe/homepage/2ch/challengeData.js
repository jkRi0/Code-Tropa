// Function to switch language and reload appropriate resources
function switchLanguage(language) {
    // Switching to language
    
    // Remove all existing scripts first to prevent conflicts
    removeExistingScripts();
    
    // Wait a bit for scripts to be fully removed before loading new ones
    setTimeout(() => {
        // Get current level from localStorage
        const selectedData = localStorage.getItem('selectedChallenge');
        if (selectedData) {
            const data = JSON.parse(selectedData);
            const levelNumber = data.level.replace('lev', '');
            
            // Reload level scripts with new language
            loadLevelScripts(levelNumber, language);
            
            // Switch Monaco editor language
            switchMonacoLanguage(language);
            
            // Switch analysis grammar
            switchAnalysisGrammar(language);
            
            // Switch tips
            switchTips(language);
        }
    }, 50); // Small delay to ensure cleanup is complete
}

// Shared function to get default code for any language
window.getDefaultCode = function(language = 'java') {
    switch(language.toLowerCase()) {
        case 'c++':
        case 'cpp':
            return [
                '#include <iostream>',
                '',
                'int main() {',
                '    std::cout << "Hello C++!" << std::endl;',
                '    return 0;',
                '}'
            ].join('\n');
        case 'c#':
        case 'csharp':
            return [
                'using System;',
                '',
                'class Program {',
                '    static void Main() {',
                '        Console.WriteLine("Hello C#!");',
                '    }',
                '}'
            ].join('\n');
        case 'java':
        default:
            return [
                'public class MyClass {',
                '    public static void main(String[] args) {',
                '        System.out.println("Hello Java!");',
                '    }',
                '}'
            ].join('\n');
    }
}

// Shared function to get Monaco language identifier
window.getMonacoLanguage = function(language = 'java') {
    switch(language.toLowerCase()) {
        case 'c++':
        case 'cpp':
            return 'cpp';
        case 'c#':
        case 'csharp':
            return 'csharp';
        case 'java':
        default:
            return 'java';
    }
}

// Function to switch Monaco editor language
function switchMonacoLanguage(language) {
    if (window.editor) {
        const monacoLanguage = getMonacoLanguage(language);
        const defaultCode = getDefaultCode(language);
        
        window.monaco.editor.setModelLanguage(window.editor.getModel(), monacoLanguage);
        window.editor.setValue(defaultCode);
        // Monaco editor language switched
    } else {
        console.warn('Monaco editor not available yet, will be set when language is loaded');
    }
}

// Function to switch analysis grammar
function switchAnalysisGrammar(language) {
    // Remove existing grammar scripts (handled by removeExistingScripts)
    
    // Determine grammar folder
    let grammarFolder;
    switch(language.toLowerCase()) {
        case 'c++':
        case 'cpp':
            grammarFolder = '2cP/analysis_grammars';
            break;
        case 'c#':
        case 'csharp':
            grammarFolder = '3cS/analysis_grammars';
            break;
        case 'java':
        default:
            grammarFolder = '1j/analysis_grammars';
            break;
    }
    
    // Load new grammar script
    const grammarScript = document.createElement('script');
    grammarScript.type = 'module';
    grammarScript.src = `./${grammarFolder}/grammarLoader.js`;
    document.head.appendChild(grammarScript);
    
    // Analysis grammar switched
}

// Function to switch tips
function switchTips(language) {
    // Remove existing tips scripts (handled by removeExistingScripts)
    
    // Determine tips folder
    let tipsFolder;
    switch(language.toLowerCase()) {
        case 'c++':
        case 'cpp':
            tipsFolder = '2cP';
            break;
        case 'c#':
        case 'csharp':
            tipsFolder = '3cS';
            break;
        case 'java':
        default:
            tipsFolder = '1j';
            break;
    }
    
    // Load new tips script
    const tipsScript = document.createElement('script');
    tipsScript.src = `./${tipsFolder}/tips.js`;
    document.body.appendChild(tipsScript);
    
    // Tips switched
}

// Function to fetch and display current programming language
function fetchCurrentLanguage() {
    fetch('../../../2be/get_current_language.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const languageElement = document.getElementById('selectedLanguage');
            if (data.currentLanguage) {
                // Capitalize first letter and display
                const language = data.currentLanguage.charAt(0).toUpperCase() + data.currentLanguage.slice(1);
                languageElement.textContent = language;
                
                // Wait a bit for Monaco editor to be ready, then switch language
                setTimeout(() => {
                    switchLanguage(data.currentLanguage);
                }, 100);
            } else {
                languageElement.textContent = 'Not set';
            }
        })
        .catch(error => {
            console.error('Error fetching current language:', error);
            document.getElementById('selectedLanguage').textContent = 'Error loading';
        });
}

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
            
            // Fetch and display current programming language
            fetchCurrentLanguage();
            
            console.log('Loaded challenge data:', data);
            
            // Dynamically update the image source based on difficulty and level
            const imgContainer = document.querySelector('.image-container img');
            if (data.difficulty && data.level) {
                const difficultyUpper = data.difficulty.toUpperCase();
                const levelNumber = data.level.replace('lev', '');
                console.log(data.level+" "+difficultyUpper+" "+levelNumber);
                
                imgContainer.src = `./assets/${levelNumber}/${difficultyUpper}.png`;
                imgContainer.alt = `${data.level} - ${data.difficulty}`;
                console.log(`Updated image to: assets/${levelNumber}/${difficultyUpper}.png`);
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
            document.getElementById('selectedLanguage').textContent = 'No data available';
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
        document.getElementById('selectedLanguage').textContent = 'Error loading data';
        
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

// Add this function to handle dynamic script loading based on language
function loadLevelScripts(level, language = 'java') {
    // Note: removeExistingScripts() is called by the caller if needed
    
    // Determine the language folder
    let languageFolder;
    switch(language.toLowerCase()) {
        case 'c++':
        case 'cpp':
            languageFolder = '2cP';
            break;
        case 'c#':
        case 'csharp':
            languageFolder = '3cS';
            break;
        case 'java':
        default:
            languageFolder = '1j';
            break;
    }
    
    // Create and append new script elements with unique IDs
    const objectivesScript = document.createElement('script');
    const solutionsScript = document.createElement('script');
    
    objectivesScript.id = `objectives-${languageFolder}-lvl${level}`;
    solutionsScript.id = `solutions-${languageFolder}-lvl${level}`;
    
    objectivesScript.src = `${languageFolder}/lvl${level}/objectives.js`;
    solutionsScript.src = `${languageFolder}/lvl${level}/solutions.js`;
    
    objectivesScript.onload = () => {}; // Script loaded successfully
    objectivesScript.onerror = () => console.error(`Failed to load objectives script: ${objectivesScript.src}`);
    solutionsScript.onload = () => {}; // Script loaded successfully
    solutionsScript.onerror = () => console.error(`Failed to load solutions script: ${solutionsScript.src}`);
    
    document.body.appendChild(objectivesScript);
    document.body.appendChild(solutionsScript);
    
    // Scripts loaded successfully
}

function removeExistingScripts() {
    // Remove all dynamically loaded level scripts by ID pattern
    const levelScripts = document.querySelectorAll('script[id*="objectives-"], script[id*="solutions-"]');
    levelScripts.forEach(script => {
        script.remove();
    });
    
    // Also remove by src pattern as backup
    const levelScriptsBySrc = document.querySelectorAll('script[src*="lvl"]');
    levelScriptsBySrc.forEach(script => {
        if (!script.id || (!script.id.includes('objectives-') && !script.id.includes('solutions-'))) {
            script.remove();
        }
    });
    
    // Remove all dynamically loaded grammar scripts
    const grammarScripts = document.querySelectorAll('script[src*="analysis_grammars"]');
    grammarScripts.forEach(script => {
        script.remove();
    });
    
    // Remove all dynamically loaded tips scripts
    const tipsScripts = document.querySelectorAll('script[src*="tips.js"]');
    tipsScripts.forEach(script => {
        script.remove();
    });
    
    // Clear any existing global variables to prevent conflicts
    const globalVars = ['objectivesData', 'tahoSolutions', 'displayObjectives', 'examples'];
    globalVars.forEach(varName => {
        if (window[varName]) {
            window[varName] = undefined;
        }
    });
    
    // Force garbage collection if available
    if (window.gc) {
        window.gc();
    }
    
    // Scripts removed and variables cleared
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
        // Get current language
        const selectedLanguageSpan = document.getElementById('selectedLanguage');
        const language = selectedLanguageSpan ? selectedLanguageSpan.textContent.toLowerCase() : 'java';
        
        const result = window.compileCode(code, difficulty, language); // Pass difficulty and language
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