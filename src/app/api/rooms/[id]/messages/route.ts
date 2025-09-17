import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: roomId } = await params;
    
    // Placeholder for room messages
    // In a real implementation, you would fetch messages from a database
    const messages = [
      {
        id: '1',
        roomId: roomId,
        message: 'Welcome to the room!',
        timestamp: new Date().toISOString(),
        sender: 'system'
      }
    ];

    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: roomId } = await params;
    const body = await request.json();
    
    // Placeholder for creating a new message
    // In a real implementation, you would save the message to a database
    const newMessage = {
      id: Date.now().toString(),
      roomId: roomId,
      message: body.message,
      timestamp: new Date().toISOString(),
      sender: body.sender || 'anonymous'
    };

    return NextResponse.json({ message: newMessage });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    );
  }
}