import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as string;
  
  const translations = {
    de: {
      title: 'Datenschutzerklärung - Wie macht der Bär',
      description: 'Informationen zum Umgang mit Ihren Daten auf unserer Trinkspiel-Website.'
    },
    en: {
      title: 'Privacy Policy - Wie macht der Bär',
      description: 'Information about how we handle your data on our drinking game website.'
    }
  };
  
  const t = translations[locale as keyof typeof translations] || translations.de;
  
  return {
    title: t.title,
    description: t.description,
    robots: 'index, follow',
    openGraph: {
      title: t.title,
      description: t.description,
      type: 'website',
      locale: params.locale,
    },
  };
}

export default function DatenschutzPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as string;
  
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 via-purple-900/20 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,165,0,0.15),transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="display-lg gradient-text mb-6">
            Datenschutzerklärung
          </h1>
          <p className="body-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Informationen zum Umgang mit Ihren Daten
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card-elevated p-8 lg:p-12">
            <div className="prose prose-invert max-w-none">
              
              {/* Einleitung */}
              <div className="mb-8">
                <h2 className="heading-3 text-white mb-4">1. Datenschutz auf einen Blick</h2>
                <h3 className="heading-4 text-white mb-3">Allgemeine Hinweise</h3>
                <p className="text-white/80 mb-4">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                </p>
              </div>

              {/* Datenerfassung */}
              <div className="mb-8">
                <h2 className="heading-3 text-white mb-4">2. Datenerfassung auf dieser Website</h2>
                
                <h3 className="heading-4 text-white mb-3">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
                <p className="text-white/80 mb-4">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt &ldquo;Hinweis zur Verantwortlichen Stelle&rdquo; in dieser Datenschutzerklärung entnehmen.
                </p>

                <h3 className="heading-4 text-white mb-3">Wie erfassen wir Ihre Daten?</h3>
                <p className="text-white/80 mb-4">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                </p>
                <p className="text-white/80 mb-4">
                  Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
                </p>

                <h3 className="heading-4 text-white mb-3">Wofür nutzen wir Ihre Daten?</h3>
                <p className="text-white/80 mb-4">
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                </p>

                <h3 className="heading-4 text-white mb-3">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
                <p className="text-white/80 mb-4">
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                </p>
              </div>

              {/* Hosting */}
              <div className="mb-8">
                <h2 className="heading-3 text-white mb-4">3. Hosting</h2>
                <p className="text-white/80 mb-4">
                  Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
                </p>
                <div className="space-y-2 text-white/80 mb-4">
                  <p><strong>Anbieter:</strong> [PLATZHALTER]</p>
                  <p><strong>Anschrift:</strong> [PLATZHALTER]</p>
                  <p><strong>Website:</strong> [PLATZHALTER]</p>
                </div>
                <p className="text-white/80">
                  Die Erfassung und Verarbeitung Ihrer Daten erfolgt ausschließlich im Rahmen der geltenden Datenschutzbestimmungen und in Übereinstimmung mit den Bestimmungen der DSGVO.
                </p>
              </div>

              {/* Cookies */}
              <div className="mb-8">
                <h2 className="heading-3 text-white mb-4">4. Cookies</h2>
                <p className="text-white/80 mb-4">
                  Unsere Internetseiten verwenden so genannte &ldquo;Cookies&rdquo;. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (dauerhafte Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Bei dauerhaften Cookies bleibt die Cookie-ID bis zur manuellen Löschung durch Sie oder bis zur automatischen Löschung durch Ihren Webbrowser bestehen.
                </p>
                <p className="text-white/80 mb-4">
                  Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte Websitefunktionen ohne diese nicht funktionieren würden (z. B. die Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies dienen dazu, das Nutzerverhalten auszuwerten oder Werbung anzuzeigen.
                </p>
              </div>

              {/* Server-Log-Dateien */}
              <div className="mb-8">
                <h2 className="heading-3 text-white mb-4">5. Server-Log-Dateien</h2>
                <p className="text-white/80 mb-4">
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                  <li>Browsertyp und Browserversion</li>
                  <li>verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p className="text-white/80">
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
                </p>
              </div>

              {/* Kontaktformular */}
              <div className="mb-8">
                <h2 className="heading-3 text-white mb-4">6. Kontaktformular</h2>
                <p className="text-white/80 mb-4">
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
                <p className="text-white/80">
                  Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
                </p>
              </div>

              {/* Google Analytics */}
              <div className="mb-8">
                <h2 className="heading-3 text-white mb-4">7. Google Analytics</h2>
                <p className="text-white/80 mb-4">
                  Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland Limited (&ldquo;Google&rdquo;), Gordon House, Barrow Street, Dublin 4, Irland.
                </p>
                <p className="text-white/80 mb-4">
                  Google Analytics verwendet so genannte &ldquo;Cookies&rdquo;. Das sind Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
                </p>
                <p className="text-white/80">
                  Die Speicherung von Google-Analytics-Cookies und die Nutzung dieses Analyse-Tools erfolgen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der Analyse des Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren.
                </p>
              </div>

              {/* Ihre Rechte */}
              <div className="mb-8">
                <h2 className="heading-3 text-white mb-4">8. Ihre Rechte</h2>
                <p className="text-white/80 mb-4">
                  Sie haben folgende Rechte:
                </p>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                  <li>Recht auf Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten</li>
                  <li>Recht auf Berichtigung unrichtiger oder unvollständiger Daten</li>
                  <li>Recht auf Löschung Ihrer bei uns gespeicherten Daten</li>
                  <li>Recht auf Einschränkung der Datenverarbeitung</li>
                  <li>Recht auf Datenübertragbarkeit</li>
                  <li>Widerspruchsrecht gegen die Verarbeitung Ihrer Daten bei uns</li>
                  <li>Recht auf Widerruf einer erteilten Einwilligung</li>
                  <li>Recht auf Beschwerde bei einer Aufsichtsbehörde</li>
                </ul>
              </div>

              {/* Änderungen */}
              <div className="mb-8">
                <h2 className="heading-3 text-white mb-4">9. Änderungen dieser Datenschutzerklärung</h2>
                <p className="text-white/80">
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z. B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
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
            href={`/${locale}`} 
            className="btn-primary px-8 py-4 inline-flex items-center gap-2"
          >
            ← Zurück zur Startseite
          </a>
        </div>
      </section>
    </div>
  );
}
