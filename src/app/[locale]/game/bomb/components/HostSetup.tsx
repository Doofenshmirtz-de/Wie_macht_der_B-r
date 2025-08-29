"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { webRTCManager } from "../utils/webrtc-utils";
import { generateRoomQR, generateSharingURL } from "../utils/qr-utils";
import type { MultiplayerPlayer, HostGameState, GameMessage, JoinRequestData, JoinResponseData } from "../shared/multiplayer-types";

type HostSetupProps = {
  onGameStateChange: (gameState: HostGameState) => void;
  onBack: () => void;
};

export default function HostSetup({ onGameStateChange, onBack }: HostSetupProps) {
  const t = useTranslations();
  const [hostName, setHostName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [qrCodeDataURL, setQrCodeDataURL] = useState("");
  const [sharingURL, setSharingURL] = useState("");
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [roomCreated, setRoomCreated] = useState(false);
  const [players, setPlayers] = useState<MultiplayerPlayer[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<string>("Warten auf Verbindungen...");

  const hostIdRef = useRef<string>("");

  // Generate unique room ID
  const generateRoomId = (): string => {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  // Create room and setup WebRTC
  const createRoom = async () => {
    if (!hostName.trim()) return;

    setIsCreatingRoom(true);
    try {
      const newRoomId = generateRoomId();
      const hostId = Math.random().toString(36).substr(2, 9);
      hostIdRef.current = hostId;
      
      setRoomId(newRoomId);

      // Create host player
      const hostPlayer: MultiplayerPlayer = {
        id: hostId,
        name: hostName.trim(),
        isHost: true,
        connectionStatus: "connected"
      };

      setPlayers([hostPlayer]);

      // Setup WebRTC message handling for joining clients
      webRTCManager.onMessage('*', handleClientMessage);

      // Initialize host game state
      const initialGameState: HostGameState = {
        roomId: newRoomId,
        players: [hostPlayer],
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
        gamePhase: "waiting",
        connections: new Map()
      };

      // For QR code generation, we'll create a dummy offer
      // In a real implementation, this would be generated when a client wants to join
      const dummyOffer = "host-ready"; // Placeholder
      
      // Generate QR Code and Sharing URL
      const qrCode = await generateRoomQR(newRoomId, dummyOffer, hostName.trim());
      const shareURL = generateSharingURL(newRoomId, dummyOffer, hostName.trim());
      
      setQrCodeDataURL(qrCode);
      setSharingURL(shareURL);
      setRoomCreated(true);
      setConnectionStatus(`Raum ${newRoomId} erstellt - Warten auf Spieler...`);

      onGameStateChange(initialGameState);

    } catch (error) {
      console.error('Failed to create room:', error);
      setConnectionStatus("Fehler beim Erstellen des Raums");
    } finally {
      setIsCreatingRoom(false);
    }
  };

  // Handle messages from clients
  const handleClientMessage = async (message: GameMessage) => {
    switch (message.type) {
      case "join-request":
        await handleJoinRequest(message.senderId, message.data as JoinRequestData);
        break;
      default:
        console.log('Host received message:', message);
    }
  };

  // Handle client join requests
  const handleJoinRequest = async (clientId: string, data: JoinRequestData) => {
    try {
      // Check if player name is already taken or room is full
      if (players.find(p => p.name === data.playerName)) {
        const errorResponse: JoinResponseData = {
          success: false,
          error: "Spielername bereits vergeben"
        };
        webRTCManager.sendMessage(clientId, {
          type: "join-response",
          senderId: hostIdRef.current,
          timestamp: Date.now(),
          data: errorResponse
        });
        return;
      }

      if (players.length >= 16) {
        const errorResponse: JoinResponseData = {
          success: false,
          error: "Raum ist voll (max. 16 Spieler)"
        };
        webRTCManager.sendMessage(clientId, {
          type: "join-response",
          senderId: hostIdRef.current,
          timestamp: Date.now(),
          data: errorResponse
        });
        return;
      }

      // Create WebRTC connection for this client
      const offer = await webRTCManager.createHostPeer(clientId);

      // Add new player
      const newPlayer: MultiplayerPlayer = {
        id: data.playerId,
        name: data.playerName,
        isHost: false,
        connectionId: clientId,
        connectionStatus: "connecting"
      };

      setPlayers(prev => [...prev, newPlayer]);
      setConnectionStatus(`${data.playerName} ist beigetreten!`);

      // Send success response
      const response: JoinResponseData = {
        success: true,
        playerId: data.playerId
      };

      webRTCManager.sendMessage(clientId, {
        type: "join-response",
        senderId: hostIdRef.current,
        timestamp: Date.now(),
        data: response
      });

    } catch (error) {
      console.error('Failed to handle join request:', error);
      const errorResponse: JoinResponseData = {
        success: false,
        error: "Verbindungsfehler"
      };
      webRTCManager.sendMessage(clientId, {
        type: "join-response",
        senderId: hostIdRef.current,
        timestamp: Date.now(),
        data: errorResponse
      });
    }
  };

  // Copy sharing URL to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setConnectionStatus("Link in Zwischenablage kopiert! 📋");
      setTimeout(() => setConnectionStatus(`Raum ${roomId} - ${players.length} Spieler`), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  // Start the game
  const startGame = () => {
    if (players.length < 2) return;
    
    // Transition to rounds selection
    // This will be handled by the parent component
  };

  return (
    <div className="max-w-2xl mx-auto">
      {!roomCreated ? (
        /* Host Name Input */
        <div className="cr-card p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-center text-yellow-300">
            👑 Host Setup
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
          
          <div className="text-center space-y-4">
            <button
              onClick={createRoom}
              disabled={!hostName.trim() || isCreatingRoom}
              className="cr-button-primary px-8 py-4 text-xl font-black disabled:opacity-50 disabled:cursor-not-allowed w-full"
            >
              {isCreatingRoom ? "🔄 Erstelle Raum..." : "🚀 Raum erstellen"}
            </button>
            
            <button 
              onClick={onBack}
              className="cr-button-danger px-6 py-3 text-lg font-black"
            >
              ⬅️ Zurück
            </button>
          </div>
          
          <div className="mt-6 text-center text-sm text-white/60">
            💡 Als Host verwaltest du das ganze Spiel und alle können über QR-Code beitreten
          </div>
        </div>
      ) : (
        /* Room Created - Waiting for Players */
        <div className="space-y-6">
          {/* Room Info */}
          <div className="cr-card p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-center text-yellow-300">
              🌐 Raum: {roomId}
            </h2>
            
            <div className="text-center mb-6">
              <div className="text-lg text-white/80 mb-2">Host: <strong className="text-yellow-300">{hostName}</strong></div>
              <div className="text-sm text-white/60">{connectionStatus}</div>
            </div>

            {/* QR Code */}
            {qrCodeDataURL && (
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">📱 QR-Code für Beitritt:</h3>
                <div className="bg-white p-4 rounded-2xl inline-block">
                  <img src={qrCodeDataURL} alt="QR Code zum Beitreten" className="w-48 h-48 mx-auto" />
                </div>
                <p className="text-sm text-white/60 mt-2">
                  Andere scannen diesen Code mit ihrer Kamera-App
                </p>
              </div>
            )}

            {/* Sharing Options */}
            <div className="space-y-3">
              <button
                onClick={() => copyToClipboard(roomId)}
                className="cr-button-primary w-full py-3 text-lg font-black"
              >
                📋 Room-Code kopieren: {roomId}
              </button>
              
              {sharingURL && (
                <button
                  onClick={() => copyToClipboard(sharingURL)}
                  className="cr-button-primary w-full py-3 text-lg font-black bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  🔗 Share-Link kopieren
                </button>
              )}
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
                    {player.connectionStatus === 'connected' ? '✅ Verbunden' :
                     player.connectionStatus === 'connecting' ? '🔄 Verbindung...' :
                     '❌ Fehler'}
                  </span>
                </div>
              ))}
            </div>

            {/* Start Game Button */}
            <div className="text-center">
              {players.length < 2 && (
                <p className="text-yellow-300 mb-4">Mindestens 2 Spieler benötigt zum Starten</p>
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
        </div>
      )}
    </div>
  );
}