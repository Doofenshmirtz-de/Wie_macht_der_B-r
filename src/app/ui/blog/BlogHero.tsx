'use client';

import { BombIcon, GameIcon } from '../EnhancedIcons';

interface BlogHeroProps {
  locale: 'de' | 'en';
}

export function BlogHero({ locale }: BlogHeroProps) {
  const content = {
    de: {
      title: "🍻 Trinkspiele Magazin",
      subtitle: "Die besten Tipps, Trends und Geheimnisse für unvergessliche Partys",
      description: "Entdecke die Welt der Trinkspiele, Partyplanung und geselligen Runden. Von klassischen Spielen bis zu den neuesten Online-Trends - hier findest du alles für den perfekten Partyabend!",
      stats: {
        articles: "50+ Artikel",
        readers: "10.000+ Leser",
        games: "25+ Spiele"
      }
    },
    en: {
      title: "🍻 Drinking Games Magazine", 
      subtitle: "The best tips, trends and secrets for unforgettable parties",
      description: "Discover the world of drinking games, party planning and social gatherings. From classic games to the latest online trends - here you'll find everything for the perfect party night!",
      stats: {
        articles: "50+ Articles",
        readers: "10,000+ Readers", 
        games: "25+ Games"
      }
    }
  };

  const currentContent = content[locale];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30 blur-3xl"></div>
      <div className="absolute inset-0">
        {/* Floating Icons */}
        <div className="absolute top-20 left-10 animate-float-gentle">
          <BombIcon size={48} className="text-orange-400 opacity-20" />
        </div>
        <div className="absolute top-32 right-20 animate-float-gentle" style={{ animationDelay: '1s' }}>
          <GameIcon size={40} className="text-purple-400 opacity-20" />
        </div>
        <div className="absolute bottom-20 left-20 animate-float-gentle" style={{ animationDelay: '2s' }}>
          <BombIcon size={32} className="text-blue-400 opacity-20" />
        </div>
        <div className="absolute bottom-32 right-10 animate-float-gentle" style={{ animationDelay: '0.5s' }}>
          <GameIcon size={56} className="text-pink-400 opacity-20" />
        </div>
      </div>
      
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        {/* Main Title */}
        <h1 className="display-lg gradient-text text-shadow-glow animate-float-gentle mb-6">
          {currentContent.title}
        </h1>
        
        {/* Subtitle */}
        <p className="heading-4 text-white/90 mb-8 animate-scale-in">
          {currentContent.subtitle}
        </p>
        
        {/* Description */}
        <p className="body-lg text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
          {currentContent.description}
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {Object.entries(currentContent.stats).map(([key, value], index) => (
            <div 
              key={key}
              className="card-elevated p-6 text-center animate-float-gentle"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-3xl font-black text-white mb-2">
                {value.split(' ')[0]}
              </div>
              <div className="label-base text-white/70">
                {value.split(' ').slice(1).join(' ')}
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button className="btn-primary px-8 py-4 animate-glow-pulse">
            📚 Neueste Artikel
          </button>
          <button className="btn-secondary px-8 py-4">
            🎯 Beliebte Spiele
          </button>
          <button className="btn-ghost px-8 py-4">
            📧 Newsletter
          </button>
        </div>
      </div>
    </section>
  );
}
