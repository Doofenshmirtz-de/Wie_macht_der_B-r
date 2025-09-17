'use client';

import { useState, useEffect } from 'react';
import { useAnalytics } from '../providers/AnalyticsProvider';
import { useParams } from 'next/navigation';

export function CookieBanner() {
  const { consent, giveConsent, revokeConsent } = useAnalytics();
  const [showBanner, setShowBanner] = useState(false);
  const params = useParams();
  const locale = (params as { locale?: string })?.locale === 'en' ? 'en' : 'de';

  useEffect(() => {
    // Zeige Banner nur wenn noch keine Entscheidung getroffen wurde
    if (consent === null) {
      // Verzögerung von 2 Sekunden bevor Banner erscheint
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [consent]);

  const handleAccept = () => {
    giveConsent();
    setShowBanner(false);
  };

  const handleDecline = () => {
    revokeConsent();
    setShowBanner(false);
  };

  if (!showBanner || consent !== null) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-t border-yellow-400/30 p-4 animate-slide-in-left">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🍪</span>
              <div>
                <h3 className="text-white font-bold text-sm mb-1">
                  Cookies & Analytics
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed">
                  {locale === 'en' 
                    ? 'We use Google Analytics to improve our website. All data is anonymized and processed in compliance with GDPR.'
                    : 'Wir verwenden Google Analytics, um unsere Website zu verbessern. Alle Daten werden anonymisiert und GDPR-konform verarbeitet.'
                  }
                  <br className="hidden sm:block" />
                  <span className="text-yellow-400">
                    {locale === 'en' 
                      ? 'More details in our privacy policy'
                      : 'Mehr Details in unserer Datenschutzerklärung'
                    }
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              {locale === 'en' ? 'Decline' : 'Ablehnen'}
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-black bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors duration-200"
            >
              {locale === 'en' ? 'Accept' : 'Akzeptieren'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
