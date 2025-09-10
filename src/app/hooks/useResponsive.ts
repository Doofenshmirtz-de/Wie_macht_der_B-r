'use client';

import { useState, useEffect } from 'react';

export interface ResponsiveBreakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
  isTouch: boolean;
  devicePixelRatio: number;
}

// Breakpoints (matching Tailwind CSS)
const BREAKPOINTS = {
  mobile: 0,      // 0px - 639px
  tablet: 640,    // 640px - 1023px  
  desktop: 1024,  // 1024px - 1279px
  large: 1280,    // 1280px+
} as const;

export function useResponsive(): ResponsiveBreakpoints {
  const [responsiveState, setResponsiveState] = useState<ResponsiveBreakpoints>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    screenWidth: 0,
    screenHeight: 0,
    orientation: 'portrait',
    isTouch: false,
    devicePixelRatio: 1,
  });

  useEffect(() => {
    const updateResponsiveState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Bestimme Device-Kategorie
      const isMobile = width < BREAKPOINTS.tablet;
      const isTablet = width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop;
      const isDesktop = width >= BREAKPOINTS.desktop && width < BREAKPOINTS.large;
      const isLargeDesktop = width >= BREAKPOINTS.large;

      // Bestimme Orientierung
      const orientation: 'portrait' | 'landscape' = height > width ? 'portrait' : 'landscape';

    // Touch-Detection
    const isTouch = 'ontouchstart' in window || 
                    navigator.maxTouchPoints > 0 || 
                    // @ts-expect-error - older browsers
                    navigator.msMaxTouchPoints > 0;

      // Device Pixel Ratio
      const devicePixelRatio = window.devicePixelRatio || 1;

      setResponsiveState({
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop,
        screenWidth: width,
        screenHeight: height,
        orientation,
        isTouch,
        devicePixelRatio,
      });
    };

    // Initial call
    updateResponsiveState();

    // Listen for resize events
    window.addEventListener('resize', updateResponsiveState);
    window.addEventListener('orientationchange', updateResponsiveState);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateResponsiveState);
      window.removeEventListener('orientationchange', updateResponsiveState);
    };
  }, []);

  return responsiveState;
}

// Helper hooks for specific breakpoints
export function useIsMobile(): boolean {
  const { isMobile } = useResponsive();
  return isMobile;
}

export function useIsTablet(): boolean {
  const { isTablet } = useResponsive();
  return isTablet;
}

export function useIsDesktop(): boolean {
  const { isDesktop, isLargeDesktop } = useResponsive();
  return isDesktop || isLargeDesktop;
}

export function useIsTouch(): boolean {
  const { isTouch } = useResponsive();
  return isTouch;
}

// Device-specific utilities
export function getOptimalImageSize(screenWidth: number): { width: number; height: number } {
  if (screenWidth < BREAKPOINTS.tablet) {
    return { width: 640, height: 480 }; // Mobile
  } else if (screenWidth < BREAKPOINTS.desktop) {
    return { width: 1024, height: 768 }; // Tablet
  } else if (screenWidth < BREAKPOINTS.large) {
    return { width: 1280, height: 960 }; // Desktop
  } else {
    return { width: 1920, height: 1440 }; // Large Desktop
  }
}

export function getOptimalFontSize(baseSize: number, screenWidth: number): number {
  if (screenWidth < BREAKPOINTS.tablet) {
    return baseSize * 0.875; // 87.5% für Mobile
  } else if (screenWidth < BREAKPOINTS.desktop) {
    return baseSize * 0.9375; // 93.75% für Tablet
  } else {
    return baseSize; // 100% für Desktop+
  }
}
