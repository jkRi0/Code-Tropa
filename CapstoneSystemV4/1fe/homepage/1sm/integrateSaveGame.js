/**
 * Integration code for Story Mode Episodes
 * Add this code to your episode's script section
 * 
 * 1. Make currentSceneIndex globally accessible
 * 2. Add save game handler to message listener
 * 3. Add continue game check on page load
 */

// Make currentSceneIndex globally accessible (add this where currentSceneIndex is declared)
// window.currentSceneIndex = currentSceneIndex;

// Add to your existing message listener (add this case):
/*
else if (data.type === 'saveGame') {
    // Get current episode from URL
    const episode = window.getEpisodeFromURL ? window.getEpisodeFromURL() : 'ep1';
    const currentScene = window.currentSceneIndex || 0;
    
    // Save the game
    if (window.saveGameState) {
        window.saveGameState(episode, currentScene);
    }
}
*/

// Add continue game check on page load (add this after DOMContentLoaded):
/*
// Check for continue game flag
const episode = window.getEpisodeFromURL ? window.getEpisodeFromURL() : 'ep1';
if (episode && window.shouldContinueGame && window.shouldContinueGame(episode)) {
    const savedGame = window.loadGameState ? window.loadGameState(episode) : null;
    if (savedGame && savedGame.currentScene !== undefined) {
        // Jump to saved scene
        currentSceneIndex = savedGame.currentScene;
        showScene(currentSceneIndex);
    }
}
*/

