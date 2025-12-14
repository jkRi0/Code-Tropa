const CACHE_NAME = 'pwa-sample-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/services.html',
  '/gallery.html',
  '/contact.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Try to add all URLs, but don't fail if some are missing
        return Promise.allSettled(
          urlsToCache.map((url) => {
            return cache.add(url).catch((error) => {
              console.warn(`Failed to cache ${url}:`, error);
              // Return null for failed items, but don't fail the whole operation
              return null;
            });
          })
        );
      })
      .then(() => {
        console.log('Cache installation completed');
      })
      .catch((error) => {
        console.error('Cache installation failed:', error);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response;
        }
        
        // For navigation requests, try index.html as fallback
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html')
            .then((cachedIndex) => {
              if (cachedIndex) {
                return cachedIndex;
              }
              // If index.html is not cached, try to fetch it
              return fetch(event.request);
            });
        }
        
        // Otherwise, try to fetch from network
        return fetch(event.request)
          .then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            // Cache the fetched resource
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch((error) => {
            console.log('Fetch failed:', event.request.url, error);
            // If fetch fails and we don't have it in cache
            // For navigation requests, try to return index.html
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            // For other requests, try to find a similar cached resource
            // This handles cases where the URL might be slightly different
            return caches.match(event.request.url);
          });
      })
      .catch((error) => {
        console.error('Cache match failed:', error);
        // Last resort: try to return index.html for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        // Return undefined to show browser's offline page
        return undefined;
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all pages immediately
  return self.clients.claim();
});

