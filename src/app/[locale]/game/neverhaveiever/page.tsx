"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { neverHaveIEverCategoriesDE, neverHaveIEverCategoriesEN } from "./shared/categories";
import { CategorySelection } from "./components/CategorySelection";
import { GameCard } from "./components/GameCard";
import { NeverHaveIEverSettings } from "./components/NeverHaveIEverSettings";
import Image from "next/image";
import { RelatedGames } from "../../../ui/InternalLinkCard";

type GamePhase = "category" | "playing";
type Category = "casual" | "party" | "eighteen";

export default function NeverHaveIEverPage() {
  const params = useParams();
  const locale = params.locale as string;
  
  const categories = locale === "de" ? neverHaveIEverCategoriesDE : neverHaveIEverCategoriesEN;
  
  const [gamePhase, setGamePhase] = useState<GamePhase>("category");
  const [selectedCategory, setSelectedCategory] = useState<Category>("casual");
  const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shuffledStatements, setShuffledStatements] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Shuffle statements and add special cards for party and 18+ categories
  const createShuffledStatements = (category: Category) => {
    const categoryData = categories[category];
    const statements = [...categoryData.statements];
    
    // Shuffle the statements
    for (let i = statements.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [statements[i], statements[j]] = [statements[j], statements[i]];
    }

    // Add special "everyone drinks" cards for party and 18+ categories
    if ((category === "party" || category === "eighteen") && categoryData.specialCards) {
      const specialCards = categoryData.specialCards;
      const result: string[] = [];
      
      for (let i = 0; i < statements.length; i++) {
        result.push(statements[i]);
        
        // Add special card every 20 statements
        if ((i + 1) % 20 === 0 && i < statements.length - 1) {
          const randomSpecialCard = specialCards[Math.floor(Math.random() * specialCards.length)];
          result.push(randomSpecialCard);
        }
      }
      
      return result;
    }
    
    return statements;
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    const shuffled = createShuffledStatements(category);
    setShuffledStatements(shuffled);
    setCurrentStatementIndex(0);
    setGamePhase("playing");
  };

  const handleNext = () => {
    if (currentStatementIndex < shuffledStatements.length - 1) {
      setCurrentStatementIndex(currentStatementIndex + 1);
    } else {
      // Game finished, return to category selection
      setGamePhase("category");
      setCurrentStatementIndex(0);
      setShuffledStatements([]);
    }
  };

  const backToCategory = () => {
    setGamePhase("category");
    setCurrentStatementIndex(0);
    setShuffledStatements([]);
  };

  const getCurrentStatement = () => {
    return shuffledStatements[currentStatementIndex] || "";
  };

  const isSpecialCard = () => {
    const currentStatement = getCurrentStatement();
    const categoryData = categories[selectedCategory];
    if (categoryData.specialCards) {
      return categoryData.specialCards.includes(currentStatement);
    }
    return false;
  };

  const getCategoryName = () => {
    switch (selectedCategory) {
      case "casual": return locale === "de" ? "🟢 Casual" : "🟢 Casual";
      case "party": return locale === "de" ? "🎉 Party" : "🎉 Party";
      case "eighteen": return locale === "de" ? "🔥 18+" : "🔥 18+";
      default: return "";
    }
  };

  const getTitle = () => {
    return locale === "de" ? "🍻 Ich hab noch nie 🍻" : "🍻 Never Have I Ever 🍻";
  };

  const getBackButtonText = () => {
    return locale === "de" ? "⬅️ Zurück zu Kategorien" : "⬅️ Back to Categories";
  };

  const getInstructionButtonText = () => {
    return locale === "de" ? "Anleitung" : "Instructions";
  };

  return (
    <div className="min-h-screen p-4 md:p-6 text-white">
      {/* Header with Title */}
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-3xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 drop-shadow-lg">
          {getTitle()}
        </h2>
        
        {/* Category Indicator */}
        {gamePhase === "playing" && (
          <div className="text-sm text-white/60 mb-2">
            {getCategoryName()}
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
          {gamePhase === "playing" && shuffledStatements.length > 0 && (
            <div className="space-y-6">
              {/* Back Button */}
              <div className="text-center">
                <button
                  onClick={backToCategory}
                  className="cr-button-danger px-6 py-3 text-lg font-black"
                >
                  {getBackButtonText()}
                </button>
              </div>

              {/* Game Card */}
              <GameCard
                currentStatement={getCurrentStatement()}
                onNext={handleNext}
                isSpecialCard={isSpecialCard()}
              />

              {/* Settings Button */}
              <div className="text-center mt-8">
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="group relative px-6 py-3 rounded-xl overflow-hidden border-2 border-white/30 hover:border-yellow-300/70 bg-gradient-to-b from-purple-500/80 to-pink-600/80 transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3 shadow-lg mx-auto"
                  aria-label="Ich hab noch nie Einstellungen öffnen"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                  <Image src="/icons/gear.svg" alt="Einstellungen" width={20} height={20} className="drop-shadow-lg" />
                  <span className="text-white font-bold text-lg drop-shadow-lg">{getInstructionButtonText()}</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Settings Modal */}
      <NeverHaveIEverSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      
      {/* Related Games Section */}
      <RelatedGames currentGame="neverhaveiever" className="mt-16" />
    </div>
  );
}
