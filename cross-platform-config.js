/**
 * Cross-Platform Configuration für "Wie macht der Bär"
 * 
 * Diese Datei enthält Konfigurationen, die sicherstellen,
 * dass das Projekt sowohl auf Windows als auch auf macOS
 * identisch funktioniert.
 */

const crossPlatformConfig = {
  // Font-Familien mit Cross-Platform-Fallbacks
  fonts: {
    primary: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Helvetica Neue',
      'Arial',
      'sans-serif'
    ],
    heading: [
      'Clash Display',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Helvetica Neue',
      'Arial',
      'sans-serif'
    ],
    mono: [
      'JetBrains Mono',
      'Courier New',
      'monospace'
    ]
  },

  // CSS-Eigenschaften mit Cross-Platform-Fallbacks
  css: {
    // Gradient Text Fallbacks
    gradientText: {
      webkit: '-webkit-background-clip: text; -webkit-text-fill-color: transparent;',
      standard: 'background-clip: text; color: transparent;',
      fallback: 'color: #ffd700;' // Fallback-Farbe für ältere Browser
    },

    // Scrollbar Styling
    scrollbar: {
      webkit: '::-webkit-scrollbar { display: none; }',
      firefox: 'scrollbar-width: none;',
      ie: '-ms-overflow-style: none;'
    },

    // Touch Optimizations
    touch: {
      webkit: '-webkit-tap-highlight-color: transparent;',
      webkitTextSize: '-webkit-text-size-adjust: 100%;',
      webkitTouch: '-webkit-touch-callout: none;'
    }
  },

  // Platform-spezifische Erkennung
  platform: {
    isWindows: typeof process !== 'undefined' && process.platform === 'win32',
    isMacOS: typeof process !== 'undefined' && process.platform === 'darwin',
    isLinux: typeof process !== 'undefined' && process.platform === 'linux'
  },

  // Development-spezifische Einstellungen
  development: {
    // Hot Reload Konfiguration
    hotReload: true,
    
    // Cross-Platform Path Handling
    pathSeparator: process.platform === 'win32' ? '\\' : '/',
    
    // Case-sensitive File System Detection
    caseSensitive: process.platform !== 'win32'
  }
};

module.exports = crossPlatformConfig;
