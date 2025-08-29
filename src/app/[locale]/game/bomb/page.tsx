"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { categoriesDE, categoriesEN } from "./shared/categories";
import type { AppLocale } from "@/i18n/routing";
import { useParams } from "next/navigation";

// Import Multiplayer Components
import GameModeSelection from "./components/GameModeSelection";
import MultiplayerModeSelection from "./components/MultiplayerModeSelection";
import HostSetup from "./components/HostSetup";
import ClientSetup from "./components/ClientSetup";
import WaitingRoom from "./components/WaitingRoom";
import type { HostGameState, ClientGameState } from "./shared/multiplayer-types";

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

export default function BombGamePage() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as AppLocale;
  
  // Debug: Log when component loads
  console.log("🎮 Bomb Game Page loaded with Multiplayer support!");
  
  const categories = locale === "de" ? categoriesDE : categoriesEN;
  
  // Game Mode State
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [multiplayerMode, setMultiplayerMode] = useState<MultiplayerMode | null>(null);
  const [gamePhase, setGamePhase] = useState<GamePhase>("modeSelection");
  
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
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const explosionRef = useRef<HTMLAudioElement>(null);
  
  // Hidden bomb timer effect - players don't see countdown
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isGameActive && bombTimer > 0) {
      timeout = setTimeout(() => {
        // BOOM! Game stops, select who lost
        setIsGameActive(false);
        setGamePhase("selectLoser");
        explosionRef.current?.play();
      }, bombTimer * 1000);
    }
    return () => clearTimeout(timeout);
  }, [isGameActive, bombTimer]);

  // Initialize player scores when players change
  useEffect(() => {
    if (players.length > 0 && playerScores.length === 0) {
      setPlayerScores(players.map(player => ({
        playerId: player.id,
        playerName: player.name,
        losses: 0
      })));
    }
  }, [players, playerScores.length]);

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
    // Random bomb timer between 20-60 seconds (hidden from players)
    const randomTime = Math.floor(Math.random() * 41) + 20; // 20-60 seconds
    setBombTimer(randomTime);
    setIsGameActive(true);
    setCurrentPlayerIndex(0);
    setGamePhase("playing");
    generateWord();
    audioRef.current?.play();
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
      audioRef.current?.play();
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
    setIsGameActive(false);
    setHostGameState(null);
    setClientGameState(null);
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
    
    // Update game phase
    if (gameState.gamePhase !== "waiting") {
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
    
    // Update game phase
    setGamePhase(gameState.gamePhase);
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

      {/* Game Mode Selection */}
      {gamePhase === "modeSelection" && (
        <>
          {/* Debug: Diese Nachricht sollte sichtbar sein wenn gamePhase = "modeSelection" */}
          <div className="text-center mb-4 text-green-400 font-bold">
            🎮 Multiplayer Version geladen! GamePhase: {gamePhase}
          </div>
          <GameModeSelection onModeSelect={handleModeSelect} />
        </>
      )}

      {/* Multiplayer Mode Selection */}
      {gamePhase === "multiplayerModeSelection" && (
        <MultiplayerModeSelection 
          onModeSelect={handleMultiplayerModeSelect}
          onBack={handleBackToModeSelection}
        />
      )}

      {/* Host Setup */}
      {gamePhase === "hostSetup" && (
        <HostSetup 
          onGameStateChange={handleHostGameStateChange}
          onBack={handleBackToMultiplayerModeSelection}
        />
      )}

      {/* Client Setup */}
      {gamePhase === "clientSetup" && (
        <ClientSetup 
          onGameStateChange={handleClientGameStateChange}
          onBack={handleBackToMultiplayerModeSelection}
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
        />
      )}

      {/* Player Setup Phase */}
      {gamePhase === "setup" && (
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
        </div>
      )}

      {/* Rounds Selection Phase */}
      {gamePhase === "rounds" && (
        <div className="max-w-2xl mx-auto">
          <div className="cr-card p-6 md:p-8 mb-6">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-center text-yellow-300">
              🎯 {t("roundsCount")}
            </h2>
            
            <div className="mb-6">
              <select 
                value={totalRounds}
                onChange={(e) => setTotalRounds(Number(e.target.value))}
                className="cr-select px-4 py-3 text-base md:text-lg font-bold cursor-pointer w-full"
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
        </div>
      )}

      {/* Category Selection Phase */}
      {gamePhase === "category" && (
        <div className="max-w-2xl mx-auto">
          <div className="cr-card p-6 md:p-8 mb-6">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-center text-yellow-300">
              ⚔️ {t("chooseCategory")}
            </h2>
            
            <div className="mb-6">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="cr-select px-4 py-3 text-base md:text-lg font-bold cursor-pointer w-full"
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
        </div>
      )}

      {/* Playing Phase */}
      {gamePhase === "playing" && (
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
      {gamePhase === "selectLoser" && (
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
      {gamePhase === "scoreboard" && (
        <div className="max-w-2xl mx-auto">
          <div className="cr-card p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-center text-yellow-300">
              📊 {t("scoreboard")}
            </h2>
            
            <div className="mb-4 text-center text-white">
              {t("currentRound")} {currentRound} / {totalRounds}
            </div>
            
            <div className="space-y-3 mb-6">
              {playerScores
                .sort((a, b) => a.losses - b.losses) // Sort by losses (ascending)
                .map((score, index) => (
                  <div 
                    key={score.playerId} 
                    className={`flex justify-between items-center p-4 rounded-lg ${
                      index === 0 && score.losses === Math.min(...playerScores.map(s => s.losses))
                        ? 'bg-yellow-500/20 border-2 border-yellow-500' 
                        : 'bg-white/10'
                    }`}
                  >
                    <span className="text-lg font-bold">
                      {index === 0 && score.losses === Math.min(...playerScores.map(s => s.losses)) && '👑'} 
                      {score.playerName}
                    </span>
                    <span className="text-lg font-bold">
                      {score.losses} {t("losses")}
                    </span>
                  </div>
                ))}
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
      {gamePhase === "gameOver" && (
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
                <div className="text-2xl md:text-3xl font-black text-white">
                  🥇 {playerScores.sort((a, b) => a.losses - b.losses)[0]?.playerName}
                </div>
                <div className="text-lg text-white/80">
                  Mit nur {playerScores.sort((a, b) => a.losses - b.losses)[0]?.losses} {t("losses")}
                </div>
              </div>
            )}
            
            {/* Final Scoreboard */}
            <div className="space-y-2 mb-6">
              {playerScores
                .sort((a, b) => a.losses - b.losses)
                .map((score, index) => (
                  <div 
                    key={score.playerId}
                    className="flex justify-between items-center p-3 bg-white/10 rounded-lg"
                  >
                    <span className="font-bold">
                      {index + 1}. {score.playerName}
                    </span>
                    <span className="font-bold">
                      {score.losses} {t("losses")}
                    </span>
                  </div>
                ))}
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
    </div>
  );
}


