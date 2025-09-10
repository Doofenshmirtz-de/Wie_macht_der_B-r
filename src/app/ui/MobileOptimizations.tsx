'use client';

import { useResponsive } from '../hooks/useResponsive';
import { useEffect } from 'react';

export function MobileOptimizations() {
  const { isMobile, isTablet, isTouch, orientation, screenWidth } = useResponsive();

  useEffect(() => {
    // Viewport Meta Tag dynamisch anpassen
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      let content = 'width=device-width, initial-scale=1';
      
      // Verhindere Zoom bei Touch-Geräten (bessere UX für Games)
      if (isTouch) {
        content += ', maximum-scale=1, user-scalable=0';
      }
      
      // Orientation-spezifische Anpassungen
      if (isMobile && orientation === 'landscape') {
        content += ', viewport-fit=cover';
      }
      
      viewport.setAttribute('content', content);
    }

    // CSS Custom Properties für JavaScript-Values
    document.documentElement.style.setProperty('--screen-width', `${screenWidth}px`);
    document.documentElement.style.setProperty('--is-mobile', isMobile ? '1' : '0');
    document.documentElement.style.setProperty('--is-tablet', isTablet ? '1' : '0');
    document.documentElement.style.setProperty('--is-touch', isTouch ? '1' : '0');

    // Body-Klassen für globale Styles
    const body = document.body;
    body.classList.toggle('is-mobile', isMobile);
    body.classList.toggle('is-tablet', isTablet);
    body.classList.toggle('is-touch', isTouch);
    body.classList.toggle('is-landscape', orientation === 'landscape');
    body.classList.toggle('is-portrait', orientation === 'portrait');

  }, [isMobile, isTablet, isTouch, orientation, screenWidth]);

  // Diese Komponente rendert nichts sichtbar - nur Setup
  return null;
}

// Mobile-spezifische Utility-Komponente
interface MobileOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function MobileOnly({ children, fallback = null }: MobileOnlyProps) {
  const { isMobile } = useResponsive();
  return isMobile ? <>{children}</> : <>{fallback}</>;
}

interface TabletOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function TabletOnly({ children, fallback = null }: TabletOnlyProps) {
  const { isTablet } = useResponsive();
  return isTablet ? <>{children}</> : <>{fallback}</>;
}

interface DesktopOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function DesktopOnly({ children, fallback = null }: DesktopOnlyProps) {
  const { isDesktop, isLargeDesktop } = useResponsive();
  return (isDesktop || isLargeDesktop) ? <>{children}</> : <>{fallback}</>;
}

interface TouchOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function TouchOnly({ children, fallback = null }: TouchOnlyProps) {
  const { isTouch } = useResponsive();
  return isTouch ? <>{children}</> : <>{fallback}</>;
}

// Responsive Container
interface ResponsiveContainerProps {
  children: React.ReactNode;
  mobile?: React.ReactNode;
  tablet?: React.ReactNode;
  desktop?: React.ReactNode;
  className?: string;
}

export function ResponsiveContainer({ 
  children, 
  mobile, 
  tablet, 
  desktop, 
  className = '' 
}: ResponsiveContainerProps) {
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useResponsive();

  if (isMobile && mobile) {
    return <div className={`responsive-mobile ${className}`}>{mobile}</div>;
  }
  
  if (isTablet && tablet) {
    return <div className={`responsive-tablet ${className}`}>{tablet}</div>;
  }
  
  if ((isDesktop || isLargeDesktop) && desktop) {
    return <div className={`responsive-desktop ${className}`}>{desktop}</div>;
  }

  return <div className={`responsive-default ${className}`}>{children}</div>;
}
