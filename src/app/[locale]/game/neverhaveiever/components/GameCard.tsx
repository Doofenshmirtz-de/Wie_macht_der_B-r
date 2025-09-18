"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';

interface GameCardProps {
  currentStatement: string;
  onNext: () => void;
  isSpecialCard?: boolean;
}

export function GameCard({ currentStatement, onNext, isSpecialCard = false }: GameCardProps) {
  const locale = typeof window !== 'undefined' && window.location.pathname.startsWith('/en') ? 'en' : 'de';
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const swipeAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);

  const playSwipeSound = () => {
    if (swipeAudioRef.current) {
      swipeAudioRef.current.currentTime = 0;
      swipeAudioRef.current.play().catch(console.warn);
    }
  };

  const playClickSound = () => {
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(console.warn);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
    setIsSwipeActive(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startPosRef.current || !isSwipeActive) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPosRef.current.x;
    const deltaY = touch.clientY - startPosRef.current.y;
    
    // Nur horizontale Swipes zulassen
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      if (deltaX > 0) {
        setSwipeDirection('right');
      } else {
        setSwipeDirection('left');
      }
      
      if (cardRef.current) {
        cardRef.current.style.transform = `translateX(${deltaX * 0.5}px) rotate(${deltaX * 0.1}deg)`;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!startPosRef.current || !isSwipeActive) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startPosRef.current.x;
    
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }
    
    // Schwellenwert für Swipe
    if (Math.abs(deltaX) > 100) {
      playSwipeSound();
      onNext(); // Egal in welche Richtung, gehe zur nächsten Karte
    }
    
    setIsSwipeActive(false);
    setSwipeDirection(null);
    startPosRef.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startPosRef.current = { x: e.clientX, y: e.clientY };
    setIsSwipeActive(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!startPosRef.current || !isSwipeActive) return;
    
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      if (deltaX > 0) {
        setSwipeDirection('right');
      } else {
        setSwipeDirection('left');
      }
      
      if (cardRef.current) {
        cardRef.current.style.transform = `translateX(${deltaX * 0.5}px) rotate(${deltaX * 0.1}deg)`;
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!startPosRef.current || !isSwipeActive) return;
    
    const deltaX = e.clientX - startPosRef.current.x;
    
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }
    
    if (Math.abs(deltaX) > 100) {
      playSwipeSound();
      onNext();
    }
    
    setIsSwipeActive(false);
    setSwipeDirection(null);
    startPosRef.current = null;
  };

  const handleNext = () => {
    playClickSound();
    onNext();
  };

  const getBearImage = () => {
    if (isSpecialCard) {
      // Spezielle Karten verwenden das neue bearhands Bild
      return "/bearhands.jpg";
    }
    return "/bearhands.jpg";
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Audio Elements */}
      <audio ref={swipeAudioRef} preload="auto">
        <source src="/swipe.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={clickAudioRef} preload="auto">
        <source src="/click.mp3" type="audio/mpeg" />
      </audio>


      <div className="space-y-6">
        <div
          ref={cardRef}
          className={`cr-card p-8 text-center cursor-pointer select-none transition-all duration-300 ${
            isSwipeActive ? 'scale-105' : ''
          } ${
            swipeDirection === 'left' ? 'border-blue-400 shadow-blue-400/50' : 
            swipeDirection === 'right' ? 'border-purple-400 shadow-purple-400/50' : ''
          } ${
            isSpecialCard ? 'bg-gradient-to-b from-yellow-500/20 to-orange-600/20 border-yellow-300/50' : ''
          }`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Bear Image */}
          <div className="mb-6">
            <Image 
              src={getBearImage()} 
              alt="Never Have I Ever Bear" 
              width={200} 
              height={200} 
              className="mx-auto rounded-full border-4 border-yellow-300 shadow-lg"
              priority
            />
          </div>

          {/* Statement */}
          <div className="cr-word-display p-6 mb-6">
            <p className={`text-lg md:text-xl font-bold leading-relaxed ${
              isSpecialCard ? 'text-yellow-200' : 'text-white'
            }`}>
              {currentStatement}
            </p>
          </div>

          {/* Instructions */}
          {!isSpecialCard && (
            <div className="text-white/80 mb-6">
              <p className="mb-2">{locale === 'en' ? 'If you\'ve done this before: ' : 'Falls du das schon mal gemacht hast: '}<strong className="text-red-300">{locale === 'en' ? 'Drink!' : 'Trinken!'}</strong></p>
              <p className="text-sm">{locale === 'en' ? '← Swipe for next statement →' : '← Swipe für nächste Aussage →'}</p>
            </div>
          )}

          {/* Swipe Indicators */}
          <div className="flex justify-between items-center mt-6">
            <div className={`flex items-center gap-2 transition-all ${
              swipeDirection === 'left' ? 'scale-110 text-blue-300' : 'text-white/60'
            }`}>
              <span className="text-2xl">⬅️</span>
              <span className="font-bold">{locale === 'en' ? 'Next' : 'Nächste'}</span>
            </div>
            <div className={`flex items-center gap-2 transition-all ${
              swipeDirection === 'right' ? 'scale-110 text-purple-300' : 'text-white/60'
            }`}>
              <span className="text-2xl">➡️</span>
              <span className="font-bold">{locale === 'en' ? 'statement' : 'Aussage'}</span>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="cr-button-primary w-full px-6 py-4 text-xl font-black"
        >
          {locale === 'en' ? '➡️ Next statement' : '➡️ Nächste Aussage'}
        </button>
      </div>
    </div>
  );
}
