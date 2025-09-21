// Service Worker for PWA functionality
const CACHE_NAME = 'wie-macht-der-baer-v2';
const STATIC_CACHE_NAME = 'static-cache-v2';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v2';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/de',
  '/en',
  '/de/offline',
  '/en/offline',
  '/manifest.json',
  '/bomb.svg',
  '/bearbomb.svg',
  '/icons/bomb.svg',
  '/icons/explosion.svg',
  '/icons/gear.svg',
  '/icons/gift.svg',
  '/icons/question.svg',
  '/icons/rocket.svg'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch((error) => {
        console.error('Cache installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (!url.origin.includes(self.location.origin)) {
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone the response before caching
          const responseClone = response.clone();
          
          // Cache successful navigation responses
          if (response.status === 200) {
            caches.open(DYNAMIC_CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          
          return response;
        })
        .catch((error) => {
          console.log('Navigation request failed, checking cache:', error);
          
          // Special handling for root URL - try to serve cached homepage first
          if (url.pathname === '/' || url.pathname === '/de' || url.pathname === '/en') {
            return caches.match('/de')
              .then((cachedResponse) => {
                if (cachedResponse) {
                  console.log('Serving cached homepage for:', request.url);
                  return cachedResponse;
                }
                
                // If no cached homepage, try the offline page
                return caches.match('/de/offline')
                  .then((offlineResponse) => {
                    if (offlineResponse) {
                      return offlineResponse;
                    }
                    
                    // Last resort: return a basic HTML response
                    return new Response(`
                      <!DOCTYPE html>
                      <html>
                      <head>
                        <title>Wie macht der Bär - Online Partyspiele</title>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style>
                          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
                          .container { max-width: 600px; margin: 0 auto; }
                          .btn { padding: 15px 30px; background: #ffd700; color: black; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: bold; }
                          .btn:hover { background: #ffed4e; }
                        </style>
                      </head>
                      <body>
                        <div class="container">
                          <h1>🍻 Wie macht der Bär 🍻</h1>
                          <h2>ONLINE PARTYSPIELE</h2>
                          <p>Die besten Online Trinkspiele für deine Party!</p>
                          <p>Bomb Party, Ich hab noch nie, Wahrheit oder Pflicht - alles kostenlos!</p>
                          <button class="btn" onclick="window.location.reload()">
                            🔄 Erneut versuchen
                          </button>
                        </div>
                      </body>
                      </html>
                    `, {
                      headers: { 'Content-Type': 'text/html' }
                    });
                  });
              });
          }
          
          // For other pages, return cached version or offline page
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                console.log('Serving cached response for:', request.url);
                return cachedResponse;
              }
              
              // Determine locale from URL and return appropriate offline page
              const pathname = url.pathname;
              let offlinePath = '/de/offline'; // Default to German
              
              if (pathname.startsWith('/en/')) {
                offlinePath = '/en/offline';
              }
              
              console.log('No cached response found, serving offline page:', offlinePath);
              
              // Try to serve the offline page, but if that fails too, serve a basic response
              return caches.match(offlinePath)
                .then((offlineResponse) => {
                  if (offlineResponse) {
                    return offlineResponse;
                  }
                  
                  // Last resort: return a basic HTML response
                  return new Response(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <title>Offline - Wie macht der Bär</title>
                      <meta charset="utf-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                    </head>
                    <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                      <h1>Du bist offline</h1>
                      <p>Bitte überprüfe deine Internetverbindung und versuche es erneut.</p>
                      <button onclick="window.location.reload()" style="padding: 10px 20px; background: #ffd700; color: black; border: none; border-radius: 5px; cursor: pointer;">
                        Erneut versuchen
                      </button>
                    </body>
                    </html>
                  `, {
                    headers: { 'Content-Type': 'text/html' }
                  });
                });
            });
        })
    );
    return;
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // Return cached API response if available
          return caches.match(request);
        })
    );
    return;
  }

  // Handle static assets with cache-first strategy
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        // Fetch and cache new assets
        return fetch(request)
          .then((response) => {
            // Only cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              
              // Determine which cache to use
              const cacheName = STATIC_ASSETS.some(asset => 
                request.url.includes(asset)
              ) ? STATIC_CACHE_NAME : DYNAMIC_CACHE_NAME;

              caches.open(cacheName)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
            }
            
            return response;
          })
          .catch(() => {
            // Return offline page for failed requests
            if (request.destination === 'document') {
              // Determine locale from URL and return appropriate offline page
              const url = new URL(request.url);
              const pathname = url.pathname;
              let offlinePath = '/de/offline'; // Default to German
              
              if (pathname.startsWith('/en/')) {
                offlinePath = '/en/offline';
              }
              
              return caches.match(offlinePath)
                .then((offlineResponse) => {
                  if (offlineResponse) {
                    return offlineResponse;
                  }
                  
                  // Last resort: return a basic HTML response
                  return new Response(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <title>Offline - Wie macht der Bär</title>
                      <meta charset="utf-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                    </head>
                    <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                      <h1>Du bist offline</h1>
                      <p>Bitte überprüfe deine Internetverbindung und versuche es erneut.</p>
                      <button onclick="window.location.reload()" style="padding: 10px 20px; background: #ffd700; color: black; border: none; border-radius: 5px; cursor: pointer;">
                        Erneut versuchen
                      </button>
                    </body>
                    </html>
                  `, {
                    headers: { 'Content-Type': 'text/html' }
                  });
                });
            }
            
            // Return a basic response for other failed requests
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Handle background sync (if supported)
self.addEventListener('sync', (event) => {
  console.log('Background sync event:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Implement background sync logic here
      Promise.resolve()
    );
  }
});

// Handle push notifications (if supported)
self.addEventListener('push', (event) => {
  console.log('Push event received:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'Neue Nachricht von Wie macht der Bär!',
    icon: '/bomb.svg',
    badge: '/bomb.svg',
    tag: 'wie-macht-der-baer-notification',
    actions: [
      {
        action: 'open',
        title: 'Öffnen'
      },
      {
        action: 'close',
        title: 'Schließen'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Wie macht der Bär', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
