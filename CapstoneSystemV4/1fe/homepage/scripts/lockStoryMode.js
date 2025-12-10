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

export function applyStoryModeLocks() {
    // Chapter 1, Episode 1 is always unlocked by design
    fetch('../../2be/get_unlocked_story_progress.php', { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
            // In case of failure, only keep Chapter 1 unlocked and lock others by default
            const unlockedChapters = data && data.success ? (data.unlockedChapters || []) : [1];
            const unlockedEpisodes = data && data.success ? (data.unlockedEpisodes || []) : [1];

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
        .catch(() => {
            // On error, lock all except Chapter 1, Episode 1
            document.querySelectorAll('.chap-selection .outer2-3').forEach(buttonEl => {
                const innerEl = buttonEl.querySelector('.inner1-3');
                if (!innerEl) return;
                const text = (innerEl.textContent || '').trim().toLowerCase();
                const chapterMatch = text.match(/chapter\s+(i+|ii+|iii+)/i);
                if (chapterMatch) {
                    const romanNumeral = chapterMatch[1].toLowerCase();
                    const isChapter1 = romanNumeral === 'i' || romanNumeral === 'i';
                    setLockedStylesForStoryButton(buttonEl, !isChapter1);
                }
            });
            
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
                    if (!Number.isNaN(localEpisodeNum)) {
                        const globalEpisodeNum = chapterEpisodeToGlobal(chapterNum, localEpisodeNum);
                        setLockedStylesForEpisodeButton(buttonEl, globalEpisodeNum !== 1);
                    }
                }
            });
        });
}

// Auto-run when homepage modals become visible so buttons exist in DOM
document.addEventListener('DOMContentLoaded', () => {
    applyStoryModeLocks();
});
