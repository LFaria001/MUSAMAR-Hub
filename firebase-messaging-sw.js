importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBkIkvjdQ1Mzorquq6PlDCXuosIJDzwEWU",
  authDomain: "musamar-hub.firebaseapp.com",
  projectId: "musamar-hub",
  storageBucket: "musamar-hub.firebasestorage.app",
  messagingSenderId: "429342019448",
  appId: "1:429342019448:web:3342971f2f08093420028d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification.title || 'Musamar Hub';
  const options = {
    body: payload.notification.body || '',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('/');
    })
  );
});
