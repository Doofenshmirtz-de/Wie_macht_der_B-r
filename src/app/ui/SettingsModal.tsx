"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bombTimerRange: { min: number; max: number };
  onBombTimerRangeChange: (range: { min: number; max: number }) => void;
}

export function SettingsModal({ isOpen, onClose, bombTimerRange, onBombTimerRangeChange }: SettingsModalProps) {
  const [minTime, setMinTime] = useState(bombTimerRange.min);
  const [maxTime, setMaxTime] = useState(bombTimerRange.max);

  useEffect(() => {
    setMinTime(bombTimerRange.min);
    setMaxTime(bombTimerRange.max);
  }, [bombTimerRange]);

  if (!isOpen) return null;

  const handleSave = () => {
    // Validierung
    const validMin = Math.max(10, Math.min(180, minTime));
    const validMax = Math.max(validMin + 10, Math.min(180, maxTime));
    
    onBombTimerRangeChange({ min: validMin, max: validMax });
    onClose();
  };

  const handleMinChange = (value: number) => {
    setMinTime(value);
    if (value >= maxTime) {
      setMaxTime(value + 10);
    }
  };

  const handleMaxChange = (value: number) => {
    setMaxTime(value);
    if (value <= minTime) {
      setMinTime(value - 10);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="cr-card p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl border-2 border-yellow-300 shadow-lg flex items-center justify-center">
                <Image src="/icons/gear.svg" alt="Einstellungen" width={24} height={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-yellow-300">
                ⚙️ Einstellungen
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="text-2xl text-white/60 hover:text-white transition-colors p-2"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Anleitung Sektion */}
            <section>
              <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                📚 Spielanleitung - Bomb Party
              </h3>
              <div className="bg-white/10 rounded-xl p-4 space-y-3 text-white/90">
                <div className="space-y-2">
                  <h4 className="font-bold text-yellow-200">🎯 Spielziel:</h4>
                  <p>Finde schnell Begriffe die zur angezeigten Kategorie passen, bevor die Bombe explodiert!</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-bold text-yellow-200">🎮 Spielablauf:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• Jeder Spieler sieht die gleiche Kategorie (z.B. &quot;Automarken&quot;)</li>
                    <li>• Finde einen Begriff der zur Kategorie passt (z.B. &quot;BMW&quot;, &quot;Audi&quot;)</li>
                    <li>• Sage dein Wort laut und drücke &quot;Nächster Spieler&quot;</li>
                    <li>• Die Bombe kann jederzeit explodieren!</li>
                    <li>• Wer die Bombe hat wenn sie explodiert, verliert die Runde</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-yellow-200">📱 Spielmodi:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>Einzelhandy:</strong> Alle spielen mit einem Gerät</li>
                    <li>• <strong>Multiplayer:</strong> Jeder hat sein eigenes Handy</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Bombe Zeitraum Einstellungen */}
            <section>
              <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                💣 Bomben-Timer Einstellungen
              </h3>
              <div className="bg-white/10 rounded-xl p-4 space-y-4">
                <p className="text-white/80">
                  Stelle ein, wie lange die Bombe mindestens und maximal ticken soll:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Minimum Zeit */}
                  <div>
                    <label className="block text-sm font-bold text-yellow-200 mb-2">
                      Mindestzeit (Sekunden):
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="10"
                        max="120"
                        value={minTime}
                        onChange={(e) => handleMinChange(Number(e.target.value))}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-center">
                        <span className="text-lg font-bold text-white bg-blue-600 px-3 py-1 rounded-lg">
                          {minTime}s
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Maximum Zeit */}
                  <div>
                    <label className="block text-sm font-bold text-yellow-200 mb-2">
                      Maximalzeit (Sekunden):
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="20"
                        max="180"
                        value={maxTime}
                        onChange={(e) => handleMaxChange(Number(e.target.value))}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-center">
                        <span className="text-lg font-bold text-white bg-red-600 px-3 py-1 rounded-lg">
                          {maxTime}s
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center text-white/70 text-sm mt-4">
                  Die Bombe explodiert zufällig zwischen {minTime} und {maxTime} Sekunden
                </div>
              </div>
            </section>

            {/* Kategorien Info */}
            <section>
              <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                🎯 Kategorien
              </h3>
              <div className="bg-white/10 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-500/20 rounded-lg">
                  <span className="text-2xl">🟢</span>
                  <div>
                    <h4 className="font-bold text-green-300">Casual</h4>
                    <p className="text-sm text-white/80">Einfache, alltägliche Wörter - perfekt für Anfänger</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-500/20 rounded-lg">
                  <span className="text-2xl">🔴</span>
                  <div>
                    <h4 className="font-bold text-red-300">Hard</h4>
                    <p className="text-sm text-white/80">Schwierigere Wörter für erfahrene Spieler</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-500/20 rounded-lg">
                  <span className="text-2xl">🌶️</span>
                  <div>
                    <h4 className="font-bold text-orange-300">Spicy</h4>
                    <p className="text-sm text-white/80">Für Erwachsene - freche und pikante Begriffe</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSave}
                className="cr-button-primary flex-1 px-6 py-3 text-lg font-black"
              >
                ✅ Einstellungen speichern
              </button>
              <button
                onClick={onClose}
                className="cr-button-danger px-6 py-3 text-lg font-black"
              >
                ❌ Abbrechen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
