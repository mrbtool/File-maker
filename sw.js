// --- CONFIGURATION ---
const APP_VERSION = 'v1.5.10'; 
const CACHE_NAME = `pro-file-tools-${APP_VERSION}`;

// --- INSTALL EVENT (Fault-Tolerant) ---
self.addEventListener('install', (event) => {
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // 1. Critical File (Must exist for the app to work)
      // We only strictly require the homepage.
      try {
        await cache.add('./'); 
        await cache.add('./index.html');
      } catch (err) {
        console.error('[SW] Critical failure: Could not cache index.html', err);
      }

      // 2. Optional Files
      // If these are missing, the app will still install successfully.
      const optionalAssets = [
        './manifest.json',
        './icons.js',
        './metadata.js',
        './tools.js',
        './mrbtoolslogo.jpg'
      ];

      // Try to cache each one individually
      for (const asset of optionalAssets) {
        try {
          const response = await fetch(asset);
          if (response.ok) {
            await cache.put(asset, response);
          } else {
            console.warn(`[SW] File not found (404): ${asset}`);
          }
        } catch (err) {
          console.warn(`[SW] Failed to cache optional file: ${asset}`);
        }
      }
    })
  );
});

// --- ACTIVATE EVENT (Cleanup) ---
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          // Delete old versions of this specific app
          if (cache.startsWith('pro-file-tools-') && cache !== CACHE_NAME) {
            console.log(`[SW] Deleting old cache: ${cache}`);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// --- FETCH EVENT ---
self.addEventListener('fetch', (event) => {
  // Only handle http/https requests
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If network works, update cache
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
        return response;
      })
      .catch(() => {
        // If offline, try cache
        return caches.match(event.request);
      })
  );
});
