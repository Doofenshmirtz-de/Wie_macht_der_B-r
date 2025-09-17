'use client';

import { useEffect, useState } from 'react';

export function useAccessibility() {
  const [systemReducedMotion, setSystemReducedMotion] = useState(false);
  const [motionOverride, setMotionOverride] = useState<null | boolean>(null); // null = System
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal');

  // Effektive Einstellung, die im UI angezeigt und in CSS angewandt wird
  const reducedMotion = motionOverride !== null ? motionOverride : systemReducedMotion;

  useEffect(() => {
    // Prüfe System-Präferenzen
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    
    setSystemReducedMotion(motionQuery.matches);
    setHighContrast(contrastQuery.matches);

    // Lade gespeicherte Einstellungen
    const savedFontSize = localStorage.getItem('accessibility-font-size');
    if (savedFontSize) setFontSize(savedFontSize);

    const savedHighContrast = localStorage.getItem('accessibility-high-contrast');
    if (savedHighContrast) setHighContrast(savedHighContrast === 'true');

    const savedMotionPref = localStorage.getItem('accessibility-reduced-motion');
    if (savedMotionPref === 'true') setMotionOverride(true);
    else if (savedMotionPref === 'false') setMotionOverride(false);
    else setMotionOverride(null); // 'system' oder nicht gesetzt

    // Listen für System-Änderungen (wir folgen nur, wenn kein Override aktiv ist)
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setSystemReducedMotion(e.matches);
    };
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

  // Zyklen: System -> Reduziert -> Normal -> System
  const cycleMotionPreference = () => {
    let next: null | boolean;
    if (motionOverride === null) {
      next = true; // Reduziert
    } else if (motionOverride === true) {
      next = false; // Normal
    } else {
      next = null; // Zurück zu System
    }
    setMotionOverride(next);
    if (next === null) localStorage.setItem('accessibility-reduced-motion', 'system');
    else localStorage.setItem('accessibility-reduced-motion', String(next));
  };

  const changeFontSize = (size: string) => {
    setFontSize(size);
    localStorage.setItem('accessibility-font-size', size);
  };

  const resetToDefaults = () => {
    setHighContrast(false);
    setFontSize('normal');
    setMotionOverride(null);
    localStorage.removeItem('accessibility-high-contrast');
    localStorage.removeItem('accessibility-font-size');
    localStorage.setItem('accessibility-reduced-motion', 'system');
  };

  return {
    // Effektive Werte
    reducedMotion,
    highContrast,
    fontSize,
    // UI/Toggles
    toggleHighContrast,
    changeFontSize,
    resetToDefaults,
    // Motion-Steuerung
    cycleMotionPreference,
    motionMode: motionOverride === null ? 'system' : (motionOverride ? 'reduced' : 'normal'),
  };
}
