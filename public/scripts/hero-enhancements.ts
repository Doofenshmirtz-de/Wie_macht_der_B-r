/**
 * PROGRESSIVE ENHANCEMENT FÜR HERO-BEREICH
 * Version: 1.0
 * Erstellt für: wie-macht-der-baer.de Landing Page Optimierung
 */

// TypeScript Interfaces
interface Analytics {
  track: (event: string, properties: Record<string, any>) => void;
}

interface GTags {
  (command: string, action: string, options?: Record<string, any>): void;
}

interface Plausible {
  (event: string, options?: { props: Record<string, any> }): void;
}

// Global declarations
declare global {
  interface Window {
    gtag?: GTags;
    analytics?: Analytics;
    plausible?: Plausible;
  }
}

// Export to make this a module
export {};

// PROGRESSIVE ENHANCEMENT FÜR HERO-BEREICH
document.addEventListener('DOMContentLoaded', function(): void {
    const heroSection: Element | null = document.querySelector('.hero-section');
    const heroImage: HTMLImageElement | null = document.querySelector('.hero-image');
    const heroCTA: HTMLAnchorElement | null = document.querySelector('.hero-cta-button');
    
    console.log('🎯 Hero Enhancements: Initialisiert');
    
    // ===================================================================
    // LAZY LOADING FALLBACK FÜR ÄLTERE BROWSER
    // ===================================================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                    const img: Element = entry.target;
                    img.classList.add('loaded');
                    console.log('🖼️ Hero Image: Geladen');
                    observer.unobserve(img);
                }
            });
        });
        
        if (heroImage) {
            imageObserver.observe(heroImage);
        }
    }
    
    // ===================================================================
    // SMOOTH SCROLL FÜR CTA BUTTON
    // ===================================================================
    
    if (heroCTA) {
        heroCTA.addEventListener('click', function(this: HTMLAnchorElement, e: MouseEvent): void {
            const href: string | null = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target: Element | null = document.querySelector(href);
                if (target) {
                    console.log('🔗 Hero CTA: Smooth scroll zu', href);
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Analytics Event
                    trackHeroCTAClick();
                }
            }
        });
        
        // Keyboard Navigation Support
        heroCTA.addEventListener('keydown', function(this: HTMLAnchorElement, e: KeyboardEvent): void {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // ===================================================================
    // PARALLAX EFFECT (SUBTIL, NUR AUF DESKTOP)
    // ===================================================================
    
    if (window.innerWidth > 768 && heroImage) {
        let ticking: boolean = false;
        
        function updateParallax(): void {
            const scrolled: number = window.pageYOffset;
            const parallaxSpeed: number = 0.5;
            
            if (heroImage && scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
            
            ticking = false;
        }
        
        function requestTick(): void {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        // Throttled Scroll Event
        window.addEventListener('scroll', requestTick, { passive: true });
        console.log('📜 Hero Parallax: Aktiviert');
    }
    
    // ===================================================================
    // PERFORMANCE MONITORING
    // ===================================================================
    
    if ('PerformanceObserver' in window) {
        // LCP Monitoring für Hero-Bereich
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            // Prüfen ob LCP aus Hero-Bereich kommt
            if (lastEntry.element && heroSection && heroSection.contains(lastEntry.element)) {
                console.log('⚡ Hero LCP:', Math.round(lastEntry.startTime), 'ms');
                
                // Analytics Event
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'hero_lcp', {
                        'event_category': 'Performance',
                        'value': Math.round(lastEntry.startTime)
                    });
                }
            }
        });
        
        lcpObserver.observe({entryTypes: ['largest-contentful-paint']});
    }
    
    // ===================================================================
    // ACCESSIBILITY ENHANCEMENTS
    // ===================================================================
    
    // Keyboard Focus Management
    function enhanceKeyboardNavigation() {
        const focusableElements = heroSection?.querySelectorAll(
            'a, button, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements && focusableElements.length > 0) {
            focusableElements.forEach(element => {
                element.addEventListener('focus', function() {
                    this.setAttribute('data-keyboard-focus', 'true');
                });
                
                element.addEventListener('blur', function() {
                    this.removeAttribute('data-keyboard-focus');
                });
            });
        }
    }
    
    // Touch Device Detection
    function detectTouchDevice() {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouch) {
            document.body.classList.add('is-touch');
            console.log('👆 Touch Device: Erkannt');
        }
    }
    
    // Reduced Motion Detection
    function respectReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduce-motion');
            console.log('🎭 Reduced Motion: Aktiviert');
        }
        
        // Listen for changes
        prefersReducedMotion.addEventListener('change', function() {
            if (this.matches) {
                document.body.classList.add('reduce-motion');
            } else {
                document.body.classList.remove('reduce-motion');
            }
        });
    }
    
    // Initialize Accessibility Features
    enhanceKeyboardNavigation();
    detectTouchDevice();
    respectReducedMotion();
    
    // ===================================================================
    // RESPONSIVE BREAKPOINT DETECTION
    // ===================================================================
    
    function handleResponsiveChanges() {
        const mq768 = window.matchMedia('(max-width: 768px)');
        const mq1024 = window.matchMedia('(max-width: 1024px)');
        
        function updateLayout(mq) {
            if (mq768.matches) {
                document.body.classList.add('is-mobile');
                document.body.classList.remove('is-tablet', 'is-desktop');
            } else if (mq1024.matches) {
                document.body.classList.add('is-tablet');
                document.body.classList.remove('is-mobile', 'is-desktop');
            } else {
                document.body.classList.add('is-desktop');
                document.body.classList.remove('is-mobile', 'is-tablet');
            }
        }
        
        // Initial check
        updateLayout();
        
        // Listen for changes
        mq768.addEventListener('change', updateLayout);
        mq1024.addEventListener('change', updateLayout);
    }
    
    handleResponsiveChanges();
    
    console.log('✅ Hero Enhancements: Vollständig geladen');
});

// ===================================================================
// ANALYTICS & TRACKING FUNKTIONEN
// ===================================================================

/**
 * Tracking für Hero CTA Button Clicks
 */
function trackHeroCTAClick(): void {
    console.log('📊 Analytics: Hero CTA clicked');
    
    // Google Analytics Event Tracking
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'click', {
            'event_category': 'Hero CTA',
            'event_label': 'Jetzt spielen',
            'value': 1
        });
    }
    
    // Alternative: Custom Analytics
    if (typeof window.analytics !== 'undefined') {
        window.analytics.track('Hero CTA Clicked', {
            button_text: 'Jetzt spielen',
            section: 'hero',
            timestamp: new Date().toISOString()
        });
    }
    
    // Plausible Analytics
    if (typeof window.plausible !== 'undefined') {
        window.plausible('Hero CTA Click', {
            props: {
                button: 'Jetzt spielen',
                location: 'hero-section'
            }
        });
    }
}

/**
 * Conversion Tracking für A/B Tests
 */
function trackConversion(eventName: string): void {
    const testGroup: string = localStorage.getItem('hero_test_group') || 'control';
    
    console.log('🧪 A/B Test Conversion:', eventName, 'Group:', testGroup);
    
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'conversion', {
            'event_category': 'A/B Test',
            'event_label': `${eventName}_${testGroup}`,
            'test_group': testGroup
        });
    }
}

// ===================================================================
// ERROR HANDLING & GRACEFUL DEGRADATION
// ===================================================================

window.addEventListener('error', function(e) {
    if (e.filename && e.filename.includes('hero-enhancements')) {
        console.warn('⚠️ Hero Enhancement Error:', e.message);
        
        // Fallback für kritische Funktionen
        const heroCTA = document.querySelector('.hero-cta-button');
        if (heroCTA && !heroCTA.hasAttribute('data-fallback-click')) {
            heroCTA.setAttribute('data-fallback-click', 'true');
            heroCTA.addEventListener('click', function(e) {
                // Simple fallback - only prevent default for anchor links
                if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView();
                    }
                }
            });
        }
    }
});

// ===================================================================
// EXPORT FÜR MODULE USAGE (FALLS BENÖTIGT)
// ===================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        trackHeroCTAClick,
        trackConversion
    };
}
