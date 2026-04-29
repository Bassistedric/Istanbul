// Service Worker — cache hors-ligne pour le carnet Istanbul
const CACHE_VERSION = 'istanbul-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './maps/day1.svg',
  './maps/day2.svg',
  './maps/day3.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-180.png',
  // Polices Google (mises en cache à la première visite)
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Crimson+Pro:ital,wght@0,400;0,500;0,600;1,400&family=Geist+Mono:wght@400;500;600&display=swap'
];

// Installation : pré-cache des ressources critiques
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(ASSETS).catch(err => {
        // Si une URL distante échoue, on continue quand même
        console.log('Some assets failed to cache:', err);
        return cache.addAll(ASSETS.filter(a => a.startsWith('./') || a.startsWith('/')));
      }))
      .then(() => self.skipWaiting())
  );
});

// Activation : nettoie les anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Stratégie : cache-first pour les ressources locales, network-first pour le reste
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Ne pas intercepter les requêtes non-GET
  if (event.request.method !== 'GET') return;

  // Liens externes (Google Maps, tel:) — laisser passer
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // En cache : on sert directement, et on rafraîchit en arrière-plan
        fetch(event.request).then(fresh => {
          if (fresh && fresh.status === 200) {
            caches.open(CACHE_VERSION).then(c => c.put(event.request, fresh.clone()));
          }
        }).catch(() => {});
        return cached;
      }

      // Pas en cache : on tente le réseau
      return fetch(event.request).then(response => {
        // Mettre en cache si OK
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(c => c.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Hors-ligne et pas en cache : tenter la racine si c'est une page
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
