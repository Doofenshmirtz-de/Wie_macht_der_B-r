import { Metadata } from 'next';
import { getKeywordsForPage } from '../../../lib/keywords';

export function generateBombPartyMetadata(locale: 'de' | 'en'): Metadata {
  const keywords = getKeywordsForPage('bomb');
  
  if (locale === 'de') {
    return {
      title: "Bomb Party Trinkspiel online kostenlos spielen",
      description: "🔥 Bomb Party Multiplayer Trinkspiel kostenlos spielen! Ohne Download im Browser. Bomb Party Regeln, Varianten & Online Multiplayer mit Freunden. Jetzt starten!",
      keywords: keywords,
      openGraph: {
        title: "Bomb Party Trinkspiel | Online Multiplayer kostenlos",
        description: "Das beste Bomb Party Trinkspiel online! Multiplayer-Modus, keine App nötig, direkt im Browser spielbar.",
        type: 'website',
        locale: 'de_DE',
      },
      twitter: {
        card: 'summary_large_image',
        title: "Bomb Party Online Trinkspiel - Kostenlos spielen",
        description: "🔥 Bomb Party Multiplayer ohne Download! Das beste Online Trinkspiel für deine Party.",
      },
      alternates: {
        canonical: '/de/game/bomb',
        languages: {
          'de': '/de/game/bomb',
          'en': '/en/game/bomb',
        },
      },
    };
  }

  return {
    title: "Bomb Party Drinking Game online free",
    description: "🔥 Play Bomb Party Multiplayer Drinking Game free online! No download, browser-based. Rules, variants & online multiplayer with friends. Start now!",
    keywords: [
      "Bomb Party drinking game",
      "online drinking games free",
      "multiplayer drinking games",
      "browser drinking games",
      "Bomb Party online",
      "free party games"
    ],
    openGraph: {
      title: "Bomb Party Drinking Game | Online Multiplayer Free",
      description: "The best Bomb Party drinking game online! Multiplayer mode, no app needed, play directly in browser.",
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Bomb Party Online Drinking Game - Play Free",
      description: "🔥 Bomb Party Multiplayer without download! The best online drinking game for your party.",
    },
    alternates: {
      canonical: '/en/game/bomb',
      languages: {
        'de': '/de/game/bomb',
        'en': '/en/game/bomb',
      },
    },
  };
}
