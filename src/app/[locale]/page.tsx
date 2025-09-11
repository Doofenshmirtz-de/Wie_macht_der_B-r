"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getInitialGames } from "../lib/game-actions";
import { ItemList } from "../components/ItemList";
import { GameCard } from "../components/GameCard";
import GameSearch from "../ui/GameSearch";
import { useGameSearch } from "../hooks/useGameSearch";
import { CommunityStats } from "../ui/CommunityStats";
import { TestimonialsSection } from "../ui/TestimonialsSection";
import { SocialSharing } from "../ui/SocialSharing";
import { InternalLinkCard } from "../ui/InternalLinkCard";
import { FollowUsCTA } from "../ui/SocialMediaLinks";
import { SectionDivider, SectionContainer } from "../ui/SectionDivider";
import type { GetGamesResult } from "../lib/game-actions";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [initialGamesData, setInitialGamesData] = useState<GetGamesResult | undefined>(undefined);
  
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

  // Suchfunktionalität
  const allGames = initialGamesData?.games || [];
  const {
    filteredGames,
    filters,
    updateSearchTerm,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    resultCount,
    totalCount,
  } = useGameSearch(allGames);

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
        {[...Array(20)].map((_, i) => {
          const leftPos = Math.random() * 100;
          const topPos = Math.random() * 100;
          const delay = Math.random() * 3;
          const duration = 2 + Math.random() * 3;
          
          return (
            <div
              key={i}
              className="epic-particle absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-particle-float anim-delay-dynamic"
              style={{
                "--left-pos": `${leftPos}%`,
                "--top-pos": `${topPos}%`,
                "--animation-delay": `${delay}s`,
                "--animation-duration": `${duration}s`,
                left: `var(--left-pos)`,
                top: `var(--top-pos)`,
                animationDelay: `var(--animation-delay)`,
                animationDuration: `var(--animation-duration)`,
              } as React.CSSProperties}
            />
          );
        })}
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    quality={85}
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
                <h1 className="epic-title relative display-xl gradient-text text-shadow-glow animate-float-gentle"
                  aria-label="Online Trinkspiele kostenlos - Wie macht der Bär"
                >
                  ONLINE TRINKSPIELE
                  <br />
                  <span className="heading-1 gradient-text">
                    KOSTENLOS SPIELEN
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
                  Bomb Party, Ich hab noch nie, Wahrheit oder Pflicht - alles kostenlos und ohne Download.
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
                <a 
                  href="#games-section"
                  className="btn-primary group relative inline-flex items-center justify-center px-8 py-4 text-lg font-black text-black animate-glow-pulse shimmer-effect border-glow"
                  aria-label="Jetzt spielen"
                >
                  {/* Button Content */}
                  <div className="relative flex items-center gap-3">
                    <span className="text-2xl">🎮</span>
                    <span>JETZT SPIELEN</span>
                    <span className="text-2xl">🎯</span>
                  </div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                </a>
                
                {/* Download Subtext */}
                <p className="mt-4 text-sm text-yellow-200/80 font-semibold animate-text-glow">
                  🚀 Sofort loslegen und nie wieder langweilige Partys haben!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Game Selection Section with Search & Advanced Infinite Scroll */}
        <SectionContainer variant="highlight" id="games-section">
          <div aria-label="Spieleauswahl mit Suchfunktion">
          <div className="text-center mb-8">
            <h2 className="heading-2 gradient-text text-shadow-glow animate-float-gentle">
              WÄHLE DEIN SPIEL
            </h2>
            <p className="mt-2 body-lg text-white/80 font-semibold">Bereit für den ultimativen Partyspaß?</p>
            <div className="mt-3 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            </div>
          </div>

          {/* 🔍 SUCHFUNKTION */}
          <GameSearch
            onSearch={updateSearchTerm}
            onFilterChange={updateFilter}
            onClearFilters={clearFilters}
            filters={filters}
            resultCount={resultCount}
            totalCount={totalCount}
            hasActiveFilters={hasActiveFilters}
          />
          
          <div className="relative">
            {/* Zeige Suchergebnisse oder normale Liste */}
            {hasActiveFilters ? (
              /* Gefilterte Spiele-Liste */
              <div className="flex flex-wrap justify-center gap-6">
                {filteredGames.length > 0 ? (
                  filteredGames.map((game, index) => (
                    <GameCard 
                      key={`filtered-${game.id}-${index}`}
                      game={game} 
                      index={index}
                      priority={index < 2}
                    />
                  ))
                ) : (
                  /* Keine Ergebnisse */
                  <div className="text-center w-full py-16">
                    <div className="text-6xl mb-6">😢</div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Keine Spiele gefunden!
                    </h3>
                    <p className="text-white/60 mb-6">
                      Versuche es mit anderen Suchbegriffen oder filtere weniger spezifisch.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="cr-button-primary px-6 py-3 font-bold"
                    >
                      🔄 Alle Spiele anzeigen
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Standard Advanced Infinite Scroll */
              <ItemList
                initialData={initialGamesData || undefined}
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
            )}
          </div>
          </div>
        </SectionContainer>

        {/* 🌟 COMMUNITY STATS SECTION */}
        <SectionContainer variant="accent" id="community-stats">
          <CommunityStats />
        </SectionContainer>

        {/* 🔗 FEATURED GAMES INTERNAL LINKING */}
        <SectionContainer variant="highlight" id="featured-games">
          <div className="px-4">
            <div className="text-center mb-6">
              <h2 className="heading-2 gradient-text text-shadow-glow animate-float-gentle mb-2">
                🎯 Beliebte Online Trinkspiele
              </h2>
              <p className="body-lg text-white/80">
                Entdecke die besten Browser Trinkspiele kostenlos ohne Download!
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <InternalLinkCard
                href="/game/bomb"
                title="Bomb Party Trinkspiel Multiplayer"
                description="Das ultimative Wortspiel-Trinkspiel online! Spiele Bomb Party kostenlos mit bis zu 16 Freunden."
                gameType="bomb"
                keywords={['Bomb Party', 'Multiplayer', 'Kostenlos']}
              />
              <InternalLinkCard
                href="/game/neverhaveiever"
                title="Ich hab noch nie online kostenlos"
                description="Das klassische Geständnis-Trinkspiel jetzt online! Finde heraus, wer was schon mal gemacht hat."
                gameType="neverhaveiever"
                keywords={['Ich hab noch nie', 'Geständnisse', 'Online']}
              />
              <InternalLinkCard
                href="/game/truthordare"
                title="Wahrheit oder Pflicht Browser Spiel"
                description="Mutige Wahrheiten und verrückte Aufgaben! Das perfekte Partyspiel für Erwachsene online."
                gameType="truthordare"
                keywords={['Wahrheit oder Pflicht', 'Erwachsene', 'Browser']}
              />
            </div>
          </div>
        </SectionContainer>

        {/* ❓ FAQ TEASER SECTION */}
        <SectionContainer variant="default" id="faq-teaser">
          <div className="px-4">
            <div className="text-center mb-6">
              <h2 className="heading-2 gradient-text text-shadow-glow animate-float-gentle mb-2">
                ❓ Häufig gestellte Fragen
              </h2>
              <p className="body-lg text-white/80 mb-4">
                Alles was du über Online Trinkspiele wissen musst - von Spielregeln bis Sicherheitstipps!
              </p>
              <InternalLinkCard
                href="/faq"
                title="Komplette FAQ zu Online Trinkspielen"
                description="15+ Antworten zu Bomb Party Regeln, Browser Kompatibilität, Multiplayer Setup und verantwortungsvollem Trinken."
                gameType="blog"
                keywords={['FAQ', 'Hilfe', 'Antworten']}
                className="max-w-lg mx-auto"
              />
            </div>
          </div>
        </SectionContainer>

        {/* 💬 TESTIMONIALS SECTION */}
        <SectionContainer variant="accent" id="testimonials">
          <TestimonialsSection />
        </SectionContainer>

        {/* 🚀 SOCIAL MEDIA FOLLOW CTA */}
        <SectionContainer variant="highlight" id="social-follow">
          <FollowUsCTA />
        </SectionContainer>

        {/* 📤 SOCIAL SHARING SECTION */}
        <SectionContainer variant="minimal" id="social-sharing">
          <SocialSharing />
        </SectionContainer>

      </div>
      
      {/* 📤 FLOATING SOCIAL SHARE */}
      <SocialSharing variant="floating" />
    </main>
  );
}

// Die EpicGameCard Komponente wurde durch die neue GameCard Komponente ersetzt


