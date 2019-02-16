console.log('Service Worker loaded / updated');

const cacheName = '20190215';
console.log(cacheName);

self.addEventListener('install', (event) => {
  console.log(`[Service Worker] Install`);
  event.waitUntil(
    caches.open(cacheName)
    .then((cache) => {
      return cache.addAll(
        [
          'index.html',
          'favicon.ico',
          'PearBudget.svg',
        ]
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((r) => {
      console.log(`[Service Worker] Fetching resource: ${event.request.url}`);
      return r || fetch(event.request)
      .then((response) => {
        return caches.open(cacheName)
        .then((cache) => {
          console.log(`[Service Worker] Caching new resource: ${event.request.url}`);
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});