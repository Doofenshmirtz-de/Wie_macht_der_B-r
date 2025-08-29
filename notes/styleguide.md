# 🎮 Wie macht der Bär - Epic Styleguide

## 🔥 Design Philosophy

**"Clash Royale meets Trinkspiele"** - Ein episches Gaming-Design mit Premium-Feel für die ultimative Party-Experience!

---

## 🎨 Color Palette

### Primary Colors (Clash Royale Inspired)
```css
/* Golden Accents - Das Herzstück */
--gold-primary: #ffd700    /* Main Gold */
--gold-light: #ffed4e      /* Light Gold */
--gold-dark: #b8860b       /* Dark Gold */

/* Epic Gradients */
--hero-gradient: linear-gradient(to right, #fbbf24, #f59e0b, #ef4444)
--purple-gradient: linear-gradient(to right, #8b5cf6, #ec4899, #f97316)
--background-gradient: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460, #0e1f3c, #1a1a2e)
```

### Game-Specific Colors
```css
/* Bomb Party */
--bomb-gradient: from-orange-500 via-red-500 to-pink-600

/* Quiz Show */
--quiz-gradient: from-purple-500 via-blue-500 to-indigo-600

/* Charades */
--charades-gradient: from-green-500 via-teal-500 to-blue-600
```

### Status Colors
```css
--success: #22c55e        /* Available/Success */
--warning: #f59e0b        /* Warning/Attention */
--danger: #ef4444         /* Error/Danger */
--disabled: #6b7280       /* Disabled/Coming Soon */
```

---

## 🎯 Typography

### Font Hierarchy
```css
/* Epic Hero Title */
.epic-title {
  font-size: 4rem → 6rem → 8rem; /* Mobile → Tablet → Desktop */
  font-weight: 900; /* Black */
  background: linear-gradient(to right, #fbbf24, #f59e0b, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}

/* Section Titles */
.section-title {
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(to right, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Card Titles */
.card-title {
  font-size: 1.5rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Body Text */
.body-text {
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}
```

---

## 🃏 Card System

### Epic Game Cards
```css
.epic-game-card {
  /* Dimensions */
  min-width: 320px; /* Mobile */
  min-width: 420px; /* Desktop */
  height: 400px; /* Mobile */
  height: 500px; /* Desktop */
  
  /* 3D Effects */
  border-radius: 1.5rem;
  border: 2px solid rgba(255, 212, 0, 0.3);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(255, 215, 0, 0.2);
  
  /* Hover Animation */
  transition: all 0.5s ease;
  transform: scale(1);
}

.epic-game-card:hover {
  transform: scale(1.05) translateY(-8px);
  border-color: rgba(255, 212, 0, 0.6);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.6),
    0 0 30px rgba(255, 215, 0, 0.4);
}
```

### Status Badges
```css
/* Available Badge */
.badge-available {
  background: #22c55e;
  border: 1px solid #16a34a;
  color: white;
  font-weight: bold;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}

/* Coming Soon Badge */
.badge-coming-soon {
  background: #6b7280;
  border: 1px solid #4b5563;
  color: #d1d5db;
  font-weight: bold;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}
```

---

## 🎭 Button System

### Primary Action Button (Clash Royale Style)
```css
.cr-button-primary {
  background: linear-gradient(145deg, #4ade80, #22c55e, #16a34a);
  border: 2px solid #ffd700;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  padding: 1rem 2rem;
  
  /* Epic Shadow */
  box-shadow: 
    0 6px 20px rgba(34, 197, 94, 0.4),
    0 0 15px rgba(255, 215, 0, 0.3),
    inset 0 2px 0 rgba(255, 255, 255, 0.3),
    inset 0 -2px 0 rgba(0, 0, 0, 0.2);
  
  /* Animation */
  transform: translateY(0);
  transition: all 0.2s ease;
}

.cr-button-primary:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 
    0 8px 25px rgba(34, 197, 94, 0.6),
    0 0 20px rgba(255, 215, 0, 0.5);
}

.cr-button-primary:active {
  transform: translateY(1px) scale(0.95);
}
```

### Secondary Button
```css
.button-secondary {
  border: 2px solid rgba(255, 212, 0, 0.5);
  background: transparent;
  color: #fbbf24;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.button-secondary:hover {
  border-color: #fbbf24;
  background: rgba(255, 212, 0, 0.1);
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 212, 0, 0.25);
}
```

---

## ✨ Animation Library

### Hero Animations
```css
/* Glowing Text Effect */
@keyframes heroGlow {
  0%, 100% { 
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }
  50% { 
    text-shadow: 0 0 40px rgba(255, 215, 0, 0.8);
  }
}

/* Scale In Animation */
@keyframes scaleIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Floating Animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```

### Particle Effects
```css
/* Floating Particles */
@keyframes particleFloat {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  33% { 
    transform: translateY(-30px) rotate(120deg);
    opacity: 0.7;
  }
  66% { 
    transform: translateY(-60px) rotate(240deg);
    opacity: 0.4;
  }
}
```

### Shine Effects
```css
/* Card Shine Animation */
.shine-effect::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.1), 
    transparent
  );
  transform: translateX(-200%);
  transition: transform 1s ease-out;
}

.shine-effect:hover::before {
  transform: translateX(200%);
}
```

---

## 🎪 Background Effects

### Epic Background Layers
```css
/* Layer 1: Base Gradient */
.bg-layer-1 {
  background: linear-gradient(135deg, 
    #1a1a2e 0%, 
    #16213e 25%, 
    #0f3460 50%, 
    #0e1f3c 75%, 
    #1a1a2e 100%
  );
}

/* Layer 2: Color Overlay */
.bg-layer-2 {
  background: linear-gradient(to bottom right, 
    rgba(79, 70, 229, 0.4), 
    rgba(147, 51, 234, 0.4), 
    rgba(236, 72, 153, 0.4)
  );
}

/* Layer 3: Glow Orbs */
.glow-orb-yellow {
  width: 24rem;
  height: 24rem;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 50%;
  filter: blur(3rem);
  animation: pulse 3s ease-in-out infinite;
}

.glow-orb-blue {
  width: 16rem;
  height: 16rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 50%;
  filter: blur(3rem);
  animation: pulse 3s ease-in-out infinite;
  animation-delay: 1s;
}
```

---

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
.responsive-element {
  /* Mobile (default) */
  font-size: 1rem;
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .responsive-element {
    font-size: 1.25rem;
    padding: 1.5rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .responsive-element {
    font-size: 1.5rem;
    padding: 2rem;
  }
}
```

### Mobile Optimizations
```css
/* Hide complex animations on mobile */
@media (max-width: 768px) {
  .epic-particle {
    display: none;
  }
  
  .epic-title {
    font-size: 3rem !important;
    line-height: 1.1;
  }
  
  .epic-game-card {
    min-width: 320px !important;
    height: 400px !important;
  }
}
```

---

## 🏗️ Component Structure

### Header Component
```tsx
// Epic Header mit Logo, Navigation, Sprachschalter
<header className="relative z-20 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-90" />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
  
  {/* Animated glow effects */}
  <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
  
  {/* Content */}
</header>
```

### Game Card Component
```tsx
// Epic Game Card mit 3D-Effekten
<div className="epic-game-card group snap-center min-w-[320px] sm:min-w-[420px]">
  {/* Background Layers */}
  <div className="absolute inset-0 bg-gradient-to-br ${gradient} opacity-90" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
  
  {/* Glow Effect */}
  <div className="absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-20 group-hover:opacity-40" />
  
  {/* Content */}
</div>
```

---

## 🎯 Best Practices

### Performance
- ✅ Verwende `transform` statt `left/top` für Animationen
- ✅ Nutze `will-change` für animierte Elemente
- ✅ Verstecke komplexe Animationen auf Mobile
- ✅ Optimiere Bilder für verschiedene Bildschirmgrößen

### Accessibility
- ✅ Genügend Kontrast für Text (4.5:1 minimum)
- ✅ Focus-States für alle interaktiven Elemente
- ✅ Alt-Texte für alle Bilder
- ✅ Semantische HTML-Struktur

### Consistency
- ✅ Verwende das Clash Royale Farbschema konsistent
- ✅ Halte Animationszeiten einheitlich (0.2s-0.5s)
- ✅ Nutze die definierten Abstände (4px, 8px, 16px, 32px)
- ✅ Verwende einheitliche Border-Radius Werte

---

## 🚀 Future Enhancements

### Planned Features
- [ ] Particle System mit Canvas/WebGL
- [ ] Sound Effects für Hover/Click
- [ ] Parallax Scrolling Effects
- [ ] Custom Loading Animations
- [ ] Dark/Light Mode Toggle
- [ ] Theme Customization

### Animation Ideas
- [ ] Card Flip Animations
- [ ] Confetti Effects bei Spielstart
- [ ] Pulsing Glow für Call-to-Actions
- [ ] Morphing Icons
- [ ] Liquid Background Effects

---

## 📝 Notes

**Entwickelt mit ❤️ für die ultimative Trinkspiel-Experience!**

- Alle Farben sind in HSL definiert für bessere Manipulation
- Animationen sind GPU-beschleunigt für smooth Performance
- Mobile-First Approach für beste UX auf allen Geräten
- Clash Royale/Brawl Stars Ästhetik für Gaming-Feel

**Version:** 1.0.0  
**Letzte Aktualisierung:** $(date)  
**Designer:** Claude Sonnet 4 🎮

---

*"Das ist nicht nur ein Design, das ist eine Erfahrung!" - Habibi 2024* 🔥