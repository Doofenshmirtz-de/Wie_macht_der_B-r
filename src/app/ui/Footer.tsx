'use client';

import Image from "next/image";
import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";
// import { useLocale, useTranslations } from "next-intl";

const { Link } = createNavigation(routing);

export function Footer() {
  // const locale = useLocale();
  // const t = useTranslations('Footer');

  return (
    <footer className="relative z-20 mt-32 overflow-hidden" role="contentinfo">
      {/* Epic Footer Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-transparent opacity-95"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-screen-lg px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
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
            <h4 className="text-lg font-bold text-yellow-300 mb-4">🎮 Spiele</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/game/bomb" 
                  className="text-white/70 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium"
                >
                  🔥 Bomb Party
                </Link>
              </li>
              <li>
                <span className="text-white/50 text-sm">🤫 Ich hab noch nie</span>
              </li>
              <li>
                <span className="text-white/50 text-sm">💣 Wahrheit oder Pflicht</span>
              </li>
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="text-lg font-bold text-yellow-300 mb-4">ℹ️ Info</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-white/50 text-sm">📋 Datenschutz</span>
              </li>
              <li>
                <span className="text-white/50 text-sm">📝 Impressum</span>
              </li>
              <li>
                <span className="text-white/50 text-sm">❓ FAQ</span>
              </li>
              <li>
                <span className="text-white/50 text-sm">📞 Kontakt</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Tech Stats */}
        <div className="border-t border-white/10 pt-8">
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
        <div className="mt-8 text-center">
          <p className="text-white/40 text-xs">
            © 2024 Wie macht der Bär. Made with 🍻 für die beste Party-Community.
          </p>
          <p className="text-white/30 text-xs mt-1">
            Spielt verantwortungsvoll. Alkohol nur für Erwachsene.
          </p>
        </div>
      </div>
      
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"></div>
    </footer>
  );
}
