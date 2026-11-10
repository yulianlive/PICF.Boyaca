const CACHE_NAME = 'PICF.Boyaca-cache-v1';

// Lista corregida de todos tus archivos HTML, PDF e imágenes
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icono.png',
  './APP_PICF_alcohol.html',
  './APP_PICF_cuidadores.html',
  './APP_PICF_riesgo cardio.html',
  './APP_PICF_RN y posparto.html',
  './APP_PICF_vejez.html',
  './Pautas Riesgo Cardio Final(1).pdf',
  './Pautas_consumo_alcohol_PICF.pdf',
  './Pautas_Cuidadores_PICF.pdf',
  './Pautas_Vejez_PICF.pdf',
  './Pautas RN y posparto Final(1).pdf'
];

// 1. Evento de instalación: Almacena todos los archivos y PDFs en la memoria local
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Guardando todos los archivos y PDFs para uso sin conexión...');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// 2. Evento de activación: Elimina versiones antiguas de caché si actualizas la app
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Borrando caché antigua:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Evento de interceptación (Fetch): Sirve desde la caché cuando no hay conexión
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Devuelve el archivo local o PDF desde el almacenamiento offline
      }
      return fetch(e.request).catch((err) => {
        console.error('[SW] Recurso no disponible sin conexión:', e.request.url, err);
      });
    })
  );
});