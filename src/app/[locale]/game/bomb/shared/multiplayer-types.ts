// Multiplayer Type Definitions for Peer-to-Peer System

export type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

export type MultiplayerPlayer = {
  id: string;
  name: string;
  isHost: boolean;
  connectionId?: string;
  connectionStatus: ConnectionStatus;
};

export type GameMode = "single" | "multi";
export type MultiplayerMode = "host" | "client";

export type RoomInfo = {
  roomId: string;
  hostName: string;
  playerCount: number;
  maxPlayers: number;
  gameStatus: "waiting" | "playing" | "finished";
};

// Host-specific state (contains sensitive data like bomb timer)
export type HostGameState = {
  roomId: string;
  players: MultiplayerPlayer[];
  currentPlayerIndex: number;
  selectedCategory: string;
  currentWord: string;
  isGameActive: boolean;
  bombTimer: number; // Hidden from clients
  totalRounds: number;
  currentRound: number;
  playerScores: Array<{
    playerId: string;
    playerName: string;
    losses: number;
  }>;
  gamePhase: "setup" | "waiting" | "rounds" | "category" | "playing" | "selectLoser" | "scoreboard" | "gameOver";
  // WebRTC connections are managed by peer-utils.ts
};

// Client-specific state (no sensitive data)
export type ClientGameState = {
  roomId: string;
  playerName: string;
  players: Array<{
    id: string;
    name: string;
    isHost: boolean;
    connectionStatus: ConnectionStatus;
  }>;
  currentPlayerIndex: number;
  selectedCategory: string;
  currentWord: string;
  isGameActive: boolean;
  showTimer: boolean; // Always shows ??? for clients
  totalRounds: number;
  currentRound: number;
  playerScores: Array<{
    playerId: string;
    playerName: string;
    losses: number;
  }>;
  gamePhase: "setup" | "waiting" | "rounds" | "category" | "playing" | "selectLoser" | "scoreboard" | "gameOver";
  isMyTurn: boolean;
  connectionStatus: ConnectionStatus;
};

// Message types for Host ↔ Client communication
export type MessageType = 
  | "join-request"
  | "join-response"
  | "game-state-update" 
  | "player-action"
  | "connection-test"
  | "disconnect"
  | "error";

export type GameMessage = {
  type: MessageType;
  senderId: string;
  timestamp: number;
  data?: JoinRequestData | JoinResponseData | GameStateUpdateData | PlayerActionData | { error: string } | Record<string, unknown>;
};

export type JoinRequestData = {
  playerName: string;
  playerId: string;
};

export type JoinResponseData = {
  success: boolean;
  playerId?: string;
  gameState?: ClientGameState;
  error?: string;
};

export type PlayerActionData = {
  action: "next-player" | "confirm-loser" | "start-game";
  data?: { loserId?: string; gameConfig?: Record<string, unknown> } | Record<string, unknown>;
};

export type GameStateUpdateData = {
  gameState: Omit<ClientGameState, 'playerName' | 'connectionStatus'>;
};