'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Script from 'next/script';

// Google Analytics 4 Measurement ID - Hier eure echte ID einsetzen
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

interface AnalyticsContextType {
  consent: boolean | null;
  giveConsent: () => void;
  revokeConsent: () => void;
  trackEvent: (eventName: string, parameters?: Record<string, unknown>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
}

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [consent, setConsent] = useState<boolean | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Lade gespeicherte Einstellung beim Start
    const savedConsent = localStorage.getItem('analytics-consent');
    if (savedConsent !== null) {
      setConsent(savedConsent === 'true');
    }
  }, []);

  useEffect(() => {
    // Initialisiere GA nur wenn Einwilligung gegeben wurde
    if (consent === true && !isLoaded) {
      initializeGA();
      setIsLoaded(true);
    } else if (consent === false && isLoaded) {
      // Opt-out: Deaktiviere GA
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied'
        });
      }
    }
  }, [consent, isLoaded]);

  const initializeGA = () => {
    if (typeof window === 'undefined') return;

    // Initialisiere dataLayer
    window.dataLayer = window.dataLayer || [];
    
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    
    window.gtag = gtag;

    // Konfiguriere GA4 mit Datenschutz-Settings
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      // GDPR-konforme Einstellungen
      anonymize_ip: true,
      cookie_flags: 'SameSite=Strict;Secure',
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_title: document.title,
      page_location: window.location.href,
    });

    // Consent-Modus aktivieren
    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted',
    });
  };

  const giveConsent = () => {
    setConsent(true);
    localStorage.setItem('analytics-consent', 'true');
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  const revokeConsent = () => {
    setConsent(false);
    localStorage.setItem('analytics-consent', 'false');
    
    // Lösche GA Cookies
    if (typeof document !== 'undefined') {
      const cookies = document.cookie.split(';');
      cookies.forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        if (name.trim().startsWith('_ga')) {
          document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
      });
    }
  };

  const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
    if (consent && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        ...parameters,
        // Anonyme User ID generieren
        client_id: Math.random().toString(36).substring(7),
      });
    }
  };

  return (
    <AnalyticsContext.Provider 
      value={{ consent, giveConsent, revokeConsent, trackEvent }}
    >
      {consent === true && (
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          onLoad={() => {
            console.log('🔍 Google Analytics geladen');
          }}
        />
      )}
      {children}
    </AnalyticsContext.Provider>
  );
}
