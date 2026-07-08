"use client";

// app/faq/page.jsx
// Searchable, bilingual FAQ.

import { useState, useMemo } from "react";
import Link from "next/link";
import { faqs, faqCategories } from "@/data/faqs";
import { useLanguage } from "@/components/LanguageProvider";

export default function FaqPage() {
  const { lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter((f) =>
      (f.question[lang] + " " + f.answer[lang]).toLowerCase().includes(q)
    );
  }, [query, lang]);

  const grouped = faqCategories
    .map((cat) => ({ ...cat, items: filtered.filter((f) => f.category === cat.id) }))
    .filter((cat) => cat.items.length > 0);

  const t = (en, pl) => (lang === "en" ? en : pl);

  return (
    <main className="faq-wrap">
      <Link href="/" className="back-link">← {lang === "en" ? "Back to home" : "Powrót do strony głównej"}</Link>
      <h1 className="faq-title">{t("Frequently Asked Questions", "Najczęściej zadawane pytania")}</h1>
      <p className="faq-intro">
        {t(
          "Search or browse common questions. Answers are drawn from official sources and are informational only.",
          "Wyszukaj lub przeglądaj typowe pytania. Odpowiedzi pochodzą ze źródeł oficjalnych i mają charakter informacyjny."
        )}
      </p>

      <input
        className="faq-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("Search questions…", "Szukaj pytań…")}
        aria-label={t("Search frequently asked questions", "Szukaj w najczęściej zadawanych pytaniach")}
      />

      {grouped.length === 0 && (
        <p className="faq-empty">{t("No matching questions found.", "Nie znaleziono pasujących pytań.")}</p>
      )}

      {grouped.map((cat) => (
        <section key={cat.id} className="faq-cat">
          <h2 className="faq-cat-title">{cat[lang]}</h2>
          <ul className="faq-list">
            {cat.items.map((f) => {
              const open = openId === f.id;
              return (
                <li key={f.id} className={`faq-item${open ? " open" : ""}`}>
                  <button
                    className="faq-q"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : f.id)}
                  >
                    <span>{f.question[lang]}</span>
                    <span className="faq-icon" aria-hidden="true">{open ? "–" : "+"}</span>
                  </button>
                  {open && (
                    <div className="faq-a">
                      <p>{f.answer[lang]}</p>
                      <div className="faq-links">
                        {f.guide && (
                          <Link href={f.guide} className="faq-link">
                            {t("Open the full guide", "Otwórz pełny przewodnik")}
                          </Link>
                        )}
                        {f.official && (
                          <a href={f.official} target="_blank" rel="noopener noreferrer" className="faq-link">
                            {t("Official source", "Źródło oficjalne")}
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}
