'use client';

import { useState } from 'react';
import { BombIcon } from '../../../../ui/EnhancedIcons';

interface GameHistoryFAQProps {
  locale: 'de' | 'en';
}

export function GameHistoryFAQ({ locale }: GameHistoryFAQProps) {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const content = {
    de: {
      history: {
        title: "📚 Die Geschichte von Bomb Party",
        subtitle: "Von den Anfängen bis zum Online-Hit",
        timeline: [
          {
            year: "1990er",
            title: "🎯 Die Ursprünge",
            description: "Das Wortspiel-Konzept entsteht in amerikanischen Colleges",
            details: "Ursprünglich als 'Pass the Bomb' bekannt, wurde das Spiel mit echten Küchen-Timern gespielt. Studenten nutzten es als Trinkspiel bei Partys."
          },
          {
            year: "2000er", 
            title: "🎲 Erste Brettspiel-Version",
            description: "Kommerzialisierung als physisches Brettspiel",
            details: "Verschiedene Verlage brachten offizielle Versionen heraus. Das Spiel wurde populär in Europa und gewann mehrere Spielepreise."
          },
          {
            year: "2010er",
            title: "📱 Digitale Revolution",
            description: "Smartphone-Apps machen das Spiel zugänglich für alle",
            details: "Die ersten Apps erscheinen. Das Spiel erreicht Millionen von Downloads und wird zu einem Social-Media-Phänomen."
          },
          {
            year: "2020+",
            title: "🌐 Online-Multiplayer Ära",
            description: "Wie macht der Bär revolutioniert das Online-Spielerlebnis",
            details: "Echte Multiplayer-Funktionen, PWA-Technologie und nahtlose Browser-Integration machen das Spiel für moderne Nutzer perfekt zugänglich."
          }
        ]
      },
      faq: {
        title: "❓ Häufig gestellte Fragen (FAQ)",
        subtitle: "Alle Antworten zu Bomb Party",
        questions: [
          {
            category: "Spielregeln",
            question: "Sind Eigennamen und Fremdwörter erlaubt?",
            answer: "Grundsätzlich sind nur deutsche Wörter erlaubt, die im Duden stehen. Eigennamen (wie 'Berlin' oder 'Maria') sind normalerweise nicht erlaubt, außer ihr spielt eine spezielle Variante. Fremdwörter, die ins Deutsche übernommen wurden (wie 'Computer' oder 'Hotel'), sind in Ordnung."
          },
          {
            category: "Spielregeln",
            question: "Was passiert bei Wort-Streitigkeiten?",
            answer: "Bei Uneinigkeiten entscheidet die Mehrheit der Gruppe. Ihr könnt auch online nachschlagen oder eine Abstimmung machen. Im Zweifel gilt: Spaß steht vor Perfektion! Erstellt eure eigenen Hausregeln."
          },
          {
            category: "Technisches",
            question: "Funktioniert das Spiel offline?",
            answer: "Ja! Als Progressive Web App (PWA) funktioniert Bomb Party auch ohne Internet. Nur für Multiplayer-Spiele zwischen verschiedenen Geräten benötigt ihr eine Internetverbindung."
          },
          {
            category: "Technisches", 
            question: "Auf welchen Geräten läuft das Spiel?",
            answer: "Bomb Party läuft auf allen modernen Smartphones, Tablets und Computern mit einem aktuellen Browser. iOS, Android, Windows, Mac - überall wo ein Browser ist, funktioniert das Spiel!"
          },
          {
            category: "Multiplayer",
            question: "Wie viele Spieler können gleichzeitig spielen?",
            answer: "Im Einzelgeräte-Modus gibt es theoretisch kein Limit - praktisch sind 2-12 Spieler optimal. Im Online-Multiplayer-Modus können bis zu 16 Spieler teilnehmen."
          },
          {
            category: "Multiplayer",
            question: "Warum verbindet sich mein Multiplayer-Spiel nicht?",
            answer: "Stellt sicher, dass alle Spieler eine stabile Internetverbindung haben. Manchmal helfen ein Browser-Refresh oder das erneute Beitreten über den QR-Code. Bei anhaltenden Problemen versucht den Einzelgeräte-Modus."
          },
          {
            category: "Einstellungen",
            question: "Kann ich die Bombe-Timer anpassen?",
            answer: "Ja! In den Spieleinstellungen könnt ihr die Timer-Bereiche anpassen. Von entspannten 20-60 Sekunden bis zu stressigen 5-15 Sekunden - ihr bestimmt das Tempo!"
          },
          {
            category: "Einstellungen",
            question: "Gibt es verschiedene Schwierigkeitsgrade?",
            answer: "Absolut! Wählt zwischen 'Casual' (einfache Silben), 'Normal' (gemischt), 'Schwer' (knifflige Kombinationen) und 'Verrückt' (echte Herausforderungen). Jede Kategorie hat andere Silben-Sets."
          },
          {
            category: "Tipps",
            question: "Wie werde ich besser in Bomb Party?",
            answer: "Übung macht den Meister! Erweitert euren Wortschatz, übt das schnelle Assoziieren und bleibt unter Zeitdruck ruhig. Denkt in Kategorien (Tiere, Gegenstände, Verben) - das hilft beim strukturierten Suchen."
          },
          {
            category: "Tipps",
            question: "Welche Strategien gibt es für schwere Silben?",
            answer: "Sammelt mentale Wortlisten für häufige schwere Silben wie 'qu', 'xy', 'pf'. Denkt an zusammengesetzte Wörter, Fachbegriffe und seltene Begriffe. Manchmal sind die einfachsten Lösungen die besten!"
          }
        ]
      }
    },
    en: {
      history: {
        title: "📚 The History of Bomb Party",
        subtitle: "From humble beginnings to online hit",
        timeline: [
          {
            year: "1990s",
            title: "🎯 The Origins",
            description: "The word game concept emerges in American colleges",
            details: "Originally known as 'Pass the Bomb', the game was played with real kitchen timers. Students used it as a drinking game at parties."
          },
          {
            year: "2000s",
            title: "🎲 First Board Game Version", 
            description: "Commercialization as a physical board game",
            details: "Various publishers released official versions. The game became popular in Europe and won several gaming awards."
          },
          {
            year: "2010s",
            title: "📱 Digital Revolution",
            description: "Smartphone apps make the game accessible to everyone",
            details: "The first apps appear. The game reaches millions of downloads and becomes a social media phenomenon."
          },
          {
            year: "2020+",
            title: "🌐 Online Multiplayer Era",
            description: "Wie macht der Bär revolutionizes the online gaming experience",
            details: "Real multiplayer features, PWA technology, and seamless browser integration make the game perfectly accessible for modern users."
          }
        ]
      },
      faq: {
        title: "❓ Frequently Asked Questions (FAQ)",
        subtitle: "All answers about Bomb Party",
        questions: [
          {
            category: "Game Rules",
            question: "Are proper names and foreign words allowed?",
            answer: "Generally, only English words found in standard dictionaries are allowed. Proper names (like 'Berlin' or 'Maria') are usually not allowed unless you're playing a special variant. Foreign words that have been adopted into English (like 'computer' or 'hotel') are fine."
          },
          {
            category: "Game Rules",
            question: "What happens with word disputes?",
            answer: "In case of disagreements, the majority of the group decides. You can also look it up online or vote. When in doubt: fun comes before perfection! Create your own house rules."
          },
          {
            category: "Technical",
            question: "Does the game work offline?",
            answer: "Yes! As a Progressive Web App (PWA), Bomb Party works even without internet. Only for multiplayer games between different devices do you need an internet connection."
          },
          {
            category: "Technical",
            question: "Which devices does the game run on?",
            answer: "Bomb Party runs on all modern smartphones, tablets, and computers with a current browser. iOS, Android, Windows, Mac - wherever there's a browser, the game works!"
          },
          {
            category: "Multiplayer",
            question: "How many players can play simultaneously?",
            answer: "In single-device mode there's theoretically no limit - practically 2-12 players are optimal. In online multiplayer mode, up to 16 players can participate."
          },
          {
            category: "Multiplayer",
            question: "Why won't my multiplayer game connect?",
            answer: "Make sure all players have a stable internet connection. Sometimes a browser refresh or rejoining via QR code helps. For persistent problems, try single-device mode."
          },
          {
            category: "Settings",
            question: "Can I adjust the bomb timers?",
            answer: "Yes! In the game settings you can adjust the timer ranges. From relaxed 20-60 seconds to stressful 5-15 seconds - you determine the pace!"
          },
          {
            category: "Settings", 
            question: "Are there different difficulty levels?",
            answer: "Absolutely! Choose between 'Casual' (easy syllables), 'Normal' (mixed), 'Hard' (tricky combinations), and 'Crazy' (real challenges). Each category has different syllable sets."
          },
          {
            category: "Tips",
            question: "How do I get better at Bomb Party?",
            answer: "Practice makes perfect! Expand your vocabulary, practice quick association, and stay calm under time pressure. Think in categories (animals, objects, verbs) - this helps with structured searching."
          },
          {
            category: "Tips",
            question: "What strategies exist for difficult syllables?",
            answer: "Collect mental word lists for common difficult syllables like 'qu', 'xy', 'ph'. Think of compound words, technical terms, and rare words. Sometimes the simplest solutions are the best!"
          }
        ]
      }
    }
  };

  const currentContent = content[locale];

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Group FAQ by category
  const faqByCategory = currentContent.faq.questions.reduce((acc, question, index) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push({ ...question, originalIndex: index });
    return acc;
  }, {} as Record<string, Array<{ category: string; question: string; answer: string; originalIndex: number }>>);

  return (
    <section className="py-16 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-blue-900/20 blur-3xl"></div>
      
      <div className="relative mx-auto max-w-4xl px-4">
        
        {/* History Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="heading-2 gradient-text text-shadow-glow animate-float-gentle mb-4">
              {currentContent.history.title}
            </h2>
            <p className="body-lg text-white/80">
              {currentContent.history.subtitle}
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-blue-500 rounded-full"></div>
            
            <div className="space-y-12">
              {currentContent.history.timeline.map((item, index) => (
                <div key={index} className="relative flex items-start gap-8">
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center border-4 border-black shadow-xl">
                      <span className="text-black font-bold text-sm">{item.year}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="card-elevated p-6 flex-1 animate-float-gentle">
                    <h3 className="heading-4 gradient-text mb-3">{item.title}</h3>
                    <p className="body-base text-white/90 mb-4">{item.description}</p>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <p className="body-sm text-white/80 leading-relaxed">{item.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="heading-2 gradient-text text-shadow-glow animate-float-gentle mb-4">
              {currentContent.faq.title}
            </h2>
            <p className="body-lg text-white/80">
              {currentContent.faq.subtitle}
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {Object.entries(faqByCategory).map(([category, questions]) => (
              <div key={category} className="card-elevated p-6">
                <h3 className="heading-4 gradient-text mb-6 flex items-center gap-3">
                  <BombIcon size={24} className="animate-glow-pulse" />
                  {category}
                </h3>
                
                <div className="space-y-4">
                  {questions.map((item) => (
                    <div 
                      key={item.originalIndex}
                      className="bg-white/5 rounded-lg border border-white/10 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(item.originalIndex)}
                        className="w-full p-4 text-left hover:bg-white/5 transition-colors duration-200 flex items-center justify-between"
                      >
                        <h4 className="heading-6 text-white pr-4">{item.question}</h4>
                        <span className={`text-orange-400 transition-transform duration-200 ${
                          activeFAQ === item.originalIndex ? 'rotate-180' : ''
                        }`}>
                          ▼
                        </span>
                      </button>
                      
                      {activeFAQ === item.originalIndex && (
                        <div className="px-4 pb-4 animate-fade-in">
                          <div className="border-t border-white/20 pt-4">
                            <p className="body-sm text-white/90 leading-relaxed">{item.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="card-elevated inline-block p-8">
            <h3 className="heading-4 gradient-text mb-4">🤔 Noch Fragen?</h3>
            <p className="body-base text-white/80 mb-6">
              Konnten wir nicht alle deine Fragen beantworten? Schreib uns!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-secondary px-6 py-3">
                📧 Kontakt aufnehmen
              </button>
              <button className="btn-ghost px-6 py-3">
                💡 FAQ erweitern
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
