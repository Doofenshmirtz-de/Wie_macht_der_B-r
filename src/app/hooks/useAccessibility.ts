'use client';

import { useEffect, useState } from 'react';

export function useAccessibility() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal');

  useEffect(() => {
    // Prüfe System-Präferenzen
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    
    setReducedMotion(motionQuery.matches);
    setHighContrast(contrastQuery.matches);

    // Lade gespeicherte Einstellungen
    const savedFontSize = localStorage.getItem('accessibility-font-size');
    if (savedFontSize) setFontSize(savedFontSize);

    const savedHighContrast = localStorage.getItem('accessibility-high-contrast');
    if (savedHighContrast) setHighContrast(savedHighContrast === 'true');

    // Listen für System-Änderungen
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const handleContrastChange = (e: MediaQueryListEvent) => setHighContrast(e.matches);

    motionQuery.addEventListener('change', handleMotionChange);
    contrastQuery.addEventListener('change', handleContrastChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, []);

  useEffect(() => {
    // Wende Accessibility-Klassen auf document an
    const root = document.documentElement;
    
    // Reduzierte Motion
    if (reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Hoher Kontrast
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Schriftgröße
    root.classList.remove('font-small', 'font-normal', 'font-large', 'font-xl');
    root.classList.add(`font-${fontSize}`);

  }, [reducedMotion, highContrast, fontSize]);

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('accessibility-high-contrast', newValue.toString());
  };

  const changeFontSize = (size: string) => {
    setFontSize(size);
    localStorage.setItem('accessibility-font-size', size);
  };

  const resetToDefaults = () => {
    setHighContrast(false);
    setFontSize('normal');
    localStorage.removeItem('accessibility-high-contrast');
    localStorage.removeItem('accessibility-font-size');
  };

  return {
    reducedMotion,
    highContrast,
    fontSize,
    toggleHighContrast,
    changeFontSize,
    resetToDefaults,
  };
}
