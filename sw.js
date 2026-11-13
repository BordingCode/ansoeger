// Ansøgeren service worker: app shell works offline. API calls always go to the network.
const CACHE = "ansoeger-v2";
const SHELL = [
  "./", "index.html", "styles.css?v=2", "app.js?v=2", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png",
  "vendor/mammoth.browser.min.js", "vendor/docx.umd.js",
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(SHELL.map((u) => c.add(new Request(u, { cache: "reload" }))))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  if (e.request.mode === "navigate") {
    // Fresh page when online, cached when offline.
    e.respondWith(fetch(e.request).catch(() => caches.match("index.html")));
    return;
  }
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
