import "../globals.css";
import "../styles/hero-redesign.css";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale, getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";
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
  return routing.locales.map((locale) => ({ locale }));
}

type MaybePromise<T> = T | Promise<T>;

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: MaybePromise<{ locale: string }>;
};

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const { children } = props;
  const params = await props.params;
  const locale = (params as { locale: string })?.locale as AppLocale;
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
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
          </SoundProvider>
        </SettingsProvider>
      </AnalyticsProvider>
      
      {/* Hero Enhancement Script */}
      <Script
        src="/scripts/hero-enhancements.js"
        strategy="afterInteractive"
      />
    </NextIntlClientProvider>
  );
}


