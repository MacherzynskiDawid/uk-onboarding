"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/app/firebase/setup";

const AuthContext = createContext({ user: null, loading: true, role: "user", active: true });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // If Firebase isn't configured, there's nothing to wait for.
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [role, setRole] = useState("user");
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setUser(fbUser);
      if (fbUser) {
        try {
          const ref = doc(db, "users", fbUser.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const d = snap.data();
            setRole(d.role || "user");
            setActive(d.active !== false);
          } else {
            await setDoc(ref, { email: fbUser.email, role: "user", active: true, createdAt: serverTimestamp() }, { merge: true });
            setRole("user");
            setActive(true);
          }
        } catch (e) {
          console.error("load profile failed", e);
          setRole("user");
          setActive(true);
        }
      } else {
        setRole("user");
        setActive(true);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, role, active }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
