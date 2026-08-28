'use client';

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, TranslationKey } from "@constants/translations";

type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");

  useEffect(() => {
    const savedLang = localStorage.getItem("communitypro-language") as Language;
    if (savedLang === "id" || savedLang === "en") {
      // Use setTimeout to avoid synchronous setState inside useEffect warning
      const timer = setTimeout(() => {
        setLanguageState(savedLang);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("communitypro-language", lang);
  };

  const t = (key: TranslationKey): string => {
    const keys = (key as string).split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = translations[language];
    
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        // Fallback to id translation if key not found
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let fallback: any = translations["id"];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return key as string;
          }
        }
        return fallback as string;
      }
    }
    return current as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
