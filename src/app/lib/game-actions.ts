"use server";

export interface GameCard {
  id: string;
  title: string;
  description: string;
  subtitle: string;
  href: string | null;
  gradient: string;
  iconSrc: string;
  available: boolean;
  players: string;
  difficulty: string;
  imageSrc?: string;
  priority: number; // Für Sortierung
}

// Statische Spiele-Daten
const GAMES_DATABASE: GameCard[] = [
  {
    id: "bomb-party",
    title: "Bomb Party",
    description: "Der Klassiker",
    subtitle: "Wörter finden bevor die Bombe explodiert!",
    href: "/game/bomb",
    gradient: "from-orange-500 via-red-500 to-pink-600",
    iconSrc: "/bomb.svg",
    available: true,
    players: "2-8 Spieler",
    difficulty: "Einfach",
    imageSrc: "/bearbomb.jpg",
    priority: 1
  },
  {
    id: "never-have-i-ever",
    title: "Ich hab noch nie",
    description: "Der Wahrheitskracher",
    subtitle: "Geständnisse und peinliche Momente!",
    href: "/game/neverhaveiever",
    gradient: "from-blue-500 via-purple-500 to-pink-600",
    iconSrc: "/icons/question.svg",
    available: true,
    players: "3-12 Spieler",
    difficulty: "Einfach",
    imageSrc: "/bearhands.jpg",
    priority: 2
  },
  {
    id: "truth-or-dare",
    title: "Wahrheit oder Pflicht",
    description: "Der Partykracher",
    subtitle: "Ehrliche Fragen und mutige Aufgaben!",
    href: "/game/truthordare",
    gradient: "from-pink-500 via-purple-500 to-red-600",
    iconSrc: "/icons/question.svg",
    available: true,
    players: "2-10 Spieler",
    difficulty: "Einfach",
    imageSrc: "/bearcards.jpg",
    priority: 3
  }
];

// Lokalisierte Spieltitel und -beschreibungen
const GAME_LOCALIZATIONS = {
  de: {
    "bomb-party": {
      title: "Bomb Party",
      description: "Der Klassiker",
      subtitle: "Wörter finden bevor die Bombe explodiert!",
      players: "2-8 Spieler",
      difficulty: "Einfach"
    },
    "never-have-i-ever": {
      title: "Ich hab noch nie",
      description: "Der Wahrheitskracher",
      subtitle: "Geständnisse und peinliche Momente!",
      players: "3-12 Spieler",
      difficulty: "Einfach"
    },
    "truth-or-dare": {
      title: "Wahrheit oder Pflicht",
      description: "Der Partykracher",
      subtitle: "Ehrliche Fragen und mutige Aufgaben!",
      players: "2-10 Spieler",
      difficulty: "Einfach"
    }
  },
  en: {
    "bomb-party": {
      title: "Bomb Party",
      description: "The Classic",
      subtitle: "Find words before the bomb explodes!",
      players: "2-8 Players",
      difficulty: "Easy"
    },
    "never-have-i-ever": {
      title: "Never Have I Ever",
      description: "The Truth Cracker",
      subtitle: "Confessions and embarrassing moments!",
      players: "3-12 Players",
      difficulty: "Easy"
    },
    "truth-or-dare": {
      title: "Truth or Dare",
      description: "The Party Cracker",
      subtitle: "Honest questions and brave challenges!",
      players: "2-10 Players",
      difficulty: "Easy"
    }
  }
};

export interface GetGamesParams {
  offset?: number;
  limit?: number;
  direction?: 'forward' | 'backward';
}

export interface GetGamesResult {
  games: GameCard[];
  hasMore: boolean;
  nextOffset: number;
  total: number;
}

// Simuliert Netzwerk-Latenz für realistisches Verhalten
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getGames({
  offset = 0,
  limit = 3,
  direction = 'forward',
  locale = 'de'
}: GetGamesParams & { locale?: 'de' | 'en' } = {}): Promise<GetGamesResult> {
  // Realistische Latenz simulieren
  await delay(800);

  const totalGames = GAMES_DATABASE.length;
  let games: GameCard[];
  
  if (direction === 'backward') {
    // Rückwärts scrollen - lade Items vor dem aktuellen Offset (zirkulär)
    games = [];
    for (let i = 0; i < limit; i++) {
      const index = ((offset - i - 1) + totalGames) % totalGames;
      games.unshift(GAMES_DATABASE[index]); // Füge am Anfang hinzu für korrekte Reihenfolge
    }
  } else {
    // Vorwärts scrollen - verwende zirkuläres Loading
    games = [];
    for (let i = 0; i < limit; i++) {
      const index = (offset + i) % totalGames;
      games.push(GAMES_DATABASE[index]);
    }
  }

  // Lokalisierung anwenden
  const localizedGames = games.map(game => {
    const localization = GAME_LOCALIZATIONS[locale]?.[game.id as keyof typeof GAME_LOCALIZATIONS[typeof locale]];
    if (localization) {
      return {
        ...game,
        title: localization.title,
        description: localization.description,
        subtitle: localization.subtitle,
        players: localization.players,
        difficulty: localization.difficulty
      };
    }
    return game;
  });

  console.log(`🎮 Server Action: getGames(offset=${offset}, limit=${limit}, direction=${direction}, locale=${locale})`);
  console.log(`📊 Returning ${localizedGames.length} games, zirkulär=true`);

  return {
    games: localizedGames,
    hasMore: true, // Zirkuläres Scrollen - immer mehr verfügbar
    nextOffset: direction === 'forward' 
      ? (offset + limit) % totalGames 
      : ((offset - limit) + totalGames) % totalGames,
    total: totalGames
  };
}

// Initial laden für SEO
export async function getInitialGames(locale: 'de' | 'en' = 'de'): Promise<GetGamesResult> {
  return getGames({ offset: 0, limit: 3, locale });
}

// Für Suchfunktionalität (optional)
export async function searchGames(query: string): Promise<GameCard[]> {
  await delay(300);
  
  const lowerQuery = query.toLowerCase();
  return GAMES_DATABASE.filter(game => 
    game.title.toLowerCase().includes(lowerQuery) ||
    game.subtitle.toLowerCase().includes(lowerQuery) ||
    game.description.toLowerCase().includes(lowerQuery)
  );
}
