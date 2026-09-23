"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

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
  // Render pertama harus sama dengan server ("id"); preferensi tersimpan dibaca setelah hydration.
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    const savedLang = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLang === "en" || savedLang === "id") setLangState(savedLang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
  }, []);

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
