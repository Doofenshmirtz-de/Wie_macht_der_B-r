"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useLocale } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

const { Link } = createNavigation(routing);

export function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  
  // Safe href that falls back to root if pathname is not in defined routes
  const getValidHref = (path: string): "/" | "/game/bomb" => {
    if (path === "/" || path === "/de" || path === "/en" || path === "/de/" || path === "/en/") {
      return "/";
    }
    if (path.includes("/game/bomb")) {
      return "/game/bomb";
    }
    return "/";
  };

  return (
    <header className="relative z-20 overflow-hidden">
      {/* Epic Header Background with Clash Royale vibes */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30"></div>
      
      {/* Animated glow effects */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute -top-5 -right-5 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="relative mx-auto max-w-screen-lg px-4 py-4 flex items-center justify-between">
        {/* Logo with epic styling */}
        <Link href="/" className="group relative flex items-center gap-3 hover:scale-105 transition-all duration-300">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-50"></div>
            <div className="relative h-12 w-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl border-2 border-yellow-300 shadow-2xl flex items-center justify-center">
              <Image src="/bomb.svg" alt="Wie macht der Bär Bomb Party Logo - Online Trinkspiel" width={24} height={24} className="drop-shadow-lg" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
              WIE MACHT DER BÄR
            </h1>
            <p className="text-xs text-yellow-200/90 font-bold tracking-widest">TRINKSPIELE DELUXE</p>
          </div>
        </Link>

        {/* Language Switcher with Clash Royale card style */}
        <div className="flex items-center gap-2">
          <Link
            aria-label="Deutsch"
            href={getValidHref(pathname || "/")}
            locale="de"
            className={`group relative h-10 w-12 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
              locale === "de" 
                ? "border-yellow-300 shadow-lg shadow-yellow-400/50 bg-gradient-to-b from-yellow-100 to-yellow-200" 
                : "border-white/30 hover:border-yellow-300/70 bg-gradient-to-b from-white/20 to-white/10"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
            <Image src="/flags/de.svg" alt="Deutsche Sprache wählen - Wie macht der Bär auf Deutsch spielen" fill sizes="48px" className="object-cover" />
            {locale === "de" && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-yellow-300 shadow-lg"></div>
            )}
          </Link>
          
          <Link
            aria-label="English"
            href={getValidHref(pathname || "/")}
            locale="en"
            className={`group relative h-10 w-12 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
              locale === "en" 
                ? "border-yellow-300 shadow-lg shadow-yellow-400/50 bg-gradient-to-b from-yellow-100 to-yellow-200" 
                : "border-white/30 hover:border-yellow-300/70 bg-gradient-to-b from-white/20 to-white/10"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
            <Image src="/flags/gb.svg" alt="Switch to English - Play Wie macht der Bär in English" fill sizes="48px" className="object-cover" />
            {locale === "en" && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-yellow-300 shadow-lg"></div>
            )}
          </Link>
        </div>
      </div>
      
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60"></div>
    </header>
  );
}


