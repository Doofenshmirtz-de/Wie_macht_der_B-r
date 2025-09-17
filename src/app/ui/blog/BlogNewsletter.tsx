'use client';

import React, { useState } from 'react';
import { GameIcon, FireIcon, PartyIcon, SparkleIcon, RocketIcon, StarIcon, UsersIcon, HeartIcon, TrophyIcon, SearchIcon } from '../EnhancedIcons';

// Abstract Symlys for Newsletter
const NewsletterSymly = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
    <path d="M12 1v6M12 17v6M1 12h6M17 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ArticleSymly = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CommunitySymly = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="15" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M13 7a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const QualitySymly = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,22 12,18.77 5.82,22 7,14.14 2,9.27 8.91,8.26" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

const MailSymly = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="m22 7-10 5L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function BlogNewsletter({ locale }: { locale: 'de' | 'en' }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const content = locale === 'en' ? {
    title: 'Stay Updated!',
    subtitle: "Don't miss new articles, game updates and exclusive tips",
    benefits: [
      { icon: NewsletterSymly, text: 'Weekly game recommendations' },
      { icon: ArticleSymly, text: 'Exclusive content and previews' },
      { icon: CommunitySymly, text: 'Invitations to online events' },
      { icon: QualitySymly, text: 'Pro tips from experts' },
      { icon: NewsletterSymly, text: 'Test new features first' }
    ],
    stats: [
      { icon: CommunitySymly, text: '5,000+ Subscribers' },
      { icon: ArticleSymly, text: '2x new articles per week' },
      { icon: QualitySymly, text: '4.9/5 stars rating' }
    ],
    emailPlaceholder: 'Your email address',
    subscribeButton: 'Subscribe Now',
    privacyText: 'We respect your privacy. No spam emails, unsubscribe anytime.',
    trustTitle: 'Trusted by thousands of gamers',
    trustSubtitle: 'Join the biggest German party games community!',
    successMessage: 'Successfully subscribed! Welcome to our community!'
  } : {
    title: 'Bleib auf dem Laufenden!',
    subtitle: 'Verpasse keine neuen Artikel, Spiel-Updates und exklusive Tipps',
    benefits: [
      { icon: NewsletterSymly, text: 'Wöchentliche Spielempfehlungen' },
      { icon: ArticleSymly, text: 'Exklusive Inhalte und Vorschauen' },
      { icon: CommunitySymly, text: 'Einladungen zu Online-Events' },
      { icon: QualitySymly, text: 'Pro-Tipps von Experten' },
      { icon: NewsletterSymly, text: 'Neue Features zuerst testen' }
    ],
    stats: [
      { icon: CommunitySymly, text: '5.000+ Abonnenten' },
      { icon: ArticleSymly, text: '2x neue Artikel pro Woche' },
      { icon: QualitySymly, text: '4,9/5 Sterne Bewertung' }
    ],
    emailPlaceholder: 'Deine E-Mail-Adresse',
    subscribeButton: 'Jetzt abonnieren',
    privacyText: 'Wir respektieren deine Privatsphäre. Keine Spam-E-Mails, jederzeit abbestellbar.',
    trustTitle: 'Vertraut von tausenden Gamern',
    trustSubtitle: 'Schließe dich der größten deutschen Partyspiele-Community an!',
    successMessage: 'Erfolgreich abonniert! Willkommen in unserer Community!'
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-blue-900/20 blur-3xl"></div>
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="card-elevated p-12 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="heading-2 text-white mb-4">{content.successMessage}</h3>
            <p className="body-lg text-white/80">Du erhältst bald deine erste E-Mail von uns!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 blur-3xl"></div>
      
      
      <div className="relative mx-auto max-w-6xl px-4">
        {/* Main Newsletter Card */}
        <div className="card-elevated p-8 lg:p-12 relative overflow-hidden">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center relative">
            
            {/* Left Column - Benefits */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full blur-md"></div>
                  <div className="relative h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <MailSymly size={24} className="text-white" />
                  </div>
                </div>
                <h2 className="heading-2 text-white">{content.title}</h2>
              </div>
              
              <p className="body-lg text-white/90 mb-8 leading-relaxed">
                {content.subtitle}
              </p>
              
              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                {content.benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 group">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                        <IconComponent size={20} className="text-white" />
                      </div>
                      <span className="body-base text-white/90">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {content.stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="panel-bg p-4 text-center rounded-xl border border-white/10 backdrop-blur-sm">
                      <IconComponent size={24} className="text-blue-400 mx-auto mb-2" />
                      <p className="body-sm text-white font-semibold">{stat.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Right Column - Subscription Form */}
            <div>
              <div className="panel-bg p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <form onSubmit={handleSubscribe} className="space-y-6">
                  {/* Email Input */}
                  <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <NewsletterSymly size={20} className="text-white/50" />
                  </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={content.emailPlaceholder}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors backdrop-blur-sm"
                      required
                    />
                  </div>
                  
                  {/* Subscribe Button */}
                  <button
                    type="submit"
                    className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <NewsletterSymly size={20} />
                    {content.subscribeButton}
                  </button>
                  
                  {/* Privacy Notice */}
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <QualitySymly size={16} />
                    <span>{content.privacyText}</span>
                  </div>
                </form>
                
                {/* Trust Section */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <QualitySymly size={20} className="text-blue-400" />
                    <h4 className="heading-6 text-white">{content.trustTitle}</h4>
                  </div>
                  <p className="body-sm text-white/80">{content.trustSubtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
