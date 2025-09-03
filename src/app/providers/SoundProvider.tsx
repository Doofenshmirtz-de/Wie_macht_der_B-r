"use client";

import { createContext, useContext, useEffect, useRef } from 'react';

interface SoundContextType {
  playClick: () => void;
  playTick: () => void;
  playExplosion: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}

interface SoundProviderProps {
  children: React.ReactNode;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const tickAudioRef = useRef<HTMLAudioElement | null>(null);
  const explosionAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio objects
  useEffect(() => {
    if (typeof window === 'undefined') return;

    clickAudioRef.current = new Audio('/click.mp3');
    tickAudioRef.current = new Audio('/tick.mp3');
    explosionAudioRef.current = new Audio('/explosion.mp3');

    // Set volumes
    clickAudioRef.current.volume = 0.4;
    tickAudioRef.current.volume = 0.6;
    explosionAudioRef.current.volume = 0.8;

    // Preload
    clickAudioRef.current.preload = 'auto';
    tickAudioRef.current.preload = 'auto';
    explosionAudioRef.current.preload = 'auto';
  }, []);

  // Auto-attach click sounds to all buttons
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const playClickSound = () => {
      if (clickAudioRef.current) {
        clickAudioRef.current.currentTime = 0;
        clickAudioRef.current.play().catch(console.warn);
      }
    };

    // Find all buttons with cr-button classes
    const attachClickSounds = () => {
      const buttons = document.querySelectorAll('.cr-button-primary, .cr-button-danger, button');
      
      buttons.forEach((button) => {
        const element = button as HTMLElement;
        // Avoid duplicate event listeners
        if (!element.dataset.soundAttached) {
          element.addEventListener('click', playClickSound);
          element.dataset.soundAttached = 'true';
        }
      });
    };

    // Initial attachment
    attachClickSounds();

    // Re-attach when DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      setTimeout(attachClickSounds, 100); // Small delay to ensure DOM is ready
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      // Cleanup event listeners
      const buttons = document.querySelectorAll('[data-sound-attached="true"]');
      buttons.forEach((button) => {
        button.removeEventListener('click', playClickSound);
        delete (button as HTMLElement).dataset.soundAttached;
      });
    };
  }, []);

  const playClick = () => {
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(console.warn);
    }
  };

  const playTick = () => {
    if (tickAudioRef.current) {
      tickAudioRef.current.currentTime = 0;
      tickAudioRef.current.play().catch(console.warn);
    }
  };

  const playExplosion = () => {
    if (explosionAudioRef.current) {
      explosionAudioRef.current.currentTime = 0;
      explosionAudioRef.current.play().catch(console.warn);
    }
  };

  const contextValue: SoundContextType = {
    playClick,
    playTick,
    playExplosion,
  };

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
}
