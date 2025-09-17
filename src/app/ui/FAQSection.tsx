'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BombIcon, GameIcon, SearchIcon } from './EnhancedIcons';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'games' | 'technical';
  keywords: string[];
}

const FAQ_DATA: FAQItem[] = [
  // GENERAL KATEGORIE
  {
    id: 'what-are-online-party-games',
    question: 'Was sind Online Partyspiele und wie funktionieren sie?',
    answer: 'Online Partyspiele sind digitale Versionen klassischer Spiele für gesellige Runden, die direkt im Browser gespielt werden. Du brauchst keine App herunterzuladen - einfach die Website besuchen, Freunde einladen und sofort loslegen! Unsere Spiele wie Bomb Party, Ich hab noch nie und Wahrheit oder Pflicht sind kostenlos und für Erwachsene ab 18 Jahren konzipiert.',
    category: 'general',
    keywords: ['Online Partyspiele', 'Browser Partyspiele', 'kostenlos']
  },
  {
    id: 'what-are-online-party-games-en',
    question: 'What are Online Party Games and how do they work?',
    answer: 'Online party games are digital versions of classic social games that you can play directly in your browser. You don\'t need to download any app - just visit the website, invite friends and start playing immediately! Our games like Bomb Party, Never Have I Ever and Truth or Dare are free and designed for adults 18+.',
    category: 'general',
    keywords: ['Online Party Games', 'Browser Party Games', 'free']
  },
  {
    id: 'why-online-party-games',
    question: 'Warum Online Partyspiele statt echte Karten oder Apps?',
    answer: 'Online Partyspiele bieten viele Vorteile: Keine Downloads nötig, sofort verfügbar, automatische Spielabläufe, Multiplayer-Funktionen und regelmäßige Updates mit neuen Inhalten. Du kannst spontan mit Freunden spielen, ohne Materialien vorzubereiten oder Apps zu installieren.',
    category: 'general',
    keywords: ['Browser Spiele', 'ohne Download', 'Multiplayer']
  },
  {
    id: 'why-online-party-games-en',
    question: 'Why Online Party Games instead of real cards or apps?',
    answer: 'Online party games offer many advantages: No downloads needed, immediately available, automatic game flows, multiplayer functions and regular updates with new content. You can spontaneously play with friends without preparing materials or installing apps.',
    category: 'general',
    keywords: ['Browser Games', 'no download', 'Multiplayer']
  },
  {
    id: 'party-planning-games',
    question: 'Welche Partyspiele eignen sich am besten für die Party-Planung?',
    answer: 'Für Partys empfehlen wir eine Mischung aus verschiedenen Spieltypen: Bomb Party als energiegeladenes Wortspiel, Ich hab noch nie für lustige Geständnisse und Wahrheit oder Pflicht für mutige Aufgaben. So bleibt die Party abwechslungsreich und alle Gäste kommen auf ihre Kosten!',
    category: 'general',
    keywords: ['Partyspiele', 'Partyplanung', 'WG Party']
  },
  {
    id: 'party-games-small-groups',
    question: 'Welche Partyspiele funktionieren gut für kleine Gruppen?',
    answer: 'Alle unsere Spiele sind perfekt für kleine Gruppen ab 2 Personen! Besonders "Ich hab noch nie" und "Wahrheit oder Pflicht" sind ideal für intime Runden. Bomb Party macht schon ab 3-4 Spielern richtig Spaß und wird mit mehr Leuten noch spannender.',
    category: 'general',
    keywords: ['kleine Gruppe', 'Partyspiele zu zweit', '2 Personen']
  },
  {
    id: 'student-party-games',
    question: 'Gibt es spezielle Partyspiele für Studenten und WG-Partys?',
    answer: 'Absolut! Unsere Online Partyspiele sind perfekt für Studenten-WGs: kostenlos, spontan spielbar und ohne Vorbereitungszeit. Bomb Party ist besonders beliebt bei WG-Partys, da es schnell erklärt ist und für viele Lacher sorgt. Perfekt für entspannte Abende oder Pre-Gaming!',
    category: 'general',
    keywords: ['Studenten Partyspiele', 'WG Party', 'Uni Party']
  },

  // GAMES KATEGORIE
  {
    id: 'bomb-party-rules',
    question: 'Wie funktioniert das Bomb Party Spiel?',
    answer: 'Bomb Party ist ein schnelles Wortspiel: Du bekommst eine Buchstaben-Kombination und musst Wörter finden, die diese enthalten, bevor die Bombe explodiert! Das Spiel wird immer schneller und sorgt für garantierte Lachanfälle. Bis zu 16 Spieler können gleichzeitig mitspielen!',
    category: 'games',
    keywords: ['Bomb Party Regeln', 'Bomb Party', 'Wortspiel']
  },
  {
    id: 'never-have-i-ever-online',
    question: 'Wie spielt man "Ich hab noch nie" online?',
    answer: 'Bei "Ich hab noch nie" werden Aussagen vorgelesen wie "Ich hab noch nie... einen Film im Kino gesehen". Alle, die das schon mal gemacht haben, müssen ihre Joker-Trinkkarte einsetzen – oder eine alternative Strafe wählen! Unser Online-System bietet hunderte von Fragen in verschiedenen Kategorien - von harmlos bis pikant. Perfekt um Freunde besser kennenzulernen!',
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
    id: 'play-without-alcohol',
    question: 'Kann man die Spiele auch ohne Alkohol spielen?',
    answer: 'Natürlich! Alle unsere Spiele funktionieren genauso gut ohne Alkohol. Stattdessen könnt ihr Softdrinks, Wasser oder lustige "Strafen" wie Süßigkeiten essen verwenden. Die Spiele bleiben genauso unterhaltsam und eignen sich perfekt für alkoholfreie Partys!',
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
    answer: 'Nein! Alle unsere Partyspiele laufen direkt im Browser - komplett ohne Download. Einfach die Website besuchen und sofort loslegen. Das spart Speicherplatz auf deinem Handy und du bist immer auf der neuesten Version. Perfekt für spontane Spiele!',
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

  // SAFETY KATEGORIE - Entfernt, da nicht mehr passend
];

interface FAQSectionProps {
  showSearch?: boolean;
  maxItems?: number;
  categories?: Array<'general' | 'games' | 'technical'>;
}

export function FAQSection({ 
  showSearch = true, 
  maxItems,
  categories = ['general', 'games', 'technical']
}: FAQSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const params = useParams();
  const locale = (params as { locale?: string })?.locale === 'en' ? 'en' : 'de';

  // Filter FAQ items by language and other criteria
  const filteredFAQs = FAQ_DATA
    .filter(item => categories.includes(item.category))
    .filter(item => {
      // Filter by language: show German items for 'de' and English items for 'en'
      const isGermanItem = !item.id.endsWith('-en');
      const isEnglishItem = item.id.endsWith('-en');
      
      if (locale === 'en') {
        if (!isEnglishItem) return false;
      } else {
        if (!isGermanItem) return false;
      }
      
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
      default: return <GameIcon size={20} className="text-purple-400" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    if (locale === 'en') {
      switch (category) {
        case 'general': return '🎮 General';
        case 'games': return '🎯 Games';
        case 'technical': return '⚙️ Technical';
        default: return category;
      }
    } else {
      switch (category) {
        case 'general': return '🎮 Allgemein';
        case 'games': return '🎯 Spiele';
        case 'technical': return '⚙️ Technik';
        default: return category;
      }
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 text-white mb-4">
            ❓ {locale === 'en' ? 'Frequently Asked Questions about Online Party Games' : 'Häufig gestellte Fragen zu Online Partyspielen'}
          </h2>
          <p className="body-lg text-white/80 max-w-2xl mx-auto">
            {locale === 'en' 
              ? 'Everything you need to know about our free browser party games - from game rules to technical tips!'
              : 'Alles was du über unsere kostenlosen Browser Partyspiele wissen musst - von Spielregeln bis Techniktipps!'
            }
          </p>
        </div>

        {/* Search */}
        {showSearch && (
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
              <input
                type="text"
                placeholder={locale === 'en' ? 'Search FAQ...' : 'FAQ durchsuchen...'}
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
            🌟 {locale === 'en' ? 'All' : 'Alle'}
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
              <p className="text-white/60">
                {locale === 'en' 
                  ? 'No FAQ entries found. Try a different search term!'
                  : 'Keine FAQ-Einträge gefunden. Versuche einen anderen Suchbegriff!'
                }
              </p>
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
            🤔 {locale === 'en' ? 'More Questions?' : 'Weitere Fragen?'}
          </h3>
          <p className="body-base text-white/80 mb-4">
            {locale === 'en' 
              ? 'Do you have a question that wasn\'t answered here? Feel free to contact us via social media!'
              : 'Hast du eine Frage, die hier nicht beantwortet wurde? Kontaktiere uns gerne über soziale Medien!'
            }
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="#social" 
              className="btn-secondary text-sm"
            >
              📧 {locale === 'en' ? 'Contact' : 'Kontakt'}
            </a>
            <Link href="/" className="btn-primary text-sm">
              🎮 {locale === 'en' ? 'Play Now!' : 'Spiele jetzt!'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
