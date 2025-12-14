# Offline Data Storage & Sync Implementation

## Overview

Code-Tropa now supports full offline functionality with automatic data synchronization when the connection is restored. All API calls are intercepted and handled intelligently based on network status.

## Architecture

### Core Components

1. **dbManager.js** - IndexedDB manager for local data storage
2. **apiClient.js** - API wrapper that intercepts fetch calls
3. **syncManager.js** - Background sync manager for queued operations
4. **offlineIndicator.js** - UI component showing online/offline status
5. **fetchWrapper.js** - Global fetch replacement for offline support

### Service Worker Updates

- Detects API requests vs static assets
- Handles API requests differently (network-first, no caching)
- Supports background sync events
- Forwards sync messages to clients

## How It Works

### Online Behavior

1. **GET Requests**: Fetched from server, response cached in IndexedDB
2. **POST/PUT/DELETE Requests**: Sent to server immediately

### Offline Behavior

1. **GET Requests**: 
   - Returns cached data from IndexedDB if available
   - Falls back to stored profile/badges/progress data
   - Returns error if no cache available

2. **POST/PUT/DELETE Requests**:
   - Queued in IndexedDB sync queue
   - Returns optimistic success response
   - Automatically synced when connection restored

### Sync Process

1. Connection restored triggers `syncPendingRequests()`
2. Each queued request is sent to server
3. Successful requests removed from queue
4. Failed requests retry (max 5 attempts)
5. User notified of sync status

## API Endpoints Handled

### GET Requests (Cached)
- `get_profile_data.php` - Profile data
- `get_performance_data.php` - Performance metrics
- `get_badges.php` - User badges
- `get_unlocked_levels.php` - Unlocked challenge levels
- `get_unlocked_story_progress.php` - Story progress
- `get_all_players_assessments.php` - Assessment results
- `get_coding_recommendations.php` - Recommendations
- `get_leaderboard_data.php` - Leaderboard
- `get_current_username.php` - Current username
- `get_current_language.php` - Current language
- `check_pretest.php` - Pretest status
- `check_story_completion.php` - Story completion status

### POST Requests (Queued)
- `save_story_progress.php` - Story progress saves
- `save_challenge_progress.php` - Challenge progress saves
- `save_performance.php` - Performance data
- `award_badge.php` - Badge awards
- `submit_pretest.php` - Pretest submissions
- `submit_posttest.php` - Posttest submissions
- `update_language.php` - Language updates
- `update_account.php` - Account updates
- `delete_account.php` - Account deletion
- `logout.php` - Logout (handled immediately)

## Data Storage Structure

### IndexedDB Stores

1. **profile** - User profile data (username, points, tier)
2. **progress** - Story and challenge progress
3. **badges** - User badges
4. **unlockedLevels** - Unlocked challenge levels
5. **unlockedStory** - Unlocked story episodes
6. **performance** - Performance metrics
7. **assessments** - Assessment results
8. **syncQueue** - Queued operations for sync
9. **cache** - Cached API responses

## Usage

### Automatic Operation

The system works automatically once the scripts are loaded. No code changes needed in existing files - the fetch wrapper intercepts all API calls.

### Manual Sync

```javascript
import { triggerSync } from './scripts/syncManager.js';

// Manually trigger sync
triggerSync();
```

### Check Sync Status

```javascript
import { getSyncStatus } from './scripts/syncManager.js';

const status = await getSyncStatus();
console.log('Pending:', status.pendingCount);
console.log('Syncing:', status.isSyncing);
console.log('Online:', status.online);
```

## Integration Points

### Files Modified

1. **index.html** - Added offline infrastructure scripts
2. **service-worker.js** - Added API request handling and background sync
3. **entry.html** - (May need offline scripts if used)

### Files Created

1. `1fe/homepage/scripts/dbManager.js`
2. `1fe/homepage/scripts/apiClient.js`
3. `1fe/homepage/scripts/syncManager.js`
4. `1fe/homepage/scripts/offlineIndicator.js`
5. `1fe/homepage/scripts/fetchWrapper.js`
6. `2be/sync_pending_data.php` - Batch sync endpoint (optional)

## Testing

### Test Offline Mode

1. Open browser DevTools → Network tab
2. Check "Offline" checkbox
3. Use the app - should work with cached data
4. Make changes (save progress, etc.)
5. Uncheck "Offline" - changes should sync automatically

### Test Sync Queue

1. Go offline
2. Perform actions that trigger POST requests
3. Check IndexedDB → Application tab → IndexedDB → CodeTropaDB → syncQueue
4. Go online - queue should empty automatically

## Notes

- All existing fetch calls work without modification
- Optimistic UI updates for queued operations
- Automatic retry with exponential backoff
- Sync status visible in offline indicator
- Data persists across browser sessions

## Future Enhancements

- Batch sync endpoint for better performance
- Conflict resolution for concurrent edits
- Sync status API endpoint
- Offline-first data strategy
- Background sync API (when supported)


