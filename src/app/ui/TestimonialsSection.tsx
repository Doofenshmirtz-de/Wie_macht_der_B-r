'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  game: string;
  verified: boolean;
  date: string;
}

const getTestimonials = (locale: string): Testimonial[] => [
  {
    id: '1',
    name: 'Max_Party_King',
    avatar: '🤴',
    rating: 5,
    text: locale === 'en' 
      ? 'Bomb Party is absolutely amazing! We played for 6 hours straight yesterday. The multiplayer function works perfectly!'
      : 'Bomb Party ist der absolute Hammer! Haben gestern 6 Stunden durchgespielt. Die Multiplayer-Funktion funktioniert perfekt!',
    game: 'Bomb Party',
    verified: true,
    date: '2024-12-07'
  },
  {
    id: '2', 
    name: 'Sarah_Gaming',
    avatar: '👸',
    rating: 5,
    text: locale === 'en'
      ? 'Finally a party game that\'s really fun online too! Perfect for our shared apartment parties. Thanks!'
      : 'Endlich ein Trinkspiel, das auch online richtig Spaß macht! Perfekt für unsere WG-Partys. Danke!',
    game: locale === 'en' ? 'Never Have I Ever' : 'Ich hab noch nie',
    verified: true,
    date: '2024-12-06'
  },
  {
    id: '3',
    name: 'TechNerd_42',
    avatar: '🤓',
    rating: 5,
    text: locale === 'en'
      ? 'Technically super well implemented! PWA runs smoothly, design is awesome. As a developer: respect for the quality!'
      : 'Technisch super umgesetzt! PWA läuft flüssig, Design ist mega. Als Entwickler: Respekt für die Qualität!',
    game: 'Bomb Party',
    verified: false,
    date: '2024-12-05'
  },
  {
    id: '4',
    name: 'Party_Lisa',
    avatar: '🥳',
    rating: 4,
    text: locale === 'en'
      ? 'Truth or Dare was always our favorite game, but this version is even cooler! Awesome challenges!'
      : 'Wahrheit oder Pflicht war schon immer unser Lieblingsspiel, aber diese Version ist nochmal geiler! Mega Aufgaben!',
    game: locale === 'en' ? 'Truth or Dare' : 'Wahrheit oder Pflicht',
    verified: true,
    date: '2024-12-04'
  },
  {
    id: '5',
    name: 'Bier_Liebhaber',
    avatar: '🍺',
    rating: 5,
    text: locale === 'en'
      ? 'As an old party game veteran I can say: This is the future! Never boring parties again. 10/10!'
      : 'Als alter Saufspiel-Hase kann ich sagen: Das ist die Zukunft! Nie wieder langweilige Partys. 10/10!',
    game: 'Bomb Party',
    verified: true,
    date: '2024-12-03'
  },
  {
    id: '6',
    name: 'StudentLife_HD',
    avatar: '🎓',
    rating: 5,
    text: locale === 'en'
      ? 'Student shared apartment approved! Runs on all phones, costs nothing, is fun. There\'s no better combination.'
      : 'Studenten-WG approved! Läuft auf allen Handys, kostet nix, macht Bock. Bessere Kombi gibt es nicht.',
    game: locale === 'en' ? 'Never Have I Ever' : 'Ich hab noch nie',
    verified: true,
    date: '2024-12-02'
  }
];

export function TestimonialsSection() {
  const [currentTestimonials, setCurrentTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const params = useParams();
  const locale = (params as { locale?: string })?.locale === 'en' ? 'en' : 'de';
  
  // Memoize testimonials to prevent recreation on every render
  const TESTIMONIALS = useMemo(() => getTestimonials(locale), [locale]);

  useEffect(() => {
    // Zeige initial 3 Testimonials
    setCurrentTestimonials(TESTIMONIALS.slice(0, 3));
  }, [TESTIMONIALS]);

  useEffect(() => {
    // Auto-rotation alle 8 Sekunden
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % (TESTIMONIALS.length - 2);
        setCurrentTestimonials(TESTIMONIALS.slice(next, next + 3));
        return next;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [TESTIMONIALS]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'de-DE', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <section className="relative py-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-900/20 to-purple-900/20 blur-3xl"></div>
      
      <div className="relative mx-auto max-w-screen-lg px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg mb-4">
            💬 COMMUNITY LOVE
          </h2>
          <p className="text-white/80 text-lg">
            {locale === 'en' ? 'What real players say about our party games' : 'Das sagen echte Spieler über unsere Partyspiele'}
          </p>
          
          {/* Rating Summary */}
          <div className="mt-6 flex justify-center items-center gap-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">⭐</span>
              ))}
            </div>
            <span className="text-white font-bold text-lg">4.8/5.0</span>
            <span className="text-white/60">({locale === 'en' ? '2,134 reviews' : '2,134 Bewertungen'})</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentTestimonials.map((testimonial, index) => (
            <div 
              key={`${testimonial.id}-${currentIndex}`}
              className="cr-card p-6 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{testimonial.avatar}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm">
                        {testimonial.name}
                      </h4>
                      {testimonial.verified && (
                        <span className="text-green-400 text-xs" title={locale === 'en' ? 'Verified user' : 'Verifizierter Nutzer'}>
                          ✓
                        </span>
                      )}
                    </div>
                    <p className="text-white/60 text-xs">
                      {formatDate(testimonial.date)}
                    </p>
                  </div>
                </div>
                
                {/* Game Tag */}
                <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs font-semibold">
                  {testimonial.game}
                </span>
              </div>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`text-sm ${i < testimonial.rating ? 'text-yellow-400' : 'text-white/30'}`}
                  >
                    ⭐
                  </span>
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-white/90 text-sm leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {TESTIMONIALS.slice(0, -2).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i);
                setCurrentTestimonials(TESTIMONIALS.slice(i, i + 3));
              }}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                i === currentIndex ? 'bg-yellow-400' : 'bg-white/30'
              }`}
              aria-label={locale === 'en' ? `Show testimonial group ${i + 1}` : `Testimonial-Gruppe ${i + 1} anzeigen`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="cr-card inline-block p-6">
            <h3 className="text-xl font-bold text-yellow-300 mb-2">
              🌟 {locale === 'en' ? 'Share your experience!' : 'Teile deine Erfahrung!'}
            </h3>
            <p className="text-white/80 text-sm mb-4">
              {locale === 'en' ? 'Did you also have fun with our games? Tell the world!' : 'Hast du auch Spaß mit unseren Spielen? Erzähl es der Welt!'}
            </p>
            <div className="flex justify-center gap-2">
              <button className="cr-button-primary px-4 py-2 text-sm">
                📝 {locale === 'en' ? 'Write review' : 'Bewertung schreiben'}
              </button>
              <button className="cr-button-primary px-4 py-2 text-sm">
                📱 {locale === 'en' ? 'Share' : 'Teilen'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
