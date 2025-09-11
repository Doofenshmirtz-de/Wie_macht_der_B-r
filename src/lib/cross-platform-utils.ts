/**
 * Cross-Platform Utilities für "Wie macht der Bär"
 * 
 * Diese Datei enthält Utility-Funktionen, die sicherstellen,
 * dass das Projekt sowohl auf Windows als auch auf macOS
 * identisch funktioniert.
 */

// Platform Detection
export const isWindows = typeof process !== 'undefined' && process.platform === 'win32';
export const isMacOS = typeof process !== 'undefined' && process.platform === 'darwin';
export const isLinux = typeof process !== 'undefined' && process.platform === 'linux';

// Font Stack Utilities
export const getFontStack = (type: 'primary' | 'heading' | 'mono' = 'primary') => {
  const fontStacks = {
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
  };

  return fontStacks[type].join(', ');
};

// CSS Class Utilities
export const getCrossPlatformClasses = () => {
  const classes = {
    // Scrollbar hiding
    hideScrollbar: 'scrollbar-width-none overflow-x-auto',
    // Touch optimizations
    touchOptimized: 'touch-manipulation select-none',
    // Cross-platform focus
    focusRing: 'focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2',
    // Cross-platform animations
    smoothTransition: 'transition-all duration-300 ease-in-out',
    // Cross-platform shadows
    cardShadow: 'shadow-lg hover:shadow-xl',
    // Cross-platform borders
    cardBorder: 'border border-white/10 rounded-xl'
  };

  return classes;
};

// Browser Detection
export const getBrowserInfo = () => {
  if (typeof window === 'undefined') return { name: 'server', version: 'unknown' };

  const userAgent = window.navigator.userAgent;
  
  if (userAgent.includes('Chrome')) {
    return { name: 'chrome', version: userAgent.match(/Chrome\/(\d+)/)?.[1] || 'unknown' };
  }
  if (userAgent.includes('Firefox')) {
    return { name: 'firefox', version: userAgent.match(/Firefox\/(\d+)/)?.[1] || 'unknown' };
  }
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    return { name: 'safari', version: userAgent.match(/Version\/(\d+)/)?.[1] || 'unknown' };
  }
  if (userAgent.includes('Edge')) {
    return { name: 'edge', version: userAgent.match(/Edge\/(\d+)/)?.[1] || 'unknown' };
  }
  
  return { name: 'unknown', version: 'unknown' };
};

// CSS Property Fallbacks
export const getCSSFallbacks = (property: string, value: string) => {
  const fallbacks: Record<string, string[]> = {
    'background-clip': ['-webkit-background-clip', 'background-clip'],
    'text-fill-color': ['-webkit-text-fill-color', 'color'],
    'appearance': ['-webkit-appearance', '-moz-appearance', 'appearance'],
    'user-select': ['-webkit-user-select', '-moz-user-select', '-ms-user-select', 'user-select'],
    'touch-action': ['-webkit-touch-callout', 'touch-action'],
    'backdrop-filter': ['-webkit-backdrop-filter', 'backdrop-filter']
  };

  const prefixes = fallbacks[property] || [property];
  return prefixes.map(prop => `${prop}: ${value}`).join('; ');
};

// Responsive Breakpoints
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Cross-Platform Media Queries
export const getMediaQuery = (breakpoint: keyof typeof breakpoints, direction: 'min' | 'max' = 'min') => {
  return `@media (${direction}-width: ${breakpoints[breakpoint]})`;
};

// Device Detection
export const getDeviceInfo = () => {
  if (typeof window === 'undefined') return { type: 'server', isMobile: false, isTouch: false };

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return {
    type: isMobile ? 'mobile' : 'desktop',
    isMobile,
    isTouch
  };
};

// Performance Optimizations
export const getPerformanceClasses = () => {
  const device = getDeviceInfo();
  
  if (device.isMobile) {
    return {
      // Reduzierte Animationen auf Mobile
      animation: 'animate-none',
      // Optimierte Schatten
      shadow: 'shadow-sm',
      // Reduzierte Transparenz
      backdrop: 'backdrop-blur-sm'
    };
  }
  
  return {
    animation: 'animate-pulse',
    shadow: 'shadow-xl',
    backdrop: 'backdrop-blur-lg'
  };
};

// Export all utilities
const crossPlatformUtils = {
  isWindows,
  isMacOS,
  isLinux,
  getFontStack,
  getCrossPlatformClasses,
  getBrowserInfo,
  getCSSFallbacks,
  breakpoints,
  getMediaQuery,
  getDeviceInfo,
  getPerformanceClasses
};

export default crossPlatformUtils;
