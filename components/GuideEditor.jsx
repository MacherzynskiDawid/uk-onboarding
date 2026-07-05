"use client";
import { useState } from "react";
import { doc, getDoc, setDoc, deleteDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/firebase/setup";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import { guidesInOrder } from "@/data/guides";
import { ui } from "@/lib/ui-strings";

const isPathGuide = (g) => g.pathChoice && Array.isArray(g.sections);
const isSimpleGuide = (g) => Array.isArray(g.steps) && !g.sections;
const editable = (g) => isSimpleGuide(g) || isPathGuide(g);

const blankStep = () => ({ heading: { en: "", pl: "" }, body: { en: "", pl: "" } });
const stepIncomplete = (s) =>
  !s.heading.en.trim() || !s.heading.pl.trim() || !s.body.en.trim() || !s.body.pl.trim();

export default function GuideEditor() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const [slug, setSlug] = useState("");
  const [draft, setDraft] = useState(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [hasOverride, setHasOverride] = useState(false);

  const guides = guidesInOrder.filter(editable);
  const isPath = !!draft && Array.isArray(draft.sections);

  const open = async (g) => {
    setStatus("");
    setSlug(g.slug);
    let base;
    if (isPathGuide(g)) {
      base = {
        title: { ...g.title }, summary: { ...g.summary },
        source: g.source || "", lastUpdated: g.lastUpdated || "",
        choosePrompt: { en: g.choosePrompt?.en || "", pl: g.choosePrompt?.pl || "" },
        sections: g.sections.map((s) => ({
          title: { ...s.title }, blurb: { ...s.blurb },
          steps: s.steps.map((st) => ({ heading: { ...st.heading }, body: { ...st.body } })),
        })),
      };
    } else {
      base = {
        title: { ...g.title }, summary: { ...g.summary },
        source: g.source || "", lastUpdated: g.lastUpdated || "",
        steps: g.steps.map((s) => ({ heading: { ...s.heading }, body: { ...s.body } })),
      };
    }
    try {
      const snap = await getDoc(doc(db, "guides", g.slug));
      if (snap.exists()) {
        const ov = snap.data();
        setHasOverride(true);
        if (ov.title) base.title = ov.title;
        if (ov.summary) base.summary = ov.summary;
        if (ov.source) base.source = ov.source;
        if (ov.lastUpdated) base.lastUpdated = ov.lastUpdated;
        if (isPathGuide(g)) {
          if (ov.choosePrompt) base.choosePrompt = ov.choosePrompt;
          if (Array.isArray(ov.sections) && ov.sections.length === g.sections.length) {
            base.sections = ov.sections.map((s) => ({
              title: { ...s.title }, blurb: { ...s.blurb },
              steps: (s.steps || []).map((st) => ({ heading: { ...st.heading }, body: { ...st.body } })),
            }));
          }
        } else if (Array.isArray(ov.steps) && ov.steps.length > 0) {
          base.steps = ov.steps.map((s) => ({ heading: { ...s.heading }, body: { ...s.body } }));
        }
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

  // simple-guide step ops
  const addStep = () => setDraft((d) => { const n = structuredClone(d); n.steps.push(blankStep()); return n; });
  const removeStep = (i) => {
    if (!window.confirm(ui.geRemoveStepConfirm[lang])) return;
    setDraft((d) => { const n = structuredClone(d); n.steps.splice(i, 1); return n; });
  };
  const moveStep = (i, dir) => setDraft((d) => {
    const j = i + dir; if (j < 0 || j >= d.steps.length) return d;
    const n = structuredClone(d); const [s] = n.steps.splice(i, 1); n.steps.splice(j, 0, s); return n;
  });

  // path-guide step ops (scoped to a section)
  const addPathStep = (si) => setDraft((d) => { const n = structuredClone(d); n.sections[si].steps.push(blankStep()); return n; });
  const removePathStep = (si, i) => {
    if (!window.confirm(ui.geRemoveStepConfirm[lang])) return;
    setDraft((d) => { const n = structuredClone(d); n.sections[si].steps.splice(i, 1); return n; });
  };
  const movePathStep = (si, i, dir) => setDraft((d) => {
    const j = i + dir; if (j < 0 || j >= d.sections[si].steps.length) return d;
    const n = structuredClone(d); const [s] = n.sections[si].steps.splice(i, 1); n.sections[si].steps.splice(j, 0, s); return n;
  });

  const sectionIncomplete = (s) =>
    !s.title.en.trim() || !s.title.pl.trim() || !s.blurb.en.trim() || !s.blurb.pl.trim() ||
    s.steps.length === 0 || s.steps.some(stepIncomplete);

  const save = async () => {
    if (!draft) return;
    if (isPath) {
      if (!draft.choosePrompt.en.trim() || !draft.choosePrompt.pl.trim() ||
          draft.sections.length === 0 || draft.sections.some(sectionIncomplete)) {
        setStatus(ui.geSectionIncomplete[lang]); return;
      }
    } else if (draft.steps.length === 0 || draft.steps.some(stepIncomplete)) {
      setStatus(ui.geStepIncomplete[lang]); return;
    }
    setBusy(true); setStatus("");
    try {
      const payload = {
        slug, title: draft.title, summary: draft.summary,
        source: draft.source, lastUpdated: draft.lastUpdated,
        updatedBy: user.uid, updatedAt: serverTimestamp(),
      };
      if (isPath) { payload.choosePrompt = draft.choosePrompt; payload.sections = draft.sections; }
      else { payload.steps = draft.steps; }
      await setDoc(doc(db, "guides", slug), payload);
      await addDoc(collection(db, "adminLogs"), { action: "editGuide", targetSlug: slug, by: user.uid, at: serverTimestamp() });
      setHasOverride(true);
      setStatus(ui.geSaved[lang]);
    } catch (e) { console.error(e); setStatus(ui.geError[lang]); }
    finally { setBusy(false); }
  };

  const reset = async () => {
    if (!slug) return;
    if (!window.confirm(ui.geResetConfirm[lang])) return;
    setBusy(true); setStatus("");
    try {
      await deleteDoc(doc(db, "guides", slug));
      await addDoc(collection(db, "adminLogs"), { action: "resetGuide", targetSlug: slug, by: user.uid, at: serverTimestamp() });
      setHasOverride(false);
      await open(guides.find((x) => x.slug === slug));
      setStatus(ui.geReset[lang]);
    } catch (e) { console.error(e); setStatus(ui.geError[lang]); }
    finally { setBusy(false); }
  };

  // reusable step editor; `ops` wires it to either draft.steps or draft.sections[si].steps
  const renderSteps = (steps, ops) => (
    <>
      {steps.map((st, i) => (
        <div key={i} className="ge-step">
          <span className="ge-step-n">{i + 1}</span>
          <div className="ge-step-fields">
            <label className="ge-field"><span>{ui.geStepHeadEn[lang]}</span>
              <input value={st.heading.en} onChange={(e) => ops.set(i, "heading", "en", e.target.value)} /></label>
            <label className="ge-field"><span>{ui.geStepHeadPl[lang]}</span>
              <input value={st.heading.pl} onChange={(e) => ops.set(i, "heading", "pl", e.target.value)} /></label>
            <label className="ge-field"><span>{ui.geStepBodyEn[lang]}</span>
              <textarea rows={3} value={st.body.en} onChange={(e) => ops.set(i, "body", "en", e.target.value)} /></label>
            <label className="ge-field"><span>{ui.geStepBodyPl[lang]}</span>
              <textarea rows={3} value={st.body.pl} onChange={(e) => ops.set(i, "body", "pl", e.target.value)} /></label>
            <div className="ge-step-controls">
              <button type="button" disabled={i === 0} onClick={() => ops.move(i, -1)}>{ui.geMoveUp[lang]}</button>
              <button type="button" disabled={i === steps.length - 1} onClick={() => ops.move(i, 1)}>{ui.geMoveDown[lang]}</button>
              <button type="button" className="ge-step-remove" onClick={() => ops.remove(i)}>{ui.geRemoveStep[lang]}</button>
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="ge-add-step" onClick={ops.add}>+ {ui.geAddStep[lang]}</button>
    </>
  );

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

          {isPath ? (
            <>
              <label className="ge-field"><span>{ui.geChoosePromptEn[lang]}</span>
                <input value={draft.choosePrompt.en} onChange={(e) => setField(["choosePrompt", "en"], e.target.value)} /></label>
              <label className="ge-field"><span>{ui.geChoosePromptPl[lang]}</span>
                <input value={draft.choosePrompt.pl} onChange={(e) => setField(["choosePrompt", "pl"], e.target.value)} /></label>
              {draft.sections.map((sec, si) => (
                <div key={si} className="ge-section">
                  <h4>{ui.gePathLabel[lang]} {si + 1}</h4>
                  <label className="ge-field"><span>{ui.gePathTitleEn[lang]}</span>
                    <input value={sec.title.en} onChange={(e) => setField(["sections", si, "title", "en"], e.target.value)} /></label>
                  <label className="ge-field"><span>{ui.gePathTitlePl[lang]}</span>
                    <input value={sec.title.pl} onChange={(e) => setField(["sections", si, "title", "pl"], e.target.value)} /></label>
                  <label className="ge-field"><span>{ui.gePathBlurbEn[lang]}</span>
                    <textarea rows={2} value={sec.blurb.en} onChange={(e) => setField(["sections", si, "blurb", "en"], e.target.value)} /></label>
                  <label className="ge-field"><span>{ui.gePathBlurbPl[lang]}</span>
                    <textarea rows={2} value={sec.blurb.pl} onChange={(e) => setField(["sections", si, "blurb", "pl"], e.target.value)} /></label>
                  <h3 className="ge-steps-head">{ui.geSteps[lang]}</h3>
                  {renderSteps(sec.steps, {
                    set: (i, field, l, v) => setField(["sections", si, "steps", i, field, l], v),
                    move: (i, dir) => movePathStep(si, i, dir),
                    remove: (i) => removePathStep(si, i),
                    add: () => addPathStep(si),
                  })}
                </div>
              ))}
            </>
          ) : (
            <>
              <h3 className="ge-steps-head">{ui.geSteps[lang]}</h3>
              {renderSteps(draft.steps, {
                set: (i, field, l, v) => setField(["steps", i, field, l], v),
                move: moveStep, remove: removeStep, add: addStep,
              })}
            </>
          )}

          <div className="ge-actions">
            <button type="button" className="ge-save" disabled={busy} onClick={save}>{ui.geSave[lang]}</button>
            <button type="button" className="ge-cancel" disabled={busy} onClick={close}>{ui.geCancel[lang]}</button>
            {hasOverride && <button type="button" className="ge-reset" disabled={busy} onClick={reset}>{ui.geResetDefault[lang]}</button>}
            {status && <span className="ge-status">{status}</span>}
          </div>
        </div>
      )}
    </section>
  );
}