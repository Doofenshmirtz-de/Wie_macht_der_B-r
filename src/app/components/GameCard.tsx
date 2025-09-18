"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GameCard as GameCardType } from "../lib/game-actions";
import { useGameAnalytics } from "../hooks/useGameAnalytics";


interface GameCardProps {
  game: GameCardType;
  index?: number;
  priority?: boolean;
}

export function GameCard({ game, priority = false }: GameCardProps) {
  // Simple locale detection - will be updated on client side
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      setLocale(pathname.startsWith('/en') ? 'en' : 'de');
    }
  }, []);

  const {
    title,
    description,
    subtitle,
    href,
    gradient,
    iconSrc,
    available,
    players,
    difficulty,
    imageSrc,
  } = game;

  const { trackGameSelection } = useGameAnalytics();

  const handleGameClick = () => {
    // Tracke Spielauswahl für Analytics
    trackGameSelection(title);
  };

  const labels = locale === 'en' ? {
    available: 'AVAILABLE',
    soon: 'SOON',
    players: 'PLAYERS',
    difficulty: 'DIFFICULTY',
    play: 'PLAY!'
  } : {
    available: 'VERFÜGBAR',
    soon: 'BALD',
    players: 'SPIELER',
    difficulty: 'SCHWIERIGKEIT',
    play: 'SPIELEN!'
  };

  const cardContent = (
    <div 
      className={`epic-game-card game-card group snap-center w-full sm:min-w-[420px] sm:max-w-[420px] min-h-[600px] sm:min-h-[560px] mx-auto relative overflow-hidden rounded-2xl transition-all duration-500 ${
        available 
          ? "sm:hover:scale-105 sm:hover:-translate-y-1 cursor-pointer" 
          : "opacity-75 cursor-not-allowed"
      }`}
    >
      {/* Card Background with Epic Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      
      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
      
      {/* Card Border */}
      <div className="absolute inset-0 rounded-2xl border border-yellow-400/30 group-hover:border-yellow-300/60 transition-colors duration-300"></div>
      
      {/* Card Content - Mobile noch höher für vollständige Sichtbarkeit */}
      <div className="relative min-h-[600px] sm:min-h-[560px] p-4 sm:p-6 flex flex-col text-white">
        {/* Header with Icon and Title */}
        <div className="mb-4">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400/50 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl border-2 border-white/30 shadow-2xl flex items-center justify-center">
                <Image 
                  src={iconSrc} 
                  alt={`${title} Icon`} 
                  width={24} 
                  height={24} 
                  className="drop-shadow-lg sm:w-7 sm:h-7"
                  priority={priority}
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white drop-shadow-lg leading-tight">{title}</h3>
              <p className="text-xs sm:text-sm lg:text-base text-yellow-200 font-bold">{description}</p>
            </div>
            
            {/* Status Badge */}
            <div className="ml-auto">
              {available ? (
                <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-green-300 shadow-lg">
                  {labels.available}
                </div>
              ) : (
                <div className="bg-gray-600 text-gray-300 text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-gray-500">
                  {labels.soon}
                </div>
              )}
            </div>
          </div>
          
          {/* Game Description - kompletter Text sichtbar */}
          <div className="mt-1">
            <p className="text-white/90 text-sm sm:text-base lg:text-lg font-semibold leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
        
        {/* Spacer to push image to fixed position */}
        <div className="flex-1 min-h-[5px] sm:min-h-[2px]"></div>
        
        {/* Game Image or Placeholder (bewusst gecroppt wie Desktop) - FESTE POSITION */}
        <div className="relative flex-none h-[400px] sm:h-[280px] mb-1 sm:mb-2 rounded-2xl overflow-hidden border-2 border-white/20 sm:group-hover:border-white/40 transition-colors duration-300">
          {available && imageSrc ? (
            <Image 
              src={imageSrc} 
              alt={`${title} - ${subtitle} für ${players}`} 
              fill 
              sizes="(max-width: 640px) 672px, 420px"
              className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
              priority={priority}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎮</div>
                <p className="text-white/60 font-bold">COMING SOON</p>
              </div>
            </div>
          )}
          
          {/* Overlay for hover effect */}
          {available && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                <span className="text-white font-bold text-sm">{labels.play}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Game Stats - IMMER sichtbar mit fester Position */}
        <div className="flex justify-between items-center mt-1 pt-2 pb-4 bg-black/20 rounded-lg mx-2">
          <div className="flex gap-3 sm:gap-4 px-3">
            <div className="text-center">
              <p className="text-xs sm:text-sm text-yellow-200 font-bold">{labels.players}</p>
              <p className="text-sm sm:text-base text-white font-bold">{players}</p>
            </div>
            <div className="text-center">
              <p className="text-xs sm:text-sm text-yellow-200 font-bold">{labels.difficulty}</p>
              <p className="text-sm sm:text-base text-white font-bold">{difficulty}</p>
            </div>
          </div>
          
          {available && (
            <div className="bg-yellow-400/20 backdrop-blur-sm rounded-full p-2 border border-yellow-400/50 group-hover:bg-yellow-400/30 transition-colors duration-300 flex-shrink-0 mr-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
    </div>
  );

  // Keine Verlinkung für nicht verfügbare Spiele
  if (!available || !href) {
    return cardContent;
  }
  
  // Type-safe href validation with locale
  const validHref = `/${locale}${href}`;
  
  return (
    <Link href={validHref} className="block" onClick={handleGameClick}>
      {cardContent}
    </Link>
  );
}
