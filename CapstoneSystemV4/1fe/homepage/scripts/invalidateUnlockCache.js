// Utility to invalidate unlock cache after progress is saved
// This ensures unlock status is refreshed after completing episodes/levels

import { deleteData, STORES, getAllData } from './dbManager.js';
import { applyStoryModeLocks } from './lockStoryMode.js';
import { applyLevelLocks } from './lockLevels.js';

/**
 * Invalidates unlock cache and refreshes unlock status
 * Call this after saving story or challenge progress
 * 
 * IMPORTANT: We no longer delete the cache before fetching new data.
 * This prevents the issue where the cache is deleted but the new fetch fails,
 * causing all levels to appear locked.
 */
export async function invalidateAndRefreshUnlocks() {
    try {
        console.log('Invalidating and refreshing unlock status...');
        
        // Set flag to refresh unlock status when returning to homepage
        // This is the PRIMARY mechanism - the homepage will fetch fresh data
        localStorage.setItem('refreshUnlockStatus', 'true');
        
        // Mark cached API responses as stale (but don't delete them yet)
        // The apiClient will fetch fresh data and replace them
        const language = localStorage.getItem('selectedLanguage') || 'java';
        const cachedItems = await getAllData(STORES.CACHE).catch(() => []);
        
        // Log what we're about to invalidate for debugging
        const unlockCacheItems = cachedItems.filter(item => 
            item.url && (item.url.includes('get_unlocked_levels.php') || item.url.includes('get_unlocked_story_progress.php'))
        );
        if (unlockCacheItems.length > 0) {
            console.log('Found cached unlock data to invalidate:', unlockCacheItems.length, 'items');
        }
        
        // DON'T delete the cache here - let the lock scripts fetch new data first
        // The cache will be replaced when fresh data is fetched successfully
        
        // If on homepage, refresh immediately by fetching new data
        // The lock scripts will fetch new data from the server (with credentials)
        // and only replace the cache when successful
        if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/homepage/')) {
            console.log('On homepage - triggering immediate refresh');
            setTimeout(() => {
                if (typeof applyStoryModeLocks === 'function') {
                    applyStoryModeLocks();
                }
                if (typeof applyLevelLocks === 'function') {
                    applyLevelLocks();
                }
            }, 300); // Small delay to allow progress save to complete
        }
        
        console.log('Unlock cache invalidation scheduled');
    } catch (error) {
        console.error('Error invalidating unlock cache:', error);
    }
}

// Check and refresh unlock status on homepage load
export function checkAndRefreshUnlockStatus() {
    const shouldRefresh = localStorage.getItem('refreshUnlockStatus');
    if (shouldRefresh === 'true') {
        localStorage.removeItem('refreshUnlockStatus');
        
        // Force refresh unlock status
        setTimeout(() => {
            if (typeof applyStoryModeLocks === 'function') {
                applyStoryModeLocks();
            }
            if (typeof applyLevelLocks === 'function') {
                applyLevelLocks();
            }
            console.log('Unlock status refreshed on homepage load');
        }, 300);
    }
}

// Make available globally for use in story/challenge pages
if (typeof window !== 'undefined') {
    window.invalidateAndRefreshUnlocks = invalidateAndRefreshUnlocks;
}

