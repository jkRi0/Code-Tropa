// Sync Manager for Code-Tropa
// Handles background sync of queued operations

import { getPendingSyncQueue, updateSyncQueueItem, removeFromSyncQueue } from './dbManager.js';

let isSyncing = false;
let syncListeners = [];

// Register sync event listener
export function initSyncManager() {
    // Listen for online event
    window.addEventListener('online', () => {
        console.log('Connection restored, starting sync...');
        syncPendingRequests();
    });

    // Register background sync if available
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        navigator.serviceWorker.ready.then(registration => {
            // Register periodic sync (if supported)
            if ('periodicSync' in registration) {
                registration.periodicSync.register('sync-queue', {
                    minInterval: 60000 // 1 minute
                }).catch(err => {
                    console.log('Periodic sync not supported:', err);
                });
            }
        });
    }

    // Initial sync check
    if (navigator.onLine) {
        syncPendingRequests();
    }
}

// Sync pending requests
export async function syncPendingRequests() {
    if (isSyncing) {
        console.log('Sync already in progress...');
        return;
    }

    if (!navigator.onLine) {
        console.log('Offline, cannot sync');
        notifySyncListeners({ status: 'offline', count: 0 });
        return;
    }

    isSyncing = true;
    notifySyncListeners({ status: 'syncing', count: 0 });

    try {
        const pendingItems = await getPendingSyncQueue();
        console.log(`Syncing ${pendingItems.length} pending requests...`);

        if (pendingItems.length === 0) {
            isSyncing = false;
            notifySyncListeners({ status: 'complete', count: 0 });
            return;
        }

        let successCount = 0;
        let failCount = 0;

        for (const item of pendingItems) {
            try {
                // Use original fetch to avoid re-queuing
                const fetchFn = window._originalFetch || fetch;
                
                // Prepare headers - preserve original content type
                const headers = {
                    ...item.headers
                };
                
                // Ensure Content-Type is set
                if (!headers['Content-Type']) {
                    headers['Content-Type'] = 'application/json';
                }
                
                const response = await fetchFn(item.url, {
                    method: item.method,
                    headers: headers,
                    body: item.body
                });

                if (response.ok) {
                    // Success - remove from queue
                    await removeFromSyncQueue(item.id);
                    successCount++;
                    console.log('Synced successfully:', item.url);
                } else {
                    // Failed - update retry count
                    const retries = (item.retries || 0) + 1;
                    if (retries >= 5) {
                        // Too many retries, mark as failed
                        await updateSyncQueueItem(item.id, { status: 'failed', retries });
                        failCount++;
                        console.error('Max retries reached for:', item.url);
                    } else {
                        await updateSyncQueueItem(item.id, { retries });
                        failCount++;
                        console.warn('Sync failed, will retry:', item.url);
                    }
                }
            } catch (error) {
                console.error('Error syncing item:', error);
                const retries = (item.retries || 0) + 1;
                if (retries >= 5) {
                    await updateSyncQueueItem(item.id, { status: 'failed', retries });
                    failCount++;
                } else {
                    await updateSyncQueueItem(item.id, { retries });
                    failCount++;
                }
            }

            // Update progress
            notifySyncListeners({
                status: 'syncing',
                count: successCount + failCount,
                total: pendingItems.length,
                success: successCount,
                failed: failCount
            });
        }

        isSyncing = false;
        notifySyncListeners({
            status: 'complete',
            count: successCount,
            total: pendingItems.length,
            success: successCount,
            failed: failCount
        });

        console.log(`Sync complete: ${successCount} succeeded, ${failCount} failed`);
    } catch (error) {
        console.error('Sync error:', error);
        isSyncing = false;
        notifySyncListeners({ status: 'error', count: 0, error });
    }
}

// Add sync status listener
export function addSyncListener(callback) {
    syncListeners.push(callback);
}

// Remove sync status listener
export function removeSyncListener(callback) {
    syncListeners = syncListeners.filter(listener => listener !== callback);
}

// Notify all listeners
function notifySyncListeners(status) {
    syncListeners.forEach(listener => {
        try {
            listener(status);
        } catch (error) {
            console.error('Error in sync listener:', error);
        }
    });
}

// Get sync status
export async function getSyncStatus() {
    const pending = await getPendingSyncQueue();
    return {
        isSyncing,
        pendingCount: pending.length,
        online: navigator.onLine
    };
}

// Manual sync trigger
export function triggerSync() {
    if (navigator.onLine && !isSyncing) {
        syncPendingRequests();
    }
}

// Expose to window for service worker messages
if (typeof window !== 'undefined') {
    window.syncManager = {
        triggerSync
    };
}

// Initialize on load
if (typeof window !== 'undefined') {
    initSyncManager();
}

