"use client";

import { useEffect } from 'react';

interface NeverHaveIEverSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NeverHaveIEverSettings({ isOpen, onClose }: NeverHaveIEverSettingsProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="cr-card p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
              🍻 Ich hab noch nie - Anleitung
            </h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-2xl font-bold"
              aria-label="Schließen"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6 text-white/90">
            {/* Game Rules */}
            <section>
              <h3 className="text-xl font-bold mb-3 text-blue-300">🎯 Spielregeln</h3>
              <div className="space-y-3 text-sm md:text-base leading-relaxed">
                <p>
                  <strong>Ziel:</strong> Erfahre lustige und peinliche Geheimnisse deiner Freunde!
                </p>
                <p>
                  <strong>So geht&apos;s:</strong> Es wird eine Aussage vorgelesen wie &quot;Ich hab noch nie im Laden geklaut&quot;. 
                  Wer das schon mal gemacht hat, muss trinken!
                </p>
                <p>
                  <strong>Trinken:</strong> Alle die die Aussage NICHT auf sich zutrifft, bleiben sitzen. 
                  Alle anderen trinken einen Schluck.
                </p>
              </div>
            </section>

            {/* Categories */}
            <section>
              <h3 className="text-xl font-bold mb-3 text-green-300">📁 Kategorien</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-green-500/20 border border-green-300/30">
                  <div className="text-2xl mb-2">🟢</div>
                  <h4 className="font-bold text-green-300">Casual</h4>
                  <p className="text-sm text-white/80">Harmlose und lustige Aussagen für alle</p>
                </div>
                <div className="p-4 rounded-lg bg-orange-500/20 border border-orange-300/30">
                  <div className="text-2xl mb-2">🎉</div>
                  <h4 className="font-bold text-orange-300">Party</h4>
                  <p className="text-sm text-white/80">Wilde Partysituationen und Trinkerlebnisse</p>
                </div>
                <div className="p-4 rounded-lg bg-red-500/20 border border-red-300/30">
                  <div className="text-2xl mb-2">🔥</div>
                  <h4 className="font-bold text-red-300">18+</h4>
                  <p className="text-sm text-white/80">Nur für Erwachsene! Pikante Aussagen</p>
                </div>
              </div>
            </section>

            {/* Controls */}
            <section>
              <h3 className="text-xl font-bold mb-3 text-purple-300">🎮 Steuerung</h3>
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <span className="text-2xl">👆</span>
                  <div>
                    <strong>Tippen:</strong> Nutze den &quot;Nächste Aussage&quot; Button
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <span className="text-2xl">👈👉</span>
                  <div>
                    <strong>Swipe:</strong> Wische nach links oder rechts für die nächste Aussage
                  </div>
                </div>
              </div>
            </section>


            {/* Example */}
            <section>
              <h3 className="text-xl font-bold mb-3 text-pink-300">💡 Beispiel</h3>
              <div className="p-4 rounded-lg bg-white/5 border-l-4 border-pink-300">
                <p className="mb-2"><strong>Aussage:</strong> &quot;Ich hab noch nie die Schule geschwänzt&quot;</p>
                <p className="text-sm text-white/80">
                  → Alle die schon mal die Schule geschwänzt haben, trinken einen Schluck!<br/>
                  → Alle anderen bleiben sitzen und schauen zu 😏
                </p>
              </div>
            </section>

            {/* Tips */}
            <section>
              <h3 className="text-xl font-bold mb-3 text-red-300">💡 Tipps</h3>
              <ul className="space-y-2 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-red-300 mt-1">•</span>
                  <span>Seid ehrlich - das macht das Spiel erst richtig lustig!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-300 mt-1">•</span>
                  <span>Trinkt verantwortungsvoll und kennt eure Grenzen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-300 mt-1">•</span>
                  <span>Respektiert die Grenzen anderer - niemand muss etwas preisgeben</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-300 mt-1">•</span>
                  <span>Habt Spaß und lacht zusammen!</span>
                </li>
              </ul>
            </section>
          </div>

          {/* Close Button */}
          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="cr-button-primary px-8 py-3 text-lg font-black"
            >
              Los geht&apos;s! 🍻
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
