// lib/assistant/provider.js

//
// Default: Groq (https://groq.com)

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

export function getProvider() {
  const key = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'; // confirm current id
  if (!key) {
    // Fail loudly at construction, but the route still fails CLOSED (signpost)
    // because core.js treats any provider error as a refusal.
    return {
      async generate() {
        throw new Error('GROQ_API_KEY is not set on the server');
      },
    };
  }
  return {
    async generate({ system, user }) {
      const res = await fetch(GROQ_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0,
          // Ask for a JSON object back. The system prompt already contains the
          // word "JSON" and the exact shape, which this mode requires.
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: user },
          ],
        }),
      });
      if (!res.ok) throw new Error(`provider ${res.status}`);
      const data = await res.json();
      return data?.choices?.[0]?.message?.content ?? '';
    },
  };
}

// ---------------------------------------------------------------------------
// Gemini alternative (Google Generative Language API). Swap into getProvider if
// you get a working key. Reads GEMINI_API_KEY / GEMINI_MODEL.
//
// const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';
// export function getProvider() {
//   const key = process.env.GEMINI_API_KEY;
//   const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';
//   if (!key) return { async generate() { throw new Error('GEMINI_API_KEY is not set'); } };
//   return {
//     async generate({ system, user }) {
//       const res = await fetch(`${GEMINI_ENDPOINT}/${model}:generateContent?key=${key}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           systemInstruction: { parts: [{ text: system }] },
//           contents: [{ role: 'user', parts: [{ text: user }] }],
//           generationConfig: { temperature: 0, responseMimeType: 'application/json' },
//         }),
//       });
//       if (!res.ok) throw new Error(`provider ${res.status}`);
//       const data = await res.json();
//       return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
//     },
//   };
// }
// ---------------------------------------------------------------------------
// Anthropic alternative (one-time ~$5 credit, then paid). Reads ANTHROPIC_API_KEY.
//
// export function getProvider() {
//   const key = process.env.ANTHROPIC_API_KEY;
//   const model = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5';
//   if (!key) return { async generate() { throw new Error('ANTHROPIC_API_KEY is not set'); } };
//   return {
//     async generate({ system, user }) {
//       const res = await fetch('https://api.anthropic.com/v1/messages', {
//         method: 'POST',
//         headers: {
//           'content-type': 'application/json',
//           'x-api-key': key,
//           'anthropic-version': '2023-06-01',
//         },
//         body: JSON.stringify({
//           model, max_tokens: 1024, temperature: 0, system,
//           messages: [{ role: 'user', content: user }],
//         }),
//       });
//       if (!res.ok) throw new Error(`provider ${res.status}`);
//       const data = await res.json();
//       return (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n');
//     },
//   };
// }
// ---------------------------------------------------------------------------

// Deterministic mock for tests and offline harness dry-runs. Echoes the first
// context block as a "faithful" answer, so you can exercise the whole pipeline
// (gate, parsing, scoring) without a key or any API calls.
export function getMockProvider() {
  return {
    async generate({ user }) {
      const m = user.match(/\[1\][^\n]*\n([\s\S]*?)(?:\n\n|$)/);
      const answer = m ? m[1].trim() : '';
      return JSON.stringify({ grounded: Boolean(answer), answer, usedSources: ['1'] });
    },
  };
}
