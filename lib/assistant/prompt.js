// lib/assistant/prompt.js
// The system prompt is built on the server and is never sent from or editable by
// the client. It enforces the "signpost, not advice" position: answer ONLY from
// the supplied context, never give individualised advice, and return a
// structured JSON verdict the server can enforce.

export const CONFIG = {
  topK: 3,
  // Corpus-restriction gate (GATE 1): idf-weighted coverage in [0,1]. Below this
  // the model is never called and the assistant signposts. TUNE this on the real
  // corpus using the harness (read the coverage column of per-item.csv split by
  // the expectOffCorpus label; set the threshold in the gap). Bias low: gate 1 is
  // a high-recall pre-filter, gate 2 (the model's grounded=false self-report)
  // gives precision. A false refusal is safe; a false grounding is not.
  minCoverage: 0.25,

  // The message shown when the assistant declines.
  // EN matches your FAQ legal voice. PL is intentionally left for you to author
  // (your rule: all Polish is written by you). Reuse your own about-advice answer
  // in data/faqs.js as the basis if useful. Do NOT ship the placeholder.
  signpost: {
    en: 'This assistant only answers questions covered by the UK Newcomer Guides, and it gives general information rather than individual advice. For anything outside the guides, please use the official sources signposted in the app and on GOV.UK. For regulated immigration advice, contact an adviser registered with the Immigration Advice Authority (IAA).',
    pl: 'Ten asystent odpowiada tylko na pytania zawarte w przewodnikach UK Newcomer Guides i udziela ogólnych informacji, a nie indywidualnych porad. W przypadku pytań wykraczających poza treść przewodników, prosimy korzystać z oficjalnych źródeł wskazanych w aplikacji i na stronie GOV.UK. W celu uzyskania regulowanej porady imigracyjnej należy skontaktować się z zarejestrowanym doradcą',
  },
};

// Polish at runtime: with ANSWER_MODE 'faithful' the model may phrase answers in
// Polish drawn from your Polish corpus. That is app behaviour grounded in content
// you authored, not assessed prose. If you would rather it never generate new
// Polish sentences, set 'extractive' and it will return verbatim corpus text plus
// the signpost. Flagged so it is a decision, not an accident.
const ANSWER_MODE = 'faithful'; // 'faithful' | 'extractive'

export function buildSystemPrompt(lang = 'en') {
  const modeRule =
    ANSWER_MODE === 'extractive'
      ? 'Answer by quoting the relevant sentences from the context verbatim. Do not rewrite or summarise them.'
      : 'Answer using only the wording and facts in the context, staying as close to the source wording as possible. Do not add facts, figures, addresses, fees or steps that are not present in the context.';

  return [
    'You are the UK Newcomer Guides assistant.',
    "You help newcomers find information that already exists in the app's verified guides and FAQs.",
    '',
    'Hard rules:',
    '1. Use ONLY the numbered CONTEXT provided in the user turn. Treat your own background knowledge as unavailable.',
    '2. Never give individualised advice, legal or immigration opinions, or recommendations. You signpost to official information; you do not advise.',
    '3. If the context does not clearly contain the answer, do not guess. Return grounded=false.',
    `4. ${modeRule}`,
    `5. Reply in ${lang === 'pl' ? 'Polish' : 'English'}.`,
    '',
    'Output format: return a single JSON object and nothing else:',
    '{"grounded": boolean, "answer": string, "usedSources": string[]}',
    '- grounded: true only if the context directly answers the question.',
    '- answer: the grounded answer, or "" when grounded is false.',
    '- usedSources: the ids of the context items you used.',
  ].join('\n');
}

export function formatContext(chunks) {
  if (!chunks.length) return '(no context)';
  return chunks
    .map((c, i) => `[${i + 1}] id=${c.id} title="${c.title}" source="${c.source}"\n${c.text}`)
    .join('\n\n');
}

export function buildUserTurn(question, chunks) {
  return `CONTEXT:\n${formatContext(chunks)}\n\nQUESTION:\n${question}`;
}
