'use client';

import { useState } from 'react';
import { useAnalytics } from '../providers/AnalyticsProvider';
import { SearchIcon } from './EnhancedIcons';
import type { SearchFilters } from '../hooks/useGameSearch';

interface GameSearchProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange: (key: keyof SearchFilters, value: string | number | undefined) => void;
  onClearFilters: () => void;
  filters: SearchFilters;
  resultCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
}

export default function GameSearch({
  onSearch,
  onFilterChange,
  onClearFilters,
  filters,
  resultCount,
  totalCount,
  hasActiveFilters,
}: GameSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { trackEvent } = useAnalytics();

  const handleSearchChange = (value: string) => {
    onSearch(value);
    
    // Analytics tracking
    if (value.trim().length >= 3) {
      trackEvent('game_search', {
        search_term: value,
        event_category: 'engagement',
      });
    }
  };

  const handleFilterToggle = () => {
    setIsExpanded(!isExpanded);
    trackEvent('search_filter_toggle', {
      expanded: !isExpanded,
      event_category: 'engagement',
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      {/* Haupt-Suchfeld */}
      <div className="relative">
        <div className="relative card-elevated p-6">
          {/* Search Icon & Input */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <SearchIcon size={32} className="text-yellow-400" />
            </div>
            
            <div className="flex-1">
              <input
                type="text"
                placeholder="Suche nach Spielen... (z.B. 'Bomb', 'Wahrheit', '4 Spieler')"
                value={filters.searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-transparent text-white placeholder-white/60 body-lg font-semibold border-none outline-none"
                autoComplete="off"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={handleFilterToggle}
              className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
            >
              🎯 Filter
            </button>

            {/* Clear Button */}
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="flex-shrink-0 text-red-400 hover:text-red-300 transition-colors duration-200"
                title="Filter zurücksetzen"
              >
                <span className="text-2xl">✖️</span>
              </button>
            )}
          </div>

          {/* Ergebnis-Anzeige */}
          {filters.searchTerm.trim() && (
            <div className="mt-4 text-center">
              <p className="text-yellow-300 font-bold">
                {resultCount} von {totalCount} Spielen gefunden
                {resultCount === 0 && (
                  <span className="block text-white/60 text-sm mt-1">
                    Versuche es mit anderen Suchbegriffen! 🎮
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Erweiterte Filter */}
        {isExpanded && (
          <div className="mt-4 cr-card p-6 animate-scale-in">
            <h3 className="text-xl font-bold text-yellow-300 mb-4 text-center">
              🎯 Erweiterte Filter
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Schwierigkeit Filter */}
              <div>
                <label className="block text-white/80 font-semibold mb-2">
                  Schwierigkeit
                </label>
                <select
                  value={filters.difficulty || 'alle'}
                  onChange={(e) => onFilterChange('difficulty', e.target.value === 'alle' ? undefined : e.target.value)}
                  className="cr-select-enhanced w-full p-3"
                >
                  <option value="alle">Alle</option>
                  <option value="einfach">Einfach</option>
                  <option value="mittel">Mittel</option>
                  <option value="schwer">Schwer</option>
                </select>
              </div>

              {/* Min Spieler */}
              <div>
                <label className="block text-white/80 font-semibold mb-2">
                  Min. Spieler
                </label>
                <select
                  value={filters.minPlayers || ''}
                  onChange={(e) => onFilterChange('minPlayers', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="cr-select-enhanced w-full p-3"
                >
                  <option value="">Egal</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Max Spieler */}
              <div>
                <label className="block text-white/80 font-semibold mb-2">
                  Max. Spieler
                </label>
                <select
                  value={filters.maxPlayers || ''}
                  onChange={(e) => onFilterChange('maxPlayers', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="cr-select-enhanced w-full p-3"
                >
                  <option value="">Egal</option>
                  <option value="4">bis 4</option>
                  <option value="6">bis 6</option>
                  <option value="8">bis 8</option>
                  <option value="12">bis 12</option>
                </select>
              </div>
            </div>

            {/* Quick Filter Buttons */}
            <div className="mt-6">
              <p className="text-white/80 font-semibold mb-3 text-center">Beliebte Filter:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => handleSearchChange('2 spieler')}
                  className="cr-button-primary px-4 py-2 text-sm"
                >
                  👥 Zu zweit
                </button>
                <button
                  onClick={() => handleSearchChange('party')}
                  className="cr-button-primary px-4 py-2 text-sm"
                >
                  🎉 Partyspiele
                </button>
                <button
                  onClick={() => handleSearchChange('wahrheit')}
                  className="cr-button-primary px-4 py-2 text-sm"
                >
                  🤫 Wahrheit
                </button>
                <button
                  onClick={() => handleSearchChange('wörter')}
                  className="cr-button-primary px-4 py-2 text-sm"
                >
                  📝 Wortspiele
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
