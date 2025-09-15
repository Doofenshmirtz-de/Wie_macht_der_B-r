'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";
// import { CommunityStats } from "./CommunityStats"; // Unused import
// import { useLocale, useTranslations } from "next-intl";

const { Link } = createNavigation(routing);

export function Footer() {
  // const locale = useLocale();
  // const t = useTranslations('Footer');
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Static particles to avoid hydration issues
  const staticParticles = [
    { left: 15, top: 20, animationDelay: 0.5, animationDuration: 3 },
    { left: 85, top: 35, animationDelay: 1.2, animationDuration: 2.5 },
    { left: 45, top: 60, animationDelay: 2.1, animationDuration: 4 },
    { left: 70, top: 15, animationDelay: 0.8, animationDuration: 3.5 },
    { left: 25, top: 75, animationDelay: 1.8, animationDuration: 2.8 },
    { left: 90, top: 80, animationDelay: 0.3, animationDuration: 3.2 },
    { left: 10, top: 45, animationDelay: 2.5, animationDuration: 2.2 },
    { left: 65, top: 25, animationDelay: 1.5, animationDuration: 4.2 },
    { left: 35, top: 85, animationDelay: 0.9, animationDuration: 3.8 },
    { left: 55, top: 10, animationDelay: 2.2, animationDuration: 2.9 },
  ];

  return (
    <footer className="relative z-20 mt-32 overflow-hidden" role="contentinfo">
      {/* Epic Footer Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-transparent opacity-95"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30"></div>
      
      {/* Animated particles - Static positions to avoid hydration mismatch */}
      <div className="absolute inset-0 overflow-hidden" suppressHydrationWarning>
        {isClient && staticParticles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full animate-pulse anim-delay-dynamic"
            style={{
              "--left-pos": `${particle.left}%`,
              "--top-pos": `${particle.top}%`,
              "--animation-delay": `${particle.animationDelay}s`,
              "--animation-duration": `${particle.animationDuration}s`,
              left: `var(--left-pos)`,
              top: `var(--top-pos)`,
              animationDelay: `var(--animation-delay)`,
              animationDuration: `var(--animation-duration)`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-screen-lg px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-50"></div>
                <div className="relative h-12 w-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl border-2 border-yellow-300 shadow-2xl flex items-center justify-center">
                  <Image src="/bomb.svg" alt="Wie macht der Bär Logo" width={24} height={24} className="drop-shadow-lg" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  WIE MACHT DER BÄR
                </h3>
                <p className="text-xs text-yellow-200/80 font-bold">TRINKSPIELE DELUXE</p>
              </div>
            </Link>
            
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              🍻 Die beste Plattform für Online-Trinkspiele! Bomb Party, Ich hab noch nie, Wahrheit oder Pflicht und mehr. 
              Kostenlos, ohne Download, direkt im Browser spielbar.
            </p>
            
            <div className="flex items-center gap-2 text-yellow-300 text-sm">
              <span className="text-lg">🎯</span>
              <span className="font-semibold">Für Erwachsene ab 18 Jahren</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-yellow-300 mb-4">🎮 Online Trinkspiele</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/game/bomb" 
                  className="text-white/70 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium"
                >
                  🔥 <strong>Bomb Party Trinkspiel</strong> kostenlos
                </Link>
              </li>
              <li>
                <Link 
                  href="/game/neverhaveiever"
                  className="text-white/70 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium"
                >
                  🤫 <strong>Ich hab noch nie</strong> online spielen
                </Link>
              </li>
              <li>
                <Link 
                  href="/game/truthordare"
                  className="text-white/70 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium"
                >
                  💣 <strong>Wahrheit oder Pflicht</strong> Browser
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog"
                  className="text-white/70 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium"
                >
                  📰 Trinkspiele Tipps & Guides
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-white/70 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium"
                >
                  ❓ <strong>FAQ</strong> - Häufige Fragen
                </Link>
              </li>
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="text-lg font-bold text-yellow-300 mb-4">ℹ️ Info</h4>
            <ul className="space-y-2">
               <li>
                 <Link href="/privacy" className="text-white/70 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium">📋 Datenschutz</Link>
               </li>
                <li>
                  <Link href="/impressum" className="text-white/70 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium">📝 Impressum</Link>
                </li>
               <li>
                 <Link href="/faq" className="text-white/70 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium">❓ FAQ</Link>
               </li>
              <li>
                <span className="text-white/50 text-sm">📞 Kontakt</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Tech Stats */}
        <div className="pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-white/60 text-sm font-semibold">Folge uns:</span>
              <div className="flex gap-2">
                <span className="text-white/40 text-sm">📱 @wiemachtderbaer</span>
              </div>
            </div>

            {/* Tech Stats */}
            <div className="flex items-center gap-6 text-xs text-white/50">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Online</span>
              </div>
              <div>⚡ PWA Ready</div>
              <div>🌐 DE/EN</div>
              <div>📱 Mobile Optimiert</div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center">
          <p className="text-white/40 text-xs">
            © 2024 Wie macht der Bär. Made with 🍻 für die beste Party-Community.
          </p>
          <p className="text-white/30 text-xs mt-1">
            Spielt verantwortungsvoll. Alkohol nur für Erwachsene.
          </p>
        </div>
      </div>
    </footer>
  );
}
