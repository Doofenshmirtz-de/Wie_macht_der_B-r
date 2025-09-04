"use client";

import { useState, useEffect } from "react";
// useTranslations import removed - not used in current implementation
import { useParams } from "next/navigation";
import { truthOrDareCategoriesDE, truthOrDareCategoriesEN } from "./shared/categories";
import type { AppLocale } from "@/i18n/routing";
import { CategorySelection } from "./components/CategorySelection";
import { GameCard } from "./components/GameCard";
import { TruthOrDareSettings } from "./components/TruthOrDareSettings";
import Image from "next/image";

type GamePhase = "category" | "playing";
type Category = "simple" | "spicy";
type GameMode = "selection" | "truth" | "dare";

export default function TruthOrDarePage() {
  const params = useParams();
  const locale = params.locale as AppLocale;
  
  const categories = locale === "de" ? truthOrDareCategoriesDE : truthOrDareCategoriesEN;
  
  const [gamePhase, setGamePhase] = useState<GamePhase>("category");
  const [selectedCategory, setSelectedCategory] = useState<Category>("simple");
  const [currentMode, setCurrentMode] = useState<GameMode>("selection");
  const [currentTruth, setCurrentTruth] = useState<string>("");
  const [currentDare, setCurrentDare] = useState<string>("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setGamePhase("playing");
    setCurrentMode("selection");
  };

  const getRandomTruth = () => {
    const truths = categories[selectedCategory].truths;
    return truths[Math.floor(Math.random() * truths.length)];
  };

  const getRandomDare = () => {
    const dares = categories[selectedCategory].dares;
    return dares[Math.floor(Math.random() * dares.length)];
  };

  const handleChoice = (choice: 'truth' | 'dare') => {
    if (choice === 'truth') {
      setCurrentTruth(getRandomTruth());
      setCurrentMode('truth');
    } else {
      setCurrentDare(getRandomDare());
      setCurrentMode('dare');
    }
  };

  const handleNext = () => {
    setCurrentMode('selection');
    setCurrentTruth('');
    setCurrentDare('');
  };

  const backToCategory = () => {
    setGamePhase("category");
    setCurrentMode("selection");
    setCurrentTruth('');
    setCurrentDare('');
  };

  return (
    <div className="min-h-screen p-4 md:p-6 text-white">
      {/* Header with Title */}
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-3xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-red-600 drop-shadow-lg">
          🎯 Wahrheit oder Pflicht 🎯
        </h1>
        
        {/* Category Indicator */}
        {gamePhase === "playing" && (
          <div className="text-sm text-white/60 mb-2">
            {selectedCategory === "simple" ? "🟢 Einfach" : "🔥 18+"}
          </div>
        )}
      </div>

      {/* Only render content when mounted to prevent hydration issues */}
      {mounted && (
        <>
          {/* Category Selection Phase */}
          {gamePhase === "category" && (
            <CategorySelection 
              onCategorySelect={handleCategorySelect}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          )}

          {/* Playing Phase */}
          {gamePhase === "playing" && (
            <div className="space-y-6">
              {/* Back Button */}
              <div className="text-center">
                <button
                  onClick={backToCategory}
                  className="cr-button-danger px-6 py-3 text-lg font-black"
                >
                  ⬅️ Zurück zu Kategorien
                </button>
              </div>

              {/* Game Card */}
              <GameCard
                mode={currentMode}
                currentTruth={currentTruth}
                currentDare={currentDare}
                onChoice={handleChoice}
                onNext={handleNext}
              />

              {/* Settings Button */}
              <div className="text-center mt-8">
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="group relative px-6 py-3 rounded-xl overflow-hidden border-2 border-white/30 hover:border-yellow-300/70 bg-gradient-to-b from-purple-500/80 to-pink-600/80 transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3 shadow-lg mx-auto"
                  aria-label="Wahrheit oder Pflicht Einstellungen öffnen"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                  <Image src="/icons/gear.svg" alt="Einstellungen" width={20} height={20} className="drop-shadow-lg" />
                  <span className="text-white font-bold text-lg drop-shadow-lg">Anleitung</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Settings Modal */}
      <TruthOrDareSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
