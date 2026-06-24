"use client";
import { useState } from "react";
import { doc, getDoc, setDoc, deleteDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/firebase/setup";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import { guidesInOrder } from "@/data/guides";
import { ui } from "@/lib/ui-strings";

// Layer 1: edit existing fields of simple-step guides (title, summary, source,
// last-updated date, and each step's heading/body in both languages).
// Path-choice guides (sections) are handled in a later layer.
const editable = (g) => Array.isArray(g.steps) && !g.sections;

export default function GuideEditor() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const [slug, setSlug] = useState("");
  const [draft, setDraft] = useState(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [hasOverride, setHasOverride] = useState(false);

  const guides = guidesInOrder.filter(editable);

  const open = async (g) => {
    setStatus("");
    setSlug(g.slug);
    // start from the static guide, then overlay any saved override
    let base = {
      title: { ...g.title }, summary: { ...g.summary },
      source: g.source || "", lastUpdated: g.lastUpdated || "",
      steps: g.steps.map((s) => ({ heading: { ...s.heading }, body: { ...s.body } })),
    };
    try {
      const snap = await getDoc(doc(db, "guides", g.slug));
      if (snap.exists()) {
        const ov = snap.data();
        setHasOverride(true);
        if (ov.title) base.title = ov.title;
        if (ov.summary) base.summary = ov.summary;
        if (ov.source) base.source = ov.source;
        if (ov.lastUpdated) base.lastUpdated = ov.lastUpdated;
        if (Array.isArray(ov.steps) && ov.steps.length === base.steps.length) base.steps = ov.steps;
      } else {
        setHasOverride(false);
      }
    } catch (e) { console.error(e); }
    setDraft(base);
  };

  const close = () => { setSlug(""); setDraft(null); setStatus(""); };

  const setField = (path, value) => {
    setDraft((d) => {
      const n = structuredClone(d);
      let t = n;
      for (let i = 0; i < path.length - 1; i++) t = t[path[i]];
      t[path[path.length - 1]] = value;
      return n;
    });
  };

  const save = async () => {
    if (!draft) return;
    setBusy(true); setStatus("");
    try {
      await setDoc(doc(db, "guides", slug), {
        slug, title: draft.title, summary: draft.summary,
        source: draft.source, lastUpdated: draft.lastUpdated, steps: draft.steps,
        updatedBy: user.uid, updatedAt: serverTimestamp(),
      });
      await addDoc(collection(db, "adminLogs"), {
        action: "editGuide", targetSlug: slug, by: user.uid, at: serverTimestamp(),
      });
      setHasOverride(true);
      setStatus(ui.geSaved[lang]);
    } catch (e) {
      console.error(e); setStatus(ui.geError[lang]);
    } finally { setBusy(false); }
  };

  const reset = async () => {
    if (!slug) return;
    if (!window.confirm(ui.geResetConfirm[lang])) return;
    setBusy(true); setStatus("");
    try {
      await deleteDoc(doc(db, "guides", slug));
      await addDoc(collection(db, "adminLogs"), {
        action: "resetGuide", targetSlug: slug, by: user.uid, at: serverTimestamp(),
      });
      setHasOverride(false);
      const g = guides.find((x) => x.slug === slug);
      await open(g);
      setStatus(ui.geReset[lang]);
    } catch (e) {
      console.error(e); setStatus(ui.geError[lang]);
    } finally { setBusy(false); }
  };

  return (
    <section className="guide-editor">
      <h2 className="section-head">{ui.geTitle[lang]}</h2>
      <p className="muted">{ui.geIntro[lang]}</p>

      {!draft && (
        <ul className="ge-list">
          {guides.map((g) => (
            <li key={g.slug}>
              <span>{g.title[lang]}</span>
              <button type="button" onClick={() => open(g)}>{ui.geEdit[lang]}</button>
            </li>
          ))}
        </ul>
      )}

      {draft && (
        <div className="ge-form">
          <div className="ge-head">
            <strong>{draft.title[lang] || slug}</strong>
            {hasOverride && <span className="ge-badge">{ui.geEdited[lang]}</span>}
            <button type="button" className="ge-back" onClick={close}>{ui.geBack[lang]}</button>
          </div>

          <label className="ge-field"><span>{ui.geTitleEn[lang]}</span>
            <input value={draft.title.en} onChange={(e) => setField(["title", "en"], e.target.value)} /></label>
          <label className="ge-field"><span>{ui.geTitlePl[lang]}</span>
            <input value={draft.title.pl} onChange={(e) => setField(["title", "pl"], e.target.value)} /></label>

          <label className="ge-field"><span>{ui.geSummaryEn[lang]}</span>
            <textarea rows={2} value={draft.summary.en} onChange={(e) => setField(["summary", "en"], e.target.value)} /></label>
          <label className="ge-field"><span>{ui.geSummaryPl[lang]}</span>
            <textarea rows={2} value={draft.summary.pl} onChange={(e) => setField(["summary", "pl"], e.target.value)} /></label>

          <div className="ge-row">
            <label className="ge-field"><span>{ui.geSource[lang]}</span>
              <input value={draft.source} onChange={(e) => setField(["source"], e.target.value)} /></label>
            <label className="ge-field ge-date"><span>{ui.geUpdated[lang]}</span>
              <input type="date" value={draft.lastUpdated} onChange={(e) => setField(["lastUpdated"], e.target.value)} /></label>
          </div>

          <h3 className="ge-steps-head">{ui.geSteps[lang]}</h3>
          {draft.steps.map((st, i) => (
            <div key={i} className="ge-step">
              <span className="ge-step-n">{i + 1}</span>
              <div className="ge-step-fields">
                <label className="ge-field"><span>{ui.geStepHeadEn[lang]}</span>
                  <input value={st.heading.en} onChange={(e) => setField(["steps", i, "heading", "en"], e.target.value)} /></label>
                <label className="ge-field"><span>{ui.geStepHeadPl[lang]}</span>
                  <input value={st.heading.pl} onChange={(e) => setField(["steps", i, "heading", "pl"], e.target.value)} /></label>
                <label className="ge-field"><span>{ui.geStepBodyEn[lang]}</span>
                  <textarea rows={3} value={st.body.en} onChange={(e) => setField(["steps", i, "body", "en"], e.target.value)} /></label>
                <label className="ge-field"><span>{ui.geStepBodyPl[lang]}</span>
                  <textarea rows={3} value={st.body.pl} onChange={(e) => setField(["steps", i, "body", "pl"], e.target.value)} /></label>
              </div>
            </div>
          ))}

          <div className="ge-actions">
            <button type="button" className="ge-save" disabled={busy} onClick={save}>{ui.geSave[lang]}</button>
            {hasOverride && <button type="button" className="ge-reset" disabled={busy} onClick={reset}>{ui.geResetDefault[lang]}</button>}
            {status && <span className="ge-status">{status}</span>}
          </div>
        </div>
      )}
    </section>
  );
}
