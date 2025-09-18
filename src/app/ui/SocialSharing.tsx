'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useAnalytics } from '../providers/AnalyticsProvider';

interface SocialSharingProps {
  title?: string;
  description?: string;
  url?: string;
  variant?: 'full' | 'compact' | 'floating';
  className?: string;
}

export function SocialSharing({ 
  title = "Bear Party - Die besten Online Partyspiele",
  description = "Spiel Bomb Party, Ich hab noch nie & Wahrheit oder Pflicht online mit Freunden!",
  url = typeof window !== 'undefined' ? window.location.href : 'https://www.wie-macht-der-baer.de',
  variant = 'full',
  className = ''
}: SocialSharingProps) {
  
  const params = useParams() as { locale?: string };
  const locale = params?.locale === 'en' ? 'en' : 'de';
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const { trackEvent } = useAnalytics();

  const shareData = {
    title,
    text: description,
    url
  };

  const handleNativeShare = async () => {
    trackEvent('social_share', { 
      platform: 'native',
      content: title,
      event_category: 'engagement'
    });

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Share cancelled or failed:', error);
      }
    } else {
      // Fallback: Show share menu
      setShowShareMenu(true);
    }
  };

  const handlePlatformShare = (platform: string, shareUrl: string) => {
    trackEvent('social_share', {
      platform,
      content: title,
      event_category: 'engagement'
    });

    window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    setShowShareMenu(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedToClipboard(true);
      
      trackEvent('social_share', {
        platform: 'clipboard',
        content: title,
        event_category: 'engagement'
      });

      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const sharePlatforms = [
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`
    },
    {
      name: 'Telegram',
      icon: '✈️',
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'Instagram Stories',
      icon: '📸',
      url: `https://www.instagram.com/` // Instagram Stories API ist komplexer
    },
    {
      name: 'Discord',
      icon: '🎮',
      url: `https://discord.com/channels/@me` // Discord sharing
    }
  ];

  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={handleNativeShare}
          className="cr-button-primary px-4 py-2 text-sm font-bold flex items-center gap-2"
          aria-label={locale === 'en' ? 'Share' : 'Teilen'}
        >
          <span>📤</span>
          <span>{locale === 'en' ? 'Share' : 'Teilen'}</span>
        </button>
      </div>
    );
  }

  if (variant === 'floating') {
    return (
      <div className={`fixed right-4 bottom-20 z-40 ${className}`}>
        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="cr-button-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
            aria-label={locale === 'en' ? 'Share on social media' : 'Social Media Teilen'}
          >
            <span className="text-xl">📤</span>
          </button>

          {showShareMenu && (
            <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm rounded-lg p-3 min-w-[200px] animate-scale-in">
              <div className="grid grid-cols-2 gap-2">
                {sharePlatforms.slice(0, 4).map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => handlePlatformShare(platform.name, platform.url)}
                    className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-colors text-sm"
                  >
                    <span>{platform.icon}</span>
                    <span className="text-white">{platform.name}</span>
                  </button>
                ))}
              </div>
              
              <div className="border-t border-white/20 mt-3 pt-3">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-colors text-sm"
                >
                  <span>{copiedToClipboard ? '✅' : '🔗'}</span>
                  <span className="text-white">
                    {copiedToClipboard ? (locale === 'en' ? 'Copied!' : 'Kopiert!') : (locale === 'en' ? 'Copy link' : 'Link kopieren')}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <section className={`relative py-16 ${className}`}>
      <div className="mx-auto max-w-screen-lg px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg mb-4">
            {locale === 'en' ? '📤 SHARE THE FUN!' : '📤 TEILE DEN SPASS!'}
          </h2>
          <p className="text-white/80 text-lg">
            {locale === 'en' ? 'Show your friends the coolest online party games!' : 'Zeige deinen Freunden die geilsten Online-Partyspiele!'}
          </p>
        </div>

        <div className="cr-card p-8 max-w-2xl mx-auto">
          {/* Quick Share Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleNativeShare}
              className="cr-button-primary px-8 py-4 text-lg font-black flex items-center gap-3 mx-auto group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">📱</span>
              <span>{locale === 'en' ? 'SHARE NOW' : 'JETZT TEILEN'}</span>
              <span className="text-2xl group-hover:scale-110 transition-transform">📤</span>
            </button>
            <p className="text-white/60 text-sm mt-3">
              {locale === 'en' ? 'Quick share via your system' : 'Schnell-Teilen über dein System'}
            </p>
          </div>

          {/* Platform Grid */}
          <div className="border-t border-white/20 pt-8">
            <h3 className="text-center text-white font-bold mb-6">
              {locale === 'en' ? '🌐 Or choose your platform:' : '🌐 Oder wähle deine Plattform:'}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {sharePlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => handlePlatformShare(platform.name, platform.url)}
                  className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-105 border border-white/10"
                >
                  <span className="text-3xl">{platform.icon}</span>
                  <span className="text-white font-semibold text-sm">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Copy Link */}
          <div className="border-t border-white/20 pt-6 mt-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white text-sm"
              />
              <button
                onClick={handleCopyLink}
                className={`px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${
                  copiedToClipboard 
                    ? 'bg-green-500 text-white' 
                    : 'cr-button-primary'
                }`}
              >
                {copiedToClipboard ? (locale === 'en' ? '✅ Copied!' : '✅ Kopiert!') : (locale === 'en' ? '🔗 Copy' : '🔗 Kopieren')}
              </button>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-12">
          <p className="text-yellow-300 font-bold">
            {locale === 'en' ? '💪 Over 2,134 players have already shared us!' : '💪 Über 2,134 Spieler haben uns bereits geteilt!'}
          </p>
        </div>
      </div>
    </section>
  );
}
