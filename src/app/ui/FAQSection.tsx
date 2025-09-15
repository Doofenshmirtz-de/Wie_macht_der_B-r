'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BombIcon, GameIcon, SearchIcon } from './EnhancedIcons';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'games' | 'technical' | 'safety';
  keywords: string[];
}

const FAQ_DATA: FAQItem[] = [
  // GENERAL KATEGORIE
  {
    id: 'what-are-online-drinking-games',
    question: 'Was sind Online Trinkspiele und wie funktionieren sie?',
    answer: 'Online Trinkspiele sind digitale Versionen klassischer Partyspiele, die direkt im Browser gespielt werden. Du brauchst keine App herunterzuladen - einfach die Website besuchen, Freunde einladen und sofort loslegen! Unsere Spiele wie Bomb Party, Ich hab noch nie und Wahrheit oder Pflicht sind kostenlos und für Erwachsene ab 18 Jahren konzipiert.',
    category: 'general',
    keywords: ['Online Trinkspiele', 'Browser Trinkspiele', 'kostenlos']
  },
  {
    id: 'why-online-drinking-games',
    question: 'Warum Online Trinkspiele statt echte Karten oder Apps?',
    answer: 'Online Trinkspiele bieten viele Vorteile: Keine Downloads nötig, sofort verfügbar, automatische Spielabläufe, Multiplayer-Funktionen und regelmäßige Updates mit neuen Inhalten. Du kannst spontan mit Freunden spielen, ohne Materialien vorzubereiten oder Apps zu installieren.',
    category: 'general',
    keywords: ['Browser Spiele', 'ohne Download', 'Multiplayer']
  },
  {
    id: 'party-planning-drinking-games',
    question: 'Welche Trinkspiele eignen sich am besten für Party-Planung?',
    answer: 'Für Partys empfehlen wir eine Mischung aus verschiedenen Spieltypen: Bomb Party als energiegeladenes Wortspiel, Ich hab noch nie für lustige Geständnisse und Wahrheit oder Pflicht für mutige Aufgaben. So bleibt die Party abwechslungsreich und alle Gäste kommen auf ihre Kosten!',
    category: 'general',
    keywords: ['Party Trinkspiele', 'Partyplanung', 'WG Party']
  },
  {
    id: 'drinking-games-for-small-groups',
    question: 'Welche Trinkspiele funktionieren gut für kleine Gruppen?',
    answer: 'Alle unsere Spiele sind perfekt für kleine Gruppen ab 2 Personen! Besonders "Ich hab noch nie" und "Wahrheit oder Pflicht" sind ideal für intime Runden. Bomb Party macht schon ab 3-4 Spielern richtig Spaß und wird mit mehr Leuten noch spannender.',
    category: 'general',
    keywords: ['kleine Gruppe', 'Trinkspiele zu zweit', '2 Personen']
  },
  {
    id: 'student-drinking-games',
    question: 'Gibt es spezielle Trinkspiele für Studenten und WG-Partys?',
    answer: 'Absolut! Unsere Online Trinkspiele sind perfekt für Studenten-WGs: kostenlos, spontan spielbar und ohne Vorbereitungszeit. Bomb Party ist besonders beliebt bei WG-Partys, da es schnell erklärt ist und für viele Lacher sorgt. Perfekt für entspannte Abende oder Pre-Gaming!',
    category: 'general',
    keywords: ['Studenten Trinkspiele', 'WG Party', 'Uni Party']
  },

  // GAMES KATEGORIE
  {
    id: 'bomb-party-rules',
    question: 'Wie funktioniert das Bomb Party Trinkspiel?',
    answer: 'Bomb Party ist ein schnelles Wortspiel: Du bekommst eine Buchstaben-Kombination und musst Wörter finden, die diese enthalten, bevor die Bombe explodiert! Schaffst du es nicht rechtzeitig, musst du trinken. Das Spiel wird immer schneller und sorgt für garantierte Lachanfälle. Bis zu 16 Spieler können gleichzeitig mitspielen!',
    category: 'games',
    keywords: ['Bomb Party Regeln', 'Bomb Party Trinkspiel', 'Wortspiel']
  },
  {
    id: 'never-have-i-ever-online',
    question: 'Wie spielt man "Ich hab noch nie" online?',
    answer: 'Bei "Ich hab noch nie" werden Aussagen vorgelesen wie "Ich hab noch nie... einen Film im Kino gesehen". Alle, die das schon mal gemacht haben, müssen trinken! Unser Online-System bietet hunderte von Fragen in verschiedenen Kategorien - von harmlos bis pikant. Perfekt um Freunde besser kennenzulernen!',
    category: 'games',
    keywords: ['Ich hab noch nie', 'Never Have I Ever', 'Geständnisse']
  },
  {
    id: 'truth-or-dare-adults',
    question: 'Ist Wahrheit oder Pflicht auch für Erwachsene geeignet?',
    answer: 'Definitiv! Unser "Wahrheit oder Pflicht" ist speziell für Erwachsene ab 18 konzipiert. Die Fragen und Aufgaben sind anspruchsvoller und können durchaus pikant werden. Du kannst zwischen verschiedenen Schwierigkeitsgraden wählen - von harmlos bis sehr gewagt. Perfekt für lockere Erwachsenen-Runden!',
    category: 'games',
    keywords: ['Wahrheit oder Pflicht Erwachsene', 'Truth or Dare', 'Aufgaben']
  },
  {
    id: 'drinking-games-without-alcohol',
    question: 'Kann man die Spiele auch ohne Alkohol spielen?',
    answer: 'Natürlich! Alle unsere Spiele funktionieren genauso gut mit alkoholfreien Getränken. Statt Alkohol könnt ihr Softdrinks, Wasser oder lustige "Strafen" wie Süßigkeiten essen verwenden. Die Spiele bleiben genauso unterhaltsam und eignen sich auch perfekt für alkoholfreie Partys!',
    category: 'games',
    keywords: ['ohne Alkohol', 'alkoholfrei', 'Softdrinks']
  },

  // TECHNICAL KATEGORIE  
  {
    id: 'browser-compatibility',
    question: 'Welche Browser und Geräte werden unterstützt?',
    answer: 'Unsere Spiele laufen in allen modernen Browsern: Chrome, Firefox, Safari, Edge. Sie funktionieren auf Smartphones, Tablets, Laptops und Desktop-PCs. Die Spiele sind vollständig responsiv designed - egal ob iPhone, Android oder Computer, du kannst überall mitspielen!',
    category: 'technical',
    keywords: ['Browser', 'Handy', 'Smartphone', 'responsive']
  },
  {
    id: 'multiplayer-setup',
    question: 'Wie funktioniert der Multiplayer-Modus?',
    answer: 'Super einfach! Ein Spieler erstellt ein Spiel und bekommt einen Raum-Code. Alle anderen geben diesen Code ein und sind sofort dabei. Ihr könnt bis zu 16 Personen gleichzeitig spielen - perfekt für große Partys! Das System funktioniert ohne Anmeldung oder App-Download.',
    category: 'technical',
    keywords: ['Multiplayer', 'Raum Code', 'ohne Anmeldung']
  },
  {
    id: 'no-download-required',
    question: 'Muss ich eine App herunterladen?',
    answer: 'Nein! Alle unsere Trinkspiele laufen direkt im Browser - komplett ohne Download. Einfach die Website besuchen und sofort loslegen. Das spart Speicherplatz auf deinem Handy und du bist immer auf der neuesten Version. Perfekt für spontane Spiele!',
    category: 'technical',
    keywords: ['ohne Download', 'keine App', 'Browser Spiel']
  },
  {
    id: 'internet-connection',
    question: 'Brauche ich eine Internetverbindung zum Spielen?',
    answer: 'Für den Multiplayer-Modus brauchst du Internet. Aber wir arbeiten an einer Offline-Version für einzelne Spiele! Die meisten Features funktionieren auch bei schwacher Verbindung problemlos. Für die beste Erfahrung empfehlen wir WLAN oder stabile mobile Daten.',
    category: 'technical',
    keywords: ['Internet', 'Offline', 'WLAN', 'mobile Daten']
  },

  // SAFETY KATEGORIE
  {
    id: 'responsible-drinking',
    question: 'Wie kann ich verantwortungsvoll mit Alkohol umgehen?',
    answer: 'Sicherheit geht vor! Trinkt immer in Maßen, sorgt für genug Wasser und Essen. Bestimmt einen nüchternen Fahrer oder nutzt öffentliche Verkehrsmittel. Hört auf euren Körper und zwingt niemanden zum Trinken. Unsere Spiele sollen Spaß machen, nicht gefährlich werden!',
    category: 'safety',
    keywords: ['verantwortlich trinken', 'Sicherheit', 'Maßen']
  },
  {
    id: 'drinking-limits',
    question: 'Wie erkenne ich meine Grenzen beim Trinken?',
    answer: 'Achtet auf Warnsignale: Schwindel, Übelkeit oder verlangsamte Reaktionen. Trinkt viel Wasser zwischen den alkoholischen Getränken. Esst vor und während dem Spielen. Wenn ihr euch unwohl fühlt, hört sofort auf. Eure Gesundheit ist wichtiger als jedes Spiel!',
    category: 'safety',
    keywords: ['Grenzen', 'Warnsignale', 'Gesundheit']
  },
  {
    id: 'peer-pressure',
    question: 'Was tun wenn ich nicht trinken möchte?',
    answer: 'Jeder hat das Recht "Nein" zu sagen! Echte Freunde respektieren das. Ihr könnt jederzeit alkoholfreie Alternativen wählen oder andere "Strafen" vereinbaren. Niemand sollte zum Trinken gedrängt werden - Spaß funktioniert auch ohne Alkohol!',
    category: 'safety',
    keywords: ['Nein sagen', 'Peer Pressure', 'alkoholfrei']
  }
];

interface FAQSectionProps {
  showSearch?: boolean;
  maxItems?: number;
  categories?: Array<'general' | 'games' | 'technical' | 'safety'>;
}

export function FAQSection({ 
  showSearch = true, 
  maxItems,
  categories = ['general', 'games', 'technical', 'safety']
}: FAQSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  // Filter FAQ items
  const filteredFAQs = FAQ_DATA
    .filter(item => categories.includes(item.category))
    .filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    })
    .slice(0, maxItems);

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'games': return <GameIcon size={20} className="text-orange-400" />;
      case 'technical': return <BombIcon size={20} className="text-blue-400" />;
      case 'safety': return <GameIcon size={20} className="text-green-400" />;
      default: return <GameIcon size={20} className="text-purple-400" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'general': return '🎮 Allgemein';
      case 'games': return '🎯 Spiele';
      case 'technical': return '⚙️ Technik';
      case 'safety': return '🛡️ Sicherheit';
      default: return category;
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 text-white mb-4">
            ❓ Häufig gestellte Fragen zu Online Trinkspielen
          </h2>
          <p className="body-lg text-white/80 max-w-2xl mx-auto">
            Alles was du über unsere kostenlosen Browser Trinkspiele wissen musst - 
            von Spielregeln bis Sicherheitstipps!
          </p>
        </div>

        {/* Search */}
        {showSearch && (
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
              <input
                type="text"
                placeholder="FAQ durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-orange-400/50 transition-colors"
              />
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === 'all' 
                ? 'bg-orange-500 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            🌟 Alle
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {getCategoryLabel(category)}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/60">Keine FAQ-Einträge gefunden. Versuche einen anderen Suchbegriff!</p>
            </div>
          ) : (
            filteredFAQs.map((item) => (
              <div 
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {getCategoryIcon(item.category)}
                    <h3 className="heading-6 text-white">
                      {item.question}
                    </h3>
                  </div>
                  <div className={`transform transition-transform duration-200 ${
                    openItems.has(item.id) ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {openItems.has(item.id) && (
                  <div className="px-6 pb-4 border-t border-white/10">
                    <div className="pt-4">
                      <p className="body-base text-white/80 leading-relaxed mb-4">
                        {item.answer}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.keywords.map((keyword, index) => (
                          <span 
                            key={index}
                            className="label-base bg-orange-500/20 text-orange-300 px-2 py-1 rounded-lg text-xs"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12 p-6 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-xl border border-white/10">
          <h3 className="heading-5 text-white mb-2">
            🤔 Weitere Fragen?
          </h3>
          <p className="body-base text-white/80 mb-4">
            Hast du eine Frage, die hier nicht beantwortet wurde? 
            Kontaktiere uns gerne über soziale Medien!
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="#social" 
              className="btn-secondary text-sm"
            >
              📧 Kontakt
            </a>
            <Link href="/" className="btn-primary text-sm">
              🎮 Spiele jetzt!
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
