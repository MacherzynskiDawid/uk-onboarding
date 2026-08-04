// app/api/assistant/route.js
// Next.js 15 App Router route handler. Runs on the server (nodejs runtime) so the
// model key stays server-side. Thin wrapper around lib/assistant/core.js.

import { NextResponse } from 'next/server';
import { loadCorpusForLang } from '@/lib/assistant/corpus';
import { buildRetriever } from '@/lib/assistant/retriever';
import { getProvider } from '@/lib/assistant/provider';
import { answerQuestion } from '@/lib/assistant/core';
import { CONFIG } from '@/lib/assistant/prompt';

export const runtime = 'nodejs';

// One retriever per language, built once per server instance.
const _retrievers = {};
async function getRetriever(lang) {
  if (_retrievers[lang]) return _retrievers[lang];
  _retrievers[lang] = buildRetriever(await loadCorpusForLang(lang));
  return _retrievers[lang];
}

export async function POST(request) {
  // --- Optional: require a signed-in user ---
  // You use the Firebase client SDK; verifying an ID token on the server needs
  // firebase-admin (not currently a dependency). Two options:
  //   (a) gate the UI so only signed-in users see the assistant (simplest), or
  //   (b) add firebase-admin and verify the Bearer token here.
  // Left as a hook so the route has no hard new dependency.

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid JSON' }, { status: 400 });
  }

  const question = typeof body?.question === 'string' ? body.question.trim() : '';
  const lang = body?.lang === 'pl' ? 'pl' : 'en';

  if (!question || question.length > 1000) {
    return NextResponse.json({ error: 'question must be 1-1000 characters' }, { status: 400 });
  }

  try {
    const retriever = await getRetriever(lang);
    const provider = getProvider();
    const result = await answerQuestion({ question, lang, retriever, provider, config: CONFIG });
    return NextResponse.json(result);
  } catch {
    // Belt and braces: never leak an error; return the signpost.
    return NextResponse.json({
      grounded: false,
      answer: CONFIG.signpost[lang],
      sources: [],
      refusal: true,
      reason: 'server-error',
    });
  }
}
