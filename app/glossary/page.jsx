"use client";

// app/glossary/page.jsx
// Content comes from data/glossary.js 

import { useState, useMemo } from "react";
import { glossary } from "@/data/glossary";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";


export default function GlossaryPage() {
  const {lang} = useLanguage(); 
  const [query, setQuery] = useState("");

  const t = (en, pl) => (lang === "en" ? en : pl);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? glossary.filter((g) =>
          (g.term + " " + g.full[lang] + " " + g.definition[lang]).toLowerCase().includes(q)
        )
      : glossary;
    return [...list].sort((a, b) => a.term.localeCompare(b.term));
  }, [query, lang]);

  return (
    <main className="glossary-wrap">
        <Link href="/" className="back-link">← {lang === "en" ? "Back to home" : "Powrót do strony głównej"}</Link>
        <h1 className="glossary-title">{t("Glossary of UK terms", "Słownik pojęć brytyjskich")}</h1>
        <p className="glossary-intro">
        {t(
          "Plain-language explanations of common UK terms you may come across.",
          "Proste wyjaśnienia typowych brytyjskich pojęć, które możesz spotkać."
        )}
      </p>


      <input
        className="glossary-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("Search terms…", "Szukaj pojęć…")}
        aria-label={t("Search glossary terms", "Szukaj w słowniku")}
      />

      {filtered.length === 0 && (
        <p className="glossary-empty">{t("No matching terms found.", "Nie znaleziono pasujących pojęć.")}</p>
      )}

      <dl className="glossary-list">
        {filtered.map((g) => (
          <div key={g.id} className="glossary-item">
            <dt className="glossary-term">
              {g.term}
              {g.full[lang] && g.full[lang] !== g.term && (
                <span className="glossary-full"> : {g.full[lang]}</span>
              )}
            </dt>
            <dd className="glossary-def">{g.definition[lang]}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
