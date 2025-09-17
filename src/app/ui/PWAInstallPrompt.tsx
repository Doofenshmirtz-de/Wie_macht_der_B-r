'use client';

import { useState, useEffect } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useParams } from 'next/navigation';

interface PWAInstallPromptProps {
  className?: string;
}

export default function PWAInstallPrompt({ className = '' }: PWAInstallPromptProps) {
  const { isInstallable, installApp } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(true); // Start als dismissed, dann nach Verzögerung prüfen
  const [isInstalling, setIsInstalling] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const params = useParams();
  const locale = (params as { locale?: string })?.locale === 'en' ? 'en' : 'de';

  useEffect(() => {
    // Prüfe localStorage beim Mount
    const wasDismissed = localStorage.getItem('pwa-install-dismissed');
    const wasNeverShow = localStorage.getItem('pwa-install-never-show');
    
    if (wasNeverShow || wasDismissed) {
      setIsDismissed(true);
      return;
    }

    // Zeige Popup erst nach 10 Sekunden Verweildauer
    const timer = setTimeout(() => {
      if (isInstallable) {
        setIsDismissed(false);
        setShowPrompt(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isInstallable]);

  // Don't show if not installable, dismissed, or not ready to show
  if (!isInstallable || isDismissed || !showPrompt) {
    return null;
  }

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      const success = await installApp();
      if (success) {
        setIsDismissed(true);
      }
    } catch (error) {
      console.error('Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setShowPrompt(false);
    // Store in localStorage to remember dismissal (temporary)
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  const handleNeverShow = () => {
    setIsDismissed(true);
    setShowPrompt(false);
    // Store in localStorage to never show again
    localStorage.setItem('pwa-install-never-show', 'true');
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 animate-slide-in-right ${className}`}>
      <div className="bg-gradient-to-r from-purple-600/95 to-blue-600/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-3 text-white max-w-xs">
        <div className="flex items-start space-x-2">
          {/* App Icon */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-sm">🍻</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-semibold text-white">
              {locale === 'en' ? 'Install as app?' : 'Als App installieren?'}
            </h3>
            <p className="text-xs text-gray-200 mt-1 leading-relaxed">
              {locale === 'en' ? 'Faster access & offline games' : 'Schnellerer Zugriff & Offline-Spiele'}
            </p>

            {/* Buttons */}
            <div className="flex space-x-1 mt-2">
              <button
                onClick={handleInstall}
                disabled={isInstalling}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-600 text-black text-xs font-semibold py-1.5 px-2 rounded transition-colors duration-200"
              >
                {isInstalling 
                  ? (locale === 'en' ? 'Installing...' : 'Installiere...')
                  : (locale === 'en' ? 'Install' : 'Installieren')
                }
              </button>
              <button
                onClick={handleDismiss}
                className="text-xs text-gray-300 hover:text-white px-2 transition-colors duration-200"
              >
                {locale === 'en' ? 'Later' : 'Später'}
              </button>
            </div>
            
            {/* Never show again option */}
            <button
              onClick={handleNeverShow}
              className="text-xs text-gray-400 hover:text-gray-300 mt-1 transition-colors duration-200"
            >
              {locale === 'en' ? 'Don\'t show again' : 'Nicht mehr anzeigen'}
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-gray-300 hover:text-white transition-colors duration-200"
            aria-label={locale === 'en' ? 'Close' : 'Schließen'}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
