import { initializeDomContent, process, process1, submitLanguageSelection, hideModal, process2, process3, difActions, selectDifficulty, currentSelectedDifficulty, getLanguageBasedPath, redirectToEpisode } from './routeModules.js';

import {} from './serverAuth.js';
import {} from './logout.js';
import {} from './2/backgroundMusicVolume.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeDomContent();
});

window.addEventListener("pageshow", function(event) {
    if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
        window.location.reload();
    }
});

// FOR BLACK BUTTONS
// The currentSelectedLanguage is now managed within process.js

// Exposed globally for inline event handlers (if any)
window.process = process;
window.process1 = process1;
window.submitLanguageSelection = submitLanguageSelection;
window.hideModal = hideModal;
window.process2 = process2;
window.process3 = process3;
window.difActions = difActions;
window.selectDifficulty = selectDifficulty;
window.currentSelectedDifficulty = currentSelectedDifficulty; // Expose globally
window.getLanguageBasedPath = getLanguageBasedPath;
window.redirectToEpisode = redirectToEpisode;

