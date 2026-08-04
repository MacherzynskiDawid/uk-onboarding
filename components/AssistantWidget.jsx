"use client";

// components/AssistantWidget.jsx
// Floating chat launcher, fixed bottom-right, available on every page (mounted
// once in app/layout.jsx). Clicking the bubble opens an overlay chat panel that
// talks to /api/assistant. Same corpus-restricted behaviour as before: grounded
// answers show sources, off-corpus questions show the signpost.
//
// All display strings are in T; the Polish values are placeholders for you.

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const T = {
  launch:      { en: "Ask a question", pl: "Zadaj pytanie" },
  title:       { en: "Ask a question", pl: "Zadaj pytanie" },
  subtitle:    { en: "General info from the guides, not individual advice.", pl: "Ogólne informacje z przewodników, nie indywidualna porada." },
  greeting:    { en: "Hi. Ask me anything covered by these guides, e.g. how to register with a GP.", pl: "Cześć. Zapytaj mnie o cokolwiek opisanego w tych przewodnikach, np. jak zarejestrować się do przychodni (GP)." },
  placeholder: { en: "Type your question…", pl: "Wpisz swoje pytanie…" },
  send:        { en: "Send", pl: "Wyślij" },
  sending:     { en: "…", pl: "…" },
  sources:     { en: "Sources", pl: "Źródła" },
  error:       { en: "Something went wrong. Please try again.", pl: "Coś poszło nie tak. Spróbuj ponownie." },
  close:       { en: "Close", pl: "Zamknij" },
};

export default function AssistantWidget() {
  const { lang } = useLanguage();
  const t = (k) => T[k][lang];

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]); // { role, text, sources?, refusal? }
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading, open]);

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") setOpen(false); }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send() {
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, lang }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", text: data.answer || t("error"), sources: data.sources || [], refusal: !!data.refusal },
      ]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: t("error"), sources: [], refusal: true }]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      <button
        type="button"
        className="aw-launch"
        aria-label={t("launch")}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 5h16v11H8l-4 4V5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {open && (
        <div className="aw-panel" role="dialog" aria-label={t("title")}>
          <div className="aw-header">
            <div>
              <div className="aw-title">{t("title")}</div>
              <div className="aw-subtitle">{t("subtitle")}</div>
            </div>
            <button type="button" className="aw-close" aria-label={t("close")} onClick={() => setOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="aw-messages" ref={listRef}>
            <div className="aw-msg aw-bot">{t("greeting")}</div>
            {messages.map((m, i) => (
              <div key={i} className={`aw-msg ${m.role === "user" ? "aw-user" : "aw-bot"}${m.refusal ? " aw-signpost" : ""}`}>
                <div className="aw-text">{m.text}</div>
                {m.role === "assistant" && !m.refusal && m.sources && m.sources.filter((s) => s.source).length > 0 && (
                  <div className="aw-sources">
                    <span className="aw-sources-label">{t("sources")}</span>
                    <ul>
                      {m.sources.filter((s) => s.source).map((s) => (
                        <li key={s.id}>
                          <a href={s.source} target="_blank" rel="noopener noreferrer">{s.title || s.source}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="aw-msg aw-bot aw-typing">…</div>}
          </div>

          <div className="aw-input-row">
            <textarea
              className="aw-input"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t("placeholder")}
              maxLength={1000}
            />
            <button type="button" className="aw-send" onClick={send} disabled={loading || !input.trim()}>
              {loading ? t("sending") : t("send")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
