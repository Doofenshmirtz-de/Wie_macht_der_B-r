'use client';

import Link from 'next/link';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <section className="max-w-4xl mx-auto">
        <h1 className="heading-2 text-white mb-4">📝 Impressum</h1>
        <p className="body-lg text-white/80 mb-8">
          Platzhalter-Inhalt. Hier stehen künftig die gesetzlich vorgeschriebenen Angaben gemäß § 5 TMG.
        </p>

        <div className="space-y-6 body-base text-white/80">
          <div className="card-elevated p-6">
            <h2 className="heading-3 text-white mb-4">Angaben gemäß § 5 TMG</h2>
            <p>
              Diese Seite ist eine vorläufige Impressum-Seite. Sie wird in Kürze durch eine vollständige
              und rechtskonforme Fassung ersetzt. Bis dahin gelten die allgemeinen Bestimmungen.
            </p>
          </div>

          <div className="card-elevated p-6">
            <h2 className="heading-3 text-white mb-4">Verantwortlich für den Inhalt</h2>
            <p>
              Die Inhalte dieser Website werden nach bestem Wissen und Gewissen erstellt. 
              Für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Informationen 
              kann jedoch keine Gewähr übernommen werden.
            </p>
          </div>

          <div className="card-elevated p-6">
            <h2 className="heading-3 text-white mb-4">Haftungsausschluss</h2>
            <p>
              Diese Website dient ausschließlich zu Informationszwecken. Die Nutzung der 
              bereitgestellten Inhalte erfolgt auf eigene Gefahr. Es wird keine Haftung für 
              Schäden übernommen, die durch die Nutzung dieser Website entstehen könnten.
            </p>
          </div>

          <div className="card-elevated p-6">
            <h2 className="heading-3 text-white mb-4">Kontakt</h2>
            <p>
              Bei Fragen oder Anregungen können Sie uns gerne über die auf der Website 
              angegebenen Kontaktmöglichkeiten erreichen.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="btn-primary px-6 py-3"
          >
            ← Zurück zur Startseite
          </Link>
        </div>
      </section>
    </div>
  );
}
