"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/firebase/setup";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { ui } from "@/lib/ui-strings";
import GuideEditor from "@/components/GuideEditor";
import MarkerEditor from "@/components/MarkerEditor";

export default function Admin() {
  const { user, loading, role } = useAuth();
  const { lang } = useLanguage();
  const [users, setUsers] = useState([]);
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState("users");

  const reload = async () => {
    const snap = await getDocs(collection(db, "users"));
    setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    if (role === "admin") reload().catch(console.error);
  }, [role]);

  if (loading) return <main><p className="muted">{"\u2026"}</p></main>;
  if (!user || role !== "admin") {
    return <main><h1>{ui.adminTitle[lang]}</h1><p className="muted">{ui.adminNoAccess[lang]}</p></main>;
  }

  const setRoleFor = async (u, newRole) => {
    setBusy(true);
    try { await updateDoc(doc(db, "users", u.id), { role: newRole }); await reload(); }
    finally { setBusy(false); }
  };

  const deactivate = async (u) => {
    const reason = window.prompt(ui.deactivateReasonPrompt[lang]);
    if (!reason) return; // justification is required
    setBusy(true);
    try {
      await updateDoc(doc(db, "users", u.id), {
        active: false, deactivatedReason: reason, deactivatedAt: serverTimestamp(), deactivatedBy: user.uid,
      });
      await addDoc(collection(db, "adminLogs"), {
        action: "deactivate", targetUid: u.id, reason, by: user.uid, at: serverTimestamp(),
      });
      await reload();
    } finally { setBusy(false); }
  };

  const reactivate = async (u) => {
    setBusy(true);
    try {
      await updateDoc(doc(db, "users", u.id), { active: true, deactivatedReason: null, deactivatedAt: null, deactivatedBy: null });
      await addDoc(collection(db, "adminLogs"), { action: "reactivate", targetUid: u.id, by: user.uid, at: serverTimestamp() });
      await reload();
    } finally { setBusy(false); }
  };

  const sendMessage = async (u) => {
    const title = window.prompt(ui.msgTitlePrompt[lang]);
    if (!title) return;
    const body = window.prompt(ui.msgBodyPrompt[lang]);
    if (!body) return;
    setBusy(true);
    try {
      await addDoc(collection(db, "users", u.id, "messages"), { title, body, from: user.uid, createdAt: serverTimestamp() });
    } finally { setBusy(false); }
  };

  const tabClass = (id) => `admin-tab ${tab === id ? "admin-tab-active" : ""}`;

  return (
    <main>
      <h1>{ui.adminTitle[lang]}</h1>

      <div className="admin-tabs">
        <button type="button" className={tabClass("users")} onClick={() => setTab("users")}>{ui.adminUsers[lang]}</button>
        <button type="button" className={tabClass("guides")} onClick={() => setTab("guides")}>{ui.geTitle[lang]}</button>
        <button type="button" className={tabClass("map")} onClick={() => setTab("map")}>{ui.mkTitle[lang]}</button>
      </div>

      {tab === "users" && (
        <>
          <p className="muted">{ui.adminIntro[lang]}</p>
          <ul className="admin-list">
            {users.map((u) => (
              <li key={u.id} className={u.active === false ? "inactive" : ""}>
                <div className="admin-user">
                  <strong>{u.email || u.id}</strong>
                  <span className="admin-meta">{u.role || "user"}{u.active === false ? ` \u00B7 ${ui.deactivatedWord[lang]}` : ""}</span>
                  {u.active === false && u.deactivatedReason && (
                    <span className="admin-reason">{ui.reasonWord[lang]}: {u.deactivatedReason}</span>
                  )}
                </div>
                <div className="admin-actions">
                  {u.role === "admin"
                    ? <button type="button" disabled={busy} onClick={() => setRoleFor(u, "user")}>{ui.makeUser[lang]}</button>
                    : <button type="button" disabled={busy} onClick={() => setRoleFor(u, "admin")}>{ui.makeAdmin[lang]}</button>}
                  {u.active === false
                    ? <button type="button" disabled={busy} onClick={() => reactivate(u)}>{ui.reactivate[lang]}</button>
                    : <button type="button" disabled={busy} onClick={() => deactivate(u)}>{ui.deactivate[lang]}</button>}
                  <button type="button" disabled={busy} onClick={() => sendMessage(u)}>{ui.sendMessage[lang]}</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {tab === "guides" && <GuideEditor />}
      {tab === "map" && <MarkerEditor />}
    </main>
  );
}
