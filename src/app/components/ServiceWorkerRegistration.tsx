'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, show update notification
                  if (confirm('Eine neue Version ist verfügbar. Jetzt aktualisieren?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
          console.log('Cache updated by service worker');
        }
      });

      // Check if the app is running in standalone mode (installed as PWA)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (isStandalone) {
        console.log('App is running in standalone mode (PWA installed)');
        
        // Optional: Track PWA usage
        const gtag = (window as { gtag?: (event: string, action: string, params: Record<string, string>) => void }).gtag;
        if (gtag) {
          gtag('event', 'pwa_app_opened', {
            'event_category': 'PWA',
            'event_label': 'Standalone Mode'
          });
        }
      }
    }
  }, []);

  return null; // This component doesn't render anything
}
