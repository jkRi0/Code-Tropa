// IndexedDB Manager for Code-Tropa Offline Storage
// Manages local data storage and sync queue

const DB_NAME = 'CodeTropaDB';
const DB_VERSION = 1;

// Store names
export const STORES = {
    PROFILE: 'profile',
    PROGRESS: 'progress',
    BADGES: 'badges',
    UNLOCKED_LEVELS: 'unlockedLevels',
    UNLOCKED_STORY: 'unlockedStory',
    PERFORMANCE: 'performance',
    ASSESSMENTS: 'assessments',
    SYNC_QUEUE: 'syncQueue',
    CACHE: 'cache'
};

let db = null;

// Initialize IndexedDB
export function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            console.error('IndexedDB error:', request.error);
            reject(request.error);
        };

        request.onsuccess = () => {
            db = request.result;
            console.log('IndexedDB opened successfully');
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Profile store
            if (!db.objectStoreNames.contains(STORES.PROFILE)) {
                const profileStore = db.createObjectStore(STORES.PROFILE, { keyPath: 'id' });
                profileStore.createIndex('username', 'username', { unique: false });
            }

            // Progress store
            if (!db.objectStoreNames.contains(STORES.PROGRESS)) {
                const progressStore = db.createObjectStore(STORES.PROGRESS, { keyPath: 'id', autoIncrement: true });
                progressStore.createIndex('userId', 'userId', { unique: false });
                progressStore.createIndex('type', 'type', { unique: false });
                progressStore.createIndex('language', 'language', { unique: false });
            }

            // Badges store
            if (!db.objectStoreNames.contains(STORES.BADGES)) {
                const badgesStore = db.createObjectStore(STORES.BADGES, { keyPath: 'id', autoIncrement: true });
                badgesStore.createIndex('userId', 'userId', { unique: false });
                badgesStore.createIndex('language', 'language', { unique: false });
            }

            // Unlocked levels store
            if (!db.objectStoreNames.contains(STORES.UNLOCKED_LEVELS)) {
                const unlockedStore = db.createObjectStore(STORES.UNLOCKED_LEVELS, { keyPath: 'id', autoIncrement: true });
                unlockedStore.createIndex('userId', 'userId', { unique: false });
                unlockedStore.createIndex('language', 'language', { unique: false });
            }

            // Unlocked story store
            if (!db.objectStoreNames.contains(STORES.UNLOCKED_STORY)) {
                const storyStore = db.createObjectStore(STORES.UNLOCKED_STORY, { keyPath: 'id', autoIncrement: true });
                storyStore.createIndex('userId', 'userId', { unique: false });
                storyStore.createIndex('language', 'language', { unique: false });
            }

            // Performance store
            if (!db.objectStoreNames.contains(STORES.PERFORMANCE)) {
                const performanceStore = db.createObjectStore(STORES.PERFORMANCE, { keyPath: 'id', autoIncrement: true });
                performanceStore.createIndex('userId', 'userId', { unique: false });
            }

            // Assessments store
            if (!db.objectStoreNames.contains(STORES.ASSESSMENTS)) {
                const assessmentStore = db.createObjectStore(STORES.ASSESSMENTS, { keyPath: 'id', autoIncrement: true });
                assessmentStore.createIndex('userId', 'userId', { unique: false });
                assessmentStore.createIndex('type', 'type', { unique: false });
            }

            // Sync queue store
            if (!db.objectStoreNames.contains(STORES.SYNC_QUEUE)) {
                const syncStore = db.createObjectStore(STORES.SYNC_QUEUE, { keyPath: 'id', autoIncrement: true });
                syncStore.createIndex('timestamp', 'timestamp', { unique: false });
                syncStore.createIndex('status', 'status', { unique: false });
            }

            // Cache store for API responses
            if (!db.objectStoreNames.contains(STORES.CACHE)) {
                const cacheStore = db.createObjectStore(STORES.CACHE, { keyPath: 'url' });
                cacheStore.createIndex('timestamp', 'timestamp', { unique: false });
            }
        };
    });
}

// Generic CRUD operations
export async function saveData(storeName, data) {
    if (!db) await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(data);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function getData(storeName, key) {
    if (!db) await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function getAllData(storeName, indexName = null, query = null) {
    if (!db) await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = indexName && query 
            ? store.index(indexName).getAll(query)
            : store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function deleteData(storeName, key) {
    if (!db) await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

export async function clearStore(storeName) {
    if (!db) await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Sync queue operations
export async function addToSyncQueue(url, method, body, headers = {}) {
    const queueItem = {
        url,
        method,
        body,
        headers,
        timestamp: Date.now(),
        status: 'pending',
        retries: 0
    };
    return saveData(STORES.SYNC_QUEUE, queueItem);
}

export async function getSyncQueue() {
    return getAllData(STORES.SYNC_QUEUE);
}

export async function getPendingSyncQueue() {
    if (!db) await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORES.SYNC_QUEUE], 'readonly');
        const store = transaction.objectStore(STORES.SYNC_QUEUE);
        const index = store.index('status');
        const request = index.getAll('pending');
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function updateSyncQueueItem(id, updates) {
    const item = await getData(STORES.SYNC_QUEUE, id);
    if (item) {
        Object.assign(item, updates);
        return saveData(STORES.SYNC_QUEUE, item);
    }
}

export async function removeFromSyncQueue(id) {
    return deleteData(STORES.SYNC_QUEUE, id);
}

// Cache operations
export async function cacheResponse(url, response, maxAge = 3600000) { // 1 hour default
    const cacheItem = {
        url,
        response,
        timestamp: Date.now(),
        maxAge
    };
    return saveData(STORES.CACHE, cacheItem);
}

export async function getCachedResponse(url) {
    const cached = await getData(STORES.CACHE, url);
    if (cached && (Date.now() - cached.timestamp) < cached.maxAge) {
        return cached.response;
    }
    if (cached) {
        // Expired, remove it
        await deleteData(STORES.CACHE, url);
    }
    return null;
}

// Profile operations
export async function saveProfile(profileData) {
    return saveData(STORES.PROFILE, { id: 'current', ...profileData });
}

export async function getProfile() {
    return getData(STORES.PROFILE, 'current');
}

// Progress operations
export async function saveProgress(progressData) {
    return saveData(STORES.PROGRESS, progressData);
}

export async function getProgress(userId, type = null, language = null) {
    const allProgress = await getAllData(STORES.PROGRESS);
    return allProgress.filter(p => {
        if (p.userId !== userId) return false;
        if (type && p.type !== type) return false;
        if (language && p.language !== language) return false;
        return true;
    });
}

// Badges operations
export async function saveBadges(badges) {
    // Clear existing and save new
    const existing = await getAllData(STORES.BADGES);
    for (const badge of existing) {
        await deleteData(STORES.BADGES, badge.id);
    }
    // Convert badge strings to objects for IndexedDB
    // Badges come as array of strings like ["b1", "b2"], but IndexedDB needs objects
    for (const badge of badges) {
        // If badge is already an object, use it; otherwise create an object
        const badgeObj = typeof badge === 'string' 
            ? { badgeName: badge } 
            : (badge.badgeName ? badge : { badgeName: badge });
        await saveData(STORES.BADGES, badgeObj);
    }
}

export async function getBadges(userId = null) {
    const allBadges = await getAllData(STORES.BADGES);
    let filtered = userId ? allBadges.filter(b => b.userId === userId) : allBadges;
    // Extract badge names from objects (return as strings for compatibility)
    return filtered.map(b => b.badgeName || b.name || b);
}

// Unlocked levels operations
export async function saveUnlockedLevels(levelsData) {
    // Store with id based on language for easy lookup
    const id = `current_${levelsData.language || 'java'}`;
    return saveData(STORES.UNLOCKED_LEVELS, { id, ...levelsData });
}

export async function getUnlockedLevels(userId, language) {
    // Look up by language
    const id = `current_${language || 'java'}`;
    return getData(STORES.UNLOCKED_LEVELS, id);
}

// Unlocked story operations
export async function saveUnlockedStory(storyData) {
    // Store with id based on language for easy lookup
    const id = `current_${storyData.language || 'java'}`;
    return saveData(STORES.UNLOCKED_STORY, { id, ...storyData });
}

export async function getUnlockedStory(userId, language) {
    // Look up by language
    const id = `current_${language || 'java'}`;
    return getData(STORES.UNLOCKED_STORY, id);
}

// Performance operations
export async function savePerformance(performanceData) {
    return saveData(STORES.PERFORMANCE, performanceData);
}

export async function getPerformance(userId) {
    return getAllData(STORES.PERFORMANCE, 'userId', userId);
}

// Assessment operations
export async function saveAssessment(assessmentData) {
    return saveData(STORES.ASSESSMENTS, assessmentData);
}

export async function getAssessments(userId, type = null) {
    const all = await getAllData(STORES.ASSESSMENTS);
    let filtered = all.filter(a => a.userId === userId);
    if (type) {
        filtered = filtered.filter(a => a.type === type);
    }
    return filtered;
}

// Initialize on load
if (typeof window !== 'undefined') {
    initDB().catch(err => console.error('Failed to initialize IndexedDB:', err));
}


