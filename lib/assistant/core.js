// lib/assistant/core.js
// Single grounded-answer function used by BOTH the API route and the offline
// eval harness, so the numbers you report describe the exact runtime logic.
//
// Corpus restriction is enforced by two independent gates:
//   GATE 1 (pre-model): retrieval coverage below threshold -> refuse, and the
//           model is never called. This is the primary guarantee.
//   GATE 2 (post-model): the model must self-report grounded=true with a
//           non-empty answer, in valid JSON. Anything else -> refuse.
// Every failure path returns the signpost. The function never returns raw model
// output; it fails CLOSED towards "signpost, not advice".

import { buildSystemPrompt, buildUserTurn, CONFIG } from './prompt.js';

function refusal(lang, reason, extra = {}) {
  const text = CONFIG.signpost[lang === 'pl' ? 'pl' : 'en'];
  return { grounded: false, answer: text, sources: [], refusal: true, reason, ...extra };
}

function safeParseJSON(raw) {
  if (typeof raw !== 'string') return null;
  const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    // Last resort: pull the first {...} block.
    const m = cleaned.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try {
      return JSON.parse(m[0]);
    } catch {
      return null;
    }
  }
}

export async function answerQuestion({ question, lang = 'en', retriever, provider, config = CONFIG }) {
  if (!question || typeof question !== 'string' || !question.trim()) {
    return refusal(lang, 'empty-question');
  }

  // GATE 1 - retrieval coverage.
  const { chunks, coverage, topScore } = retriever.search(question, config.topK);
  if (!chunks.length || coverage < config.minCoverage) {
    return refusal(lang, 'off-corpus', { coverage, topScore });
  }

  // Call the model. Any error -> refuse (fail closed).
  let raw;
  try {
    raw = await provider.generate({
      system: buildSystemPrompt(lang),
      user: buildUserTurn(question, chunks),
      lang,
    });
  } catch {
    return refusal(lang, 'provider-error', { coverage });
  }

  // GATE 2 - model self-report + valid structure.
  const parsed = safeParseJSON(raw);
  if (!parsed || parsed.grounded !== true || typeof parsed.answer !== 'string' || !parsed.answer.trim()) {
    return refusal(lang, 'ungrounded', { coverage });
  }

  return {
    grounded: true,
    answer: parsed.answer.trim(),
    sources: chunks.map((c) => ({ id: c.id, title: c.title, source: c.source })),
    coverage,
    refusal: false,
  };
}
