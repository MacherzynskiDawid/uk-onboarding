# UK Newcomer Guides — starter project (plain JS/JSX)

A bilingual (Polish/English) Progressive Web App giving newcomers ordered,
step-by-step guides for setting up life in the UK. Built with Next.js (App Router)
in plain JavaScript/JSX — no TypeScript. This is a starter scaffold for the COM629
dissertation artefact; extend it in your own code.

## Run it

```bash
npm install
npm run dev            # development
# to test the PWA / offline behaviour, use a production build:
npm run build && npm start
```
Open http://localhost:3000

## What's here
- `data/guides/*.js` — each guide is a plain object (title, steps, source, prerequisites).
  Adding a guide = one new file + one line in `data/guides/index.js`.
- `lib/ui-strings.js` — all interface text (English filled, Polish to write).
- `components/*.jsx` — language provider/toggle, the index list, the guide view.
- `app/*` — layout, home, offline page, the dynamic guide route, service-worker registration.
- `public/sw.js` + `public/manifest.webmanifest` — the PWA offline + install setup.

## What you need to do
1. Replace the English placeholder where marked and confirm each official source link.
2. Write and review the Polish for every `[PL]` field yourself, as the native speaker.
3. Replace the placeholder icons in `public/icons/`.
4. Then build out: per-step progress, Firebase accounts, a WCAG 2.2 pass, and styling.

## Notes
- Plain JavaScript: `jsconfig.json` keeps the `@/` import alias working. No TypeScript.
- Pinned to Next 15 for reliability; upgrade with `npm i next@latest react@latest react-dom@latest`.
- This scaffold was AI-assisted — record that in your AI declaration, and make the
  feature work and content your own (you'll be examined on it in the viva).
