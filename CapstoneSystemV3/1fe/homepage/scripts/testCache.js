/**
 * Test Service Worker Caching
 * Simple test to verify video caching is working
 */

document.addEventListener('DOMContentLoaded', () => {
    // Test if service worker is working
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            console.log('🔍 Testing video cache...');
            
            // Test caching the background video
            testVideoCache('../assets/bg.mp4');
        });
    }
});

function testVideoCache(videoUrl) {
    // Create a test video element
    const testVideo = document.createElement('video');
    testVideo.src = videoUrl;
    testVideo.style.display = 'none';
    document.body.appendChild(testVideo);
    
    testVideo.addEventListener('loadeddata', () => {
        console.log('✅ Video loaded successfully:', videoUrl);
        console.log('💾 Video should now be cached for future visits');
        
        // Check cache status
        checkCacheStatus();
        
        // Clean up
        document.body.removeChild(testVideo);
    });
    
    testVideo.addEventListener('error', (e) => {
        console.log('❌ Video failed to load:', videoUrl, e);
    });
}

async function checkCacheStatus() {
    try {
        const cacheNames = await caches.keys();
        console.log('📦 Available caches:', cacheNames);
        
        if (cacheNames.includes('code-tropa-videos-v1')) {
            const cache = await caches.open('code-tropa-videos-v1');
            const keys = await cache.keys();
            console.log('🎥 Cached videos:', keys.length);
            keys.forEach(key => {
                console.log('  -', key.url);
            });
        }
    } catch (error) {
        console.log('❌ Error checking cache:', error);
    }
}
