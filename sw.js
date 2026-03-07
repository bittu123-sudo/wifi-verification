// Background GPS Service Worker
self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});

// Background sync (every 60s)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'gps-sync') {
    // GPS would run here in full PWA
  }
});
