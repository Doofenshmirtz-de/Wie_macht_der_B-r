'use client';

import { useState } from 'react';
import { ShareIcon } from './EnhancedIcons';
import { useParams } from 'next/navigation';

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

const getSocialLinks = (locale: string): SocialLink[] => [
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: '🎵',
    url: 'https://tiktok.com/@wiemachtderbaer',
    color: 'bg-black',
    hoverColor: 'hover:bg-pink-600',
    description: locale === 'en' ? 'Bomb Party Challenges & Party Game Trends' : 'Bomb Party Challenges & Trinkspiele-Trends',
    isActive: false // Coming Soon
  },
  {
    id: 'instagram',
    name: 'Instagram', 
    icon: '📸',
    url: 'https://instagram.com/wiemachtderbaer',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    hoverColor: 'hover:from-purple-600 hover:to-pink-600',
    description: locale === 'en' ? 'Party Inspiration & Gaming Highlights' : 'Party-Inspiration & Gaming-Highlights',
    isActive: false // Coming Soon
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '🎬',
    url: 'https://youtube.com/@wiemachtderbaer',
    color: 'bg-red-600',
    hoverColor: 'hover:bg-red-700',
    description: locale === 'en' ? 'Party Game Tutorials & Live Streams' : 'Trinkspiele-Tutorials & Live-Streams',
    isActive: false // Coming Soon
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: '🐦',
    url: 'https://twitter.com/wiemachtderbaer',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    description: locale === 'en' ? 'News, Updates & Community Chat' : 'News, Updates & Community-Chat',
    isActive: false // Coming Soon
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: '🎮',
    url: 'https://discord.gg/wiemachtderbaer',
    color: 'bg-indigo-600',
    hoverColor: 'hover:bg-indigo-700',
    description: locale === 'en' ? 'Community Server for Multiplayer Events' : 'Community-Server für Multiplayer-Events',
    isActive: false // Coming Soon
  }
];

export function SocialMediaLinks({ 
  variant = 'compact', 
  showLabels = true,
  className = '' 
}: SocialMediaLinksProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const params = useParams();
  const locale = (params as { locale?: string })?.locale === 'en' ? 'en' : 'de';
  const SOCIAL_LINKS = getSocialLinks(locale);

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
              title={`${social.name} - ${locale === 'en' ? 'Coming Soon!' : 'Bald verfügbar!'}`}
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
  title,
  subtitle,
  className = ""
}: FollowUsCTAProps) {
  const params = useParams();
  const locale = (params as { locale?: string })?.locale === 'en' ? 'en' : 'de';
  
  const defaultTitle = locale === 'en' 
    ? "🚀 Follow us for the latest updates!"
    : "🚀 Folge uns für die neuesten Updates!";
  const defaultSubtitle = locale === 'en'
    ? "Exclusive Bomb Party Challenges, new games and party tips directly in your feed."
    : "Exklusive Bomb Party Challenges, neue Spiele und Party-Tipps direkt in deinem Feed.";
    
  const SOCIAL_LINKS = getSocialLinks(locale);
  return (
    <section className={`py-16 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {title || defaultTitle}
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {subtitle || defaultSubtitle}
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
                
                {/* Platform Icon */}
                <div className="text-center mb-4">
                  <div className={`
                    text-4xl mb-3 transition-transform duration-300
                    ${social.isActive ? 'group-hover:scale-110' : 'opacity-60'}
                  `}>
                    {social.icon}
                  </div>
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
                      {locale === 'en' ? 'Follow' : 'Folgen'}
                    </a>
                  ) : (
                    <button 
                      disabled
                      className="btn-secondary text-xs opacity-50 cursor-not-allowed"
                    >
                      {locale === 'en' ? 'Coming soon' : 'Bald verfügbar'}
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-xl p-8 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">
            📧 {locale === 'en' ? 'Don\'t miss any updates!' : 'Verpasse keine Updates!'}
          </h3>
          <p className="text-base text-white/80 mb-6">
            {locale === 'en' 
              ? 'Sign up for our newsletter and be the first to know about new features, exclusive events and party tips!'
              : 'Melde dich für unseren Newsletter an und erfahre als Erste*r von neuen Features, exklusiven Events und Party-Tipps!'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={locale === 'en' ? 'your@email.com' : 'deine@email.de'}
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-orange-400/50"
            />
            <button className="btn-primary px-6 py-3 whitespace-nowrap">
              🎉 {locale === 'en' ? 'Subscribe' : 'Anmelden'}
            </button>
          </div>
          <p className="text-xs text-white/50 mt-3">
            {locale === 'en' 
              ? 'No spam, only the best party updates! Unsubscribe anytime.'
              : 'Keine Spam, nur die besten Party-Updates! Abmeldung jederzeit möglich.'
            }
          </p>
        </div>
      </div>
    </section>
  );
}
