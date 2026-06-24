"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import { useAuth } from "./AuthProvider";
import { useProgress } from "@/app/hooks/useProgress";
import { isFirebaseConfigured } from "@/app/firebase/setup";
import { pathKey } from "@/data/guides";
import { ui } from "@/lib/ui-strings";
import Trophy from "./Trophy";

function PathIcon({ index }) {
  if (index === 1) {
    return (
      <svg viewBox="0 0 48 48" className="path-icon" aria-hidden="true">
        <rect x="6" y="6" width="36" height="36" rx="7" fill="#fff" stroke="#d10a0a" strokeWidth="3" />
        <path d="M19 14 v16 h12" fill="none" stroke="#d10a0a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className="path-icon" aria-hidden="true">
      <rect x="6" y="12" width="36" height="24" rx="4" fill="#eef0fb" stroke="var(--brand)" strokeWidth="2.5" />
      <circle cx="17" cy="22" r="4" fill="var(--brand)" />
      <rect x="25" y="19" width="12" height="2.5" rx="1.25" fill="var(--brand)" />
      <rect x="25" y="25" width="12" height="2.5" rx="1.25" fill="#b9c0ec" />
      <rect x="11" y="30" width="26" height="2.5" rx="1.25" fill="#b9c0ec" />
    </svg>
  );
}

function StepList({ steps, slug, lang, isStepDone, toggleStep }) {
  let seqDone = 0;
  while (seqDone < steps.length && isStepDone(slug, seqDone)) seqDone++;
  return (
    <ol className="steps">
      {steps.map((step, i) => {
        const done = i < seqDone;
        const isNext = i === seqDone;
        const locked = i > seqDone;
        const toggleable = isNext || i === seqDone - 1;
        return (
          <li key={i} className={`${done ? "done" : ""} ${locked ? "locked" : ""} ${isNext ? "next-step" : ""}`}>
            <label className="step-check">
              <input type="checkbox" checked={done} disabled={!toggleable} onChange={() => toggleStep(slug, i)} />
              <span>
                <h3>{step.heading[lang]}</h3>
                <p>{step.body[lang]}</p>
                {locked && <span className="lock-hint">{ui.completePrevious[lang]}</span>}
              </span>
            </label>
          </li>
        );
      })}
    </ol>
  );
}

export default function GuideView({ guide, prereqGuides }) {
  const { lang } = useLanguage();
  const { user, loading } = useAuth();
  const { progress, isStepDone, toggleStep } = useProgress();

  const sections = guide.sections || [{ title: null, steps: guide.steps || [] }];
  const isPathChoice = !!guide.pathChoice && sections.length > 1;
  const isOpen = guide.phase === "before-arrival";
  const needsLogin = isFirebaseConfigured && !isOpen;

  const [chosen, setChosen] = useState(null);

  // Re-open whichever path the user already started.
  useEffect(() => {
    if (!isPathChoice || chosen !== null) return;
    const started = sections.findIndex((_, i) => (progress[pathKey(guide, i)]?.length || 0) > 0);
    if (started >= 0) setChosen(started);
  }, [isPathChoice, chosen, progress, guide, sections]);

  const header = (
    <>
      <p className="muted"><Link href="/">&larr; {ui.allGuides[lang]}</Link></p>
      <h1>{guide.title[lang]}</h1>
      <p>{guide.summary[lang]}</p>
      {prereqGuides.length > 0 && (
        <p className="prereq">
          {ui.recommendedFirst[lang]}:{" "}
          {prereqGuides.map((p, i) => (
            <span key={p.slug}>{i > 0 && ", "}<Link href={`/guides/${p.slug}`}>{p.title[lang]}</Link></span>
          ))}
        </p>
      )}
      {guide.note && <p className="muted">{guide.note[lang]}</p>}
    </>
  );

  const sourceLine = (
    <p className="source">
      {ui.source[lang]}: <a href={guide.source}>{guide.source}</a> · {ui.checked[lang]} {guide.lastUpdated}
    </p>
  );

  if (loading) return <main lang={lang}>{header}</main>;

  if (needsLogin && !user) {
    return (
      <main lang={lang}>
        {header}
        <div className="gate">
          <p className="gate-title">{ui.gateTitle[lang]}</p>
          <p className="muted">{ui.gatePrompt[lang]}</p>
          <div className="gate-actions">
            <Link href="/login" className="btn-primary">{ui.logIn[lang]}</Link>
          </div>
          <p className="muted gate-alt">{ui.needAccount[lang]} <Link href="/register">{ui.createAccount[lang]}</Link></p>
        </div>
        <p className="disclaimer">{guide.disclaimer[lang]}</p>
      </main>
    );
  }

  // --- Path-choice guide: pick a route first ---
  if (isPathChoice) {
    if (chosen === null) {
      return (
        <main lang={lang}>
          {header}
          <p className="disclaimer">{guide.disclaimer[lang]}</p>
          <p className="choose-prompt">{(guide.choosePrompt && guide.choosePrompt[lang]) || ui.choosePathPrompt[lang]}</p>
          <div className="path-grid">
            {sections.map((sec, i) => (
              <button key={i} type="button" className="path-card" onClick={() => setChosen(i)}>
                <PathIcon index={i} />
                <span className="path-title">{sec.title[lang]}</span>
                {sec.blurb && <span className="path-blurb">{sec.blurb[lang]}</span>}
                <span className="path-go">{ui.choosePathStart[lang]} &rarr;</span>
              </button>
            ))}
          </div>
          {sourceLine}
        </main>
      );
    }
    const sec = sections[chosen];
    const pkey = pathKey(guide, chosen);
    const stepsDone = (() => { let n = 0; while (n < sec.steps.length && isStepDone(pkey, n)) n++; return n; })();
    const allDone = sec.steps.length > 0 && stepsDone === sec.steps.length;
    return (
      <main lang={lang}>
        {header}
        <p className="disclaimer">{guide.disclaimer[lang]}</p>
        <button type="button" className="path-back" onClick={() => setChosen(null)}>&larr; {ui.choosePathBack[lang]}</button>
        <h2 className="section-head">{sec.title[lang]}</h2>
        <StepList steps={sec.steps} slug={pkey} lang={lang} isStepDone={isStepDone} toggleStep={toggleStep} />
        {allDone && <Trophy label={ui.guideComplete[lang]} sub={sec.title[lang]} />}
        {sourceLine}
      </main>
    );
  }

  // --- Normal guide (flat, sequential) ---
  const allSteps = sections[0].steps;
  let seqDone = 0;
  while (seqDone < allSteps.length && isStepDone(guide.slug, seqDone)) seqDone++;
  const allDone = allSteps.length > 0 && seqDone === allSteps.length;

  return (
    <main lang={lang}>
      {header}
      <p className="disclaimer">{guide.disclaimer[lang]}</p>
      <StepList steps={allSteps} slug={guide.slug} lang={lang} isStepDone={isStepDone} toggleStep={toggleStep} />
      {allDone && <Trophy label={ui.guideComplete[lang]} sub={guide.title[lang]} />}
      {sourceLine}
    </main>
  );
}
