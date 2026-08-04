// eval/bleu-rouge.mjs
// Self-contained BLEU and ROUGE implementation. No external dependencies.
//
// Design notes (for the methods chapter, author's own words):
//  - Tokenisation is Unicode-aware (\p{L}\p{N}) so Polish diacritics
//    (a c e l n o s z z etc.) survive. A naive [a-z] tokeniser would
//    corrupt the Polish half of the bilingual corpus.
//  - Sentence-level BLEU uses NLTK-style smoothing method 1: precisions of
//    zero are replaced by a small epsilon so log(0) never occurs on the
//    short answers this app produces.
//  - ROUGE-N and ROUGE-L report recall, precision and F1. F1 is the headline.
//
// These are standard formulations (Papineni et al. 2002 for BLEU; Lin 2004
// for ROUGE). Cite from your own verified master list if you reference them.

const SMOOTH_EPSILON = 0.1;

export function tokenize(text) {
  return (text || '')
    .normalize('NFC')
    .toLowerCase()
    .match(/[\p{L}\p{N}]+/gu) || [];
}

function ngrams(tokens, n) {
  const out = [];
  for (let i = 0; i + n <= tokens.length; i++) out.push(tokens.slice(i, i + n).join(' '));
  return out;
}

function counts(arr) {
  const m = new Map();
  for (const x of arr) m.set(x, (m.get(x) || 0) + 1);
  return m;
}

// --- BLEU (sentence level, up to 4-grams, smoothing method 1) ---
export function bleu(candidate, reference) {
  const cand = tokenize(candidate);
  const ref = tokenize(reference);
  if (cand.length === 0) return 0;

  const weights = [];
  for (let n = 1; n <= 4; n++) {
    const cg = counts(ngrams(cand, n));
    const rg = counts(ngrams(ref, n));
    let overlap = 0;
    let total = 0;
    for (const [g, c] of cg) {
      total += c;
      overlap += Math.min(c, rg.get(g) || 0);
    }
    if (total === 0) continue; // candidate too short for this order; drop it
    const p = overlap > 0 ? overlap / total : SMOOTH_EPSILON / total;
    weights.push(Math.log(p));
  }
  if (weights.length === 0) return 0;

  const geoMean = Math.exp(weights.reduce((a, b) => a + b, 0) / weights.length);

  const c = cand.length;
  const r = ref.length;
  const bp = c > r ? 1 : (c === 0 ? 0 : Math.exp(1 - r / c));

  return bp * geoMean;
}

// --- ROUGE-N (recall / precision / F1) ---
export function rougeN(candidate, reference, n) {
  const cand = tokenize(candidate);
  const ref = tokenize(reference);
  const cg = counts(ngrams(cand, n));
  const rg = counts(ngrams(ref, n));

  let overlap = 0;
  for (const [g, rc] of rg) overlap += Math.min(rc, cg.get(g) || 0);

  const refTotal = [...rg.values()].reduce((a, b) => a + b, 0);
  const candTotal = [...cg.values()].reduce((a, b) => a + b, 0);

  const recall = refTotal ? overlap / refTotal : 0;
  const precision = candTotal ? overlap / candTotal : 0;
  const f1 = recall + precision ? (2 * recall * precision) / (recall + precision) : 0;
  return { recall, precision, f1 };
}

// --- ROUGE-L (LCS based) ---
function lcsLength(a, b) {
  const n = b.length;
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= a.length; i++) {
    let prev = 0;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev + 1 : Math.max(dp[j], dp[j - 1]);
      prev = tmp;
    }
  }
  return dp[n];
}

export function rougeL(candidate, reference) {
  const cand = tokenize(candidate);
  const ref = tokenize(reference);
  const l = lcsLength(cand, ref);
  const recall = ref.length ? l / ref.length : 0;
  const precision = cand.length ? l / cand.length : 0;
  const beta = 1;
  const f1 =
    recall + precision
      ? ((1 + beta * beta) * recall * precision) / (recall + beta * beta * precision)
      : 0;
  return { recall, precision, f1 };
}

// Convenience: all metrics for one (candidate, reference) pair.
export function scorePair(candidate, reference) {
  return {
    bleu: bleu(candidate, reference),
    rouge1: rougeN(candidate, reference, 1).f1,
    rouge2: rougeN(candidate, reference, 2).f1,
    rougeL: rougeL(candidate, reference).f1,
  };
}
