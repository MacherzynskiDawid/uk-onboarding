// eval/build-eval-set.mjs
// Generates eval/eval-set.json from your VERIFIED content, so nothing is
// fabricated: on-corpus items are the FAQ question/answer pairs (both
// languages), reference answers copied verbatim from data/faqs.js. Off-corpus
// items are a small bilingual set of questions the guides do not cover, used to
// measure refusal accuracy.
//
//   node eval/build-eval-set.mjs
//
// Curate the output by hand afterwards if you want to add or drop items.

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { faqs } from '../data/faqs.js';

// Clearly off-corpus questions (not covered by the guides). Add more as needed.
const OFF_CORPUS = [
  { lang: 'en', question: 'What are the best restaurants in Manchester tonight?' },
  { lang: 'en', question: 'Who won the football match last night?' },
  { lang: 'en', question: 'Can you write me a cover letter for a job?' },
  { lang: 'pl', question: 'Jaka jest dzisiaj pogoda w Londynie?' },
  { lang: 'pl', question: 'Polec mi dobry film na wieczor.' },
];

const onCorpus = [];
for (const f of faqs) {
  for (const lang of ['en', 'pl']) {
    const q = f.question?.[lang];
    const a = f.answer?.[lang];
    if (q && a) {
      onCorpus.push({
        id: `faq:${f.id}:${lang}`,
        lang,
        question: q,
        referenceAnswer: a,
        expectOffCorpus: false,
      });
    }
  }
}

const off = OFF_CORPUS.map((o, i) => ({
  id: `off:${o.lang}:${i}`,
  lang: o.lang,
  question: o.question,
  referenceAnswer: '',
  expectOffCorpus: true,
}));

const set = [...onCorpus, ...off];
const outPath = path.join(process.cwd(), 'eval', 'eval-set.json');
await writeFile(outPath, JSON.stringify(set, null, 2) + '\n', 'utf8');
console.log(`Wrote ${outPath}: ${onCorpus.length} on-corpus + ${off.length} off-corpus = ${set.length} items`);
