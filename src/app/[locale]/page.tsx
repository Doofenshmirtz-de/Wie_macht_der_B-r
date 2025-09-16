"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getInitialGames } from "../lib/game-actions";
import { GameCard } from "../components/GameCard";
import GameSearch from "../ui/GameSearch";
import { useGameSearch } from "../hooks/useGameSearch";
import { CommunityStats } from "../ui/CommunityStats";
import { TestimonialsSection } from "../ui/TestimonialsSection";
import { SocialSharing } from "../ui/SocialSharing";
import { InternalLinkCard } from "../ui/InternalLinkCard";
import { FollowUsCTA } from "../ui/SocialMediaLinks";
import { SectionContainer } from "../ui/SectionDivider";
import type { GetGamesResult } from "../lib/game-actions";

export default function Home() {
  const params = useParams();
  const locale = params.locale as string;
  const [mounted, setMounted] = useState(false);
  const [initialGamesData, setInitialGamesData] = useState<GetGamesResult | undefined>(undefined);
  
  // Übersetzungen direkt definieren
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      de: {
        'home:heroTitle': 'ONLINE TRINKSPIELE',
        'home:heroSubtitle': 'KOSTENLOS SPIELEN',
        'home:heroDescription': 'Die beste Spiele-Webseite der Welt!',
        'home:readyForParty': 'Bereit für den ultimativen Partyspaß?',
        'home:playDescription': 'Spiele die besten Trinkspiele online mit deinen Freunden! Bomb Party, Ich hab noch nie, Wahrheit oder Pflicht - alles kostenlos und ohne Download.',
        'home:instantPlay': 'Sofort spielbar',
        'home:multiplayer': 'Multiplayer',
        'home:partyHard': 'Party Hard',
        'home:downloadNow': 'JETZT DOWNLOADEN',
        'home:downloadSubtext': 'Sofort loslegen und nie wieder langweilige Partys haben!',
        'home:chooseGame': 'WÄHLE DEIN SPIEL',
        'home:chooseGameDescription': 'Bereit für den ultimativen Partyspaß?',
        'home:popularGames': 'Beliebte Online Trinkspiele',
        'home:popularGamesDescription': 'Entdecke die besten Browser Trinkspiele kostenlos ohne Download!',
        'home:faqTitle': 'Häufig gestellte Fragen',
        'home:faqDescription': 'Alles was du über Online Trinkspiele wissen musst - von Spielregeln bis Sicherheitstipps!',
        'home:noGamesFound': 'Keine Spiele gefunden!',
        'home:noGamesDescription': 'Versuche es mit anderen Suchbegriffen oder filtere weniger spezifisch.',
        'home:showAllGames': 'Alle Spiele anzeigen',
        'home:loadingGames': 'Lade weitere Spiele...',
        'games:bombParty.title': 'Bomb Party Trinkspiel Multiplayer',
        'games:bombParty.description': 'Das ultimative Wortspiel-Trinkspiel online! Spiele Bomb Party kostenlos mit bis zu 16 Freunden.',
        'games:neverHaveIEver.title': 'Ich hab noch nie online kostenlos',
        'games:neverHaveIEver.description': 'Das klassische Geständnis-Trinkspiel jetzt online! Finde heraus, wer was schon mal gemacht hat.',
        'games:truthOrDare.title': 'Wahrheit oder Pflicht Browser Spiel',
        'games:truthOrDare.description': 'Mutige Wahrheiten und verrückte Aufgaben! Das perfekte Partyspiel für Erwachsene online.'
      },
      en: {
        'home:heroTitle': 'ONLINE DRINKING GAMES',
        'home:heroSubtitle': 'PLAY FOR FREE',
        'home:heroDescription': 'The best gaming website in the world!',
        'home:readyForParty': 'Ready for the ultimate party fun?',
        'home:playDescription': 'Play the best drinking games online with your friends! Bomb Party, Never Have I Ever, Truth or Dare - all free and without download.',
        'home:instantPlay': 'Instant play',
        'home:multiplayer': 'Multiplayer',
        'home:partyHard': 'Party Hard',
        'home:downloadNow': 'DOWNLOAD NOW',
        'home:downloadSubtext': 'Start immediately and never have boring parties again!',
        'home:chooseGame': 'CHOOSE YOUR GAME',
        'home:chooseGameDescription': 'Ready for the ultimate party fun?',
        'home:popularGames': 'Popular Online Drinking Games',
        'home:popularGamesDescription': 'Discover the best browser drinking games for free without download!',
        'home:faqTitle': 'Frequently Asked Questions',
        'home:faqDescription': 'Everything you need to know about online drinking games - from game rules to safety tips!',
        'home:noGamesFound': 'No games found!',
        'home:noGamesDescription': 'Try different search terms or filter less specifically.',
        'home:showAllGames': 'Show all games',
        'home:loadingGames': 'Loading more games...',
        'games:bombParty.title': 'Bomb Party Drinking Game Multiplayer',
        'games:bombParty.description': 'The ultimate word game drinking game online! Play Bomb Party for free with up to 16 friends.',
        'games:neverHaveIEver.title': 'Never Have I Ever online free',
        'games:neverHaveIEver.description': 'The classic confession drinking game now online! Find out who has done what before.',
        'games:truthOrDare.title': 'Truth or Dare Browser Game',
        'games:truthOrDare.description': 'Bold truths and crazy challenges! The perfect party game for adults online.'
      }
    };
    
    return translations[locale]?.[key] || key;
  };
  
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
      {/* Clean Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-40"></div>

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
                  
                </div>
              </div>
            </div>

            {/* Right Side - Text and Download Button */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              {/* Main Title */}
              <div className="relative inline-block">
                <h1 className="heading-2 lg:text-5xl text-white mb-4"
                  aria-label={t('home:title')}
                >
                  {t('home:heroTitle')}
                  <br />
                  <span className="gradient-text-static">
                    {t('home:heroSubtitle')}
                  </span>
                </h1>
              </div>
              
              {/* Subtitle */}
              <div className="mt-6">
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-200 tracking-wide">
                  🍻 {t('home:heroTitle')} 🍻
                </p>
                <p className="mt-2 body-xl text-white/90 font-semibold">
                  {t('home:heroDescription')}
                </p>
              </div>

              {/* Description */}
              <div className="mt-8 space-y-4">
                <p className="body-lg text-white/80 leading-relaxed">
                  🎉 <strong>{t('home:readyForParty')}</strong> 
                </p>
                <p className="body-base text-white/70 leading-relaxed">
                  {t('home:playDescription')}
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-6">
                  <div className="flex items-center gap-2 text-yellow-300 font-bold">
                    <span className="text-2xl">⚡</span>
                    <span>{t('home:instantPlay')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-300 font-bold">
                    <span className="text-2xl">👥</span>
                    <span>{t('home:multiplayer')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-300 font-bold">
                    <span className="text-2xl">🎯</span>
                    <span>{t('home:partyHard')}</span>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <div className="mt-10">
                <button 
                  className="btn-primary px-8 py-4 text-lg font-bold inline-flex items-center gap-3"
                  aria-label={t('home:downloadNow')}
                >
                  <span className="text-2xl">📱</span>
                  <span>{t('home:downloadNow')}</span>
                  <span className="text-2xl">⬇️</span>
                </button>
                
                {/* Download Subtext */}
                <p className="mt-4 text-sm text-yellow-200/80 font-semibold">
                  🚀 {t('home:downloadSubtext')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Game Selection Section with Search & Simple Carousel */}
        <SectionContainer variant="highlight" id="games-section">
          <div aria-label="Spieleauswahl mit Suchfunktion">
          <div className="text-center mb-8">
            <h2 className="heading-2 text-white mb-4">
              {t('home:chooseGame')}
            </h2>
            <p className="body-lg text-white/80 font-semibold">{t('home:chooseGameDescription')}</p>
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
                      {t('home:noGamesFound')}
                    </h3>
                    <p className="text-white/60 mb-6">
                      {t('home:noGamesDescription')}
                    </p>
                    <button
                      onClick={clearFilters}
                      className="cr-button-primary px-6 py-3 font-bold"
                    >
                      🔄 {t('home:showAllGames')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Einfaches Karussell ohne Infinite Scroll */
              <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-8 px-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {initialGamesData?.games?.map((game, index) => (
                  <GameCard 
                    key={game.id}
                    game={game} 
                    index={index}
                    priority={index < 2}
                  />
                )) || (
                  <div className="flex items-center justify-center p-8 min-w-[320px]">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                      <span className="text-white/80 font-bold">{t('home:loadingGames')}</span>
                    </div>
                  </div>
                )}
              </div>
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
            <h2 className="heading-2 text-white mb-4">
              🎯 {t('home:popularGames')}
            </h2>
              <p className="body-lg text-white/80">
                {t('home:popularGamesDescription')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <InternalLinkCard
                href={`/${locale}/game/bomb`}
                title={t('games:bombParty.title')}
                description={t('games:bombParty.description')}
                gameType="bomb"
                keywords={locale === 'de' ? ['Bomb Party', 'Multiplayer', 'Kostenlos'] : ['Bomb Party', 'Multiplayer', 'Free']}
              />
              <InternalLinkCard
                href={`/${locale}/game/neverhaveiever`}
                title={t('games:neverHaveIEver.title')}
                description={t('games:neverHaveIEver.description')}
                gameType="neverhaveiever"
                keywords={locale === 'de' ? ['Ich hab noch nie', 'Geständnisse', 'Online'] : ['Never Have I Ever', 'Confessions', 'Online']}
              />
              <InternalLinkCard
                href={`/${locale}/game/truthordare`}
                title={t('games:truthOrDare.title')}
                description={t('games:truthOrDare.description')}
                gameType="truthordare"
                keywords={locale === 'de' ? ['Wahrheit oder Pflicht', 'Erwachsene', 'Browser'] : ['Truth or Dare', 'Adults', 'Browser']}
              />
            </div>
          </div>
        </SectionContainer>

        {/* ❓ FAQ TEASER SECTION */}
        <SectionContainer variant="default" id="faq-teaser">
          <div className="px-4">
            <div className="text-center mb-6">
              <h2 className="heading-2 text-white mb-4">
                ❓ {t('home:faqTitle')}
              </h2>
              <p className="body-lg text-white/80 mb-4">
                {t('home:faqDescription')}
              </p>
              <InternalLinkCard
                href={`/${locale}/faq`}
                title={t('home:faqTitle')}
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
      
    </main>
  );
}

// Die EpicGameCard Komponente wurde durch die neue GameCard Komponente ersetzt



