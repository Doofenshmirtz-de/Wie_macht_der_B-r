"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
  bombTimerRange: { min: number; max: number };
  setBombTimerRange: (range: { min: number; max: number }) => void;
  getRandomBombTimer: () => number;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [bombTimerRange, setBombTimerRange] = useState({ min: 30, max: 120 });

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('wiemachtderbaer-settings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          if (parsed.bombTimerRange) {
            setBombTimerRange(parsed.bombTimerRange);
          }
        } catch (error) {
          console.warn('Failed to load settings from localStorage:', error);
        }
      }
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const settings = { bombTimerRange };
      localStorage.setItem('wiemachtderbaer-settings', JSON.stringify(settings));
    }
  }, [bombTimerRange]);

  // Generate a random bomb timer within the set range
  const getRandomBombTimer = () => {
    const { min, max } = bombTimerRange;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const contextValue: SettingsContextType = {
    bombTimerRange,
    setBombTimerRange,
    getRandomBombTimer,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}
