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
  event.respondWith
    // Check cache for offlineJS.js first when offline
    (async () => {
      if (!navigator.onLine && event.request.url.includes('offlineJS.js')) {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
      }
      // Otherwise, proceed with network-first strategy
      return fetch(event.request)
      .then(response => {
        // If the request is for a cached asset, update the cache with the new response
        if (event.request.method === 'GET' && FILES_TO_CACHE.includes(event.request.url.replace(self.location.origin, '.'))) {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      })
      .catch(() => {
        // If network fails, try to serve from cache
        return caches.match(event.request);
      })
});
});
