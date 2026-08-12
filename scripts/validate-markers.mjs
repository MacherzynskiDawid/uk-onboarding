// scripts/validate-markers.mjs
// Validates data/guides/seed-markers.js before seeding Firestore.
// Run from the project root:  node scripts/validate-markers.mjs
//
// FAIL  = the map or seeder will misbehave (marker won't render, wrong category, etc.)
// WARN  = probably a mistake or an incomplete entry; review before seeding.

import { SEED_MARKERS } from "../data/guides/seed-markers.js";

const CATEGORIES = ["post-office", "ukvcas", "jobcentre"];

// Mainland UK + NI bounding box
const UK = { latMin: 49.8, latMax: 60.95, lngMin: -8.65, lngMax: 1.8 };

// Coarse postcode-area sanity check: approx centroid + radius (km).
// Warning-only; catches "pasted the wrong pin", not small offsets.
const POSTCODE_AREAS = {
  B:  [52.48, -1.90, 45],  CV: [52.41, -1.51, 45], // Birmingham, Coventry
  CR: [51.37, -0.10, 40],  BR: [51.40,  0.02, 40], // Croydon, Bromley
  E:  [51.52, -0.05, 35],  EC: [51.52, -0.09, 35],
  N:  [51.56, -0.11, 35],  NW: [51.55, -0.19, 35],
  SE: [51.47, -0.06, 35],  SW: [51.46, -0.17, 35],
  W:  [51.51, -0.20, 35],  WC: [51.52, -0.12, 35],
  DA: [51.44,  0.21, 40],  EN: [51.66, -0.07, 40],
  HA: [51.58, -0.34, 40],  IG: [51.57,  0.07, 40],
  KT: [51.38, -0.28, 40],  RM: [51.57,  0.18, 40],
  SM: [51.36, -0.19, 40],  TW: [51.45, -0.35, 40],
  UB: [51.53, -0.42, 40],  WD: [51.66, -0.40, 40],
  CF: [51.48, -3.18, 45],  SA: [51.62, -3.94, 55], NP: [51.58, -2.99, 45], // Cardiff, Swansea, Newport
  BT: [54.60, -6.50, 110],                                                 // all of Northern Ireland
  S:  [53.38, -1.47, 45],  M:  [53.48, -2.24, 45], L:  [53.41, -2.98, 45],
  LS: [53.80, -1.55, 45],  BD: [53.80, -1.75, 45], HU: [53.76, -0.33, 50],
  YO: [53.96, -1.08, 55],  NE: [54.98, -1.61, 55], NG: [52.95, -1.15, 45],
  LE: [52.63, -1.13, 45],  DE: [52.92, -1.48, 45], ST: [53.00, -2.18, 45],
  PR: [53.76, -2.70, 50],  G:  [55.86, -4.25, 55], EH: [55.95, -3.19, 50],
  AB: [57.15, -2.09, 80],  DD: [56.46, -2.97, 55],
  BS: [51.45, -2.59, 45],  SO: [50.90, -1.40, 45], PO: [50.80, -1.08, 45],
  OX: [51.75, -1.26, 45],  CB: [52.20,  0.12, 45],
  PL: [50.38, -4.14, 55],  EX: [50.72, -3.53, 55], TR: [50.26, -5.05, 55],
  LL: [53.20, -3.50, 75],                                                  // North Wales (large area)
};

const kmBetween = (a, b, c, d) => {
  const R = 6371, t = Math.PI / 180;
  const dLat = (c - a) * t, dLng = (d - b) * t;
  const h = Math.sin(dLat / 2) ** 2 +
    Math.cos(a * t) * Math.cos(c * t) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

const postcodeArea = (address = "") => {
  const m = String(address).toUpperCase().match(/\b([A-Z]{1,2})\d[A-Z\d]?\s*\d[A-Z]{2}\b/);
  return m ? m[1] : null;
};

const isNum = (v) => typeof v === "number" && Number.isFinite(v);
const results = [];
const add = (i, level, msg) => results.push({ i, level, msg });

SEED_MARKERS.forEach((m, i) => {
  const label = m.name || `(unnamed entry ${i + 1})`;

  if (!CATEGORIES.includes(m.category))
    add(i, "FAIL", `category "${m.category}" is not one of ${CATEGORIES.join(" / ")}`);
  if (!m.name || !String(m.name).trim()) add(i, "FAIL", "name is empty");

  // Coordinates, such as mirrors fetchMarkers(): non-numbers never render.
  if (!isNum(m.lat) || !isNum(m.lng)) {
    add(i, "FAIL", "lat/lng missing or not numeric, this marker will NOT render");
  } else {
    const inUK =
      m.lat >= UK.latMin && m.lat <= UK.latMax &&
      m.lng >= UK.lngMin && m.lng <= UK.lngMax;
    const swapped =
      m.lng >= UK.latMin && m.lng <= UK.latMax &&
      m.lat >= UK.lngMin && m.lat <= UK.lngMax;
    if (!inUK)
      add(i, "FAIL", `coords (${m.lat}, ${m.lng}) are outside the UK${swapped ? " , looks like lat and lng are SWAPPED" : ""}`);

    const area = postcodeArea(m.address);
    if (inUK && area && POSTCODE_AREAS[area]) {
      const [clat, clng, radius] = POSTCODE_AREAS[area];
      const d = kmBetween(m.lat, m.lng, clat, clng);
      if (d > radius)
        add(i, "WARN", `coords are ~${Math.round(d)} km from the ${area} postcode area, wrong pin pasted?`);
    } else if (inUK && area && !POSTCODE_AREAS[area]) {
      add(i, "WARN", `postcode area "${area}" not in the sanity-check table (coords not cross-checked)`);
    }
  }

  if (!m.address || !String(m.address).trim())
    add(i, "WARN", "address is empty (popup will show name only)");
  if (!m.address || !postcodeArea(m.address))
    add(i, "WARN", "no UK postcode found in address, harder for users to verify");

  if (!m.note?.en?.trim()) add(i, "WARN", "note.en is empty");
  if (!m.note?.pl?.trim())
    add(i, "WARN", "note.pl is empty (seeder allows it, but the editor's Save will later require it)");

  if (!m.officialFinderUrl) add(i, "WARN", "officialFinderUrl is empty");
  else if (!/^https:\/\//.test(m.officialFinderUrl))
    add(i, "WARN", `officialFinderUrl should start with https:// (got "${m.officialFinderUrl}")`);

  if (!m.lastReviewed || !/^\d{4}-\d{2}-\d{2}$/.test(m.lastReviewed))
    add(i, "WARN", "lastReviewed missing or not YYYY-MM-DD");

  // stash label for printing
  m.__label = label;
});

// Duplicates
const seenNames = new Map();
SEED_MARKERS.forEach((m, i) => {
  const key = (m.name || "").trim().toLowerCase();
  if (!key) return;
  if (seenNames.has(key))
    add(i, "WARN", `duplicate name of entry ${seenNames.get(key) + 1}`);
  else seenNames.set(key, i);
});
SEED_MARKERS.forEach((m, i) => {
  if (!isNum(m.lat) || !isNum(m.lng)) return;
  for (let j = 0; j < i; j++) {
    const n = SEED_MARKERS[j];
    if (isNum(n.lat) && isNum(n.lng) && kmBetween(m.lat, m.lng, n.lat, n.lng) < 0.03)
      add(i, "WARN", `coords within 30 m of "${n.name}" , duplicate pin?`);
  }
});

// Report
let fails = 0, warns = 0;
SEED_MARKERS.forEach((m, i) => {
  const mine = results.filter((r) => r.i === i);
  const f = mine.filter((r) => r.level === "FAIL").length;
  const w = mine.filter((r) => r.level === "WARN").length;
  fails += f; warns += w;
  const badge = f ? "✗ FAIL" : w ? "△ WARN" : "✓ OK  ";
  console.log(`${badge}  [${m.category}] ${m.__label}`);
  mine.forEach((r) => console.log(`         ${r.level}: ${r.msg}`));
});

const ready = SEED_MARKERS.filter((m) => isNum(m.lat) && isNum(m.lng)).length;
console.log(`\n${SEED_MARKERS.length} entries , ${fails} fail(s), ${warns} warning(s).`);
console.log(`${ready} would be pushed by the "Seed sample locations" button (numeric lat/lng only).`);
process.exitCode = fails ? 1 : 0;
