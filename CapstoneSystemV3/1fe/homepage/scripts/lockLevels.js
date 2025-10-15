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

export function applyLevelLocks() {
    // Level 1 is always unlocked by design
    fetch('../../2be/get_unlocked_levels.php', { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
            // In case of failure, only keep Level 1 unlocked and lock others by default
            const unlockedLevels = data && data.success ? (data.unlockedLevels || []) : [];

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
        .catch(() => {
            // On error, lock all except Level 1
            document.querySelectorAll('.chap-selection .outer2-3').forEach(buttonEl => {
                const innerEl = buttonEl.querySelector('.inner1-3');
                if (!innerEl) return;
                const text = (innerEl.textContent || '').trim().toLowerCase();
                const match = text.match(/level\s+(\d+)/i);
                if (!match) return;
                const levelNum = parseInt(match[1], 10);
                if (Number.isNaN(levelNum)) return;
                setLockedStylesForButton(buttonEl, levelNum !== 1);
            });
        });
}

// Auto-run when homepage modals become visible so buttons exist in DOM
document.addEventListener('DOMContentLoaded', () => {
    applyLevelLocks();
});


