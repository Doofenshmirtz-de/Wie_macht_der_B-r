'use client';

import { useState } from 'react';
import { BombIcon, GameIcon, UsersIcon } from '../../../../ui/EnhancedIcons';

interface GameRulesSectionProps {
  locale: 'de' | 'en';
}

export function GameRulesSection({ locale }: GameRulesSectionProps) {
  const [activeRule, setActiveRule] = useState<number | null>(null);

  const content = {
    de: {
      title: "🔥 Bomb Party Trinkspiel Regeln - Komplette Spielanleitung",
      subtitle: "Lerne alle Bomb Party Regeln und werde zum Online Trinkspiel Champion!",
      basicRules: {
        title: "📋 Grundregeln",
        description: "Die Basis-Regeln für jeden Bomb Party Neuling",
        rules: [
          {
            title: "🎯 Spielziel",
            description: "Finde Wörter, die die angegebenen Silben enthalten, bevor die Bombe explodiert!",
            details: "Du musst ein gültiges deutsches Wort finden, das die angezeigte Silbe irgendwo enthält. Das Wort muss mindestens 3 Buchstaben lang sein und darf nicht bereits von anderen Spielern verwendet worden sein."
          },
          {
            title: "⏰ Zeitdruck",
            description: "Die Bombe tickt! Du hast nur begrenzte Zeit für deine Antwort.",
            details: "Die Bomben-Timer sind zufällig zwischen 10-60 Sekunden. Du weißt nie, wann die Bombe explodiert - das sorgt für maximale Spannung!"
          },
          {
            title: "👥 Spieler-Reihenfolge",
            description: "Gespielt wird reihum. Jeder Spieler ist einmal dran, dann geht es weiter.",
            details: "Nach deiner Antwort wird automatisch der nächste Spieler aktiviert. Solltest du nicht rechtzeitig antworten, explodiert die Bombe bei dir!"
          },
          {
            title: "💥 Bombe explodiert",
            description: "Wenn die Zeit abläuft, verlierst du die Runde und bekommst einen Minuspunkt.",
            details: "Bei wem die Bombe explodiert, der muss trinken oder bekommt einen Verlustpunkt. Das Spiel geht dann mit einer neuen Silbe weiter."
          }
        ]
      },
      advancedRules: {
        title: "🚀 Erweiterte Regeln",
        description: "Für fortgeschrittene Bomb Party Spieler",
        rules: [
          {
            title: "🏆 Siegbedingungen",
            description: "Spielt eine festgelegte Anzahl von Runden oder bis ein Spieler eine bestimmte Anzahl von Verlusten hat.",
            details: "Standard sind 5 Runden oder 3 Verluste pro Spieler. Ihr könnt die Anzahl in den Einstellungen anpassen."
          },
          {
            title: "📚 Wort-Wiederholung",
            description: "Bereits verwendete Wörter sind in derselben Runde nicht mehr gültig.",
            details: "Das Spiel merkt sich alle bereits genannten Wörter pro Kategorie. Versuche kreativ zu sein und neue Wörter zu finden!"
          },
          {
            title: "🎲 Kategorien",
            description: "Wählt verschiedene Kategorien für mehr Abwechslung und Herausforderung.",
            details: "Von 'Casual' über 'Schwer' bis 'Verrückt' - jede Kategorie hat andere Silben-Kombinationen und Schwierigkeitsgrade."
          },
          {
            title: "🌐 Multiplayer-Modi",
            description: "Spielt lokal auf einem Gerät oder online mit Freunden über mehrere Handys.",
            details: "Im Einzelgeräte-Modus teilt ihr euch ein Handy. Im Multiplayer-Modus kann jeder auf seinem eigenen Gerät spielen!"
          }
        ]
      },
      tipsTricks: {
        title: "💡 Profi-Tipps & Tricks",
        description: "Geheimnisse der Bomb Party Champions",
        tips: [
          {
            title: "🧠 Wortschatz erweitern",
            description: "Je größer dein Wortschatz, desto mehr Optionen hast du unter Zeitdruck.",
            tip: "Lese viel, lerne neue Wörter und spiele regelmäßig. Merke dir seltene Wörter mit häufigen Silben wie 'tion', 'ung', 'lich'."
          },
          {
            title: "⚡ Schnell denken",
            description: "Unter Zeitdruck kommen einem oft die einfachsten Wörter nicht in den Sinn.",
            tip: "Übe das schnelle Assoziieren. Denke an Kategorien wie Tiere, Gegenstände, Verben - das hilft beim strukturierten Suchen."
          },
          {
            title: "🎯 Silben-Strategien",
            description: "Manche Silben sind schwieriger als andere. Entwickle Strategien!",
            tip: "Sammle mentale Listen: Für 'qu' denke an 'Quelle, quaken, Qualität'. Für 'xy' an 'Taxi, Galaxie, Oxygen'."
          },
          {
            title: "😎 Ruhe bewahren",
            description: "Panik ist der größte Feind beim Bomb Party spielen.",
            tip: "Atme tief durch, denke systematisch und lass dich nicht von der tickenden Bombe stressen. Übung macht den Meister!"
          }
        ]
      }
    },
    en: {
      title: "🔥 Bomb Party Game Rules - Complete Guide",
      subtitle: "Learn all the rules and become a Bomb Party champion!",
      basicRules: {
        title: "📋 Basic Rules",
        description: "The fundamental rules for every Bomb Party beginner",
        rules: [
          {
            title: "🎯 Game Objective",
            description: "Find words containing the given syllables before the bomb explodes!",
            details: "You must find a valid English word that contains the displayed syllable anywhere within it. The word must be at least 3 letters long and cannot have been used by other players already."
          },
          {
            title: "⏰ Time Pressure",
            description: "The bomb is ticking! You only have limited time for your answer.",
            details: "Bomb timers are random between 10-60 seconds. You never know when the bomb will explode - that's what creates maximum excitement!"
          },
          {
            title: "👥 Player Order",
            description: "Players take turns. Each player gets one turn, then it continues.",
            details: "After your answer, the next player is automatically activated. If you don't answer in time, the bomb explodes on you!"
          },
          {
            title: "💥 Bomb Explodes",
            description: "When time runs out, you lose the round and get a minus point.",
            details: "Whoever the bomb explodes on must drink or gets a loss point. The game then continues with a new syllable."
          }
        ]
      },
      advancedRules: {
        title: "🚀 Advanced Rules",
        description: "For experienced Bomb Party players",
        rules: [
          {
            title: "🏆 Victory Conditions",
            description: "Play a set number of rounds or until a player reaches a certain number of losses.",
            details: "Standard is 5 rounds or 3 losses per player. You can adjust the numbers in the settings."
          },
          {
            title: "📚 Word Repetition",
            description: "Already used words are no longer valid in the same round.",
            details: "The game remembers all previously mentioned words per category. Try to be creative and find new words!"
          },
          {
            title: "🎲 Categories",
            description: "Choose different categories for more variety and challenge.",
            details: "From 'Casual' to 'Hard' to 'Crazy' - each category has different syllable combinations and difficulty levels."
          },
          {
            title: "🌐 Multiplayer Modes",
            description: "Play locally on one device or online with friends across multiple phones.",
            details: "In single-device mode, you share one phone. In multiplayer mode, everyone can play on their own device!"
          }
        ]
      },
      tipsTricks: {
        title: "💡 Pro Tips & Tricks",
        description: "Secrets of Bomb Party champions",
        tips: [
          {
            title: "🧠 Expand Vocabulary",
            description: "The larger your vocabulary, the more options you have under pressure.",
            tip: "Read a lot, learn new words, and play regularly. Remember rare words with common syllables like 'tion', 'ing', 'ly'."
          },
          {
            title: "⚡ Think Fast",
            description: "Under time pressure, even the simplest words often don't come to mind.",
            tip: "Practice quick association. Think of categories like animals, objects, verbs - this helps with structured searching."
          },
          {
            title: "🎯 Syllable Strategies",
            description: "Some syllables are harder than others. Develop strategies!",
            tip: "Collect mental lists: For 'qu' think 'queen, quick, quality'. For 'xy' think 'taxi, galaxy, oxygen'."
          },
          {
            title: "😎 Stay Calm",
            description: "Panic is the biggest enemy when playing Bomb Party.",
            tip: "Breathe deeply, think systematically, and don't let the ticking bomb stress you out. Practice makes perfect!"
          }
        ]
      }
    }
  };

  const currentContent = content[locale];

  return (
    <section className="py-16 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-red-900/20 blur-3xl"></div>
      
      <div className="relative mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-2 text-white animate-float-gentle mb-4">
            {currentContent.title}
          </h2>
          <p className="body-lg text-white/80">
            {currentContent.subtitle}
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
          </div>
        </div>

        {/* Basic Rules */}
        <div className="card-elevated p-8 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <BombIcon size={32} className="animate-glow-pulse" />
            <h3 className="heading-3 gradient-text">{currentContent.basicRules.title}</h3>
          </div>
          <p className="body-base text-white/70 mb-8">{currentContent.basicRules.description}</p>
          
          <div className="grid gap-6">
            {currentContent.basicRules.rules.map((rule, index) => (
              <div 
                key={index}
                className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-orange-400/50 transition-all duration-300 cursor-pointer"
                onClick={() => setActiveRule(activeRule === index ? null : index)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{rule.title.split(' ')[0]}</div>
                  <div className="flex-1">
                    <h4 className="heading-6 text-white mb-2">{rule.title.substring(2)}</h4>
                    <p className="body-sm text-white/80 mb-3">{rule.description}</p>
                    
                    {activeRule === index && (
                      <div className="animate-fade-in">
                        <div className="border-t border-white/20 pt-4 mt-4">
                          <p className="body-sm text-orange-200 leading-relaxed">
                            💡 <strong>Detail:</strong> {rule.details}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <button className="body-xs text-orange-400 hover:text-orange-300 transition-colors">
                      {activeRule === index ? '▼ Weniger anzeigen' : '▶ Mehr Details'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Rules */}
        <div className="card-elevated p-8 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <GameIcon size={32} className="animate-glow-pulse" />
            <h3 className="heading-3 gradient-text">{currentContent.advancedRules.title}</h3>
          </div>
          <p className="body-base text-white/70 mb-8">{currentContent.advancedRules.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {currentContent.advancedRules.rules.map((rule, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300">
                <h4 className="heading-6 text-white mb-3">{rule.title}</h4>
                <p className="body-sm text-white/80 mb-4">{rule.description}</p>
                <div className="border-t border-white/20 pt-4">
                  <p className="body-xs text-blue-200 leading-relaxed">
                    {rule.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips & Tricks */}
        <div className="card-elevated p-8">
          <div className="flex items-center gap-4 mb-6">
            <UsersIcon size={32} className="animate-glow-pulse" />
            <h3 className="heading-3 gradient-text">{currentContent.tipsTricks.title}</h3>
          </div>
          <p className="body-base text-white/70 mb-8">{currentContent.tipsTricks.description}</p>
          
          <div className="space-y-6">
            {currentContent.tipsTricks.tips.map((tip, index) => (
              <div key={index} className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-xl p-6 border border-yellow-500/20">
                <h4 className="heading-6 text-yellow-300 mb-3">{tip.title}</h4>
                <p className="body-sm text-white/80 mb-4">{tip.description}</p>
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="body-sm text-yellow-200 leading-relaxed">
                    <strong>💡 Profi-Tipp:</strong> {tip.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="card-elevated inline-block p-8">
            <h3 className="heading-4 gradient-text mb-4">🚀 Bereit für dein erstes Spiel?</h3>
            <p className="body-base text-white/80 mb-6">
              Jetzt wo du alle Regeln kennst, wird es Zeit für die erste Runde!
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn-primary px-8 py-4 animate-glow-pulse"
            >
              🔥 Bomb Party starten!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
