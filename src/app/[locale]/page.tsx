"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, useEffect, useState } from "react";
import { getInitialGames } from "../lib/game-actions";
import { ItemList } from "../components/ItemList";
import { GameCard } from "../components/GameCard";
import type { GetGamesResult } from "../lib/game-actions";

export default function Home() {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);
  const [initialGamesData, setInitialGamesData] = useState<GetGamesResult | null>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initiale Daten laden für SEO und Performance - sofort beim Mount
  useEffect(() => {
    const loadInitial = async () => {
      try {
        const data = await getInitialGames();
        console.log('🎮 HomePage: Initial games loaded', data);
        setInitialGamesData(data);
      } catch (error) {
        console.error('Fehler beim Laden der initialen Spiele:', error);
      }
    };
    
    loadInitial();
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Epic Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-40"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="epic-particle absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-screen-7xl px-4 py-8">
        {/* Epic Hero Section with Image and Download Button */}
        <section className="epic-hero-section min-h-screen flex items-center py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Side - Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative group">
                {/* Image Container */}
                <div className="epic-image-container">
                  <Image 
                    src="/coverphotobear.jpg" 
                    alt="Wie macht der Bär - Die besten Online Trinkspiele für deine Party" 
                    width={600} 
                    height={400}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  
                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black font-black text-sm px-3 py-1 rounded-full animate-float-badge">
                    🍻 PARTY TIME!
                  </div>
                  <div className="absolute bottom-4 left-4 bg-red-500 text-white font-bold text-sm px-3 py-1 rounded-full animate-pulse">
                    🔥 TRINKSPIELE
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Text and Download Button */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              {/* Main Title */}
              <div className="relative inline-block">
                <h1 className="epic-title relative text-4xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-2xl tracking-tight leading-none animate-hero-glow">
                  WIE MACHT
                  <br />
                  <span className="text-3xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    DER BÄR
                  </span>
                </h1>
              </div>
              
              {/* Epic Subtitle */}
              <div className="mt-6 relative animate-scale-in">
                <p className="epic-subtitle text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-200 drop-shadow-lg tracking-wide">
                  🍻 ONLINE TRINKSPIELE 🍻
                </p>
                <p className="mt-2 text-base sm:text-lg lg:text-xl text-white/90 font-semibold">
                  Die beste Spiele-Webseite der Welt!
                </p>
              </div>

              {/* Catchy Description */}
              <div className="mt-8 space-y-4 animate-slide-in-right">
                <p className="text-lg text-white/80 leading-relaxed">
                  🎉 <strong>Bereit für den ultimativen Partyspaß?</strong> 
                </p>
                <p className="text-base text-white/70 leading-relaxed">
                  Spiele die besten Trinkspiele online mit deinen Freunden! 
                  Bomb Party, Wahrheit oder Pflicht und mehr - alles kostenlos und ohne Download.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-6">
                  <div className="flex items-center gap-2 text-yellow-300 font-bold">
                    <span className="text-2xl">⚡</span>
                    <span>Sofort spielbar</span>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-300 font-bold">
                    <span className="text-2xl">👥</span>
                    <span>Multiplayer</span>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-300 font-bold">
                    <span className="text-2xl">🎯</span>
                    <span>Party Hard</span>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <div className="mt-10 animate-scale-in">
                <button className="epic-download-button group relative inline-flex items-center justify-center px-8 py-4 text-lg font-black text-black">
                  {/* Button Content */}
                  <div className="relative flex items-center gap-3">
                    <span className="text-2xl">📱</span>
                    <span>DOWNLOAD</span>
                    <span className="text-2xl">⬇️</span>
                  </div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                </button>
                
                {/* Download Subtext */}
                <p className="mt-4 text-sm text-yellow-200/80 font-semibold animate-text-glow">
                  🚀 Jetzt herunterladen und nie wieder langweilige Partys haben!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Game Selection Section with Advanced Infinite Scroll */}
        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-lg animate-hero-glow">
              WÄHLE DEIN SPIEL
            </h2>
            <p className="mt-4 text-white/80 text-xl font-semibold">Bereit für den ultimativen Partyspaß?</p>
            <div className="mt-6 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="relative">
            {/* Advanced Infinite Scroll mit bidirektionalem Laden */}
            <ItemList
              initialData={initialGamesData}
              itemsPerLoad={3}
              direction="horizontal"
              className="infinite-scroll-container"
              renderItem={(game, index) => (
                <GameCard 
                  game={game} 
                  index={index}
                  priority={index < 2} // Erste 2 Karten haben Priority Loading
                />
              )}
              loadingComponent={
                <div className="snap-center min-w-[320px] sm:min-w-[420px] max-w-[320px] sm:max-w-[420px] flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                    <span className="text-white/80 font-bold">Lade weitere Spiele...</span>
                  </div>
                </div>
              }
              errorComponent={
                <div className="snap-center min-w-[320px] sm:min-w-[420px] max-w-[320px] sm:max-w-[420px] flex items-center justify-center p-8">
                  <div className="text-center text-red-400">
                    <div className="text-4xl mb-4">⚠️</div>
                    <p className="font-bold">Fehler beim Laden</p>
                    <p className="text-sm text-white/60 mt-2">Versuche es später erneut</p>
                  </div>
                </div>
              }
            />
          </div>
        </section>


      </div>
    </main>
  );
}

// Die EpicGameCard Komponente wurde durch die neue GameCard Komponente ersetzt


