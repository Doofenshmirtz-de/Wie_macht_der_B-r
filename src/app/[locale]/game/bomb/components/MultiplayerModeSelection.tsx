"use client";

import { useTranslations } from "next-intl";

type MultiplayerModeSelectionProps = {
  onModeSelect: (mode: "host" | "client") => void;
  onBack: () => void;
};

export default function MultiplayerModeSelection({ onModeSelect, onBack }: MultiplayerModeSelectionProps) {
  const t = useTranslations();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="cr-card p-6 md:p-8 mb-6">
        <h2 className="text-2xl md:text-3xl font-black mb-6 text-center text-yellow-300">
          🌐 Multiplayer Setup
        </h2>
        <p className="text-center text-white/80 mb-8">
          Möchtest du eine neue Gruppe erstellen oder einer bestehenden beitreten?
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Host Mode */}
          <div className="cr-card p-6 hover:scale-105 transition-transform duration-300 cursor-pointer group" 
               onClick={() => onModeSelect("host")}>
            <div className="text-center">
              <div className="text-4xl mb-4">👑</div>
              <h3 className="text-xl font-black text-yellow-300 mb-3">
                Gruppe erstellen
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Du wirst der Gastgeber und verwaltest das Spiel. Andere können über QR-Code beitreten.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">Host</span>
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">QR-Code</span>
                <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">Bis 16 Spieler</span>
              </div>
              <div className="text-xs text-white/60 mb-4">
                ✅ Spiel steuern<br/>
                ✅ Kategorien wählen<br/>
                ✅ QR-Code teilen
              </div>
              <button className="cr-button-primary w-full py-3 text-lg font-black group-hover:shadow-lg">
                👑 Host werden
              </button>
            </div>
          </div>

          {/* Client Mode */}
          <div className="cr-card p-6 hover:scale-105 transition-transform duration-300 cursor-pointer group" 
               onClick={() => onModeSelect("client")}>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-black text-yellow-300 mb-3">
                Gruppe beitreten
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Scanne den QR-Code des Gastgebers oder gib den Room-Code ein.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">Client</span>
                <span className="bg-pink-500/20 text-pink-400 px-2 py-1 rounded text-xs">QR-Scanner</span>
                <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs">Einfach</span>
              </div>
              <div className="text-xs text-white/60 mb-4">
                ✅ QR-Code scannen<br/>
                ✅ Namen eingeben<br/>
                ✅ Mitspielen
              </div>
              <button className="cr-button-primary w-full py-3 text-lg font-black group-hover:shadow-lg bg-gradient-to-r from-purple-600 to-pink-600">
                📷 Beitreten
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={onBack}
            className="cr-button-danger px-6 py-3 text-lg font-black"
          >
            ⬅️ Zurück
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <div className="text-sm text-white/60">
            💡 <strong>Host-Tipp:</strong> Der Host verwaltet das ganze Spiel und sollte die beste Internetverbindung haben
          </div>
        </div>
      </div>
    </div>
  );
}