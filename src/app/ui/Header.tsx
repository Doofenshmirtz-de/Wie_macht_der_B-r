"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useLocale } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";
import { useResponsive } from "../hooks/useResponsive";
import { DesktopOnly, MobileOnly } from "./MobileOptimizations";
import { MobileNavigationMenu } from "./MobileNavigationMenu";

const { Link } = createNavigation(routing);

export function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const { isMobile, isTouch } = useResponsive();
  
  // Safe href that falls back to root if pathname is not in defined routes
  const getValidHref = (path: string): 
    "/" | "/game/bomb" | "/game/truthordare" | "/game/neverhaveiever" | "/faq" | "/blog" => {
    if (path === "/" || path === "/de" || path === "/en" || path === "/de/" || path === "/en/") {
      return "/";
    }
    if (path.includes("/game/bomb")) {
      return "/game/bomb";
    }
    if (path.includes("/game/truthordare")) {
      return "/game/truthordare";
    }
    if (path.includes("/game/neverhaveiever")) {
      return "/game/neverhaveiever";
    }
    if (path.includes("/faq")) {
      return "/faq";
    }
    if (path.includes("/blog")) {
      return "/blog";
    }
    return "/";
  };

  return (
    <header className="relative z-20 overflow-hidden" role="banner">
      {/* Epic Header Background with Clash Royale vibes */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30"></div>
      
      {/* Animated glow effects */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute -top-5 -right-5 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className={`relative mx-auto max-w-screen-lg px-4 flex items-center justify-between ${
        isMobile ? 'py-3' : 'py-4'
      }`}>
        {/* Logo with epic styling */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group relative flex items-center gap-3 hover:scale-105 transition-all duration-300">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-50"></div>
            <div className="relative h-12 w-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl border-2 border-yellow-300 shadow-2xl flex items-center justify-center">
              <Image src="/bomb.svg" alt="Wie macht der Bär Bomb Party Logo - Online Trinkspiel" width={24} height={24} className="drop-shadow-lg" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-black bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
              WIE MACHT DER BÄR
            </div>
            <p className="text-xs text-yellow-200/90 font-bold tracking-widest">PARTYSPIELE DELUXE</p>
          </div>
        </Link>

        {/* Navigation Menu - Desktop Only */}
            <DesktopOnly>
              <nav className="flex items-center gap-6" role="navigation" aria-label="Hauptnavigation">
                <button 
                  onClick={() => {
                    const gamesSection = document.querySelector('.infinite-scroll-container');
                    gamesSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`group relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                    isTouch ? 'min-h-[44px] min-w-[44px]' : ''
                  }`}
                >
                  <span className="text-sm font-bold text-yellow-200 group-hover:text-yellow-300 transition-colors">
                    🎮 Spiele
                  </span>
                </button>
                <Link 
                  href="/blog"
                  className={`group relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                    isTouch ? 'min-h-[44px] min-w-[44px]' : ''
                  }`}
                >
                  <span className="text-sm font-bold text-yellow-200 group-hover:text-yellow-300 transition-colors">
                    📰 Blog
                  </span>
                </Link>
                <Link 
                  href="/faq"
                  className={`group relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                    isTouch ? 'min-h-[44px] min-w-[44px]' : ''
                  }`}
                >
                  <span className="text-sm font-bold text-yellow-200 group-hover:text-yellow-300 transition-colors">
                    ❓ FAQ
                  </span>
                </Link>
              </nav>
            </DesktopOnly>
        </div>

        <div className="flex items-center gap-4">
        {/* Mobile Navigation Menu */}
        <MobileOnly>
          <MobileNavigationMenu />
        </MobileOnly>

        {/* Language Switcher with Enhanced Clash Royale card style */}
        <div className="flex items-center gap-3">
          {/* Language Label - Hidden on Mobile */}
          <span className="hidden sm:block text-xs text-yellow-200/80 font-bold tracking-wider">
            SPRACHE
          </span>
          
          <Link
            aria-label="Deutsch"
            href={getValidHref(pathname || "/")}
            locale="de"
            className={`group relative ${isMobile ? 'h-10 w-12' : 'h-12 w-16'} rounded-xl overflow-hidden border-3 transition-all duration-300 ${
              !isMobile ? 'hover:scale-110 hover:-translate-y-2 hover:shadow-2xl' : 'active:scale-95'
            } ${
              locale === "de" 
                ? "border-yellow-300 shadow-xl shadow-yellow-400/60 bg-gradient-to-b from-yellow-100 to-yellow-200 scale-105" 
                : "border-white/40 hover:border-yellow-300/80 bg-gradient-to-b from-white/25 to-white/15"
            } ${isTouch ? 'min-h-[44px] min-w-[44px]' : ''}`}
          >
            {/* Enhanced glow effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
            <div className={`absolute inset-0 transition-opacity duration-300 ${
              locale === "de" ? "opacity-100" : "opacity-0 group-hover:opacity-50"
            } bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20`}></div>
            
            <Image src="/flags/de.svg" alt="Deutsche Sprache wählen - Wie macht der Bär auf Deutsch spielen" fill sizes="64px" className="object-cover group-hover:scale-110 transition-transform duration-300" />
            
            {locale === "de" && (
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-yellow-400 rounded-full border-2 border-yellow-300 shadow-xl animate-pulse"></div>
            )}
            
            {/* Active state glow */}
            {locale === "de" && (
              <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_15px_rgba(255,215,0,0.3)]"></div>
            )}
          </Link>
          
          <Link
            aria-label="English"
            href={getValidHref(pathname || "/")}
            locale="en"
            className={`group relative ${isMobile ? 'h-10 w-12' : 'h-12 w-16'} rounded-xl overflow-hidden border-3 transition-all duration-300 ${
              !isMobile ? 'hover:scale-110 hover:-translate-y-2 hover:shadow-2xl' : 'active:scale-95'
            } ${
              locale === "en" 
                ? "border-yellow-300 shadow-xl shadow-yellow-400/60 bg-gradient-to-b from-yellow-100 to-yellow-200 scale-105" 
                : "border-white/40 hover:border-yellow-300/80 bg-gradient-to-b from-white/25 to-white/15"
            } ${isTouch ? 'min-h-[44px] min-w-[44px]' : ''}`}
          >
            {/* Enhanced glow effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
            <div className={`absolute inset-0 transition-opacity duration-300 ${
              locale === "en" ? "opacity-100" : "opacity-0 group-hover:opacity-50"
            } bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20`}></div>
            
            <Image src="/flags/gb.svg" alt="Switch to English - Play Wie macht der Bär in English" fill sizes="64px" className="object-cover group-hover:scale-110 transition-transform duration-300" />
            
            {locale === "en" && (
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-yellow-400 rounded-full border-2 border-yellow-300 shadow-xl animate-pulse"></div>
            )}
            
            {/* Active state glow */}
            {locale === "en" && (
              <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_15px_rgba(255,215,0,0.3)]"></div>
            )}
          </Link>
        </div>
        </div>
      </div>
      
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60"></div>
    </header>
  );
}


