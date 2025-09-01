"use client";


import type { HostGameState, ClientGameState } from "../shared/multiplayer-types";

type WaitingRoomProps = {
  gameMode: "host" | "client";
  hostGameState?: HostGameState;
  clientGameState?: ClientGameState;
  onStartGame?: () => void;
  onLeaveRoom: () => void;
};

export default function WaitingRoom({ 
  gameMode, 
  hostGameState, 
  clientGameState, 
  onStartGame, 
  onLeaveRoom 
}: WaitingRoomProps) {

  // Get players list based on mode
  const players = gameMode === "host" 
    ? hostGameState?.players || []
    : clientGameState?.players || [];
    
  const roomId = gameMode === "host" 
    ? hostGameState?.roomId 
    : clientGameState?.roomId;

  const canStartGame = gameMode === "host" && players.length >= 2;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="cr-card p-6 md:p-8 mb-6">
        <h2 className="text-2xl md:text-3xl font-black mb-6 text-center text-yellow-300">
          🌐 Warteraum
        </h2>
        
        {/* Room Info */}
        <div className="text-center mb-6">
          <div className="text-lg text-white/80 mb-2">
            P2P Room: <strong className="text-yellow-300">{roomId}</strong>
          </div>
          <div className="text-sm text-white/60">
            {gameMode === "host" ? "👑 Du bist der P2P Host" : "📱 Du bist P2P verbunden"}
          </div>
        </div>

        {/* Players List */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 text-yellow-300 text-center">
            👥 Spieler ({players.length}/16):
          </h3>
          
          <div className="space-y-2">
            {players.map((player) => (
              <div 
                key={player.id} 
                className="flex items-center justify-between bg-white/10 rounded-lg p-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">
                    {player.isHost && "👑"} {player.name}
                  </span>
                  {player.isHost && <span className="text-xs text-yellow-400">(Host)</span>}
                </div>
                
                {gameMode === "host" && (
                  <span className={`text-sm px-2 py-1 rounded ${
                    player.connectionStatus === 'connected' ? 'bg-green-500/20 text-green-400' :
                    player.connectionStatus === 'connecting' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {                    player.connectionStatus === 'connected' ? '✅ P2P' :
                     player.connectionStatus === 'connecting' ? '🔄 P2P...' :
                     '❌ Fehler'}
                  </span>
                )}
              </div>
            ))}
          </div>
          
          {/* Empty slots indicator */}
          {players.length < 16 && (
            <div className="mt-3 text-center text-white/40 text-sm">
              {16 - players.length} Plätze frei
            </div>
          )}
        </div>

        {/* Host Controls */}
        {gameMode === "host" && (
          <div className="space-y-4">
            {/* Game Settings */}
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-lg font-bold text-yellow-300 mb-3">⚙️ Spiel-Einstellungen:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60">Runden:</span>
                  <span className="text-white font-bold ml-2">{hostGameState?.totalRounds}</span>
                </div>
                <div>
                  <span className="text-white/60">Kategorie:</span>
                  <span className="text-white font-bold ml-2 capitalize">{hostGameState?.selectedCategory}</span>
                </div>
              </div>
            </div>

            {/* Start Game Button */}
            <div className="text-center">
              {!canStartGame && (
                <p className="text-yellow-300 mb-4">Mindestens 2 Spieler benötigt zum Starten</p>
              )}
              <button
                onClick={onStartGame}
                disabled={!canStartGame}
                className="cr-button-primary px-8 py-4 text-xl font-black disabled:opacity-50 disabled:cursor-not-allowed w-full"
              >
                {canStartGame ? "🎮 Spiel starten" : "⚠️ Warten auf Spieler..."}
              </button>
            </div>
          </div>
        )}

        {/* Client Status */}
        {gameMode === "client" && (
          <div className="text-center space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-lg text-white/80 mb-2">
                Warten auf Host...
              </div>
              <div className="text-sm text-white/60">
                Der Host wird das Spiel starten, sobald genügend Spieler da sind.
              </div>
            </div>
            
            {/* Connection Status */}
            {clientGameState && (
              <div className={`text-sm px-3 py-2 rounded-lg ${
                clientGameState.connectionStatus === "connected" 
                  ? "bg-green-500/20 text-green-400" 
                  : "bg-red-500/20 text-red-400"
              }`}>
                {clientGameState.connectionStatus === "connected" 
                  ? "✅ P2P mit Host verbunden" 
                  : "❌ P2P Verbindung unterbrochen"}
              </div>
            )}
          </div>
        )}

        {/* Leave Room Button */}
        <div className="mt-6 text-center">
          <button 
            onClick={onLeaveRoom}
            className="cr-button-danger px-6 py-3 text-lg font-black"
          >
            🚪 Raum verlassen
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="cr-card p-4">
        <h4 className="text-lg font-bold text-yellow-300 mb-3 text-center">💡 Wie funktioniert&apos;s?</h4>
        <div className="space-y-2 text-sm text-white/80">
          <div>• <strong>P2P Host:</strong> Koordiniert das Spiel und entscheidet bei Explosionen</div>
          <div>• <strong>P2P Clients:</strong> Sehen alle dasselbe Wort, aber nicht den Timer</div>
          <div>• <strong>WebRTC:</strong> Direkte Verbindungen zwischen allen Geräten</div>
          <div>• <strong>Privat:</strong> Keine Daten über externe Server</div>
        </div>
      </div>
    </div>
  );
}