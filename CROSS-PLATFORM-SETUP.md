# Cross-Platform Setup für "Wie macht der Bär"

Diese Anleitung hilft dabei, das Projekt sowohl auf Windows als auch auf macOS identisch zu entwickeln.

## 🚀 Schnellstart

### 1. Dependencies installieren
```bash
npm install
```

### 2. Development Server starten
```bash
npm run dev
```

### 3. Build für Production
```bash
npm run build
```

## 🔧 Cross-Platform Konfiguration

### Font-Stack Optimierung
Das Projekt verwendet optimierte Font-Stacks, die auf beiden Plattformen identisch aussehen:

```css
/* Primary Font Stack */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;

/* Heading Font Stack */
font-family: 'Clash Display', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
```

### CSS Cross-Platform Fallbacks
Alle CSS-Eigenschaften haben Cross-Platform-Fallbacks:

```css
/* Gradient Text mit Fallbacks */
.gradient-text {
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent; /* Fallback für Browser ohne background-clip support */
}

/* Scrollbar Hiding */
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-gutter: stable; /* Fallback für moderne Browser */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
```

## 📁 Datei-Konfiguration

### .gitattributes
Die `.gitattributes`-Datei stellt sicher, dass Line Endings konsistent sind:

```
* text=auto
*.js text eol=lf
*.ts text eol=lf
*.tsx text eol=lf
*.json text eol=lf
*.css text eol=lf
```

### Cross-Platform Utilities
Die `src/lib/cross-platform-utils.ts`-Datei enthält Utility-Funktionen für:

- Platform Detection (Windows/macOS/Linux)
- Font Stack Management
- CSS Fallback Generation
- Browser Detection
- Device Detection
- Performance Optimizations

## 🎨 Design System

### Konsistente Typography
Das Design System verwendet eine konsistente Typography-Hierarchie:

```css
/* Mobile-optimierte Typography */
@media (max-width: 640px) {
  .body-xl { font-size: var(--text-xl-mobile); }
  .body-lg { font-size: var(--text-lg-mobile); }
  .body-base { font-size: var(--text-base-mobile); }
}
```

### Cross-Platform Animations
Alle Animationen haben Fallbacks für `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🐛 Häufige Probleme und Lösungen

### Problem: Fonts sehen unterschiedlich aus
**Lösung:** Stelle sicher, dass die Font-Stack-Reihenfolge korrekt ist:
1. Inter (Custom Font)
2. -apple-system (macOS)
3. BlinkMacSystemFont (macOS)
4. Segoe UI (Windows)
5. Helvetica Neue (Fallback)
6. Arial (Fallback)
7. sans-serif (Generic Fallback)

### Problem: CSS-Eigenschaften funktionieren nicht
**Lösung:** Verwende die Cross-Platform-Utilities:

```typescript
import { getCSSFallbacks } from '@/lib/cross-platform-utils';

const gradientTextCSS = getCSSFallbacks('background-clip', 'text');
// Gibt: "-webkit-background-clip: text; background-clip: text;"
```

### Problem: Scrollbars sind sichtbar
**Lösung:** Verwende die vordefinierten Klassen:

```css
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
```

## 🔍 Testing

### Cross-Platform Testing
1. **Windows Testing:**
   - Chrome, Firefox, Edge
   - Verschiedene Bildschirmauflösungen
   - Touch- und Non-Touch-Geräte

2. **macOS Testing:**
   - Safari, Chrome, Firefox
   - Retina-Displays
   - Touch- und Non-Touch-Geräte

### Performance Testing
```bash
# Lighthouse Performance Test
npm run lighthouse

# Bundle Analysis
npm run analyze
```

## 📱 Mobile Optimizations

### Touch-Optimierungen
```css
/* Touch-optimierte Interaktionen */
.is-touch button,
.is-touch a,
.is-touch input,
.is-touch select {
  min-height: 44px;
  min-width: 44px;
}
```

### Responsive Design
```css
/* Mobile-First Approach */
@media (max-width: 640px) {
  .epic-title { font-size: 2.5rem !important; }
  .epic-subtitle { font-size: 1.25rem !important; }
}
```

## 🚀 Deployment

### Vercel (Empfohlen)
```bash
# Automatisches Deployment bei Push
git push origin main
```

### Andere Plattformen
```bash
# Build für Production
npm run build

# Start Production Server
npm start
```

## 📚 Weitere Ressourcen

- [Next.js Cross-Platform Guide](https://nextjs.org/docs)
- [Tailwind CSS Cross-Platform](https://tailwindcss.com/docs)
- [CSS Cross-Platform Best Practices](https://developer.mozilla.org/en-US/docs/Web/CSS)

## 🤝 Support

Bei Problemen mit der Cross-Platform-Kompatibilität:

1. Überprüfe die `.gitattributes`-Datei
2. Stelle sicher, dass alle Dependencies installiert sind
3. Verwende die Cross-Platform-Utilities
4. Teste auf beiden Plattformen

---

**Hinweis:** Diese Konfiguration stellt sicher, dass das Projekt sowohl auf Windows als auch auf macOS identisch funktioniert und entwickelt werden kann.
