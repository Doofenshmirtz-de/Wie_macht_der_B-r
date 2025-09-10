'use client';

import { useState, useEffect } from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { useAccessibility } from '../hooks/useAccessibility';

interface AccessibilityEnhancementsProps {
  className?: string;
}

export function AccessibilityEnhancements({ className = '' }: AccessibilityEnhancementsProps) {
  const { isMobile } = useResponsive();
  const {
    reducedMotion,
    highContrast,
    fontSize,
    toggleHighContrast,
    changeFontSize,
    resetToDefaults,
  } = useAccessibility();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`accessibility-enhancements ${className}`}>
      {/* Accessibility Toggle Button (unten links) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Barrierefreiheits-Einstellungen öffnen"
        aria-expanded={isOpen}
      >
        <span className="text-xl" role="img" aria-label="Accessibility">♿</span>
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel mit Funktionen des ehemaligen Top-Right Menüs */}
          <div className={`fixed ${isMobile ? 'bottom-0 left-0 right-0' : 'bottom-20 left-4'} z-50 bg-white dark:bg-gray-800 rounded-t-lg ${!isMobile ? 'rounded-lg' : ''} shadow-xl max-w-sm ${isMobile ? 'w-full' : 'w-80'}`}>
            
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Barrierefreiheit
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                  aria-label="Einstellungen schließen"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* High Contrast (umschaltbar) */}
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="high-contrast" className="text-sm font-medium text-gray-900 dark:text-white">
                    Hoher Kontrast
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Verbessert die Sichtbarkeit
                  </p>
                </div>
                <button
                  id="high-contrast"
                  onClick={toggleHighContrast}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    highContrast ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  role="switch"
                  aria-checked={highContrast}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Animationen (Status, read-only) */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Animationen</span>
                  <span className={`text-xs font-semibold ${reducedMotion ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'}`}>
                    {reducedMotion ? 'Reduziert (System)' : 'Normal'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">(Basiert auf System-Einstellungen)</p>
              </div>

              {/* Schriftgröße (4 Stufen) */}
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
                  Schriftgröße
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: 'small', label: 'Klein' },
                    { value: 'normal', label: 'Normal' },
                    { value: 'large', label: 'Groß' },
                    { value: 'xl', label: 'Sehr groß' },
                  ].map((size) => (
                    <button
                      key={size.value}
                      onClick={() => changeFontSize(size.value)}
                      className={`px-3 py-2 text-xs font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        fontSize === size.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                      aria-pressed={fontSize === size.value}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <div className="pt-2">
                <button
                  onClick={resetToDefaults}
                  className="w-full cr-button-danger p-2 text-sm font-semibold rounded-lg"
                >
                  🔄 Einstellungen zurücksetzen
                </button>
              </div>

              {/* Keyboard Navigation Hint */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  💡 Verwende Tab zum Navigieren und Enter zum Auswählen
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Skip Link Component
export function SkipLinks() {
  return (
    <div className="skip-links">
      <a href="#main-content" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      <a href="#games-section" className="skip-link">
        Zu den Spielen springen
      </a>
      <a href="#community-stats" className="skip-link">
        Zur Community springen
      </a>
    </div>
  );
}

// Screen Reader Announcements
interface ScreenReaderAnnouncementProps {
  message: string;
  priority?: 'polite' | 'assertive';
}

export function ScreenReaderAnnouncement({ message, priority = 'polite' }: ScreenReaderAnnouncementProps) {
  useEffect(() => {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }, [message, priority]);

  return null;
}
