/**
 * Save Game Handler for Story Mode Episodes
 * Handles saving and loading game state from localStorage
 * 
 * To use in story mode episodes:
 * 1. Include this script: <script src="../../saveGameHandler.js"></script>
 * 2. Make sure currentSceneIndex is accessible globally: window.currentSceneIndex = currentSceneIndex;
 * 3. Add saveGame handler to your message listener
 * 4. Add continue game check on page load
 */

// Function to save current game state
window.saveGameState = function(episode, currentScene, additionalData = {}) {
    try {
        const gameState = {
            episode: episode,
            currentScene: currentScene || 0,
            timestamp: new Date().toISOString(),
            ...additionalData
        };
        
        const saveKey = `savedGame_${episode}`;
        localStorage.setItem(saveKey, JSON.stringify(gameState));
        console.log('Game saved:', saveKey, gameState);
        
        return true;
    } catch (e) {
        console.error('Error saving game:', e);
        return false;
    }
};

// Function to load saved game state
window.loadGameState = function(episode) {
    try {
        const saveKey = `savedGame_${episode}`;
        const savedData = localStorage.getItem(saveKey);
        
        if (savedData) {
            return JSON.parse(savedData);
        }
        return null;
    } catch (e) {
        console.error('Error loading game:', e);
        return null;
    }
};

// Function to check if should continue from saved game
window.shouldContinueGame = function(episode) {
    const continueFlag = localStorage.getItem(`continueGame_${episode}`);
    if (continueFlag === 'true') {
        localStorage.removeItem(`continueGame_${episode}`); // Clear flag after checking
        return true;
    }
    return false;
};

// Helper function to get episode from URL
window.getEpisodeFromURL = function() {
    const currentPath = window.location.pathname;
    const episodeMatch = currentPath.match(/ep(\d+)/);
    return episodeMatch ? `ep${episodeMatch[1]}` : null;
};

