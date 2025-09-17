'use client';

import { useCommunityStats } from '../hooks/useCommunityStats';
import { UsersIcon, GameIcon, TrophyIcon, StarIcon } from './EnhancedIcons';
import { useParams } from 'next/navigation';

interface CommunityStatsProps {
  variant?: 'homepage' | 'compact' | 'footer';
  className?: string;
}

export function CommunityStats({ variant = 'homepage', className = '' }: CommunityStatsProps) {
  const { 
    playersOnline, 
    gamesPlayedToday, 
    totalGamesPlayed, 
    averageRating, 
    totalReviews,
    isLoading,
    formatNumber,
    formatRating 
  } = useCommunityStats();
  
  const params = useParams();
  const locale = (params as { locale?: string })?.locale === 'en' ? 'en' : 'de';

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-4 text-sm ${className}`}>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-white/70">
            {isLoading ? '...' : formatNumber(playersOnline)} online
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">⭐</span>
          <span className="text-white/70">
            {isLoading ? '...' : formatRating(averageRating)} ({formatNumber(totalReviews)})
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`text-center space-y-2 ${className}`}>
        <div className="flex justify-center items-center gap-3 text-sm text-white/60">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>{isLoading ? '...' : formatNumber(playersOnline)} online</span>
          </div>
          <div>•</div>
          <div>{isLoading ? '...' : formatNumber(totalGamesPlayed)} {locale === 'en' ? 'games played' : 'Spiele gespielt'}</div>
        </div>
      </div>
    );
  }

  // Homepage variant
  return (
    <section className={`relative py-16 ${className}`}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30 blur-3xl"></div>
      
      <div className="relative mx-auto max-w-screen-lg px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            🌟 {locale === 'en' ? 'OUR COMMUNITY' : 'UNSERE COMMUNITY'}
          </h2>
          <p className="text-lg text-white/80">
            {locale === 'en' ? 'Thousands of players are already having fun - join in!' : 'Tausende Spieler haben bereits ihren Spaß - sei dabei!'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Spieler Online */}
          <div className="card-elevated p-6 text-center group stat-card">
            <div className="flex items-center justify-center gap-2 mb-3">
              <UsersIcon size={24} className="text-green-400" />
              <span className="text-green-400 text-sm font-semibold">LIVE</span>
            </div>
            <div className="text-3xl font-black text-white mb-2">
              {isLoading ? (
                <div className="animate-pulse bg-white/20 h-8 rounded"></div>
              ) : (
                formatNumber(playersOnline)
              )}
            </div>
            <p className="text-white/70 text-sm font-semibold">
              {locale === 'en' ? 'Players online' : 'Spieler online'}
            </p>
          </div>

          {/* Spiele heute */}
          <div className="card-elevated p-6 text-center group stat-card">
            <div className="flex justify-center mb-3">
              <GameIcon size={32} className="text-yellow-400" />
            </div>
            <div className="text-3xl font-black text-white mb-2">
              {isLoading ? (
                <div className="animate-pulse bg-white/20 h-8 rounded"></div>
              ) : (
                formatNumber(gamesPlayedToday)
              )}
            </div>
            <p className="text-white/70 text-sm font-semibold">
              {locale === 'en' ? 'Games today' : 'Spiele heute'}
            </p>
          </div>

          {/* Gesamt Spiele */}
          <div className="card-elevated p-6 text-center group stat-card">
            <div className="flex justify-center mb-3">
              <TrophyIcon size={32} className="text-yellow-400" />
            </div>
            <div className="text-3xl font-black text-white mb-2">
              {isLoading ? (
                <div className="animate-pulse bg-white/20 h-8 rounded"></div>
              ) : (
                formatNumber(totalGamesPlayed)
              )}
            </div>
            <p className="text-white/70 text-sm font-semibold">
              {locale === 'en' ? 'Total played' : 'Gesamt gespielt'}
            </p>
          </div>

          {/* Bewertungen */}
          <div className="card-elevated p-6 text-center group stat-card">
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  size={20}
                  filled={i < Math.floor(averageRating)}
                  className="text-yellow-400 mx-1"
                />
              ))}
            </div>
            <div className="text-3xl font-black text-white mb-2">
              {isLoading ? (
                <div className="animate-pulse bg-white/20 h-8 rounded"></div>
              ) : (
                formatRating(averageRating)
              )}
            </div>
            <p className="text-white/70 text-sm font-semibold">
              {formatNumber(totalReviews)} {locale === 'en' ? 'reviews' : 'Bewertungen'}
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-yellow-300 font-bold text-lg">
            💪 {locale === 'en' ? 'Become part of the best party games community!' : 'Werde Teil der besten Partyspiele-Community!'}
          </p>
        </div>
      </div>
    </section>
  );
}
