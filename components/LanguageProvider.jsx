"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext({ lang: "en", toggle: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "pl") setLang(saved);
  }, []);

  const toggle = () =>
    setLang((prev) => {
      const next = prev === "en" ? "pl" : "en";
      localStorage.setItem("lang", next);
      return next;
    });

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
