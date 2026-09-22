"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { id } from "./id";
import { en } from "./en";

export type Lang = "id" | "en";

const translations = { id, en };
const LANGUAGE_STORAGE_KEY = "bidtech-lang";

type Translations = typeof translations.id;

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "id";

    const savedLang = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return savedLang === "en" || savedLang === "id" ? savedLang : "id";
  });

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
