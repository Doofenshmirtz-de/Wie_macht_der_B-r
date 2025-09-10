/**
 * Performance Monitoring und Optimierung
 */

// Web Vitals Tracking
export function trackWebVitals() {
  if (typeof window === 'undefined') return;

  // Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      const metric = entry as PerformanceEntry & {
        value?: number;
        rating?: string;
      };

      // Sende Metriken an Analytics wenn verfügbar
      if (window.gtag && metric.value) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Performance',
          metric_name: entry.name,
          metric_value: Math.round(metric.value),
          metric_rating: metric.rating || 'unknown',
        });
      }

      console.log(`📊 ${entry.name}: ${metric.value?.toFixed(2)}ms`);
    });
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'cumulative-layout-shift'] });
  } catch (error) {
    console.warn('Performance Observer not supported');
  }
}

// Preload kritischer Ressourcen
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  const criticalImages = [
    '/coverphotobear.jpg',
    '/bearbomb.jpg', 
    '/bomb.svg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Lazy Loading für nicht-kritische Ressourcen
export function lazyLoadResources() {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-lazy]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.lazy || '';
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

// Service Worker Registration für besseres Caching
export function registerServiceWorker() {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('🔧 SW registered:', registration);
        
        // Update handling
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Zeige Update-Benachrichtigung
                console.log('🔄 New content available, please refresh');
              }
            });
          }
        });
      })
      .catch(error => {
        console.error('❌ SW registration failed:', error);
      });
  }
}

// Resource Hints für bessere Performance
export function addResourceHints() {
  if (typeof document === 'undefined') return;

  const hints = [
    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossOrigin) link.crossOrigin = hint.crossOrigin;
    document.head.appendChild(link);
  });
}
