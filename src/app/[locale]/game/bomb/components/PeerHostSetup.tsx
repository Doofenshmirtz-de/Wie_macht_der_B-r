"use client";

import { useState, useEffect, useRef } from "react";

import { HostPeerManager } from "../utils/peer-utils";
import { generateShareLink, signalingManager } from "../utils/signaling-utils";
import type { MultiplayerPlayer, HostGameState, PlayerActionData, JoinRequestData } from "../shared/multiplayer-types";

type PeerHostSetupProps = {
  onGameStateChange: (gameState: HostGameState) => void;
  onBack: () => void;
};

export default function PeerHostSetup({ onGameStateChange, onBack }: PeerHostSetupProps) {

  const [hostName, setHostName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [roomCreated, setRoomCreated] = useState(false);
  const [players, setPlayers] = useState<MultiplayerPlayer[]>([]);
  const [connectionStatus, setConnectionStatus] = useState("Bereit Room zu erstellen");
  const [error, setError] = useState("");

  const hostManagerRef = useRef<HostPeerManager | null>(null);
  const hostIdRef = useRef<string>("");

  // Create room
  const createRoom = async () => {
    if (!hostName.trim()) {
      setError("Bitte Namen eingeben");
      return;
    }

    setIsCreatingRoom(true);
    setError("");
    setConnectionStatus("Erstelle Raum...");

    try {
      // Generate host ID and create host manager
      const hostId = signalingManager.generatePeerId();
      hostIdRef.current = hostId;
      
      const hostManager = new HostPeerManager(hostId, hostName.trim());
      hostManagerRef.current = hostManager;

      // Start hosting and get room ID
      const generatedRoomId = await hostManager.startHosting();
      setRoomId(generatedRoomId);

      // Generate share link
      const shareUrl = generateShareLink(generatedRoomId, hostName.trim());
      setShareLink(shareUrl);

      // Get initial players (just host)
      const initialPlayers = hostManager.getPlayers();
      setPlayers(initialPlayers);

      setRoomCreated(true);
      setConnectionStatus(`Raum ${generatedRoomId} erstellt!`);

      // Create initial host game state
      const initialGameState: HostGameState = {
        roomId: generatedRoomId,
        players: initialPlayers,
        currentPlayerIndex: 0,
        selectedCategory: "casual",
        currentWord: "",
        isGameActive: false,
        bombTimer: 0,
        totalRounds: 5,
        currentRound: 1,
        playerScores: [{
          playerId: hostId,
          playerName: hostName.trim(),
          losses: 0
        }],
        gamePhase: "waiting"
      };

      // Setup host manager event handlers
      setupHostManagerEvents(hostManager, initialGameState);
      
      onGameStateChange(initialGameState);

    } catch (error) {
      console.error("Failed to create room:", error);
      setError("Fehler beim Erstellen des Raums");
      setIsCreatingRoom(false);
    }
  };

  // Setup host manager event handlers
  const setupHostManagerEvents = (hostManager: HostPeerManager, gameState: HostGameState) => {
    // Handle player actions
    hostManager.onMessage("player-action", (peerId: string, data: unknown) => {
      const actionData = data as PlayerActionData;
      console.log(`Player action from ${peerId}:`, actionData);
      // Handle player actions like "next-player", etc.
    });

    // Update players list periodically to reflect connection changes
    const updateInterval = setInterval(() => {
      const currentPlayers = hostManager.getPlayers();
      setPlayers(currentPlayers);
      setConnectionStatus(`${currentPlayers.length} Spieler im Raum`);
      
      // Update game state
      const updatedGameState: HostGameState = {
        ...gameState,
        players: currentPlayers,
        playerScores: currentPlayers.map(p => ({
          playerId: p.id,
          playerName: p.name,
          losses: 0
        }))
      };
      onGameStateChange(updatedGameState);
    }, 1000);

    hostManager.onMessage("join-request", (peerId: string, data: unknown) => {
      const joinRequest = data as JoinRequestData;
      console.log(`Join request from ${peerId}:`, joinRequest);
      
      // Send welcome message to client
      hostManager.sendToClient(peerId, "join-response", {
        success: true,
        gameState: {
          roomId: gameState.roomId,
          players: hostManager.getPlayers().map(p => ({
            id: p.id,
            name: p.name,
            isHost: p.isHost,
            connectionStatus: p.connectionStatus
          })),
          currentPlayerIndex: gameState.currentPlayerIndex,
          selectedCategory: gameState.selectedCategory,
          currentWord: gameState.currentWord,
          isGameActive: gameState.isGameActive,
          totalRounds: gameState.totalRounds,
          currentRound: gameState.currentRound,
          playerScores: gameState.playerScores,
          gamePhase: gameState.gamePhase
        }
      });
    });
    
    // Cleanup interval
    return () => clearInterval(updateInterval);
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setConnectionStatus("📋 In Zwischenablage kopiert!");
      setTimeout(() => {
        setConnectionStatus(`${players.length} Spieler im Raum`);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  // Start game
  const startGame = () => {
    if (players.length < 2) return;
    
    // Broadcast game start to all clients
    if (hostManagerRef.current) {
      hostManagerRef.current.broadcastGameState({
        phase: "rounds"
      });
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hostManagerRef.current) {
        hostManagerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      {!roomCreated ? (
        /* Host Name Input */
        <div className="cr-card p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-center text-yellow-300">
            👑 Peer-to-Peer Host Setup
          </h2>
          
          <div className="mb-6">
            <label className="block text-lg font-bold mb-3 text-yellow-300">
              Dein Name (als Host):
            </label>
            <input
              type="text"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && createRoom()}
              placeholder="Gib deinen Namen ein..."
              className="cr-select px-4 py-3 text-base md:text-lg w-full"
              disabled={isCreatingRoom}
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-400 mb-6">
              ❌ {error}
            </div>
          )}
          
          <div className="text-center space-y-4">
            <button
              onClick={createRoom}
              disabled={!hostName.trim() || isCreatingRoom}
              className="cr-button-primary px-8 py-4 text-xl font-black disabled:opacity-50 disabled:cursor-not-allowed w-full"
            >
              {isCreatingRoom ? "🔄 Erstelle Raum..." : "🚀 P2P Raum erstellen"}
            </button>
            
            <button 
              onClick={onBack}
              className="cr-button-danger px-6 py-3 text-lg font-black"
            >
              ⬅️ Zurück
            </button>
          </div>

          <div className="mt-4 text-center text-sm">
            <div className="text-white/60">{connectionStatus}</div>
          </div>

          {/* Info about new P2P system */}
          <div className="mt-6 bg-blue-500/20 rounded-lg p-4">
            <h4 className="text-lg font-bold text-blue-400 mb-2">🌟 Neues P2P System!</h4>
            <div className="text-sm text-white/80 space-y-1">
              <div>• Direkte Peer-to-Peer Verbindungen</div>
              <div>• Kein zentraler Server nötig</div>
              <div>• Bessere Performance & Privatsphäre</div>
              <div>• Unterstützt bis zu 16 Spieler</div>
            </div>
          </div>
        </div>
      ) : (
        /* Room Created - Show Room Info & Share Link */
        <div className="space-y-6">
          {/* Room Info */}
          <div className="cr-card p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-center text-yellow-300">
              🌐 P2P Raum: {roomId}
            </h2>
            
            <div className="text-center mb-6">
              <div className="text-lg text-white/80 mb-2">
                Host: <strong className="text-yellow-300">{hostName}</strong>
              </div>
              <div className="text-sm text-white/60">{connectionStatus}</div>
            </div>

            {/* Share Options */}
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-bold text-yellow-300 mb-3 text-center">
                  🔗 Teilen für Beitritt:
                </h3>
                
                {/* Room Code */}
                <div className="mb-3">
                  <button
                    onClick={() => copyToClipboard(roomId)}
                    className="cr-button-primary w-full py-3 text-lg font-black"
                  >
                    📋 Room-Code: {roomId}
                  </button>
                </div>
                
                {/* Share Link */}
                <div className="mb-3">
                  <button
                    onClick={() => copyToClipboard(shareLink)}
                    className="cr-button-primary w-full py-3 text-lg font-black bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    🔗 Share-Link kopieren
                  </button>
                </div>

                {/* Show actual link */}
                <div className="bg-gray-800 p-3 rounded text-xs break-all">
                  <div className="text-yellow-300 mb-1">Share-Link:</div>
                  <div className="text-white/80">{shareLink}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Players List */}
          <div className="cr-card p-6 md:p-8">
            <h3 className="text-xl font-bold mb-4 text-yellow-300">
              👥 Spieler ({players.length}/16):
            </h3>
            
            <div className="space-y-2 mb-6">
              {players.map((player) => (
                <div 
                  key={player.id} 
                  className="flex items-center justify-between bg-white/10 rounded-lg p-3"
                >
                  <span className="text-lg font-bold flex items-center gap-2">
                    {player.isHost && "👑"} {player.name}
                  </span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    player.connectionStatus === 'connected' ? 'bg-green-500/20 text-green-400' :
                    player.connectionStatus === 'connecting' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {player.connectionStatus === 'connected' ? '✅ P2P' :
                     player.connectionStatus === 'connecting' ? '🔄 Verbinde...' :
                     '❌ Fehler'}
                  </span>
                </div>
              ))}
            </div>

            {/* Start Game Button */}
            <div className="text-center">
              {players.length < 2 && (
                <p className="text-yellow-300 mb-4">Mindestens 2 Spieler benötigt</p>
              )}
              <button
                onClick={startGame}
                disabled={players.length < 2}
                className="cr-button-primary px-8 py-4 text-xl font-black disabled:opacity-50 disabled:cursor-not-allowed w-full"
              >
                {players.length >= 2 ? "🎮 Spiel starten" : "⚠️ Warten auf Spieler..."}
              </button>
            </div>
          </div>

          {/* P2P Connection Status */}
          <div className="cr-card p-4">
            <h4 className="text-lg font-bold text-green-400 mb-2 text-center">🌟 P2P Status</h4>
            <div className="text-sm text-white/80 text-center space-y-1">
              <div>• Direkte Verbindungen zu allen Clients</div>
              <div>• WebRTC mit STUN Server für NAT-Traversal</div>
              <div>• Signaling über Redis (nur für Verbindungsaufbau)</div>
              <div>• Spieldaten laufen direkt zwischen Geräten</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}