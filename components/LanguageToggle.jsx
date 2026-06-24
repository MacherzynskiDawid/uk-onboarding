"use client";
import { useLanguage } from "./LanguageProvider";

export default function LanguageToggle() {
  const { lang, toggle } = useLanguage();
  const next = lang === "en" ? "PL" : "EN";
  const label = lang === "en" ? "Switch language to Polish" : "Zmień język na angielski";
  return (
    <button
      type="button"
      className="lang-toggle"
      aria-pressed={lang === "pl"}
      aria-label={label}
      title={label}
      onClick={toggle}
    >
      {next}
    </button>
  );
}
