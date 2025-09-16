'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PrivacyPage() {
  const params = useParams();
  const locale = params.locale as string;
  
  // Übersetzungen
  const t = (key: string) => {
    const translations = {
      de: {
        'title': 'Datenschutz',
        'subtitle': 'Platzhalter-Inhalt. Hier stehen künftig Informationen gemäß DSGVO zur Datenverarbeitung, Verantwortlichem, Speicherdauer, Rechtsgrundlagen, Betroffenenrechten und Kontaktmöglichkeiten.',
        'preliminary': 'Diese Seite ist eine vorläufige Datenschutzerklärung. Sie wird in Kürze durch eine vollständige und rechtskonforme Fassung ersetzt. Bis dahin verarbeiten wir Daten ausschließlich im Rahmen der technischen Bereitstellung dieser Webseite.',
        'responsible': 'Verantwortlicher: Wird ergänzt',
        'purposes': 'Zwecke der Verarbeitung: Betrieb der Website, Sicherheit, Performance',
        'legalBasis': 'Rechtsgrundlagen: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)',
        'recipients': 'Empfänger: Hosting- und Infrastrukturpartner',
        'storage': 'Speicherdauer: Logdaten i. d. R. 7–14 Tage',
        'rights': 'Betroffenenrechte: Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch',
        'contact': 'Kontakt: Wird ergänzt',
        'backToHome': '← Zurück zur Startseite'
      },
      en: {
        'title': 'Privacy Policy',
        'subtitle': 'Placeholder content. Here will be information according to GDPR on data processing, responsible party, storage duration, legal basis, data subject rights and contact options.',
        'preliminary': 'This is a preliminary privacy policy. It will soon be replaced by a complete and legally compliant version. Until then, we process data exclusively within the framework of the technical provision of this website.',
        'responsible': 'Responsible party: To be added',
        'purposes': 'Purposes of processing: Website operation, security, performance',
        'legalBasis': 'Legal basis: Art. 6 para. 1 lit. f GDPR (legitimate interest)',
        'recipients': 'Recipients: Hosting and infrastructure partners',
        'storage': 'Storage duration: Log data usually 7-14 days',
        'rights': 'Data subject rights: Information, correction, deletion, restriction, objection',
        'contact': 'Contact: To be added',
        'backToHome': '← Back to homepage'
      }
    };
    return translations[locale as keyof typeof translations]?.[key as keyof typeof translations.de] || translations.de[key as keyof typeof translations.de];
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <section className="max-w-4xl mx-auto">
        <h1 className="heading-2 text-white mb-4">📋 {t('title')}</h1>
        <p className="body-lg text-white/80 mb-8">
          {t('subtitle')}
        </p>

        <div className="space-y-6 body-base text-white/80">
          <p>
            {t('preliminary')}
          </p>
          <ul className="list-disc pl-6">
            <li>{t('responsible')}</li>
            <li>{t('purposes')}</li>
            <li>{t('legalBasis')}</li>
            <li>{t('recipients')}</li>
            <li>{t('storage')}</li>
            <li>{t('rights')}</li>
            <li>{t('contact')}</li>
          </ul>
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


