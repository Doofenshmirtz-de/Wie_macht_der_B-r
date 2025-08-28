import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./providers/LanguageProvider";
import { Header } from "./ui/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wie macht der Bär",
  description: "Partyspiele für Freunde – Bomb Party & mehr",
  icons: {
    icon: "/bomb.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black min-h-screen text-white`}
      >
        <LanguageProvider>
          <div className="mx-auto max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl px-2 sm:px-4">
            <div className="my-3 rounded-[18px] border border-white/10 panel-bg backdrop-blur-md shadow-xl overflow-hidden">
              <Header />
              {children}
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
