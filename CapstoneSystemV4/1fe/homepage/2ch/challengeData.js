/**
 * Detect if we're in Story Mode or Challenge Mode
 * Story Mode: levels start with "ep" (ep1, ep2, etc.)
 * Challenge Mode: levels start with "lev" (lev1, lev2, etc.)
 * 
 * This allows the same challengeData.js to work for both modes
 */
function detectMode() {
    try {
        const selectedData = localStorage.getItem('selectedChallenge');
        if (selectedData) {
            const data = JSON.parse(selectedData);
            if (data.level && data.level.startsWith('ep')) {
                return 'story';
            }
        }
    } catch (e) {
        console.warn('Could not detect mode, defaulting to challenge mode');
    }
    return 'challenge'; // Default to challenge mode
}

// Function to switch language and reload appropriate resources
function switchLanguage(language) {
    // Update language display immediately
    const languageElement = document.getElementById('selectedLanguage');
    if (languageElement) {
        const displayLanguage = language.charAt(0).toUpperCase() + language.slice(1);
        languageElement.textContent = displayLanguage;
    }
    
    // Remove all existing scripts first to prevent conflicts
    removeExistingScripts();
    
    // Wait a bit for scripts to be fully removed before loading new ones
    setTimeout(async () => {
        // Get current level/episode from localStorage
        const selectedData = localStorage.getItem('selectedChallenge');
        if (selectedData) {
            const data = JSON.parse(selectedData);
            // STORY MODE: Handle episode tokens (ep1, ep2, etc.)
            // CHALLENGE MODE: Handle level tokens (lev1, lev2, etc.)
            const levelOrEpisodeToken = data.level; // Keep full token (ep1 or lev1)
            
            // Reload level/episode scripts with new language
            loadLevelScripts(levelOrEpisodeToken, language);
            
            // Switch Monaco editor language (with retry if editor not ready)
            switchMonacoLanguage(language);
            
            // Switch analysis grammar
            switchAnalysisGrammar(language);
            
            // Switch tips
            switchTips(language);
        }
    }, 50); // Small delay to ensure cleanup is complete
}

// Shared function to get default code for any language
window.getDefaultCode = function(language) {
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
window.getMonacoLanguage = function(language) {
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
    // Use iframe communication if available, otherwise fall back to direct access
    if (window.setEditorLanguage) {
        window.setEditorLanguage(language);
        console.log(`Monaco editor switched to ${language} (via iframe)`);
    } else if (window.editor && window.monaco) {
        // Fallback for direct editor access (if not using iframe)
        const monacoLanguage = getMonacoLanguage(language);
        const defaultCode = getDefaultCode(language);
        window.monaco.editor.setModelLanguage(window.editor.getModel(), monacoLanguage);
        window.editor.setValue(defaultCode);
        console.log(`Monaco editor switched to ${language}`);
    } else {
        // If editor not ready, wait for it with retries
        let retries = 0;
        const maxRetries = 50; // 5 seconds max wait
        const checkEditor = setInterval(() => {
            if (window.setEditorLanguage) {
                window.setEditorLanguage(language);
                console.log(`Monaco editor switched to ${language} (via iframe, after wait)`);
                clearInterval(checkEditor);
            } else if (window.editor && window.monaco) {
                const monacoLanguage = getMonacoLanguage(language);
                const defaultCode = getDefaultCode(language);
                window.monaco.editor.setModelLanguage(window.editor.getModel(), monacoLanguage);
                window.editor.setValue(defaultCode);
                console.log(`Monaco editor switched to ${language} (after wait)`);
                clearInterval(checkEditor);
            } else if (retries >= maxRetries) {
                console.warn('Monaco editor not available after waiting, language switch may not have occurred');
                clearInterval(checkEditor);
            }
            retries++;
        }, 100); // Check every 100ms
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
    
    // STORY MODE: Load from challenge mode directory (../2ch/)
    // CHALLENGE MODE: Load from current directory (./)
    const isStoryMode = detectMode() === 'story';
    const basePath = isStoryMode ? '../2ch' : '.';
    
    // Load new grammar script
    const grammarScript = document.createElement('script');
    grammarScript.type = 'module';
    grammarScript.src = `${basePath}/${grammarFolder}/grammarLoader.js`;
    
    // Wait for the script to load and ANTLR4 to be ready
    grammarScript.onload = async function() {
        try {
            // Wait for ANTLR4 to finish loading
            if (window.antlr4LoadPromise) {
                await window.antlr4LoadPromise;
                console.log('Grammar analysis system ready for', language);
            } else {
                // Fallback: wait a bit and check again
                let attempts = 0;
                while (!window.antlr4Ready && attempts < 50) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    attempts++;
                }
                if (window.antlr4Ready) {
                    console.log('Grammar analysis system ready for', language);
                } else {
                    console.warn('Grammar analysis system failed to load for', language);
                }
            }
        } catch (error) {
            console.error('Error waiting for ANTLR4:', error);
        }
    };
    
    grammarScript.onerror = function(error) {
        console.error('Failed to load grammar script:', error);
        console.error('Attempted to load from:', grammarScript.src);
    };
    
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
    
    // STORY MODE: Load from story mode directory (./)
    // CHALLENGE MODE: Load from challenge mode directory (./)
    // Note: Tips are in the same directory structure for both modes
    const isStoryMode = detectMode() === 'story';
    const basePath = isStoryMode ? '.' : '.';
    
    // Load new tips script
    const tipsScript = document.createElement('script');
    tipsScript.src = `${basePath}/${tipsFolder}/tips.js`;
    document.body.appendChild(tipsScript);
    
    // Tips switched
}

// Function to fetch and display current programming language from localStorage
function fetchCurrentLanguage() {
    const languageElement = document.getElementById('selectedLanguage');
    
    // Get language from localStorage, default to 'java' if not set
    let currentLanguage = localStorage.getItem('selectedLanguage') || 'java';
    
    // Normalize the language value (handle variations)
    currentLanguage = currentLanguage.toLowerCase().trim();
    
    // Handle common variations
    if (currentLanguage === 'cpp' || currentLanguage === 'c++') {
        currentLanguage = 'c++';
    } else if (currentLanguage === 'csharp' || currentLanguage === 'c#' || currentLanguage === 'c #') {
        currentLanguage = 'c#';
    } else if (currentLanguage === 'java') {
        currentLanguage = 'java';
    } else {
        // If language is not recognized, default to java
        currentLanguage = 'java';
    }
    
    // Capitalize first letter and display
    const displayLanguage = currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1);
    languageElement.textContent = displayLanguage;
    
    // Wait a bit for Monaco editor to be ready, then switch language
    setTimeout(() => {
        switchLanguage(currentLanguage);
    }, 100);
}

// Load and display selected challenge data from localStorage
function loadSelectedChallengeData() {
    try {
        const selectedData = localStorage.getItem('selectedChallenge');
        if (selectedData) {
            const data = JSON.parse(selectedData);
            const isStoryMode = detectMode();
            
            // STORY MODE: Display episode information
            // CHALLENGE MODE: Display level information
            let splashLevelNumber, displayLevel;
            if (isStoryMode) {
                const episodeNum = data.level.replace('ep', '');
                splashLevelNumber = `Episode ${episodeNum}`;
                displayLevel = `Episode ${episodeNum}`;
            } else {
                splashLevelNumber = data.level.replace('lev', 'level');
                displayLevel = splashLevelNumber;
            }
            
            // Update splash screen
            if (isStoryMode) {
                document.getElementById('splashLevel').textContent = "CHALLENGE TIME!" || 'Unknown Level';
                document.getElementById('splashDifficulty').textContent = splashLevelNumber || 'Unknown Difficulty';
            } else {
                document.getElementById('splashLevel').textContent = splashLevelNumber || 'Unknown Level';
                document.getElementById('splashDifficulty').textContent = data.difficulty || 'Unknown Difficulty';
            }
            
            // Update verification panel
            document.getElementById('selectedLevel').textContent = displayLevel || 'Not available';
            document.getElementById('selectedDifficulty').textContent = data.difficulty || 'Not available';
            
            if (data.timestamp) {
                const date = new Date(data.timestamp);
                document.getElementById('selectedTime').textContent = date.toLocaleString();
            } else {
                document.getElementById('selectedTime').textContent = 'Not available';
            }
            
            // Fetch and display current programming language
            fetchCurrentLanguage();
            
            // Load tips for the current language (story mode specific, but safe for challenge mode too)
            setTimeout(() => {
                const selectedLanguageSpan = document.getElementById('selectedLanguage');
                const currentLanguage = selectedLanguageSpan ? selectedLanguageSpan.textContent.toLowerCase() : 'java';
                switchTips(currentLanguage);
            }, 100);
            
            console.log('Loaded challenge data:', data);
            
            // Dynamically update the image source based on mode
            const imgContainer = document.querySelector('.image-container img');
            if (data.level) {
                // Check mode directly from data.level (more reliable than isStoryMode constant)
                const isStoryModeCheck = data.level.startsWith('ep');
                
                // STORY MODE: Use episode-specific bg.png from each episode folder
                if (isStoryModeCheck) {
                    const episodeNumber = data.level.replace('ep', '');
                    
                    // Determine language folder based on current language
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
                    
                    // STORY MODE: Use episode-specific image path
                    imgContainer.src = `../1sm/${languageFolder}/ep${episodeNumber}/assets/bg.png`;
                    imgContainer.alt = `${data.level} - ${data.difficulty}`;
                    console.log(`Updated image to: ../1sm/${languageFolder}/ep${episodeNumber}/assets/bg.png (language: ${currentLanguage})`);
                } 
                // CHALLENGE MODE: Use difficulty-based image path
                else if (data.level.startsWith('lev') && data.difficulty) {
                    const difficultyImageMapping = {
                        'easy': 'EASY',
                        'average': 'AVERAGE',
                        'difficult': 'DIFFICULT'
                    };
                    
                    const difficultyImageName = difficultyImageMapping[data.difficulty] || 'EASY';
                    const levelNumber = data.level.replace('lev', '');
                    console.log(data.level+" "+difficultyImageName+" "+levelNumber);
                    
                    imgContainer.src = `./assets/${levelNumber}/${difficultyImageName}.png`;
                    imgContainer.alt = `${data.level} - ${data.difficulty}`;
                    console.log(`Updated image to: assets/${levelNumber}/${difficultyImageName}.png`);
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

/**
 * Add this function to handle dynamic script loading based on language
 * 
 * STORY MODE: Handles episode tokens (ep1, ep2, etc.) - loads from ../1sm/{languageFolder}/ep{N}/
 * CHALLENGE MODE: Handles level tokens (lev1, lev2, etc.) - loads from {languageFolder}/lvl{N}/
 */
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
    
    // STORY MODE: Load from story mode episode folders
    // CHALLENGE MODE: Load from challenge mode level folders
    const basePath = isEpisode
        ? `../1sm/${languageFolder}/ep${number}`
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
    // Remove all dynamically loaded level/episode scripts by ID pattern
    const levelScripts = document.querySelectorAll('script[id*="objectives-"], script[id*="solutions-"]');
    levelScripts.forEach(script => {
        script.remove();
    });
    
    // Also remove by src pattern as backup (handles both lvl and ep patterns)
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
    // Check submission time before processing
    const editorIframe = document.getElementById('monaco-editor-iframe');
    const selectedData = JSON.parse(localStorage.getItem('selectedChallenge'));
    // Get difficulty - handle both localStorage and DOM element
    let difficulty = 'easy';
    if (selectedData && selectedData.difficulty) {
        difficulty = selectedData.difficulty.toLowerCase().trim();
    } else {
        // Fallback: try to get from DOM
        const selectedDifficultySpan = document.getElementById('selectedDifficulty');
        if (selectedDifficultySpan) {
            difficulty = selectedDifficultySpan.textContent.toLowerCase().trim();
        }
    }
    
    console.log('[Anti-Cheat] Checking submission for difficulty:', difficulty);
    
    // Request submission check from editor iframe
    let submissionCheckResult = null;
    if (editorIframe && editorIframe.contentWindow) {
        // Send check request and wait for response
        const checkPromise = new Promise((resolve) => {
            const handler = function(event) {
                if (event.data.type === 'submission-check-result') {
                    window.removeEventListener('message', handler);
                    resolve(event.data.result);
                }
            };
            window.addEventListener('message', handler);
            editorIframe.contentWindow.postMessage({ 
                type: 'check-submission',
                difficulty: difficulty
            }, '*');
            
            // Timeout after 1 second
            setTimeout(() => {
                window.removeEventListener('message', handler);
                resolve(null);
            }, 1000);
        });
        
        submissionCheckResult = await checkPromise;
        
        if (submissionCheckResult && submissionCheckResult.isSuspicious) {
            console.warn('[Anti-Cheat] Fast submission detected:', submissionCheckResult.reason);
            // Warning is already shown by the editor iframe
        }
    }
    
    // Get code from iframe editor or fallback to direct access
    let code;
    if (window.getEditorCode) {
        code = await window.getEditorCode();
    } else if (window.editor) {
        code = window.editor.getValue();
    } else {
        console.error('Editor not available');
        return;
    }
    
    console.log('=== DIFFICULTY DEBUG ===');
    console.log('Selected data from localStorage:', selectedData);
    console.log('Raw difficulty from selectedData:', selectedData ? selectedData.difficulty : 'null');
    
    console.log('Final difficulty value:', difficulty);
    console.log('=== END DIFFICULTY DEBUG ===');

    window.showLoadingAnimation(); // Show loading animation

    // Simulate a delay for analysis and then hide loading and show results
    setTimeout(async () => {
        // Get current language
        const selectedLanguageSpan = document.getElementById('selectedLanguage');
        const language = selectedLanguageSpan ? selectedLanguageSpan.textContent.toLowerCase() : 'java';
        
        const result = await window.compileCode(code, difficulty, language); // Pass difficulty and language
        window.hideLoadingAnimation(); // Hide loading animation

        // Get solution code
        const solutionCode = window.tahoSolutions && window.tahoSolutions[difficulty] ? window.tahoSolutions[difficulty] : null;
        
        // Calculate scoring if compilation succeeded and solution exists
        let scoring = null;
        if (result.success && solutionCode && typeof window.calculateScore === 'function') {
            // Get outputs by executing both codes
            let submittedOutput = result.output || '';
            let solutionOutput = '';
            
            // Try to get outputs from code execution
            if (typeof window.simulateCode === 'function') {
                try {
                    // Get submitted code output
                    const submittedResult = await window.simulateCode(code, language);
                    if (submittedResult && typeof submittedResult === 'string') {
                        submittedOutput = submittedResult;
                    } else if (submittedResult && submittedResult.outputs) {
                        submittedOutput = submittedResult.outputs.join('\n');
                    }
                    
                    // Get solution code output
                    const solutionResult = await window.simulateCode(solutionCode, language);
                    if (solutionResult && typeof solutionResult === 'string') {
                        solutionOutput = solutionResult;
                    } else if (solutionResult && solutionResult.outputs) {
                        solutionOutput = solutionResult.outputs.join('\n');
                    }
                } catch (e) {
                    console.warn('Could not execute codes for output comparison:', e);
                }
            }
            
            // Calculate score
            scoring = window.calculateScore(
                code,
                solutionCode,
                difficulty,
                submittedOutput,
                solutionOutput
            );
        }

        if (scoring) {
            // Add scoring to result object for consistency
            result.scoring = scoring;
            
            window.showScoringModal(scoring);
            
            // Save progress (upsert by higher score)
            try {
                // Determine current level/episode from saved selection
                const levelStr = (selectedData && selectedData.level) ? selectedData.level : (detectMode() === 'story' ? 'ep1' : 'lev1');
                const points = Math.round(result.scoring.totalScore);
                const hasPassed = points >= 80;
                
                // Check if this is story mode (episode) or challenge mode (level)
                const isStoryMode = levelStr.startsWith('ep');
                
                if (isStoryMode) {
                    // STORY MODE: Save story progress
                    const episodeNum = parseInt(levelStr.replace('ep', ''), 10) || 1;
                    const selectedLanguageSpan = document.getElementById('selectedLanguage');
                    const currentLanguage = selectedLanguageSpan ? selectedLanguageSpan.textContent.toLowerCase() : 'java';
                    
                    // Convert global episode number to chapter and local episode
                    // Episodes 1-3 → Chapter 1 (episodes 1, 2, 3)
                    // Episodes 4-5 → Chapter 2 (episodes 1, 2)
                    // Episodes 6-7 → Chapter 3 (episodes 1, 2)
                    let chapter, localEpisode;
                    if (episodeNum <= 3) {
                        chapter = 1;
                        localEpisode = episodeNum;
                    } else if (episodeNum <= 5) {
                        chapter = 2;
                        localEpisode = episodeNum - 3;
                    } else {
                        chapter = 3;
                        localEpisode = episodeNum - 5;
                    }
                    
                    console.log('=== SAVING STORY PROGRESS DEBUG ===');
                    console.log('Global Episode:', episodeNum);
                    console.log('Chapter:', chapter);
                    console.log('Local Episode:', localEpisode);
                    console.log('Language:', currentLanguage);
                    console.log('Points:', points);
                    console.log('Passed:', hasPassed);
                    console.log('Code length:', code.length);
                    
                    const storyProgressData = {
                        type: 'story',
                        language: currentLanguage,
                        chapter: chapter,
                        episode: localEpisode,
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
                                
                                // STORY MODE: Award badge if user passed the episode challenge
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
                        }
                    }).catch(err => {
                        console.error('Save story progress network error:', err);
                    });
                    console.log('=== END SAVING STORY PROGRESS DEBUG ===');
                } else {
                    // CHALLENGE MODE: Save regular challenge progress
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
            window.getGeminiFeedback(code, solutionCode, difficulty, result.scoring).then(result => {
                // Handle both string feedback and object with feedback/apiError
                const feedback = typeof result === 'string' ? result : result.feedback;
                const apiError = typeof result === 'object' && result.apiError ? result.apiError : null;
                const errors = typeof result === 'object' && result.errors ? result.errors : null;
                
                // Update feedback display (exists in both story and challenge modes)
                const feedbackDiv = document.getElementById('geminiAiFeedback');
                if (feedbackDiv) {
                    feedbackDiv.textContent = feedback;
                } else {
                    console.warn('geminiAiFeedback element not found');
                }
                
                // Show or hide error message (only exists in challenge mode, optional in story mode)
                const errorDiv = document.getElementById('geminiApiError');
                if (errorDiv) {
                    if (apiError) {
                        let errorMessage = `⚠️ Gemini API Error. Using heuristic feedback.`;
                        if (errors && errors.length > 0) {
                            const triedModels = errors.map(e => e.model).join(', ');
                            errorMessage += `\nTried models: ${triedModels}`;
                            console.log('Models tried:', triedModels);
                            console.log('Model errors:', errors);
                        }
                        errorDiv.textContent = errorMessage;
                        console.log('API Error:', apiError);
                        errorDiv.style.display = 'block';
                    } else {
                        errorDiv.style.display = 'none';
                    }
                } else if (apiError) {
                    // Story mode: log error to console if error div doesn't exist
                    console.warn('Gemini API Error (using heuristic feedback):', apiError);
                    if (errors && errors.length > 0) {
                        console.warn('Tried models:', errors.map(e => e.model).join(', '));
                    }
                }
            }).catch(error => {
                console.error("Error getting Gemini feedback:", error);
                const feedbackDiv = document.getElementById('geminiAiFeedback');
                if (feedbackDiv) {
                    feedbackDiv.textContent = "Failed to load AI feedback.";
                }
                
                const errorDiv = document.getElementById('geminiApiError');
                if (errorDiv) {
                    errorDiv.textContent = `⚠️ Error: ${error.message || "Unknown error occurred"}`;
                    errorDiv.style.display = 'block';
                } else {
                    // Story mode: log error to console if error div doesn't exist
                    console.error('Failed to load AI feedback:', error.message || "Unknown error occurred");
                }
            });
        } else {
            // Handle cases where scoring might not be available
            const outputTerminal = document.getElementById('outputTerminal');
            outputTerminal.style.color = '#ff0000'; // Make error message red
            
            if (!result.success) {
                // Compilation errors
                outputTerminal.textContent = "❌ Compilation errors found. Please fix the errors before scoring.";
                if (result.errors && result.errors.length > 0) {
                    outputTerminal.textContent += "\nErrors: " + result.errors.map(err => err.title + " at line " + err.line).join("; ");
                }
            } else if (!solutionCode) {
                // Missing solution
                outputTerminal.textContent = "❌ Scoring not available: Solution code not found for this difficulty level.";
            } else {
                // Other issues
                outputTerminal.textContent = "❌ Scoring not available. Please try again.";
            }
        }
    }, 1500); // Simulate 1.5 seconds of analysis time
});

/**
 * Function to display badge congratulations (STORY MODE ONLY)
 * This function is called when a user passes an episode and earns a badge
 * 
 * @param {number} episodeNum - The episode number (1-7)
 */
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

// Expose function to global scope (for story mode badge display)
window.displayBadgeCongratulations = displayBadgeCongratulations;