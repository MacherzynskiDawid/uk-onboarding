"use client";
import dynamic from "next/dynamic";
import { useLanguage } from "@/components/LanguageProvider";
import { ui } from "@/lib/ui-strings";

const ServicesMap = dynamic(() => import("@/components/ServicesMap"), {
  ssr: false,
  loading: () => <p className="muted">…</p>,
});

export default function MapPage() {
  const { lang } = useLanguage();
  return (
    <main lang={lang}>
      <h1>{ui.mapTitle[lang]}</h1>
      <p>{ui.mapIntro[lang]}</p>
      <ServicesMap />
    </main>
  );
}