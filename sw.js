export default defineComponent({
  async run({ steps, $ }) {
    const gps = steps.trigger.event.body;
    console.log('📥 GPS:', gps);
    
    const lat = parseFloat(gps.latitude);
    const lng = parseFloat(gps.longitude);
    
    if (!lat || !lng) {
      return { success: false, error: 'No GPS', received: gps };
    }
    
    // 🗺️ GOOGLE MAPS (CLICKABLE IN DASHBOARD)
    const mapsLink = `https://www.google.com/maps?q=${lat},${lng}&z=18&ll=${lat},${lng}`;
    const staticMap = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=18&size=400x400&markers=color:red|${lat},${lng}&key=AIzaSyD...`; // Optional
    
    const status = `🚨 GPS #${gps.locations_total}
📍 ${lat.toFixed(6)}, ${lng.toFixed(6)}
🎯 ${gps.accuracy}m
🔋 ${gps.battery}%
⏱️ ${gps.uptime_minutes}min
🗺️ [OPEN MAPS](${mapsLink})`;
    
    // SAVE TO FILE (persistent!)
    await $respond({
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
      body: status
    });
    
    return {
      success: true,
      latitude: lat,
      longitude: lng,
      google_maps: mapsLink,  // ← CLICKABLE IN DASHBOARD!
      static_map: staticMap,
      raw_gps: gps,
      status: status
    };
  }
});
