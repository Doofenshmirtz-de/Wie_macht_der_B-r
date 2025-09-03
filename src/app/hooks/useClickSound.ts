"use client";

import { useRef, useCallback } from 'react';

export function useClickSound() {
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on first use
  const initializeAudio = useCallback(() => {
    if (!clickAudioRef.current && typeof window !== 'undefined') {
      clickAudioRef.current = new Audio('/click.mp3');
      clickAudioRef.current.volume = 0.3; // Set a reasonable volume
      clickAudioRef.current.preload = 'auto';
    }
  }, []);

  // Play click sound
  const playClick = useCallback(() => {
    initializeAudio();
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0; // Reset to start
      clickAudioRef.current.play().catch(console.warn); // Catch any audio policy errors
    }
  }, [initializeAudio]);

  return { playClick };
}

// Global click sound function that can be attached to any button
export function addClickSoundToButton(element: HTMLElement) {
  if (typeof window === 'undefined') return;
  
  const playClickSound = () => {
    const audio = new Audio('/click.mp3');
    audio.volume = 0.3;
    audio.currentTime = 0;
    audio.play().catch(console.warn);
  };

  element.addEventListener('click', playClickSound);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('click', playClickSound);
  };
}
