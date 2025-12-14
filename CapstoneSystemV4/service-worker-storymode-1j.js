const CACHE_NAME = 'code-tropa-offline-cache-storymode-1j';
const FILES_TO_CACHE = [
    // 1fe/homepage/1sm/1j/ep1
    './1fe/homepage/1sm/1j/ep1/index.html',
    './1fe/homepage/1sm/1j/ep1/assets/1.mkv',
    './1fe/homepage/1sm/1j/ep1/assets/1.mp4',
    './1fe/homepage/1sm/1j/ep1/assets/1.png',
    './1fe/homepage/1sm/1j/ep1/assets/2.mkv',
    './1fe/homepage/1sm/1j/ep1/assets/2.mp4',
    './1fe/homepage/1sm/1j/ep1/assets/2.png',
    './1fe/homepage/1sm/1j/ep1/assets/3.mkv',
    './1fe/homepage/1sm/1j/ep1/assets/3.mp4',
    './1fe/homepage/1sm/1j/ep1/assets/3.png',
    './1fe/homepage/1sm/1j/ep1/assets/4.mp4',
    './1fe/homepage/1sm/1j/ep1/assets/5.mp4',
    './1fe/homepage/1sm/1j/ep1/assets/6.mp4',
    './1fe/homepage/1sm/1j/ep1/assets/7.mp4',
    './1fe/homepage/1sm/1j/ep1/assets/8.mp4',
    './1fe/homepage/1sm/1j/ep1/assets/9.mp4',
    './1fe/homepage/1sm/1j/ep1/assets/10.mp4',
    './1fe/homepage/1sm/1j/ep1/assets/11.mp4',
    './1fe/homepage/1sm/1j/ep1/assets/12.png',
    './1fe/homepage/1sm/1j/ep1/assets/axle.png',
    './1fe/homepage/1sm/1j/ep1/assets/intro.mkv',
    './1fe/homepage/1sm/1j/ep1/assets/justin.png',
    './1fe/homepage/1sm/1j/ep1/assets/laptop.png',
    './1fe/homepage/1sm/1j/ep1/assets/melba.png',
    './1fe/homepage/1sm/1j/ep1/assets/paper.png',
    './1fe/homepage/1sm/1j/ep1/assets/audio/1.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/2.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/5.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/6.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/7.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/8.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/8-1.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/9.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/9-1.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/10.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/11.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/12.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/12-1.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/13-laptop.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/14-laptop.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/15-laptop.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/16-laptop.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/17-laptop.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/18-12.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/intro.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/intro-1.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/intro-2.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/intro-3.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/intro-4.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/intro-5.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/intro-6.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/intro-7.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/intro-8.mp3',
    './1fe/homepage/1sm/1j/ep1/assets/audio/intro-9.mp3',
  
    // 1fe/homepage/1sm/1j/ep2
    './1fe/homepage/1sm/1j/ep2/index.html',
    './1fe/homepage/1sm/1j/ep2/objectives.js',
    './1fe/homepage/1sm/1j/ep2/solutions.js',
    './1fe/homepage/1sm/1j/ep2/assets/1.mkv',
    './1fe/homepage/1sm/1j/ep2/assets/1.mp4',
    './1fe/homepage/1sm/1j/ep2/assets/2.mkv',
    './1fe/homepage/1sm/1j/ep2/assets/2.mp4',
    './1fe/homepage/1sm/1j/ep2/assets/3.mkv',
    './1fe/homepage/1sm/1j/ep2/assets/3.mp4',
    './1fe/homepage/1sm/1j/ep2/assets/4.mkv',
    './1fe/homepage/1sm/1j/ep2/assets/5.mp4',
    './1fe/homepage/1sm/1j/ep2/assets/6.mp4',
    './1fe/homepage/1sm/1j/ep2/assets/7.mp4',
    './1fe/homepage/1sm/1j/ep2/assets/8.mp4',
    './1fe/homepage/1sm/1j/ep2/assets/9.mp4',
    './1fe/homepage/1sm/1j/ep2/assets/10.mp4',
    './1fe/homepage/1sm/1j/ep2/assets/11.mp4',
    './1fe/homepage/1sm/1j/ep2/assets/12.png',
    './1fe/homepage/1sm/1j/ep2/assets/ateKim.png',
    './1fe/homepage/1sm/1j/ep2/assets/axle.png',
    './1fe/homepage/1sm/1j/ep2/assets/bg.png',
    './1fe/homepage/1sm/1j/ep2/assets/staticbg.png',
    './1fe/homepage/1sm/1j/ep2/assets/audio/2.mp3',
    './1fe/homepage/1sm/1j/ep2/assets/audio/2-1.mp3',
    './1fe/homepage/1sm/1j/ep2/assets/audio/3.mp3',
    './1fe/homepage/1sm/1j/ep2/assets/audio/6.mp3',
    './1fe/homepage/1sm/1j/ep2/assets/audio/7.mp3',
    './1fe/homepage/1sm/1j/ep2/assets/audio/8.mp3',
    './1fe/homepage/1sm/1j/ep2/assets/audio/9.mp3',
    './1fe/homepage/1sm/1j/ep2/assets/audio/10.mp3',
    './1fe/homepage/1sm/1j/ep2/assets/audio/11.mp3',
    './1fe/homepage/1sm/1j/ep2/assets/audio/12-note.mp3',
    './1fe/homepage/1sm/1j/ep2/assets/audio/13-note.mp3',
    './1fe/homepage/1sm/1j/ep2/assets/audio/14-note.mp3',
    './1fe/homepage/1sm/1j/ep2/assets/audio/15-note.mp3',
    './1fe/homepage/1sm/1j/ep2/assets/audio/16-note.mp3',
    './1fe/homepage/1sm/1j/ep2/assets/audio/17-note.mp3',
    './1fe/homepage/1sm/1j/ep2/assets/audio/18-6.mp3',
    './1fe/homepage/1sm/1j/ep2/assets/audio/19-7.mp3',
    './1fe/homepage/1sm/1j/ep2/assets/4/backgoungs/1.png',
    './1fe/homepage/1sm/1j/ep2/assets/4/backgoungs/2.png',
    './1fe/homepage/1sm/1j/ep2/assets/4/backgoungs/3.png',
    './1fe/homepage/1sm/1j/ep2/assets/4/backgoungs/4.png',
    './1fe/homepage/1sm/1j/ep2/assets/4/backgoungs/5.png',
    './1fe/homepage/1sm/1j/ep2/assets/4/chibi/b1.png',
    './1fe/homepage/1sm/1j/ep2/assets/4/chibi/b2.png',
    './1fe/homepage/1sm/1j/ep2/assets/4/chibi/f1.png',
    './1fe/homepage/1sm/1j/ep2/assets/4/chibi/f2.png',
    './1fe/homepage/1sm/1j/ep2/assets/4/chibi/l1.png',
    './1fe/homepage/1sm/1j/ep2/assets/4/chibi/l1d.png',
    './1fe/homepage/1sm/1j/ep2/assets/4/chibi/l2.png',
    './1fe/homepage/1sm/1j/ep2/assets/4/chibi/r1.png',
    './1fe/homepage/1sm/1j/ep2/assets/4/chibi/r1d.png',
    './1fe/homepage/1sm/1j/ep2/assets/4/chibi/r2.png',
  
    // 1fe/homepage/1sm/1j/ep3
    './1fe/homepage/1sm/1j/ep3/index.html',
    './1fe/homepage/1sm/1j/ep3/objectives.js',
    './1fe/homepage/1sm/1j/ep3/solutions.js',
    './1fe/homepage/1sm/1j/ep3/assets/1.mkv',
    './1fe/homepage/1sm/1j/ep3/assets/1.mp4',
    './1fe/homepage/1sm/1j/ep3/assets/1.png',
    './1fe/homepage/1sm/1j/ep3/assets/2.mkv',
    './1fe/homepage/1sm/1j/ep3/assets/2.mp4',
    './1fe/homepage/1sm/1j/ep3/assets/2.png',
    './1fe/homepage/1sm/1j/ep3/assets/3.mp4',
    './1fe/homepage/1sm/1j/ep3/assets/3.png',
    './1fe/homepage/1sm/1j/ep3/assets/4.mkv',
    './1fe/homepage/1sm/1j/ep3/assets/4.mp4',
    './1fe/homepage/1sm/1j/ep3/assets/4.png',
    './1fe/homepage/1sm/1j/ep3/assets/5.mp4',
    './1fe/homepage/1sm/1j/ep3/assets/5.png',
    './1fe/homepage/1sm/1j/ep3/assets/6.png',
    './1fe/homepage/1sm/1j/ep3/assets/axle.png',
    './1fe/homepage/1sm/1j/ep3/assets/bg.png',
    './1fe/homepage/1sm/1j/ep3/assets/justin.png',
    './1fe/homepage/1sm/1j/ep3/assets/audio/1.mp3',
    './1fe/homepage/1sm/1j/ep3/assets/audio/2.mp3',
    './1fe/homepage/1sm/1j/ep3/assets/audio/3.mp3',
    './1fe/homepage/1sm/1j/ep3/assets/audio/4.mp3',
    './1fe/homepage/1sm/1j/ep3/assets/audio/5.mp3',
    './1fe/homepage/1sm/1j/ep3/assets/audio/6-note.mp3',
    './1fe/homepage/1sm/1j/ep3/assets/audio/7-note.mp3',
    './1fe/homepage/1sm/1j/ep3/assets/audio/8-note.mp3',
  
    // 1fe/homepage/1sm/1j/ep4
    './1fe/homepage/1sm/1j/ep4/index.html',
    './1fe/homepage/1sm/1j/ep4/objectives.js',
    './1fe/homepage/1sm/1j/ep4/solutions.js',
    './1fe/homepage/1sm/1j/ep4/assets/1.mp4',
    './1fe/homepage/1sm/1j/ep4/assets/2.mp4',
    './1fe/homepage/1sm/1j/ep4/assets/3.mp4',
    './1fe/homepage/1sm/1j/ep4/assets/4.mp4',
    './1fe/homepage/1sm/1j/ep4/assets/5.png',
    './1fe/homepage/1sm/1j/ep4/assets/axle.png',
    './1fe/homepage/1sm/1j/ep4/assets/bg.png',
    './1fe/homepage/1sm/1j/ep4/assets/reyes.png',
    './1fe/homepage/1sm/1j/ep4/assets/stat1.png',
    './1fe/homepage/1sm/1j/ep4/assets/stat2.png',
    './1fe/homepage/1sm/1j/ep4/assets/stat3.png',
    './1fe/homepage/1sm/1j/ep4/assets/stat4.png',
    './1fe/homepage/1sm/1j/ep4/assets/audio/3.wav',
    './1fe/homepage/1sm/1j/ep4/assets/audio/4.wav',
    './1fe/homepage/1sm/1j/ep4/assets/audio/5.wav',
    './1fe/homepage/1sm/1j/ep4/assets/audio/6.wav',
    './1fe/homepage/1sm/1j/ep4/assets/audio/7.wav',
    './1fe/homepage/1sm/1j/ep4/assets/audio/8.wav',
    './1fe/homepage/1sm/1j/ep4/assets/audio/9.wav',
    './1fe/homepage/1sm/1j/ep4/assets/audio/10.wav',
    './1fe/homepage/1sm/1j/ep4/assets/audio/11.wav',
    './1fe/homepage/1sm/1j/ep4/assets/audio/12.wav',
    './1fe/homepage/1sm/1j/ep4/assets/audio/13.wav',
    './1fe/homepage/1sm/1j/ep4/assets/audio/14.wav',
  
    // 1fe/homepage/1sm/1j/ep5
    './1fe/homepage/1sm/1j/ep5/index.html',
    './1fe/homepage/1sm/1j/ep5/objectives.js',
    './1fe/homepage/1sm/1j/ep5/solutions.js',
    './1fe/homepage/1sm/1j/ep5/assets/1.mkv',
    './1fe/homepage/1sm/1j/ep5/assets/1.mp4',
    './1fe/homepage/1sm/1j/ep5/assets/2.mkv',
    './1fe/homepage/1sm/1j/ep5/assets/2.mp4',
    './1fe/homepage/1sm/1j/ep5/assets/3.mkv',
    './1fe/homepage/1sm/1j/ep5/assets/3.mp4',
    './1fe/homepage/1sm/1j/ep5/assets/4.mkv',
    './1fe/homepage/1sm/1j/ep5/assets/4.mp4',
    './1fe/homepage/1sm/1j/ep5/assets/5.mkv',
    './1fe/homepage/1sm/1j/ep5/assets/5.mp4',
    './1fe/homepage/1sm/1j/ep5/assets/axle.png',
    './1fe/homepage/1sm/1j/ep5/assets/bg.png',
    './1fe/homepage/1sm/1j/ep5/assets/pao.png',
    './1fe/homepage/1sm/1j/ep5/assets/audio/3.wav',
    './1fe/homepage/1sm/1j/ep5/assets/audio/4.wav',
    './1fe/homepage/1sm/1j/ep5/assets/audio/5.wav',
    './1fe/homepage/1sm/1j/ep5/assets/audio/6.wav',
    './1fe/homepage/1sm/1j/ep5/assets/audio/7.wav',
    './1fe/homepage/1sm/1j/ep5/assets/audio/8.wav',
    './1fe/homepage/1sm/1j/ep5/assets/audio/9.wav',
    './1fe/homepage/1sm/1j/ep5/assets/audio/10.wav',
    './1fe/homepage/1sm/1j/ep5/assets/audio/11.wav',
    './1fe/homepage/1sm/1j/ep5/assets/audio/12.wav',
    './1fe/homepage/1sm/1j/ep5/assets/audio/13.wav',
    './1fe/homepage/1sm/1j/ep5/assets/audio/14.wav',
    './1fe/homepage/1sm/1j/ep5/assets/audio/15.wav',
    './1fe/homepage/1sm/1j/ep5/assets/audio/16.wav',
    './1fe/homepage/1sm/1j/ep5/assets/audio/17.wav',
  
    // 1fe/homepage/1sm/1j/ep6
    './1fe/homepage/1sm/1j/ep6/index.html',
    './1fe/homepage/1sm/1j/ep6/objectives.js',
    './1fe/homepage/1sm/1j/ep6/solutions.js',
    './1fe/homepage/1sm/1j/ep6/assets/1.mp4',
    './1fe/homepage/1sm/1j/ep6/assets/1.png',
    './1fe/homepage/1sm/1j/ep6/assets/2.mp4',
    './1fe/homepage/1sm/1j/ep6/assets/2.png',
    './1fe/homepage/1sm/1j/ep6/assets/3.mp4',
    './1fe/homepage/1sm/1j/ep6/assets/4.mp4',
    './1fe/homepage/1sm/1j/ep6/assets/5.mp4',
    './1fe/homepage/1sm/1j/ep6/assets/axle.png',
    './1fe/homepage/1sm/1j/ep6/assets/bg.png',
    './1fe/homepage/1sm/1j/ep6/assets/caloy.png',
    './1fe/homepage/1sm/1j/ep6/assets/audio/3.wav',
    './1fe/homepage/1sm/1j/ep6/assets/audio/4.wav',
    './1fe/homepage/1sm/1j/ep6/assets/audio/5.wav',
    './1fe/homepage/1sm/1j/ep6/assets/audio/6.wav',
    './1fe/homepage/1sm/1j/ep6/assets/audio/7.wav',
    './1fe/homepage/1sm/1j/ep6/assets/audio/8.wav',
    './1fe/homepage/1sm/1j/ep6/assets/audio/9.wav',
    './1fe/homepage/1sm/1j/ep6/assets/audio/10.wav',
    './1fe/homepage/1sm/1j/ep6/assets/audio/11.wav',
    './1fe/homepage/1sm/1j/ep6/assets/audio/12.wav',
    './1fe/homepage/1sm/1j/ep6/assets/audio/13.wav',
    './1fe/homepage/1sm/1j/ep6/assets/audio/14.wav',
  
    // 1fe/homepage/1sm/1j/ep7
    './1fe/homepage/1sm/1j/ep7/index.html',
    './1fe/homepage/1sm/1j/ep7/objectives.js',
    './1fe/homepage/1sm/1j/ep7/solutions.js',
    './1fe/homepage/1sm/1j/ep7/assets/1.mkv',
    './1fe/homepage/1sm/1j/ep7/assets/1.mp4',
    './1fe/homepage/1sm/1j/ep7/assets/2.mkv',
    './1fe/homepage/1sm/1j/ep7/assets/2.mp4',
    './1fe/homepage/1sm/1j/ep7/assets/2.png',
    './1fe/homepage/1sm/1j/ep7/assets/3.mp4',
    './1fe/homepage/1sm/1j/ep7/assets/4.mp4',
    './1fe/homepage/1sm/1j/ep7/assets/5.mp4',
    './1fe/homepage/1sm/1j/ep7/assets/axle.png',
    './1fe/homepage/1sm/1j/ep7/assets/BG.png',
    './1fe/homepage/1sm/1j/ep7/assets/manong.png',
    './1fe/homepage/1sm/1j/ep7/assets/audio/1.wav',
    './1fe/homepage/1sm/1j/ep7/assets/audio/3.wav',
    './1fe/homepage/1sm/1j/ep7/assets/audio/4.wav',
    './1fe/homepage/1sm/1j/ep7/assets/audio/5.wav',
    './1fe/homepage/1sm/1j/ep7/assets/audio/6.wav',
    './1fe/homepage/1sm/1j/ep7/assets/audio/7.wav',
    './1fe/homepage/1sm/1j/ep7/assets/audio/8.wav',
    './1fe/homepage/1sm/1j/ep7/assets/audio/9.wav',
    './1fe/homepage/1sm/1j/ep7/assets/audio/10.wav',
    './1fe/homepage/1sm/1j/ep7/assets/audio/11.wav',
    './1fe/homepage/1sm/1j/ep7/assets/audio/12.wav',
  
];

// Helper function to notify clients about caching progress
async function notifyClients(message) {
  const clients = await self.clients.matchAll({ includeUncontrolled: true });
  clients.forEach(client => client.postMessage(message));
}

// Install Service Worker and cache files with progress reporting
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      console.log('Opened cache: java (1j)');
      
      const total = FILES_TO_CACHE.length;
      let current = 0;
      
      // Cache files one by one and report progress
      for (const file of FILES_TO_CACHE) {
        try {
          await cache.add(file);
          current++;
          await notifyClients({
            type: 'CACHE_PROGRESS',
            worker: 'java',
            file: file,
            current: current,
            total: total
          });
        } catch (error) {
          console.warn(`Failed to cache: ${file}`, error);
          current++;
        }
      }
      
      await notifyClients({
        type: 'CACHE_COMPLETE',
        worker: 'java',
        total: total
      });
      
      console.log('Java storymode cache complete');
    })()
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
