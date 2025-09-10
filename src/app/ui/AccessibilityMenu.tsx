'use client';

import { useState } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    reducedMotion, 
    highContrast, 
    fontSize, 
    toggleHighContrast, 
    changeFontSize, 
    resetToDefaults 
  } = useAccessibility();

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Toggle Button - bleibt immer rechts */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`cr-button-primary p-3 rounded-xl shadow-lg transition-all duration-300 ${
            isOpen ? 'bg-yellow-500' : ''
          }`}
          aria-label="Barrierefreiheit-Einstellungen öffnen"
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
              ♿ Barrierefreiheit
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Menü schließen"
            >
              ✖️
            </button>
          </div>

          <div className="space-y-4">
            {/* Font Size Control */}
            <div>
              <label className="block text-white/80 font-semibold mb-2">
                📝 Schriftgröße
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'small', label: 'Klein' },
                  { value: 'normal', label: 'Normal' },
                  { value: 'large', label: 'Groß' },
                  { value: 'xl', label: 'Sehr groß' },
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
                  🌗 Hoher Kontrast
                </span>
                <button
                  onClick={toggleHighContrast}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    highContrast ? 'bg-yellow-500' : 'bg-white/20'
                  }`}
                  role="switch"
                  aria-checked={highContrast}
                  aria-label="Hohen Kontrast umschalten"
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      highContrast ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </label>
            </div>

            {/* Motion Status (Read-only) */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-white/80 font-semibold">
                  🎭 Animationen
                </span>
                <span className={`text-sm font-semibold ${
                  reducedMotion ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {reducedMotion ? 'Reduziert' : 'Normal'}
                </span>
              </div>
              <p className="text-xs text-white/60 mt-1">
                (Basiert auf System-Einstellungen)
              </p>
            </div>

            {/* Navigation Help */}
            <div className="border-t border-white/10 pt-4">
              <h4 className="text-white/80 font-semibold mb-2">
                ⌨️ Tastatur-Navigation
              </h4>
              <ul className="text-xs text-white/60 space-y-1">
                <li>• <kbd className="bg-white/10 px-1 rounded">Tab</kbd> - Nächstes Element</li>
                <li>• <kbd className="bg-white/10 px-1 rounded">Enter</kbd> - Aktivieren</li>
                <li>• <kbd className="bg-white/10 px-1 rounded">Esc</kbd> - Menü schließen</li>
                <li>• <kbd className="bg-white/10 px-1 rounded">Alt+A</kbd> - Dieses Menü</li>
              </ul>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetToDefaults}
              className="w-full cr-button-danger p-2 text-sm font-semibold rounded-lg"
            >
              🔄 Einstellungen zurücksetzen
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
