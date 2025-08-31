"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ClientPeerManager } from "../utils/peer-utils";
import { parseShareLink, signalingManager } from "../utils/signaling-utils";
import type { ClientGameState, MultiplayerPlayer } from "../shared/multiplayer-types";

type PeerClientSetupProps = {
  onGameStateChange: (gameState: ClientGameState) => void;
  onBack: () => void;
};

export default function PeerClientSetup({ onGameStateChange, onBack }: PeerClientSetupProps) {
  const t = useTranslations();
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Bereit zum Beitreten");
  const [error, setError] = useState("");
  const [joinMethod, setJoinMethod] = useState<"code" | "url">("code");

  const clientManagerRef = useRef<ClientPeerManager | null>(null);
  const clientIdRef = useRef<string>("");

  // Join with room code
  const joinWithRoomCode = async () => {
    if (!roomCode.trim() || !playerName.trim()) {
      setError("Bitte Room-Code und Namen eingeben");
      return;
    }

    await joinRoom(roomCode.trim());
  };

  // Join with share URL
  const joinWithShareURL = async () => {
    if (!shareUrl.trim() || !playerName.trim()) {
      setError("Bitte Share-URL und Namen eingeben");
      return;
    }

    try {
      const linkData = parseShareLink(shareUrl.trim());
      if (!linkData) {
        setError("Ungültige Share-URL");
        return;
      }

      await joinRoom(linkData.roomId);
    } catch (error) {
      setError("Fehler beim Parsen der URL");
    }
  };

  // Join room (common logic)
  const joinRoom = async (roomId: string) => {
    setIsJoining(true);
    setError("");
    setConnectionStatus("Trete Raum bei...");

    try {
      // Generate client ID and create client manager
      const clientId = signalingManager.generatePeerId();
      clientIdRef.current = clientId;

      const clientManager = new ClientPeerManager(clientId, playerName.trim());
      clientManagerRef.current = clientManager;

      // Setup client manager event handlers
      setupClientManagerEvents(clientManager, roomId);

      // Connect to host
      const connected = await clientManager.connectToHost(roomId.toUpperCase());
      
      if (!connected) {
        setError("Fehler beim Verbinden mit dem Host");
        setIsJoining(false);
        return;
      }

      // Send join request to host
      setTimeout(() => {
        if (clientManager.getConnectionStatus() === "connected") {
          clientManager.sendToHost("join-request", {
            playerName: playerName.trim(),
            playerId: clientId
          });
        }
      }, 1000); // Wait a bit for connection to establish

      setConnectionStatus("Warte auf Host-Bestätigung...");

    } catch (error) {
      console.error("Failed to join room:", error);
      setError("Fehler beim Beitreten");
      setIsJoining(false);
    }
  };

  // Setup client manager event handlers
  const setupClientManagerEvents = (clientManager: ClientPeerManager, roomId: string) => {
    // Handle join response from host
    clientManager.onMessage("join-response", (data: any) => {
      if (data.success) {
        setConnectionStatus("✅ Erfolgreich beigetreten!");
        setIsJoining(false);

        // Create client game state from host response
        const hostGameState = data.gameState;
        const clientState: ClientGameState = {
          roomId: hostGameState.roomId,
          playerName: playerName.trim(),
          players: hostGameState.players.map((p: any) => ({
            id: p.id,
            name: p.name,
            isHost: p.isHost,
            connectionStatus: p.connectionStatus
          })),
          currentPlayerIndex: hostGameState.currentPlayerIndex,
          selectedCategory: hostGameState.selectedCategory,
          currentWord: hostGameState.currentWord,
          isGameActive: hostGameState.isGameActive,
          showTimer: false, // Clients never see the real timer
          totalRounds: hostGameState.totalRounds,
          currentRound: hostGameState.currentRound,
          playerScores: hostGameState.playerScores,
          gamePhase: hostGameState.gamePhase,
          isMyTurn: false,
          connectionStatus: "connected"
        };

        onGameStateChange(clientState);

      } else {
        setError(data.error || "Beitritt fehlgeschlagen");
        setIsJoining(false);
      }
    });

    // Handle game state updates from host
    clientManager.onMessage("game-state-update", (gameState: any) => {
      console.log("Game state updated:", gameState);
      
      // Update client game state
      setConnectionStatus(`${gameState.players?.length || 0} Spieler im Raum`);
      // Additional game state sync logic will be implemented in phase 7
    });

    // Monitor connection status
    const checkConnection = () => {
      const status = clientManager.getConnectionStatus();
      
      switch (status) {
        case "connecting":
          setConnectionStatus("🔄 Verbinde mit Host...");
          break;
        case "connected":
          setConnectionStatus("✅ Mit Host verbunden");
          break;
        case "error":
          setError("❌ Verbindung fehlgeschlagen");
          setIsJoining(false);
          break;
        case "disconnected":
          setError("❌ Verbindung verloren");
          break;
      }
    };

    // Check connection status every second
    const interval = setInterval(checkConnection, 1000);
    
    // Cleanup interval after 30 seconds
    setTimeout(() => clearInterval(interval), 30000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (clientManagerRef.current) {
        clientManagerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="cr-card p-6 md:p-8 mb-6">
        <h2 className="text-2xl md:text-3xl font-black mb-6 text-center text-yellow-300">
          🌐 P2P - Gruppe beitreten
        </h2>
        
        {/* Player Name Input */}
        <div className="mb-6">
          <label className="block text-lg font-bold mb-3 text-yellow-300">
            Dein Name:
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Gib deinen Namen ein..."
            className="cr-select px-4 py-3 text-base md:text-lg w-full"
            disabled={isJoining}
          />
        </div>

        {/* Join Method Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-yellow-300">Beitritts-Methode:</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setJoinMethod("code")}
              className={`p-3 rounded-lg font-bold transition-colors ${
                joinMethod === "code" 
                  ? 'bg-yellow-500/30 border-2 border-yellow-500 text-yellow-300' 
                  : 'bg-white/10 border-2 border-white/20 text-white/80'
              }`}
            >
              🔢 Room-Code
            </button>
            <button
              onClick={() => setJoinMethod("url")}
              className={`p-3 rounded-lg font-bold transition-colors ${
                joinMethod === "url" 
                  ? 'bg-yellow-500/30 border-2 border-yellow-500 text-yellow-300' 
                  : 'bg-white/10 border-2 border-white/20 text-white/80'
              }`}
            >
              🔗 Share-Link
            </button>
          </div>
        </div>

        {/* Room Code Input */}
        {joinMethod === "code" && (
          <div className="mb-6">
            <label className="block text-lg font-bold mb-3 text-yellow-300">
              Room-Code (8 Zeichen):
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="z.B. ABC12345"
                className="cr-select px-4 py-3 text-base md:text-lg flex-1 uppercase font-mono text-center tracking-wider"
                disabled={isJoining}
                maxLength={8}
              />
              <button
                onClick={joinWithRoomCode}
                disabled={!roomCode.trim() || !playerName.trim() || isJoining}
                className="cr-button-primary px-6 py-3 text-lg font-black disabled:opacity-50"
              >
                🚪 P2P Join
              </button>
            </div>
          </div>
        )}

        {/* Share URL Input */}
        {joinMethod === "url" && (
          <div className="mb-6">
            <label className="block text-lg font-bold mb-3 text-yellow-300">
              Share-Link:
            </label>
            <div className="space-y-3">
              <textarea
                value={shareUrl}
                onChange={(e) => setShareUrl(e.target.value)}
                placeholder="Füge hier den Share-Link vom Host ein..."
                className="cr-select px-4 py-3 text-base md:text-lg w-full h-24 resize-none"
                disabled={isJoining}
              />
              <button
                onClick={joinWithShareURL}
                disabled={!shareUrl.trim() || !playerName.trim() || isJoining}
                className="cr-button-primary px-6 py-3 text-lg font-black disabled:opacity-50 w-full"
              >
                🔗 P2P Link beitreten
              </button>
            </div>
          </div>
        )}

        {/* Status and Error Display */}
        <div className="mb-6 text-center">
          <div className="text-lg text-white/80 mb-2">{connectionStatus}</div>
          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-400">
              ❌ {error}
            </div>
          )}
          {isJoining && (
            <div className="text-yellow-400">
              🔄 Verbinde via P2P...
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button 
            onClick={onBack}
            className="cr-button-danger px-6 py-3 text-lg font-black"
            disabled={isJoining}
          >
            ⬅️ Zurück
          </button>
        </div>

        <div className="mt-4 text-center text-sm">
          <div className="text-white/60 mt-2">
            💡 <strong>P2P-Info:</strong> Direkte Verbindung zum Host ohne Server
          </div>
        </div>
      </div>

      {/* P2P Information Card */}
      <div className="cr-card p-4">
        <h4 className="text-lg font-bold text-green-400 mb-2 text-center">🌟 P2P Client</h4>
        <div className="text-sm text-white/80 space-y-1">
          <div>• <strong>WebRTC:</strong> Direkte Verbindung zum Host</div>
          <div>• <strong>Privat:</strong> Keine Daten über externe Server</div>
          <div>• <strong>Schnell:</strong> Minimale Latenz durch direkten Pfad</div>
          <div>• <strong>Sicher:</strong> Nur Host kennt echten Bomb Timer</div>
        </div>
      </div>
    </div>
  );
}