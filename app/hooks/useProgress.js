"use client";
import { useCallback, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/setup";
import { useAuth } from "@/components/AuthProvider";

const LS_KEY = "guide-progress";

// progress shape: { [guideSlug]: number[] }  (array of completed step indices)
export function useProgress() {
  const { user, loading: authLoading } = useAuth();
  const [progress, setProgress] = useState({});
  const [ready, setReady] = useState(false);

  // Load progress when auth state settles.
  useEffect(() => {
    let active = true;
    async function load() {
      if (authLoading) return;
      let data = {};
      if (user) {
        try {
          const snap = await getDoc(doc(db, "progress", user.uid));
          data = snap.exists() ? (snap.data().guides || {}) : {};
        } catch (e) {
          console.error("load progress failed", e);
        }
      } else {
        try {
          const raw = localStorage.getItem(LS_KEY);
          data = raw ? JSON.parse(raw) : {};
        } catch {}
      }
      if (active) {
        setProgress(data);
        setReady(true);
      }
    }
    load();
    return () => { active = false; };
  }, [user, authLoading]);

  const persist = useCallback(async (next) => {
    if (user) {
      try { await setDoc(doc(db, "progress", user.uid), { guides: next }, { merge: true }); }
      catch (e) { console.error("save progress failed", e); }
    } else {
      try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch {}
    }
  }, [user]);

  const toggleStep = useCallback((slug, index) => {
    setProgress((prev) => {
      const done = new Set(prev[slug] || []);
      done.has(index) ? done.delete(index) : done.add(index);
      const next = { ...prev, [slug]: [...done].sort((a, b) => a - b) };
      persist(next);
      return next;
    });
  }, [persist]);

  const markPriorDone = useCallback((slug, targetIndex) => {
    setProgress((prev) => {
      const done = new Set(prev[slug] || []);
      for (let i = 0; i < targetIndex; i++) {
        done.add(i);
      }
      const next = { ...prev, [slug]: [...done].sort((a, b) => a - b) };
      persist(next);
      return next;
    });
  }, [persist]);

  const isStepDone = useCallback(
    (slug, index) => (progress[slug] || []).includes(index),
    [progress]
  );

  return { progress, ready, toggleStep, markPriorDone, isStepDone };
}