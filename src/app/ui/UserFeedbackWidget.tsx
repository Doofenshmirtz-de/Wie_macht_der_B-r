'use client';

import { useState, useEffect } from 'react';
import { useAnalytics } from '../lib/analytics-tracking';

interface FeedbackData {
  type: 'rating' | 'bug' | 'feature' | 'general';
  rating?: number;
  message: string;
  email?: string;
  page: string;
  userAgent: string;
  timestamp: string;
}

interface UserFeedbackWidgetProps {
  trigger?: 'manual' | 'exit-intent' | 'post-game' | 'error';
  gameType?: string;
  className?: string;
}

export function UserFeedbackWidget({ 
  trigger = 'manual',
  gameType,
  className = '' 
}: UserFeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'trigger' | 'type' | 'details' | 'submitted'>('trigger');
  const [feedbackType, setFeedbackType] = useState<FeedbackData['type'] | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const analytics = useAnalytics();

  // Auto-trigger based on conditions
  useEffect(() => {
    if (trigger === 'exit-intent') {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setIsOpen(true);
          analytics.track({
            event: 'feedback_trigger',
            category: 'conversion',
            action: 'exit_intent_feedback',
            label: 'exit_intent'
          });
        }
      };
      
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [trigger, analytics]);

  const feedbackTypes = [
    {
      type: 'rating' as const,
      icon: '⭐',
      title: 'Bewertung abgeben',
      description: 'Wie gefällt dir unser Spiel?'
    },
    {
      type: 'bug' as const,
      icon: '🐛',
      title: 'Bug melden',
      description: 'Etwas funktioniert nicht richtig?'
    },
    {
      type: 'feature' as const,
      icon: '💡',
      title: 'Feature vorschlagen',
      description: 'Hast du eine Idee für uns?'
    },
    {
      type: 'general' as const,
      icon: '💬',
      title: 'Allgemeine Rückmeldung',
      description: 'Teile deine Gedanken mit uns'
    }
  ];

  const handleSubmit = async () => {
    if (!feedbackType || (!rating && feedbackType === 'rating') || !message.trim()) {
      return;
    }

    setIsSubmitting(true);

    const feedbackData: FeedbackData = {
      type: feedbackType,
      rating: feedbackType === 'rating' ? rating : undefined,
      message: message.trim(),
      email: email.trim() || undefined,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    try {
      // Track feedback submission
      analytics.track({
        event: 'feedback_submitted',
        category: 'conversion',
        action: 'submit_feedback',
        label: feedbackType,
        value: rating,
        metadata: {
          gameType: gameType || 'general',
          messageLength: message.length,
          hasEmail: !!email,
        }
      });

      // Send to feedback API (mock for now)
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData)
      }).catch(() => {
        // Store locally if API fails
        const stored = JSON.parse(localStorage.getItem('pending_feedback') || '[]');
        stored.push(feedbackData);
        localStorage.setItem('pending_feedback', JSON.stringify(stored));
      });

      setStep('submitted');
      
      // Auto-close after success
      setTimeout(() => {
        setIsOpen(false);
        resetForm();
      }, 3000);

    } catch (error) {
      console.error('Failed to submit feedback:', error);
      // Show error state but don't block user
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep('trigger');
    setFeedbackType(null);
    setRating(0);
    setMessage('');
    setEmail('');
  };

  const renderStars = () => {
    return (
      <div className="flex gap-1 justify-center my-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-3xl transition-transform duration-200 hover:scale-110 ${
              star <= rating ? 'text-yellow-400' : 'text-white/30'
            }`}
          >
            ⭐
          </button>
        ))}
      </div>
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`
          fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-orange-500 to-purple-600 
          rounded-full flex items-center justify-center text-white text-xl shadow-lg 
          hover:scale-110 transition-all duration-300 border-2 border-white/20
          ${className}
        `}
        aria-label="Feedback geben"
      >
        💬
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-white/20 p-6 max-w-md w-full shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="heading-4 text-white">
            {step === 'trigger' && '💬 Feedback'}
            {step === 'type' && '📝 Feedback-Art'}
            {step === 'details' && '✍️ Details'}
            {step === 'submitted' && '✅ Danke!'}
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* Step: Trigger */}
        {step === 'trigger' && (
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <p className="text-white/80 mb-6">
              Deine Meinung ist uns wichtig! Wie können wir &quot;Wie macht der Bär&quot; verbessern?
            </p>
            <button
              onClick={() => setStep('type')}
              className="btn-primary w-full"
            >
              Feedback geben
            </button>
          </div>
        )}

        {/* Step: Type Selection */}
        {step === 'type' && (
          <div className="space-y-3">
            {feedbackTypes.map((type) => (
              <button
                key={type.type}
                onClick={() => {
                  setFeedbackType(type.type);
                  setStep('details');
                }}
                className="w-full p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{type.icon}</span>
                  <div>
                    <div className="text-white font-medium">{type.title}</div>
                    <div className="text-white/60 text-sm">{type.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step: Details */}
        {step === 'details' && feedbackType && (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-2xl">
                {feedbackTypes.find(t => t.type === feedbackType)?.icon}
              </span>
              <h4 className="text-white font-medium mt-2">
                {feedbackTypes.find(t => t.type === feedbackType)?.title}
              </h4>
            </div>

            {/* Rating for rating type */}
            {feedbackType === 'rating' && (
              <div>
                <label className="block text-white/80 mb-2 text-center">
                  Wie bewertest du deine Erfahrung?
                </label>
                {renderStars()}
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-white/80 mb-2">
                {feedbackType === 'bug' && 'Beschreibe das Problem:'}
                {feedbackType === 'feature' && 'Beschreibe deine Idee:'}
                {feedbackType === 'rating' && 'Optionaler Kommentar:'}
                {feedbackType === 'general' && 'Deine Nachricht:'}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  feedbackType === 'bug' 
                    ? 'Was ist passiert? Welche Schritte hast du gemacht?'
                    : feedbackType === 'feature'
                    ? 'Welche neue Funktion würdest du dir wünschen?'
                    : 'Teile deine Gedanken mit uns...'
                }
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-orange-400/50 resize-none"
                rows={4}
                required
              />
            </div>

            {/* Optional Email */}
            <div>
              <label className="block text-white/80 mb-2">
                E-Mail (optional - für Rückfragen):
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.de"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-orange-400/50"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep('type')}
                className="btn-secondary flex-1"
                disabled={isSubmitting}
              >
                Zurück
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || (!rating && feedbackType === 'rating') || !message.trim()}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sende...' : 'Absenden'}
              </button>
            </div>
          </div>
        )}

        {/* Step: Submitted */}
        {step === 'submitted' && (
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h4 className="text-white font-bold mb-2">Vielen Dank!</h4>
            <p className="text-white/80 mb-4">
              Dein Feedback hilft uns dabei, &quot;Wie macht der Bär&quot; noch besser zu machen.
            </p>
            {email && (
              <p className="text-white/60 text-sm">
                Bei Rückfragen melden wir uns unter {email}.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Hook for programmatic feedback triggers
export function useFeedbackTrigger() {
  const [widget, setWidget] = useState<{
    show: boolean;
    trigger: UserFeedbackWidgetProps['trigger'];
    gameType?: string;
  }>({
    show: false,
    trigger: 'manual'
  });

  const triggerFeedback = (trigger: UserFeedbackWidgetProps['trigger'], gameType?: string) => {
    setWidget({ show: true, trigger, gameType });
  };

  const closeFeedback = () => {
    setWidget(prev => ({ ...prev, show: false }));
  };

  return {
    widget,
    triggerFeedback,
    closeFeedback,
  };
}
