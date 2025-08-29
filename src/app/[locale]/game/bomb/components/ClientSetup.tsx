"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { webRTCManager } from "../utils/webrtc-utils";
import { parseQRData, parseSharingURL } from "../utils/qr-utils";
import type { ClientGameState, GameMessage, JoinRequestData } from "../shared/multiplayer-types";

type ClientSetupProps = {
  onGameStateChange: (gameState: ClientGameState) => void;
  onBack: () => void;
};

type JoinMethod = "qr" | "code" | "url";

export default function ClientSetup({ onGameStateChange, onBack }: ClientSetupProps) {
  const t = useTranslations();
  const [joinMethod, setJoinMethod] = useState<JoinMethod>("qr");
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Bereit zum Beitreten");
  const [error, setError] = useState("");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanningRef = useRef<boolean>(false);
  const playerIdRef = useRef<string>("");

  // Initialize player ID
  useEffect(() => {
    playerIdRef.current = Math.random().toString(36).substr(2, 9);
  }, []);

  // QR Code Scanning
  const startQRScanning = async () => {
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        scanningRef.current = true;
        scanQRCode();
      }
    } catch (error) {
      console.error('Failed to start camera:', error);
      setError("Kamera-Zugriff fehlgeschlagen. Bitte erlaube den Kamera-Zugriff.");
    }
  };

  const stopQRScanning = () => {
    scanningRef.current = false;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  // Simple QR code detection (in production, use a proper QR code library)
  const scanQRCode = () => {
    if (!scanningRef.current || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx || video.videoWidth === 0) {
      setTimeout(scanQRCode, 100);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    // For demo purposes, we'll use a timeout to simulate QR detection
    // In production, integrate with qr-scanner library
    setTimeout(scanQRCode, 500);
  };

  // Join room with QR data
  const joinWithQRData = async (qrContent: string) => {
    const qrData = parseQRData(qrContent);
    if (!qrData) {
      setError("Ungültiger QR-Code");
      return;
    }

    await joinRoom(qrData.roomId, qrData.hostOffer);
  };

  // Join room with room code
  const joinWithRoomCode = async () => {
    if (!roomCode.trim() || !playerName.trim()) {
      setError("Bitte Room-Code und Namen eingeben");
      return;
    }

    // For room code joining, we need to implement a signaling server
    // For now, show an error message
    setError("Room-Code Beitritt benötigt einen Signaling-Server (noch nicht implementiert)");
  };

  // Join room with sharing URL
  const joinWithURL = async () => {
    if (!shareUrl.trim() || !playerName.trim()) {
      setError("Bitte Sharing-URL und Namen eingeben");
      return;
    }

    try {
      const urlData = parseSharingURL(shareUrl);
      if (!urlData) {
        setError("Ungültige Sharing-URL");
        return;
      }

      await joinRoom(urlData.roomId, urlData.hostOffer);
    } catch (error) {
      setError("Fehler beim Parsen der URL");
    }
  };

  // Core join room functionality
  const joinRoom = async (roomId: string, hostOffer: string) => {
    if (!playerName.trim()) {
      setError("Bitte Namen eingeben");
      return;
    }

    setIsJoining(true);
    setError("");
    setConnectionStatus("Verbinde mit Host...");

    try {
      // Connect to host using WebRTC
      const clientAnswer = await webRTCManager.connectToHost(hostOffer);

      // Setup message handling
      webRTCManager.onMessage('host', handleHostMessage);
      webRTCManager.onConnectionStatus('host', (status) => {
        setConnectionStatus(
          status === 'connecting' ? 'Verbinde...' :
          status === 'connected' ? 'Verbunden!' :
          status === 'error' ? 'Verbindungsfehler' :
          'Getrennt'
        );
      });

      // Send join request
      const joinRequest: JoinRequestData = {
        playerName: playerName.trim(),
        playerId: playerIdRef.current
      };

      webRTCManager.sendMessage('host', {
        type: "join-request",
        senderId: playerIdRef.current,
        timestamp: Date.now(),
        data: joinRequest
      });

      setConnectionStatus("Join-Anfrage gesendet...");

    } catch (error) {
      console.error('Failed to join room:', error);
      setError("Fehler beim Beitreten des Raums");
      setIsJoining(false);
    }
  };

  // Handle messages from host
  const handleHostMessage = (message: GameMessage) => {
    switch (message.type) {
      case "join-response":
        const response = message.data;
        if (response.success) {
          setConnectionStatus("Erfolgreich beigetreten!");
          setIsJoining(false);
          
          // Initialize client game state
          const clientState: ClientGameState = {
            roomId: "temp-room", // Will be updated by host
            playerName: playerName.trim(),
            players: [],
            currentPlayerIndex: 0,
            selectedCategory: "casual",
            currentWord: "",
            isGameActive: false,
            showTimer: false,
            totalRounds: 5,
            currentRound: 1,
            playerScores: [],
            gamePhase: "waiting",
            isMyTurn: false,
            connectionStatus: "connected"
          };
          
          onGameStateChange(clientState);
        } else {
          setError(response.error || "Beitritt fehlgeschlagen");
          setIsJoining(false);
        }
        break;

      case "game-state-update":
        // Handle game state updates from host
        console.log('Game state update received:', message.data);
        break;

      default:
        console.log('Client received message:', message);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopQRScanning();
      webRTCManager.disconnect('host');
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="cr-card p-6 md:p-8 mb-6">
        <h2 className="text-2xl md:text-3xl font-black mb-6 text-center text-yellow-300">
          📱 Gruppe beitreten
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => setJoinMethod("qr")}
              className={`p-3 rounded-lg font-bold transition-colors ${
                joinMethod === "qr" 
                  ? 'bg-yellow-500/30 border-2 border-yellow-500 text-yellow-300' 
                  : 'bg-white/10 border-2 border-white/20 text-white/80'
              }`}
            >
              📷 QR-Scan
            </button>
            <button
              onClick={() => setJoinMethod("code")}
              className={`p-3 rounded-lg font-bold transition-colors ${
                joinMethod === "code" 
                  ? 'bg-yellow-500/30 border-2 border-yellow-500 text-yellow-300' 
                  : 'bg-white/10 border-2 border-white/20 text-white/80'
              }`}
            >
              🔢 Code
            </button>
            <button
              onClick={() => setJoinMethod("url")}
              className={`p-3 rounded-lg font-bold transition-colors ${
                joinMethod === "url" 
                  ? 'bg-yellow-500/30 border-2 border-yellow-500 text-yellow-300' 
                  : 'bg-white/10 border-2 border-white/20 text-white/80'
              }`}
            >
              🔗 URL
            </button>
          </div>
        </div>

        {/* QR Code Scanner */}
        {joinMethod === "qr" && (
          <div className="mb-6">
            <div className="bg-black rounded-lg p-4 text-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full max-w-sm rounded-lg mx-auto"
                style={{ display: scanningRef.current ? 'block' : 'none' }}
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {!scanningRef.current && (
                <div className="py-8">
                  <div className="text-6xl mb-4">📷</div>
                  <p className="text-white/80 mb-4">Scanne den QR-Code vom Host</p>
                  <button
                    onClick={startQRScanning}
                    className="cr-button-primary px-6 py-3 text-lg font-black"
                    disabled={!playerName.trim() || isJoining}
                  >
                    📷 Kamera starten
                  </button>
                </div>
              )}
              
              {scanningRef.current && (
                <div className="mt-4">
                  <p className="text-white/80 mb-2">Scanne den QR-Code...</p>
                  <button
                    onClick={stopQRScanning}
                    className="cr-button-danger px-4 py-2 text-sm font-black"
                  >
                    ⏹️ Stoppen
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Room Code Input */}
        {joinMethod === "code" && (
          <div className="mb-6">
            <label className="block text-lg font-bold mb-3 text-yellow-300">
              Room-Code:
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="z.B. ABC12345"
                className="cr-select px-4 py-3 text-base md:text-lg flex-1 uppercase"
                disabled={isJoining}
                maxLength={8}
              />
              <button
                onClick={joinWithRoomCode}
                disabled={!roomCode.trim() || !playerName.trim() || isJoining}
                className="cr-button-primary px-6 py-3 text-lg font-black disabled:opacity-50"
              >
                🚪 Beitreten
              </button>
            </div>
          </div>
        )}

        {/* Sharing URL Input */}
        {joinMethod === "url" && (
          <div className="mb-6">
            <label className="block text-lg font-bold mb-3 text-yellow-300">
              Sharing-URL:
            </label>
            <div className="space-y-3">
              <textarea
                value={shareUrl}
                onChange={(e) => setShareUrl(e.target.value)}
                placeholder="Füge hier die vom Host geteilte URL ein..."
                className="cr-select px-4 py-3 text-base md:text-lg w-full h-24 resize-none"
                disabled={isJoining}
              />
              <button
                onClick={joinWithURL}
                disabled={!shareUrl.trim() || !playerName.trim() || isJoining}
                className="cr-button-primary px-6 py-3 text-lg font-black disabled:opacity-50 w-full"
              >
                🔗 URL beitreten
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
              🔄 Verbinde...
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
        
        <div className="mt-6 text-center text-sm text-white/60">
          💡 <strong>Tipp:</strong> QR-Code Scannen ist am einfachsten und sichersten
        </div>
      </div>
    </div>
  );
}