// WebRTC Utilities with Simple-Peer
import SimplePeer from "simple-peer";
import type { GameMessage, ConnectionStatus } from "../shared/multiplayer-types";

export class WebRTCManager {
  private connections: Map<string, SimplePeer.Instance> = new Map();
  private messageHandlers: Map<string, (message: GameMessage) => void> = new Map();
  private connectionStatusHandlers: Map<string, (status: ConnectionStatus) => void> = new Map();

  // Host: Create a new peer connection for incoming client
  createHostPeer(clientId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const peer = new SimplePeer({
        initiator: true,
        trickle: false,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' }
          ]
        }
      });

      let signalData: string = '';

      peer.on('signal', (data) => {
        signalData = JSON.stringify(data);
        resolve(signalData);
      });

      peer.on('connect', () => {
        console.log('Host: Connected to client', clientId);
        this.notifyConnectionStatus(clientId, 'connected');
      });

      peer.on('data', (data) => {
        try {
          const message: GameMessage = JSON.parse(data.toString());
          this.handleMessage(clientId, message);
        } catch (error) {
          console.error('Host: Failed to parse message from client', clientId, error);
        }
      });

      peer.on('error', (error) => {
        console.error('Host: Peer error for client', clientId, error);
        this.notifyConnectionStatus(clientId, 'error');
        reject(error);
      });

      peer.on('close', () => {
        console.log('Host: Peer closed for client', clientId);
        this.notifyConnectionStatus(clientId, 'disconnected');
        this.connections.delete(clientId);
      });

      this.connections.set(clientId, peer);
      this.notifyConnectionStatus(clientId, 'connecting');
    });
  }

  // Host: Complete connection with client signal
  completeHostConnection(clientId: string, clientSignal: string): boolean {
    const peer = this.connections.get(clientId);
    if (!peer) {
      console.error('Host: No peer found for client', clientId);
      return false;
    }

    try {
      const signalData = JSON.parse(clientSignal);
      peer.signal(signalData);
      return true;
    } catch (error) {
      console.error('Host: Failed to signal client', clientId, error);
      return false;
    }
  }

  // Client: Connect to host using offer
  connectToHost(hostOffer: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const peer = new SimplePeer({
        initiator: false,
        trickle: false,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' }
          ]
        }
      });

      let answerData: string = '';

      peer.on('signal', (data) => {
        answerData = JSON.stringify(data);
        resolve(answerData);
      });

      peer.on('connect', () => {
        console.log('Client: Connected to host');
        this.notifyConnectionStatus('host', 'connected');
      });

      peer.on('data', (data) => {
        try {
          const message: GameMessage = JSON.parse(data.toString());
          this.handleMessage('host', message);
        } catch (error) {
          console.error('Client: Failed to parse message from host', error);
        }
      });

      peer.on('error', (error) => {
        console.error('Client: Peer error', error);
        this.notifyConnectionStatus('host', 'error');
        reject(error);
      });

      peer.on('close', () => {
        console.log('Client: Peer closed');
        this.notifyConnectionStatus('host', 'disconnected');
        this.connections.delete('host');
      });

      try {
        const offerData = JSON.parse(hostOffer);
        peer.signal(offerData);
        this.connections.set('host', peer);
        this.notifyConnectionStatus('host', 'connecting');
      } catch (error) {
        console.error('Client: Failed to parse host offer', error);
        reject(error);
      }
    });
  }

  // Send message to specific peer
  sendMessage(peerId: string, message: GameMessage): boolean {
    const peer = this.connections.get(peerId);
    if (!peer || !peer.connected) {
      console.error('WebRTC: Cannot send message, peer not connected:', peerId);
      return false;
    }

    try {
      peer.send(JSON.stringify(message));
      return true;
    } catch (error) {
      console.error('WebRTC: Failed to send message to', peerId, error);
      return false;
    }
  }

  // Broadcast message to all connected peers
  broadcastMessage(message: GameMessage): void {
    this.connections.forEach((peer, peerId) => {
      if (peer.connected) {
        this.sendMessage(peerId, message);
      }
    });
  }

  // Register message handler for specific peer
  onMessage(peerId: string, handler: (message: GameMessage) => void): void {
    this.messageHandlers.set(peerId, handler);
  }

  // Register connection status handler
  onConnectionStatus(peerId: string, handler: (status: ConnectionStatus) => void): void {
    this.connectionStatusHandlers.set(peerId, handler);
  }

  // Get connection status
  getConnectionStatus(peerId: string): ConnectionStatus {
    const peer = this.connections.get(peerId);
    if (!peer) return 'disconnected';
    if (peer.connected) return 'connected';
    if (peer.connecting) return 'connecting';
    return 'error';
  }

  // Disconnect specific peer
  disconnect(peerId: string): void {
    const peer = this.connections.get(peerId);
    if (peer) {
      peer.destroy();
      this.connections.delete(peerId);
    }
    this.messageHandlers.delete(peerId);
    this.connectionStatusHandlers.delete(peerId);
  }

  // Disconnect all peers
  disconnectAll(): void {
    this.connections.forEach((peer, peerId) => {
      peer.destroy();
    });
    this.connections.clear();
    this.messageHandlers.clear();
    this.connectionStatusHandlers.clear();
  }

  // Get all connected peer IDs
  getConnectedPeers(): string[] {
    return Array.from(this.connections.keys()).filter(peerId => {
      const peer = this.connections.get(peerId);
      return peer?.connected;
    });
  }

  // Private helper methods
  private handleMessage(peerId: string, message: GameMessage): void {
    const handler = this.messageHandlers.get(peerId);
    if (handler) {
      handler(message);
    } else {
      console.warn('WebRTC: No message handler for peer', peerId);
    }
  }

  private notifyConnectionStatus(peerId: string, status: ConnectionStatus): void {
    const handler = this.connectionStatusHandlers.get(peerId);
    if (handler) {
      handler(status);
    }
  }
}

// Singleton instance
export const webRTCManager = new WebRTCManager();