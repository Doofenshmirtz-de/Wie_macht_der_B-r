'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createNavigation } from 'next-intl/navigation';
import { routing } from '@/i18n/routing';
import { useResponsive } from '../hooks/useResponsive';

const { Link } = createNavigation(routing);

interface MobileNavigationMenuProps {
  className?: string;
}

type RoutePath = "/" | "/game/bomb" | "/game/truthordare" | "/game/neverhaveiever" | "/faq" | "/blog";
type ScrollItem = { href: `#${string}`; label: string; description: string; isScroll: true };
type NavItem = { href: RoutePath; label: string; description: string; isScroll?: false };
type MenuItem = ScrollItem | NavItem;

export function MobileNavigationMenu({ className = '' }: MobileNavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useResponsive();
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isMobile) return null;

  const menuItems: MenuItem[] = [
    {
      href: '/',
      label: '🏠 Startseite',
      description: 'Zurück zur Hauptseite'
    },
    {
      href: '#games-section',
      label: '🎮 Spiele',
      description: 'Alle verfügbaren Partyspiele',
      isScroll: true
    },
    {
      href: '/game/bomb',
      label: '💣 Bomb Party',
      description: 'Wortspiel-Partyspiel'
    },
    {
      href: '/game/neverhaveiever', 
      label: '🤭 Ich hab noch nie',
      description: 'Geständnis-Partyspiel'
    },
    {
      href: '/game/truthordare',
      label: '🎯 Wahrheit oder Pflicht',
      description: 'Mutprobe-Partyspiel'
    },
    {
      href: '#community-stats',
      label: '🌟 Community',
      description: 'Unsere Spieler-Community',
      isScroll: true
    },
    {
      href: '/faq',
      label: '❓ FAQ',
      description: 'Häufige Fragen'
    }
  ];

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.isScroll) {
      const targetId = item.href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className={`mobile-nav-menu ${className}`}>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 p-2 rounded-lg bg-gradient-to-r from-orange-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/20"
        aria-label="Navigation öffnen"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-1.5' : ''
          }`} />
          <span className={`block w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`} />
          <span className={`block w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`} />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 z-40 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Menu Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Navigation</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Navigation schließen"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2 overflow-y-auto h-full pb-20">
          {menuItems.map((item, index) => (
            item.isScroll ? (
              <button
                key={item.href}
                onClick={() => handleMenuClick(item)}
                className="w-full group block p-4 rounded-xl border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.label.split(' ')[0]}</span>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-white group-hover:text-yellow-300 transition-colors">
                      {item.label.split(' ').slice(1).join(' ')}
                    </div>
                    <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                      {item.description}
                    </div>
                  </div>
                  <span className="text-white/40 group-hover:text-white/60 transition-colors">→</span>
                </div>
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href as RoutePath}
                className="group block p-4 rounded-xl border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.label.split(' ')[0]}</span>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-white group-hover:text-yellow-300 transition-colors">
                      {item.label.split(' ').slice(1).join(' ')}
                    </div>
                    <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                      {item.description}
                    </div>
                  </div>
                  <span className="text-white/40 group-hover:text-white/60 transition-colors">→</span>
                </div>
              </Link>
            )
          ))}
        </nav>

        {/* Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
          <div className="text-center">
            <p className="text-sm text-white/60">Wie macht der Bär</p>
            <p className="text-xs text-white/40">Online Partyspiele</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Touch Optimizations
export function TouchOptimizations() {
  const { isTouch } = useResponsive();

  useEffect(() => {
    if (isTouch) {
      // Add touch-specific optimizations
      document.documentElement.classList.add('touch-device');
      
      // Improve touch scrolling performance
      document.body.style.setProperty('-webkit-overflow-scrolling', 'touch');
      
      // Prevent zoom on double-tap
      let lastTouchEnd = 0;
      document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);
    }
  }, [isTouch]);

  return null;
}
