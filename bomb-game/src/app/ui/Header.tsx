"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "../providers/LanguageProvider";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();

  const canGoBack = pathname !== "/";

  return (
    <header className="sticky top-0 z-20 bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg">
      <div className="mx-auto max-w-screen-md px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => (canGoBack ? router.back() : router.push("/"))}
          className="text-lg font-bold tracking-wide hover:opacity-90 transition"
        >
          Wie macht der Bär
        </button>

        <div className="flex items-center gap-3">
          <button
            aria-label="Deutsch"
            onClick={() => setLang("de")}
            className={`relative h-7 w-10 rounded overflow-hidden ring-2 ${lang === "de" ? "ring-yellow-300" : "ring-transparent"}`}
          >
            <Image src="/flags/de.svg" alt="Deutsch" fill sizes="40px" />
          </button>
          <button
            aria-label="English"
            onClick={() => setLang("en")}
            className={`relative h-7 w-10 rounded overflow-hidden ring-2 ${lang === "en" ? "ring-yellow-300" : "ring-transparent"}`}
          >
            <Image src="/flags/gb.svg" alt="English" fill sizes="40px" />
          </button>
        </div>
      </div>
    </header>
  );
}


