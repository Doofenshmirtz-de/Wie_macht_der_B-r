"use client";

// TruthOrDareSettings component - no additional imports needed

interface TruthOrDareSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TruthOrDareSettings({ isOpen, onClose }: TruthOrDareSettingsProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="cr-card p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl border-2 border-yellow-300 shadow-lg flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-yellow-300">
                🎯 Wahrheit oder Pflicht
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="text-2xl text-white/60 hover:text-white transition-colors p-2"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Spielanleitung Sektion */}
            <section>
              <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                📚 Wie funktioniert Wahrheit oder Pflicht?
              </h3>
              <div className="bg-white/10 rounded-xl p-4 space-y-3 text-white/90">
                <div className="space-y-2">
                  <h4 className="font-bold text-yellow-200">🎯 Spielziel:</h4>
                  <p>Beantworte ehrlich Wahrheitsfragen oder erfülle mutige Aufgaben!</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-bold text-yellow-200">🎮 Spielablauf:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• Eine Karte mit &quot;Wahrheit oder Pflicht&quot; wird angezeigt</li>
                    <li>• <strong>Nach links swipen:</strong> Wahrheit (beantworte eine ehrliche Frage)</li>
                    <li>• <strong>Nach rechts swipen:</strong> Pflicht (erfülle eine Aufgabe)</li>
                    <li>• Führe deine Aufgabe aus oder beantworte die Frage</li>
                    <li>• Drücke &quot;Weiter&quot; für die nächste Runde</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-yellow-200">📱 Bedienung:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>Swipe nach links (←):</strong> Wahrheit wählen</li>
                    <li>• <strong>Swipe nach rechts (→):</strong> Pflicht wählen</li>
                    <li>• Oder nutze die Buttons zum Auswählen</li>
                  </ul>
                </div>

                <div className="bg-pink-500/20 rounded-lg p-3 mt-4">
                  <p className="text-pink-200 font-bold text-sm">
                    💡 Tipp: Seid ehrlich bei den Wahrheitsfragen und mutig bei den Aufgaben!
                  </p>
                </div>
              </div>
            </section>

            {/* Kategorien Info */}
            <section>
              <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                🎯 Kategorien
              </h3>
              <div className="bg-white/10 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-500/20 rounded-lg">
                  <span className="text-2xl">🟢</span>
                  <div>
                    <h4 className="font-bold text-green-300">Einfach</h4>
                    <p className="text-sm text-white/80">Harmlose Fragen und lustige Aufgaben - für alle Altersgruppen</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-500/20 rounded-lg">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <h4 className="font-bold text-red-300">18+</h4>
                    <p className="text-sm text-white/80">Nur für Erwachsene - freche Fragen und pikante Aufgaben</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sound Info */}
            <section>
              <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                🔊 Sound-Effekte
              </h3>
              <div className="bg-white/10 rounded-xl p-4 space-y-3">
                <p className="text-white/80">
                  Das Spiel verwendet Sound-Effekte für ein besseres Spielerlebnis:
                </p>
                <ul className="space-y-1 ml-4 text-white/70">
                  <li>• Swipe-Sound beim Wischen der Karten</li>
                  <li>• Click-Sound bei Button-Interaktionen</li>
                </ul>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={onClose}
                className="cr-button-primary flex-1 px-6 py-3 text-lg font-black"
              >
                ✅ Verstanden
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
