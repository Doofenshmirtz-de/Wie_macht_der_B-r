"use client";

import Image from "next/image";
import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";
import type { GameCard as GameCardType } from "../lib/game-actions";
import { useGameAnalytics } from "../hooks/useGameAnalytics";

const { Link: LocaleLink } = createNavigation(routing);

interface GameCardProps {
  game: GameCardType;
  index?: number;
  priority?: boolean;
}

export function GameCard({ game, priority = false }: GameCardProps) {
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

  const cardContent = (
    <div 
      className={`epic-game-card game-card group snap-center min-w-[320px] sm:min-w-[420px] max-w-[320px] sm:max-w-[420px] min-h-[550px] sm:min-h-[550px] relative overflow-hidden rounded-3xl transition-all duration-500 ${
        available 
          ? "hover:scale-105 hover:-translate-y-2 cursor-pointer" 
          : "opacity-75 cursor-not-allowed"
      }`}
    >
      {/* Card Background with Epic Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      
      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
      
      {/* Card Border */}
      <div className="absolute inset-0 rounded-3xl border-2 border-yellow-400/30 group-hover:border-yellow-300/60 transition-colors duration-300"></div>
      
      {/* Card Content - Mobile noch höher für vollständige Sichtbarkeit */}
      <div className="relative h-[550px] sm:h-[550px] p-4 sm:p-6 flex flex-col text-white">
        {/* Header with Icon and Title - Responsive feste Höhe für einheitlichen Bildstart */}
        <div className="h-[120px] sm:h-[110px] mb-4">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400/50 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl border-2 border-white/30 shadow-2xl flex items-center justify-center">
                <Image 
                  src={iconSrc} 
                  alt={`${title} Trinkspiel Icon - Jetzt online spielen`} 
                  width={24} 
                  height={24} 
                  className="drop-shadow-lg sm:w-7 sm:h-7"
                  priority={priority}
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-lg leading-tight">{title}</h3>
              <p className="text-xs sm:text-sm text-yellow-200 font-bold">{description}</p>
            </div>
            
            {/* Status Badge */}
            <div className="ml-auto">
              {available ? (
                <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-green-300 shadow-lg">
                  VERFÜGBAR
                </div>
              ) : (
                <div className="bg-gray-600 text-gray-300 text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-gray-500">
                  BALD
                </div>
              )}
            </div>
          </div>
          
          {/* Game Description - Responsive feste Höhe für einheitlichen Bildstart */}
          <div className="h-[56px] sm:h-[48px] overflow-hidden">
            <p className="text-white/90 text-sm sm:text-base font-semibold leading-relaxed line-clamp-3 sm:line-clamp-2">
              {subtitle}
            </p>
          </div>
        </div>
        
        {/* Game Image or Placeholder */}
        <div className="relative flex-1 min-h-[200px] sm:min-h-[220px] mb-4 sm:mb-6 rounded-2xl overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300">
          {available && imageSrc ? (
            <Image 
              src={imageSrc} 
              alt={`${title} - ${subtitle} Trinkspiel für ${players} online spielen`} 
              fill 
              sizes="420px"
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                <span className="text-white font-bold text-sm">SPIELEN!</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Game Stats - IMMER sichtbar mit fester Position */}
        <div className="flex justify-between items-center mt-auto pt-4 pb-4 bg-black/20 rounded-lg mx-2">
          <div className="flex gap-3 sm:gap-4 px-3">
            <div className="text-center">
              <p className="text-xs text-yellow-200 font-bold">SPIELER</p>
              <p className="text-sm text-white font-bold">{players}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-yellow-200 font-bold">SCHWIERIGKEIT</p>
              <p className="text-sm text-white font-bold">{difficulty}</p>
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
  
  // Type-safe href validation
  const validHref: "/game/bomb" | "/game/truthordare" | "/game/neverhaveiever" = href as "/game/bomb" | "/game/truthordare" | "/game/neverhaveiever";
  
  return (
    <LocaleLink href={validHref} className="block" onClick={handleGameClick}>
      {cardContent}
    </LocaleLink>
  );
}
