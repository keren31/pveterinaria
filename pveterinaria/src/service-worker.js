/* eslint-disable no-restricted-globals */
/* global clients */

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { NetworkFirst } from 'workbox-strategies';


clientsClaim();

// Puedes desactivar el precaching reemplazand esta línea
precacheAndRoute(self.__WB_MANIFEST);
// por esta otra:
// const desactivarPrecache = self.__WB_MANIFEST;
// para más info: https://cra.link/PWA

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");


registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== "navigate") {
      return false;
    } // If this is a URL that starts with /\_, skip.
    if (url.pathname.startsWith("/_")) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL("/index.html")
);

// Cachear las respuestas de la API de productos
registerRoute(
  ({ url }) => url.origin === 'https://lacasadelmariscoweb.azurewebsites.net/' && url.pathname.startsWith('/api/TraerProductos'),
  new StaleWhileRevalidate({
    cacheName: 'api-products-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: "image",
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

registerRoute(
  // Ruta para cachear CSS, JS e imágenes
  ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

precacheAndRoute([
  { url: '/', revision: null },
  { url: '/login', revision: null },
  { url: '/Nosotros', revision: null },
  { url: '/ofertas', revision: null },
  { url: '/productos', revision: null },
  { url: '/registrar', revision: null },
  { url: '/reservaciones', revision: null },
  { url: '/perfil', revision: null },
  // Añade todas las rutas que deseas precachear
]);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('api-precache').then((cache) => {
      return fetch('https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerProductosCAN')
        .then((response) => {
          if (!response.ok) throw new Error('Network response was not ok');

          // Clona la respuesta y guárdala en el caché
          cache.put('https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerProductosCAN', response.clone());

          // Recupera la respuesta del caché para verificar si se almacenó correctamente
          return cache.match('https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerProductosCAN')
            .then((cachedResponse) => {
              return cachedResponse.json(); // Convierte la respuesta en JSON
            })
            .then((data) => {
              console.log('Datos guardados en el caché:', data); // Muestra los datos guardados
            });
        })
        .catch((error) => {
          console.error('Error al guardar en el caché:', error);
        });
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Nueva Notificación';
  const options = {
    body: data.body || '¡Tienes una nueva promoción!',
    icon: data.imagen, 
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow('/productos')
  );
});
