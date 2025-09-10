/**
 * Advanced Analytics & Tracking System für Wie macht der Bär
 * Comprehensive User Behavior Analysis & Performance Monitoring
 */

// Type definitions for tracking events
export interface TrackingEvent {
  event: string;
  category: 'game' | 'navigation' | 'social' | 'conversion' | 'error';
  action: string;
  label?: string;
  value?: number;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface GameEvent extends TrackingEvent {
  category: 'game';
  gameType: 'bomb' | 'neverhaveiever' | 'truthordare';
  playerCount?: number;
  gameDuration?: number;
  completionRate?: number;
}

export interface ConversionEvent extends TrackingEvent {
  category: 'conversion';
  funnelStep: 'landing' | 'game_start' | 'game_complete' | 'social_share' | 'return_visit';
  conversionValue?: number;
}

// Analytics Service Class
export class AnalyticsService {
  private static instance: AnalyticsService;
  private sessionId: string;
  private userId: string;
  private sessionStartTime: number;
  private pageViews: number = 0;
  private gameEvents: GameEvent[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();
    this.sessionStartTime = Date.now();
    this.initializeSession();
  }

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  // Session Management
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getUserId(): string {
    let userId = localStorage.getItem('wdb_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('wdb_user_id', userId);
    }
    return userId;
  }

  private initializeSession(): void {
    this.track({
      event: 'session_start',
      category: 'navigation',
      action: 'session_initialized',
      metadata: {
        userAgent: navigator.userAgent,
        screen: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        referrer: document.referrer,
      }
    });
  }

  // Core Tracking Method
  track(event: TrackingEvent): void {
    const enrichedEvent: TrackingEvent = {
      ...event,
      userId: this.userId,
      sessionId: this.sessionId,
      metadata: {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        page: window.location.pathname,
        sessionDuration: Date.now() - this.sessionStartTime,
        pageViews: this.pageViews,
        ...event.metadata
      }
    };

    // Send to Google Analytics 4
    this.sendToGA4(enrichedEvent);
    
    // Send to custom analytics endpoint
    this.sendToCustomAnalytics(enrichedEvent);
    
    // Store locally for offline analysis
    this.storeLocalEvent(enrichedEvent);

    console.log('🔥 Analytics Event:', enrichedEvent);
  }

  // Game-specific tracking methods
  trackGameStart(gameType: 'bomb' | 'neverhaveiever' | 'truthordare', playerCount: number = 1): void {
    const gameEvent: GameEvent = {
      event: 'game_start',
      category: 'game',
      action: 'start_game',
      label: gameType,
      gameType,
      playerCount,
      metadata: {
        gameMode: playerCount > 1 ? 'multiplayer' : 'single',
        device: this.detectDevice(),
      }
    };
    
    this.track(gameEvent);
    this.gameEvents.push(gameEvent);
  }

  trackGameEnd(gameType: 'bomb' | 'neverhaveiever' | 'truthordare', duration: number, completed: boolean): void {
    const completionRate = completed ? 100 : (duration / 300) * 100; // Assume 5min average game
    
    const gameEvent: GameEvent = {
      event: 'game_end',
      category: 'game',
      action: completed ? 'complete_game' : 'abandon_game',
      label: gameType,
      value: Math.round(duration),
      gameType,
      gameDuration: duration,
      completionRate,
      metadata: {
        completed,
        averageGameLength: this.calculateAverageGameLength(gameType),
      }
    };
    
    this.track(gameEvent);
  }

  trackSocialShare(platform: string, content: string): void {
    this.track({
      event: 'social_share',
      category: 'social',
      action: 'share_content',
      label: platform,
      metadata: {
        platform,
        content: content.substring(0, 100), // First 100 chars
        shareSource: window.location.pathname,
      }
    });
  }

  trackConversion(step: ConversionEvent['funnelStep'], value?: number): void {
    this.track({
      event: 'conversion',
      category: 'conversion',
      action: `funnel_${step}`,
      label: step,
      value,
      metadata: {
        funnelPosition: this.getFunnelPosition(step),
        timeToConversion: Date.now() - this.sessionStartTime,
      }
    });
  }

  // Page view tracking
  trackPageView(page: string): void {
    this.pageViews++;
    this.track({
      event: 'page_view',
      category: 'navigation',
      action: 'view_page',
      label: page,
      value: this.pageViews,
      metadata: {
        pageTitle: document.title,
        pageViews: this.pageViews,
      }
    });
  }

  // Error tracking
  trackError(error: Error, context?: string): void {
    this.track({
      event: 'error',
      category: 'error',
      action: 'javascript_error',
      label: error.name,
      metadata: {
        errorMessage: error.message,
        errorStack: error.stack || 'no_stack_trace',
        context: context || 'no_context',
        url: window.location.href,
      }
    });
  }

  // Performance tracking
  trackPerformance(): void {
    if ('performance' in window) {
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
      
      this.track({
        event: 'performance',
        category: 'navigation',
        action: 'page_load_performance',
        value: loadTime,
        metadata: {
          loadTime,
          domReady,
          firstPaint: this.getFirstPaint(),
          firstContentfulPaint: this.getFirstContentfulPaint(),
        }
      });
    }
  }

  // Private helper methods
  private sendToGA4(event: TrackingEvent): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== 'undefined' && (window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_parameter_1: event.sessionId,
        custom_parameter_2: event.metadata?.gameType,
      });
    }
  }

  private sendToCustomAnalytics(event: TrackingEvent): void {
    // Send to custom analytics endpoint (future implementation)
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    }).catch(() => {
      // Fail silently in production
      console.log('Analytics endpoint not available');
    });
  }

  private storeLocalEvent(event: TrackingEvent): void {
    try {
      const events = JSON.parse(localStorage.getItem('wdb_analytics_events') || '[]');
      events.push(event);
      
      // Keep only last 100 events to prevent storage overflow
      if (events.length > 100) {
        events.splice(0, events.length - 100);
      }
      
      localStorage.setItem('wdb_analytics_events', JSON.stringify(events));
    } catch (error) {
      console.warn('Could not store analytics event locally:', error);
    }
  }

  private detectDevice(): string {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private calculateAverageGameLength(gameType: string): number {
    const sameGameEvents = this.gameEvents.filter(e => e.gameType === gameType && e.gameDuration);
    if (sameGameEvents.length === 0) return 0;
    
    const totalDuration = sameGameEvents.reduce((sum, event) => sum + (event.gameDuration || 0), 0);
    return totalDuration / sameGameEvents.length;
  }

  private getFunnelPosition(step: ConversionEvent['funnelStep']): number {
    const funnelSteps = ['landing', 'game_start', 'game_complete', 'social_share', 'return_visit'];
    return funnelSteps.indexOf(step) + 1;
  }

  private getFirstPaint(): number {
    const paintTiming = performance.getEntriesByType('paint');
    const firstPaint = paintTiming.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : 0;
  }

  private getFirstContentfulPaint(): number {
    const paintTiming = performance.getEntriesByType('paint');
    const fcp = paintTiming.find(entry => entry.name === 'first-contentful-paint');
    return fcp ? fcp.startTime : 0;
  }

  // Public utility methods
  getSessionSummary() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      duration: Date.now() - this.sessionStartTime,
      pageViews: this.pageViews,
      gamesSessions: this.gameEvents.length,
      device: this.detectDevice(),
    };
  }

  exportAnalyticsData(): string {
    const events = JSON.parse(localStorage.getItem('wdb_analytics_events') || '[]');
    return JSON.stringify({
      session: this.getSessionSummary(),
      events,
    }, null, 2);
  }
}

// React Hook for Analytics
export function useAnalytics() {
  const analytics = AnalyticsService.getInstance();

  return {
    track: analytics.track.bind(analytics),
    trackGameStart: analytics.trackGameStart.bind(analytics),
    trackGameEnd: analytics.trackGameEnd.bind(analytics),
    trackSocialShare: analytics.trackSocialShare.bind(analytics),
    trackConversion: analytics.trackConversion.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics),
    getSessionSummary: analytics.getSessionSummary.bind(analytics),
    exportData: analytics.exportAnalyticsData.bind(analytics),
  };
}

// Initialize analytics on page load
if (typeof window !== 'undefined') {
  const analytics = AnalyticsService.getInstance();
  
  // Track page load performance
  window.addEventListener('load', () => {
    analytics.trackPerformance();
  });
  
  // Track errors
  window.addEventListener('error', (event) => {
    analytics.trackError(new Error(event.message), 'global_error_handler');
  });
  
  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    analytics.trackError(new Error(event.reason), 'unhandled_promise_rejection');
  });
}
