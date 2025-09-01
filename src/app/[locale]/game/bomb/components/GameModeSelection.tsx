"use client";



type GameModeSelectionProps = {
  onModeSelect: (mode: "single" | "multi") => void;
};

export default function GameModeSelection({ onModeSelect }: GameModeSelectionProps) {

  return (
    <div className="max-w-2xl mx-auto">
      <div className="cr-card p-6 md:p-8 mb-6">
        <h2 className="text-2xl md:text-3xl font-black mb-6 text-center text-yellow-300">
          🎮 Spielmodus wählen
        </h2>
        <p className="text-center text-white/80 mb-8">
          Wie möchtet ihr heute spielen?
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Single Phone Mode */}
          <div className="cr-card p-6 hover:scale-105 transition-transform duration-300 cursor-pointer group" 
               onClick={() => onModeSelect("single")}>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-black text-yellow-300 mb-3">
                Einzelnes Handy
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Klassischer Modus: Alle Spieler teilen sich ein Gerät und geben es weiter
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Einfach</span>
                <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">Lokal</span>
                <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">Bewährt</span>
              </div>
              <button className="cr-button-primary w-full py-3 text-lg font-black group-hover:shadow-lg">
                🎯 Los geht&apos;s!
              </button>
            </div>
          </div>

          {/* Multi Phone Mode */}
          <div className="cr-card p-6 hover:scale-105 transition-transform duration-300 cursor-pointer group" 
               onClick={() => onModeSelect("multi")}>
            <div className="text-center">
              <div className="text-4xl mb-4">📱📱📱</div>
              <h3 className="text-xl font-black text-yellow-300 mb-3">
                Mehrere Handys
              </h3>
                          <p className="text-white/80 text-sm mb-4">
              Multiplayer Modus: Jeder Spieler nutzt sein eigenes Gerät über Peer-to-Peer Verbindungen
            </p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs">Neu!</span>
                <span className="bg-pink-500/20 text-pink-400 px-2 py-1 rounded text-xs">Online</span>
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">Epic</span>
              </div>
              <button className="cr-button-primary w-full py-3 text-lg font-black group-hover:shadow-lg bg-gradient-to-r from-purple-600 to-pink-600">
                🚀 Multiplayer!
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="text-sm text-white/60">
            💡 <strong>Tipp:</strong> P2P funktioniert am besten wenn alle im selben WLAN sind
          </div>
        </div>
      </div>
    </div>
  );
}