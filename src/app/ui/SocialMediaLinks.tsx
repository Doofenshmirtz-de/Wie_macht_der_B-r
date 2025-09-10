'use client';

import { useState } from 'react';
import { ShareIcon } from './EnhancedIcons';

interface SocialMediaLinksProps {
  variant?: 'header' | 'footer' | 'floating' | 'compact';
  showLabels?: boolean;
  className?: string;
}

interface SocialLink {
  id: string;
  name: string;
  icon: string;
  url: string;
  color: string;
  hoverColor: string;
  description: string;
  isActive: boolean;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: '🎵',
    url: 'https://tiktok.com/@wiemachtderbaer',
    color: 'bg-black',
    hoverColor: 'hover:bg-pink-600',
    description: 'Bomb Party Challenges & Trinkspiele-Trends',
    isActive: false // Coming Soon
  },
  {
    id: 'instagram',
    name: 'Instagram', 
    icon: '📸',
    url: 'https://instagram.com/wiemachtderbaer',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    hoverColor: 'hover:from-purple-600 hover:to-pink-600',
    description: 'Party-Inspiration & Gaming-Highlights',
    isActive: false // Coming Soon
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '🎬',
    url: 'https://youtube.com/@wiemachtderbaer',
    color: 'bg-red-600',
    hoverColor: 'hover:bg-red-700',
    description: 'Trinkspiele-Tutorials & Live-Streams',
    isActive: false // Coming Soon
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: '🐦',
    url: 'https://twitter.com/wiemachtderbaer',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    description: 'News, Updates & Community-Chat',
    isActive: false // Coming Soon
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: '🎮',
    url: 'https://discord.gg/wiemachtderbaer',
    color: 'bg-indigo-600',
    hoverColor: 'hover:bg-indigo-700',
    description: 'Community-Server für Multiplayer-Events',
    isActive: false // Coming Soon
  }
];

export function SocialMediaLinks({ 
  variant = 'compact', 
  showLabels = true,
  className = '' 
}: SocialMediaLinksProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const getVariantStyles = () => {
    switch (variant) {
      case 'header':
        return {
          container: 'flex items-center gap-3',
          link: 'w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all duration-300',
          label: 'text-sm font-medium'
        };
      case 'footer':
        return {
          container: 'flex flex-col gap-4',
          link: 'w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300',
          label: 'text-sm text-white/80'
        };
      case 'floating':
        return {
          container: 'fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-50',
          link: 'w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all duration-300',
          label: 'text-xs font-medium'
        };
      default: // compact
        return {
          container: 'flex items-center gap-2',
          link: 'w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all duration-300',
          label: 'text-xs'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} ${className}`}>
      {SOCIAL_LINKS.map((social) => (
        <div key={social.id} className="relative group">
          {social.isActive ? (
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                ${styles.link} ${social.color} ${social.hoverColor}
                text-white border-2 border-transparent hover:border-white/30
                hover:scale-110 hover:shadow-xl
                ${variant === 'floating' ? 'hover:-translate-x-2' : ''}
              `}
              onMouseEnter={() => setHoveredLink(social.id)}
              onMouseLeave={() => setHoveredLink(null)}
              aria-label={`${social.name} - ${social.description}`}
            >
              <span>{social.icon}</span>
            </a>
          ) : (
            <div
              className={`
                ${styles.link} bg-white/10 text-white/50 border-2 border-white/20
                cursor-not-allowed relative overflow-hidden
              `}
              onMouseEnter={() => setHoveredLink(social.id)}
              onMouseLeave={() => setHoveredLink(null)}
              title={`${social.name} - Coming Soon!`}
            >
              <span>{social.icon}</span>
              
              {/* Coming Soon Badge */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border border-white animate-pulse"></div>
            </div>
          )}

          {/* Tooltip */}
          {hoveredLink === social.id && (
            <div className={`
              absolute z-50 px-3 py-2 bg-black/90 text-white text-xs rounded-lg border border-white/20
              ${variant === 'floating' ? 'right-16 top-1/2 transform -translate-y-1/2' : 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'}
              whitespace-nowrap animate-fade-in
            `}>
              <div className="font-semibold">{social.name}</div>
              {!social.isActive && (
                <div className="text-orange-300 text-xs">Coming Soon!</div>
              )}
              <div className="text-white/70 text-xs">{social.description}</div>
              
              {/* Tooltip Arrow */}
              <div className={`
                absolute w-2 h-2 bg-black/90 border-r border-b border-white/20 transform rotate-45
                ${variant === 'floating' ? 'right-0 top-1/2 transform translate-x-1 -translate-y-1/2 rotate-45' : 'top-full left-1/2 transform -translate-x-1/2 -translate-y-1 rotate-45'}
              `}></div>
            </div>
          )}

          {/* Label */}
          {showLabels && variant !== 'floating' && (
            <div className={`${styles.label} text-center mt-1`}>
              {social.name}
              {!social.isActive && (
                <div className="text-orange-400 text-xs">Coming Soon</div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Follow Us CTA Component
interface FollowUsCTAProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function FollowUsCTA({ 
  title = "🚀 Folge uns für die neuesten Updates!",
  subtitle = "Exklusive Bomb Party Challenges, neue Spiele und Party-Tipps direkt in deinem Feed.",
  className = ""
}: FollowUsCTAProps) {
  return (
    <section className={`py-16 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="heading-2 gradient-text text-shadow-glow mb-4">
            {title}
          </h2>
          <p className="body-lg text-white/80 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Social Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {SOCIAL_LINKS.map((social) => (
            <div key={social.id} className="group">
              <div className={`
                relative p-6 rounded-xl border-2 transition-all duration-300
                ${social.isActive 
                  ? 'border-white/20 hover:border-white/40 hover:scale-105 bg-white/5 hover:bg-white/10' 
                  : 'border-orange-400/30 bg-orange-400/10'
                }
              `}>
                
                {/* Platform Icon & Status */}
                <div className="text-center mb-4">
                  <div className={`
                    text-4xl mb-3 transition-transform duration-300
                    ${social.isActive ? 'group-hover:scale-110' : ''}
                  `}>
                    {social.icon}
                  </div>
                  
                  {social.isActive ? (
                    <div className="w-3 h-3 bg-green-400 rounded-full mx-auto animate-pulse"></div>
                  ) : (
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-orange-300 font-medium">Coming Soon</span>
                    </div>
                  )}
                </div>

                {/* Platform Info */}
                <div className="text-center">
                  <h3 className="heading-6 text-white mb-2">{social.name}</h3>
                  <p className="text-xs text-white/60 mb-4">{social.description}</p>
                  
                  {social.isActive ? (
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs inline-flex items-center gap-2"
                    >
                      <ShareIcon size={14} />
                      Folgen
                    </a>
                  ) : (
                    <button 
                      disabled
                      className="btn-secondary text-xs opacity-50 cursor-not-allowed"
                    >
                      Bald verfügbar
                    </button>
                  )}
                </div>

                {/* Coming Soon Overlay */}
                {!social.isActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🔥</div>
                      <div className="text-sm font-bold text-orange-300">Coming Soon</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-xl p-8 border border-white/10">
          <h3 className="heading-4 text-white mb-4">
            📧 Verpasse keine Updates!
          </h3>
          <p className="body-base text-white/80 mb-6">
            Melde dich für unseren Newsletter an und erfahre als Erste*r von neuen Features, 
            exklusiven Events und Party-Tipps!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="deine@email.de"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-orange-400/50"
            />
            <button className="btn-primary px-6 py-3 whitespace-nowrap">
              🎉 Anmelden
            </button>
          </div>
          <p className="text-xs text-white/50 mt-3">
            Keine Spam, nur die besten Party-Updates! Abmeldung jederzeit möglich.
          </p>
        </div>
      </div>
    </section>
  );
}
