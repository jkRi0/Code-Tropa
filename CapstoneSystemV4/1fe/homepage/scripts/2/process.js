export let currentSelectedLanguage = ''; // New variable to track the selected language

export function setCurrentSelectedLanguage(language) {
    currentSelectedLanguage = language;
    // Also set it globally for easy access
    window.currentSelectedLanguage = language;
    console.log('Language selected:', language);
}

// Helper function to format time ago
function getTimeAgo(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'just now';
}

// Check for saved story mode games
function checkForSavedStoryGames(callback) {
    console.log('🔍 checkForSavedStoryGames called');
    const savedGames = [];
    
    // Check all episodes (ep1-ep7)
    for (let i = 1; i <= 7; i++) {
        const savedGameKey = `savedGame_ep${i}`;
        const savedGame = localStorage.getItem(savedGameKey);
        
        console.log(`  Checking ${savedGameKey}:`, savedGame ? 'Found' : 'Not found');
        
        if (savedGame) {
            try {
                const gameData = JSON.parse(savedGame);
                console.log(`  Parsed data for ${savedGameKey}:`, gameData);
                savedGames.push({
                    key: savedGameKey,
                    episode: `ep${i}`,
                    episodeNum: i,
                    scene: gameData.currentScene !== undefined ? gameData.currentScene : 0,
                    timestamp: gameData.timestamp
                });
            } catch (e) {
                console.error('❌ Error parsing saved game:', savedGameKey, e);
            }
        }
    }
    
    console.log('🔍 Checking for saved story games. Found:', savedGames.length);
    console.log('📋 All localStorage keys:', Object.keys(localStorage));
    console.log('📋 All localStorage keys with "savedGame":', Object.keys(localStorage).filter(k => k.includes('savedGame')));
    
    if (savedGames.length > 0) {
        // Find the most recent saved game
        savedGames.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const mostRecent = savedGames[0];
        const savedDate = new Date(mostRecent.timestamp);
        const timeAgo = getTimeAgo(savedDate);
        
        const message = savedGames.length === 1
            ? `You have a saved game from ${timeAgo}.\n\nEpisode ${mostRecent.episodeNum}\nScene ${mostRecent.scene + 1}\n\nDo you want to continue from where you left off?`
            : `You have ${savedGames.length} saved game${savedGames.length > 1 ? 's' : ''}.\n\nMost recent: Episode ${mostRecent.episodeNum}, Scene ${mostRecent.scene + 1} (${timeAgo})\n\nDo you want to continue from where you left off?`;
        
        console.log('📢 Showing continue popup for story mode');
        const shouldContinue = confirm(message);
        
        if (shouldContinue) {
            // Store continue flag for the most recent episode
            localStorage.setItem(`continueGame_${mostRecent.episode}`, 'true');
            console.log('✅ Continue flag set for:', mostRecent.episode);
            
            // Get language for path construction
            const language = localStorage.getItem('selectedLanguage') || 'java';
            const languageMap = {
                'java': '1j',
                'c++': '2cP',
                'cpp': '2cP',
                'c#': '3cS',
                'csharp': '3cS'
            };
            const langFolder = languageMap[language.toLowerCase()] || '1j';
            const redirectPath = `1sm/${langFolder}/${mostRecent.episode}/index.html`;
            
            console.log('🚀 Redirecting to:', redirectPath);
            
            // Redirect immediately
            window.location.href = redirectPath;
            
            // Don't show the modal, redirect instead
            return;
        }
        // If user chose "Start Fresh", just proceed without deleting saved games
    }
    
    // Only show modal if no continue action was taken
    if (callback) callback();
}

// Check for saved challenge games
function checkForSavedChallengeGames(callback) {
    // Check selectedChallenge for saved game
    const selectedData = localStorage.getItem('selectedChallenge');
    
    if (selectedData) {
        try {
            const data = JSON.parse(selectedData);
            
            // Check if there's a saved game (has code and saved flag)
            if (data.saved && data.code && data.level) {
                const levelNum = data.level.replace('lev', '');
                const savedDate = new Date(data.timestamp);
                const timeAgo = getTimeAgo(savedDate);
                
                const message = `You have a saved game from ${timeAgo}.\n\nLevel ${levelNum}\nDifficulty: ${data.difficulty || 'unknown'}\n\nDo you want to continue from where you left off?`;
                
                console.log('📢 Showing continue popup for challenge mode');
                const shouldContinue = confirm(message);
                
                if (shouldContinue) {
                    // Store continue flag for the level
                    localStorage.setItem(`continueGame_${data.level}`, 'true');
                    console.log('✅ Continue flag set for:', data.level);
                    
                    // Automatically select the level, set difficulty, and redirect
                    setTimeout(() => {
                        // Select the level in the UI
                        const levelButton = Array.from(document.querySelectorAll('.outer2-3'))
                            .find(btn => {
                                const inner = btn.querySelector('.inner1-3');
                                return inner && inner.textContent.trim() === `Level ${levelNum}`;
                            });
                        
                        if (levelButton && window.process3) {
                            window.process3(levelButton, data.level);
                            window.currentSelectedLevel = data.level;
                        }
                        
                        // Set difficulty and redirect
                        setTimeout(() => {
                            // Map difficulty back to frontend format
                            const difficultyMapping = {
                                'easy': 'EASY',
                                'average': 'AVERAGE',
                                'difficult': 'DIFFICULT'
                            };
                            const frontendDifficulty = difficultyMapping[(data.difficulty || 'easy').toLowerCase()] || 'EASY';
                            
                            // Set the difficulty
                            window.currentSelectedDifficulty = frontendDifficulty;
                            
                            // Redirect to challenge page (selectedChallenge already has the saved data)
                            window.location.href = '2ch/index.html';
                        }, 300);
                    }, 100);
                    
                    // Don't show the modal, redirect instead
                    return;
                }
                // If user chose "Start Fresh", just proceed without clearing saved game
            }
        } catch (e) {
            console.error('Error parsing selectedChallenge:', e);
        }
    }
    
    // Only show modal if no continue action was taken
    if (callback) callback();
}

export function process(clickedDiv, type) {
    const menuContainer = document.querySelector('.menu-container');
    const mainContentWrapper = document.querySelector('.main-content-wrapper');

    if (menuContainer && mainContentWrapper && menuContainer.classList.contains('open')) {
        menuContainer.classList.remove('open');
        mainContentWrapper.classList.remove('menu-open');
    }
// Reset all .outer2 divs
    document.querySelectorAll('.outer2').forEach(div => {
        // Reset their inner1 styles too (optional)
        const inner = div.querySelector('.outer1');
        if (inner) {
        inner.style.backgroundColor = ""; // reset style
        inner.style.color = ""; // reset style
        }
    });
    // Change style of clicked div's inner1
    const targetInner = clickedDiv.querySelector('.outer1');
    if (targetInner) {
        targetInner.style.backgroundColor = "rgb(163, 109, 47)"; // or any other style
        targetInner.style.color = "black"; // or any other style
    }

    if (type === 'programmingLanguage') {
        const plSelection = document.querySelector('.pl-selection-back1');
        if (plSelection) {
            plSelection.style.visibility = 'visible';
            plSelection.style.opacity = '1';

            // Fetch and highlight the currently saved language (green highlight)
            fetch('../../2be/get_current_language.php')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const currentLanguage = data.currentLanguage.toLowerCase();
                    console.log('Current Language from session (process.js):', currentLanguage); // Debug log
                    
                    // Set the global language variable
                    setCurrentSelectedLanguage(currentLanguage);
                    
                    // Store the current language in localStorage
                    if (currentLanguage && currentLanguage !== 'null' && currentLanguage !== 'undefined') {
                        localStorage.setItem('selectedLanguage', currentLanguage);
                        console.log('Language stored in localStorage:', currentLanguage);
                    }
                    
                    document.querySelectorAll('.outer2-2').forEach(div => {
                        div.classList.remove('active-language'); // Remove persistent highlight
                        div.classList.remove('temporary-selected'); // Remove temporary highlight
                        const langText = div.querySelector('.inner1-2').textContent.trim().toLowerCase();
                        // console.log('Comparing ', langText, ' with ', currentLanguage); // Debug log
                        if (langText === currentLanguage) {
                            div.classList.add('active-language'); // Add persistent green highlight
                            console.log('Added active-language to:', langText); // Debug log
                        }
                    });
                })
                .catch(error => console.error('Error fetching current language:', error));
        }
    }else if(type === 'storyMode'){
        console.log('🔵 Story Mode button clicked');
        // Check for saved story mode games FIRST, then show modal
        checkForSavedStoryGames(() => {
            console.log('🔵 checkForSavedStoryGames callback executed');
            // Show modal after check is complete
            const difSelection = document.querySelector('.sm-back1');
            if (difSelection) {
                console.log('✅ Showing story mode selection modal');
                difSelection.style.visibility = 'visible';
                difSelection.style.opacity = '1';
            } else {
                console.error('❌ Story mode selection element not found!');
            }
        });
    }else if(type === 'challenges'){
        // Check for saved challenge games FIRST, then show modal
        checkForSavedChallengeGames(() => {
            // Show modal after check is complete
            const difSelection = document.querySelector('.ch-back1');
            if (difSelection) {
                difSelection.style.visibility = 'visible';
                difSelection.style.opacity = '1';
            }
        });
    }else if(type === 'leaderboard'){
        const difSelection = document.querySelector('.lb-back1');
        if (difSelection) {
            difSelection.style.visibility = 'visible';
            difSelection.style.opacity = '1';
        }
    }else if(type === 'setting'){
        const difSelection = document.querySelector('.se-back1');
        if (difSelection) {
            difSelection.style.visibility = 'visible';
            difSelection.style.opacity = '1';
        }
    }
}
