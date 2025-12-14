// This script fetches unlocked challenge levels for the current user/language
// and disables click/hover for locked level buttons ('.outer2-3') on the homepage.

function setLockedStylesForButton(buttonElement, isLocked) {
    const inner = buttonElement.querySelector('.inner1-3');
    if (isLocked) {
        // Disable interaction
        buttonElement.style.pointerEvents = 'none';
        buttonElement.style.opacity = '0.5';
        buttonElement.style.filter = 'grayscale(60%)';
        if (inner) {
            inner.style.backgroundColor = '#777';
            inner.style.color = '#ccc';
        }
        // Optional: add a lock indicator attribute/class
        buttonElement.setAttribute('data-locked', 'true');
    } else {
        buttonElement.style.pointerEvents = '';
        buttonElement.style.opacity = '';
        buttonElement.style.filter = '';
        if (inner) {
            inner.style.color = '';
        }
        buttonElement.removeAttribute('data-locked');
    }
}

// Get last known good unlock state from localStorage
function getLastKnownUnlockedLevels() {
    try {
        const stored = localStorage.getItem('lastKnownUnlockedLevels');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.warn('Error reading lastKnownUnlockedLevels:', e);
    }
    return null;
}

// Save last known good unlock state to localStorage
function saveLastKnownUnlockedLevels(levels) {
    try {
        localStorage.setItem('lastKnownUnlockedLevels', JSON.stringify(levels));
    } catch (e) {
        console.warn('Error saving lastKnownUnlockedLevels:', e);
    }
}

export function applyLevelLocks() {
    // Level 1 is always unlocked by design
    fetch('../../2be/get_unlocked_levels.php', { 
        cache: 'no-store',
        credentials: 'include' // Ensure cookies are always sent
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }
            return res.json();
        })
        .then(data => {
            let unlockedLevels = [];
            if (data && data.success) {
                unlockedLevels = data.unlockedLevels || [];
                // Save as last known good state in localStorage (persists across page loads)
                saveLastKnownUnlockedLevels(unlockedLevels);
                console.log('Challenge levels loaded successfully:', unlockedLevels);
            } else if (data && data.queued) {
                // Request was queued, use last known good state or defaults
                console.log('Request queued, using last known state');
                const lastKnown = getLastKnownUnlockedLevels();
                unlockedLevels = lastKnown || [1];
            } else {
                // API returned error - use last known good state if available
                console.warn('Challenge unlock API error:', data?.message || 'Unknown error');
                const lastKnown = getLastKnownUnlockedLevels();
                if (lastKnown && lastKnown.length > 0) {
                    console.log('Using last known good state:', lastKnown);
                    unlockedLevels = lastKnown;
                } else {
                    // Only fall back to [1] if we have no previous state
                    console.log('No cached state, using default [1]');
                    unlockedLevels = [1];
                }
            }

            // Normalize unlocked list to a Set of numbers for quick lookup
            const unlockedSet = new Set(unlockedLevels.map(l => parseInt(l, 10)).filter(n => !Number.isNaN(n)));

            // Iterate level buttons
            document.querySelectorAll('.chap-selection .outer2-3').forEach(buttonEl => {
                const innerEl = buttonEl.querySelector('.inner1-3');
                if (!innerEl) return;
                const text = (innerEl.textContent || '').trim().toLowerCase();
                // Expecting labels like "Level 2"
                const match = text.match(/level\s+(\d+)/i);
                if (!match) return;
                const levelNum = parseInt(match[1], 10);
                if (Number.isNaN(levelNum)) return;

                if (levelNum === 1) {
                    // Always unlocked
                    setLockedStylesForButton(buttonEl, false);
                } else {
                    const isUnlocked = unlockedSet.has(levelNum);
                    setLockedStylesForButton(buttonEl, !isUnlocked);
                }
            });
        })
        .catch((error) => {
            console.error('Error fetching unlocked levels:', error);
            // On error, use last known good state from localStorage
            const lastKnown = getLastKnownUnlockedLevels();
            if (lastKnown && lastKnown.length > 0) {
                console.log('Network error - using last known good state from localStorage:', lastKnown);
                const unlockedSet = new Set(lastKnown.map(l => parseInt(l, 10)).filter(n => !Number.isNaN(n)));
                
                // Only process challenge level buttons (in .ch-back1)
                document.querySelectorAll('.ch-back1 .chap-selection .outer2-3').forEach(buttonEl => {
                    const innerEl = buttonEl.querySelector('.inner1-3');
                    if (!innerEl) return;
                    const text = (innerEl.textContent || '').trim().toLowerCase();
                    const match = text.match(/level\s+(\d+)/i);
                    if (!match) return;
                    const levelNum = parseInt(match[1], 10);
                    if (Number.isNaN(levelNum)) return;
                    
                    if (levelNum === 1) {
                        setLockedStylesForButton(buttonEl, false);
                    } else {
                        setLockedStylesForButton(buttonEl, !unlockedSet.has(levelNum));
                    }
                });
            } else {
                // No cached state - only lock if we truly have no data
                console.warn('No cached state available - using defaults');
                document.querySelectorAll('.ch-back1 .chap-selection .outer2-3').forEach(buttonEl => {
                    const innerEl = buttonEl.querySelector('.inner1-3');
                    if (!innerEl) return;
                    const text = (innerEl.textContent || '').trim().toLowerCase();
                    const match = text.match(/level\s+(\d+)/i);
                    if (!match) return;
                    const levelNum = parseInt(match[1], 10);
                    if (Number.isNaN(levelNum)) return;
                    setLockedStylesForButton(buttonEl, levelNum !== 1);
                });
            }
        });
}

// Auto-run when homepage modals become visible so buttons exist in DOM
document.addEventListener('DOMContentLoaded', () => {
    applyLevelLocks();
});

// Also check for refresh flag
if (typeof window !== 'undefined' && window.location.pathname.includes('index.html')) {
    // Check if we need to refresh unlock status
    const shouldRefresh = localStorage.getItem('refreshUnlockStatus');
    if (shouldRefresh === 'true') {
        setTimeout(() => {
            applyLevelLocks();
        }, 1000); // Wait a bit for page to fully load
    }
}


