const CACHE_NAME = 'PICF.Boyaca-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icono.png'
  './APP_PICF_alcohol.html'
  './APP_PICF_cuidadores.html',
  './APP_PICF_riesgo cardio.html',
  './APP_PICF_RN y posparto.html'
  './APP_PICF_vejez.html'
  './Pautas Riesgo Cardio Final(1).pdf'
  './Pautas_consumo_alcohol_PICF.pdf',
  './Pautas_Cuidadores_PICF.pdf',
  './Pautas_Vejez_PICF.pdf'
  './Pautas RN y posparto Final(1).pdf'
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