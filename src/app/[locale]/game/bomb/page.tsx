"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { categoriesDE, categoriesEN } from "./shared/categories";
import type { AppLocale } from "@/i18n/routing";
import { useParams } from "next/navigation";


// Import Multiplayer Components (P2P System)
import GameModeSelection from "./components/GameModeSelection";
import MultiplayerModeSelection from "./components/MultiplayerModeSelection";
import PeerHostSetup from "./components/PeerHostSetup";
import PeerClientSetup from "./components/PeerClientSetup";
import WaitingRoom from "./components/WaitingRoom";
import type { HostGameState, ClientGameState } from "./shared/multiplayer-types";
import { useSettings } from "../../../providers/SettingsProvider";
import { BombGameSettings } from "./components/BombGameSettings";
import Image from "next/image";

type Player = {
  id: string;
  name: string;
};

type GamePhase = "modeSelection" | "multiplayerModeSelection" | "hostSetup" | "clientSetup" | "waiting" | "setup" | "rounds" | "category" | "playing" | "selectLoser" | "scoreboard" | "gameOver";

type PlayerScore = {
  playerId: string;
  playerName: string;
  losses: number;
};

type GameMode = "single" | "multi";
type MultiplayerMode = "host" | "client";

function BombGamePageContent() {
  const t = useTranslations();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as AppLocale;
  const { getRandomBombTimer } = useSettings();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const categories = locale === "de" ? categoriesDE : categoriesEN;
  
  // Game Mode State
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [multiplayerMode, setMultiplayerMode] = useState<MultiplayerMode | null>(null);
  const [gamePhase, setGamePhase] = useState<GamePhase>("modeSelection");
  const [mounted, setMounted] = useState(false);

  // Debug: Log when component loads (only on client)
  useEffect(() => {
    console.log("🎮 Bomb Game Page loaded with Multiplayer support!");
    console.log("🔍 Initial GamePhase:", gamePhase);
    setMounted(true);
  }, [gamePhase]);

  // Debug: Track gamePhase changes
  useEffect(() => {
    if (mounted) {
      console.log(
        "🔍 GamePhase geändert zu:",
        gamePhase,
        "GameMode:",
        gameMode,
        "MultiplayerMode:",
        multiplayerMode
      );
    }
  }, [mounted, gamePhase, gameMode, multiplayerMode]);
  
  // Single Player State
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("casual");
  const [currentWord, setCurrentWord] = useState<string>("");
  const [isGameActive, setIsGameActive] = useState(false);
  const [bombTimer, setBombTimer] = useState(0); // Hidden timer when bomb explodes
  const [newPlayerName, setNewPlayerName] = useState("");
  const [selectedLoser, setSelectedLoser] = useState<string>("");
  const [totalRounds, setTotalRounds] = useState(5);
  const [currentRound, setCurrentRound] = useState(1);
  const [playerScores, setPlayerScores] = useState<PlayerScore[]>([]);
  
  // Multiplayer State
  const [hostGameState, setHostGameState] = useState<HostGameState | null>(null);
  const [clientGameState, setClientGameState] = useState<ClientGameState | null>(null);

  // Handle URL parameters for direct joining (client-side only)
  useEffect(() => {
    // Only run on client-side to avoid hydration mismatch
    if (typeof window === 'undefined') return;

    const joinParam = searchParams.get('join');
    
    if (joinParam) {
      // Direct join from share link
      try {
        const params = new URLSearchParams(joinParam);
        const roomId = params.get('roomId');
        const hostName = params.get('hostName');
        
        if (roomId && hostName) {
          console.log(`🔗 Auto-joining room ${roomId} hosted by ${hostName}`);
          setGameMode("multi");
          setMultiplayerMode("client");
          setGamePhase("clientSetup");
        }
      } catch (error) {
        console.error('Failed to parse join URL:', error);
      }
    }
  }, [searchParams]);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const explosionRef = useRef<HTMLAudioElement>(null);
  
  // Hidden bomb timer effect - players don't see countdown
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isGameActive && bombTimer > 0) {
      console.log('💣 Bomb Timer startet! Explodiert in', bombTimer, 'Sekunden');
      timeout = setTimeout(() => {
        console.log('💥 BOOM! Bombe explodiert nach', bombTimer, 'Sekunden');
        // BOOM! Game stops, select who lost
        setIsGameActive(false);
        setGamePhase("selectLoser");
        explosionRef.current?.play();
      }, bombTimer * 1000);
    }
    return () => {
      if (timeout) {
        console.log('🔄 Bomb Timer wurde zurückgesetzt');
        clearTimeout(timeout);
      }
    };
  }, [isGameActive, bombTimer]);

  // Tick sound loop effect - kontinuierlicher Tick während das Spiel läuft
  useEffect(() => {
    const audio = audioRef.current;
    
    if (isGameActive && audio) {
      // Tick sound konfigurieren für Loop
      audio.loop = true;
      audio.volume = 0.3;
      
      // Tick sound starten
      audio.play().catch(console.warn);
      
      return () => {
        // Tick sound stoppen wenn nicht mehr aktiv
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
          audio.loop = false;
        }
      };
    } else if (audio) {
      // Sicherstellen dass Tick sound gestoppt wird
      audio.pause();
      audio.currentTime = 0;
      audio.loop = false;
    }
  }, [isGameActive]);

  // Initialize and synchronize player scores when players change
  useEffect(() => {
    if (players.length > 0) {
      setPlayerScores(prevScores => {
        // Get existing scores to preserve loss counts
        const existingScoresMap = new Map(prevScores.map(score => [score.playerId, score.losses]));
        
        // Create new scores array with all current players
        return players.map(player => ({
          playerId: player.id,
          playerName: player.name,
          losses: existingScoresMap.get(player.id) || 0 // Preserve existing losses or default to 0
        }));
      });
    } else {
      // Clear scores when no players
      setPlayerScores([]);
    }
  }, [players]);

  // Player management
  const addPlayer = () => {
    if (newPlayerName.trim() && !players.find(p => p.name === newPlayerName.trim())) {
      const newPlayer: Player = {
        id: Math.random().toString(36).substr(2, 9),
        name: newPlayerName.trim()
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName("");
    }
  };

  const removePlayer = (playerId: string) => {
    setPlayers(players.filter(p => p.id !== playerId));
  };

  const startRoundsSelection = () => {
    if (players.length >= 2) {
      setGamePhase("rounds");
    }
  };

  const startCategorySelection = () => {
    setGamePhase("category");
  };

  const startGame = () => {
    // Random bomb timer basierend auf Benutzereinstellungen (hidden from players)
    let randomTime;
    try {
      randomTime = getRandomBombTimer();
    } catch (error) {
      console.warn('Settings provider not available, using default timer:', error);
      // Fallback: 30-120 Sekunden
      randomTime = Math.floor(Math.random() * 91) + 30; 
    }
    
    console.log('🕐 Bomb Timer gesetzt auf:', randomTime, 'Sekunden');
    setBombTimer(randomTime);
    setIsGameActive(true);
    setCurrentPlayerIndex(0);
    setGamePhase("playing");
    generateWord();
    // Tick sound wird jetzt automatisch durch useEffect gestartet
  };

  const generateWord = () => {
    const categoryWords = categories[selectedCategory];
    const randomWord = categoryWords[Math.floor(Math.random() * categoryWords.length)];
    setCurrentWord(randomWord);
  };

  const nextPlayer = () => {
    if (isGameActive) {
      // Move to next player - same word for everyone!
      setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
      // Tick sound läuft bereits kontinuierlich - kein manueller play() nötig
    }
  };

  const confirmLoser = () => {
    if (selectedLoser) {
      // Add loss to selected player
      setPlayerScores(prev => prev.map(score => 
        score.playerId === selectedLoser 
          ? { ...score, losses: score.losses + 1 }
          : score
      ));
      
      // Check if game is over
      if (currentRound >= totalRounds) {
        setGamePhase("gameOver");
      } else {
        setCurrentRound(prev => prev + 1);
        setGamePhase("category");
      }
      
      setSelectedLoser("");
    }
  };

  const newGame = () => {
    // Reset to mode selection for new game
    setGameMode(null);
    setMultiplayerMode(null);
    setGamePhase("modeSelection");
    setCurrentRound(1);
    setPlayerScores([]);
    setPlayers([]); // Clear players to ensure clean restart
    setIsGameActive(false);
    setHostGameState(null);
    setClientGameState(null);
    setSelectedLoser("");
    setNewPlayerName("");
  };

  const showScoreboard = () => {
    setGamePhase("scoreboard");
  };

  const backToCategory = () => {
    setGamePhase("category");
  };

  // Game Mode Handlers
  const handleModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    if (mode === "single") {
      setGamePhase("setup");
    } else {
      setGamePhase("multiplayerModeSelection");
    }
  };

  const handleMultiplayerModeSelect = (mode: MultiplayerMode) => {
    setMultiplayerMode(mode);
    if (mode === "host") {
      setGamePhase("hostSetup");
    } else {
      setGamePhase("clientSetup");
    }
  };

  const handleHostGameStateChange = (gameState: HostGameState) => {
    setHostGameState(gameState);
    // Sync some values to single player state for compatibility
    setSelectedCategory(gameState.selectedCategory);
    setCurrentWord(gameState.currentWord);
    setIsGameActive(gameState.isGameActive);
    setBombTimer(gameState.bombTimer);
    setTotalRounds(gameState.totalRounds);
    setCurrentRound(gameState.currentRound);
    setCurrentPlayerIndex(gameState.currentPlayerIndex);
    setPlayerScores(gameState.playerScores);
    
    // Convert multiplayer players to single player format for compatibility
    const simplePlayers: Player[] = gameState.players.map(p => ({
      id: p.id,
      name: p.name
    }));
    setPlayers(simplePlayers);
    
    // Update game phase (but not if in multiplayer setup phases)
    if (gameState.gamePhase !== "waiting" && 
        !["modeSelection", "multiplayerModeSelection", "hostSetup", "clientSetup"].includes(gamePhase)) {
      setGamePhase(gameState.gamePhase);
    }
  };

  const handleClientGameStateChange = (gameState: ClientGameState) => {
    setClientGameState(gameState);
    // Sync values for UI display
    setSelectedCategory(gameState.selectedCategory);
    setCurrentWord(gameState.currentWord);
    setIsGameActive(gameState.isGameActive);
    setTotalRounds(gameState.totalRounds);
    setCurrentRound(gameState.currentRound);
    setCurrentPlayerIndex(gameState.currentPlayerIndex);
    setPlayerScores(gameState.playerScores);
    
    // Convert multiplayer players to single player format for compatibility
    const simplePlayers: Player[] = gameState.players.map(p => ({
      id: p.id,
      name: p.name
    }));
    setPlayers(simplePlayers);
    
    // Update game phase (but preserve multiplayer flow)
    if (!["modeSelection", "multiplayerModeSelection", "hostSetup", "clientSetup"].includes(gamePhase)) {
      setGamePhase(gameState.gamePhase);
    }
  };

  // Back handlers for nested navigation
  const handleBackToModeSelection = () => {
    setGameMode(null);
    setMultiplayerMode(null);
    setGamePhase("modeSelection");
  };

  const handleBackToMultiplayerModeSelection = () => {
    setMultiplayerMode(null);
    setGamePhase("multiplayerModeSelection");
  };

  // Start multiplayer game from waiting room
  const handleStartMultiplayerGame = () => {
    if (multiplayerMode === "host" && hostGameState && hostGameState.players.length >= 2) {
      setGamePhase("rounds");
    }
  };

  // Leave multiplayer room
  const handleLeaveRoom = () => {
    // Disconnect all WebRTC connections
    // webRTCManager.disconnectAll(); // Uncomment when WebRTC is properly implemented
    
    // Reset multiplayer state
    setHostGameState(null);
    setClientGameState(null);
    setMultiplayerMode(null);
    setGameMode(null);
    setGamePhase("modeSelection");
  };



  return (
    <div className="min-h-screen p-4 md:p-6 text-white">
      <audio ref={audioRef} preload="auto">
        <source src="/tick.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={explosionRef} preload="auto">
        <source src="/explosion.mp3" type="audio/mpeg" />
      </audio>
      
      {/* Header with Title */}
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-3xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 drop-shadow-lg">
          💣 {t("bombParty")} 💣
        </h1>
        
        {/* Mode Indicator */}
        {gameMode && (
          <div className="text-sm text-white/60 mb-2">
            {gameMode === "single" ? "📱 Einzelnes Handy" : 
             multiplayerMode === "host" ? "👑 Host Modus" : 
             multiplayerMode === "client" ? "📱 Client Modus" : 
             "🌐 Multiplayer"}
          </div>
        )}
      </div>

      {/* Only render content when mounted to prevent hydration issues */}
      {mounted && (
        <>
          {/* Game Mode Selection */}
          {gamePhase === "modeSelection" && (
            <div>
              <GameModeSelection onModeSelect={handleModeSelect} />
              
              {/* Settings Button - unter den Kacheln */}
              <div className="text-center mt-8">
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="group relative px-6 py-3 rounded-xl overflow-hidden border-2 border-white/30 hover:border-yellow-300/70 bg-gradient-to-b from-orange-500/80 to-red-600/80 transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3 shadow-lg mx-auto"
                  aria-label="Bomb Party Einstellungen öffnen"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                  <Image src="/icons/gear.svg" alt="Einstellungen" width={20} height={20} className="drop-shadow-lg" />
                  <span className="text-white font-bold text-lg drop-shadow-lg">Einstellungen</span>
                </button>
              </div>
            </div>
          )}

          {/* Multiplayer Mode Selection */}
          {gamePhase === "multiplayerModeSelection" && (
            <MultiplayerModeSelection 
              onModeSelect={handleMultiplayerModeSelect}
              onBack={handleBackToModeSelection}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          )}

          {/* P2P Host Setup */}
          {gamePhase === "hostSetup" && (
            <PeerHostSetup 
              onGameStateChange={handleHostGameStateChange}
              onBack={handleBackToMultiplayerModeSelection}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          )}

          {/* P2P Client Setup */}
          {gamePhase === "clientSetup" && (
            <PeerClientSetup 
              onGameStateChange={handleClientGameStateChange}
              onBack={handleBackToMultiplayerModeSelection}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          )}

          {/* Multiplayer Waiting Room */}
          {gamePhase === "waiting" && gameMode === "multi" && (
            <WaitingRoom
              gameMode={multiplayerMode!}
              hostGameState={hostGameState || undefined}
              clientGameState={clientGameState || undefined}
              onStartGame={multiplayerMode === "host" ? handleStartMultiplayerGame : undefined}
              onLeaveRoom={handleLeaveRoom}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          )}
        </>
      )}



        {/* Nutzerfreundliche Status-Anzeige */}
        {gameMode && (
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-4 bg-white/10 rounded-xl px-4 py-2 text-sm">
              {gameMode === "single" && (
                <>
                  <span className="text-blue-300">📱 Einzelspiel</span>
                  {players.length > 0 && (
                    <span className="text-yellow-300">👥 {players.length} Spieler</span>
                  )}
                </>
              )}
              {gameMode === "multi" && multiplayerMode === "host" && (
                <>
                  <span className="text-purple-300">👑 Host</span>
                  {hostGameState && (
                    <span className="text-yellow-300">👥 {hostGameState.players.length} Spieler</span>
                  )}
                </>
              )}
              {gameMode === "multi" && multiplayerMode === "client" && (
                <>
                  <span className="text-green-300">📱 Teilnehmer</span>
                  {clientGameState && (
                    <span className="text-yellow-300">👥 {clientGameState.players.length} Spieler</span>
                  )}
                </>
              )}
              {currentRound > 1 && (
                <span className="text-orange-300">🎯 Runde {currentRound}/{totalRounds}</span>
              )}
            </div>
          </div>
        )}



      {/* Player Setup Phase (ONLY for single player mode) */}
      {gamePhase === "setup" && gameMode === "single" && (
        <div className="max-w-2xl mx-auto">
          <div className="cr-card p-6 md:p-8 mb-6">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-center text-yellow-300">
              👥 {t("playerSetup")}
            </h2>
            
            {/* Add Player */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                  placeholder={t("playerName")}
                  className="cr-select flex-1 px-4 py-3 text-base md:text-lg"
                />
                <button
                  onClick={addPlayer}
                  disabled={!newPlayerName.trim()}
                  className="cr-button-primary px-6 py-3 text-lg font-black disabled:opacity-50"
                >
                  ➕ {t("addPlayer")}
                </button>
              </div>
            </div>
            
            {/* Players List */}
            {players.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3 text-yellow-300">Spieler ({players.length}):</h3>
                <div className="space-y-2">
                  {players.map((player, index) => (
                    <div key={player.id} className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                      <span className="text-lg font-bold">
                        {index + 1}. {player.name}
                      </span>
                      <button
                        onClick={() => removePlayer(player.id)}
                        className="text-red-400 hover:text-red-300 px-2 py-1 rounded"
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Start Button */}
            <div className="text-center">
              {players.length < 2 && (
                <p className="text-yellow-300 mb-4">{t("minTwoPlayers")}</p>
              )}
              <button
                onClick={startRoundsSelection}
                disabled={players.length < 2}
                className="cr-button-primary px-8 py-4 text-xl font-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {players.length >= 2 ? `🚀 ${t("playersReady")}` : `⚠️ ${t("minTwoPlayers")}`}
              </button>
            </div>
          </div>
          
          {/* Settings Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="group relative px-6 py-3 rounded-xl overflow-hidden border-2 border-white/30 hover:border-yellow-300/70 bg-gradient-to-b from-orange-500/80 to-red-600/80 transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3 shadow-lg mx-auto"
              aria-label="Bomb Party Einstellungen öffnen"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
              <Image src="/icons/gear.svg" alt="Einstellungen" width={20} height={20} className="drop-shadow-lg" />
              <span className="text-white font-bold text-lg drop-shadow-lg">Einstellungen</span>
            </button>
          </div>
        </div>
      )}

      {/* Rounds Selection Phase */}
      {mounted && gamePhase === "rounds" && (
        <div className="max-w-2xl mx-auto">
          <div className="cr-card p-6 md:p-8 mb-6">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-center text-yellow-300">
              🎯 {t("roundsCount")}
            </h2>
            
            <div className="mb-6">
              <select 
                value={totalRounds}
                onChange={(e) => setTotalRounds(Number(e.target.value))}
                className="cr-select-enhanced px-4 py-3 text-base md:text-lg font-bold cursor-pointer w-full"
              >
                <option value={3}>3 Runden</option>
                <option value={5}>5 Runden</option>
                <option value={7}>7 Runden</option>
                <option value={10}>10 Runden</option>
              </select>
            </div>
            
            <div className="text-center space-y-4">
              <button
                onClick={startCategorySelection}
                className="cr-button-primary px-8 py-4 text-xl font-black w-full"
              >
                ➡️ Weiter zur Kategorie
              </button>
              <button
                onClick={() => setGamePhase("setup")}
                className="cr-button-danger px-6 py-3 text-lg font-black"
              >
                ⬅️ Zurück zu Spielern
              </button>
            </div>
          </div>
          
          {/* Settings Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="group relative px-6 py-3 rounded-xl overflow-hidden border-2 border-white/30 hover:border-yellow-300/70 bg-gradient-to-b from-orange-500/80 to-red-600/80 transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3 shadow-lg mx-auto"
              aria-label="Bomb Party Einstellungen öffnen"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
              <Image src="/icons/gear.svg" alt="Einstellungen" width={20} height={20} className="drop-shadow-lg" />
              <span className="text-white font-bold text-lg drop-shadow-lg">Einstellungen</span>
            </button>
          </div>
        </div>
      )}

      {/* Category Selection Phase */}
      {mounted && gamePhase === "category" && (
        <div className="max-w-2xl mx-auto">
          <div className="cr-card p-6 md:p-8 mb-6">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-center text-yellow-300">
              ⚔️ {t("chooseCategory")}
            </h2>
            
            <div className="mb-6">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="cr-select-enhanced px-4 py-3 text-base md:text-lg font-bold cursor-pointer w-full"
              >
                <option value="casual">🟢 {t("casual")}</option>
                <option value="hard">🔴 {t("hard")}</option>
                <option value="spicy">🌶️ {t("spicy")}</option>
              </select>
            </div>
            
            <div className="mb-4 text-center text-yellow-300">
              {t("currentRound")} {currentRound} / {totalRounds}
            </div>
            
            <div className="text-center space-y-4">
              <button
                onClick={startGame}
                className="cr-button-primary px-8 py-4 text-xl font-black w-full"
              >
                🎮 {t("startGame")}
              </button>
              <button
                onClick={showScoreboard}
                className="cr-button-danger px-6 py-3 text-lg font-black"
              >
                📊 {t("scoreboard")}
              </button>
            </div>
          </div>
          
          {/* Settings Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="group relative px-6 py-3 rounded-xl overflow-hidden border-2 border-white/30 hover:border-yellow-300/70 bg-gradient-to-b from-orange-500/80 to-red-600/80 transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3 shadow-lg mx-auto"
              aria-label="Bomb Party Einstellungen öffnen"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
              <Image src="/icons/gear.svg" alt="Einstellungen" width={20} height={20} className="drop-shadow-lg" />
              <span className="text-white font-bold text-lg drop-shadow-lg">Einstellungen</span>
            </button>
          </div>
        </div>
      )}

      {/* Playing Phase */}
      {mounted && gamePhase === "playing" && (
        <div className="max-w-4xl mx-auto">
          <div className="cr-card p-6 md:p-8 mb-6">
            
            {/* Current Player - NO TIMER! */}
            <div className="text-center mb-6">
              <div className="mb-4">
                <span className="text-lg md:text-xl text-yellow-300 font-bold">
                  {gameMode === "single" ? t("passPhone") : "Aktueller Spieler"}:
                </span>
                <div className="text-2xl md:text-4xl font-black text-white mt-2">
                  🎯 {players[currentPlayerIndex]?.name}
                </div>
                
                {/* Multiplayer Turn Indicator */}
                {gameMode === "multi" && clientGameState && (
                  <div className="mt-2">
                    {clientGameState.isMyTurn ? (
                      <div className="text-green-400 font-bold">✨ Du bist dran!</div>
                    ) : (
                      <div className="text-white/60">Warte auf {players[currentPlayerIndex]?.name}...</div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Bomb animation without timer */}
              <div className="cr-timer inline-block px-6 py-4 animate-pulse">
                <div className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">
                  💣 ??? 💣
                </div>
              </div>
            </div>
            
            {/* Word Display - SAME WORD FOR ALL */}
            {currentWord && (
              <div className="mb-8">
                <div className="cr-word-display p-6 md:p-8 text-center relative z-10">
                  <div className="text-2xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-xl break-words">
                    {currentWord}
                  </div>
                </div>
              </div>
            )}
            
            {/* Next Player Button */}
            <div className="text-center">
              {/* Single Player or Host can always click */}
              {(gameMode === "single" || (gameMode === "multi" && multiplayerMode === "host")) && (
                <button
                  onClick={nextPlayer}
                  className="cr-button-primary px-8 md:px-12 py-4 md:py-6 text-xl md:text-2xl font-black text-white drop-shadow-lg"
                >
                  ✅ {t("nextWord")} - Nächster Spieler
                </button>
              )}
              
              {/* Client can only click when it's their turn */}
              {gameMode === "multi" && multiplayerMode === "client" && clientGameState && (
                <button
                  onClick={nextPlayer}
                  disabled={!clientGameState.isMyTurn}
                  className={`px-8 md:px-12 py-4 md:py-6 text-xl md:text-2xl font-black drop-shadow-lg transition-all ${
                    clientGameState.isMyTurn 
                      ? "cr-button-primary text-white" 
                      : "bg-gray-500/50 text-gray-300 cursor-not-allowed opacity-50"
                  }`}
                >
                  {clientGameState.isMyTurn 
                    ? "✅ Weiter - Nächster Spieler" 
                    : "⏳ Warten auf deinen Zug..."
                  }
                </button>
              )}
            </div>
            
            {/* Connection Status for Multiplayer */}
            {gameMode === "multi" && (
              <div className="mt-4 text-center text-sm">
                {multiplayerMode === "host" && hostGameState && (
                  <div className="text-green-400">
                    👑 Host - {hostGameState.players.length} Spieler verbunden
                  </div>
                )}
                {multiplayerMode === "client" && clientGameState && (
                  <div className={`${
                    clientGameState.connectionStatus === "connected" ? "text-green-400" : "text-red-400"
                  }`}>
                    📱 {clientGameState.connectionStatus === "connected" ? "Verbunden" : "Verbindung unterbrochen"}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Players List During Game */}
          <div className="cr-card p-4 md:p-6">
            <h3 className="text-lg font-bold mb-3 text-center text-yellow-300">Spieler-Reihenfolge:</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {players.map((player, index) => (
                <div 
                  key={player.id} 
                  className={`px-3 py-2 rounded-lg font-bold text-sm md:text-base ${
                    index === currentPlayerIndex 
                      ? 'bg-yellow-500 text-black animate-pulse' 
                      : 'bg-white/20 text-white'
                  }`}
                >
                  {/* Show host crown for multiplayer */}
                  {gameMode === "multi" && hostGameState?.players.find(p => p.id === player.id)?.isHost && "👑 "}
                  {player.name} {index === currentPlayerIndex && '👈'}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Select Loser Phase */}
      {mounted && gamePhase === "selectLoser" && (
        <div className="max-w-2xl mx-auto">
          <div className="cr-card p-6 md:p-8 text-center">
            <div className="text-6xl md:text-8xl mb-6">💥</div>
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-red-400 drop-shadow-lg">
              {t("gameOver")}
            </h2>
            <h3 className="text-xl md:text-2xl font-black mb-6 text-yellow-300">
              {t("whoLostTitle")}
            </h3>
            
            {/* Only Host can select loser in multiplayer */}
            {(gameMode === "single" || (gameMode === "multi" && multiplayerMode === "host")) && (
              <>
                <div className="mb-6">
                  <select 
                    value={selectedLoser}
                    onChange={(e) => setSelectedLoser(e.target.value)}
                    className="cr-select px-4 py-3 text-base md:text-lg font-bold cursor-pointer w-full"
                  >
                    <option value="">{t("selectLoser")}</option>
                    {players.map(player => (
                      <option key={player.id} value={player.id}>
                        {player.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={confirmLoser}
                  disabled={!selectedLoser}
                  className="cr-button-primary px-8 py-4 text-xl font-black disabled:opacity-50 disabled:cursor-not-allowed w-full"
                >
                  ✅ {t("confirmLoser")}
                </button>
              </>
            )}
            
            {/* Client waits for host decision */}
            {gameMode === "multi" && multiplayerMode === "client" && (
              <div className="space-y-4">
                <div className="text-yellow-300 text-lg">
                  ⏳ Der Host entscheidet, wer verloren hat...
                </div>
                <div className="text-white/60">
                  Warte auf die Entscheidung des Hosts
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Scoreboard Phase */}
      {mounted && gamePhase === "scoreboard" && (
        <div className="max-w-2xl mx-auto">
          <div className="cr-card p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-center text-yellow-300">
              📊 {t("scoreboard")}
            </h2>
            
            <div className="mb-4 text-center text-white">
              {t("currentRound")} {currentRound} / {totalRounds}
            </div>
            
            <div className="space-y-3 mb-6">
              {playerScores.length > 0 ? (
                playerScores
                  .sort((a, b) => a.losses - b.losses) // Sort by losses (ascending)
                  .map((score, index, sortedArray) => {
                    const minLosses = Math.min(...sortedArray.map(s => s.losses));
                    const isWinner = index === 0 && score.losses === minLosses;
                    
                    return (
                      <div 
                        key={score.playerId} 
                        className={`flex justify-between items-center p-4 rounded-lg transition-all duration-300 ${
                          isWinner
                            ? 'bg-yellow-500/20 border-2 border-yellow-500 shadow-lg' 
                            : 'bg-white/10 border border-white/20'
                        }`}
                      >
                        <span className="text-lg font-bold flex items-center gap-2">
                          {isWinner && <span className="text-2xl">👑</span>}
                          <span className="text-white/60">#{index + 1}</span>
                          {score.playerName}
                        </span>
                        <span className="text-lg font-bold">
                          {score.losses} {t("losses")}
                        </span>
                      </div>
                    );
                  })
              ) : (
                <div className="text-center text-white/60 py-8">
                  Keine Spieler-Daten verfügbar
                </div>
              )}
            </div>
            
            <div className="text-center">
              <button
                onClick={backToCategory}
                className="cr-button-primary px-8 py-4 text-xl font-black w-full"
              >
                ⬅️ Zurück zum Spiel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Final Game Over Phase */}
      {mounted && gamePhase === "gameOver" && (
        <div className="max-w-2xl mx-auto">
          <div className="cr-card p-6 md:p-8 text-center">
            <div className="text-6xl md:text-8xl mb-6">🏆</div>
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-yellow-300 drop-shadow-lg">
              Spiel beendet!
            </h2>
            
            {/* Winner */}
            {playerScores.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3 text-yellow-300">{t("winner")}:</h3>
                {(() => {
                  const sortedScores = playerScores.sort((a, b) => a.losses - b.losses);
                  const winner = sortedScores[0];
                  return winner ? (
                    <>
                      <div className="text-2xl md:text-3xl font-black text-white">
                        🥇 {winner.playerName}
                      </div>
                      <div className="text-lg text-white/80">
                        Mit nur {winner.losses} {t("losses")}
                      </div>
                    </>
                  ) : (
                    <div className="text-lg text-white/60">
                      Keine Gewinner-Daten verfügbar
                    </div>
                  );
                })()}
              </div>
            )}
            
            {/* Final Scoreboard */}
            <div className="space-y-3 mb-6">
              {playerScores.length > 0 ? (
                playerScores
                  .sort((a, b) => a.losses - b.losses)
                  .map((score, index) => (
                    <div 
                      key={score.playerId}
                      className={`flex justify-between items-center p-4 rounded-lg transition-all duration-300 ${
                        index === 0 
                          ? 'bg-yellow-500/20 border-2 border-yellow-500 shadow-lg'
                          : index === 1 
                          ? 'bg-gray-400/20 border border-gray-400'
                          : index === 2
                          ? 'bg-orange-600/20 border border-orange-600'
                          : 'bg-white/10 border border-white/20'
                      }`}
                    >
                      <span className="font-bold flex items-center gap-3">
                        <span className="text-2xl">
                          {index === 0 && '🥇'}
                          {index === 1 && '🥈'}
                          {index === 2 && '🥉'}
                          {index > 2 && `#${index + 1}`}
                        </span>
                        {score.playerName}
                      </span>
                      <span className="font-bold">
                        {score.losses} {t("losses")}
                      </span>
                    </div>
                  ))
              ) : (
                <div className="text-center text-white/60 py-8">
                  Keine Spieler-Daten verfügbar
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <button
                onClick={newGame}
                className="cr-button-primary px-8 py-4 text-xl font-black w-full"
              >
                🎮 Neues Spiel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Bomb Game Settings Modal */}
      <BombGameSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}

export default function BombGamePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>}>
      <BombGamePageContent />
    </Suspense>
  );
}

