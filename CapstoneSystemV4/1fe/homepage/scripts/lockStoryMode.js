// This script fetches unlocked story mode chapters/episodes for the current user/language
// and disables click/hover for locked story mode items on the homepage.

// Helper function to convert chapter + local episode to global episode number (1-7)
function chapterEpisodeToGlobal(chapter, localEpisode) {
    if (chapter === 1) {
        return localEpisode; // 1, 2, 3
    } else if (chapter === 2) {
        return 3 + localEpisode; // 4, 5
    } else if (chapter === 3) {
        return 5 + localEpisode; // 6, 7
    }
    return 0;
}

function setLockedStylesForStoryButton(buttonElement, isLocked) {
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

function setLockedStylesForEpisodeButton(buttonElement, isLocked) {
    if (isLocked) {
        // Disable interaction
        buttonElement.style.pointerEvents = 'none';
        buttonElement.style.opacity = '0.5';
        buttonElement.style.filter = 'grayscale(60%)';
        buttonElement.style.backgroundColor = '#777';
        buttonElement.style.color = '#ccc';
        buttonElement.setAttribute('data-locked', 'true');
    } else {
        buttonElement.style.pointerEvents = '';
        buttonElement.style.opacity = '';
        buttonElement.style.filter = '';
        buttonElement.style.backgroundColor = '';
        buttonElement.style.color = '';
        buttonElement.removeAttribute('data-locked');
    }
}

// Get last known good unlock state from localStorage
function getLastKnownStoryProgress() {
    try {
        const stored = localStorage.getItem('lastKnownStoryProgress');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.warn('Error reading lastKnownStoryProgress:', e);
    }
    return null;
}

// Save last known good unlock state to localStorage
function saveLastKnownStoryProgress(chapters, episodes) {
    try {
        localStorage.setItem('lastKnownStoryProgress', JSON.stringify({
            chapters: chapters,
            episodes: episodes
        }));
    } catch (e) {
        console.warn('Error saving lastKnownStoryProgress:', e);
    }
}

export function applyStoryModeLocks() {
    // Chapter 1, Episode 1 is always unlocked by design
    fetch('../../2be/get_unlocked_story_progress.php', { 
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
            let unlockedChapters = [1];
            let unlockedEpisodes = [1];
            
            if (data && data.success) {
                unlockedChapters = data.unlockedChapters || [1];
                unlockedEpisodes = data.unlockedEpisodes || [1];
                // Save as last known good state in localStorage (persists across page loads)
                saveLastKnownStoryProgress(unlockedChapters, unlockedEpisodes);
                console.log('Story progress loaded successfully - Chapters:', unlockedChapters, 'Episodes:', unlockedEpisodes);
            } else if (data && data.queued) {
                // Request was queued, use last known good state or defaults
                console.log('Request queued, using last known state');
                const lastKnown = getLastKnownStoryProgress();
                unlockedChapters = lastKnown?.chapters || [1];
                unlockedEpisodes = lastKnown?.episodes || [1];
            } else {
                // API returned error - use last known good state if available
                console.warn('Story unlock API error:', data?.message || 'Unknown error');
                const lastKnown = getLastKnownStoryProgress();
                if (lastKnown && lastKnown.chapters && lastKnown.chapters.length > 0) {
                    console.log('Using last known good state from localStorage - Chapters:', lastKnown.chapters, 'Episodes:', lastKnown.episodes);
                    unlockedChapters = lastKnown.chapters;
                    unlockedEpisodes = lastKnown.episodes || [1];
                } else {
                    // Only fall back to defaults if we have no previous state
                    console.log('No cached state, using defaults');
                    unlockedChapters = [1];
                    unlockedEpisodes = [1];
                }
            }

            // Normalize unlocked lists to Sets for quick lookup
            const unlockedChaptersSet = new Set(unlockedChapters.map(c => parseInt(c, 10)).filter(n => !Number.isNaN(n)));
            const unlockedEpisodesSet = new Set(unlockedEpisodes.map(e => parseInt(e, 10)).filter(n => !Number.isNaN(n)));

            // Lock/unlock chapter buttons
            document.querySelectorAll('.chap-selection .outer2-3').forEach(buttonEl => {
                const innerEl = buttonEl.querySelector('.inner1-3');
                if (!innerEl) return;
                const text = (innerEl.textContent || '').trim().toLowerCase();
                
                // Check for chapter buttons (Chapter I, Chapter II, Chapter III)
                const chapterMatch = text.match(/chapter\s+(i+|ii+|iii+)/i);
                if (chapterMatch) {
                    let chapterNum = 1;
                    const romanNumeral = chapterMatch[1].toLowerCase();
                    if (romanNumeral === 'ii' || romanNumeral === 'ii') chapterNum = 2;
                    if (romanNumeral === 'iii' || romanNumeral === 'iii') chapterNum = 3;
                    
                    if (chapterNum === 1) {
                        // Chapter 1 is always unlocked
                        setLockedStylesForStoryButton(buttonEl, false);
                    } else {
                        const isUnlocked = unlockedChaptersSet.has(chapterNum);
                        setLockedStylesForStoryButton(buttonEl, !isUnlocked);
                    }
                }
            });

            // Lock/unlock episode buttons
            document.querySelectorAll('.epi-option button').forEach(buttonEl => {
                const parentDiv = buttonEl.closest('.epi-option');
                if (!parentDiv) return;
                
                // Find which chapter this episode belongs to
                let chapterNum = 1;
                const chap1Section = parentDiv.closest('.chap1');
                const chap2Section = parentDiv.closest('.chap2');
                const chap3Section = parentDiv.closest('.chap3');
                
                if (chap2Section) chapterNum = 2;
                else if (chap3Section) chapterNum = 3;
                else if (chap1Section) chapterNum = 1;
                
                const titleEl = parentDiv.querySelector('.epi-title h2');
                if (!titleEl) return;
                
                const text = (titleEl.textContent || '').trim().toLowerCase();
                const episodeMatch = text.match(/episode\s+(\d+)/i);
                if (episodeMatch) {
                    const localEpisodeNum = parseInt(episodeMatch[1], 10);
                    if (Number.isNaN(localEpisodeNum)) return;
                    
                    // Convert to global episode number
                    const globalEpisodeNum = chapterEpisodeToGlobal(chapterNum, localEpisodeNum);
                    
                    if (globalEpisodeNum === 1) {
                        // Global Episode 1 is always unlocked
                        setLockedStylesForEpisodeButton(buttonEl, false);
                    } else {
                        const isUnlocked = unlockedEpisodesSet.has(globalEpisodeNum);
                        setLockedStylesForEpisodeButton(buttonEl, !isUnlocked);
                    }
                }
            });
        })
        .catch((error) => {
            console.error('Error fetching unlocked story progress:', error);
            // On error, use last known good state from localStorage
            const lastKnown = getLastKnownStoryProgress();
            if (lastKnown && lastKnown.chapters && lastKnown.chapters.length > 0) {
                console.log('Network error - using last known good state from localStorage');
                const unlockedChaptersSet = new Set(lastKnown.chapters.map(c => parseInt(c, 10)).filter(n => !Number.isNaN(n)));
                const unlockedEpisodesSet = new Set((lastKnown.episodes || [1]).map(e => parseInt(e, 10)).filter(n => !Number.isNaN(n)));
                
                // Apply locks using cached state - only process story mode buttons
                document.querySelectorAll('.sm-back1 .chap-selection .outer2-3').forEach(buttonEl => {
                    const innerEl = buttonEl.querySelector('.inner1-3');
                    if (!innerEl) return;
                    const text = (innerEl.textContent || '').trim().toLowerCase();
                    const chapterMatch = text.match(/chapter\s+(i+|ii+|iii+)/i);
                    if (chapterMatch) {
                        let chapterNum = 1;
                        const romanNumeral = chapterMatch[1].toLowerCase();
                        if (romanNumeral === 'ii') chapterNum = 2;
                        if (romanNumeral === 'iii') chapterNum = 3;
                        
                        if (chapterNum === 1) {
                            setLockedStylesForStoryButton(buttonEl, false);
                        } else {
                            setLockedStylesForStoryButton(buttonEl, !unlockedChaptersSet.has(chapterNum));
                        }
                    }
                });
                
                document.querySelectorAll('.sm-back1 .epi-option button').forEach(buttonEl => {
                    const parentDiv = buttonEl.closest('.epi-option');
                    if (!parentDiv) return;
                    
                    let chapterNum = 1;
                    const chap1Section = parentDiv.closest('.chap1');
                    const chap2Section = parentDiv.closest('.chap2');
                    const chap3Section = parentDiv.closest('.chap3');
                    
                    if (chap2Section) chapterNum = 2;
                    else if (chap3Section) chapterNum = 3;
                    else if (chap1Section) chapterNum = 1;
                    
                    const titleEl = parentDiv.querySelector('.epi-title h2');
                    if (!titleEl) return;
                    const text = (titleEl.textContent || '').trim().toLowerCase();
                    const episodeMatch = text.match(/episode\s+(\d+)/i);
                    if (episodeMatch) {
                        const localEpisodeNum = parseInt(episodeMatch[1], 10);
                        if (!Number.isNaN(localEpisodeNum)) {
                            const globalEpisodeNum = chapterEpisodeToGlobal(chapterNum, localEpisodeNum);
                            if (globalEpisodeNum === 1) {
                                setLockedStylesForEpisodeButton(buttonEl, false);
                            } else {
                                setLockedStylesForEpisodeButton(buttonEl, !unlockedEpisodesSet.has(globalEpisodeNum));
                            }
                        }
                    }
                });
            } else {
                // No cached state - only lock if we truly have no data
                console.warn('No cached state available - using defaults');
                document.querySelectorAll('.sm-back1 .chap-selection .outer2-3').forEach(buttonEl => {
                    const innerEl = buttonEl.querySelector('.inner1-3');
                    if (!innerEl) return;
                    const text = (innerEl.textContent || '').trim().toLowerCase();
                    const chapterMatch = text.match(/chapter\s+(i+|ii+|iii+)/i);
                    if (chapterMatch) {
                        const romanNumeral = chapterMatch[1].toLowerCase();
                        const isChapter1 = romanNumeral === 'i';
                        setLockedStylesForStoryButton(buttonEl, !isChapter1);
                    }
                });
                
                document.querySelectorAll('.sm-back1 .epi-option button').forEach(buttonEl => {
                    const parentDiv = buttonEl.closest('.epi-option');
                    if (!parentDiv) return;
                    
                    let chapterNum = 1;
                    const chap1Section = parentDiv.closest('.chap1');
                    const chap2Section = parentDiv.closest('.chap2');
                    const chap3Section = parentDiv.closest('.chap3');
                    
                    if (chap2Section) chapterNum = 2;
                    else if (chap3Section) chapterNum = 3;
                    else if (chap1Section) chapterNum = 1;
                    
                    const titleEl = parentDiv.querySelector('.epi-title h2');
                    if (!titleEl) return;
                    const text = (titleEl.textContent || '').trim().toLowerCase();
                    const episodeMatch = text.match(/episode\s+(\d+)/i);
                    if (episodeMatch) {
                        const localEpisodeNum = parseInt(episodeMatch[1], 10);
                        if (!Number.isNaN(localEpisodeNum)) {
                            const globalEpisodeNum = chapterEpisodeToGlobal(chapterNum, localEpisodeNum);
                            setLockedStylesForEpisodeButton(buttonEl, globalEpisodeNum !== 1);
                        }
                    }
                });
            }
        });
}

// Auto-run when homepage modals become visible so buttons exist in DOM
document.addEventListener('DOMContentLoaded', () => {
    applyStoryModeLocks();
});

// Also check for refresh flag
if (typeof window !== 'undefined' && window.location.pathname.includes('index.html')) {
    // Check if we need to refresh unlock status
    const shouldRefresh = localStorage.getItem('refreshUnlockStatus');
    if (shouldRefresh === 'true') {
        setTimeout(() => {
            applyStoryModeLocks();
        }, 1000); // Wait a bit for page to fully load
    }
}
