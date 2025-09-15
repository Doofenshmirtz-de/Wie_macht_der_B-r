import "../globals.css";
import "../styles/design-system.css";
import { notFound } from "next/navigation";
import { Header } from "../ui/Header";
import { Footer } from "../ui/Footer";
import { MobileOptimizations } from "../ui/MobileOptimizations";
import { ResponsiveDebugPanel } from "../ui/ResponsiveDebugPanel";
import { AccessibilityEnhancements, SkipLinks } from "../ui/EnhancedAccessibility";
import { TouchOptimizations } from "../ui/MobileNavigationMenu";
import { SoundProvider } from "../providers/SoundProvider";
import { SettingsProvider } from "../providers/SettingsProvider";
import { AnalyticsProvider } from "../providers/AnalyticsProvider";
import PWAInstallPrompt from "../ui/PWAInstallPrompt";
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration";
import { CookieBanner } from "../ui/CookieBanner";
import Script from "next/script";

export function generateStaticParams() {
  return [
    { locale: 'de' },
    { locale: 'en' }
  ];
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const { children, params } = props;
  const { locale } = await params;
  
  if (!['de', 'en'].includes(locale)) {
    notFound();
  }

  return (
    <AnalyticsProvider>
      <SettingsProvider>
        <SoundProvider>
          <div className="min-h-screen">
          <div className="relative overflow-hidden">
            {/* Mobile & Responsive Optimizations */}
            <MobileOptimizations />
            <TouchOptimizations />
            
            {/* Development Tools */}
            <ResponsiveDebugPanel />
            
            {/* Enhanced Accessibility */}
            <SkipLinks />
            <AccessibilityEnhancements />
            
            <Header />
            
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            
            <Footer />
            
            {/* Accessibility Tools */}
            
            {/* PWA & Technical Components */}
            <PWAInstallPrompt />
            <ServiceWorkerRegistration />
            <CookieBanner />
            
            {/* ARIA Live Region for Announcements */}
            <div 
              id="live-region" 
              className="live-region" 
              aria-live="polite" 
              aria-atomic="true"
            />
          </div>
          </div>
          
          {/* Hero Enhancement Script */}
          <Script
            src="/scripts/hero-enhancements.js"
            strategy="afterInteractive"
          />
        </SoundProvider>
      </SettingsProvider>
    </AnalyticsProvider>
  );
}


