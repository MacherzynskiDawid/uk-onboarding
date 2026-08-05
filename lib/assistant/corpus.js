// lib/assistant/corpus.js
// The assistant answers ONLY from this corpus. It is built directly from the
// SAME content modules the app renders (data/guides, data/faqs, data/glossary),
// so the corpus is always identical to the live deployment and there is no
// second copy to keep in sync. Relative imports (not the @/ alias) so this file
// works both inside Next and in the plain-Node eval harness.
//
// Chunk shape: { id, title, lang: 'en'|'pl', text, source }
//   - one chunk per content item PER LANGUAGE, so retrieval and scoring stay
//     within a single language.
//   - `source` is the verified official link already attached to your content;
//     it is never invented here.

import { guidesInOrder } from '../../data/guides/index.js';
import { faqs } from '../../data/faqs.js';
import { glossary } from '../../data/glossary.js';

const LANGS = ['en', 'pl'];

function stepText(step, lang) {
  const h = step?.heading?.[lang] ?? '';
  const b = step?.body?.[lang] ?? '';
  return `${h}. ${b}`.trim();
}

function guideChunks(guide) {
  const out = [];
  for (const lang of LANGS) {
    const head = [guide.summary?.[lang], guide.note?.[lang]].filter(Boolean);

    if (guide.pathChoice && Array.isArray(guide.sections)) {
      // Path-choice guide: one chunk per path so each route is retrievable.
      guide.sections.forEach((sec, i) => {
        const body = [
          ...head,
          sec.blurb?.[lang],
          ...(sec.steps || []).map((s) => stepText(s, lang)),
        ].filter(Boolean);
        out.push({
          id: `guide:${guide.slug}:p${i}:${lang}`,
          title: `${guide.title?.[lang] ?? guide.slug}${sec.title?.[lang] ? ' - ' + sec.title[lang] : ''}`,
          lang,
          text: body.join(' '),
          source: guide.source ?? '',
        });
      });
    } else {
      const body = [...head, ...(guide.steps || []).map((s) => stepText(s, lang))].filter(Boolean);
      out.push({
        id: `guide:${guide.slug}:${lang}`,
        title: guide.title?.[lang] ?? guide.slug,
        lang,
        text: body.join(' '),
        source: guide.source ?? '',
      });
    }
  }
  return out;
}

function faqChunks(faq) {
  return LANGS.map((lang) => ({
    id: `faq:${faq.id}:${lang}`,
    title: faq.question?.[lang] ?? '',
    lang,
    text: faq.answer?.[lang] ?? '',
    source: faq.official ?? '',
  })).filter((c) => c.text);
}

function glossaryChunks(entry) {
  return LANGS.map((lang) => ({
    id: `glossary:${entry.id}:${lang}`,
    title: entry.term ?? '',
    lang,
    text: `${entry.term}${entry.full?.[lang] ? ' (' + entry.full[lang] + ')' : ''}: ${entry.definition?.[lang] ?? ''}`.trim(),
    source: entry.source ?? '',
  })).filter((c) => c.text);
}

let _cache = null;

export async function loadCorpus({ force = false } = {}) {
  if (_cache && !force) return _cache;
  const chunks = [];
  for (const g of guidesInOrder) chunks.push(...guideChunks(g));
  for (const f of faqs) chunks.push(...faqChunks(f));
  for (const e of glossary) chunks.push(...glossaryChunks(e));
  _cache = chunks.filter((c) => c.text && c.text.trim());
  return _cache;
}

// Convenience: chunks for one language (retrieval and answering are per-language).
export async function loadCorpusForLang(lang) {
  const all = await loadCorpus();
  const l = lang === 'pl' ? 'pl' : 'en';
  return all.filter((c) => c.lang === l);
}