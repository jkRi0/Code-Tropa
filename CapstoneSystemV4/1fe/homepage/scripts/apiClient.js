// API Client Wrapper for Code-Tropa
// Handles offline storage and sync queue for all API calls

import { 
    addToSyncQueue, 
    getCachedResponse, 
    cacheResponse,
    getProfile,
    saveProfile,
    getProgress,
    saveProgress,
    getBadges,
    saveBadges,
    getUnlockedLevels,
    saveUnlockedLevels,
    getUnlockedStory,
    saveUnlockedStory,
    getPerformance,
    savePerformance,
    getAssessments,
    saveAssessment
} from './dbManager.js';

// API endpoint mappings to data stores
const API_MAPPINGS = {
    'get_profile_data.php': { store: 'profile', handler: handleProfileData },
    'get_performance_data.php': { store: 'performance', handler: handlePerformanceData },
    'get_badges.php': { store: 'badges', handler: handleBadgesData },
    'get_unlocked_levels.php': { store: 'unlockedLevels', handler: handleUnlockedLevels },
    'get_unlocked_story_progress.php': { store: 'unlockedStory', handler: handleUnlockedStory },
    'get_all_players_assessments.php': { store: 'assessments', handler: handleAssessmentsData },
    'get_coding_recommendations.php': { store: 'cache', handler: handleCacheData },
    'get_leaderboard_data.php': { store: 'cache', handler: handleCacheData },
    'get_current_username.php': { store: 'cache', handler: handleCacheData },
    'get_current_language.php': { store: 'cache', handler: handleCacheData }
};

// Check if online
function isOnline() {
    return navigator.onLine;
}

// Extract endpoint name from URL
function getEndpointName(url) {
    const match = url.match(/\/([^\/]+\.php)/);
    return match ? match[1] : null;
}

// Handle profile data
async function handleProfileData(data) {
    if (data.success && data.username) {
        await saveProfile({
            username: data.username,
            totalPoints: data.totalPoints || 0,
            tier: data.tier || 'N/A',
            programmingLanguage: data.programmingLanguage || 'java'
        });
    }
    return data;
}

// Handle performance data
async function handlePerformanceData(data) {
    if (data.success && data.performance) {
        await savePerformance(data.performance);
    }
    return data;
}

// Handle badges data
async function handleBadgesData(data) {
    if (data.success && data.badges) {
        await saveBadges(data.badges);
    }
    return data;
}

// Handle unlocked levels
async function handleUnlockedLevels(data) {
    if (data.success && data.unlockedLevels) {
        // Store with language for proper retrieval
        const language = data.language || 'java';
        await saveUnlockedLevels({
            userId: 'current', // Will be filtered by language
            language: language,
            unlockedLevels: data.unlockedLevels || [],
            completedLevels: data.completedLevels || []
        });
    }
    return data;
}

// Handle unlocked story
async function handleUnlockedStory(data) {
    if (data.success) {
        // Store with language for proper retrieval
        const language = data.language || 'java';
        await saveUnlockedStory({
            userId: 'current', // Will be filtered by language
            language: language,
            unlockedChapters: data.unlockedChapters || [1],
            unlockedEpisodes: data.unlockedEpisodes || [1],
            completedEpisodes: data.completedEpisodes || []
        });
    }
    return data;
}

// Handle assessments data
async function handleAssessmentsData(data) {
    if (data.success && data.assessments) {
        for (const assessment of data.assessments) {
            await saveAssessment(assessment);
        }
    }
    return data;
}

// Handle cache data
async function handleCacheData(data, url) {
    // Cache the response
    await cacheResponse(url, data);
    
    // Also handle get_current_language.php specially - store in profile
    if (url.includes('get_current_language.php') && data.currentLanguage) {
        const profile = await getProfile();
        if (profile) {
            profile.programmingLanguage = data.currentLanguage;
            await saveProfile(profile);
        }
        // Also update localStorage
        localStorage.setItem('selectedLanguage', data.currentLanguage.toLowerCase());
    }
    
    return data;
}

// Main API client function
export async function apiFetch(url, options = {}) {
    const method = (options.method || 'GET').toUpperCase();
    const endpointName = getEndpointName(url);
    const isGetRequest = method === 'GET';

    // If online, try to fetch normally
    if (isOnline()) {
        try {
            // Use original fetch to avoid recursion
            const fetchFn = window._originalFetch || (typeof fetch !== 'undefined' ? fetch : null);
            if (!fetchFn) {
                throw new Error('Fetch not available');
            }
            const response = await fetchFn(url, options);
            
            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            let data;
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                // Non-JSON response, return as text
                const text = await response.text();
                data = { success: response.ok, data: text };
            }

            // Cache successful GET responses
            if (isGetRequest && response.ok && endpointName) {
                const mapping = API_MAPPINGS[endpointName];
                if (mapping) {
                    if (mapping.handler) {
                        await mapping.handler(data, url);
                    } else {
                        await cacheResponse(url, data);
                    }
                }
            }

            return { 
                ok: response.ok, 
                status: response.status, 
                json: () => Promise.resolve(data),
                text: () => Promise.resolve(typeof data === 'string' ? data : JSON.stringify(data))
            };
        } catch (error) {
            console.error('Fetch error:', error);
            // If fetch fails, fall through to offline handling
        }
    }

    // Offline handling
    if (isGetRequest) {
        // For GET requests, try to return cached data
        const cached = await getCachedResponse(url);
        if (cached) {
            console.log('Returning cached data for:', url);
            return { ok: true, status: 200, json: () => Promise.resolve(cached) };
        }

        // Try to get from specific stores
        if (endpointName && API_MAPPINGS[endpointName]) {
            const mapping = API_MAPPINGS[endpointName];
            let cachedData = null;

            switch (mapping.store) {
                case 'profile':
                    const profile = await getProfile();
                    if (profile) {
                        cachedData = {
                            success: true,
                            username: profile.username,
                            totalPoints: profile.totalPoints,
                            tier: profile.tier,
                            programmingLanguage: profile.programmingLanguage
                        };
                    }
                    break;
                case 'badges':
                    const badges = await getBadges();
                    if (badges && badges.length > 0) {
                        cachedData = { success: true, badges };
                    }
                    break;
                case 'unlockedLevels':
                    // Get language from profile or localStorage
                    const profileForLevels = await getProfile();
                    const langForLevels = profileForLevels?.programmingLanguage || localStorage.getItem('selectedLanguage') || 'java';
                    const unlockedLevelsData = await getUnlockedLevels('current', langForLevels);
                    if (unlockedLevelsData) {
                        cachedData = {
                            success: true,
                            language: unlockedLevelsData.language,
                            unlockedLevels: unlockedLevelsData.unlockedLevels || [],
                            completedLevels: unlockedLevelsData.completedLevels || []
                        };
                    }
                    break;
                case 'unlockedStory':
                    // Get language from profile or localStorage
                    const profileForStory = await getProfile();
                    const langForStory = profileForStory?.programmingLanguage || localStorage.getItem('selectedLanguage') || 'java';
                    const unlockedStoryData = await getUnlockedStory('current', langForStory);
                    if (unlockedStoryData) {
                        cachedData = {
                            success: true,
                            language: unlockedStoryData.language,
                            unlockedChapters: unlockedStoryData.unlockedChapters || [1],
                            unlockedEpisodes: unlockedStoryData.unlockedEpisodes || [1],
                            completedEpisodes: unlockedStoryData.completedEpisodes || []
                        };
                    }
                    break;
                case 'performance':
                    const perf = await getPerformance();
                    if (perf && perf.length > 0) {
                        cachedData = { success: true, performance: perf };
                    }
                    break;
                case 'cache':
                    // For cache endpoints, try to get from cache store
                    const cached = await getCachedResponse(url);
                    if (cached) {
                        cachedData = cached;
                    } else if (url.includes('get_current_language.php')) {
                        // Special handling for language - try to get from profile or localStorage
                        const profile = await getProfile();
                        const lang = profile?.programmingLanguage || localStorage.getItem('selectedLanguage') || 'java';
                        cachedData = { currentLanguage: lang };
                    }
                    break;
            }

            if (cachedData) {
                console.log('Returning stored data for:', url);
                return { ok: true, status: 200, json: () => Promise.resolve(cachedData) };
            }
        }

        // No cache available
        return {
            ok: false,
            status: 503,
            json: () => Promise.resolve({
                success: false,
                message: 'Offline - no cached data available'
            })
        };
    } else {
        // For POST/PUT/DELETE requests, queue for sync
        let bodyData = options.body;
        let contentType = 'application/json';
        
        // Preserve original content type
        if (options.headers && options.headers['Content-Type']) {
            contentType = options.headers['Content-Type'];
        }
        
        // Handle different body types
        if (bodyData instanceof FormData) {
            // FormData - convert to string representation (simplified)
            // Note: FormData can't be serialized, so we'll need to handle this differently
            bodyData = null; // Will need to reconstruct from stored data
            contentType = 'application/x-www-form-urlencoded';
        } else if (bodyData && typeof bodyData === 'object') {
            // Object - stringify if not already a string
            bodyData = JSON.stringify(bodyData);
        } else if (typeof bodyData === 'string') {
            // Already a string (could be form-urlencoded or JSON)
            // Keep as-is
        }
        
        const headers = {
            'Content-Type': contentType,
            ...(options.headers || {})
        };
        
        await addToSyncQueue(url, method, bodyData, headers);
        console.log('Queued request for sync:', url);

        // Return success response (optimistic)
        return {
            ok: true,
            status: 202,
            json: () => Promise.resolve({
                success: true,
                message: 'Request queued for sync when online',
                queued: true
            })
        };
    }
}

// Export fetch wrapper
export const fetch = apiFetch;

// Make it available globally
if (typeof window !== 'undefined') {
    window.apiFetch = apiFetch;
}

