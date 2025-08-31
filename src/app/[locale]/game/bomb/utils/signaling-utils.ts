// Redis-based Signaling Utils for WebRTC Peer-to-Peer
export interface SignalingMessage {
  id: string;
  senderId: string;
  recipientId: string | null; // null = broadcast
  type: 'offer' | 'answer' | 'ice';
  data: unknown; // SDP or ICE data
  timestamp: number;
}

class SignalingManager {
  private pollingInterval: number = 1000; // Start with 1 second
  private maxPollingInterval: number = 5000; // Max 5 seconds
  private pollingTimeouts: Map<string, NodeJS.Timeout> = new Map();
  private lastMessageTimestamp: Map<string, number> = new Map();

  // Send signaling message to room
  async sendMessage(
    roomId: string,
    senderId: string,
    type: 'offer' | 'answer' | 'ice',
    data: unknown,
    recipientId?: string
  ): Promise<boolean> {
    try {
      const response = await fetch(`/api/rooms/${roomId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId,
          recipientId: recipientId || null,
          type,
          data
        })
      });

      const result = await response.json();
      
      if (!response.ok) {
        console.error('Failed to send signaling message:', result.error);
        return false;
      }

      console.log(`📡 Sent ${type} message from ${senderId} to ${recipientId || 'broadcast'}`);
      return true;

    } catch (error) {
      console.error('Network error sending signaling message:', error);
      return false;
    }
  }

  // Get new messages for peer
  async getMessages(roomId: string, peerId: string): Promise<SignalingMessage[]> {
    try {
      const lastTimestamp = this.lastMessageTimestamp.get(`${roomId}:${peerId}`) || 0;
      
      const response = await fetch(
        `/api/rooms/${roomId}/messages?peerId=${peerId}&since=${lastTimestamp}`
      );

      if (!response.ok) {
        console.error('Failed to get messages:', response.statusText);
        return [];
      }

      const result = await response.json();
      const messages: SignalingMessage[] = result.messages || [];

      // Update last message timestamp
      if (messages.length > 0) {
        const latestTimestamp = Math.max(...messages.map(m => m.timestamp));
        this.lastMessageTimestamp.set(`${roomId}:${peerId}`, latestTimestamp);
      }

      return messages;

    } catch (error) {
      console.error('Network error getting messages:', error);
      return [];
    }
  }

  // Start polling for messages
  startPolling(
    roomId: string,
    peerId: string,
    onMessage: (message: SignalingMessage) => void
  ): void {
    const key = `${roomId}:${peerId}`;
    
    // Clear existing polling
    this.stopPolling(roomId, peerId);

    const poll = async () => {
      try {
        const messages = await this.getMessages(roomId, peerId);
        
        // Process new messages
        messages.forEach(message => {
          console.log(`📬 Received ${message.type} from ${message.senderId}`);
          onMessage(message);
        });

        // Adjust polling interval
        if (messages.length > 0) {
          // Speed up when we're receiving messages
          this.pollingInterval = Math.max(500, this.pollingInterval * 0.8);
        } else {
          // Slow down when idle
          this.pollingInterval = Math.min(this.maxPollingInterval, this.pollingInterval * 1.1);
        }

      } catch (error) {
        console.error('Polling error:', error);
        // Slow down on errors
        this.pollingInterval = Math.min(this.maxPollingInterval, this.pollingInterval * 1.5);
      }

      // Schedule next poll
      const timeout = setTimeout(poll, this.pollingInterval);
      this.pollingTimeouts.set(key, timeout);
    };

    // Start polling immediately
    poll();
  }

  // Stop polling for room
  stopPolling(roomId: string, peerId: string): void {
    const key = `${roomId}:${peerId}`;
    const timeout = this.pollingTimeouts.get(key);
    
    if (timeout) {
      clearTimeout(timeout);
      this.pollingTimeouts.delete(key);
    }

    // Clean up timestamp tracking
    this.lastMessageTimestamp.delete(key);
  }

  // Stop all polling
  stopAllPolling(): void {
    this.pollingTimeouts.forEach(timeout => clearTimeout(timeout));
    this.pollingTimeouts.clear();
    this.lastMessageTimestamp.clear();
  }

  // Send offer (Host to Client or Client to Host)
  async sendOffer(roomId: string, senderId: string, recipientId: string, offer: RTCSessionDescriptionInit): Promise<boolean> {
    return this.sendMessage(roomId, senderId, 'offer', offer, recipientId);
  }

  // Send answer (Client to Host)
  async sendAnswer(roomId: string, senderId: string, recipientId: string, answer: RTCSessionDescriptionInit): Promise<boolean> {
    return this.sendMessage(roomId, senderId, 'answer', answer, recipientId);
  }

  // Send ICE candidate
  async sendIceCandidate(roomId: string, senderId: string, recipientId: string, candidate: RTCIceCandidateInit): Promise<boolean> {
    return this.sendMessage(roomId, senderId, 'ice', candidate, recipientId);
  }

  // Cleanup room (for debugging)
  async cleanupRoom(roomId: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/rooms/${roomId}/messages`, {
        method: 'DELETE'
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to cleanup room:', error);
      return false;
    }
  }

  // Generate room ID
  generateRoomId(): string {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  }

  // Generate peer ID
  generatePeerId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

// Singleton instance
export const signalingManager = new SignalingManager();

// Helper functions for share links (updated for new P2P system)
export function generateShareLink(roomId: string, hostName: string): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const params = new URLSearchParams({
    roomId: roomId.toUpperCase(),
    hostName
  });
  
  return `${baseUrl}/de/game/bomb?join=${params.toString()}`;
}

export function parseShareLink(url: string): {roomId: string; hostName: string} | null {
  try {
    const urlObj = new URL(url);
    const joinParam = urlObj.searchParams.get('join');
    
    if (!joinParam) return null;
    
    const params = new URLSearchParams(joinParam);
    const roomId = params.get('roomId');
    const hostName = params.get('hostName');
    
    if (!roomId || !hostName) return null;
    
    return { roomId, hostName };
  } catch (error) {
    console.error('Failed to parse share link:', error);
    return null;
  }
}