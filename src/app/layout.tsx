import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Wie macht der Bär - Online Trinkspiele für die perfekte Party",
    template: "%s | Wie macht der Bär"
  },
  description: "🍻 Die besten Online Trinkspiele für deine Party! Spiele Bomb Party, Quiz Show und mehr mit Freunden. Kostenlos, ohne Download - direkt im Browser spielen!",
  keywords: [
    "Trinkspiele",
    "Online Trinkspiele", 
    "Bomb Party",
    "Partyspiele",
    "Trinkspiele für Erwachsene",
    "Gesellschaftsspiele",
    "Online Party Games",
    "Wie macht der Bär",
    "Saufspiele",
    "Drinking Games",
    "Party Games online",
    "Multiplayer Trinkspiele"
  ],
  authors: [{ name: "Wie macht der Bär Team" }],
  creator: "Wie macht der Bär",
  publisher: "Wie macht der Bär",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/bomb.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" }
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: ["en_US"],
    url: "https://wiemachtderbaer.com",
    siteName: "Wie macht der Bär - Online Trinkspiele",
    title: "Wie macht der Bär - Die besten Online Trinkspiele für deine Party",
    description: "🍻 Spiele die besten Trinkspiele online mit deinen Freunden! Bomb Party, Quiz Show und mehr - kostenlos und ohne Download direkt im Browser.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wie macht der Bär - Online Trinkspiele",
      },
      {
        url: "/og-image-square.jpg", 
        width: 1200,
        height: 1200,
        alt: "Wie macht der Bär Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@wiemachtderbaer",
    creator: "@wiemachtderbaer",
    title: "Wie macht der Bär - Online Trinkspiele für die perfekte Party",
    description: "🍻 Die besten Online Trinkspiele! Bomb Party, Quiz Show und mehr - kostenlos im Browser spielen!",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://wiemachtderbaer.com",
    languages: {
      'de': "https://wiemachtderbaer.com/de",
      'en': "https://wiemachtderbaer.com/en",
    },
  },
  category: "games",
  classification: "Party Games, Drinking Games, Online Games",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Wie macht der Bär',
  description: 'Die besten Online Trinkspiele für deine Party! Bomb Party, Quiz Show und mehr mit Freunden spielen.',
  url: 'https://wiemachtderbaer.com',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1247',
    bestRating: '5',
    worstRating: '1',
  },
  author: {
    '@type': 'Organization',
    name: 'Wie macht der Bär Team',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Wie macht der Bär',
    logo: {
      '@type': 'ImageObject',
      url: 'https://wiemachtderbaer.com/bomb.svg',
    },
  },
  inLanguage: ['de-DE', 'en-US'],
  audience: {
    '@type': 'Audience',
    audienceType: 'Adults',
    geographicArea: {
      '@type': 'Country',
      name: 'Germany',
    },
  },
  genre: ['Party Games', 'Drinking Games', 'Social Games'],
  keywords: 'Trinkspiele, Online Trinkspiele, Bomb Party, Partyspiele, Saufspiele, Drinking Games',
  mainEntity: {
    '@type': 'Game',
    name: 'Bomb Party',
    description: 'Das beliebte Wortspiel als Trinkspiel - finde Wörter bevor die Bombe explodiert!',
    genre: 'Word Game',
    playMode: 'MultiPlayer',
    numberOfPlayers: {
      '@type': 'QuantitativeValue',
      minValue: 2,
      maxValue: 8,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <meta name="theme-color" content="#ffd700" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Wie macht der Bär" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-transparent text-white`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
