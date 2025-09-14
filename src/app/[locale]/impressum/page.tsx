import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Impressum' });
  
  return {
    title: t('title'),
    description: t('description'),
    robots: 'index, follow',
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: params.locale,
    },
  };
}

export default function ImpressumPage({ params }: { params: { locale: string } }) {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 via-purple-900/20 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,165,0,0.15),transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="display-lg gradient-text mb-6">
            Impressum
          </h1>
          <p className="body-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Angaben gemäß § 5 TMG
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card-elevated p-8 lg:p-12">
            <div className="prose prose-invert max-w-none">
              
              {/* Anbieter */}
              <div className="mb-8">
                <h2 className="heading-3 text-white mb-4">Anbieter</h2>
                <div className="space-y-2 text-white/80">
                  <p><strong>Firmenname:</strong> [PLATZHALTER]</p>
                  <p><strong>Inhaber:</strong> [PLATZHALTER]</p>
                  <p><strong>Anschrift:</strong> [PLATZHALTER]</p>
                  <p><strong>PLZ, Ort:</strong> [PLATZHALTER]</p>
                </div>
              </div>

              {/* Kontakt */}
              <div className="mb-8">
                <h2 className="heading-3 text-white mb-4">Kontakt</h2>
                <div className="space-y-2 text-white/80">
                  <p><strong>Telefon:</strong> [PLATZHALTER]</p>
                  <p><strong>E-Mail:</strong> [PLATZHALTER]</p>
                  <p><strong>Website:</strong> www.wie-macht-der-baer.de</p>
                </div>
              </div>

              {/* Registereintrag */}
              <div className="mb-8">
                <h2 className="heading-3 text-white mb-4">Registereintrag</h2>
                <div className="space-y-2 text-white/80">
                  <p><strong>Registergericht:</strong> [PLATZHALTER]</p>
                  <p><strong>Registernummer:</strong> [PLATZHALTER]</p>
                  <p><strong>Umsatzsteuer-ID:</strong> [PLATZHALTER]</p>
                </div>
              </div>

              {/* Verantwortlich für den Inhalt */}
              <div className="mb-8">
                <h2 className="heading-3 text-white mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                <div className="space-y-2 text-white/80">
                  <p><strong>Name:</strong> [PLATZHALTER]</p>
                  <p><strong>Anschrift:</strong> [PLATZHALTER]</p>
                </div>
              </div>

              {/* Haftungsausschluss */}
              <div className="mb-8">
                <h2 className="heading-3 text-white mb-4">Haftungsausschluss</h2>
                
                <h3 className="heading-4 text-white mb-3">Haftung für Inhalte</h3>
                <p className="text-white/80 mb-4">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>

                <h3 className="heading-4 text-white mb-3">Haftung für Links</h3>
                <p className="text-white/80 mb-4">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>

                <h3 className="heading-4 text-white mb-3">Urheberrecht</h3>
                <p className="text-white/80 mb-4">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>

              {/* Streitschlichtung */}
              <div className="mb-8">
                <h2 className="heading-3 text-white mb-4">Streitschlichtung</h2>
                <p className="text-white/80 mb-4">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p className="text-white/80">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <a 
            href="/" 
            className="btn-primary px-8 py-4 inline-flex items-center gap-2"
          >
            ← Zurück zur Startseite
          </a>
        </div>
      </section>
    </div>
  );
}
