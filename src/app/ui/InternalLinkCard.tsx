'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BombIcon, GameIcon } from './EnhancedIcons';

type ValidHref = "/game/bomb" | "/game/truthordare" | "/game/neverhaveiever" | "/faq" | "/blog";

interface InternalLinkCardProps {
  href: ValidHref;
  title: string;
  description: string;
  gameType: 'bomb' | 'neverhaveiever' | 'truthordare' | 'blog';
  keywords?: string[];
  className?: string;
}


export function InternalLinkCard({ 
  href, 
  title, 
  description, 
  gameType, 
  keywords = [],
  className = "" 
}: InternalLinkCardProps) {
  
  const getIcon = () => {
    switch (gameType) {
      case 'bomb':
        return <BombIcon size={24} className="text-orange-400" />;
      case 'blog':
        return <GameIcon size={24} className="text-blue-400" />;
      default:
        return <GameIcon size={24} className="text-white" />;
    }
  };

  const getThemeColor = () => {
    switch (gameType) {
      case 'bomb':
        return 'border-orange-400/30 hover:border-orange-400/60 text-orange-400';
      case 'neverhaveiever':
        return 'border-green-400/30 hover:border-green-400/60 text-green-400';
      case 'truthordare':
        return 'border-purple-400/30 hover:border-purple-400/60 text-purple-400';
      case 'blog':
        return 'border-blue-400/30 hover:border-blue-400/60 text-blue-400';
      default:
        return 'border-white/30 hover:border-white/60 text-white';
    }
  };

  // Simple locale detection - will be updated on client side
  const [locale, setLocale] = useState('de');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      setLocale(pathname.startsWith('/en') ? 'en' : 'de');
    }
  }, []);
  
  return (
    <Link href={`/${locale}${href}`} className={`block ${className}`}>
      <div className={`
        group relative p-4 rounded-xl border-2 transition-all duration-300 
        hover:scale-105 hover:shadow-xl backdrop-blur-sm bg-white/5
        ${getThemeColor()}
      `}>
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <h3 className="heading-6 group-hover:text-white transition-colors flex-1">
            {title}
          </h3>
          <div className="text-xs opacity-70">
            →
          </div>
        </div>
        
        {/* Description */}
        <p className="body-sm text-white/80 mb-3 leading-relaxed">
          {description}
        </p>
        
        {/* Keywords */}
        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {keywords.slice(0, 3).map((keyword, index) => (
              <span 
                key={index}
                className="label-base bg-white/10 text-white/60 px-2 py-1 rounded-lg text-xs"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
        
      </div>
    </Link>
  );
}

// Related Games Section Component
interface RelatedGamesProps {
  currentGame?: string;
  className?: string;
}

export function RelatedGames({ currentGame = '', className = '' }: RelatedGamesProps) {
  const games = [
    {
      id: 'bomb',
      href: '/game/bomb' as ValidHref,
      title: 'Bomb Party Trinkspiel',
      description: 'Das ultimative Wortspiel-Trinkspiel! Finde Wörter bevor die Bombe explodiert. Multiplayer-Modus verfügbar.',
      keywords: ['Bomb Party', 'Trinkspiel', 'Multiplayer'],
      gameType: 'bomb' as const
    },
    {
      id: 'neverhaveiever',
      href: '/game/neverhaveiever' as ValidHref,
      title: 'Ich hab noch nie online',
      description: 'Das klassische Geständnis-Trinkspiel! Finde heraus, wer was schon mal gemacht hat.',
      keywords: ['Ich hab noch nie', 'Geständnisse', 'Party'],
      gameType: 'neverhaveiever' as const
    },
    {
      id: 'truthordare',
      href: '/game/truthordare' as ValidHref,
      title: 'Wahrheit oder Pflicht Browser',
      description: 'Mutige Wahrheiten und verrückte Aufgaben! Das perfekte Partyspiel für Erwachsene.',
      keywords: ['Wahrheit oder Pflicht', 'Aufgaben', 'Erwachsene'],
      gameType: 'truthordare' as const
    }
  ];

  // Filter out current game
  const relatedGames = games.filter(game => game.id !== currentGame);

  if (relatedGames.length === 0) {
    return null;
  }

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            🎮 Andere Online Trinkspiele
          </h2>
          <p className="text-base text-white/80">
            Entdecke weitere kostenlose Browser Trinkspiele für deine Party!
          </p>
        </div>
        
        {/* Games Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {relatedGames.map((game) => (
            <InternalLinkCard
              key={game.id}
              href={game.href}
              title={game.title}
              description={game.description}
              gameType={game.gameType}
              keywords={game.keywords}
            />
          ))}
        </div>
        
        {/* Back to Homepage CTA */}
        <div className="text-center mt-8">
          <InternalLinkCard
            href={"/" as ValidHref}
            title="Alle Online Trinkspiele anzeigen"
            description="Zurück zur Übersicht aller kostenlosen Browser Trinkspiele und Partyspiele."
            gameType="blog"
            keywords={['Online Trinkspiele', 'Kostenlos', 'Browser']}
            className="max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
