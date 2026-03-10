export default defineComponent({
  async run({ steps, $ }) {
    const gps = steps.trigger.event.body;
    console.log('📥 RAW DATA RECEIVED:', JSON.stringify(gps, null, 2));
    
    // Extract GPS (handle string/null)
    const lat = parseFloat(gps?.latitude);
    const lng = parseFloat(gps?.longitude);
    
    // VALIDATION
    if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
      return {
        success: false,
        error: 'Missing GPS coordinates',
        received: gps,
        details: 'Expected: {"latitude": 37.7749, "longitude": -122.4194}'
      };
    }
    
    // Google Maps
    const mapsLink = `https://www.google.com/maps?q=${lat},${lng}&z=18`;
    
    // Status
    const status = `🚨 GPS #${gps.locations_total || 1}
📍 ${lat.toFixed(6)}, ${lng.toFixed(6)}
🎯 ${gps.accuracy || '?'}m
🔋 ${gps.battery || '?'}%
⏱️ ${gps.uptime_minutes || 0}min
🗺️ ${mapsLink}`;
    
    console.log(status);
    
    return {
      success: true,
      latitude: lat,
      longitude: lng,
      accuracy: gps.accuracy,
      battery: gps.battery,
      uptime_minutes: gps.uptime_minutes,
      locations_total: gps.locations_total,
      google_maps: mapsLink,
      status: status
    };
  }
});
