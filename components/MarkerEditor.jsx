"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc, addDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/firebase/setup";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import { ui } from "@/lib/ui-strings";
import { MARKER_CATEGORIES } from "@/lib/markers";
import { SEED_MARKERS } from "@/data/guides/seed-markers";

const blank = () => ({
  category: "post-office", name: "", lat: "", lng: "", address: "",
  note: { en: "", pl: "" }, officialFinderUrl: "", lastReviewed: "",
});

export default function MarkerEditor() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const [list, setList] = useState([]);
  const [draft, setDraft] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  const load = async () => {
    try {
      const snap = await getDocs(collection(db, "markers"));
      setList(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error(e); }
  };
  useEffect(() => { load(); }, []);

  const startNew = () => { setEditingId("new"); setDraft(blank()); setStatus(""); };
  const startEdit = (m) => {
    setEditingId(m.id);
    setDraft({
      category: m.category || "post-office", name: m.name || "",
      lat: m.lat ?? "", lng: m.lng ?? "", address: m.address || "",
      note: { en: m.note?.en || "", pl: m.note?.pl || "" },
      officialFinderUrl: m.officialFinderUrl || "", lastReviewed: m.lastReviewed || "",
    });
    setStatus("");
  };
  const close = () => { setEditingId(null); setDraft(null); setStatus(""); };
  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }));
  const setNote = (l, v) => setDraft((d) => ({ ...d, note: { ...d.note, [l]: v } }));

  const save = async () => {
    if (!draft) return;
    const lat = parseFloat(draft.lat), lng = parseFloat(draft.lng);
    if (!draft.name.trim() || Number.isNaN(lat) || Number.isNaN(lng) ||
        !draft.note.en.trim() || !draft.note.pl.trim()) {
      setStatus(ui.mkIncomplete[lang]); return;
    }
    setBusy(true); setStatus("");
    const payload = {
      category: draft.category, name: draft.name.trim(), lat, lng,
      address: draft.address.trim(), note: draft.note,
      officialFinderUrl: draft.officialFinderUrl.trim(),
      lastReviewed: draft.lastReviewed, updatedBy: user.uid, updatedAt: serverTimestamp(),
    };
    try {
      if (editingId === "new") await addDoc(collection(db, "markers"), payload);
      else await setDoc(doc(db, "markers", editingId), payload);
      await load(); close();
    } catch (e) { console.error(e); setStatus(ui.geError[lang]); }
    finally { setBusy(false); }
  };

  const remove = async (id) => {
    if (!window.confirm(ui.mkDeleteConfirm[lang])) return;
    try { await deleteDoc(doc(db, "markers", id)); await load(); }
    catch (e) { console.error(e); }
  };

  const seedSamples = async () => {
    const ready = SEED_MARKERS.filter((m) => typeof m.lat === "number" && typeof m.lng === "number");
    if (ready.length === 0) { setStatus("Add lat/lng to at least one entry in seed-markers.js first."); return; }
    if (!window.confirm(`Seed ${ready.length} sample location(s)?`)) return;
    setBusy(true); setStatus("");
    try {
      for (const m of ready) {
        await addDoc(collection(db, "markers"), {
          category: m.category, name: m.name, lat: m.lat, lng: m.lng,
          address: m.address || "", note: m.note, officialFinderUrl: m.officialFinderUrl || "",
          lastReviewed: m.lastReviewed || "", updatedBy: user.uid, updatedAt: serverTimestamp(),
        });
      }
      await load();
      setStatus(`Seeded ${ready.length} location(s).`);
    } catch (e) { console.error(e); setStatus(ui.geError[lang]); }
    finally { setBusy(false); }
  };

  return (
    <section className="guide-editor">
      <h2 className="section-head">{ui.mkTitle[lang]}</h2>
      <p className="muted">{ui.mkIntro[lang]}</p>

      {!draft && (
        <>
          <div className="ge-actions">
            <button type="button" className="ge-add-step" onClick={startNew}>+ {ui.mkAdd[lang]}</button>
            <button type="button" className="ge-cancel" onClick={seedSamples}>Seed sample locations</button>
            {status && <span className="ge-status">{status}</span>}
          </div>
          <ul className="ge-list">
            {list.map((m) => (
              <li key={m.id}>
                <span>{m.name} <span className="muted">· {m.category}</span></span>
                <span className="ge-step-controls">
                  <button type="button" onClick={() => startEdit(m)}>{ui.geEdit[lang]}</button>
                  <button type="button" className="ge-step-remove" onClick={() => remove(m.id)}>{ui.geRemoveStep[lang]}</button>
                </span>
              </li>
            ))}
          </ul>
        </>
      )}

      {draft && (
        <div className="ge-form">
          <label className="ge-field"><span>{ui.mkCategory[lang]}</span>
            <select value={draft.category} onChange={(e) => set("category", e.target.value)}>
              {MARKER_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{ui[c.labelKey][lang]}</option>)}
            </select></label>
          <label className="ge-field"><span>{ui.mkName[lang]}</span>
            <input value={draft.name} onChange={(e) => set("name", e.target.value)} /></label>
          <div className="ge-row">
            <label className="ge-field"><span>{ui.mkLat[lang]}</span>
              <input value={draft.lat} onChange={(e) => set("lat", e.target.value)} /></label>
            <label className="ge-field"><span>{ui.mkLng[lang]}</span>
              <input value={draft.lng} onChange={(e) => set("lng", e.target.value)} /></label>
          </div>
          <label className="ge-field"><span>{ui.mkAddress[lang]}</span>
            <input value={draft.address} onChange={(e) => set("address", e.target.value)} /></label>
          <label className="ge-field"><span>{ui.mkNoteEn[lang]}</span>
            <input value={draft.note.en} onChange={(e) => setNote("en", e.target.value)} /></label>
          <label className="ge-field"><span>{ui.mkNotePl[lang]}</span>
            <input value={draft.note.pl} onChange={(e) => setNote("pl", e.target.value)} /></label>
          <label className="ge-field"><span>{ui.mkFinder[lang]}</span>
            <input value={draft.officialFinderUrl} onChange={(e) => set("officialFinderUrl", e.target.value)} /></label>
          <label className="ge-field ge-date"><span>{ui.geUpdated[lang]}</span>
            <input type="date" value={draft.lastReviewed} onChange={(e) => set("lastReviewed", e.target.value)} /></label>
          <div className="ge-actions">
            <button type="button" className="ge-save" disabled={busy} onClick={save}>{ui.geSave[lang]}</button>
            <button type="button" className="ge-cancel" disabled={busy} onClick={close}>{ui.geCancel[lang]}</button>
            {status && <span className="ge-status">{status}</span>}
          </div>
        </div>
      )}
    </section>
  );
}
