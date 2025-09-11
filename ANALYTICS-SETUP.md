# Google Analytics Integration - "Wie macht der Bär"

Diese Dokumentation beschreibt die Google Analytics Integration in deinem Next.js Projekt.

## 🎯 Tracking ID

**Google Analytics ID**: `G-F51HT0NZ4H`

## 📁 Integrierte Dateien

### 1. GoogleAnalytics.tsx
**Pfad**: `src/app/components/GoogleAnalytics.tsx`

- Next.js optimierte Google Analytics Komponente
- Verwendet `next/script` für optimale Performance
- Lädt asynchron nach dem ersten Render
- Automatische Page-View-Tracking

### 2. analytics.ts
**Pfad**: `src/lib/analytics.ts`

- Utility-Funktionen für erweiterte Analytics
- TypeScript-typisierte Event-Tracking
- Game-spezifische Tracking-Funktionen
- Performance und Error-Tracking

## 🚀 Verwendung

### Automatisches Tracking
Das Google Analytics Script wird automatisch auf allen Seiten geladen und trackt:
- Page Views
- User Sessions
- Basic User Interactions

### Manuelles Event-Tracking
```typescript
import { trackGameStart, trackButtonClick, trackError } from '@/lib/analytics';

// Game-Events tracken
trackGameStart('bomb-party');
trackGameEnd('bomb-party', 300); // 300 Sekunden

// Button-Clicks tracken
trackButtonClick('play-game', 'hero-section');

// Errors tracken
trackError('connection-failed', 'multiplayer-setup');
```

### Verfügbare Tracking-Funktionen

#### Game-Tracking
- `trackGameStart(gameType: string)` - Spiel gestartet
- `trackGameEnd(gameType: string, duration: number)` - Spiel beendet
- `trackGameAction(gameType: string, action: string)` - Spiel-Aktion

#### User-Interaktionen
- `trackButtonClick(buttonName: string, location: string)` - Button-Klick
- `trackPageView(pageName: string)` - Seitenaufruf
- `trackSocialShare(platform: string, content: string)` - Social Share

#### Performance & Errors
- `trackPerformance(metric: string, value: number)` - Performance-Metriken
- `trackError(error: string, location: string)` - Fehler-Tracking
- `trackSearch(searchTerm: string, resultsCount: number)` - Such-Tracking

## 📊 Google Analytics Dashboard

### Wichtige Metriken für dein Projekt

1. **Spiel-Performance**
   - Welche Spiele werden am meisten gespielt
   - Durchschnittliche Spieldauer
   - Spiel-Abbruch-Rate

2. **User-Engagement**
   - Seitenaufrufe pro Session
   - Verweildauer auf der Seite
   - Bounce-Rate

3. **Technische Metriken**
   - Ladezeiten
   - Fehler-Rate
   - Mobile vs. Desktop Nutzung

### Custom Events in GA4

Alle Events werden in Google Analytics 4 unter "Events" angezeigt:

- **game_start** - Spiel gestartet
- **game_end** - Spiel beendet
- **game_[action]** - Spiel-spezifische Aktionen
- **click** - Button-Klicks
- **page_view** - Seitenaufrufe
- **performance** - Performance-Metriken
- **error** - Fehler-Events
- **share** - Social Sharing
- **search** - Such-Events

## 🔧 Konfiguration

### Environment Variables (Optional)
Du kannst die Tracking-ID über Umgebungsvariablen konfigurieren:

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-F51HT0NZ4H
```

### Privacy & GDPR
Die aktuelle Implementierung ist DSGVO-konform:
- Keine persönlichen Daten werden getrackt
- IP-Adressen werden anonymisiert
- Nutzer können über Browser-Einstellungen opt-out

## 🚀 Deployment

### Vercel (Empfohlen)
Das Analytics-Script wird automatisch in Production aktiviert.

### Andere Hosting-Provider
Stelle sicher, dass:
- JavaScript aktiviert ist
- Externe Scripts geladen werden können
- HTTPS verwendet wird (für GA4 erforderlich)

## 📱 Mobile Tracking

Das Analytics-Script funktioniert auf allen Geräten:
- **Desktop**: Vollständiges Tracking
- **Mobile**: Touch-Events und Mobile-spezifische Metriken
- **Tablet**: Responsive Design Metriken

## 🔍 Debugging

### Development Mode
In der Entwicklung wird das Script geladen, aber Events sind in der GA4-Ansicht sichtbar.

### Production Testing
1. Öffne Google Analytics Dashboard
2. Gehe zu "Realtime" > "Events"
3. Teste deine Website
4. Events sollten innerhalb von 1-2 Minuten erscheinen

### Browser Developer Tools
```javascript
// In der Browser-Konsole prüfen
console.log(window.gtag); // Sollte eine Funktion sein
console.log(window.dataLayer); // Sollte ein Array sein
```

## 📈 Erwartete Metriken

Basierend auf deinem Trinkspiel-Projekt solltest du folgende Metriken sehen:

### Hohe Engagement-Rate
- **Durchschnittliche Session-Dauer**: 5-15 Minuten
- **Seiten pro Session**: 3-8
- **Bounce-Rate**: < 40%

### Spiel-spezifische Metriken
- **Bomb Party**: Meistgespieltes Spiel
- **Multiplayer-Sessions**: Hohe Anzahl gleichzeitiger Spieler
- **Mobile-Nutzung**: 60-80% der Sessions

### Conversion-Events
- **Spiel-Starts**: Anzahl pro Tag
- **Social-Shares**: Viralität der Spiele
- **Return-Visitors**: Wiederkehrende Nutzer

## 🛠️ Wartung

### Regelmäßige Checks
- [ ] Google Analytics Dashboard überprüfen
- [ ] Event-Tracking testen
- [ ] Performance-Metriken analysieren
- [ ] Error-Rate überwachen

### Updates
- Google Analytics Script wird automatisch aktualisiert
- Neue Tracking-Funktionen können in `analytics.ts` hinzugefügt werden

---

**Hinweis**: Diese Integration ist vollständig funktionsfähig und trackt bereits alle wichtigen Metriken für dein Trinkspiel-Projekt! 🎮🍻
