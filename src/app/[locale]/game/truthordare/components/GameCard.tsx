"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';

interface GameCardProps {
  onChoice: (choice: 'truth' | 'dare') => void;
  currentTruth?: string;
  currentDare?: string;
  mode: 'selection' | 'truth' | 'dare';
  onNext: () => void;
}

export function GameCard({ onChoice, currentTruth, currentDare, mode, onNext }: GameCardProps) {
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
    if (mode !== 'selection') return;
    
    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
    setIsSwipeActive(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (mode !== 'selection' || !startPosRef.current || !isSwipeActive) return;
    
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
    if (mode !== 'selection' || !startPosRef.current || !isSwipeActive) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startPosRef.current.x;
    
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }
    
    // Schwellenwert für Swipe
    if (Math.abs(deltaX) > 100) {
      playSwipeSound();
      if (deltaX > 0) {
        onChoice('dare'); // Rechts = Pflicht
      } else {
        onChoice('truth'); // Links = Wahrheit
      }
    }
    
    setIsSwipeActive(false);
    setSwipeDirection(null);
    startPosRef.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (mode !== 'selection') return;
    
    startPosRef.current = { x: e.clientX, y: e.clientY };
    setIsSwipeActive(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mode !== 'selection' || !startPosRef.current || !isSwipeActive) return;
    
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
    if (mode !== 'selection' || !startPosRef.current || !isSwipeActive) return;
    
    const deltaX = e.clientX - startPosRef.current.x;
    
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }
    
    if (Math.abs(deltaX) > 100) {
      playSwipeSound();
      if (deltaX > 0) {
        onChoice('dare');
      } else {
        onChoice('truth');
      }
    }
    
    setIsSwipeActive(false);
    setSwipeDirection(null);
    startPosRef.current = null;
  };

  const handleButtonChoice = (choice: 'truth' | 'dare') => {
    playClickSound();
    onChoice(choice);
  };

  const handleNext = () => {
    playClickSound();
    onNext();
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

      {/* Selection Card */}
      {mode === 'selection' && (
        <div className="space-y-6">
          <div
            ref={cardRef}
            className={`cr-card p-8 text-center cursor-pointer select-none transition-all duration-300 ${
              isSwipeActive ? 'scale-105' : ''
            } ${
              swipeDirection === 'left' ? 'border-blue-400 shadow-blue-400/50' : 
              swipeDirection === 'right' ? 'border-pink-400 shadow-pink-400/50' : ''
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
                src="/bearcards.jpg" 
                alt="Truth or Dare Bear" 
                width={200} 
                height={200} 
                className="mx-auto rounded-full border-4 border-yellow-300 shadow-lg"
                priority
              />
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 drop-shadow-lg">
              Wahrheit oder Pflicht?
            </h2>
            
            <div className="text-white/80 mb-6">
              <p className="mb-2">← Swipe nach links für <strong className="text-blue-300">Wahrheit</strong></p>
              <p>Swipe nach rechts für <strong className="text-pink-300">Pflicht</strong> →</p>
            </div>

            {/* Swipe Indicators */}
            <div className="flex justify-between items-center mt-6">
              <div className={`flex items-center gap-2 transition-all ${
                swipeDirection === 'left' ? 'scale-110 text-blue-300' : 'text-white/60'
              }`}>
                <span className="text-2xl">💭</span>
                <span className="font-bold">Wahrheit</span>
              </div>
              <div className={`flex items-center gap-2 transition-all ${
                swipeDirection === 'right' ? 'scale-110 text-pink-300' : 'text-white/60'
              }`}>
                <span className="text-2xl">⚡</span>
                <span className="font-bold">Pflicht</span>
              </div>
            </div>
          </div>

          {/* Alternative Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleButtonChoice('truth')}
              className="cr-button-primary bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-4 text-lg font-black"
            >
              💭 Wahrheit
            </button>
            <button
              onClick={() => handleButtonChoice('dare')}
              className="cr-button-primary bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 px-6 py-4 text-lg font-black"
            >
              ⚡ Pflicht
            </button>
          </div>
        </div>
      )}

      {/* Truth Card */}
      {mode === 'truth' && currentTruth && (
        <div className="space-y-6">
          <div className="cr-card p-8 text-center">
            <div className="text-4xl mb-4">💭</div>
            <h2 className="text-2xl md:text-3xl font-black text-blue-300 mb-6 drop-shadow-lg">
              Wahrheit
            </h2>
            <div className="cr-word-display p-6 mb-6">
              <p className="text-lg md:text-xl text-white font-bold leading-relaxed">
                {currentTruth}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleNext}
            className="cr-button-primary w-full px-6 py-4 text-xl font-black"
          >
            ➡️ Nächste Runde
          </button>
        </div>
      )}

      {/* Dare Card */}
      {mode === 'dare' && currentDare && (
        <div className="space-y-6">
          <div className="cr-card p-8 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h2 className="text-2xl md:text-3xl font-black text-pink-300 mb-6 drop-shadow-lg">
              Pflicht
            </h2>
            <div className="cr-word-display p-6 mb-6">
              <p className="text-lg md:text-xl text-white font-bold leading-relaxed">
                {currentDare}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleNext}
            className="cr-button-primary w-full px-6 py-4 text-xl font-black"
          >
            ➡️ Nächste Runde
          </button>
        </div>
      )}
    </div>
  );
}
