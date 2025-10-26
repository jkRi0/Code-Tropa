/**
 * Simple Service Worker Registration
 * Registers the video cache service worker
 */

document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../../sw.js')
            .then(registration => {
                console.log('✅ Video Cache Service Worker registered successfully');
            })
            .catch(error => {
                console.error('❌ Service Worker registration failed:', error);
            });
    } else {
        console.warn('Service Worker not supported - videos will not be cached');
    }
});
