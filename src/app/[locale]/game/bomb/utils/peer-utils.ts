// WebRTC Peer-to-Peer Management with SimplePeer
import SimplePeer from 'simple-peer';
import { signalingManager, SignalingMessage } from './signaling-utils';
import type { MultiplayerPlayer, GameMessage, MessageType, ClientGameState } from '../shared/multiplayer-types';

// WebRTC Configuration
const PEER_CONFIG = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

// Connection status types
export type PeerConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

// Peer Connection Manager for Host
export class HostPeerManager {
  private roomId: string;
  private hostId: string;
  private hostName: string;
  private connections: Map<string, SimplePeer.Instance> = new Map();
  private players: Map<string, MultiplayerPlayer> = new Map();
  private messageHandlers: Map<string, (peerId: string, data: unknown) => void> = new Map();

  constructor(hostId: string, hostName: string) {
    this.hostId = hostId;
    this.hostName = hostName;
    this.roomId = signalingManager.generateRoomId();

    // Add host as first player
    this.players.set(hostId, {
      id: hostId,
      name: hostName,
      isHost: true,
      connectionStatus: "connected"
    });

    console.log(`👑 Host ${hostName} created room ${this.roomId}`);
  }

  // Start hosting - listen for signaling messages
  async startHosting(): Promise<string> {
    // Start listening for signaling messages - use 'host' as peerId so clients can send to 'host'
    signalingManager.startPolling(this.roomId, 'host', (message) => {
      this.handleSignalingMessage(message);
    });

    return this.roomId;
  }

  // Handle incoming signaling messages
  private handleSignalingMessage(message: SignalingMessage): void {
    const { senderId, type, data } = message;

    // Skip messages from self (but not 'host' since that's our polling identity)
    if (senderId === 'host') return;

    console.log(`👑 Host received ${type} from ${senderId}`, message);

    switch (type) {
      case 'offer':
        this.handleOffer(senderId, data);
        break;
      case 'answer':
        this.handleAnswer(senderId, data);
        break;
      case 'ice':
        this.handleIceCandidate(senderId, data);
        break;
    }
  }

  // Handle offer from client (client wants to connect)
  private async handleOffer(clientId: string, offer: unknown): Promise<void> {
    try {
      console.log(`👑 Host processing offer from client ${clientId}`);
      
      // Add client as connecting player (we'll update the name later via join-request)
      if (!this.players.has(clientId)) {
        this.players.set(clientId, {
          id: clientId,
          name: `Connecting...`, // Temporary name
          isHost: false,
          connectionStatus: "connecting"
        });
        console.log(`👑 Added connecting client ${clientId}`);
        this.notifyConnectionStatusChange();
      }
      
      // Create new peer connection for this client
      const peer = new SimplePeer({
        initiator: false, // Host is not initiator
        trickle: true,
        config: PEER_CONFIG
      });

      this.connections.set(clientId, peer);

      // Setup peer event handlers
      this.setupPeerEvents(clientId, peer);

      // Set remote offer - this should trigger answer generation
      peer.signal(offer as SimplePeer.SignalData);
      
      console.log(`👑 Host setup peer connection for ${clientId}, waiting for answer...`);

    } catch (error) {
      console.error(`Failed to handle offer from ${clientId}:`, error);
    }
  }

  // Handle answer from client (response to our offer)
  private async handleAnswer(clientId: string, answer: unknown): Promise<void> {
    try {
      const peer = this.connections.get(clientId);
      if (!peer) {
        console.error(`No peer connection found for ${clientId}`);
        return;
      }

      peer.signal(answer as SimplePeer.SignalData);
    } catch (error) {
      console.error(`Failed to handle answer from ${clientId}:`, error);
    }
  }

  // Handle ICE candidate
  private async handleIceCandidate(clientId: string, candidate: unknown): Promise<void> {
    try {
      const peer = this.connections.get(clientId);
      if (!peer) return;

      peer.signal(candidate as SimplePeer.SignalData);
    } catch (error) {
      console.error(`Failed to handle ICE candidate from ${clientId}:`, error);
    }
  }

  // Setup peer connection event handlers
  private setupPeerEvents(clientId: string, peer: SimplePeer.Instance): void {
    peer.on('signal', async (data) => {
      // Send signal data via signaling server
      if (data.type === 'answer') {
        await signalingManager.sendAnswer(this.roomId, 'host', clientId, data);
      } else if ('candidate' in data && data.candidate) {
        await signalingManager.sendIceCandidate(this.roomId, 'host', clientId, data.candidate);
      }
    });

    peer.on('connect', () => {
      console.log(`✅ Host successfully connected to client ${clientId} via P2P!`);
      
      // Update player status
      const player = this.players.get(clientId);
      if (player) {
        player.connectionStatus = "connected";
        console.log(`👑 Updated client ${clientId} status to connected`);
      }

      // Notify about connection
      this.notifyConnectionStatusChange();
    });

    peer.on('data', (data) => {
      try {
        const message: GameMessage = JSON.parse(data.toString());
        this.handleGameMessage(clientId, message);
      } catch (error) {
        console.error(`Failed to parse message from ${clientId}:`, error);
      }
    });

    peer.on('error', (error) => {
      console.error(`Peer error with ${clientId}:`, error);
      
      // Update player status
      const player = this.players.get(clientId);
      if (player) {
        player.connectionStatus = "error";
      }
      
      this.notifyConnectionStatusChange();
    });

    peer.on('close', () => {
      console.log(`❌ Client ${clientId} disconnected`);
      this.connections.delete(clientId);
      
      // Remove player
      this.players.delete(clientId);
      this.notifyConnectionStatusChange();
    });
  }

  // Handle game messages from clients
  private handleGameMessage(clientId: string, message: GameMessage): void {
    console.log(`👑 Host received game message from ${clientId}:`, message.type);
    
    // Handle join-request specially to update player name
    if (message.type === 'join-request' && message.data && typeof message.data === 'object' && 'playerName' in message.data) {
      const { playerName } = message.data as { playerName: string };
      const player = this.players.get(clientId);
      if (player && playerName) {
        player.name = playerName;
        console.log(`👑 Updated client ${clientId} name to ${playerName}`);
        this.notifyConnectionStatusChange();
      }
    }
    
    const handler = this.messageHandlers.get(message.type);
    if (handler) {
      handler(clientId, message.data);
    }
  }

  // Add new client (when they join via room code)
  addClient(clientId: string, clientName: string): void {
    if (!this.players.has(clientId)) {
      this.players.set(clientId, {
        id: clientId,
        name: clientName,
        isHost: false,
        connectionStatus: "connecting"
      });

      console.log(`📱 Client ${clientName} added to room (${this.players.size} players total)`);
      this.notifyConnectionStatusChange();
    }
  }

  // Broadcast game state to all connected clients
  broadcastGameState(gameState: ClientGameState): void {
    const message: GameMessage = {
      type: 'game-state-update',
      senderId: this.hostId,
      timestamp: Date.now(),
      data: gameState
    };

    this.connections.forEach((peer, clientId) => {
      if (peer.connected) {
        try {
          peer.send(JSON.stringify(message));
        } catch (error) {
          console.error(`Failed to send game state to ${clientId}:`, error);
        }
      }
    });
  }

  // Send message to specific client
  sendToClient(clientId: string, messageType: string, data?: unknown): boolean {
    const peer = this.connections.get(clientId);
    if (!peer || !peer.connected) {
      return false;
    }

    const message: GameMessage = {
      type: messageType as MessageType,
      senderId: this.hostId,
      timestamp: Date.now(),
      data
    };

    try {
      peer.send(JSON.stringify(message));
      return true;
    } catch (error) {
      console.error(`Failed to send message to ${clientId}:`, error);
      return false;
    }
  }

  // Register message handler
  onMessage(messageType: string, handler: (peerId: string, data: unknown) => void): void {
    this.messageHandlers.set(messageType, handler);
  }

  // Connection status change callback
  private notifyConnectionStatusChange(): void {
    // This will be connected to React state updates
    console.log(`👥 Player count: ${this.players.size}, Connected: ${this.getConnectedCount()}`);
  }

  // Get connected client count
  getConnectedCount(): number {
    return Array.from(this.players.values()).filter(p => p.connectionStatus === "connected").length;
  }

  // Get all players
  getPlayers(): MultiplayerPlayer[] {
    return Array.from(this.players.values());
  }

  // Get room info
  getRoomId(): string {
    return this.roomId;
  }

  // Cleanup
  destroy(): void {
    // Close all peer connections
    this.connections.forEach(peer => peer.destroy());
    this.connections.clear();

    // Stop signaling - use 'host' as peerId
    signalingManager.stopPolling(this.roomId, 'host');

    // Clear players
    this.players.clear();

    console.log(`🧹 Host manager destroyed for room ${this.roomId}`);
  }
}

// Peer Connection Manager for Client
export class ClientPeerManager {
  private roomId: string;
  private clientId: string;
  private clientName: string;
  private hostConnection: SimplePeer.Instance | null = null;
  private connectionStatus: PeerConnectionStatus = "disconnected";
  private messageHandlers: Map<string, (data: unknown) => void> = new Map();

  constructor(clientId: string, clientName: string) {
    this.clientId = clientId;
    this.clientName = clientName;
    this.roomId = "";
  }

  // Connect to host
  async connectToHost(roomId: string): Promise<boolean> {
    try {
      this.roomId = roomId;
      this.connectionStatus = "connecting";

      // Create peer connection as initiator
      this.hostConnection = new SimplePeer({
        initiator: true, // Client initiates
        trickle: true,
        config: PEER_CONFIG
      });

      // Setup host connection events
      this.setupHostConnectionEvents();

      // Start listening for signaling messages
      signalingManager.startPolling(this.roomId, this.clientId, (message) => {
        this.handleSignalingMessage(message);
      });

      console.log(`📱 Client ${this.clientName} connecting to room ${roomId}`);
      return true;

    } catch (error) {
      console.error('Failed to connect to host:', error);
      this.connectionStatus = "error";
      return false;
    }
  }

  // Setup host connection event handlers
  private setupHostConnectionEvents(): void {
    if (!this.hostConnection) return;

    this.hostConnection.on('signal', async (data) => {
      // Send signal data to host via signaling server
      if (data.type === 'offer') {
        await signalingManager.sendOffer(this.roomId, this.clientId, 'host', data);
      } else if ('candidate' in data && data.candidate) {
        await signalingManager.sendIceCandidate(this.roomId, this.clientId, 'host', data);
      }
    });

    this.hostConnection.on('connect', () => {
      console.log('✅ Client connected to host');
      this.connectionStatus = "connected";
      this.notifyConnectionStatusChange();
    });

    this.hostConnection.on('data', (data) => {
      try {
        const message: GameMessage = JSON.parse(data.toString());
        this.handleGameMessage(message);
      } catch (error) {
        console.error('Failed to parse message from host:', error);
      }
    });

    this.hostConnection.on('error', (error) => {
      console.error('Host connection error:', error);
      this.connectionStatus = "error";
      this.notifyConnectionStatusChange();
    });

    this.hostConnection.on('close', () => {
      console.log('❌ Disconnected from host');
      this.connectionStatus = "disconnected";
      this.notifyConnectionStatusChange();
    });
  }

  // Handle signaling messages from host
  private handleSignalingMessage(message: SignalingMessage): void {
    if (!this.hostConnection) return;

    const { senderId, type, data } = message;

    // Only process messages from host or broadcast  
    if (senderId !== 'host' && message.recipientId !== this.clientId && message.recipientId !== null) {
      return;
    }

    console.log(`📱 Client received ${type} from ${senderId}`);

    switch (type) {
      case 'answer':
        this.hostConnection.signal(data as SimplePeer.SignalData);
        break;
      case 'ice':
        this.hostConnection.signal(data as SimplePeer.SignalData);
        break;
    }
  }

  // Handle game messages from host
  private handleGameMessage(message: GameMessage): void {
    const handler = this.messageHandlers.get(message.type);
    if (handler) {
      handler(message.data);
    }
  }

  // Send message to host
  sendToHost(messageType: string, data?: unknown): boolean {
    if (!this.hostConnection || !this.hostConnection.connected) {
      console.warn('Cannot send message: not connected to host');
      return false;
    }

    const message: GameMessage = {
      type: messageType as MessageType,
      senderId: this.clientId,
      timestamp: Date.now(),
      data
    };

    try {
      this.hostConnection.send(JSON.stringify(message));
      return true;
    } catch (error) {
      console.error('Failed to send message to host:', error);
      return false;
    }
  }

  // Register message handler
  onMessage(messageType: string, handler: (data: unknown) => void): void {
    this.messageHandlers.set(messageType, handler);
  }

  // Connection status change callback
  private notifyConnectionStatusChange(): void {
    // This will be connected to React state updates
    console.log(`📱 Client connection status: ${this.connectionStatus}`);
  }

  // Get connection status
  getConnectionStatus(): PeerConnectionStatus {
    return this.connectionStatus;
  }

  // Get client info
  getClientInfo() {
    return {
      id: this.clientId,
      name: this.clientName,
      roomId: this.roomId
    };
  }

  // Cleanup
  destroy(): void {
    if (this.hostConnection) {
      this.hostConnection.destroy();
      this.hostConnection = null;
    }

    signalingManager.stopPolling(this.roomId, this.clientId);
    this.connectionStatus = "disconnected";

    console.log(`🧹 Client manager destroyed for ${this.clientName}`);
  }
}