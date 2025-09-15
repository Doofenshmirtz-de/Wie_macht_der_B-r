'use client';

import { useState } from 'react';
import { GameIcon, TrophyIcon, ShareIcon } from '../../../../ui/EnhancedIcons';

interface GameVariantsSectionProps {
  locale: 'de' | 'en';
}

export function GameVariantsSection({ locale }: GameVariantsSectionProps) {
  const [activeVariant, setActiveVariant] = useState<number | null>(null);

  const content = {
    de: {
      title: "🎲 Bomb Party Varianten - Spiele für jeden Anlass",
      subtitle: "Entdecke kreative Spielvarianten für noch mehr Abwechslung und Spaß!",
      partyVariants: {
        title: "🎉 Party-Varianten",
        description: "Perfekt für größere Gruppen und wilde Partys",
        variants: [
          {
            title: "🍻 Trinkspiel-Modus",
            difficulty: "Einfach",
            players: "4-12 Spieler",
            description: "Die klassische Bomb Party Trinkspiel-Variante für unvergessliche Partys!",
            rules: [
              "Wer die Bombe abbekommt, trinkt einen Schluck",
              "Bei besonders schweren Silben: Doppelt trinken",
              "Wort-Wiederholung = Extra-Schluck für alle",
              "Gewinner der Runde darf Aufgaben verteilen"
            ],
            tips: "Spielt mit alkoholfreien Getränken oder macht Pausen zwischen den Runden. Sicherheit geht vor!"
          },
          {
            title: "⚡ Speed-Modus",
            difficulty: "Schwer",
            players: "2-8 Spieler",
            description: "Maximaler Zeitdruck für Adrenalin-Junkies!",
            rules: [
              "Bomb-Timer: Nur 5-15 Sekunden",
              "Keine Bedenkzeit zwischen Spielern",
              "Doppelte Punkte für besonders schnelle Antworten",
              "Wer zögert, bekommt sofort die Bombe"
            ],
            tips: "Trainiert vorher eure Reaktionszeit. Diese Variante ist nichts für schwache Nerven!"
          },
          {
            title: "🌟 Theme-Party",
            difficulty: "Mittel",
            players: "3-10 Spieler",
            description: "Spielt mit thematischen Wörtern passend zu eurer Party!",
            rules: [
              "Alle Wörter müssen zum Party-Thema passen",
              "Beispiele: Halloween, 80er Jahre, Filme, Länder",
              "Kreative Wörter geben Bonus-Punkte",
              "Verkleidung passend zum Thema erwünscht!"
            ],
            tips: "Bereitet vorab eine Liste mit thematischen Silben vor. Das macht das Spiel authentischer!"
          }
        ]
      },
      competitiveVariants: {
        title: "🏆 Wettkampf-Varianten",
        description: "Für ernsthafte Bomb Party Champions",
        variants: [
          {
            title: "📊 Liga-Modus",
            difficulty: "Profi",
            players: "4-16 Spieler",
            description: "Spielt eine ganze Saison mit Punktetabelle und Playoffs!",
            rules: [
              "Jeder spielt gegen jeden (Round Robin)",
              "Punkte: Sieg = 3, Unentschieden = 1, Niederlage = 0",
              "Die besten 4 Spieler kommen ins Halbfinale",
              "Großes Finale um den Bomb Party Champion Titel"
            ],
            tips: "Führt eine Statistik über schwierigste Silben und beste Wörter. Das hilft bei der Vorbereitung!"
          },
          {
            title: "🎯 Präzisions-Challenge",
            difficulty: "Extrem",
            players: "2-6 Spieler",
            description: "Nur die kreativsten und seltensten Wörter zählen!",
            rules: [
              "Häufige Wörter geben weniger Punkte",
              "Seltene Wörter = Bonus-Punkte",
              "Jedes Wort wird nach Seltenheit bewertet",
              "Zusatzpunkte für Wörter mit mehr als 10 Buchstaben"
            ],
            tips: "Studiert seltene deutsche Wörter und Fachbegriffe. Euer Wortschatz ist eure Waffe!"
          },
          {
            title: "🔄 Elimination-Turnier",
            difficulty: "Schwer",
            players: "8-32 Spieler",
            description: "K.O.-System mit immer weniger Überlebenden!",
            rules: [
              "Jede Runde scheidet der Verlierer aus",
              "Halbzeit: Neue Kategorien, höherer Schwierigkeitsgrad",
              "Finale: Nur noch 2 Spieler, beste aus 5 Runden",
              "Verlierer müssen den Gewinnern gratulieren"
            ],
            tips: "Nervenstärke ist entscheidend. Bleibt cool, auch wenn nur noch wenige übrig sind!"
          }
        ]
      },
      creativeVariants: {
        title: "🎨 Kreative Varianten",
        description: "Für experimentierfreudige Spielgruppen",
        variants: [
          {
            title: "🎭 Schauspieler-Modus",
            difficulty: "Lustig",
            players: "3-8 Spieler",
            description: "Wörter müssen pantomimisch dargestellt werden!",
            rules: [
              "Gefundenes Wort muss vorgespielt werden",
              "Andere müssen das Wort erraten",
              "Nur wenn erraten = Wort gilt",
              "Besonders kreative Darstellungen = Bonus"
            ],
            tips: "Übt eure Schauspielkünste! Übertreibung macht es lustiger und leichter zu erraten."
          },
          {
            title: "🖼️ Zeichen-Challenge",
            difficulty: "Kreativ",
            players: "3-10 Spieler",
            description: "Gefundene Wörter müssen gezeichnet werden!",
            rules: [
              "30 Sekunden Zeit zum Zeichnen nach dem Wort",
              "Andere müssen die Zeichnung erraten",
              "Künstlerische Qualität ist egal",
              "Lustige Zeichnungen bekommen Sympathie-Punkte"
            ],
            tips: "Haltet Papier und Stifte bereit! Einfache Strichzeichnungen reichen völlig aus."
          },
          {
            title: "🎵 Melodie-Modus",
            difficulty: "Musikalisch",
            players: "3-12 Spieler",
            description: "Singt oder summt euer gefundenes Wort!",
            rules: [
              "Wort muss in eine bekannte Melodie eingebaut werden",
              "Mindestens 4 Takte lang singen",
              "Gruppe entscheidet über Qualität",
              "A-cappella oder mit Begleitung erlaubt"
            ],
            tips: "Kennt eure Hit-Parade! Einfache Melodien wie 'Happy Birthday' funktionieren fast immer."
          }
        ]
      }
    },
    en: {
      title: "🎲 Bomb Party Variants - Games for Every Occasion",
      subtitle: "Discover creative game variants for even more variety and fun!",
      partyVariants: {
        title: "🎉 Party Variants",
        description: "Perfect for larger groups and wild parties",
        variants: [
          {
            title: "🍻 Drinking Game Mode",
            difficulty: "Easy",
            players: "4-12 Players",
            description: "The classic Bomb Party drinking game variant for unforgettable parties!",
            rules: [
              "Whoever gets the bomb takes a drink",
              "For particularly hard syllables: Double drink",
              "Word repetition = Extra drink for everyone",
              "Round winner gets to assign tasks"
            ],
            tips: "Play with non-alcoholic drinks or take breaks between rounds. Safety first!"
          },
          {
            title: "⚡ Speed Mode",
            difficulty: "Hard",
            players: "2-8 Players",
            description: "Maximum time pressure for adrenaline junkies!",
            rules: [
              "Bomb timer: Only 5-15 seconds",
              "No thinking time between players",
              "Double points for particularly fast answers",
              "Hesitation means immediate bomb"
            ],
            tips: "Train your reaction time beforehand. This variant is not for the faint-hearted!"
          },
          {
            title: "🌟 Theme Party",
            difficulty: "Medium",
            players: "3-10 Players",
            description: "Play with themed words matching your party!",
            rules: [
              "All words must fit the party theme",
              "Examples: Halloween, 80s, Movies, Countries",
              "Creative words give bonus points",
              "Costumes matching the theme encouraged!"
            ],
            tips: "Prepare a list of thematic syllables in advance. This makes the game more authentic!"
          }
        ]
      },
      competitiveVariants: {
        title: "🏆 Competitive Variants",
        description: "For serious Bomb Party champions",
        variants: [
          {
            title: "📊 League Mode",
            difficulty: "Pro",
            players: "4-16 Players",
            description: "Play a whole season with league table and playoffs!",
            rules: [
              "Everyone plays everyone (Round Robin)",
              "Points: Win = 3, Draw = 1, Loss = 0",
              "Top 4 players advance to semifinals",
              "Grand finale for the Bomb Party Champion title"
            ],
            tips: "Keep statistics on hardest syllables and best words. This helps with preparation!"
          },
          {
            title: "🎯 Precision Challenge",
            difficulty: "Extreme",
            players: "2-6 Players",
            description: "Only the most creative and rarest words count!",
            rules: [
              "Common words give fewer points",
              "Rare words = Bonus points",
              "Each word is rated by rarity",
              "Extra points for words with more than 10 letters"
            ],
            tips: "Study rare English words and technical terms. Your vocabulary is your weapon!"
          },
          {
            title: "🔄 Elimination Tournament",
            difficulty: "Hard",
            players: "8-32 Players",
            description: "K.O. system with fewer and fewer survivors!",
            rules: [
              "Each round eliminates the loser",
              "Halftime: New categories, higher difficulty",
              "Final: Only 2 players, best of 5 rounds",
              "Losers must congratulate the winners"
            ],
            tips: "Nerves of steel are crucial. Stay cool even when only few remain!"
          }
        ]
      },
      creativeVariants: {
        title: "🎨 Creative Variants",
        description: "For experimental gaming groups",
        variants: [
          {
            title: "🎭 Actor Mode",
            difficulty: "Fun",
            players: "3-8 Players",
            description: "Words must be acted out!",
            rules: [
              "Found word must be acted out",
              "Others must guess the word",
              "Only if guessed = word counts",
              "Particularly creative performances = bonus"
            ],
            tips: "Practice your acting skills! Exaggeration makes it funnier and easier to guess."
          },
          {
            title: "🖼️ Drawing Challenge",
            difficulty: "Creative",
            players: "3-10 Players",
            description: "Found words must be drawn!",
            rules: [
              "30 seconds to draw after the word",
              "Others must guess the drawing",
              "Artistic quality doesn't matter",
              "Funny drawings get sympathy points"
            ],
            tips: "Have paper and pens ready! Simple line drawings are perfectly fine."
          },
          {
            title: "🎵 Melody Mode",
            difficulty: "Musical",
            players: "3-12 Players",
            description: "Sing or hum your found word!",
            rules: [
              "Word must be incorporated into a known melody",
              "Sing for at least 4 measures",
              "Group decides on quality",
              "A-cappella or with accompaniment allowed"
            ],
            tips: "Know your hit parade! Simple melodies like 'Happy Birthday' work almost always."
          }
        ]
      }
    }
  };

  const currentContent = content[locale];

  const renderVariantCard = (variant: { title: string; difficulty: string; players: string; description: string; rules: string[]; tips: string }, index: number, sectionKey: string) => (
    <div 
      key={`${sectionKey}-${index}`}
      className="card-elevated p-6 hover:scale-105 transition-all duration-300 cursor-pointer"
      onClick={() => setActiveVariant(activeVariant === parseInt(`${sectionKey}${index}`) ? null : parseInt(`${sectionKey}${index}`))}
    >
      <div className="flex items-start justify-between mb-4">
        <h4 className="heading-5 gradient-text">{variant.title}</h4>
        <div className="flex gap-2">
          <span className="label-base bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full">
            {variant.difficulty}
          </span>
          <span className="label-base bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
            {variant.players}
          </span>
        </div>
      </div>
      
      <p className="body-sm text-white/80 mb-4">{variant.description}</p>
      
      {activeVariant === parseInt(`${sectionKey}${index}`) && (
        <div className="animate-fade-in">
          <div className="border-t border-white/20 pt-4 mb-4">
            <h5 className="heading-6 text-yellow-300 mb-3">📋 Spielregeln:</h5>
            <ul className="space-y-2 mb-4">
              {variant.rules.map((rule: string, ruleIndex: number) => (
                <li key={ruleIndex} className="body-sm text-white/90 flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
            
            <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30">
              <p className="body-sm text-yellow-200">
                <strong>💡 Tipp:</strong> {variant.tips}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <button className="body-xs text-orange-400 hover:text-orange-300 transition-colors">
        {activeVariant === parseInt(`${sectionKey}${index}`) ? '▼ Weniger anzeigen' : '▶ Regeln anzeigen'}
      </button>
    </div>
  );

  return (
    <section className="py-16 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 blur-3xl"></div>
      
      <div className="relative mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-2 text-white animate-float-gentle mb-4">
            {currentContent.title}
          </h2>
          <p className="body-lg text-white/80">
            {currentContent.subtitle}
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Party Variants */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <GameIcon size={32} className="animate-glow-pulse" />
            <h3 className="heading-3 gradient-text">{currentContent.partyVariants.title}</h3>
          </div>
          <p className="body-base text-white/70 mb-8">{currentContent.partyVariants.description}</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentContent.partyVariants.variants.map((variant, index) => 
              renderVariantCard(variant, index, '1')
            )}
          </div>
        </div>

        {/* Competitive Variants */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <TrophyIcon size={32} className="animate-glow-pulse" />
            <h3 className="heading-3 gradient-text">{currentContent.competitiveVariants.title}</h3>
          </div>
          <p className="body-base text-white/70 mb-8">{currentContent.competitiveVariants.description}</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentContent.competitiveVariants.variants.map((variant, index) => 
              renderVariantCard(variant, index, '2')
            )}
          </div>
        </div>

        {/* Creative Variants */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <ShareIcon size={32} className="animate-glow-pulse" />
            <h3 className="heading-3 gradient-text">{currentContent.creativeVariants.title}</h3>
          </div>
          <p className="body-base text-white/70 mb-8">{currentContent.creativeVariants.description}</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentContent.creativeVariants.variants.map((variant, index) => 
              renderVariantCard(variant, index, '3')
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card-elevated inline-block p-8">
            <h3 className="heading-4 gradient-text mb-4">🎯 Eigene Variante erstellen?</h3>
            <p className="body-base text-white/80 mb-6">
              Habt ihr eigene kreative Ideen für Bomb Party Varianten? Teilt sie mit der Community!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-secondary px-6 py-3">
                💡 Idee einreichen
              </button>
              <button className="btn-ghost px-6 py-3">
                📱 Variante teilen
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
