// Firestore-override layer for guides.
// Static data/guides/*.js remain the always-works default ("seed").
// When an admin edits a guide, an override doc is stored at guides/{slug} and
// merged on top of the static guide at read time. If Firestore is absent or the
// override is malformed, the static guide is used unchanged (defensive).
import { db, isFirebaseConfigured } from "@/app/firebase/setup";
import { doc, getDoc } from "firebase/firestore";

export function mergeOverride(staticGuide, ov) {
  if (!ov || typeof ov !== "object") return staticGuide;
  const g = { ...staticGuide };
  if (ov.title && ov.title.en && ov.title.pl) g.title = ov.title;
  if (ov.summary && ov.summary.en && ov.summary.pl) g.summary = ov.summary;
  if (typeof ov.source === "string" && ov.source) g.source = ov.source;
  if (typeof ov.lastUpdated === "string" && ov.lastUpdated) g.lastUpdated = ov.lastUpdated;
  // Steps: only override when shapes match (Layer 1 edits existing steps, no add/remove).
  if (Array.isArray(ov.steps) && Array.isArray(staticGuide.steps) &&
      ov.steps.length === staticGuide.steps.length) {
    g.steps = staticGuide.steps.map((s, i) => {
      const o = ov.steps[i] || {};
      return {
        ...s,
        heading: (o.heading && o.heading.en && o.heading.pl) ? o.heading : s.heading,
        body: (o.body && o.body.en && o.body.pl) ? o.body : s.body,
      };
    });
  }
  return g;
}

export async function fetchGuideOverride(slug) {
  if (!isFirebaseConfigured || !db) return null;
  try {
    const snap = await getDoc(doc(db, "guides", slug));
    return snap.exists() ? snap.data() : null;
  } catch (e) {
    console.error("guide override fetch failed", e);
    return null;
  }
}
