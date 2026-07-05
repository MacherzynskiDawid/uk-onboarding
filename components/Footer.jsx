"use client";
import { useLanguage } from "./LanguageProvider";
import { ui } from "@/lib/ui-strings";

export default function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="site-footer">
      <p className="foot-name">UK Newcomer Guides</p>
      <p className="foot-disclaimer">{ui.footerDisclaimer[lang]}</p>
      <p className="foot-sources">{ui.footerSources[lang]}</p>
      <p className="foot-academic">QH0634 Dissertation Project Artefact &nbsp;|&nbsp; Student ID 10299429 &nbsp;|&nbsp; Southampton Solent University &nbsp;|&nbsp; QAHE</p>
    </footer>
  );
}
