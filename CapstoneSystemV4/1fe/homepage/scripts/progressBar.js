// Progress Bar Module
// Handles display of story mode episodes (1-7) and challenge levels (1-20) progress

// Topic scopes for Story Mode Episodes
const storyModeTopics = {
    1: 'Basic Syntax, Code Structure, and Comments',
    2: 'Variables and Data Types',
    3: 'Operators and Expressions',
    4: 'Control Flow (if-else, switch, and loops)',
    5: 'String Operations',
    6: 'Arrays',
    7: 'Methods / Functions'
};

// Topic scopes for Challenge Levels
const challengeLevelTopics = {
    1: 'Basic Syntax',
    2: 'Variables and Data Types',
    3: 'Operators and Expressions',
    4: 'Control Flow',
    5: 'Methods / Functions',
    6: 'Arrays',
    7: 'Methods / Functions',
    8: 'Control Flow',
    9: 'String Operations',
    10: 'Arrays',
    11: 'Arrays + Expressions',
    12: 'Strings + Conditions',
    13: 'Arrays + Functions',
    14: 'Strings + Sorting',
    15: 'Arrays + Control Flow + Functions',
    16: 'Arrays + Functions',
    17: 'Arrays + Sorting',
    18: 'Arrays + Functions',
    19: 'Arrays + Conditions',
    20: 'Arrays + Functions + Loops'
};

// Challenge level titles
const challengeLevelTitles = {
    1: 'Taho Time!',
    2: 'Sari-Sari Store Inventory',
    3: 'Fiesta Budget Planner',
    4: 'Barangay Curfew Check',
    5: 'Bayanihan Scheduler',
    6: 'Jeepney Fare Calculator',
    7: 'Pamamanhikan',
    8: 'Tikbalang Path',
    9: 'Fiesta Poster Maker',
    10: 'Larong Kalye Leaderboard',
    11: 'Barangay Population Analyzer',
    12: 'Simbang Gabi',
    13: 'Filipino Family Menu',
    14: 'Filipino Names Analyzer',
    15: 'Tricycle Dispatch',
    16: 'Albularyo Potion Log',
    17: 'Palarong Barangay Medal Tally',
    18: 'Miss Barangay Scoring System',
    19: 'Aswang Alert',
    20: 'Jeepney Fare Matrix Calculator'
};

let currentMode = 'story'; // 'story' or 'challenge'
let completedItems = new Set(); // Set of completed episode/level numbers
let unlockedItems = new Set(); // Set of unlocked episode/level numbers

/**
 * Initialize the progress bar
 */
export function initProgressBar() {
    currentMode = 'story';
    loadProgressData();
}

/**
 * Switch progress mode
 */
export function switchProgressMode(mode) {
    currentMode = mode;
    loadProgressData();
}

/**
 * Load progress data from backend
 */
function loadProgressData() {
    if (currentMode === 'story') {
        loadStoryProgress();
    } else {
        loadChallengeProgress();
    }
}

/**
 * Load story mode progress
 */
function loadStoryProgress() {
    fetch('../../2be/get_unlocked_story_progress.php', { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
            if (data && data.success) {
                const unlockedEpisodes = (data.unlockedEpisodes || []).map(e => parseInt(e, 10));
                const completedEpisodes = (data.completedEpisodes || []).map(e => parseInt(e, 10));
                
                unlockedItems = new Set(unlockedEpisodes);
                
                // Mark completed episodes
                completedItems = new Set(completedEpisodes);
                
                // Also mark episodes as completed if next episode is unlocked
                unlockedEpisodes.forEach(epNum => {
                    if (epNum > 1) {
                        // Previous episode was completed to unlock this one
                        completedItems.add(epNum - 1);
                    }
                });
                
                renderProgressBar('story');
            } else {
                // Default: only episode 1 is available
                unlockedItems = new Set([1]);
                completedItems = new Set();
                renderProgressBar('story');
            }
        })
        .catch(() => {
            unlockedItems = new Set([1]);
            completedItems = new Set();
            renderProgressBar('story');
        });
}

/**
 * Load challenge mode progress
 */
function loadChallengeProgress() {
    fetch('../../2be/get_unlocked_levels.php', { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
            if (data && data.success) {
                const unlockedLevels = (data.unlockedLevels || []).map(l => parseInt(l, 10));
                const completedLevels = (data.completedLevels || []).map(l => parseInt(l, 10));
                
                unlockedItems = new Set(unlockedLevels);
                
                // Mark completed levels
                completedItems = new Set(completedLevels);
                
                // Also mark levels as completed if next level is unlocked
                unlockedLevels.forEach(levelNum => {
                    if (levelNum > 1) {
                        // Previous level was completed to unlock this one
                        completedItems.add(levelNum - 1);
                    }
                });
                
                renderProgressBar('challenge');
            } else {
                // Default: only level 1 is available
                unlockedItems = new Set([1]);
                completedItems = new Set();
                renderProgressBar('challenge');
            }
        })
        .catch(() => {
            unlockedItems = new Set([1]);
            completedItems = new Set();
            renderProgressBar('challenge');
        });
}

/**
 * Render the progress bar
 */
function renderProgressBar(mode) {
    const progressItems = document.getElementById('progressItemsContainer');
    if (!progressItems) return;
    
    progressItems.innerHTML = '';
    
    if (mode === 'story') {
        // Render episodes 1-7
        for (let i = 1; i <= 7; i++) {
            const item = createProgressItem(i, `EP${i}`, storyModeTopics[i], mode);
            progressItems.appendChild(item);
        }
    } else {
        // Render levels 1-20
        for (let i = 1; i <= 20; i++) {
            const title = challengeLevelTitles[i] || `Level ${i}`;
            const topic = challengeLevelTopics[i] || 'Various Topics';
            const item = createProgressItem(i, `L${i}`, `${title} - ${topic}`, mode);
            progressItems.appendChild(item);
        }
    }
}

/**
 * Create a progress item element
 */
function createProgressItem(number, label, tooltipText, mode) {
    const item = document.createElement('div');
    item.className = 'progress-item';
    item.textContent = label;
    item.dataset.itemNumber = number;
    item.dataset.mode = mode;
    
    // Check if completed
    if (completedItems.has(number)) {
        item.classList.add('completed');
    }
    
    // Check if locked (episode/level 1 is never locked)
    if (number === 1) {
        // First item is always unlocked
        unlockedItems.add(1);
    } else if (!unlockedItems.has(number)) {
        // Item is locked if not in unlocked set
        item.classList.add('locked');
    }
    
    // Add tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'progress-item-tooltip';
    
    if (mode === 'story') {
        tooltip.innerHTML = `
            <div class="progress-item-tooltip-title">Episode ${number}</div>
            <div class="progress-item-tooltip-topic">${tooltipText}</div>
        `;
    } else {
        const parts = tooltipText.split(' - ');
        const title = parts[0] || `Level ${number}`;
        const topic = parts[1] || 'Various Topics';
        tooltip.innerHTML = `
            <div class="progress-item-tooltip-title">${title}</div>
            <div class="progress-item-tooltip-topic">Topic: ${topic}</div>
        `;
    }
    
    item.appendChild(tooltip);
    
    // Add click handler to navigate
    item.addEventListener('click', () => {
        if (!item.classList.contains('locked')) {
            navigateToItem(number, mode);
        }
    });
    
    return item;
}

/**
 * Navigate to specific episode/level
 */
function navigateToItem(number, mode) {
    // Close progress modal first
    const modal = document.getElementById('progressModal');
    if (modal) {
        modal.classList.remove('show');
    }

    if (mode === 'story') {
        // Navigate to story mode episode
        const episodeMap = {
            1: 'ep1',
            2: 'ep2',
            3: 'ep3',
            4: 'ep4',
            5: 'ep5',
            6: 'ep6',
            7: 'ep7'
        };
        
        const episodeId = episodeMap[number];
        if (episodeId && window.redirectToEpisode) {
            // Small delay to ensure modal is closed
            setTimeout(() => {
                window.redirectToEpisode(episodeId);
            }, 100);
        }
    } else {
        // Navigate to challenge level
        const levelId = `lev${number}`;
        
        // Small delay then open challenge modal and select level
        setTimeout(() => {
            // Open challenges modal
            if (window.process) {
                window.process(null, 'challenges');
            }
            
            // Then select the level
            setTimeout(() => {
                const levelButton = Array.from(document.querySelectorAll('.chap-selection .outer2-3'))
                    .find(btn => {
                        const inner = btn.querySelector('.inner1-3');
                        return inner && inner.textContent.trim() === `Level ${number}`;
                    });
                
                if (levelButton && window.process3) {
                    window.process3(levelButton, levelId);
                }
            }, 200);
        }, 100);
    }
}

// Expose functions globally for inline handlers
window.initProgressBar = initProgressBar;
// Store data update function with a specific name
window.switchProgressModeData = switchProgressMode;

// Only set window.switchProgressMode if it doesn't already exist (to avoid overwriting UI wrapper)
// The UI wrapper in index.html will call window.switchProgressModeData
if (!window.switchProgressMode) {
    window.switchProgressMode = switchProgressMode;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Progress bar will be initialized when modal is opened
});

