# Infinite Scroll Komponenten

## Übersicht

Die neue Infinite Scroll Implementierung besteht aus mehreren Komponenten, die zusammenarbeiten, um ein nahtloses, bidirektionales Scroll-Erlebnis zu bieten.

## Komponenten

### 1. `ItemList.tsx` - Hauptkomponente
**Features:**
- ✅ Bidirektionales Scrollen (vor und zurück)
- ✅ React Intersection Observer für Performance
- ✅ Sauberes Debouncing (300ms)
- ✅ SSR-freundlich mit initialen Daten
- ✅ Automatisches Scroll-Position Management
- ✅ Error Handling und Loading States
- ✅ Debug-Informationen in Development

**Props:**
```tsx
interface ItemListProps {
  initialData?: GetGamesResult;    // Für SSR
  itemsPerLoad?: number;          // Anzahl Items pro Load
  renderItem: (item, index) => React.ReactNode;  // Render-Funktion
  loadingComponent?: React.ReactNode;            // Custom Loading
  errorComponent?: React.ReactNode;              // Custom Error
  className?: string;                            // CSS Klassen
  direction?: 'vertical' | 'horizontal';         // Scroll-Richtung
}
```

### 2. `game-actions.ts` - Server Actions
**Features:**
- ✅ Typisierte Server Actions für Next.js 15
- ✅ Bidirektionale Pagination
- ✅ Realistische Latenz-Simulation
- ✅ Umfangreiche Spiele-Datenbank (10 Spiele)
- ✅ SEO-optimiertes initiales Laden

**API:**
```tsx
// Hauptfunktion für Pagination
getGames({ offset, limit, direction, lastId })

// Initiale Daten für SSR
getInitialGames()

// Optional: Suchfunktionalität
searchGames(query)
```

### 3. `GameCard.tsx` - Card Komponente
**Features:**
- ✅ Wiederverwendbare, typisierte Game Card
- ✅ Performance-optimiert mit `priority` Prop
- ✅ Zugänglichkeit und SEO-optimiert
- ✅ Responsive Design
- ✅ Konsistentes Styling mit dem bestehenden Design

## Implementation Details

### Bidirektionales Scrollen
```tsx
// Vorwärts scrollen (nach rechts)
const loadMoreForward = async () => {
  const result = await getGames({
    offset: forwardOffset,
    limit: itemsPerLoad,
    direction: 'forward'
  });
  setItems(prev => [...prev, ...result.games]);
};

// Rückwärts scrollen (nach links)
const loadMoreBackward = async () => {
  const result = await getGames({
    offset: backwardOffset,
    limit: itemsPerLoad,
    direction: 'backward',
    lastId: firstItemId
  });
  setItems(prev => [...result.games, ...prev]);
  // Scroll-Position automatisch korrigieren
};
```

### Debouncing
```tsx
const debouncedLoad = useCallback((direction) => {
  if (loadTimeoutRef.current) {
    clearTimeout(loadTimeoutRef.current);
  }
  
  loadTimeoutRef.current = setTimeout(() => {
    direction === 'forward' ? loadMoreForward() : loadMoreBackward();
  }, 300); // 300ms Debounce
}, []);
```

### SEO & Performance
- **Initiale Server-Seite Rendering** mit `getInitialGames()`
- **Priority Loading** für die ersten 2 Karten
- **Intersection Observer** mit Root Margin für vorausschauendes Laden
- **Optimiertes Image Loading** mit Next.js Image Component

## Verwendung

### Basis Implementation
```tsx
<ItemList
  initialData={initialGamesData}
  itemsPerLoad={3}
  direction="horizontal"
  renderItem={(game, index) => (
    <GameCard 
      game={game} 
      index={index}
      priority={index < 2}
    />
  )}
/>
```

### Custom Loading & Error
```tsx
<ItemList
  // ... andere Props
  loadingComponent={<CustomSpinner />}
  errorComponent={<CustomError />}
/>
```

## Migration von alter Implementation

**Vorher:** Statische, duplizierte Game Cards mit CSS-Animation
```tsx
// Hardkodierte, duplizierte Karten
<EpicGameCard title="Bomb Party" ... />
<EpicGameCard title="Truth or Dare" ... />
// Duplikate für Infinite Scroll Illusion
<EpicGameCard title="Bomb Party" ... />
<EpicGameCard title="Truth or Dare" ... />
```

**Nachher:** Dynamisches, server-gesteuertes Loading
```tsx
// Dynamisch geladene Daten mit echter Pagination
<ItemList
  initialData={serverData}
  renderItem={(game) => <GameCard game={game} />}
/>
```

## Benefits

1. **Performance:** Nur benötigte Items werden geladen
2. **SEO:** Initiale Daten werden server-side gerendert
3. **UX:** Nahtloses bidirektionales Scrollen
4. **Maintainability:** Saubere Trennung von Daten und UI
5. **Scalability:** Kann mit beliebig vielen Items umgehen
6. **Accessibility:** Optimiert für Screen Reader und Keyboard-Navigation

## Debug Features

In Development Mode wird ein Debug-Panel angezeigt mit:
- Aktuelle Anzahl Items
- Forward/Backward Status
- Loading States
- Offset-Informationen
