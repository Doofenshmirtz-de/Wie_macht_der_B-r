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
    priority: 2
  },
  {
    id: "quiz-show",
    title: "Quiz Show",
    description: "Bald verfügbar",
    subtitle: "Teste dein Wissen in verschiedenen Kategorien!",
    href: null,
    gradient: "from-purple-500 via-blue-500 to-indigo-600",
    iconSrc: "/icons/rocket.svg",
    available: false,
    players: "2-12 Spieler",
    difficulty: "Mittel",
    priority: 3
  },
  {
    id: "charades",
    title: "Charades",
    description: "Bald verfügbar",
    subtitle: "Pantomime mit Trinkregeln!",
    href: null,
    gradient: "from-green-500 via-teal-500 to-blue-600",
    iconSrc: "/icons/gift.svg",
    available: false,
    players: "4-10 Spieler",
    difficulty: "Schwer",
    priority: 4
  },
  {
    id: "never-have-i-ever",
    title: "Never Have I Ever",
    description: "Der Wahrheitskracher",
    subtitle: "Geständnisse und peinliche Momente!",
    href: null,
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    iconSrc: "/icons/gear.svg",
    available: false,
    players: "3-12 Spieler",
    difficulty: "Einfach",
    priority: 5
  },
  {
    id: "drinking-roulette",
    title: "Drinking Roulette",
    description: "Der Zufallskracher",
    subtitle: "Alles oder nichts - trink oder verliere!",
    href: null,
    gradient: "from-red-500 via-pink-500 to-purple-600",
    iconSrc: "/icons/explosion.svg",
    available: false,
    players: "2-8 Spieler",
    difficulty: "Mittel",
    priority: 6
  },
  {
    id: "beer-pong-pro",
    title: "Beer Pong Pro",
    description: "Coming Soon",
    subtitle: "Der ultimative Wurf-Simulator!",
    href: null,
    gradient: "from-yellow-500 via-orange-500 to-red-600",
    iconSrc: "/icons/rocket.svg",
    available: false,
    players: "2-4 Spieler",
    difficulty: "Mittel",
    priority: 7
  },
  {
    id: "kings-cup",
    title: "Kings Cup",
    description: "Coming Soon",
    subtitle: "Das klassische Kartenspiel digital!",
    href: null,
    gradient: "from-indigo-500 via-purple-500 to-pink-600",
    iconSrc: "/icons/gift.svg",
    available: false,
    players: "3-8 Spieler",
    difficulty: "Mittel",
    priority: 8
  },
  {
    id: "flip-cup",
    title: "Flip Cup",
    description: "Coming Soon",
    subtitle: "Speed-Trinkspiel für Teams!",
    href: null,
    gradient: "from-blue-500 via-cyan-500 to-teal-600",
    iconSrc: "/icons/explosion.svg",
    available: false,
    players: "4-12 Spieler",
    difficulty: "Einfach",
    priority: 9
  },
  {
    id: "power-hour",
    title: "Power Hour",
    description: "Coming Soon", 
    subtitle: "60 Minuten, 60 Shots, unendlicher Spaß!",
    href: null,
    gradient: "from-emerald-500 via-green-500 to-lime-600",
    iconSrc: "/icons/gear.svg",
    available: false,
    players: "1-∞ Spieler",
    difficulty: "Schwer",
    priority: 10
  }
];

export interface GetGamesParams {
  offset?: number;
  limit?: number;
  direction?: 'forward' | 'backward';
  lastId?: string;
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
  lastId
}: GetGamesParams = {}): Promise<GetGamesResult> {
  // Realistische Latenz simulieren
  await delay(800);

  const totalGames = GAMES_DATABASE.length;
  let games: GameCard[];
  let hasMore = true; // Für zirkuläres Scrollen immer true
  
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

  console.log(`🎮 Server Action: getGames(offset=${offset}, limit=${limit}, direction=${direction})`);
  console.log(`📊 Returning ${games.length} games, zirkulär=true`);

  return {
    games,
    hasMore: true, // Zirkuläres Scrollen - immer mehr verfügbar
    nextOffset: direction === 'forward' 
      ? (offset + limit) % totalGames 
      : ((offset - limit) + totalGames) % totalGames,
    total: totalGames
  };
}

// Initial laden für SEO
export async function getInitialGames(): Promise<GetGamesResult> {
  return getGames({ offset: 0, limit: 4 });
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
