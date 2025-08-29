// QR Code Generation and Scanning Utilities
import QRCode from "qrcode";

export type QRData = {
  type: "bomb-game-join";
  roomId: string;
  hostOffer: string; // WebRTC offer data
  hostName: string;
  version: string;
};

// Generate QR Code for room joining
export async function generateRoomQR(roomId: string, hostOffer: string, hostName: string): Promise<string> {
  const qrData: QRData = {
    type: "bomb-game-join",
    roomId,
    hostOffer,
    hostName,
    version: "1.0"
  };

  try {
    const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrData), {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: 256
    });

    return qrCodeDataURL;
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    throw new Error('QR Code generation failed');
  }
}

// Parse QR Code data
export function parseQRData(qrContent: string): QRData | null {
  try {
    const data = JSON.parse(qrContent);
    
    if (data.type !== "bomb-game-join" || !data.roomId || !data.hostOffer || !data.hostName) {
      console.error('Invalid QR code data structure');
      return null;
    }

    return data as QRData;
  } catch (error) {
    console.error('Failed to parse QR code data:', error);
    return null;
  }
}

// Generate sharing URL (fallback for QR code)
export function generateSharingURL(roomId: string, hostOffer: string, hostName: string): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const qrData: QRData = {
    type: "bomb-game-join",
    roomId,
    hostOffer,
    hostName,
    version: "1.0"
  };

  const encodedData = encodeURIComponent(JSON.stringify(qrData));
  return `${baseUrl}/game/bomb/join?data=${encodedData}`;
}

// Parse sharing URL data
export function parseSharingURL(url: string): QRData | null {
  try {
    const urlObj = new URL(url);
    const dataParam = urlObj.searchParams.get('data');
    
    if (!dataParam) {
      console.error('No data parameter in sharing URL');
      return null;
    }

    const decodedData = decodeURIComponent(dataParam);
    return parseQRData(decodedData);
  } catch (error) {
    console.error('Failed to parse sharing URL:', error);
    return null;
  }
}