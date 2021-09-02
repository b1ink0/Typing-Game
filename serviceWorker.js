const staticTypingGame = "typing-game";
const assets = [
  "/",
  "/Typing-Game/index.html",
  "/Typing-Game/css/style.css",
  "/Typing-Game/css/tailwind.min.css",
  "/Typing-Game/js/script.js",
  "/Typing-Game/media/icons/favicon.ico",
  "/Typing-Game/media/icons/logo192.png",
  "/Typing-Game/media/icons/logo512.png",
  "/Typing-Game/media/icons/maskable192.png",
  "/Typing-Game/media/icons/maskable512.png",
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
