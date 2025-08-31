# 🚨 Bomb Game Multiplayer Migration Plan
## Von Socket.io zu Peer-to-Peer mit simpel-peer

**Status:** RESCUE MISSION - Die Multiplayer-Logik ist unstrukturiert und verwendet veraltete Socket.io Architektur
**Ziel:** Migration zu sternförmigem Peer-to-Peer System mit Redis-basierten Signaling API-Endpunkten

---

## 📊 Analyse des aktuellen Stands

### ✅ Was funktioniert aktuell:
- **Socket.io Backend komplett implementiert** (`src/app/api/socket/io.ts`)
- **Socket.io Client Utils** (`src/app/[locale]/game/bomb/utils/socket-utils.ts`)
- **Komponenten-Struktur ist sauber** (GameModeSelection, MultiplayerModeSelection, etc.)
- **Typen-Definitionen vorhanden** (`shared/multiplayer-types.ts`)
- **Room-Management mit Share-Links funktioniert**

### 🔴 Probleme identifiziert:

#### 1. **Dependency-Management**
- ❌ `simpel-peer` wurde deinstalliert, ist aber in types referenziert
- ❌ `socket.io` & `socket.io-client` sind installiert aber sollen weg
- ❌ `@upstash/redis` fehlt komplett

#### 2. **Architektur-Probleme**
- ❌ Zentralisierte Socket.io Architektur statt P2P
- ❌ In-Memory Room-Storage (verliert Daten bei Server-Restart)
- ❌ Host muss permanent online sein für Room-Persistierung

#### 3. **Komponenten verwenden veraltete Technologie**
- ❌ SocketHostSetup.tsx mit Socket.io Events
- ❌ SocketClientSetup.tsx mit Socket.io Events  
- ❌ Multiplayer-Types importieren SimplePeer aber Package fehlt

#### 4. **API-Endpunkte**
- ❌ Socket.io API-Endpunkt `/api/socket/io` soll weg
- ❌ Neue Redis-basierte Signaling APIs fehlen komplett

---

## 🎯 Migrations-Ziele

### **Neue Architektur: Sternförmiges Peer-to-Peer**
```
Host 🌟 ←→ Client 1
     ↕
   Client 2 ←→ Client 3
```

- **Host = Zentraler Koordinator** für Game State
- **Clients verbinden sich direkt mit Host** via WebRTC
- **Redis nur für Signaling** (offer/answer/ice exchange)
- **Kein dauerhafter Server-State**

### **Signaling API-Endpunkte:**
1. `POST /api/rooms/:id/messages` - Signaling Messages senden
2. `GET /api/rooms/:id/messages?peerId=X&since=Y` - Messages abrufen

---

## 📋 MIGRATIONS-PLAN (Schritt-für-Schritt)

### **Phase 1: Dependencies & Setup** 🔧
- [ ] `npm install simple-peer` - WebRTC Peer Connections
- [ ] `npm install @upstash/redis` - Redis für Signaling  
- [ ] `npm uninstall socket.io socket.io-client` - Socket.io entfernen
- [ ] Upstash Redis Umgebungsvariablen konfigurieren

### **Phase 2: API-Endpunkte implementieren** 🛠️
- [ ] `src/app/api/rooms/[id]/messages/route.ts` erstellen
  - POST Handler für Signaling Messages
  - GET Handler mit peerId & since Parameter
  - Redis CRUD Operations
- [ ] Alte Socket.io APIs deaktivieren/löschen
  - `src/app/api/socket/` komplett entfernen

### **Phase 3: Signaling Utils erstellen** 📡
- [ ] `src/app/[locale]/game/bomb/utils/signaling-utils.ts` erstellen
  - Redis-basierte Message Exchange
  - Polling für neue Messages
  - Message Types: offer, answer, ice
- [ ] Alte `socket-utils.ts` entfernen

### **Phase 4: WebRTC Peer Management** 🌐
- [ ] `src/app/[locale]/game/bomb/utils/peer-utils.ts` erstellen
  - SimplePeer Wrapper
  - Connection Management
  - Message Broadcasting (Host → Alle Clients)
- [ ] Types in `multiplayer-types.ts` aktualisieren

### **Phase 5: Host-Komponente umschreiben** 👑
- [ ] `SocketHostSetup.tsx` → `PeerHostSetup.tsx`
  - Room ID Generation
  - Share-Link Generation (QR-Code Support?)
  - WebRTC Host Initialization
  - Peer Connection Management
- [ ] Host Game State Management

### **Phase 6: Client-Komponente umschreiben** 📱
- [ ] `SocketClientSetup.tsx` → `PeerClientSetup.tsx`  
  - Room Code / Share Link Join
  - WebRTC Client Connection zu Host
  - Connection Status Management
- [ ] Client Game State Sync

### **Phase 7: Game Logic Integration** 🎮
- [ ] WaitingRoom.tsx anpassen für P2P
- [ ] Game State Broadcasting über WebRTC
- [ ] Player Actions über P2P statt Socket.io
- [ ] Error Handling & Reconnection Logic

### **Phase 8: Testing & Cleanup** 🧹
- [ ] Multi-Device Testing
- [ ] Network Error Simulation
- [ ] Performance Optimierung
- [ ] Dead Code Removal
- [ ] Documentation Update

---

## 🏗️ Neue Dateistruktur

```
src/app/
├── api/
│   └── rooms/
│       └── [id]/
│           └── messages/
│               └── route.ts           # Redis Signaling API
├── [locale]/game/bomb/
│   ├── components/
│   │   ├── PeerHostSetup.tsx         # Neu: WebRTC Host
│   │   ├── PeerClientSetup.tsx       # Neu: WebRTC Client  
│   │   ├── GameModeSelection.tsx     # Update: Text anpassen
│   │   ├── MultiplayerModeSelection.tsx # Update: Text anpassen
│   │   └── WaitingRoom.tsx           # Update: P2P Status
│   ├── utils/
│   │   ├── signaling-utils.ts        # Neu: Redis Signaling
│   │   └── peer-utils.ts             # Neu: WebRTC Management
│   └── shared/
│       ├── multiplayer-types.ts      # Update: P2P Types
│       └── categories.ts             # Unverändert
```

---

## ⚠️ Kritische Punkte

### **1. Redis Konfiguration**
```env
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

### **2. Message Format für Signaling**
```typescript
interface SignalingMessage {
  id: string;
  senderId: string;
  recipientId: string | null; // null = broadcast
  type: 'offer' | 'answer' | 'ice';
  data: any; // SDP oder ICE data
  timestamp: number;
}
```

### **3. Polling vs WebSockets**
- **Vorteil Polling:** Einfacher, keine persistente Verbindung
- **Nachteil:** Latenz & mehr Requests
- **Lösung:** Smart Polling (schnell während Verbindungsaufbau, langsam danach)

### **4. WebRTC Troubleshooting**
- STUN/TURN Server für NAT-Traversal?
- Error Handling für failed connections
- Fallback-Mechanismen

---

## 🔄 Migration Reihenfolge (Empfohlen)

**Woche 1:** Phase 1-2 (Dependencies & API)
**Woche 2:** Phase 3-4 (Utils & Peer Management)  
**Woche 3:** Phase 5-6 (Komponenten)
**Woche 4:** Phase 7-8 (Integration & Testing)

---

## 📖 Technische Details

### **Redis Message Storage**
```
KEY: room:{roomId}:messages
VALUE: JSON Array of SignalingMessage[]
TTL: 1 hour (auto cleanup)
```

### **WebRTC Connection Flow**
1. Host erstellt Room in Redis
2. Client joint via Room Code
3. Client sendet Offer via Redis
4. Host empfängt Offer, sendet Answer
5. ICE Candidates Exchange
6. Direct P2P Connection etabliert
7. Game State über P2P, nicht Redis

### **Game State Synchronisation**
- Host hat authoritative Game State
- Host broadcasted Updates an alle Clients
- Clients senden Actions an Host
- Bei Host-Disconnect: Game Over (kein Host-Migration)

---

## 🎯 Erfolgskriterien

- [ ] Socket.io komplett entfernt
- [ ] WebRTC P2P Verbindungen funktionieren
- [ ] Redis nur für Signaling, nicht für Game State
- [ ] Multi-Device Testing erfolgreich
- [ ] Performance mindestens so gut wie vorher
- [ ] QR-Code Sharing funktioniert (optional)

---

## 🚀 Los geht's!

**Nächster Schritt:** Phase 1 - Dependencies installieren und Umgebung vorbereiten.

**Wichtig:** Immer einen Git Branch pro Phase erstellen für einfaches Rollback!