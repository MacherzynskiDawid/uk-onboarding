"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/app/firebase/setup";
import { useLanguage } from "./LanguageProvider";
import { ui } from "@/lib/ui-strings";

export default function AuthForm({ initialMode = "signin" }) {
  const router = useRouter();
  const { lang } = useLanguage();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const isRegister = mode === "register";

  if (!isFirebaseConfigured) {
    return (
      <main>
        <h1>{isRegister ? ui.createAccount[lang] : ui.signIn[lang]}</h1>
        <p className="config-note">{ui.accountsUnavailable[lang]}</p>
      </main>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      if (isRegister) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(
          doc(db, "users", cred.user.uid),
          { email: cred.user.email, role: "user", active: true, createdAt: serverTimestamp() },
          { merge: true }
        );
        await addDoc(collection(db, "users", cred.user.uid, "messages"), {
          title: ui.welcomeTitle[lang],
          body: ui.welcomeBody[lang],
          from: "system",
          createdAt: serverTimestamp(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/profile");
    } catch {
      setError(ui.authError[lang]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <h1>{isRegister ? ui.createAccount[lang] : ui.signIn[lang]}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={ui.email[lang]}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="password-field">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={isRegister ? "new-password" : "current-password"}
            placeholder={ui.password[lang]}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button
            type="button"
            className="password-toggle"
            aria-pressed={showPassword}
            aria-label={showPassword ? ui.hidePassword[lang] : ui.showPassword[lang]}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? ui.hideWord[lang] : ui.showWord[lang]}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={busy}>{isRegister ? ui.signUp[lang] : ui.signIn[lang]}</button>
      </form>
      <p className="muted auth-alt">
        {isRegister ? ui.haveAccount[lang] : ui.needAccount[lang]}{" "}
        <button type="button" className="link-button" onClick={() => { setMode(isRegister ? "signin" : "register"); setError(""); }}>
          {isRegister ? ui.signIn[lang] : ui.createAccount[lang]}
        </button>
      </p>
    </main>
  );
}
