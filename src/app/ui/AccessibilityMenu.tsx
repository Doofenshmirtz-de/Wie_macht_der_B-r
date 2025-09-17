'use client';

import { useState } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { useParams } from 'next/navigation';

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    reducedMotion, 
    highContrast, 
    fontSize, 
    toggleHighContrast, 
    changeFontSize, 
    resetToDefaults,
    cycleMotionPreference,
    motionMode
  } = useAccessibility();

  const params = useParams();
  const locale = (params as { locale?: string })?.locale === 'en' ? 'en' : 'de';
  const t = locale === 'en' ? {
    open: 'Open accessibility settings',
    title: 'Accessibility',
    close: 'Close menu',
    fontSize: 'Font size',
    sizes: { small: 'Small', normal: 'Normal', large: 'Large', xl: 'Extra large' },
    highContrast: 'High contrast',
    toggleContrast: 'Toggle high contrast',
    animations: 'Animations',
    animationsDesc: '(Based on system settings or your choice)',
    animationsStatus: (mode: string) => mode === 'system' ? 'System' : (mode === 'reduced' ? 'Reduced' : 'Normal'),
    reset: 'Reset settings'
  } : {
    open: 'Barrierefreiheit-Einstellungen öffnen',
    title: 'Barrierefreiheit',
    close: 'Menü schließen',
    fontSize: 'Schriftgröße',
    sizes: { small: 'Klein', normal: 'Normal', large: 'Groß', xl: 'Sehr groß' },
    highContrast: 'Hoher Kontrast',
    toggleContrast: 'Hohen Kontrast umschalten',
    animations: 'Animationen',
    animationsDesc: '(Basiert auf System-Einstellungen oder deiner Auswahl)',
    animationsStatus: (mode: string) => mode === 'system' ? 'System' : (mode === 'reduced' ? 'Reduziert' : 'Normal'),
    reset: 'Einstellungen zurücksetzen'
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Toggle Button - bleibt immer rechts */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`cr-button-primary p-3 rounded-xl shadow-lg transition-all duration-300 ${
            isOpen ? 'bg-yellow-500' : ''
          }`}
          aria-label={t.open}
          aria-expanded={isOpen}
        >
          <span className="text-xl" role="img" aria-label="Barrierefreiheit">
            ♿
          </span>
        </button>

        {/* Menu Panel - Rechts bündig mit Button, aber innerhalb des Viewports */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-80 cr-card p-6 animate-scale-in -translate-x-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-yellow-300">
              ♿ {t.title}
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
              aria-label={t.close}
            >
              ✖️
            </button>
          </div>

          <div className="space-y-4">
            {/* Font Size Control */}
            <div>
              <label className="block text-white/80 font-semibold mb-2">
                📝 {t.fontSize}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'small', label: t.sizes.small },
                  { value: 'normal', label: t.sizes.normal },
                  { value: 'large', label: t.sizes.large },
                  { value: 'xl', label: t.sizes.xl },
                ].map((size) => (
                  <button
                    key={size.value}
                    onClick={() => changeFontSize(size.value)}
                    className={`p-2 rounded-lg text-sm font-semibold transition-colors ${
                      fontSize === size.value
                        ? 'bg-yellow-500 text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    aria-pressed={fontSize === size.value}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast Toggle */}
            <div>
              <label className="flex items-center justify-between">
                <span className="text-white/80 font-semibold">
                  🌗 {t.highContrast}
                </span>
                <button
                  onClick={toggleHighContrast}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    highContrast ? 'bg-yellow-500' : 'bg-white/20'
                  }`}
                  role="switch"
                  aria-checked={highContrast}
                  aria-label={t.toggleContrast}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      highContrast ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </label>
            </div>

            {/* Motion Toggle */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-white/80 font-semibold">
                  🎭 {t.animations}
                </span>
                <button
                  onClick={cycleMotionPreference}
                  className={`px-2 py-1 rounded text-sm font-semibold ${reducedMotion ? 'bg-yellow-500 text-black' : 'bg-green-600 text-white'}`}
                  aria-label={t.animations}
                >
                  {t.animationsStatus(motionMode)}
                </button>
              </div>
              <p className="text-xs text-white/60 mt-1">
                {t.animationsDesc}
              </p>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetToDefaults}
              className="w-full cr-button-danger p-2 text-sm font-semibold rounded-lg"
            >
              🔄 {t.reset}
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
