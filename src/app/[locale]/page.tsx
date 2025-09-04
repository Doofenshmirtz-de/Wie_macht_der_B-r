"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";
import { useRef, useEffect, useState } from "react";

const { Link: LocaleLink } = createNavigation(routing);

export default function Home() {
  const t = useTranslations();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const scrollByAmount = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

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

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-8">
        {/* Epic Hero Section */}
        <section className="epic-hero-section text-center pt-12 pb-16">
          {/* Main Title with Epic Styling */}
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
            <h1 className="epic-title relative text-4xl sm:text-6xl md:text-8xl font-black bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-2xl tracking-tight leading-none animate-hero-glow">
              WIE MACHT
              <br />
              <span className="text-3xl sm:text-5xl md:text-7xl bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                DER BÄR
              </span>
            </h1>
          </div>
          
          {/* Epic Subtitle */}
          <div className="mt-6 relative animate-scale-in">
            <p className="epic-subtitle text-xl sm:text-2xl md:text-3xl font-bold text-yellow-200 drop-shadow-lg tracking-wide">
              🍻 ONLINE TRINKSPIELE 🍻
            </p>
            <p className="mt-2 text-base sm:text-lg text-white/90 font-semibold">
              {t("chooseGame")} • Party Hard • Sauf Gut!
            </p>
          </div>


        </section>

        {/* Game Selection Section */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
              WÄHLE DEIN SPIEL
            </h2>
            <p className="mt-2 text-white/80 text-lg">Bereit für den ultimativen Partyspaß?</p>
          </div>
          
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white font-bold text-2xl shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-white/20"
              onClick={() => scrollByAmount(-1)}
              aria-label="Vorheriges Spiel"
            >
              ‹
            </button>
            
            {/* Games Container */}
            <div ref={scrollRef} className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth">
              <EpicGameCard
                title={t("bombParty")}
                description="Der Klassiker"
                subtitle="Wörter finden bevor die Bombe explodiert!"
                href="/game/bomb"
                gradient="from-orange-500 via-red-500 to-pink-600"
                iconSrc="/bomb.svg"
                available={true}
                players="2-8 Spieler"
                difficulty="Einfach"
                imageSrc="/bearbomb.jpg"
              />
              
              <EpicGameCard
                title="Wahrheit oder Pflicht"
                description="Der Partykracher"
                subtitle="Ehrliche Fragen und mutige Aufgaben!"
                href="/game/truthordare"
                gradient="from-pink-500 via-purple-500 to-red-600"
                iconSrc="/icons/question.svg"
                available={true}
                players="2-10 Spieler"
                difficulty="Einfach"
                imageSrc="/bearcards.jpg"
              />
              
              <EpicGameCard
                title="Quiz Show"
                description={t("comingSoon")}
                subtitle="Teste dein Wissen in verschiedenen Kategorien!"
                href={null}
                gradient="from-purple-500 via-blue-500 to-indigo-600"
                iconSrc="/icons/rocket.svg"
                available={false}
                players="2-12 Spieler"
                difficulty="Mittel"
              />
              
              <EpicGameCard
                title="Charades"
                description={t("comingSoon")}
                subtitle="Pantomime mit Trinkregeln!"
                href={null}
                gradient="from-green-500 via-teal-500 to-blue-600"
                iconSrc="/icons/gift.svg"
                available={false}
                players="4-10 Spieler"
                difficulty="Schwer"
              />
            </div>
            
            <button
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white font-bold text-2xl shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-white/20"
              onClick={() => scrollByAmount(1)}
              aria-label="Nächstes Spiel"
            >
              ›
            </button>
          </div>
        </section>


      </div>
    </main>
  );
}

function EpicGameCard({
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
}: {
  title: string;
  description: string;
  subtitle: string;
  href: string | null;
  gradient: string;
  iconSrc: string;
  available: boolean;
  players: string;
  difficulty: string;
  imageSrc?: string;
}) {
  const cardContent = (
    <div className={`epic-game-card group snap-center min-w-[320px] sm:min-w-[420px] max-w-[320px] sm:max-w-[420px] relative overflow-hidden rounded-3xl transition-all duration-500 ${
      available 
        ? "hover:scale-105 hover:-translate-y-2 cursor-pointer" 
        : "opacity-75 cursor-not-allowed"
    }`}>
      {/* Card Background with Epic Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      
      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
      
      {/* Card Border */}
      <div className="absolute inset-0 rounded-3xl border-2 border-yellow-400/30 group-hover:border-yellow-300/60 transition-colors duration-300"></div>
      
              {/* Card Content */}
        <div className="relative h-[400px] sm:h-[500px] p-4 sm:p-6 flex flex-col text-white">
        {/* Header with Icon and Title */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400/50 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative h-14 w-14 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl border-2 border-white/30 shadow-2xl flex items-center justify-center">
              <Image src={iconSrc} alt={`${title} Trinkspiel Icon - Jetzt online spielen`} width={28} height={28} className="drop-shadow-lg" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-white drop-shadow-lg">{title}</h3>
            <p className="text-sm text-yellow-200 font-bold">{description}</p>
          </div>
          
          {/* Status Badge */}
          <div className="ml-auto">
            {available ? (
              <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full border border-green-300 shadow-lg">
                VERFÜGBAR
              </div>
            ) : (
              <div className="bg-gray-600 text-gray-300 text-xs font-bold px-3 py-1 rounded-full border border-gray-500">
                BALD
              </div>
            )}
          </div>
        </div>
        
        {/* Game Description */}
        <p className="text-white/90 text-base font-semibold mb-6 leading-relaxed">
          {subtitle}
        </p>
        
        {/* Game Image or Placeholder */}
        <div className="relative flex-1 min-h-[200px] sm:min-h-[240px] mb-6 rounded-2xl overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300">
          {available && imageSrc ? (
            <Image 
              src={imageSrc} 
              alt={`${title} - ${subtitle} Trinkspiel für ${players} online spielen`} 
              fill 
              sizes="420px"
              className="object-cover object-top group-hover:scale-110 transition-transform duration-500" 
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
        
        {/* Game Stats */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
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
            <div className="bg-yellow-400/20 backdrop-blur-sm rounded-full p-2 border border-yellow-400/50 group-hover:bg-yellow-400/30 transition-colors duration-300">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
    </div>
  );

  if (!available || !href) return cardContent;
  
  // Type-safe href validation
  const validHref: "/game/bomb" | "/game/truthordare" = href as "/game/bomb" | "/game/truthordare";
  
  return (
    <LocaleLink href={validHref} className="block">
      {cardContent}
    </LocaleLink>
  );
}


