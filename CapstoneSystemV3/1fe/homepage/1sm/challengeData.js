// Function to switch language and reload appropriate resources
function switchLanguage(language) {
    // Switching to language
    
    // Remove all existing scripts first to prevent conflicts
    removeExistingScripts();
    
    // Wait a bit for scripts to be fully removed before loading new ones
    setTimeout(async () => {
        // Get current level/episode token from localStorage
        const selectedData = localStorage.getItem('selectedChallenge');
        if (selectedData) {
            const data = JSON.parse(selectedData);
            const levelToken = data.level; // e.g., "lev2" or "ep2"
            
            // Reload scripts with new language
            loadLevelScripts(levelToken, language);
            
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
    grammarScript.src = `../2ch/${grammarFolder}/grammarLoader.js`;
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
            document.getElementById('splashLevel').textContent = "CHALLENGE TIME!" || 'Unknown Level';
            document.getElementById('splashDifficulty').textContent = ("Episode "+splashLevelNumber[splashLevelNumber.length-1]) || 'Unknown Difficulty';
            
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
            
            // Load tips for the current language
            setTimeout(() => {
                const selectedLanguageSpan = document.getElementById('selectedLanguage');
                const currentLanguage = selectedLanguageSpan ? selectedLanguageSpan.textContent.toLowerCase() : 'java';
                switchTips(currentLanguage);
            }, 100);
            
            console.log('Loaded challenge data:', data);
            
            // Dynamically update the image source based on episode
            const imgContainer = document.querySelector('.image-container img');
            if (data.level) {
                // For storymode episodes, use specific bg.png from each episode
                if (data.level.startsWith('ep')) {
                    const episodeNumber = data.level.replace('ep', '');
                    
                    // Determine language folder based on current language
                    // Priority: localStorage > DOM element > default to java
                    let currentLanguage = localStorage.getItem('selectedLanguage');
                    if (!currentLanguage) {
                        const selectedLanguageSpan = document.getElementById('selectedLanguage');
                        currentLanguage = selectedLanguageSpan ? selectedLanguageSpan.textContent.toLowerCase() : 'java';
                    } else {
                        currentLanguage = currentLanguage.toLowerCase();
                    }
                    
                    // Normalize language value (handle variations)
                    if (currentLanguage === 'cpp' || currentLanguage === 'c++') {
                        currentLanguage = 'c++';
                    } else if (currentLanguage === 'csharp' || currentLanguage === 'c#' || currentLanguage === 'c #') {
                        currentLanguage = 'c#';
                    } else if (currentLanguage === 'java') {
                        currentLanguage = 'java';
                    }
                    
                    let languageFolder;
                    switch(currentLanguage) {
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
                    
                    imgContainer.src = `./${languageFolder}/ep${episodeNumber}/assets/bg.png`;
                    imgContainer.alt = `${data.level} - ${data.difficulty}`;
                    console.log(`Updated image to: ${languageFolder}/ep${episodeNumber}/assets/bg.png (language: ${currentLanguage})`);
                } 
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
function loadLevelScripts(levelOrEpisodeToken, language = 'java') {
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
    
    // Determine if token is episode (epN) or level (levN)
    const token = String(levelOrEpisodeToken || '').toLowerCase();
    const isEpisode = /^ep\d+$/.test(token);
    const number = parseInt(token.replace(/^(lev|ep)/, ''), 10) || 1;
    const basePath = isEpisode
        ? `${languageFolder}/ep${number}`
        : `${languageFolder}/lvl${number}`;

    // Create and append new script elements with unique IDs
    const objectivesScript = document.createElement('script');
    const solutionsScript = document.createElement('script');
    
    const idToken = isEpisode ? `ep${number}` : `lvl${number}`;
    objectivesScript.id = `objectives-${languageFolder}-${idToken}`;
    solutionsScript.id = `solutions-${languageFolder}-${idToken}`;
    
    objectivesScript.src = `${basePath}/objectives.js`;
    solutionsScript.src = `${basePath}/solutions.js`;
    
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
    const levelScriptsBySrc = document.querySelectorAll('script[src*="lvl"], script[src*="ep"]');
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
    
    console.log('=== DIFFICULTY DEBUG ===');
    console.log('Selected data from localStorage:', selectedData);
    console.log('Raw difficulty from selectedData:', selectedData ? selectedData.difficulty : 'null');
    
    const difficulty = selectedData ? selectedData.difficulty.toLowerCase() : 'easy'; // Default to 'easy' if not found
    console.log('Final difficulty value:', difficulty);
    console.log('=== END DIFFICULTY DEBUG ===');

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
            
            // Save progress (upsert by higher score)
            try {
                // Determine current level/episode from saved selection
                const levelStr = (selectedData && selectedData.level) ? selectedData.level : 'ep1';
                const points = Math.round(result.scoring.totalScore);
                const hasPassed = points >= 80;
                
                // Check if this is story mode (episode) or challenge mode (level)
                const isStoryMode = levelStr.startsWith('ep');
                
                if (isStoryMode) {
                    // Save story progress
                    const episodeNum = parseInt(levelStr.replace('ep', ''), 10) || 1;
                    const selectedLanguageSpan = document.getElementById('selectedLanguage');
                    const currentLanguage = selectedLanguageSpan ? selectedLanguageSpan.textContent.toLowerCase() : 'java';
                    
                    console.log('=== SAVING STORY PROGRESS DEBUG ===');
                    console.log('Episode:', episodeNum);
                    console.log('Language:', currentLanguage);
                    console.log('Points:', points);
                    console.log('Passed:', hasPassed);
                    console.log('Code length:', code.length);
                    
                    const storyProgressData = {
                        type: 'story',
                        language: currentLanguage,
                        chapter: 1, // Assuming chapter 1 for now
                        episode: episodeNum,
                        points: points,
                        passed: hasPassed
                    };
                    
                    fetch('../../../2be/save_story_progress.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: `type=${encodeURIComponent(storyProgressData.type)}&language=${encodeURIComponent(storyProgressData.language)}&chapter=${encodeURIComponent(storyProgressData.chapter)}&episode=${encodeURIComponent(storyProgressData.episode)}&points=${encodeURIComponent(storyProgressData.points)}&passed=${encodeURIComponent(storyProgressData.passed)}`
                    }).then(r => {
                        console.log('Save story progress response status:', r.status);
                        console.log('Save story progress response headers:', r.headers);
                        return r.text().then(text => {
                            console.log('Raw response text:', text);
                            try {
                                return JSON.parse(text);
                            } catch (e) {
                                console.error('Failed to parse JSON response:', e);
                                console.error('Response text:', text);
                                return { success: false, error: 'Invalid JSON response' };
                            }
                        });
                    }).then(data => {
                        console.log('Save story progress response data:', data);
                        console.log('Story progress success:', data.success);
                        console.log('Story progress ID:', data.progressId);
                        console.log('All response keys:', Object.keys(data));
                        console.log('Response type:', typeof data);
                        console.log('Is data an object:', typeof data === 'object');
                        
                        // Save story performance data if progress was saved successfully
                        if (data.success && data.progressId) {
                            console.log('Proceeding to save story performance data...');
                            const storyPerformanceData = {
                                progressId: data.progressId,
                                accuracy: hasPassed ? 40 : 0, // Simple accuracy based on pass/fail
                                efficiency: hasPassed ? 10 : 0, // Simple efficiency based on pass/fail
                                readability: hasPassed ? 30 : 0, // Simple readability based on pass/fail
                                timeTaken: 0, // Story mode doesn't track time yet
                                success: hasPassed ? 1 : 0,
                                failed: hasPassed ? 0 : 1
                            };
                            
                            console.log('=== SAVING STORY PERFORMANCE DEBUG ===');
                            console.log('Story performance data:', storyPerformanceData);
                            
                            fetch('../../../2be/save_performance.php', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                body: `progressId=${encodeURIComponent(storyPerformanceData.progressId)}&accuracy=${encodeURIComponent(storyPerformanceData.accuracy)}&efficiency=${encodeURIComponent(storyPerformanceData.efficiency)}&readability=${encodeURIComponent(storyPerformanceData.readability)}&timeTaken=${encodeURIComponent(storyPerformanceData.timeTaken)}&success=${encodeURIComponent(storyPerformanceData.success)}&failed=${encodeURIComponent(storyPerformanceData.failed)}`
                            }).then(perfResponse => {
                                console.log('Save story performance response status:', perfResponse.status);
                                return perfResponse.json();
                            }).then(perfData => {
                                console.log('Save story performance response data:', perfData);
                                
                                // Award badge if user passed the episode challenge
                                if (hasPassed) {
                                    console.log('=== AWARDING BADGE FOR EPISODE ===');
                                    console.log('Episode:', episodeNum);
                                    console.log('Points:', points);
                                    
                                    // Award badge based on episode number
                                    const badgeTier = `t${episodeNum}`;
                                    const badgeName = `b${episodeNum}`;
                                    
                                    fetch('../../../2be/award_badge.php', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                        body: `tier=${encodeURIComponent(badgeTier)}&badgeName=${encodeURIComponent(badgeName)}`
                                    }).then(badgeResponse => {
                                        console.log('Award badge response status:', badgeResponse.status);
                                        return badgeResponse.json();
                                    }).then(badgeData => {
                                        console.log('Award badge response data:', badgeData);
                                        console.log('Badge awarded successfully for episode', episodeNum);
                                        
                                        // Display badge congratulations
                                        displayBadgeCongratulations(episodeNum);
                                    }).catch(badgeErr => {
                                        console.error('Failed to award badge:', badgeErr);
                                    });
                                    console.log('=== END AWARDING BADGE FOR EPISODE ===');
                                }
                            }).catch(perfErr => {
                                console.error('Save story performance network error:', perfErr);
                            });
                            console.log('=== END SAVING STORY PERFORMANCE DEBUG ===');
                        } else {
                            console.log('Story progress not saved successfully, skipping performance data save');
                            console.log('Data success:', data.success);
                            console.log('Progress ID:', data.progressId);
                            console.log('Full response data:', data);
                        }
                    }).catch(err => {
                        console.error('Save story progress network error:', err);
                    });
                    console.log('=== END SAVING STORY PROGRESS DEBUG ===');
                } else {
                    // Save regular challenge progress (existing logic)
                    const levelNum = parseInt(levelStr.replace('lev', ''), 10) || 1;
                    
                    console.log('=== SAVING CHALLENGE PROGRESS DEBUG ===');
                    console.log('Level string:', levelStr);
                    console.log('Level number:', levelNum);
                    console.log('Difficulty:', difficulty);
                    console.log('Points:', points);
                    console.log('Code length:', code.length);
                    
                    fetch('../../../2be/save_challenge_progress.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: `difficulty=${encodeURIComponent(difficulty)}&level=${encodeURIComponent(levelNum)}&points=${encodeURIComponent(points)}&code=${encodeURIComponent(code)}`
                    }).then(r => {
                        console.log('Save progress response status:', r.status);
                        return r.json();
                    }).then(data => {
                        console.log('Save progress response data:', data);
                        
                        // Save performance data if progress was saved successfully
                        if (data.success && data.progressId) {
                            const performanceData = {
                                progressId: data.progressId,
                                accuracy: result.scoring.criteriaScores.accuracy || 0,
                                efficiency: result.scoring.criteriaScores.efficiency || 0,
                                readability: result.scoring.criteriaScores.readability || 0,
                                timeTaken: result.scoring.criteriaScores.time || 0,
                                success: points >= 80 ? 1 : 0, // 1 if passed (80+ points), 0 if failed
                                failed: points < 80 ? 1 : 0   // 1 if failed (<80 points), 0 if passed
                            };
                            
                            console.log('=== SAVING PERFORMANCE DEBUG ===');
                            console.log('Performance data:', performanceData);
                            
                            fetch('../../../2be/save_performance.php', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                body: `progressId=${encodeURIComponent(performanceData.progressId)}&accuracy=${encodeURIComponent(performanceData.accuracy)}&efficiency=${encodeURIComponent(performanceData.efficiency)}&readability=${encodeURIComponent(performanceData.readability)}&timeTaken=${encodeURIComponent(performanceData.timeTaken)}&success=${encodeURIComponent(performanceData.success)}&failed=${encodeURIComponent(performanceData.failed)}`
                            }).then(perfResponse => {
                                console.log('Save performance response status:', perfResponse.status);
                                return perfResponse.json();
                            }).then(perfData => {
                                console.log('Save performance response data:', perfData);
                            }).catch(perfErr => {
                                console.error('Save performance network error:', perfErr);
                            });
                            console.log('=== END SAVING PERFORMANCE DEBUG ===');
                        }
                    }).catch(err => {
                        console.error('Save progress network error:', err);
                    });
                    console.log('=== END SAVING CHALLENGE PROGRESS DEBUG ===');
                }
            } catch (e) {
                console.error('Error saving progress:', e);
            }

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

// Function to display badge congratulations
function displayBadgeCongratulations(episodeNum) {
    console.log('=== DISPLAYING BADGE CONGRATULATIONS ===');
    console.log('Episode:', episodeNum);
    
    const badgeContainer = document.getElementById('badgeContainer');
    const badgeImage = document.getElementById('badgeImage');
    const badgeMessage = document.getElementById('badgeMessage');
    
    if (badgeContainer && badgeImage && badgeMessage) {
        // Set badge image source
        badgeImage.src = `../../assets/b${episodeNum}.png`;
        badgeImage.alt = `Episode ${episodeNum} Badge`;
        
        // Set badge message
        badgeMessage.textContent = `You've earned the Episode ${episodeNum} Badge!`;
        
        // Show badge container
        badgeContainer.style.display = 'flex';
        
        console.log('Badge congratulations displayed for episode', episodeNum);
    } else {
        console.error('Badge display elements not found');
    }
    console.log('=== END DISPLAYING BADGE CONGRATULATIONS ===');
}

// Expose function to global scope
window.displayBadgeCongratulations = displayBadgeCongratulations;