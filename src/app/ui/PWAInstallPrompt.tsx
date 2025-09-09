'use client';

import { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallPromptProps {
  className?: string;
}

export default function PWAInstallPrompt({ className = '' }: PWAInstallPromptProps) {
  const { isInstallable, installApp } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // Don't show if not installable or already dismissed
  if (!isInstallable || isDismissed) {
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
    // Store in localStorage to remember dismissal
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 ${className}`}>
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-4 text-white max-w-sm mx-auto">
        <div className="flex items-start space-x-3">
          {/* App Icon */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-xl">🍻</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white">
              App installieren
            </h3>
            <p className="text-xs text-gray-200 mt-1">
              Installiere die App für schnelleren Zugriff und Offline-Spiele!
            </p>

            {/* Buttons */}
            <div className="flex space-x-2 mt-3">
              <button
                onClick={handleInstall}
                disabled={isInstalling}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-600 text-black text-xs font-semibold py-2 px-3 rounded transition-colors duration-200"
              >
                {isInstalling ? 'Installiere...' : 'Installieren'}
              </button>
              <button
                onClick={handleDismiss}
                className="text-xs text-gray-300 hover:text-white px-2 transition-colors duration-200"
              >
                Später
              </button>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-gray-300 hover:text-white transition-colors duration-200"
            aria-label="Schließen"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Features List */}
        <div className="mt-3 text-xs text-gray-200">
          <div className="flex items-center space-x-1">
            <span>✓</span>
            <span>Offline spielen</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>✓</span>
            <span>Schneller Start</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>✓</span>
            <span>Push-Benachrichtigungen</span>
          </div>
        </div>
      </div>
    </div>
  );
}
