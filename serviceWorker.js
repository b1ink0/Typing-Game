const staticTypingGame = "typing-game";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/css/tailwind.min.css",
  "/js/script.js",
  "/media/icons/favicon.ico",
  "/media/icons/logo192.png",
  "/media/icons/logo512.png",
  "/media/icons/maskable192.png",
  "/media/icons/maskable512.png",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticTypingGame).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
