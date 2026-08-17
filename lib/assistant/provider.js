// lib/assistant/provider.js

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

export function getProvider() {
  const key = process.env.GROQ_API_KEY;
  // gpt-oss-120b is currently Groq's flagship fast model
  const model = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

  if (!key) {
    // Fail gracefully at construction time so core.js can handle it as a soft refusal
    return {
      async generate() {
        throw new Error('GROQ_API_KEY is missing from your environment variables.');
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
          // Requests JSON mode output from the model
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: user },
          ],
        }),
      });

      if (!res.ok) {
        // Read response body to give detailed error messages (e.g. invalid key, quota limit)
        const errorDetails = await res.text().catch(() => '');
        throw new Error(`Groq API Error (${res.status}): ${errorDetails || res.statusText}`);
      }

      const data = await res.json();
      return data?.choices?.[0]?.message?.content ?? '';
    },
  };
}

// ---------------------------------------------------------------------------
// Deterministic Mock Provider for offline testing/dry-runs
// ---------------------------------------------------------------------------
export function getMockProvider() {
  return {
    async generate({ user }) {
      const m = user.match(/\[1\][^\n]*\n([\s\S]*?)(?:\n\n|$)/);
      const answer = m ? m[1].trim() : '';
      return JSON.stringify({ grounded: Boolean(answer), answer, usedSources: ['1'] });
    },
  };
}