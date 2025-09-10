/**
 * SEO Keywords Database für Wie macht der Bär
 * Zentrale Keyword-Verwaltung für konsistente SEO-Optimierung
 */

export interface KeywordData {
  primary: string;
  secondary: string[];
  longTail: string[];
  searchVolume: 'low' | 'medium' | 'high';
  difficulty: 'easy' | 'medium' | 'hard';
  intent: 'informational' | 'transactional' | 'navigational';
}

export const GAME_KEYWORDS: Record<string, KeywordData> = {
  bombParty: {
    primary: 'Bomb Party Trinkspiel',
    secondary: [
      'Bomb Party online spielen',
      'Bomb Party Regeln deutsch',
      'Bomb Party Multiplayer',
      'Bomb Party kostenlos'
    ],
    longTail: [
      'Bomb Party Trinkspiel online kostenlos spielen',
      'Wie funktioniert Bomb Party Spiel',
      'Bomb Party Regeln für Anfänger',
      'Bomb Party mit Freunden online',
      'Bomb Party Browser Spiel ohne Download',
      'Bomb Party Multiplayer Handy',
      'Bomb Party Varianten und Spielmodi'
    ],
    searchVolume: 'medium',
    difficulty: 'easy',
    intent: 'transactional'
  },

  neverHaveIEver: {
    primary: 'Ich hab noch nie online',
    secondary: [
      'Never Have I Ever deutsch',
      'Ich hab noch nie Spiel',
      'Ich hab noch nie Fragen',
      'Never Have I Ever online'
    ],
    longTail: [
      'Ich hab noch nie online spielen kostenlos',
      'Never Have I Ever Fragen deutsch',
      'Ich hab noch nie Trinkspiel online',
      'Never Have I Ever mit Freunden',
      'Ich hab noch nie lustige Fragen',
      'Never Have I Ever Multiplayer'
    ],
    searchVolume: 'high',
    difficulty: 'medium',
    intent: 'transactional'
  },

  truthOrDare: {
    primary: 'Wahrheit oder Pflicht online',
    secondary: [
      'Truth or Dare deutsch',
      'Wahrheit oder Pflicht Spiel',
      'Wahrheit oder Pflicht Fragen',
      'Truth or Dare online'
    ],
    longTail: [
      'Wahrheit oder Pflicht online spielen deutsch',
      'Truth or Dare Fragen für Erwachsene',
      'Wahrheit oder Pflicht Trinkspiel',
      'Truth or Dare mit Freunden online',
      'Wahrheit oder Pflicht lustige Aufgaben',
      'Truth or Dare Multiplayer Browser'
    ],
    searchVolume: 'high',
    difficulty: 'medium',
    intent: 'transactional'
  }
};

export const CATEGORY_KEYWORDS: Record<string, KeywordData> = {
  onlineDrinkingGames: {
    primary: 'Online Trinkspiele',
    secondary: [
      'Trinkspiele online kostenlos',
      'Digitale Trinkspiele',
      'Browser Trinkspiele',
      'Internet Partyspiele'
    ],
    longTail: [
      'Online Trinkspiele kostenlos ohne Anmeldung',
      'Trinkspiele Browser ohne Download',
      'Digitale Partyspiele für Erwachsene',
      'Internet Trinkspiele mit Freunden',
      'Online Saufspiele Multiplayer',
      'Trinkspiele Handy Browser',
      'Web Trinkspiele kostenlos spielen'
    ],
    searchVolume: 'high',
    difficulty: 'hard',
    intent: 'transactional'
  },

  partyGames: {
    primary: 'Partyspiele für Erwachsene',
    secondary: [
      'Erwachsenen Partyspiele',
      'Party Trinkspiele',
      'Gesellschaftsspiele Party',
      'Lustige Partyspiele'
    ],
    longTail: [
      'Partyspiele für Erwachsene ohne Material',
      'Lustige Trinkspiele für die Party',
      'Gesellschaftsspiele Party Erwachsene',
      'Partyspiele WG Feier',
      'Erwachsenen Spiele für Partys',
      'Party Trinkspiele lustig',
      'Geburtstag Partyspiele Erwachsene'
    ],
    searchVolume: 'high',
    difficulty: 'medium',
    intent: 'informational'
  },

  multiplayerGames: {
    primary: 'Multiplayer Trinkspiele',
    secondary: [
      'Trinkspiele mehrere Spieler',
      'Online Multiplayer Partyspiele',
      'Gruppenlenkspiele online',
      'Mehrspieler Trinkspiele'
    ],
    longTail: [
      'Multiplayer Trinkspiele online ohne App',
      'Trinkspiele für mehrere Handys',
      'Online Gruppenspiele Trinkspiele',
      'Multiplayer Partyspiele Browser',
      'Trinkspiele remote mit Freunden',
      'Mehrspieler Saufspiele online',
      'Gruppenlenkspiele Trinkspiele digital'
    ],
    searchVolume: 'medium',
    difficulty: 'easy',
    intent: 'transactional'
  }
};

export const BLOG_KEYWORDS: Record<string, KeywordData> = {
  partyPlanning: {
    primary: 'Party Trinkspiele',
    secondary: [
      'Trinkspiele Partyplanung',
      'Beste Trinkspiele Party',
      'Party Spiele Erwachsene',
      'Trinkspiele WG Party'
    ],
    longTail: [
      'Welche Trinkspiele für Party Zuhause',
      'Partyplanung Trinkspiele Tipps',
      'Beste Trinkspiele für kleine Party',
      'WG Party Trinkspiele Ideen',
      'Hausparty Trinkspiele ohne Material',
      'Party Trinkspiele für 4 Personen',
      'Geburtstag Party Trinkspiele Erwachsene'
    ],
    searchVolume: 'medium',
    difficulty: 'easy',
    intent: 'informational'
  },

  drinkingGameRules: {
    primary: 'Trinkspiele Regeln',
    secondary: [
      'Trinkspiele Anleitung',
      'Wie funktionieren Trinkspiele',
      'Trinkspiele Spielregeln',
      'Saufspiele Regeln'
    ],
    longTail: [
      'Trinkspiele Regeln für Anfänger',
      'Einfache Trinkspiele Anleitung',
      'Klassische Trinkspiele Spielregeln',
      'Trinkspiele Regeln ohne Karten',
      'Deutsche Trinkspiele Anleitung',
      'Trinkspiele Regeln Erwachsene',
      'Beliebte Trinkspiele Spielanleitung'
    ],
    searchVolume: 'medium',
    difficulty: 'easy',
    intent: 'informational'
  },

  safeDrinking: {
    primary: 'Sicheres Trinken Tipps',
    secondary: [
      'Verantwortungsvolles Trinken',
      'Alkohol Tipps Party',
      'Sicher feiern Alkohol',
      'Trinken ohne Kater'
    ],
    longTail: [
      'Wie trinke ich verantwortungsvoll auf Partys',
      'Tipps für sicheres Trinken bei Spielen',
      'Alkohol Grenzen bei Trinkspielen',
      'Verantwortungsvolles Feiern mit Alkohol',
      'Trinkspiele ohne zu viel Alkohol',
      'Sicher trinken bei Partyspiele',
      'Alkohol Tipps für Trinkspiele'
    ],
    searchVolume: 'low',
    difficulty: 'easy',
    intent: 'informational'
  }
};

export const SEASONAL_KEYWORDS: Record<string, KeywordData> = {
  newYear: {
    primary: 'Silvester Trinkspiele',
    secondary: [
      'Neujahr Partyspiele',
      'Silvester Party Spiele',
      'Jahreswechsel Trinkspiele',
      'Silvester Gesellschaftsspiele'
    ],
    longTail: [
      'Silvester Trinkspiele für Zuhause',
      'Neujahr Party Trinkspiele Ideen',
      'Jahreswechsel Partyspiele Erwachsene',
      'Silvester Spiele ohne Material',
      'Silvester Party Trinkspiele lustig',
      'Neujahr Gesellschaftsspiele Alkohol'
    ],
    searchVolume: 'high',
    difficulty: 'medium',
    intent: 'informational'
  },

  birthday: {
    primary: 'Geburtstag Trinkspiele',
    secondary: [
      'Geburtstag Partyspiele',
      'Birthday Party Trinkspiele',
      'Geburtstag Spiele Erwachsene',
      'Geburtstag Gesellschaftsspiele'
    ],
    longTail: [
      'Geburtstag Trinkspiele für Erwachsene',
      'Lustige Geburtstag Partyspiele mit Alkohol',
      'Geburtstag Party Spiele 18 plus',
      'Erwachsenen Geburtstag Trinkspiele',
      'Geburtstag Gesellschaftsspiele lustig',
      'Birthday Party Games deutsch'
    ],
    searchVolume: 'medium',
    difficulty: 'easy',
    intent: 'informational'
  }
};

// 🔥 ERWEITERTE KEYWORD-KATEGORIEN 2024/2025

export const TRENDING_KEYWORDS: Record<string, KeywordData> = {
  remoteParty: {
    primary: 'Online Party Spiele remote',
    secondary: [
      'Remote Trinkspiele',
      'Online Party mit Freunden',
      'Digitale Gruppenspiele',
      'Fernbeziehung Partyspiele'
    ],
    longTail: [
      'Online Party Spiele remote mit Freunden',
      'Trinkspiele online fernbeziehung',
      'Remote Partyspiele über Handy',
      'Online Gruppenspiele Trinkspiele',
      'Digitale Party Ideen mit Alkohol',
      'Remote Trinkspiele für Paare',
      'Online Party Games Deutschland'
    ],
    searchVolume: 'medium',
    difficulty: 'easy',
    intent: 'transactional'
  },

  mobileGaming: {
    primary: 'Trinkspiele Handy Browser',
    secondary: [
      'Mobile Trinkspiele online',
      'Handy Partyspiele Browser',
      'Smartphone Trinkspiele',
      'Mobile Party Games'
    ],
    longTail: [
      'Trinkspiele Handy Browser ohne App',
      'Mobile Trinkspiele online kostenlos',
      'Smartphone Partyspiele ohne Download',
      'Handy Trinkspiele mehrere Spieler',
      'Mobile Browser Partyspiele deutsch',
      'iOS Android Trinkspiele Browser',
      'Handy Trinkspiele für Gruppen'
    ],
    searchVolume: 'high',
    difficulty: 'medium',
    intent: 'transactional'
  },

  socialMedia: {
    primary: 'TikTok Trinkspiele Trends',
    secondary: [
      'Instagram Partyspiele',
      'Social Media Trinkspiele',
      'Viral Trinkspiele',
      'Trending Party Games'
    ],
    longTail: [
      'TikTok Trinkspiele viral 2024',
      'Instagram Stories Partyspiele',
      'Social Media Trinkspiele Trends',
      'Viral Partyspiele für Gen Z',
      'TikTok Party Games deutsch',
      'Instagram Live Trinkspiele',
      'Trending Trinkspiele Deutschland'
    ],
    searchVolume: 'medium',
    difficulty: 'medium',
    intent: 'informational'
  },

  generational: {
    primary: 'Gen Z Trinkspiele',
    secondary: [
      'Millennials Partyspiele',
      'Generation Z Party Games',
      'Junge Erwachsene Trinkspiele',
      'Student Trinkspiele'
    ],
    longTail: [
      'Gen Z Trinkspiele online kostenlos',
      'Millennials Partyspiele digital',
      'Generation Z Party Games Browser',
      'Student Trinkspiele ohne Material',
      'Junge Erwachsene Online Partyspiele',
      'Uni Trinkspiele online spielen',
      'Generation Z Saufspiele digital'
    ],
    searchVolume: 'medium',
    difficulty: 'easy',
    intent: 'transactional'
  }
};

export const TECHNICAL_KEYWORDS: Record<string, KeywordData> = {
  noDownload: {
    primary: 'Trinkspiele ohne Download',
    secondary: [
      'Browser Trinkspiele ohne App',
      'Online Spiele ohne Installation',
      'Sofort spielbare Trinkspiele',
      'Web Trinkspiele kostenlos'
    ],
    longTail: [
      'Trinkspiele ohne Download sofort spielen',
      'Browser Trinkspiele ohne App Installation',
      'Online Partyspiele ohne Anmeldung',
      'Sofort spielbare Web Trinkspiele',
      'Trinkspiele direkt im Browser',
      'Keine App nötig Trinkspiele online',
      'Instantly playable drinking games'
    ],
    searchVolume: 'high',
    difficulty: 'easy',
    intent: 'transactional'
  },

  crossPlatform: {
    primary: 'Plattformübergreifende Trinkspiele',
    secondary: [
      'Cross Platform Party Games',
      'Alle Geräte Trinkspiele',
      'Universal Partyspiele',
      'Kompatible Online Spiele'
    ],
    longTail: [
      'Trinkspiele Windows Mac iOS Android',
      'Cross Platform Partyspiele Browser',
      'Alle Geräte kompatible Trinkspiele',
      'Universal Online Partyspiele',
      'Plattformunabhängige Trinkspiele',
      'Handy Laptop Trinkspiele zusammen',
      'Cross Device Party Games'
    ],
    searchVolume: 'low',
    difficulty: 'easy',
    intent: 'informational'
  }
};

/**
 * Keyword-Utility Funktionen
 */
export function getKeywordsForPage(pageType: string): string[] {
  switch (pageType) {
    case 'bomb':
      return [
        GAME_KEYWORDS.bombParty.primary,
        ...GAME_KEYWORDS.bombParty.secondary,
        ...GAME_KEYWORDS.bombParty.longTail.slice(0, 3),
        ...TRENDING_KEYWORDS.mobileGaming.secondary.slice(0, 2)
      ];
    case 'neverhaveiever':
      return [
        GAME_KEYWORDS.neverHaveIEver.primary,
        ...GAME_KEYWORDS.neverHaveIEver.secondary,
        ...GAME_KEYWORDS.neverHaveIEver.longTail.slice(0, 3),
        ...TRENDING_KEYWORDS.socialMedia.secondary.slice(0, 2)
      ];
    case 'truthordare':
      return [
        GAME_KEYWORDS.truthOrDare.primary,
        ...GAME_KEYWORDS.truthOrDare.secondary,
        ...GAME_KEYWORDS.truthOrDare.longTail.slice(0, 3),
        ...TRENDING_KEYWORDS.generational.secondary.slice(0, 2)
      ];
    case 'homepage':
      return [
        CATEGORY_KEYWORDS.onlineDrinkingGames.primary,
        ...CATEGORY_KEYWORDS.onlineDrinkingGames.secondary,
        ...CATEGORY_KEYWORDS.partyGames.secondary,
        ...TECHNICAL_KEYWORDS.noDownload.secondary.slice(0, 2),
        ...TRENDING_KEYWORDS.mobileGaming.secondary.slice(0, 2)
      ];
    case 'blog':
      return [
        BLOG_KEYWORDS.partyPlanning.primary,
        ...BLOG_KEYWORDS.drinkingGameRules.secondary,
        ...BLOG_KEYWORDS.safeDrinking.secondary,
        ...TRENDING_KEYWORDS.socialMedia.secondary.slice(0, 2)
      ];
    default:
      return [];
  }
}

// 🎯 ERWEITERTE KEYWORD-FUNKTIONEN

export function getTrendingKeywords(): string[] {
  return [
    ...Object.values(TRENDING_KEYWORDS).flatMap(k => [k.primary, ...k.secondary.slice(0, 2)]),
    ...Object.values(TECHNICAL_KEYWORDS).flatMap(k => [k.primary, ...k.secondary.slice(0, 2)])
  ];
}

export function getLongTailKeywords(category: string): string[] {
  const allCategories = {
    ...GAME_KEYWORDS,
    ...CATEGORY_KEYWORDS,
    ...BLOG_KEYWORDS,
    ...TRENDING_KEYWORDS,
    ...TECHNICAL_KEYWORDS,
    ...SEASONAL_KEYWORDS
  };
  
  return Object.values(allCategories).flatMap(k => k.longTail);
}

export function getKeywordsByIntent(intent: 'informational' | 'transactional' | 'navigational'): string[] {
  const allCategories = {
    ...GAME_KEYWORDS,
    ...CATEGORY_KEYWORDS,
    ...BLOG_KEYWORDS,
    ...TRENDING_KEYWORDS,
    ...TECHNICAL_KEYWORDS,
    ...SEASONAL_KEYWORDS
  };
  
  return Object.values(allCategories)
    .filter(k => k.intent === intent)
    .flatMap(k => [k.primary, ...k.secondary]);
}

export function generateMetaDescription(keywords: string[], pageContext: string): string {
  const primaryKeyword = keywords[0];
  const secondaryKeywords = keywords.slice(1, 4).join(', ');
  
  return `${primaryKeyword} - ${pageContext}. Entdecke ${secondaryKeywords} kostenlos online. Ohne Download, direkt im Browser spielbar!`;
}

export function generateTitle(primaryKeyword: string, brand: string = "Wie macht der Bär"): string {
  return `${primaryKeyword} | ${brand}`;
}
