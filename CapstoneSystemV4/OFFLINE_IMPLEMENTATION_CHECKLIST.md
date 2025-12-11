# Offline Capabilities Implementation Checklist

## Quick Reference: Files to Modify/Create

### Files to CREATE (New)

#### Core Offline Infrastructure
- [ ] `CapstoneSystemV4/1fe/homepage/scripts/apiClient.js` - API wrapper with offline support
- [ ] `CapstoneSystemV4/1fe/homepage/scripts/dbManager.js` - IndexedDB manager
- [ ] `CapstoneSystemV4/1fe/homepage/scripts/syncManager.js` - Background sync manager
- [ ] `CapstoneSystemV4/1fe/homepage/scripts/offlineIndicator.js` - UI for offline status

#### Backend Sync Support
- [ ] `CapstoneSystemV4/2be/sync_pending_data.php` - Batch sync endpoint
- [ ] `CapstoneSystemV4/2be/get_cached_data.php` - Get cached data endpoint

### Files to MODIFY (Existing)

#### Service Worker
- [ ] `CapstoneSystemV4/sw.js` - Enhance with API caching and IndexedDB support

#### Frontend Scripts
- [ ] `CapstoneSystemV4/1fe/homepage/scripts/fetchProfileData.js` - Add offline fallback
- [ ] `CapstoneSystemV4/1fe/homepage/scripts/progressBar.js` - Use cached data
- [ ] `CapstoneSystemV4/1fe/homepage/scripts/loadBadges.js` - Cache badges
- [ ] `CapstoneSystemV4/1fe/homepage/scripts/loadLeaderboard.js` - Cache leaderboard
- [ ] `CapstoneSystemV4/1fe/homepage/scripts/lockLevels.js` - Use cached unlock status
- [ ] `CapstoneSystemV4/1fe/homepage/scripts/lockStoryMode.js` - Use cached unlock status

#### Story Mode Progress Saving
- [ ] `CapstoneSystemV4/1fe/homepage/2ch/challengeData.js` - Queue save_story_progress.php calls
- [ ] `CapstoneSystemV4/1fe/homepage/1sm/1j/ep1/index.html` - Queue save_story_progress.php calls
- [ ] All other episode files in `1sm/` directories - Queue save operations

#### Challenge Mode Progress Saving
- [ ] `CapstoneSystemV4/1fe/homepage/2ch/challengeData.js` - Queue save_challenge_progress.php calls
- [ ] `CapstoneSystemV4/1fe/homepage/2ch/index.html` - Queue save operations

#### Assessment System
- [ ] `CapstoneSystemV4/1fe/asmt/pretest.html` - Queue submit_pretest.php calls
- [ ] `CapstoneSystemV4/1fe/asmt/posttest.html` - Queue submit_posttest.php calls

#### Main Homepage
- [ ] `CapstoneSystemV4/1fe/homepage/index.html` - Add offline indicator UI
- [ ] `CapstoneSystemV4/1fe/homepage/index.html` - Update recommendations loading

#### Service Worker Registration
- [ ] `CapstoneSystemV4/1fe/homepage/scripts/registerSW.js` - Update registration

### Files to REVIEW (May Need Changes)

#### Backend Endpoints (Add Caching Headers)
- [ ] `CapstoneSystemV4/2be/get_profile_data.php` - Add ETag/Last-Modified
- [ ] `CapstoneSystemV4/2be/get_performance_data.php` - Add ETag/Last-Modified
- [ ] `CapstoneSystemV4/2be/get_badges.php` - Add ETag/Last-Modified
- [ ] `CapstoneSystemV4/2be/get_unlocked_story_progress.php` - Add ETag/Last-Modified
- [ ] `CapstoneSystemV4/2be/get_unlocked_levels.php` - Add ETag/Last-Modified
- [ ] `CapstoneSystemV4/2be/get_leaderboard_data.php` - Add ETag/Last-Modified

## Implementation Phases

### Phase 1: Enhanced Service Worker ✅
**Goal**: Cache static assets and API responses

#### Tasks
- [ ] Update `sw.js` to cache HTML, CSS, JS files
- [ ] Add cache strategy for images (PNG, JPG)
- [ ] Add cache strategy for audio files (MP3, WAV)
- [ ] Implement stale-while-revalidate for API GET requests
- [ ] Add cache versioning
- [ ] Test cache invalidation

#### Success Criteria
- ✅ Static assets load offline
- ✅ Cached API responses available offline
- ✅ Videos continue to work (already implemented)

### Phase 2: IndexedDB Integration ✅
**Goal**: Local database for offline data storage

#### Tasks
- [ ] Create `dbManager.js` with IndexedDB schema
- [ ] Implement stores: profile, progress, performance, assessments, badges, syncQueue
- [ ] Add CRUD operations for each store
- [ ] Create indexes for efficient queries
- [ ] Add data migration support
- [ ] Test IndexedDB operations

#### Success Criteria
- ✅ Data persists in IndexedDB
- ✅ Can query local data offline
- ✅ Data survives page refresh

### Phase 3: API Client Wrapper ✅
**Goal**: Intercept API calls and handle offline scenarios

#### Tasks
- [ ] Create `apiClient.js` wrapper
- [ ] Intercept all fetch() calls
- [ ] Queue POST requests when offline
- [ ] Return cached data for GET requests when offline
- [ ] Add retry logic for failed requests
- [ ] Update all fetch() calls to use apiClient

#### Success Criteria
- ✅ GET requests use cache when offline
- ✅ POST requests queue when offline
- ✅ No breaking changes to existing code

### Phase 4: Sync Manager ✅
**Goal**: Background sync of queued operations

#### Tasks
- [ ] Create `syncManager.js`
- [ ] Implement Background Sync API integration
- [ ] Create sync queue processor
- [ ] Add conflict resolution logic
- [ ] Add sync status tracking
- [ ] Create `sync_pending_data.php` endpoint
- [ ] Test sync on connection restore

#### Success Criteria
- ✅ Queued operations sync automatically
- ✅ Conflicts resolved correctly
- ✅ User notified of sync status

### Phase 5: Update Existing Scripts ✅
**Goal**: Integrate offline support into existing features

#### Tasks
- [ ] Update `fetchProfileData.js` to use cache
- [ ] Update `progressBar.js` to use cached progress
- [ ] Update `loadBadges.js` to cache badges
- [ ] Update `loadLeaderboard.js` to cache leaderboard
- [ ] Update `lockLevels.js` to use cached unlock status
- [ ] Update `lockStoryMode.js` to use cached unlock status
- [ ] Update story mode save operations
- [ ] Update challenge mode save operations
- [ ] Update assessment submissions

#### Success Criteria
- ✅ All features work offline
- ✅ Progress saves queue properly
- ✅ UI shows correct cached data

### Phase 6: Offline UI Indicators ✅
**Goal**: User feedback for offline status

#### Tasks
- [ ] Create `offlineIndicator.js`
- [ ] Add online/offline status indicator
- [ ] Show pending sync count
- [ ] Show last sync time
- [ ] Add manual sync button
- [ ] Add sync progress indicator
- [ ] Add error notifications

#### Success Criteria
- ✅ User knows when offline
- ✅ User sees sync status
- ✅ User can manually trigger sync

### Phase 7: Backend Enhancements ✅
**Goal**: Support efficient caching and batch sync

#### Tasks
- [ ] Add ETag headers to GET endpoints
- [ ] Add Last-Modified headers
- [ ] Create `sync_pending_data.php` for batch operations
- [ ] Add validation for synced data
- [ ] Add conflict detection
- [ ] Optimize database queries

#### Success Criteria
- ✅ Efficient cache validation
- ✅ Batch sync works correctly
- ✅ Data integrity maintained

## Testing Checklist

### Unit Tests
- [ ] Test IndexedDB operations
- [ ] Test API client wrapper
- [ ] Test sync queue
- [ ] Test conflict resolution

### Integration Tests
- [ ] Test offline story mode
- [ ] Test offline challenge mode
- [ ] Test offline progress saving
- [ ] Test offline assessment submission
- [ ] Test sync on reconnect

### Manual Testing
- [ ] Disable network, verify app works
- [ ] Make changes offline, verify sync
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Test with slow network
- [ ] Test with intermittent connectivity

### Edge Cases
- [ ] Multiple tabs open
- [ ] Browser storage limits
- [ ] Concurrent edits
- [ ] Sync failures
- [ ] Data corruption recovery

## Browser Compatibility Matrix

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Service Workers | ✅ | ✅ | ✅ | ✅ |
| IndexedDB | ✅ | ✅ | ✅ | ✅ |
| Background Sync | ✅ | ⚠️ | ❌ | ✅ |
| Fetch API | ✅ | ✅ | ✅ | ✅ |
| Cache API | ✅ | ✅ | ✅ | ✅ |

**Legend**: ✅ Full Support | ⚠️ Partial Support | ❌ No Support

## Performance Targets

- **Cache Size**: < 100 MB (excluding videos)
- **IndexedDB Size**: < 10 MB per user
- **Sync Time**: < 5 seconds for typical queue
- **Offline Load Time**: < 2 seconds for cached pages
- **API Response Cache**: < 1 MB total

## Security Checklist

- [ ] Encrypt sensitive data in IndexedDB
- [ ] Validate all synced data on server
- [ ] Prevent replay attacks
- [ ] Clear cache on logout
- [ ] Respect privacy settings
- [ ] Handle session expiration

## Documentation Tasks

- [ ] Update README with offline features
- [ ] Document API client usage
- [ ] Document IndexedDB schema
- [ ] Document sync process
- [ ] Create user guide for offline mode
- [ ] Document troubleshooting steps

## Rollout Plan

### Stage 1: Internal Testing
- [ ] Deploy to staging environment
- [ ] Test with internal users
- [ ] Fix critical bugs
- [ ] Performance testing

### Stage 2: Beta Testing
- [ ] Deploy to beta environment
- [ ] Select beta testers
- [ ] Collect feedback
- [ ] Iterate on issues

### Stage 3: Gradual Rollout
- [ ] Deploy to 10% of users
- [ ] Monitor error rates
- [ ] Monitor sync success rates
- [ ] Increase to 50% if stable
- [ ] Full rollout if successful

## Success Metrics

### User Metrics
- [ ] % of users using offline mode
- [ ] Average offline session duration
- [ ] Sync success rate
- [ ] User satisfaction score

### Technical Metrics
- [ ] Cache hit rate
- [ ] Sync queue size
- [ ] Sync failure rate
- [ ] Storage usage
- [ ] Performance impact

## Known Limitations

1. **Background Sync**: Not available in Firefox/Safari
   - **Workaround**: Manual sync button + periodic checks

2. **Storage Limits**: Browser storage quotas vary
   - **Workaround**: Monitor usage, warn users, implement LRU eviction

3. **Session Management**: Cannot login offline
   - **Workaround**: Session must be established online first

4. **Real-time Features**: Leaderboard not real-time offline
   - **Workaround**: Show cached data with timestamp

## Future Enhancements

- [ ] Offline code compilation (WebAssembly)
- [ ] Peer-to-peer sync between devices
- [ ] Offline analytics
- [ ] Progressive Web App (PWA) installation
- [ ] Push notifications for sync status
- [ ] Advanced conflict resolution UI

## Notes

- All changes should be backward compatible
- Existing functionality must not break
- Graceful degradation for unsupported browsers
- Clear error messages for users
- Comprehensive logging for debugging

