const CACHE_NAME = 'code-tropa-offline-cache-storymode-2cP';
const FILES_TO_CACHE = [
    // 1fe/homepage/1sm/2cP (root files)
    './1fe/homepage/1sm/2cP/tips.js',
  
    // 1fe/homepage/1sm/2cP/ep1
    './1fe/homepage/1sm/2cP/ep1/index.html',
    './1fe/homepage/1sm/2cP/ep1/index-copy.html',
    './1fe/homepage/1sm/2cP/ep1/objectives.js',
    './1fe/homepage/1sm/2cP/ep1/solutions.js',
    './1fe/homepage/1sm/2cP/ep1/assets/1.mkv',
    './1fe/homepage/1sm/2cP/ep1/assets/1.mp4',
    './1fe/homepage/1sm/2cP/ep1/assets/1.PNG',
    './1fe/homepage/1sm/2cP/ep1/assets/2.mp4',
    './1fe/homepage/1sm/2cP/ep1/assets/3.mp4',
    './1fe/homepage/1sm/2cP/ep1/assets/4.mp4',
    './1fe/homepage/1sm/2cP/ep1/assets/5.mp4',
    './1fe/homepage/1sm/2cP/ep1/assets/6.mp4',
    './1fe/homepage/1sm/2cP/ep1/assets/7.png',
    './1fe/homepage/1sm/2cP/ep1/assets/8.mp4',
    './1fe/homepage/1sm/2cP/ep1/assets/9.mp4',
    './1fe/homepage/1sm/2cP/ep1/assets/bg.png',
    './1fe/homepage/1sm/2cP/ep1/assets/ica.png',
    './1fe/homepage/1sm/2cP/ep1/assets/kapitan.png',
  
    // 1fe/homepage/1sm/2cP/ep2
    './1fe/homepage/1sm/2cP/ep2/index.html',
    './1fe/homepage/1sm/2cP/ep2/objectives.js',
    './1fe/homepage/1sm/2cP/ep2/solutions.js',
    './1fe/homepage/1sm/2cP/ep2/assets/1.mp4',
    './1fe/homepage/1sm/2cP/ep2/assets/1.PNG',
    './1fe/homepage/1sm/2cP/ep2/assets/2.mp4',
    './1fe/homepage/1sm/2cP/ep2/assets/3.mp4',
    './1fe/homepage/1sm/2cP/ep2/assets/4.mp4',
    './1fe/homepage/1sm/2cP/ep2/assets/5.mp4',
    './1fe/homepage/1sm/2cP/ep2/assets/bg.png',
    './1fe/homepage/1sm/2cP/ep2/assets/ica.png',
    './1fe/homepage/1sm/2cP/ep2/assets/nena.png',
    './1fe/homepage/1sm/2cP/ep2/assets/paper.png',
  
    // 1fe/homepage/1sm/2cP/ep3
    './1fe/homepage/1sm/2cP/ep3/index.html',
    './1fe/homepage/1sm/2cP/ep3/objectives.js',
    './1fe/homepage/1sm/2cP/ep3/solutions.js',
    './1fe/homepage/1sm/2cP/ep3/assets/1.mp4',
    './1fe/homepage/1sm/2cP/ep3/assets/1.PNG',
    './1fe/homepage/1sm/2cP/ep3/assets/2.mp4',
    './1fe/homepage/1sm/2cP/ep3/assets/2.PNG',
    './1fe/homepage/1sm/2cP/ep3/assets/3.mp4',
    './1fe/homepage/1sm/2cP/ep3/assets/3.PNG',
    './1fe/homepage/1sm/2cP/ep3/assets/4.mp4',
    './1fe/homepage/1sm/2cP/ep3/assets/5.mp4',
    './1fe/homepage/1sm/2cP/ep3/assets/6.png',
    './1fe/homepage/1sm/2cP/ep3/assets/bg.jpg',
    './1fe/homepage/1sm/2cP/ep3/assets/ica.png',
    './1fe/homepage/1sm/2cP/ep3/assets/kapitan.png',
    './1fe/homepage/1sm/2cP/ep3/assets/paper.png',
  
    // 1fe/homepage/1sm/2cP/ep4
    './1fe/homepage/1sm/2cP/ep4/index.html',
    './1fe/homepage/1sm/2cP/ep4/objectives.js',
    './1fe/homepage/1sm/2cP/ep4/solutions.js',
    './1fe/homepage/1sm/2cP/ep4/assets/1.mp4',
    './1fe/homepage/1sm/2cP/ep4/assets/1.PNG',
    './1fe/homepage/1sm/2cP/ep4/assets/2.mp4',
    './1fe/homepage/1sm/2cP/ep4/assets/2.PNG',
    './1fe/homepage/1sm/2cP/ep4/assets/3.mp4',
    './1fe/homepage/1sm/2cP/ep4/assets/4.mp4',
    './1fe/homepage/1sm/2cP/ep4/assets/5.mp4',
    './1fe/homepage/1sm/2cP/ep4/assets/bg.png',
    './1fe/homepage/1sm/2cP/ep4/assets/ica.png',
    './1fe/homepage/1sm/2cP/ep4/assets/liza.png',
    './1fe/homepage/1sm/2cP/ep4/assets/pao.png',
  
    // 1fe/homepage/1sm/2cP/ep5
    './1fe/homepage/1sm/2cP/ep5/index.html',
    './1fe/homepage/1sm/2cP/ep5/objectives.js',
    './1fe/homepage/1sm/2cP/ep5/solutions.js',
    './1fe/homepage/1sm/2cP/ep5/assets/1.mkv',
    './1fe/homepage/1sm/2cP/ep5/assets/1.mp4',
    './1fe/homepage/1sm/2cP/ep5/assets/2.mkv',
    './1fe/homepage/1sm/2cP/ep5/assets/2.mp4',
    './1fe/homepage/1sm/2cP/ep5/assets/3.mp4',
    './1fe/homepage/1sm/2cP/ep5/assets/3.PNG',
    './1fe/homepage/1sm/2cP/ep5/assets/4.mkv',
    './1fe/homepage/1sm/2cP/ep5/assets/4.png',
    './1fe/homepage/1sm/2cP/ep5/assets/bg.png',
    './1fe/homepage/1sm/2cP/ep5/assets/ica.png',
    './1fe/homepage/1sm/2cP/ep5/assets/pao.png',
  
    // 1fe/homepage/1sm/2cP/ep6
    './1fe/homepage/1sm/2cP/ep6/index.html',
    './1fe/homepage/1sm/2cP/ep6/objectives.js',
    './1fe/homepage/1sm/2cP/ep6/solutions.js',
    './1fe/homepage/1sm/2cP/ep6/assets/1.mp4',
    './1fe/homepage/1sm/2cP/ep6/assets/1.PNG',
    './1fe/homepage/1sm/2cP/ep6/assets/2.mp4',
    './1fe/homepage/1sm/2cP/ep6/assets/2.PNG',
    './1fe/homepage/1sm/2cP/ep6/assets/3.mp4',
    './1fe/homepage/1sm/2cP/ep6/assets/3.PNG',
    './1fe/homepage/1sm/2cP/ep6/assets/4.mp4',
    './1fe/homepage/1sm/2cP/ep6/assets/bg.png',
    './1fe/homepage/1sm/2cP/ep6/assets/ica.png',
    './1fe/homepage/1sm/2cP/ep6/assets/pao.png',
  
    // 1fe/homepage/1sm/2cP/ep7
    './1fe/homepage/1sm/2cP/ep7/index.html',
    './1fe/homepage/1sm/2cP/ep7/objectives.js',
    './1fe/homepage/1sm/2cP/ep7/solutions.js',
    './1fe/homepage/1sm/2cP/ep7/assets/1.mp4',
    './1fe/homepage/1sm/2cP/ep7/assets/1.PNG',
    './1fe/homepage/1sm/2cP/ep7/assets/2.mp4',
    './1fe/homepage/1sm/2cP/ep7/assets/2.PNG',
    './1fe/homepage/1sm/2cP/ep7/assets/3.mp4',
    './1fe/homepage/1sm/2cP/ep7/assets/3.PNG',
    './1fe/homepage/1sm/2cP/ep7/assets/4.mp4',
    './1fe/homepage/1sm/2cP/ep7/assets/4.PNG',
    './1fe/homepage/1sm/2cP/ep7/assets/5.mp4',
    './1fe/homepage/1sm/2cP/ep7/assets/5.PNG',
    './1fe/homepage/1sm/2cP/ep7/assets/6_.mp4',
    './1fe/homepage/1sm/2cP/ep7/assets/albolaryo.png',
    './1fe/homepage/1sm/2cP/ep7/assets/bg.png',
    './1fe/homepage/1sm/2cP/ep7/assets/ica.png',
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

// Fetch cached files if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
      .catch(error => {
        console.error('Fetch failed:', error);
        // Return a basic error response instead of undefined
        return new Response('Network error happened', {
          status: 408,
          statusText: 'Request Timeout',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      })
  );
});
