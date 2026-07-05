"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db, isFirebaseConfigured } from "@/app/firebase/setup";
import { guidesInOrder, guidesBySlug, isGuideComplete, guideProgress } from "@/data/guides";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { useProgress } from "@/app/hooks/useProgress";
import { ui } from "@/lib/ui-strings";
import Trophy from "@/components/Trophy";

export default function MyProgress() {
  const { user, loading } = useAuth();
  const { lang } = useLanguage();
  const { progress, ready } = useProgress();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!user || !db) return;
      try {
        const q = query(collection(db, "users", user.uid, "messages"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        if (active) setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error("load messages failed", e);
      }
    }
    load();
    return () => { active = false; };
  }, [user]);

  if (loading) return <main><p className="muted">{"\u2026"}</p></main>;

  if (isFirebaseConfigured && !user) {
    return (
      <main>
        <h1>{ui.dashboard[lang]}</h1>
        <p className="muted">{ui.progressGate[lang]}</p>
        <div className="gate-actions">
          <Link href="/login" className="btn-primary">{ui.logIn[lang]}</Link>
        </div>
        <p className="muted gate-alt">{ui.needAccount[lang]} <Link href="/register">{ui.createAccount[lang]}</Link></p>
      </main>
    );
  }

  const isComplete = (g) => isGuideComplete(g, progress);
  const prereqsMet = (g) =>
    g.prerequisites.every((s) => (guidesBySlug[s] ? isComplete(guidesBySlug[s]) : true));

  const essentials = guidesInOrder.filter((g) => g.category === "essential" && g.phase === "after-arrival");
  const doneCount = essentials.filter(isComplete).length;
  const pct = essentials.length ? Math.round((doneCount / essentials.length) * 100) : 0;
  const nextGuide = guidesInOrder.find((g) => !isComplete(g) && prereqsMet(g));
  const earned = guidesInOrder.filter(isComplete);

  return (
    <main>
      <h1>{ui.dashboard[lang]}</h1>

      <p>{doneCount} / {essentials.length} {ui.essentialsComplete[lang]}</p>
      <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
      {ready && (nextGuide
        ? <p className="muted">{ui.whatsNext[lang]}: <Link href={`/guides/${nextGuide.slug}`}>{nextGuide.title[lang]}</Link></p>
        : <p className="muted">{ui.journeyComplete[lang]}</p>
      )}

      {doneCount === essentials.length && essentials.length > 0 && (
        <Trophy label={ui.allEssentialsTrophy[lang]} />
      )}

      <h2 className="section-head">{ui.yourTasks[lang]}</h2>
      <ul className="dash-list">
        {guidesInOrder.map((g) => {
          const { done, total } = guideProgress(g, progress);
          const complete = isComplete(g);
          return (
            <li key={g.slug} className={`${complete ? "done" : ""} ${g.slug === nextGuide?.slug ? "next" : ""}`}>
              <span className={`tick ${complete ? "" : "todo"}`}>{complete ? "\u2713" : "\u25CB"}</span>
              <Link href={`/guides/${g.slug}`} className="dash-link">{g.title[lang]}</Link>
              <span className="dash-count">{done}/{total} {ui.stepsWord[lang]}</span>
            </li>
          );
        })}
      </ul>

      <h2 className="section-head">{ui.badges[lang]}</h2>
      {earned.length === 0 ? (
        <p className="muted">{ui.noBadges[lang]}</p>
      ) : (
        <ul className="badge-grid">
          {earned.map((g) => (
            <li key={g.slug} className="badge-chip">
              <svg viewBox="0 0 64 64" aria-hidden="true">
                <path d="M22 12 h20 v8 a10 10 0 0 1 -20 0 z" fill="var(--gold)" />
                <rect x="30" y="30" width="4" height="8" fill="var(--gold)" />
                <rect x="24" y="38" width="16" height="4" rx="2" fill="var(--gold)" />
                <rect x="26" y="44" width="12" height="5" rx="2" fill="var(--gold-dark)" />
              </svg>
              <span>{g.title[lang]}</span>
            </li>
          ))}
        </ul>
      )}

      {user && messages.length > 0 && (
        <>
          <h2 className="section-head">{ui.messages[lang]}</h2>
          <ul className="msg-list">{messages.map((m) => (
            <li key={m.id}><strong>{m.title}</strong><p>{m.body}</p></li>
          ))}</ul>
        </>
      )}

      <h2 className="section-head">{ui.account[lang]}</h2>
      {user
        ? <button type="button" onClick={() => signOut(auth)}>{ui.logOut[lang]}</button>
        : <p className="muted">{ui.previewMode[lang]}</p>}
    </main>
  );
}
