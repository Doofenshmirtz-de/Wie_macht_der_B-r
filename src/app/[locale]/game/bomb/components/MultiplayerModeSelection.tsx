"use client";

import Image from "next/image";

type MultiplayerModeSelectionProps = {
  onModeSelect: (mode: "host" | "client") => void;
  onBack: () => void;
  onOpenSettings: () => void;
};

export default function MultiplayerModeSelection({ onModeSelect, onBack, onOpenSettings }: MultiplayerModeSelectionProps) {

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
                Du wirst der Host und verwaltest das Spiel. Andere verbinden sich direkt via P2P.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">Host</span>
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">P2P</span>
                <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">Bis 16 Spieler</span>
              </div>
              <div className="text-xs text-white/60 mb-4">
                ✅ Spiel steuern<br/>
                ✅ Kategorien wählen<br/>
                ✅ Share-Link teilen
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
                Füge den Share-Link oder Room-Code des Hosts ein und verbinde dich direkt.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">Client</span>
                <span className="bg-pink-500/20 text-pink-400 px-2 py-1 rounded text-xs">WebRTC</span>
                <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs">Einfach</span>
              </div>
              <div className="text-xs text-white/60 mb-4">
                ✅ Share-Link eingeben<br/>
                ✅ Namen eingeben<br/>
                ✅ Mitspielen
              </div>
              <button className="cr-button-primary w-full py-3 text-lg font-black group-hover:shadow-lg bg-gradient-to-r from-purple-600 to-pink-600">
                🔗 P2P Beitreten
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center space-y-4">
          <button 
            onClick={onBack}
            className="cr-button-danger px-6 py-3 text-lg font-black"
          >
            ⬅️ Zurück
          </button>
          
          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="group relative px-6 py-3 rounded-xl overflow-hidden border-2 border-white/30 hover:border-yellow-300/70 bg-gradient-to-b from-orange-500/80 to-red-600/80 transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3 shadow-lg mx-auto"
            aria-label="Bomb Party Einstellungen öffnen"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
            <Image src="/icons/gear.svg" alt="Einstellungen" width={20} height={20} className="drop-shadow-lg" />
            <span className="text-white font-bold text-lg drop-shadow-lg">Einstellungen</span>
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <div className="text-sm text-white/60">
            💡 <strong>P2P-Tipp:</strong> Der Host koordiniert das Spiel, alle verbinden sich direkt miteinander
          </div>
        </div>
      </div>
    </div>
  );
}