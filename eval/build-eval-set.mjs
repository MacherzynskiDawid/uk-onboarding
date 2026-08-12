// eval/build-eval-set.mjs
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { faqs } from '../data/faqs.js';

// 1. Off-corpus questions (used to test guardrails / refusal accuracy)
const OFF_CORPUS = [
  { lang: 'en', question: 'What are the best restaurants in Manchester tonight?' },
  { lang: 'en', question: 'Who won the football match last night?' },
  { lang: 'en', question: 'Can you write me a cover letter for a job?' },
  { lang: 'pl', question: 'Jaka jest dzisiaj pogoda w Londynie?' },
  { lang: 'pl', question: 'Polec mi dobry film na wieczor.' },
];

// 2. Paraphrased on-corpus questions (real FAQ IDs + aligned intent)
const PARAPHRASED_QUESTIONS = [
  { faqId: 'nhs-register', lang: 'en', question: 'how do I sign up with a doctor in the UK?' },
  { faqId: 'nhs-register', lang: 'pl', question: 'jak moge zapisac sie do przychodni lekarskiej?' },
  { faqId: 'nino-what',    lang: 'en', question: 'what is a national insurance number and why do I need one?' },
  { faqId: 'nino-what',    lang: 'pl', question: 'co to jest numer NI i czy musze go miec?' },
  { faqId: 'bank-proof',   lang: 'en', question: 'can I open a bank account without proof of address?' },
  { faqId: 'bank-proof',   lang: 'pl', question: 'czy da rade otworzyc konto w banku bez potwierdzenia adresu?' },
];

// Build exact-match FAQ items
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

// Build paraphrased FAQ items with warning check
const paraphrasedCorpus = [];
for (const p of PARAPHRASED_QUESTIONS) {
  const matchingFaq = faqs.find((f) => f.id === p.faqId);
  const refAnswer = matchingFaq?.answer?.[p.lang];

  if (refAnswer) {
    paraphrasedCorpus.push({
      id: `para:${p.faqId}:${p.lang}`,
      lang: p.lang,
      question: p.question,
      referenceAnswer: refAnswer,
      expectOffCorpus: false,
    });
  } else {
    console.warn(`SKIPPED paraphrased item: no FAQ answer found for faqId="${p.faqId}" lang="${p.lang}"`);
  }
}

// Build off-corpus items
const off = OFF_CORPUS.map((o, i) => ({
  id: `off:${o.lang}:${i}`,
  lang: o.lang,
  question: o.question,
  referenceAnswer: '',
  expectOffCorpus: true,
}));

// Combine everything into the final eval set
const set = [...onCorpus, ...paraphrasedCorpus, ...off];
const outPath = path.join(process.cwd(), 'eval', 'eval-set.json');
await writeFile(outPath, JSON.stringify(set, null, 2) + '\n', 'utf8');

console.log(
  `Wrote ${outPath}:\n - ${onCorpus.length} exact FAQs\n - ${paraphrasedCorpus.length} paraphrased questions\n - ${off.length} off-corpus questions\n Total = ${set.length} items`
);