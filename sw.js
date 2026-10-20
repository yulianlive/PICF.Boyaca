const CACHE_NAME = 'PICF.Boyaca-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './APP_PICF_Cuidadores_Prototipo_Clinico.html',
  './manifest.json',
  './icono.png'
  './Pautas_cuidadores.pdf'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});