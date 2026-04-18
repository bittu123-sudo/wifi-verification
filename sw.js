self.addEventListener('push', function(event) {
  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    data = { title: "📍 Location Update", body: "New location received" };
  }

  const options = {
    body: data.body,
    icon: 'https://via.placeholder.com/128/28a745/ffffff?text=📍',
    badge: 'https://via.placeholder.com/128/28a745/ffffff?text=📍',
    data: { url: data.url || window.location.origin }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || '📍 Location Update', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
