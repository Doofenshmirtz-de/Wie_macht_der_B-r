# 💣 Bomb Party - Multiplayer Implementation

Ein vollwertiges P2P Multiplayer Trinkspiel mit WebRTC und QR-Codes.

## 🎮 Features

### Spielmodi
- **Einzelnes Handy**: Klassischer Modus wo alle ein Gerät teilen
- **Mehrere Handys**: P2P Multiplayer wo jeder sein eigenes Gerät nutzt

### Multiplayer Funktionalitäten
- ✅ **Host/Client System**: Host erstellt Raum, Clients können beitreten
- ✅ **QR-Code Integration**: Einfaches Beitreten durch QR-Scan
- ✅ **WebRTC P2P**: Direkte Verbindung zwischen Geräten
- ✅ **Star-Topology**: Host verwaltet kompletten Game State
- ✅ **Real-time Sync**: Live Updates an alle Clients
- ✅ **Turn-based System**: Nur aktueller Spieler kann handeln
- ✅ **Hidden Timer**: Nur Host kennt Bomb Timer (20-60s)
- ✅ **Connection Status**: Live Verbindungsanzeigen
- ✅ **Bis 16 Spieler**: Skaliert für große Gruppen

## 🏗️ Architektur

### Komponenten-Struktur
```
src/app/[locale]/game/bomb/
├── page.tsx                    # Hauptkomponente mit Game Logic
├── components/
│   ├── GameModeSelection.tsx   # Spielmodus-Auswahl
│   ├── MultiplayerModeSelection.tsx  # Host/Client Auswahl  
│   ├── HostSetup.tsx          # Host-Raum erstellen
│   ├── ClientSetup.tsx        # Client-Beitritt (QR/Code/URL)
│   └── WaitingRoom.tsx        # Warteraum mit Spielerliste
├── shared/
│   ├── categories.ts          # Spiel-Kategorien
│   └── multiplayer-types.ts   # TypeScript Definitionen
└── utils/
    ├── webrtc-utils.ts        # WebRTC Management
    └── qr-utils.ts            # QR-Code Generation/Parsing
```

### State Management
- **Single Player State**: Lokale Verwaltung für traditionelles Spiel
- **Host State**: Vollständiger Game State mit WebRTC Connections
- **Client State**: Display-Only State ohne sensitive Daten
- **Message System**: Typisierte Nachrichten zwischen Host/Client

### Datenfluss
```
Host creates room → Generates QR Code → Clients scan/join → 
WebRTC P2P connections → Waiting Room → Game Start → 
Turn-based gameplay → Host manages bomb timer → 
Explosion → Host selects loser → Score update → Next round
```

## 🎯 Game Flow

### 1. Mode Selection
- Nutzer wählt zwischen "Einzelnes Handy" vs "Mehrere Handys"
- Bei Multiplayer: Auswahl zwischen "Gruppe erstellen" (Host) oder "Gruppe beitreten" (Client)

### 2. Host Setup
- Host gibt Namen ein und erstellt Raum
- Generiert 8-stelligen Room-Code und QR-Code
- Zeigt QR-Code und Sharing-URL für andere Spieler
- Verwaltet WebRTC Offers für neue Connections

### 3. Client Join  
- **QR-Scan**: Kamera-basiertes Scannen (empfohlen)
- **Room-Code**: Manueller 8-stelliger Code
- **Sharing-URL**: Link mit eingebetteten Connection-Daten
- Namen eingeben und WebRTC Verbindung aufbauen

### 4. Waiting Room
- Live Spielerliste mit Connection Status
- Host kann Spiel-Einstellungen anpassen (Runden, Kategorien)
- Host startet Spiel bei ≥2 Spielern
- Clients warten auf Host-Entscheidung

### 5. Multiplayer Gameplay
- **Sync States**: Alle sehen dasselbe Wort und aktiven Spieler
- **Hidden Timer**: Clients sehen "???" statt echtem Countdown
- **Turn Control**: Nur aktueller Spieler kann "Weiter" klicken
- **Live Updates**: Real-time Synchronisation via WebRTC
- **Host Authority**: Host entscheidet bei Explosion wer verloren hat

## 🔧 Technische Details

### WebRTC Implementation
- **Simple-Peer**: Vereinfachte WebRTC API
- **STUN Servers**: Google & Twilio für NAT Traversal
- **Connection Management**: Auto-reconnect und Error Handling
- **Message Protocol**: JSON-basierte typisierte Nachrichten

### QR-Code System
```typescript
type QRData = {
  type: "bomb-game-join";
  roomId: string;
  hostOffer: string;  // WebRTC Offer Data
  hostName: string;
  version: string;
};
```

### Message Types
- `join-request`: Client möchte beitreten
- `join-response`: Host-Antwort (Erfolg/Fehler)
- `game-state-update`: Game State Sync an Clients
- `player-action`: Client-Actions an Host
- `connection-test`: Keep-Alive Nachrichten

### Error Handling
- **Connection Lost**: Automatische Erkennung und Reconnect-Versuche
- **Host Disconnect**: Graceful Degradation mit Fehlermeldung
- **Invalid QR Codes**: Validation und User-freundliche Fehlermeldungen
- **Room Full**: Saubere Ablehnung bei >16 Spielern

## 📱 Mobile Optimization

### QR-Scanner
- Native Kamera-Integration
- `facingMode: 'environment'` für Hauptkamera
- Fallback für Geräte ohne Kamera-Zugriff

### Touch Interface
- Mobile-first Button-Größen
- Optimierte Tap-Targets (≥44px)
- Responsive Layout für alle Bildschirmgrößen

### Performance
- WebRTC läuft auf separaten Threads
- Minimale DOM-Updates durch React State
- GPU-beschleunigte CSS-Animationen

## 🚀 Deployment Notes

### Requirements
- HTTPS für WebRTC (außer localhost)
- Modern Browser mit WebRTC Support
- Kamera-Permissions für QR-Scanner

### Environment Variables
Keine zusätzlichen Environment Variables nötig - verwendet Public STUN Server.

### Production Considerations
- Implementiere Signaling Server für Room-Code Joining
- Füge TURN Server für Corporate Networks hinzu  
- Rate-Limiting für Room Creation
- Analytics für Connection Success Rates

## 🎨 Design System

Folgt dem `notes/styleguide.md` mit Clash Royale-inspirierten Gaming-Elementen:
- Epic Gradients und Glow-Effekte
- Clash Royale Button-Styles (cr-button-primary, cr-button-danger)
- Mobile-optimierte Cards (cr-card)
- Gold-Akzente (#ffd700) für Gaming-Feel

## 🧪 Testing

### Local Testing
1. Starte `npm run dev`
2. Öffne Browser 1: `http://localhost:3000/de/game/bomb`
3. Wähle "Mehrere Handys" → "Gruppe erstellen"
4. Öffne Browser 2: Scanne QR-Code oder nutze Sharing-URL
5. Teste Multiplayer Gameplay

### Production Testing
- Teste auf verschiedenen Geräten/Netzwerken
- Überprüfe WebRTC-Verbindung in Corporate Networks
- Validiere QR-Code Scanning auf verschiedenen Kameras

---

**Version**: 1.0  
**Letzte Aktualisierung**: $(date)  
**Implementiert von**: Claude Sonnet 4 🎮