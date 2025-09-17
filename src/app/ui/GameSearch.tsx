'use client';

import { useState } from 'react';
import { useAnalytics } from '../providers/AnalyticsProvider';
import { SearchIcon } from './EnhancedIcons';
import type { SearchFilters } from '../hooks/useGameSearch';
import { useParams } from 'next/navigation';

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
  const params = useParams();
  const locale = (params as { locale?: string })?.locale === 'en' ? 'en' : 'de';

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
                placeholder={locale === 'en' ? "Search for games... (e.g. 'Bomb', 'Truth', '4 players')" : "Suche nach Spielen... (z.B. 'Bomb', 'Wahrheit', '4 Spieler')"}
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
              🎯 {locale === 'en' ? 'Filter' : 'Filter'}
            </button>

            {/* Clear Button */}
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="flex-shrink-0 text-red-400 hover:text-red-300 transition-colors duration-200"
                title={locale === 'en' ? 'Reset filters' : 'Filter zurücksetzen'}
              >
                <span className="text-2xl">✖️</span>
              </button>
            )}
          </div>

          {/* Ergebnis-Anzeige */}
          {filters.searchTerm.trim() && (
            <div className="mt-4 text-center">
              <p className="text-yellow-300 font-bold">
                {locale === 'en' 
                  ? `${resultCount} of ${totalCount} games found`
                  : `${resultCount} von ${totalCount} Spielen gefunden`
                }
                {resultCount === 0 && (
                  <span className="block text-white/60 text-sm mt-1">
                    {locale === 'en' 
                      ? 'Try different search terms! 🎮'
                      : 'Versuche es mit anderen Suchbegriffen! 🎮'
                    }
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
              🎯 {locale === 'en' ? 'Advanced Filters' : 'Erweiterte Filter'}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Schwierigkeit Filter */}
              <div>
                <label className="block text-white/80 font-semibold mb-2">
                  {locale === 'en' ? 'Difficulty' : 'Schwierigkeit'}
                </label>
                <select
                  value={filters.difficulty || 'alle'}
                  onChange={(e) => onFilterChange('difficulty', e.target.value === 'alle' ? undefined : e.target.value)}
                  className="cr-select-enhanced w-full p-3"
                >
                  <option value="alle">{locale === 'en' ? 'All' : 'Alle'}</option>
                  <option value="einfach">{locale === 'en' ? 'Easy' : 'Einfach'}</option>
                  <option value="mittel">{locale === 'en' ? 'Medium' : 'Mittel'}</option>
                  <option value="schwer">{locale === 'en' ? 'Hard' : 'Schwer'}</option>
                </select>
              </div>

              {/* Min Spieler */}
              <div>
                <label className="block text-white/80 font-semibold mb-2">
                  {locale === 'en' ? 'Min. Players' : 'Min. Spieler'}
                </label>
                <select
                  value={filters.minPlayers || ''}
                  onChange={(e) => onFilterChange('minPlayers', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="cr-select-enhanced w-full p-3"
                >
                  <option value="">{locale === 'en' ? 'Any' : 'Egal'}</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Max Spieler */}
              <div>
                <label className="block text-white/80 font-semibold mb-2">
                  {locale === 'en' ? 'Max. Players' : 'Max. Spieler'}
                </label>
                <select
                  value={filters.maxPlayers || ''}
                  onChange={(e) => onFilterChange('maxPlayers', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="cr-select-enhanced w-full p-3"
                >
                  <option value="">{locale === 'en' ? 'Any' : 'Egal'}</option>
                  <option value="4">{locale === 'en' ? 'up to 4' : 'bis 4'}</option>
                  <option value="6">{locale === 'en' ? 'up to 6' : 'bis 6'}</option>
                  <option value="8">{locale === 'en' ? 'up to 8' : 'bis 8'}</option>
                  <option value="12">{locale === 'en' ? 'up to 12' : 'bis 12'}</option>
                </select>
              </div>
            </div>

            {/* Quick Filter Buttons */}
            <div className="mt-6">
              <p className="text-white/80 font-semibold mb-3 text-center">{locale === 'en' ? 'Popular filters:' : 'Beliebte Filter:'}</p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => handleSearchChange(locale === 'en' ? '2 players' : '2 spieler')}
                  className="cr-button-primary px-4 py-2 text-sm"
                >
                  👥 {locale === 'en' ? 'Two players' : 'Zu zweit'}
                </button>
                <button
                  onClick={() => handleSearchChange('party')}
                  className="cr-button-primary px-4 py-2 text-sm"
                >
                  🎉 {locale === 'en' ? 'Party games' : 'Partyspiele'}
                </button>
                <button
                  onClick={() => handleSearchChange(locale === 'en' ? 'truth' : 'wahrheit')}
                  className="cr-button-primary px-4 py-2 text-sm"
                >
                  🤫 {locale === 'en' ? 'Truth' : 'Wahrheit'}
                </button>
                <button
                  onClick={() => handleSearchChange(locale === 'en' ? 'words' : 'wörter')}
                  className="cr-button-primary px-4 py-2 text-sm"
                >
                  📝 {locale === 'en' ? 'Word games' : 'Wortspiele'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
