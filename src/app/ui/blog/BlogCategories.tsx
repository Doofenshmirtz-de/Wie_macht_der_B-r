'use client';

import { useState } from 'react';
import { BombIcon, GameIcon, TrophyIcon, UsersIcon, ShareIcon } from '../EnhancedIcons';

interface BlogCategoriesProps {
  locale: 'de' | 'en';
}

export function BlogCategories({ locale }: BlogCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const content = {
    de: {
      title: "📂 Kategorien entdecken",
      subtitle: "Finde genau die Inhalte, die dich interessieren",
      categories: [
        {
          id: 'all',
          name: 'Alle Artikel',
          icon: GameIcon,
          count: 45,
          color: 'blue',
          description: 'Alle Artikel im Überblick'
        },
        {
          id: 'drinking-games',
          name: 'Trinkspiele',
          icon: BombIcon,
          count: 18,
          color: 'orange',
          description: 'Klassische und moderne Trinkspiele'
        },
        {
          id: 'party-planning',
          name: 'Partyplanung',
          icon: UsersIcon,
          count: 12,
          color: 'green',
          description: 'Tipps für die perfekte Party'
        },
        {
          id: 'game-reviews',
          name: 'Spiele-Tests',
          icon: TrophyIcon,
          count: 8,
          color: 'yellow',
          description: 'Detaillierte Spiele-Bewertungen'
        },
        {
          id: 'tutorials',
          name: 'Anleitungen',
          icon: ShareIcon,
          count: 7,
          color: 'purple',
          description: 'Schritt-für-Schritt Guides'
        }
      ]
    },
    en: {
      title: "📂 Explore Categories",
      subtitle: "Find exactly the content that interests you",
      categories: [
        {
          id: 'all',
          name: 'All Articles',
          icon: GameIcon,
          count: 45,
          color: 'blue',
          description: 'All articles overview'
        },
        {
          id: 'drinking-games',
          name: 'Drinking Games',
          icon: BombIcon,
          count: 18,
          color: 'orange',
          description: 'Classic and modern drinking games'
        },
        {
          id: 'party-planning',
          name: 'Party Planning',
          icon: UsersIcon,
          count: 12,
          color: 'green',
          description: 'Tips for the perfect party'
        },
        {
          id: 'game-reviews',
          name: 'Game Reviews',
          icon: TrophyIcon,
          count: 8,
          color: 'yellow',
          description: 'Detailed game evaluations'
        },
        {
          id: 'tutorials',
          name: 'Tutorials',
          icon: ShareIcon,
          count: 7,
          color: 'purple',
          description: 'Step-by-step guides'
        }
      ]
    }
  };

  const currentContent = content[locale];

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      blue: isActive ? 'border-blue-400 bg-blue-500/20 text-blue-300' : 'border-blue-400/30 hover:border-blue-400/60 text-blue-400',
      orange: isActive ? 'border-orange-400 bg-orange-500/20 text-orange-300' : 'border-orange-400/30 hover:border-orange-400/60 text-orange-400',
      green: isActive ? 'border-green-400 bg-green-500/20 text-green-300' : 'border-green-400/30 hover:border-green-400/60 text-green-400',
      yellow: isActive ? 'border-yellow-400 bg-yellow-500/20 text-yellow-300' : 'border-yellow-400/30 hover:border-yellow-400/60 text-yellow-400',
      purple: isActive ? 'border-purple-400 bg-purple-500/20 text-purple-300' : 'border-purple-400/30 hover:border-purple-400/60 text-purple-400',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-16 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 blur-3xl"></div>
      
      <div className="relative mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 gradient-text text-shadow-glow animate-float-gentle mb-4">
            {currentContent.title}
          </h2>
          <p className="body-lg text-white/80">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {currentContent.categories.map((category, index) => {
            const IconComponent = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  relative p-6 rounded-2xl border-2 transition-all duration-300 text-center group
                  hover:scale-105 hover:shadow-xl cursor-pointer animate-float-gentle
                  ${getColorClasses(category.color, isActive)}
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <IconComponent 
                    size={32} 
                    className={`transition-all duration-300 ${
                      isActive ? 'animate-glow-pulse' : 'group-hover:animate-glow-pulse'
                    }`} 
                  />
                </div>
                
                {/* Category Name */}
                <h3 className="heading-6 mb-2">{category.name}</h3>
                
                {/* Article Count */}
                <div className="label-base mb-3">
                  {category.count} {locale === 'de' ? 'Artikel' : 'Articles'}
                </div>
                
                {/* Description */}
                <p className="body-xs text-white/60 leading-tight">
                  {category.description}
                </p>
                
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black text-xs font-bold">✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Category Description */}
        {activeCategory !== 'all' && (
          <div className="mt-8 text-center animate-fade-in">
            <div className="card-elevated inline-block p-6">
              <p className="body-base text-white/90">
                {locale === 'de' 
                  ? `Zeige alle Artikel in der Kategorie "${currentContent.categories.find(c => c.id === activeCategory)?.name}"`
                  : `Showing all articles in category "${currentContent.categories.find(c => c.id === activeCategory)?.name}"`
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
