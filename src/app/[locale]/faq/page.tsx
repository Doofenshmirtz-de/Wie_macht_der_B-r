'use client';

import { FAQSection } from '../../ui/FAQSection';
import { SocialSharing } from '../../ui/SocialSharing';
import { InternalLinkCard } from '../../ui/InternalLinkCard';
import { useParams } from 'next/navigation';

export default function FAQPage() {
  const params = useParams();
  const locale = (params as { locale?: string })?.locale === 'en' ? 'en' : 'de';
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 via-purple-900/20 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,165,0,0.15),transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="display-lg text-white mb-6">
            ❓ {locale === 'en' ? 'FAQ - Online Party Games' : 'FAQ - Online Partyspiele'}
          </h2>
          <p className="body-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            {locale === 'en' 
              ? 'Everything you need to know about free browser party games! From Bomb Party rules to safety tips - find all answers here.'
              : 'Alles was du über kostenlose Browser Partyspiele wissen musst! Von Bomb Party Regeln bis zu Sicherheitstipps - hier findest du alle Antworten.'
            }
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="stat-card animate-float-gentle">
              <div className="text-2xl mb-2">🎮</div>
              <div className="label-lg text-white">15+</div>
              <div className="text-xs text-white/60">{locale === 'en' ? 'FAQ Topics' : 'FAQ Themen'}</div>
            </div>
            <div className="stat-card animate-float-gentle anim-delay-1">
              <div className="text-2xl mb-2">⚡</div>
              <div className="label-lg text-white">{locale === 'en' ? 'Instant' : 'Sofort'}</div>
              <div className="text-xs text-white/60">{locale === 'en' ? 'Answers' : 'Antworten'}</div>
            </div>
            <div className="stat-card animate-float-gentle anim-delay-2">
              <div className="text-2xl mb-2">🔍</div>
              <div className="label-lg text-white">{locale === 'en' ? 'Searchable' : 'Durchsuchbar'}</div>
              <div className="text-xs text-white/60">{locale === 'en' ? 'FAQ System' : 'FAQ System'}</div>
            </div>
            <div className="stat-card animate-float-gentle anim-delay-3">
              <div className="text-2xl mb-2">💡</div>
              <div className="label-lg text-white">{locale === 'en' ? 'Helpful' : 'Hilfreich'}</div>
              <div className="text-xs text-white/60">{locale === 'en' ? 'Tips & Tricks' : 'Tipps & Tricks'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main FAQ Section */}
      <FAQSection showSearch={true} />

      {/* Related Games */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-white mb-4">
              🎯 {locale === 'en' ? 'Play Online Party Games for free now!' : 'Jetzt Online Partyspiele kostenlos spielen!'}
            </h2>
            <p className="body-lg text-white/80">
              {locale === 'en' 
                ? 'Found all answers? Then start now with our browser party games!'
                : 'Hast du alle Antworten gefunden? Dann starte jetzt mit unseren Browser Partyspielen!'
              }
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <InternalLinkCard
              href={`/${locale}/game/bomb`}
              title={locale === 'en' ? 'Start Bomb Party' : 'Bomb Party starten'}
              description={locale === 'en' 
                ? 'The ultimate word game! Find words before the bomb explodes - multiplayer up to 16 players.'
                : 'Das ultimative Wortspiel! Finde Wörter bevor die Bombe explodiert - Multiplayer bis 16 Spieler.'
              }
              gameType="bomb"
              keywords={locale === 'en' 
                ? ['Bomb Party', 'Multiplayer', 'Word Game']
                : ['Bomb Party', 'Multiplayer', 'Wortspiel']
              }
            />
            <InternalLinkCard
              href={`/${locale}/game/neverhaveiever`}
              title={locale === 'en' ? 'Never Have I Ever online' : 'Ich hab noch nie online'}
              description={locale === 'en'
                ? 'Funny confessions and embarrassing secrets! The perfect game to get to know friends better.'
                : 'Lustige Geständnisse und peinliche Geheimnisse! Das perfekte Spiel um Freunde besser kennenzulernen.'
              }
              gameType="neverhaveiever"
              keywords={locale === 'en'
                ? ['Never Have I Ever', 'Confessions', 'Friends']
                : ['Ich hab noch nie', 'Geständnisse', 'Freunde']
              }
            />
            <InternalLinkCard
              href={`/${locale}/game/truthordare`}
              title={locale === 'en' ? 'Truth or Dare Browser' : 'Wahrheit oder Pflicht Browser'}
              description={locale === 'en'
                ? 'Bold truths and crazy challenges! For adults who are not afraid of challenges.'
                : 'Mutige Wahrheiten und verrückte Aufgaben! Für Erwachsene die keine Angst vor Herausforderungen haben.'
              }
              gameType="truthordare"
              keywords={locale === 'en'
                ? ['Truth or Dare', 'Challenges', 'Adults']
                : ['Wahrheit oder Pflicht', 'Aufgaben', 'Erwachsene']
              }
            />
          </div>
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-900/20 to-orange-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-3 text-white mb-6">
            📰 {locale === 'en' ? 'More Party Game Tips & Guides' : 'Mehr Partyspiel-Tipps & Guides'}
          </h2>
          <p className="body-lg text-white/80 mb-8">
            {locale === 'en'
              ? 'Discover our blog with party planning tips, new game ideas and guides for the perfect party!'
              : 'Entdecke unseren Blog mit Partyplanung-Tipps, neuen Spielideen und Guides für die perfekte Party!'
            }
          </p>
          <InternalLinkCard
            href={`/${locale}/blog`}
            title={locale === 'en' ? 'Party Games Blog & Magazine' : 'Partyspiele Blog & Magazin'}
            description={locale === 'en'
              ? 'Party planning tips, game rules, safety guidelines and creative ideas for unforgettable parties.'
              : 'Partyplanung-Tipps, Spielregeln, Sicherheitshinweise und kreative Ideen für unvergessliche Partys.'
            }
            gameType="blog"
            keywords={locale === 'en'
              ? ['Blog', 'Party Planning', 'Tips']
              : ['Blog', 'Partyplanung', 'Tipps']
            }
            className="max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Social Sharing */}
      <SocialSharing />
    </div>
  );
}
