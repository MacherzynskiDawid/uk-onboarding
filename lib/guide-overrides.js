// Firestore-override layer for guides. Static data/guides/*.js are the default ("seed");
// admin edits are stored at guides/{slug} and merged at read time, with a safe fallback.
import { db, isFirebaseConfigured } from "@/app/firebase/setup";
import { doc, getDoc } from "firebase/firestore";

function validStep(s) {
  return s && s.heading && s.heading.en && s.heading.pl &&
         s.body && s.body.en && s.body.pl;
}
function validSection(s) {
  return s && s.title && s.title.en && s.title.pl &&
         s.blurb && s.blurb.en && s.blurb.pl &&
         Array.isArray(s.steps) && s.steps.length > 0 && s.steps.every(validStep);
}

export function mergeOverride(staticGuide, ov) {
  if (!ov || typeof ov !== "object") return staticGuide;
  const g = { ...staticGuide };
  if (ov.title && ov.title.en && ov.title.pl) g.title = ov.title;
  if (ov.summary && ov.summary.en && ov.summary.pl) g.summary = ov.summary;
  if (typeof ov.source === "string" && ov.source) g.source = ov.source;
  if (typeof ov.lastUpdated === "string" && ov.lastUpdated) g.lastUpdated = ov.lastUpdated;

  // Layer 2 (simple guides): self-contained, fully-bilingual step list of any length.
  if (Array.isArray(ov.steps) && ov.steps.length > 0 && ov.steps.every(validStep)) {
    g.steps = ov.steps.map((s) => ({ heading: { ...s.heading }, body: { ...s.body } }));
  }

  // Layer 3 (path-choice guides): choose prompt + nested sections.
  // Section COUNT must match the static guide, so path progress keys (slug__p{i}) never drift.
  if (ov.choosePrompt && ov.choosePrompt.en && ov.choosePrompt.pl) g.choosePrompt = ov.choosePrompt;
  if (Array.isArray(staticGuide.sections) &&
      Array.isArray(ov.sections) &&
      ov.sections.length === staticGuide.sections.length &&
      ov.sections.every(validSection)) {
    g.sections = ov.sections.map((s) => ({
      title: { ...s.title }, blurb: { ...s.blurb },
      steps: s.steps.map((st) => ({ heading: { ...st.heading }, body: { ...st.body } })),
    }));
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