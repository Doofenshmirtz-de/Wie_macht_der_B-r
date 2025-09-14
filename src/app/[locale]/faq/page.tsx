'use client';

import { FAQSection } from '../../ui/FAQSection';
import { SocialSharing } from '../../ui/SocialSharing';
import { InternalLinkCard } from '../../ui/InternalLinkCard';




export default function FAQPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 via-purple-900/20 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,165,0,0.15),transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="display-lg gradient-text mb-6">
            FAQ - Online Partyspiele
          </h2>
          <p className="body-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Alles was du über <strong>kostenlose Browser Partyspiele</strong> wissen musst! 
            Von Bomb Party Regeln bis zu Sicherheitstipps - hier findest du alle Antworten.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="stat-card">
              <div className="label-lg text-orange-300">15+</div>
              <div className="text-xs text-white/60">FAQ Themen</div>
            </div>
            <div className="stat-card">
              <div className="label-lg text-orange-300">Sofort</div>
              <div className="text-xs text-white/60">Antworten</div>
            </div>
            <div className="stat-card">
              <div className="label-lg text-orange-300">Durchsuchbar</div>
              <div className="text-xs text-white/60">FAQ System</div>
            </div>
            <div className="stat-card">
              <div className="label-lg text-orange-300">Hilfsreich</div>
              <div className="text-xs text-white/60">Tipps & Tricks</div>
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
            <h2 className="heading-2 gradient-text mb-4">
              Jetzt Online Partyspiele kostenlos spielen!
            </h2>
            <p className="body-lg text-white/80">
              Hast du alle Antworten gefunden? Dann starte jetzt mit unseren Browser Partyspielen!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <InternalLinkCard
              href="/game/bomb"
              title="Bomb Party Partyspiel starten"
              description="Das ultimative Wortspiel-Partyspiel! Finde Wörter bevor die Bombe explodiert - Multiplayer bis 16 Spieler."
              gameType="bomb"
              keywords={['Bomb Party', 'Multiplayer', 'Wortspiel']}
            />
            <InternalLinkCard
              href="/game/neverhaveiever"
              title="Ich hab noch nie online"
              description="Lustige Geständnisse und peinliche Geheimnisse! Das perfekte Spiel um Freunde besser kennenzulernen."
              gameType="neverhaveiever"
              keywords={['Ich hab noch nie', 'Geständnisse', 'Freunde']}
            />
            <InternalLinkCard
              href="/game/truthordare"
              title="Wahrheit oder Pflicht Browser"
              description="Mutige Wahrheiten und verrückte Aufgaben! Für Erwachsene die keine Angst vor Herausforderungen haben."
              gameType="truthordare"
              keywords={['Wahrheit oder Pflicht', 'Aufgaben', 'Erwachsene']}
            />
          </div>
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-900/20 to-orange-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-3 gradient-text mb-6">
            Mehr Partyspiele Tipps & Guides
          </h2>
          <p className="body-lg text-white/80 mb-8">
            Entdecke unseren Blog mit Partyplanung-Tipps, neuen Spielideen und Guides für die perfekte Party!
          </p>
          <InternalLinkCard
            href="/blog"
            title="Partyspiele Blog & Magazin"
            description="Partyplanung-Tipps, Spielregeln, Sicherheitshinweise und kreative Ideen für unvergessliche Partys."
            gameType="blog"
            keywords={['Blog', 'Partyplanung', 'Tipps']}
            className="max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Social Sharing */}
      <SocialSharing />
    </div>
  );
}
