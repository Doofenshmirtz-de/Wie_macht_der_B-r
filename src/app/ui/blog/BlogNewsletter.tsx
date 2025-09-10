'use client';

import { useState } from 'react';
import { SearchIcon, ShareIcon } from '../EnhancedIcons';

interface BlogNewsletterProps {
  locale: 'de' | 'en';
}

export function BlogNewsletter({ locale }: BlogNewsletterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    de: {
      title: "📧 Bleib auf dem Laufenden!",
      subtitle: "Verpasse keine neuen Artikel, Spiele-Updates und exklusiven Tipps",
      emailPlaceholder: "Deine E-Mail-Adresse",
      subscribeButton: "Jetzt abonnieren",
      subscribingButton: "Abonniere...",
      successTitle: "🎉 Erfolgreich abonniert!",
      successMessage: "Vielen Dank! Du erhältst bald eine Bestätigungs-E-Mail.",
      benefits: [
        "🎯 Wöchentliche Spiele-Empfehlungen",
        "🔥 Exklusive Inhalte und Previews", 
        "🎉 Einladungen zu Online-Events",
        "💡 Profi-Tipps von Experten",
        "📱 Neue Features als Erster testen"
      ],
      privacy: "Wir respektieren deine Privatsphäre. Keine Spam-Mails, jederzeit abbestellbar.",
      stats: {
        subscribers: "5.000+ Abonnenten",
        articles: "2x pro Woche neue Artikel",
        rating: "4.9/5 Sterne Bewertung"
      }
    },
    en: {
      title: "📧 Stay Updated!",
      subtitle: "Don't miss new articles, game updates and exclusive tips",
      emailPlaceholder: "Your email address",
      subscribeButton: "Subscribe Now",
      subscribingButton: "Subscribing...",
      successTitle: "🎉 Successfully Subscribed!",
      successMessage: "Thank you! You'll receive a confirmation email soon.",
      benefits: [
        "🎯 Weekly game recommendations",
        "🔥 Exclusive content and previews",
        "🎉 Invitations to online events",
        "💡 Pro tips from experts",
        "📱 Test new features first"
      ],
      privacy: "We respect your privacy. No spam emails, unsubscribe anytime.",
      stats: {
        subscribers: "5,000+ Subscribers",
        articles: "2x new articles per week",
        rating: "4.9/5 stars rating"
      }
    }
  };

  const currentContent = content[locale];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  if (isSubscribed) {
    return (
      <section className="py-16 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-blue-900/30 blur-3xl"></div>
        
        <div className="relative mx-auto max-w-2xl px-4 text-center">
          <div className="card-elevated p-12 animate-scale-in">
            <div className="text-6xl mb-6 animate-bounce">🎉</div>
            <h2 className="heading-2 gradient-text mb-4">
              {currentContent.successTitle}
            </h2>
            <p className="body-lg text-white/80 mb-8">
              {currentContent.successMessage}
            </p>
            <button 
              onClick={() => setIsSubscribed(false)}
              className="btn-ghost px-6 py-3"
            >
              ← Zurück zum Blog
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30 blur-3xl"></div>
      
      <div className="relative mx-auto max-w-4xl px-4">
        <div className="card-elevated p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Content */}
            <div>
              <h2 className="heading-2 gradient-text text-shadow-glow mb-4">
                {currentContent.title}
              </h2>
              <p className="body-lg text-white/80 mb-8">
                {currentContent.subtitle}
              </p>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                {currentContent.benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-lg">{benefit.split(' ')[0]}</span>
                    <span className="body-sm text-white/90">
                      {benefit.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                {Object.entries(currentContent.stats).map(([key, value], index) => (
                  <div 
                    key={key}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 animate-float-gentle"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="body-sm text-white/70 mb-1">
                      {key === 'subscribers' ? '👥' : key === 'articles' ? '📰' : '⭐'}
                    </div>
                    <div className="heading-6 text-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Form */}
            <div>
              <form onSubmit={handleSubscribe} className="space-y-6">
                
                {/* Email Input */}
                <div className="relative">
                  <div className="flex items-center gap-4 card-elevated p-4">
                    <SearchIcon size={24} className="text-purple-400 animate-glow-pulse" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={currentContent.emailPlaceholder}
                      className="flex-1 bg-transparent text-white placeholder-white/60 body-base border-none outline-none"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Subscribe Button */}
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className={`
                    w-full btn-primary px-8 py-4 text-center transition-all duration-300
                    ${isLoading ? 'animate-pulse' : 'animate-glow-pulse'}
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {currentContent.subscribingButton}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <ShareIcon size={20} />
                      {currentContent.subscribeButton}
                    </div>
                  )}
                </button>

                {/* Privacy Notice */}
                <p className="body-xs text-white/60 text-center leading-relaxed">
                  🔒 {currentContent.privacy}
                </p>
              </form>

              {/* Social Proof */}
              <div className="mt-8 p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-xl border border-yellow-500/20">
                <div className="flex items-center justify-center gap-2 text-yellow-300 mb-2">
                  <span className="text-2xl">⭐</span>
                  <span className="heading-6">Vertraut von tausenden Gamern</span>
                </div>
                <p className="body-xs text-yellow-200 text-center">
                  Schließe dich der größten deutschen Trinkspiele-Community an!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
