'use client';

import { useState, useMemo } from 'react';
import type { GameCard } from '../lib/game-actions';

export interface SearchFilters {
  searchTerm: string;
  difficulty?: string;
  minPlayers?: number;
  maxPlayers?: number;
}

export function useGameSearch(games: GameCard[]) {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
  });

  const filteredGames = useMemo(() => {
    let result = games;

    // Text-basierte Suche
    if (filters.searchTerm.trim()) {
      const searchTerm = filters.searchTerm.toLowerCase().trim();
      result = result.filter(game => 
        game.title.toLowerCase().includes(searchTerm) ||
        game.description.toLowerCase().includes(searchTerm) ||
        game.subtitle.toLowerCase().includes(searchTerm) ||
        game.players.toLowerCase().includes(searchTerm) ||
        game.difficulty.toLowerCase().includes(searchTerm)
      );
    }

    // Schwierigkeit Filter
    if (filters.difficulty && filters.difficulty !== 'alle') {
      result = result.filter(game => 
        game.difficulty.toLowerCase() === filters.difficulty?.toLowerCase()
      );
    }

    // Spieleranzahl Filter
    if (filters.minPlayers || filters.maxPlayers) {
      result = result.filter(game => {
        // Extrahiere Zahlen aus "2-8 Spieler" Format
        const playerMatch = game.players.match(/(\d+)-(\d+)/);
        if (playerMatch) {
          const minGame = parseInt(playerMatch[1]);
          const maxGame = parseInt(playerMatch[2]);
          
          if (filters.minPlayers && maxGame < filters.minPlayers) return false;
          if (filters.maxPlayers && minGame > filters.maxPlayers) return false;
          
          return true;
        }
        return true;
      });
    }

    // Sortiere nach Priorität
    return result.sort((a, b) => a.priority - b.priority);
  }, [games, filters]);

  const updateSearchTerm = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const updateFilter = (key: keyof SearchFilters, value: string | number | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ searchTerm: '' });
  };

  const hasActiveFilters = filters.searchTerm.trim() !== '' || 
                          filters.difficulty !== undefined || 
                          filters.minPlayers !== undefined || 
                          filters.maxPlayers !== undefined;

  return {
    filteredGames,
    filters,
    updateSearchTerm,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    resultCount: filteredGames.length,
    totalCount: games.length,
  };
}
