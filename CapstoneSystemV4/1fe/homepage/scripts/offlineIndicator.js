// Offline Indicator UI Component for Code-Tropa
// Shows online/offline status and sync progress

import { getSyncStatus, addSyncListener } from './syncManager.js';

let indicatorElement = null;
let syncStatusElement = null;

// Create offline indicator
export function createOfflineIndicator() {
    // Check if already exists
    if (document.getElementById('offline-indicator')) {
        return;
    }

    const indicator = document.createElement('div');
    indicator.id = 'offline-indicator';
    indicator.style.cssText = `
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        z-index: 10000;
        display: none;
        align-items: center;
        gap: 10px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    `;

    const statusIcon = document.createElement('span');
    statusIcon.id = 'offline-status-icon';
    statusIcon.style.cssText = `
        font-size: 18px;
        display: inline-block;
    `;

    const statusText = document.createElement('span');
    statusText.id = 'offline-status-text';
    statusText.textContent = 'Offline';

    const syncStatus = document.createElement('span');
    syncStatus.id = 'offline-sync-status';
    syncStatus.style.cssText = `
        font-size: 12px;
        opacity: 0.8;
        margin-left: 10px;
    `;

    indicator.appendChild(statusIcon);
    indicator.appendChild(statusText);
    indicator.appendChild(syncStatus);

    document.body.appendChild(indicator);
    indicatorElement = indicator;
    syncStatusElement = syncStatus;

    // Update status
    updateOfflineStatus();

    // Listen for online/offline events
    window.addEventListener('online', updateOfflineStatus);
    window.addEventListener('offline', updateOfflineStatus);

    // Listen for sync events
    addSyncListener(handleSyncStatus);
}

// Update offline status
async function updateOfflineStatus() {
    if (!indicatorElement) return;

    const isOnline = navigator.onLine;
    const statusIcon = document.getElementById('offline-status-icon');
    const statusText = document.getElementById('offline-status-text');

    if (isOnline) {
        indicatorElement.style.display = 'none';
    } else {
        indicatorElement.style.display = 'flex';
        statusIcon.textContent = '📴';
        statusText.textContent = 'Offline Mode';
        if (syncStatusElement) {
            syncStatusElement.textContent = '';
        }
    }
}

// Handle sync status updates
function handleSyncStatus(status) {
    if (!syncStatusElement) return;

    switch (status.status) {
        case 'syncing':
            syncStatusElement.textContent = `Syncing ${status.count}/${status.total}...`;
            break;
        case 'complete':
            if (status.count > 0) {
                syncStatusElement.textContent = `✓ Synced ${status.count} items`;
                setTimeout(() => {
                    if (syncStatusElement) {
                        syncStatusElement.textContent = '';
                    }
                }, 3000);
            }
            break;
        case 'error':
            syncStatusElement.textContent = '✗ Sync error';
            break;
        default:
            syncStatusElement.textContent = '';
    }
}

// Initialize on load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', createOfflineIndicator);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createOfflineIndicator);
    } else {
        createOfflineIndicator();
    }
}


