"use client";

import Image from 'next/image';

interface CategorySelectionProps {
  onCategorySelect: (category: 'simple' | 'spicy') => void;
  onOpenSettings: () => void;
}

export function CategorySelection({ onCategorySelect, onOpenSettings }: CategorySelectionProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-red-600 drop-shadow-lg">
          Wähle eine Kategorie
        </h2>
        <p className="text-white/80 text-lg">
          Entscheide dich für dein Abenteuer!
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Simple Category */}
        <button
          onClick={() => onCategorySelect('simple')}
          className="group relative p-6 md:p-8 rounded-xl overflow-hidden border-2 border-white/30 hover:border-green-300/70 bg-gradient-to-b from-green-500/80 to-emerald-600/80 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
          <div className="relative z-10 text-center">
            <div className="text-4xl md:text-5xl mb-4">🟢</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 drop-shadow-lg">
              Einfach
            </h3>
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              Harmlose Fragen und lustige Aufgaben für alle Altersgruppen. Perfekt für Familienfeiern!
            </p>
          </div>
          <div className="absolute bottom-2 right-2 opacity-20 text-6xl">
            😊
          </div>
        </button>

        {/* Spicy Category */}
        <button
          onClick={() => onCategorySelect('spicy')}
          className="group relative p-6 md:p-8 rounded-xl overflow-hidden border-2 border-white/30 hover:border-red-300/70 bg-gradient-to-b from-red-500/80 to-rose-600/80 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
          <div className="relative z-10 text-center">
            <div className="text-4xl md:text-5xl mb-4">🔥</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 drop-shadow-lg">
              18+
            </h3>
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              Nur für Erwachsene! Freche Fragen und pikante Aufgaben für mutige Spieler.
            </p>
          </div>
          <div className="absolute bottom-2 right-2 opacity-20 text-6xl">
            😈
          </div>
        </button>
      </div>

      {/* Settings Button */}
      <div className="text-center">
        <button
          onClick={onOpenSettings}
          className="group relative px-6 py-3 rounded-xl overflow-hidden border-2 border-white/30 hover:border-yellow-300/70 bg-gradient-to-b from-purple-500/80 to-pink-600/80 transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3 shadow-lg mx-auto"
          aria-label="Wahrheit oder Pflicht Einstellungen öffnen"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
          <Image src="/icons/gear.svg" alt="Einstellungen" width={20} height={20} className="drop-shadow-lg" />
          <span className="text-white font-bold text-lg drop-shadow-lg">Anleitung</span>
        </button>
      </div>
    </div>
  );
}
