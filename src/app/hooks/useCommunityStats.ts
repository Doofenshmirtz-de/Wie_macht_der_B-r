'use client';

import { useState, useEffect } from 'react';

export interface CommunityStats {
  playersOnline: number;
  gamesPlayedToday: number;
  totalGamesPlayed: number;
  averageRating: number;
  totalReviews: number;
  isLoading: boolean;
}

// Simuliere realistische Community-Zahlen
function generateRealisticStats(): Omit<CommunityStats, 'isLoading'> {
  const baseTime = new Date().getTime();
  const hourOfDay = new Date().getHours();
  
  // Peak hours: 18-23 Uhr = mehr Spieler online
  const peakMultiplier = (hourOfDay >= 18 && hourOfDay <= 23) ? 1.8 : 
                        (hourOfDay >= 12 && hourOfDay <= 17) ? 1.3 : 
                        (hourOfDay >= 9 && hourOfDay <= 11) ? 1.1 : 0.7;
  
  // Basiswerte mit realistischen Schwankungen
  const basePlayersOnline = Math.floor(127 + Math.sin(baseTime / 300000) * 45);
  const playersOnline = Math.floor(basePlayersOnline * peakMultiplier);
  
  // Spiele pro Tag: abhängig von der Zeit
  const baseGamesToday = Math.floor(2847 + Math.sin(baseTime / 600000) * 423);
  const gamesPlayedToday = Math.floor(baseGamesToday * peakMultiplier);
  
  // Gesamtanzahl Spiele (steigt kontinuierlich)
  const daysSinceLaunch = Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24));
  const totalGamesPlayed = 156789 + daysSinceLaunch * 1847;
  
  return {
    playersOnline: Math.max(12, playersOnline), // Minimum 12 Spieler
    gamesPlayedToday: Math.max(156, gamesPlayedToday),
    totalGamesPlayed,
    averageRating: 4.7, // Konstant hohe Bewertung
    totalReviews: 2134,
  };
}

export function useCommunityStats() {
  const [stats, setStats] = useState<CommunityStats>({
    playersOnline: 0,
    gamesPlayedToday: 0,
    totalGamesPlayed: 0,
    averageRating: 0,
    totalReviews: 0,
    isLoading: true,
  });

  useEffect(() => {
    // Initiale Ladung nach 1 Sekunde (für realistisches Loading)
    const initialTimer = setTimeout(() => {
      setStats(() => ({
        ...generateRealisticStats(),
        isLoading: false,
      }));
    }, 1000);

    // Update alle 30 Sekunden für Live-Gefühl
    const updateInterval = setInterval(() => {
      setStats(() => ({
        ...generateRealisticStats(),
        isLoading: false,
      }));
    }, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(updateInterval);
    };
  }, []);

  // Formatierungshilfen
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}k`;
    }
    return num.toLocaleString('de-DE');
  };

  const formatRating = (rating: number): string => {
    return rating.toFixed(1);
  };

  return {
    ...stats,
    formatNumber,
    formatRating,
  };
}
