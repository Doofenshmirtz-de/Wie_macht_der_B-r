import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// In-memory storage for development (fallback when Redis is not available)
const inMemoryStore = new Map<string, string[]>();

// Redis client configuration with fallback
let redis: Redis | null = null;
try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    console.log('✅ Redis connected successfully');
  } else {
    console.warn('⚠️ Redis not configured, using in-memory storage for development');
  }
} catch (error) {
  console.warn('⚠️ Failed to initialize Redis, falling back to in-memory storage:', error);
  redis = null;
}

// Storage interface for both Redis and in-memory
const storage = {
  async lpush(key: string, value: string): Promise<void> {
    if (redis) {
      await redis.lpush(key, value);
    } else {
      if (!inMemoryStore.has(key)) {
        inMemoryStore.set(key, []);
      }
      inMemoryStore.get(key)!.unshift(value);
    }
  },
  
  async lrange(key: string, start: number, stop: number): Promise<string[]> {
    if (redis) {
      return await redis.lrange(key, start, stop) as string[];
    } else {
      const list = inMemoryStore.get(key) || [];
      if (stop === -1) return list;
      return list.slice(start, stop + 1);
    }
  },
  
  async expire(key: string, seconds: number): Promise<void> {
    if (redis) {
      await redis.expire(key, seconds);
    } else {
      // In-memory cleanup after TTL (simplified)
      setTimeout(() => {
        inMemoryStore.delete(key);
      }, seconds * 1000);
    }
  },
  
  async del(key: string): Promise<void> {
    if (redis) {
      await redis.del(key);
    } else {
      inMemoryStore.delete(key);
    }
  }
};

// Signaling message types
interface SignalingMessage {
  id: string;
  senderId: string;
  recipientId: string | null; // null = broadcast
  type: 'offer' | 'answer' | 'ice';
  data: unknown; // SDP or ICE data
  timestamp: number;
}

// POST /api/rooms/[id]/messages - Send signaling message
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const roomId = resolvedParams.id;
    const body = await request.json();
    
    const { senderId, recipientId, type, data } = body;
    
    // Validate input
    if (!senderId || !type || !data) {
      return NextResponse.json(
        { error: "Missing required fields: senderId, type, data" },
        { status: 400 }
      );
    }

    if (!['offer', 'answer', 'ice'].includes(type)) {
      return NextResponse.json(
        { error: "Invalid message type. Must be: offer, answer, ice" },
        { status: 400 }
      );
    }

    // Create message
    const message: SignalingMessage = {
      id: Math.random().toString(36).substr(2, 9),
      senderId,
      recipientId: recipientId || null,
      type,
      data,
      timestamp: Date.now()
    };

    // Store message with room-based key
    const key = `room:${roomId}:messages`;
    await storage.lpush(key, JSON.stringify(message));
    
    // Set TTL of 1 hour for auto cleanup
    await storage.expire(key, 3600);
    
    console.log(`📡 Signaling message sent to room ${roomId}:`, {
      type: message.type,
      from: senderId,
      to: recipientId || 'broadcast'
    });

    return NextResponse.json({ 
      success: true, 
      messageId: message.id 
    });

  } catch (error) {
    console.error('Failed to send signaling message:', error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

// GET /api/rooms/[id]/messages - Get signaling messages
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const roomId = resolvedParams.id;
    const { searchParams } = new URL(request.url);
    const peerId = searchParams.get('peerId');
    const since = parseInt(searchParams.get('since') || '0');

    if (!peerId) {
      return NextResponse.json(
        { error: "Missing peerId parameter" },
        { status: 400 }
      );
    }

    // Get messages from storage
    const key = `room:${roomId}:messages`;
    const rawMessages = await storage.lrange(key, 0, -1);
    
    if (!rawMessages || rawMessages.length === 0) {
      return NextResponse.json({ messages: [] });
    }

    // Parse and filter messages
    const allMessages: SignalingMessage[] = rawMessages
      .map(msg => {
        try {
          return JSON.parse(msg as string);
        } catch {
          return null;
        }
      })
      .filter(msg => msg !== null)
      .sort((a, b) => a.timestamp - b.timestamp);

    // Filter messages for this peer (recipient is peerId or broadcast)
    const relevantMessages = allMessages.filter(msg => {
      // Skip messages this peer sent
      if (msg.senderId === peerId) return false;
      
      // Include broadcasts (recipientId is null)
      if (msg.recipientId === null) return true;
      
      // Include messages specifically for this peer
      if (msg.recipientId === peerId) return true;
      
      return false;
    });

    // Filter by timestamp if 'since' provided
    const newMessages = relevantMessages.filter(msg => msg.timestamp > since);

    console.log(`📬 Delivering ${newMessages.length} messages to peer ${peerId} in room ${roomId}`);

    return NextResponse.json({ 
      messages: newMessages 
    });

  } catch (error) {
    console.error('Failed to get signaling messages:', error);
    return NextResponse.json(
      { error: "Failed to get messages" },
      { status: 500 }
    );
  }
}

// DELETE /api/rooms/[id]/messages - Clean up room (optional, for debugging)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const roomId = resolvedParams.id;
    const key = `room:${roomId}:messages`;
    
    await storage.del(key);
    
    console.log(`🧹 Cleaned up messages for room ${roomId}`);
    
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Failed to cleanup room:', error);
    return NextResponse.json(
      { error: "Failed to cleanup room" },
      { status: 500 }
    );
  }
}