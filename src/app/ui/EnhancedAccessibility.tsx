'use client';

import { useState } from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { useAccessibility } from '../hooks/useAccessibility';
import { useParams } from 'next/navigation';

interface AccessibilityEnhancementsProps {
  className?: string;
}

export function AccessibilityEnhancements({ className = '' }: AccessibilityEnhancementsProps) {
  const { isMobile } = useResponsive();
  const params = useParams();
  const locale = (params as { locale?: string })?.locale === 'en' ? 'en' : 'de';

  const t = locale === 'en' ? {
    title: 'Accessibility',
    close: 'Close settings',
    highContrast: 'High contrast',
    highContrastDesc: 'Improves visibility',
    animations: 'Animations',
    animationsStatus: (mode: string) => mode === 'system' ? 'System' : (mode === 'reduced' ? 'Reduced' : 'Normal'),
    animationsDesc: '(Based on system settings or your choice)',
    toggleAnimations: 'Toggle animations',
    fontSize: 'Font size',
    sizes: { small: 'Small', normal: 'Normal', large: 'Large', xl: 'Extra large' },
    reset: 'Reset settings',
    keyboardHint: 'Use Tab to navigate and Enter to select',
    openAria: 'Open accessibility settings'
  } : {
    title: 'Barrierefreiheit',
    close: 'Einstellungen schließen',
    highContrast: 'Hoher Kontrast',
    highContrastDesc: 'Verbessert die Sichtbarkeit',
    animations: 'Animationen',
    animationsStatus: (mode: string) => mode === 'system' ? 'System' : (mode === 'reduced' ? 'Reduziert' : 'Normal'),
    animationsDesc: '(Basiert auf System-Einstellungen oder deiner Auswahl)',
    toggleAnimations: 'Animationen umschalten',
    fontSize: 'Schriftgröße',
    sizes: { small: 'Klein', normal: 'Normal', large: 'Groß', xl: 'Sehr groß' },
    reset: 'Einstellungen zurücksetzen',
    keyboardHint: 'Verwende Tab zum Navigieren und Enter zum Auswählen',
    openAria: 'Barrierefreiheits-Einstellungen öffnen'
  };

  const {
    reducedMotion,
    highContrast,
    fontSize,
    toggleHighContrast,
    changeFontSize,
    resetToDefaults,
    cycleMotionPreference,
    motionMode,
  } = useAccessibility();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`accessibility-enhancements ${className}`}>
      {/* Accessibility Toggle Button (unten links) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={t.openAria}
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
          
          {/* Panel */}
          <div className={`fixed ${isMobile ? 'bottom-0 left-0 right-0' : 'bottom-20 left-4'} z-50 bg-white dark:bg-gray-800 rounded-t-lg ${!isMobile ? 'rounded-lg' : ''} shadow-xl max-w-sm ${isMobile ? 'w-full' : 'w-80'}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t.title}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                  aria-label={t.close}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="high-contrast" className="text-sm font-medium text-gray-900 dark:text-white">
                    {t.highContrast}
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t.highContrastDesc}
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

              {/* Animations (toggle) */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{t.animations}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t.animationsDesc}</p>
                </div>
                <button
                  onClick={cycleMotionPreference}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${reducedMotion ? 'bg-yellow-500 text-black' : 'bg-green-600 text-white'} `}
                  aria-label={t.toggleAnimations}
                >
                  {t.animationsStatus(motionMode)}
                </button>
              </div>

              {/* Schriftgröße */}
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
                  {t.fontSize}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: 'small', label: t.sizes.small },
                    { value: 'normal', label: t.sizes.normal },
                    { value: 'large', label: t.sizes.large },
                    { value: 'xl', label: t.sizes.xl },
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
                  🔄 {t.reset}
                </button>
              </div>

              {/* Keyboard Navigation Hint */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  💡 {t.keyboardHint}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function SkipLinks() {
  return null;
}
