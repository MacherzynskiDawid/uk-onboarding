"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "@/app/firebase/setup";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { ui } from "@/lib/ui-strings";

// Account deletion (GDPR right to erasure / CMA clear-cancellation path).
// Order matters: Firestore documents are removed BEFORE the Auth account,
// because once the Auth user is deleted the security rules see no
// request.auth and would deny every cleanup write.
export default function DeleteAccount() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!user) return null;

  async function handleDelete(e) {
    e.preventDefault();
    if (busy) return;
    setError("");
    setBusy(true);
    try {
      // 1) Re-authenticate (Firebase requires a recent login to delete;
      //    this also acts as the explicit confirmation step).
      const cred = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(auth.currentUser, cred);

      // 2) Delete the user's Firestore data while still authenticated.
      //    a) messages subcollection (must be emptied doc-by-doc)
      const msgSnap = await getDocs(collection(db, "users", user.uid, "messages"));
      await Promise.all(msgSnap.docs.map((m) => deleteDoc(m.ref)));
      //    b) profile record and progress document
      await deleteDoc(doc(db, "users", user.uid));
      await deleteDoc(doc(db, "progress", user.uid));

      // 3) Delete the Auth account itself.
      await deleteUser(auth.currentUser);

      // 4) Clear any local fallback progress and leave.
      try { localStorage.removeItem("guide-progress"); } catch {}
      router.push("/");
    } catch (err) {
      console.error("account deletion failed", err);
      if (err?.code === "auth/wrong-password" || err?.code === "auth/invalid-credential") {
        setError(ui.delWrongPassword[lang]);
      } else {
        setError(ui.delFailed[lang]);
      }
      setBusy(false);
    }
  }

  return (
    <section className="danger-zone">
      <h2>{ui.delTitle[lang]}</h2>
      <p className="muted">{ui.delExplain[lang]}</p>

      {!open ? (
        <button type="button" className="btn-danger" onClick={() => setOpen(true)}>
          {ui.delButton[lang]}
        </button>
      ) : (
        <form onSubmit={handleDelete} className="danger-confirm">
          <p className="danger-warning">{ui.delWarning[lang]}</p>
          <label>
            {ui.delPasswordLabel[lang]}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error && <p className="danger-error">{error}</p>}
          <div className="danger-actions">
            <button type="submit" className="btn-danger" disabled={busy || !password}>
              {busy ? ui.delWorking[lang] : ui.delConfirm[lang]}
            </button>
            <button type="button" className="btn-cancel" onClick={() => { setOpen(false); setPassword(""); setError(""); }}>
              {ui.delCancel[lang]}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
