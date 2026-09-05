"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/app/firebase/setup";
import { useLanguage } from "./LanguageProvider";
import { ui } from "@/lib/ui-strings";

// Maps Firebase Auth error codes to specific, user-facing strings. Any code not
// listed here falls back to the existing generic message.
function authMessage(code, lang) {
  switch (code) {
    case "auth/email-already-in-use":  return ui.emailInUse[lang];
    case "auth/invalid-email":         return ui.invalidEmail[lang];
    case "auth/weak-password":         return ui.weakPassword[lang];
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":        return ui.invalidCredentials[lang];
    case "auth/too-many-requests":     return ui.tooManyRequests[lang];
    case "auth/network-request-failed":return ui.networkError[lang];
    default:                           return ui.authError[lang];
  }
}

export default function AuthForm({ initialMode = "signin" }) {
  const router = useRouter();
  const { lang } = useLanguage();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
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
    setBusy(true); setError(""); setNotice("");

    // Stage 1: authentication. A failure here means no account exists, so the
    // form reports the specific cause and stops.
    let cred;
    try {
      if (isRegister) {
        cred = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(authMessage(err?.code, lang));
      setBusy(false);
      return;
    }

    // Stage 2: profile provisioning. The account already exists at this point,
    // so a Firestore failure is reported as a partial success rather than as an
    // authentication error.
    let profileComplete = true;
    if (isRegister) {
      try {
        await setDoc(
          doc(db, "users", cred.user.uid),
          { email: cred.user.email, role: "user", active: true, createdAt: serverTimestamp() },
          { merge: true }
        );
        await addDoc(collection(db, "users", cred.user.uid, "messages"), {
          title: `${ui.welcomeTitle.en} / ${ui.welcomeTitle.pl}`,
          body: `${ui.welcomeBody.en}\n\n---\n\n${ui.welcomeBody.pl}`,
          from: "system",
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        profileComplete = false;
        console.error("Profile provisioning failed after account creation:", err?.code, err);
      }
    }

    // Stage 3: confirm, then redirect. Registration shows a confirmation before
    // navigating; sign-in navigates immediately.
    if (isRegister) {
      setNotice(profileComplete ? ui.accountCreated[lang] : ui.accountCreatedPartial[lang]);
      setTimeout(() => router.push("/profile"), 1500);
      return;
    }

    setBusy(false);
    router.push("/profile");
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
        {error && <p className="error" role="alert">{error}</p>}
        {notice && <p className="notice" role="status">{notice}</p>}
        <button type="submit" disabled={busy}>{isRegister ? ui.signUp[lang] : ui.signIn[lang]}</button>
      </form>
      <p className="muted auth-alt">
        {isRegister ? ui.haveAccount[lang] : ui.needAccount[lang]}{" "}
        <button type="button" className="link-button" onClick={() => { setMode(isRegister ? "signin" : "register"); setError(""); setNotice(""); }}>
          {isRegister ? ui.signIn[lang] : ui.createAccount[lang]}
        </button>
      </p>
    </main>
  );
}
