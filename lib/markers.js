import { db, isFirebaseConfigured } from "@/app/firebase/setup";
import { collection, getDocs } from "firebase/firestore";

// Category metadata. Labels live in ui-strings (bilingual); colour drives the map pin.
export const MARKER_CATEGORIES = [
  { id: "post-office", colour: "#d10a0a", labelKey: "mapCatPostOffice" },
  { id: "ukvcas",      colour: "#4338ca", labelKey: "mapCatUkvcas" },
  { id: "jobcentre",   colour: "#18a957", labelKey: "mapCatJobcentre" },
];

export const categoryColour = (id) =>
  (MARKER_CATEGORIES.find((c) => c.id === id) || {}).colour || "#6b7088";

export async function fetchMarkers() {
  if (!isFirebaseConfigured || !db) return [];
  try {
    const snap = await getDocs(collection(db, "markers"));
    return snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((m) => typeof m.lat === "number" && typeof m.lng === "number");
  } catch (e) {
    console.error("markers fetch failed", e);
    return [];
  }
}