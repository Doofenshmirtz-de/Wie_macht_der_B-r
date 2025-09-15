'use client';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <section className="max-w-4xl mx-auto">
        <h1 className="heading-2 text-white mb-4">📋 Datenschutz</h1>
        <p className="body-lg text-white/80 mb-8">
          Platzhalter-Inhalt. Hier stehen künftig Informationen gemäß DSGVO zur Datenverarbeitung,
          Verantwortlichem, Speicherdauer, Rechtsgrundlagen, Betroffenenrechten und Kontaktmöglichkeiten.
        </p>

        <div className="space-y-6 body-base text-white/80">
          <p>
            Diese Seite ist eine vorläufige Datenschutzerklärung. Sie wird in Kürze durch eine vollständige
            und rechtskonforme Fassung ersetzt. Bis dahin verarbeiten wir Daten ausschließlich im Rahmen
            der technischen Bereitstellung dieser Webseite.
          </p>
          <ul className="list-disc pl-6">
            <li>Verantwortlicher: Wird ergänzt</li>
            <li>Zwecke der Verarbeitung: Betrieb der Website, Sicherheit, Performance</li>
            <li>Rechtsgrundlagen: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</li>
            <li>Empfänger: Hosting- und Infrastrukturpartner</li>
            <li>Speicherdauer: Logdaten i. d. R. 7–14 Tage</li>
            <li>Betroffenenrechte: Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch</li>
            <li>Kontakt: Wird ergänzt</li>
          </ul>
        </div>
      </section>
    </div>
  );
}


