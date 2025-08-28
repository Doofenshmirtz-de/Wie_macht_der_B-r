"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { messages } from "../translations/messages";

export type SupportedLanguage = "de" | "en";

type LanguageContextValue = {
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "wmb-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<SupportedLanguage>("de");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY)) as SupportedLanguage | null;
    if (stored === "de" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  const setLang = (l: SupportedLanguage) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
    }
  };

  const t = useMemo(() => {
    const dict = messages[lang] ?? messages.de;
    return (key: keyof typeof dict | string) => {
      if (key in dict) {
        // TypeScript narrow: key is keyof typeof dict
        return (dict as Record<string, string>)[key as string];
      }
      return key;
    };
  }, [lang]);

  const value: LanguageContextValue = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}


