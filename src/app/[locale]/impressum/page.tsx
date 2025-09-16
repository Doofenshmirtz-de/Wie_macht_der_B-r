'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ImpressumPage() {
  const params = useParams();
  const locale = params.locale as string;
  
  // Übersetzungen
  const t = (key: string) => {
    const translations = {
      de: {
        'title': 'Impressum',
        'subtitle': 'Platzhalter-Inhalt. Hier stehen künftig die gesetzlich vorgeschriebenen Angaben gemäß § 5 TMG.',
        'tmg': 'Angaben gemäß § 5 TMG',
        'tmgText': 'Diese Seite ist eine vorläufige Impressum-Seite. Sie wird in Kürze durch eine vollständige und rechtskonforme Fassung ersetzt. Bis dahin gelten die allgemeinen Bestimmungen.',
        'responsible': 'Verantwortlich für den Inhalt',
        'responsibleText': 'Die Inhalte dieser Website werden nach bestem Wissen und Gewissen erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Informationen kann jedoch keine Gewähr übernommen werden.',
        'disclaimer': 'Haftungsausschluss',
        'disclaimerText': 'Diese Website dient ausschließlich zu Informationszwecken. Die Nutzung der bereitgestellten Inhalte erfolgt auf eigene Gefahr. Es wird keine Haftung für Schäden übernommen, die durch die Nutzung dieser Website entstehen könnten.',
        'contact': 'Kontakt',
        'contactText': 'Bei Fragen oder Anregungen können Sie uns gerne über die auf der Website angegebenen Kontaktmöglichkeiten erreichen.',
        'backToHome': '← Zurück zur Startseite'
      },
      en: {
        'title': 'Imprint',
        'subtitle': 'Placeholder content. Here will be the legally required information according to § 5 TMG.',
        'tmg': 'Information according to § 5 TMG',
        'tmgText': 'This is a preliminary imprint page. It will soon be replaced by a complete and legally compliant version. Until then, the general provisions apply.',
        'responsible': 'Responsible for content',
        'responsibleText': 'The contents of this website are created to the best of our knowledge and belief. However, no guarantee can be given for the accuracy, completeness and timeliness of the information provided.',
        'disclaimer': 'Disclaimer',
        'disclaimerText': 'This website is for informational purposes only. The use of the provided content is at your own risk. No liability is assumed for damages that may arise from the use of this website.',
        'contact': 'Contact',
        'contactText': 'If you have any questions or suggestions, please feel free to contact us via the contact options provided on the website.',
        'backToHome': '← Back to homepage'
      }
    };
    return translations[locale as keyof typeof translations]?.[key as keyof typeof translations.de] || translations.de[key as keyof typeof translations.de];
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <section className="max-w-4xl mx-auto">
        <h1 className="heading-2 text-white mb-4">📝 {t('title')}</h1>
        <p className="body-lg text-white/80 mb-8">
          {t('subtitle')}
        </p>

        <div className="space-y-6 body-base text-white/80">
          <div className="card-elevated p-6">
            <h2 className="heading-3 text-white mb-4">{t('tmg')}</h2>
            <p>
              {t('tmgText')}
            </p>
          </div>

          <div className="card-elevated p-6">
            <h2 className="heading-3 text-white mb-4">{t('responsible')}</h2>
            <p>
              {t('responsibleText')}
            </p>
          </div>

          <div className="card-elevated p-6">
            <h2 className="heading-3 text-white mb-4">{t('disclaimer')}</h2>
            <p>
              {t('disclaimerText')}
            </p>
          </div>

          <div className="card-elevated p-6">
            <h2 className="heading-3 text-white mb-4">{t('contact')}</h2>
            <p>
              {t('contactText')}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href={`/${locale}`} 
            className="btn-primary px-6 py-3"
          >
            {t('backToHome')}
          </Link>
        </div>
      </section>
    </div>
  );
}
