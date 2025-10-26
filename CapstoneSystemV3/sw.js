/**
 * Code-Tropa Video Cache Service Worker
 * Caches all MP4 videos for instant loading
 */

const CACHE_NAME = 'code-tropa-videos-v1';

// Service worker will discover and cache videos dynamically

// Function to dynamically add videos as they are accessed
function addVideoToCache(videoUrl) {
    return fetch(videoUrl)
        .then(response => {
            if (response.ok) {
                return caches.open(CACHE_NAME)
                    .then(cache => {
                        return cache.put(videoUrl, response);
                    });
            }
            return null;
        })
        .catch(error => {
            console.warn(`Failed to cache ${videoUrl}:`, error);
            return null;
        });
}

// Install event - try to cache background video with smart path detection
self.addEventListener('install', event => {
    console.log('🚀 Video Cache Service Worker installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📹 Looking for background video...');
                return findAndCacheBackgroundVideo(cache);
            })
            .then(() => {
                console.log('✅ Service worker installation complete!');
                console.log('💡 Videos will be cached as they are accessed');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Service worker installation failed:', error);
                return self.skipWaiting(); // Continue anyway
            })
    );
});

// Smart function to find and cache the background video
async function findAndCacheBackgroundVideo(cache) {
    const possiblePaths = [
        '../assets/bg.mp4',
        './assets/bg.mp4',
        '/CapstoneSystemV3/assets/bg.mp4',
        '/assets/bg.mp4'
    ];
    
    for (const path of possiblePaths) {
        try {
            const response = await fetch(path, { method: 'HEAD' });
            if (response.ok) {
                console.log(`✅ Found background video at: ${path}`);
                await cache.add(path);
                console.log('✅ Background video cached successfully!');
                return;
            }
        } catch (error) {
            // Path doesn't work, try next one
            console.log(`⚠️ Path not found: ${path}`);
        }
    }
    
    console.log('💡 Background video not found, will cache when accessed');
}

// Smart video discovery - only cache videos that actually exist
async function discoverAndCacheVideos() {
    const cache = await caches.open(CACHE_NAME);
    const discoveredVideos = [];
    
    // Only check a few key videos that are likely to exist
    const videoPatterns = [
        // Just check a few common ones - don't overwhelm
        './1sm/1j/ep1/assets/1.mp4',
        './1sm/1j/ep1/assets/2.mp4',
        './1sm/1j/ep1/assets/3.mp4'
    ];
    
    console.log('🔍 Discovering existing videos...');
    
    for (const videoUrl of videoPatterns) {
        try {
            const response = await fetch(videoUrl, { method: 'HEAD' });
            if (response.ok) {
                discoveredVideos.push(videoUrl);
                console.log(`✅ Found video: ${videoUrl}`);
            }
        } catch (error) {
            // Video doesn't exist, skip silently
        }
    }
    
    if (discoveredVideos.length > 0) {
        console.log(`📹 Caching ${discoveredVideos.length} discovered videos...`);
        await cache.addAll(discoveredVideos);
        console.log('✅ Discovered videos cached successfully!');
    } else {
        console.log('💡 No additional videos found to cache');
    }
}

// Activate event - clean up old caches and discover videos
self.addEventListener('activate', event => {
    console.log('Video Cache Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Video Cache Service Worker activated');
                // Discover and cache existing videos
                return discoverAndCacheVideos();
            })
            .then(() => {
                return self.clients.claim();
            })
    );
});

// Fetch event - serve videos from cache and cache new ones
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Only handle MP4 video requests
    if (request.method !== 'GET' || !url.pathname.endsWith('.mp4')) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then(response => {
                if (response) {
                    console.log('✅ Serving video from cache:', url.pathname);
                    return response;
                }
                
                console.log('🌐 Fetching video from network:', url.pathname);
                return fetch(request)
                    .then(response => {
                        // Don't cache if not successful
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone the response
                        const responseToCache = response.clone();
                        
                        // Cache the response for future use
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(request, responseToCache);
                                console.log('💾 Cached new video:', url.pathname);
                            });
                        
                        return response;
                    })
                    .catch(error => {
                        console.error('❌ Video fetch failed:', error);
                        return new Response('Video not available', { status: 404 });
                    });
            })
    );
});

console.log('Code-Tropa Video Cache Service Worker loaded');
