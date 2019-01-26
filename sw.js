console.log('Service Worker loaded / updated');

const cacheName = '20190126-1106';
console.log(cacheName);

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          'index.html'
        ]
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(r) {
      console.log('[Service Worker] Fetching resource: '+event.request.url);
      return r || fetch(event.request)
        .then(function(response) {
        return caches.open(cacheName)
          .then(function(cache) {
            console.log('[Service Worker] Caching new resource: '+event.request.url);
            cache.put(event.request, response.clone());
            return response;
          });
        });
    })
  );
});