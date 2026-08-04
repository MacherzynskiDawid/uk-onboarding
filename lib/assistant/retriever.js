// lib/assistant/retriever.js
// Lexical retrieval over the verified corpus using Okapi BM25 for ranking,
// plus an idf-weighted coverage score used as the corpus-restriction GATE.
//
// Why this design (methods-chapter rationale, your own words):
//  - A bounded corpus (tens to low hundreds of chunks) does not need a vector
//    database. BM25 is standard, fully local, deterministic and reproducible,
//    which matters for a dissertation you must be able to re-run.
//  - The gate is idf-weighted coverage: the share of the query's INFORMATIVE
//    terms (weighted by rarity) that appear in the retrieved context. It is
//    bounded [0,1] and independent of corpus size, so a single threshold is
//    interpretable and tunable via the eval harness.
//  - The system is deliberately biased towards refusing: a false refusal
//    (signpost when it could have answered) is safe; a false grounding
//    (answering off-corpus) violates the "signpost, not advice" position.
//    Set minCoverage conservatively and tune it against a labelled question set.

const K1 = 1.5;
const B = 0.75;

function tokenize(text) {
  return (text || '')
    .normalize('NFC')
    .toLowerCase()
    .match(/[\p{L}\p{N}]+/gu) || [];
}

export function buildRetriever(corpus) {
  const docs = corpus.map((chunk) => {
    const tokens = tokenize(`${chunk.title} ${chunk.text}`);
    const tf = new Map();
    for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1);
    return { chunk, tokens, tf, length: tokens.length };
  });

  const N = docs.length || 1;
  const df = new Map();
  for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) || 0) + 1);
  const avgdl = docs.reduce((a, d) => a + d.length, 0) / N;

  const idf = (term) => {
    const n = df.get(term) || 0;
    // Okapi BM25 idf; floored at a small positive value so a term present in
    // every document still contributes a little rather than going negative.
    return Math.max(1e-6, Math.log(1 + (N - n + 0.5) / (n + 0.5)));
  };

  function bm25(queryTerms, d) {
    let score = 0;
    for (const t of queryTerms) {
      const f = d.tf.get(t) || 0;
      if (!f) continue;
      const denom = f + K1 * (1 - B + B * (d.length / (avgdl || 1)));
      score += idf(t) * ((f * (K1 + 1)) / denom);
    }
    return score;
  }

  // idf-weighted coverage of the query against a set of context tokens.
  function coverageOf(queryTerms, contextTokenSet) {
    let matched = 0;
    let totalIdf = 0;
    const seen = new Set();
    for (const t of queryTerms) {
      if (seen.has(t)) continue; // weight each distinct query term once
      seen.add(t);
      const w = idf(t);
      totalIdf += w;
      if (contextTokenSet.has(t)) matched += w;
    }
    return totalIdf ? matched / totalIdf : 0;
  }

  return {
    // Returns ranked chunks (top k), the combined coverage of the query against
    // those chunks, and the raw top BM25 score (useful for threshold tuning).
    search(query, k = 3) {
      const q = tokenize(query);
      const ranked = docs
        .map((d) => ({ d, score: bm25(q, d) }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, k);

      const contextTokens = new Set();
      for (const r of ranked) for (const t of r.d.tokens) contextTokens.add(t);

      return {
        chunks: ranked.map((r) => r.d.chunk),
        coverage: coverageOf(q, contextTokens),
        topScore: ranked.length ? ranked[0].score : 0,
      };
    },
    // Exposed for tests / tuning.
    _debug: { idf, avgdl, N },
  };
}
