"use client";

// components/AiAssistant.jsx
// Corpus-restricted assistant UI. Sends the question and current language to
// /api/assistant and renders either a grounded answer with its sources, or the
// signpost when the question is outside the guides. All user-facing strings are
// collected in T below; the Polish values are placeholders for you to author.

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const T = {
  title:       { en: "Ask the guides", pl: "[PL: Ask the guides]" },
  intro: {
    en: "Ask a question about the settling-in tasks covered by these guides. The assistant answers only from the guide and FAQ content and points you to the official source. It gives general information, not individual advice.",
    pl: "[PL: author this intro]",
  },
  placeholder: { en: "e.g. How do I register with a GP?", pl: "[PL: przyklad pytania]" },
  ask:         { en: "Ask", pl: "[PL: Ask]" },
  asking:      { en: "Asking…", pl: "[PL: Asking…]" },
  sources:     { en: "Sources", pl: "[PL: Sources]" },
  error:       { en: "Something went wrong. Please try again.", pl: "[PL: error message]" },
  empty:       { en: "Type a question first.", pl: "[PL: type a question first]" },
};

export default function AiAssistant() {
  const { lang } = useLanguage();
  const t = (key) => T[key][lang];

  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function ask() {
    const q = question.trim();
    if (!q) { setError(t("empty")); return; }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, lang }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) ask();
  }

  return (
    <div className="assistant-wrap">
      <p className="assistant-intro">{t("intro")}</p>

      <label className="assistant-label" htmlFor="assistant-q">{t("title")}</label>
      <textarea
        id="assistant-q"
        className="assistant-input"
        rows={3}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={t("placeholder")}
        maxLength={1000}
      />

      <button type="button" className="btn-primary" onClick={ask} disabled={loading}>
        {loading ? t("asking") : t("ask")}
      </button>

      {error && <p className="assistant-error" role="alert">{error}</p>}

      {result && (
        <div className={`assistant-result${result.refusal ? " is-signpost" : ""}`} aria-live="polite">
          <p className="assistant-answer">{result.answer}</p>

          {!result.refusal && Array.isArray(result.sources) && result.sources.length > 0 && (
            <div className="assistant-sources">
              <span className="assistant-sources-label">{t("sources")}</span>
              <ul>
                {result.sources
                  .filter((s) => s.source)
                  .map((s) => (
                    <li key={s.id}>
                      <a href={s.source} target="_blank" rel="noopener noreferrer">
                        {s.title || s.source}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
