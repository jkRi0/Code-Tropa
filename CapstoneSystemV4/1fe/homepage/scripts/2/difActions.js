// import { currentSelectedDifficulty } from "../routeModules.js";

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

export function difActions(action){
    if(action=="play"){
        // Find the currently visible episode level
        let currentLevel = 'lev1'; // default
        for(let i=1; i<=20; i++){
            const levelDiv = document.querySelector('.lev'+i);
            if(levelDiv && levelDiv.style.display !== 'none' && levelDiv.style.display !== ''){
                currentLevel = 'lev'+i;
                break;
            }
        }
        
        // Store the current level globally
        window.currentSelectedLevel = currentLevel;
        console.log("Selected Level: ", currentLevel);
        
        const plSelection = document.querySelector('.dif-selection-back1');
        if (plSelection) {
            plSelection.style.visibility = 'visible';
            plSelection.style.opacity = '1';
        }
    }else if(action=="ok"){
        console.log("Checking difficulty. Current selected: ", window.currentSelectedDifficulty);
        if (window.currentSelectedDifficulty) {
            // Map frontend difficulty values to backend expected values
            const difficultyMapping = {
                'EASY': 'easy',
                'AVERAGE': 'average', 
                'DIFFICULT': 'difficult'
            };
            
            const mappedDifficulty = difficultyMapping[window.currentSelectedDifficulty] || 'easy';
            
            // Check for saved game before starting
            const savedGameKey = `savedGame_${window.currentSelectedLevel}`;
            const savedGame = localStorage.getItem(savedGameKey);
            
            if (savedGame) {
                try {
                    const gameData = JSON.parse(savedGame);
                    const savedDate = new Date(gameData.timestamp);
                    const timeAgo = getTimeAgo(savedDate);
                    
                    const shouldContinue = confirm(
                        `You have a saved game from ${timeAgo}.\n\n` +
                        `Level: ${gameData.level || window.currentSelectedLevel}\n` +
                        `Difficulty: ${gameData.difficulty || mappedDifficulty}\n\n` +
                        `Do you want to continue from where you left off?`
                    );
                    
                    if (shouldContinue) {
                        // Store continue flag for the level to load
                        localStorage.setItem(`continueGame_${window.currentSelectedLevel}`, 'true');
                    } else {
                        // Clear saved game if user chooses to start fresh
                        const clearSave = confirm('Do you want to delete the saved game?');
                        if (clearSave) {
                            localStorage.removeItem(savedGameKey);
                        }
                    }
                } catch (e) {
                    console.error('Error parsing saved game:', e);
                }
            }
            
            // Save to localStorage
            const selectedData = {
                level: window.currentSelectedLevel,
                difficulty: mappedDifficulty,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('selectedChallenge', JSON.stringify(selectedData));
            console.log("Saved to localStorage:", selectedData);
            
            // Redirect to the challenge page
            window.location.href = '2ch/index.html';
        } else {
            alert("Please select a difficulty before proceeding!");
        }
    }else if(action=="back"){
        const difSelection = document.querySelector('.dif-selection-back1');
        if (difSelection) {
            difSelection.style.visibility = 'hidden';
            difSelection.style.opacity = '0';
        }
    }
}
