self.addEventListener('install', evt => {
  evt.waitUntil(caches.open('soulnest-v2').then(cache => {
    return cache.addAll(['/','/index.html','/style.css','/app.js','/manifest.json']);
  }));
  self.skipWaiting();
});
self.addEventListener('fetch', evt => {
  evt.respondWith(caches.match(evt.request).then(res => res || fetch(evt.request)));
});
