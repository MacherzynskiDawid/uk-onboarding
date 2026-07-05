"use client";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { useAuth } from "./AuthProvider";
import { useProgress } from "@/app/hooks/useProgress";
import { isGuideComplete } from "@/data/guides";
import { ui } from "@/lib/ui-strings";
import RingNav from "./RingNav";

const WheelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="2.4" fill="currentColor" />
    <path d="M12 14.4V21M4.6 10.5l5.2 1.2M19.4 10.5l-5.2 1.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const CrossIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);
const RosetteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="9" r="5.5" stroke="currentColor" strokeWidth="2" />
    <path d="M8.5 13.5L7 21l5-2.6L17 21l-1.5-7.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const STAGE_ICON = {
  "driving-licence": WheelIcon,
  "nhs-gp-registration": CrossIcon,
  "british-citizenship": RosetteIcon,
};
const JOURNEY_ORDER = ["driving-licence", "nhs-gp-registration", "british-citizenship"];

export default function HomeView({ essentials, extras, visa }) {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const { progress } = useProgress();
  const isComplete = (g) => isGuideComplete(g, progress);

  const bySlug = Object.fromEntries(extras.map((g) => [g.slug, g]));
  const ordered = JOURNEY_ORDER.map((s) => bySlug[s]).filter(Boolean);
  const rest = extras.filter((g) => !JOURNEY_ORDER.includes(g.slug));
  const stages = [...ordered, ...rest];

  return (
    <main className="home">
      {visa && (
        <Link href={`/guides/${visa.slug}`} className="visa-callout">{ui.visaCallout[lang]}</Link>
      )}

      <section className="hero">
        <p className="eyebrow">{ui.heroEyebrow[lang]}</p>
        <h1 className="hero-title">{ui.heroTitle[lang]}</h1>
        <p className="hero-sub">{ui.heroSubtitle[lang]}</p>
      </section>

      {!user && <p className="guest-signpost">{ui.guestSignpost[lang]}</p>}

      <p className="group-label">{ui.essentialsLabel[lang]}</p>
      <RingNav essentials={essentials} />

      <section className="journey">
        <p className="group-label">{ui.journeyLabel[lang]}</p>
        <ol className="journey-list">
          {stages.map((g) => {
            const Icon = STAGE_ICON[g.slug];
            const done = isComplete(g);
            return (
              <li key={g.slug} className="journey-stage">
                <Link href={`/guides/${g.slug}`}>
                  <span className={`stage-node ${done ? "done" : ""}`}>
                    {done ? <span className="stage-tick">{"\u2713"}</span> : (Icon ? <Icon /> : null)}
                  </span>
                  <span className="stage-body">
                    <span className="stage-title">{g.title[lang]}</span>
                    <span className="stage-desc">{g.summary[lang]}</span>
                  </span>
                  <span className="stage-arrow" aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {!user && (
        <p className="muted login-hint">
          <Link href="/login">{ui.logIn[lang]}</Link> {ui.loginToSave[lang]}
        </p>
      )}
    </main>
  );
}
