const CACHE_NAME = 'offline-cache-v1-modulingXserviceworker';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './script.js',
  './offlineJS.js',
  './service-worker.js'
];

// Install Service Worker and cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(FILES_TO_CACHE);
      })
      .catch(error => {
        console.error('Cache failed:', error);
      })
  );
});

// Fetch event: Network-first strategy
self.addEventListener('fetch', event => {
  // Bypass service worker for online-check.txt
  if (event.request.url.includes('/online-check.txt')) {
    return;
  }
  event.respondWith(async function() {
    // For offlineJS.js, try cache first when offline
    if (event.request.url.includes('offlineJS.js')) {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    // Try network first for all other requests
    try {
      const response = await fetch(event.request);
      // If the request is for a cached asset, update the cache with the new response
      if (event.request.method === 'GET' && FILES_TO_CACHE.includes(event.request.url.replace(self.location.origin, '.'))) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, response.clone());
      }
      return response;
    } catch (error) {
      // Network request failed, try cache
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }

      // If not in cache, and it's a navigation request, return cached index.html
      if (event.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
      throw error; // Re-throw if nothing can be served
    }
  }());
});
