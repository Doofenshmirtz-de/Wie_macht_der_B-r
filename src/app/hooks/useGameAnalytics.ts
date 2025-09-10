'use client';

import { useAnalytics } from '../providers/AnalyticsProvider';

export function useGameAnalytics() {
  const { trackEvent } = useAnalytics();

  const trackGameStart = (gameName: string, gameMode?: string) => {
    trackEvent('game_start', {
      game_name: gameName,
      game_mode: gameMode || 'default',
      event_category: 'game',
    });
  };

  const trackGameEnd = (gameName: string, duration: number, score?: number) => {
    trackEvent('game_end', {
      game_name: gameName,
      game_duration: duration,
      score: score,
      event_category: 'game',
    });
  };

  const trackGameSelection = (gameName: string) => {
    trackEvent('game_selection', {
      game_name: gameName,
      event_category: 'engagement',
    });
  };

  const trackPWAInstall = () => {
    trackEvent('pwa_install', {
      event_category: 'engagement',
      value: 1,
    });
  };

  const trackLanguageChange = (fromLanguage: string, toLanguage: string) => {
    trackEvent('language_change', {
      from_language: fromLanguage,
      to_language: toLanguage,
      event_category: 'engagement',
    });
  };

  const trackSocialShare = (gameName: string, platform: string) => {
    trackEvent('social_share', {
      game_name: gameName,
      platform: platform,
      event_category: 'engagement',
    });
  };

  return {
    trackGameStart,
    trackGameEnd,
    trackGameSelection,
    trackPWAInstall,
    trackLanguageChange,
    trackSocialShare,
  };
}
