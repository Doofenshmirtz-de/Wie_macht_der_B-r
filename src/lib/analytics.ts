// Google Analytics Utility Functions
// Tracking ID: G-F51HT0NZ4H

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const GA_TRACKING_ID = 'G-F51HT0NZ4H';

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Game-specific tracking events
export const trackGameStart = (gameType: string) => {
  event({
    action: 'game_start',
    category: 'Game',
    label: gameType,
  });
};

export const trackGameEnd = (gameType: string, duration: number) => {
  event({
    action: 'game_end',
    category: 'Game',
    label: gameType,
    value: duration,
  });
};

export const trackGameAction = (gameType: string, action: string) => {
  event({
    action: `game_${action}`,
    category: 'Game',
    label: gameType,
  });
};

// User interaction tracking
export const trackButtonClick = (buttonName: string, location: string) => {
  event({
    action: 'click',
    category: 'Button',
    label: `${buttonName}_${location}`,
  });
};

export const trackPageView = (pageName: string) => {
  event({
    action: 'page_view',
    category: 'Navigation',
    label: pageName,
  });
};

// Performance tracking
export const trackPerformance = (metric: string, value: number) => {
  event({
    action: 'performance',
    category: 'Performance',
    label: metric,
    value: Math.round(value),
  });
};

// Error tracking
export const trackError = (error: string, location: string) => {
  event({
    action: 'error',
    category: 'Error',
    label: `${error}_${location}`,
  });
};

// Social sharing tracking
export const trackSocialShare = (platform: string, content: string) => {
  event({
    action: 'share',
    category: 'Social',
    label: `${platform}_${content}`,
  });
};

// Download tracking
export const trackDownload = (fileName: string) => {
  event({
    action: 'download',
    category: 'Download',
    label: fileName,
  });
};

// Search tracking
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  event({
    action: 'search',
    category: 'Search',
    label: searchTerm,
    value: resultsCount,
  });
};
