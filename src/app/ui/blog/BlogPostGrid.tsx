'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BombIcon, TrophyIcon, UsersIcon } from '../EnhancedIcons';

interface BlogPostGridProps {
  locale: 'de' | 'en';
}

export function BlogPostGrid({ locale }: BlogPostGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const content = {
    de: {
      title: "📰 Neueste Artikel",
      subtitle: "Bleib auf dem Laufenden mit den aktuellsten Trends und Tipps",
      featuredBadge: "⭐ Featured",
      readMore: "Weiterlesen",
      loadMore: "Mehr laden",
      noMore: "Alle Artikel geladen",
      byAuthor: "von",
      minRead: "Min. Lesezeit",
      posts: [
        {
          id: '1',
          title: 'Die 10 besten Online-Trinkspiele für 2024',
          excerpt: 'Entdecke die heißesten Trinkspiele des Jahres! Von klassischen Hits bis zu innovativen Online-Erlebnissen - hier findest du alles für unvergessliche Partynächte.',
          author: 'Max Partyprofi',
          date: '15. Dez 2024',
          readTime: '8',
          category: 'Trinkspiele',
          image: '/blog/online-trinkspiele-2024.jpg',
          featured: true,
          tags: ['Online', 'Top 10', 'Trends']
        },
        {
          id: '2', 
          title: 'Bomb Party: Vom Brettspiel zur App-Revolution',
          excerpt: 'Die faszinierende Geschichte von Bomb Party: Wie ein einfaches Wortspiel zum Multiplayer-Hit wurde. Exklusive Einblicke in die Entwicklung und Zukunftspläne.',
          author: 'Lisa Gamerin',
          date: '12. Dez 2024',
          readTime: '12',
          category: 'Spiele-Tests',
          image: '/blog/bomb-party-geschichte.jpg',
          featured: true,
          tags: ['Bomb Party', 'Geschichte', 'Behind the Scenes']
        },
        {
          id: '3',
          title: 'Partyplanung 101: Der ultimative Guide',
          excerpt: 'Von der Gästeliste bis zur Musik: Alle Geheimnisse für die perfekte Party. Praktische Checklisten und Insider-Tipps von Profi-Event-Managern.',
          author: 'Tom Eventprofi',
          date: '10. Dez 2024',
          readTime: '15',
          category: 'Partyplanung',
          image: '/blog/partyplanung-guide.jpg',
          featured: false,
          tags: ['Planung', 'Checkliste', 'Profi-Tipps']
        },
        {
          id: '4',
          title: 'Trinkspiele ohne Alkohol: Spaß für alle',
          excerpt: 'Auch ohne Alkohol kann gefeiert werden! Die besten alkoholfreien Alternativen zu klassischen Trinkspielen - genauso lustig, aber für jeden geeignet.',
          author: 'Sarah Healthyfun',
          date: '8. Dez 2024',
          readTime: '6',
          category: 'Trinkspiele',
          image: '/blog/alkoholfrei-feiern.jpg',
          featured: false,
          tags: ['Alkoholfrei', 'Inklusive', 'Gesund']
        },
        {
          id: '5',
          title: 'Multiplayer-Gaming: Die Technik dahinter',
          excerpt: 'Wie funktioniert eigentlich Online-Multiplayer? Ein tiefer Einblick in WebRTC, P2P-Verbindungen und die Technik hinter nahtlosen Spielerlebnissen.',
          author: 'Dr. Tech Nerd',
          date: '5. Dez 2024',
          readTime: '20',
          category: 'Anleitungen',
          image: '/blog/multiplayer-technik.jpg',
          featured: false,
          tags: ['Technik', 'WebRTC', 'Multiplayer']
        },
        {
          id: '6',
          title: 'Die 5 häufigsten Party-Fails und wie du sie vermeidest',
          excerpt: 'Lerne aus den Fehlern anderer! Diese typischen Party-Pannen können dir die ganze Nacht ruinieren - aber nur wenn du nicht vorbereitet bist.',
          author: 'Felix Partyexperte',
          date: '3. Dez 2024',
          readTime: '10',
          category: 'Partyplanung',
          image: '/blog/party-fails.jpg',
          featured: false,
          tags: ['Fails', 'Vermeiden', 'Planung']
        }
      ]
    },
    en: {
      title: "📰 Latest Articles",
      subtitle: "Stay updated with the latest trends and tips",
      featuredBadge: "⭐ Featured",
      readMore: "Read More",
      loadMore: "Load More",
      noMore: "All articles loaded",
      byAuthor: "by",
      minRead: "min read",
      posts: [
        {
          id: '1',
          title: 'The 10 Best Online Drinking Games for 2024',
          excerpt: 'Discover the hottest drinking games of the year! From classic hits to innovative online experiences - here you\'ll find everything for unforgettable party nights.',
          author: 'Max Partyprofi',
          date: 'Dec 15, 2024',
          readTime: '8',
          category: 'Drinking Games',
          image: '/blog/online-drinking-games-2024.jpg',
          featured: true,
          tags: ['Online', 'Top 10', 'Trends']
        },
        {
          id: '2',
          title: 'Bomb Party: From Board Game to App Revolution',
          excerpt: 'The fascinating history of Bomb Party: How a simple word game became a multiplayer hit. Exclusive insights into development and future plans.',
          author: 'Lisa Gamer',
          date: 'Dec 12, 2024',
          readTime: '12',
          category: 'Game Reviews',
          image: '/blog/bomb-party-history.jpg',
          featured: true,
          tags: ['Bomb Party', 'History', 'Behind the Scenes']
        },
        {
          id: '3',
          title: 'Party Planning 101: The Ultimate Guide',
          excerpt: 'From guest lists to music: All secrets for the perfect party. Practical checklists and insider tips from professional event managers.',
          author: 'Tom Eventpro',
          date: 'Dec 10, 2024',
          readTime: '15',
          category: 'Party Planning',
          image: '/blog/party-planning-guide.jpg',
          featured: false,
          tags: ['Planning', 'Checklist', 'Pro Tips']
        },
        {
          id: '4',
          title: 'Drinking Games Without Alcohol: Fun for Everyone',
          excerpt: 'You can party without alcohol too! The best non-alcoholic alternatives to classic drinking games - just as fun, but suitable for everyone.',
          author: 'Sarah Healthyfun',
          date: 'Dec 8, 2024',
          readTime: '6',
          category: 'Drinking Games',
          image: '/blog/alcohol-free-party.jpg',
          featured: false,
          tags: ['Alcohol-free', 'Inclusive', 'Healthy']
        },
        {
          id: '5',
          title: 'Multiplayer Gaming: The Technology Behind It',
          excerpt: 'How does online multiplayer actually work? A deep dive into WebRTC, P2P connections and the technology behind seamless gaming experiences.',
          author: 'Dr. Tech Nerd',
          date: 'Dec 5, 2024',
          readTime: '20',
          category: 'Tutorials',
          image: '/blog/multiplayer-tech.jpg',
          featured: false,
          tags: ['Technology', 'WebRTC', 'Multiplayer']
        },
        {
          id: '6',
          title: 'The 5 Most Common Party Fails and How to Avoid Them',
          excerpt: 'Learn from others\' mistakes! These typical party disasters can ruin your whole night - but only if you\'re not prepared.',
          author: 'Felix Partyexpert',
          date: 'Dec 3, 2024',
          readTime: '10',
          category: 'Party Planning',
          image: '/blog/party-fails.jpg',
          featured: false,
          tags: ['Fails', 'Avoid', 'Planning']
        }
      ]
    }
  };

  const currentContent = content[locale];
  const totalPages = Math.ceil(currentContent.posts.length / postsPerPage);

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('spiel') || category.toLowerCase().includes('game')) {
      return BombIcon;
    }
    if (category.toLowerCase().includes('party')) {
      return UsersIcon;
    }
    return TrophyIcon;
  };

  const getCategoryColor = (category: string) => {
    if (category.toLowerCase().includes('spiel') || category.toLowerCase().includes('game')) {
      return 'text-orange-400';
    }
    if (category.toLowerCase().includes('party')) {
      return 'text-green-400';
    }
    return 'text-yellow-400';
  };

  return (
    <section className="py-16 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 to-slate-900/20 blur-3xl"></div>
      
      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-2 gradient-text text-shadow-glow animate-float-gentle mb-4">
            {currentContent.title}
          </h2>
          <p className="body-lg text-white/80">
            {currentContent.subtitle}
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
          </div>
        </div>

        {/* Featured Posts (First 2) */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {currentContent.posts.filter(post => post.featured).slice(0, 2).map((post, index) => {
            const CategoryIcon = getCategoryIcon(post.category);
            
            return (
              <article 
                key={post.id}
                style={{ "--animation-delay": `${index * 0.2}s` } as React.CSSProperties}
                className="card-elevated overflow-hidden hover:scale-105 transition-all duration-300 animate-float-gentle anim-delay-dynamic"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 to-blue-500/50"></div>
                  <div className="absolute top-4 left-4 z-10">
                    <span className="label-base bg-yellow-500/90 text-black px-3 py-1 rounded-full">
                      {currentContent.featuredBadge}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BombIcon size={80} className="text-white/20" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  <div className="flex items-center gap-2 mb-3">
                    <CategoryIcon size={16} className={getCategoryColor(post.category)} />
                    <span className={`label-base ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="heading-5 text-white mb-3 hover:text-yellow-300 transition-colors">
                    <Link href={`/${locale}/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="body-sm text-white/80 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {/* Meta */}
                  <div className="flex items-center justify-between text-white/60 mb-4">
                    <span className="body-xs">
                      {currentContent.byAuthor} {post.author}
                    </span>
                    <div className="flex items-center gap-4 body-xs">
                      <span>{post.date}</span>
                      <span>{post.readTime} {currentContent.minRead}</span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="label-base bg-white/10 text-white/70 px-2 py-1 rounded-lg"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Read More */}
                  <Link 
                    href={`/${locale}/blog/${post.id}`}
                    className="btn-primary px-4 py-2 text-sm inline-flex items-center gap-2"
                  >
                    {currentContent.readMore} →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentContent.posts.filter(post => !post.featured).slice(0, currentPage * postsPerPage - 2).map((post, index) => {
            const CategoryIcon = getCategoryIcon(post.category);
            
            return (
              <article 
                key={post.id}
                style={{ "--animation-delay": `${(index + 2) * 0.1}s` } as React.CSSProperties}
                className="card-elevated overflow-hidden hover:scale-105 transition-all duration-300 animate-float-gentle anim-delay-dynamic"
              >
                {/* Image */}
                <div className="relative h-32 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-600/50 to-gray-800/50"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CategoryIcon size={40} className="text-white/20" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  {/* Category */}
                  <div className="flex items-center gap-2 mb-2">
                    <CategoryIcon size={14} className={getCategoryColor(post.category)} />
                    <span className={`label-base ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="heading-6 text-white mb-2 hover:text-yellow-300 transition-colors">
                    <Link href={`/${locale}/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="body-xs text-white/80 mb-3 leading-relaxed line-clamp-3">
                    {post.excerpt.substring(0, 120)}...
                  </p>
                  
                  {/* Meta */}
                  <div className="flex items-center justify-between text-white/60 mb-3">
                    <span className="body-xs">{post.author}</span>
                    <span className="body-xs">{post.readTime} {currentContent.minRead}</span>
                  </div>
                  
                  {/* Read More */}
                  <Link 
                    href={`/${locale}/blog/${post.id}`}
                    className="btn-ghost px-3 py-1 text-xs inline-flex items-center gap-1"
                  >
                    {currentContent.readMore} →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Load More */}
        {currentPage < totalPages && (
          <div className="text-center">
            <button 
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="btn-secondary px-8 py-4 animate-glow-pulse"
            >
              📚 {currentContent.loadMore}
            </button>
          </div>
        )}
        
        {currentPage >= totalPages && currentContent.posts.length > 6 && (
          <div className="text-center">
            <div className="card-elevated inline-block p-6">
              <p className="body-base text-white/80">
                🎉 {currentContent.noMore}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
