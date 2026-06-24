Student: Dawid Macherzynski

# UK Newcomer Guides

A bilingual (Polish / English) Progressive Web App that helps Polish newcomers
complete the essential administrative tasks of settling in the UK — finding
accommodation, opening a bank account, getting a National Insurance number, and
several follow-on tasks such as registering with a GP, exchanging a driving
licence, and applying for citizenship.

The app is built around two ideas. First, **order matters**: the tasks depend on
one another (most things need a UK address first), so the guides are sequenced and
the app recommends what to do next rather than presenting a flat list. Second, it
**signposts, it does not advise**: every guide points to the official GOV.UK, NHS
or MoneyHelper source and, for regulated areas such as immigration, directs the
user to an IAA-registered adviser. This keeps the app within the legal limits on
giving immigration advice.

It is the artefact for a final-year BSc Computing dissertation at Southampton
Solent University / QAHE.

## Built with

- **Next.js (App Router)** in plain JavaScript / JSX — no TypeScript.
- **Firebase** — Authentication for accounts and Cloud Firestore for stored
  progress, messages and admin records.
- **Progressive Web App** — a service worker and web manifest for offline access
  and installation.
- Plain CSS with a small set of design tokens; no UI framework.

## What it does

- **Ordered, dependency-aware guides.** Each guide is a step-by-step task with an
  official source link. The home page presents the three essentials as a ring and
  the later tasks as a connected journey, recommending the next sensible step.
- **Two languages, side by side.** A single toggle switches the whole interface and
  all guide content between Polish and English.
- **Accounts and saved progress.** Visitors can browse the public visa guide; the
  in-depth guides open once a user logs in. Progress is saved to Firestore for
  logged-in users and to the device for guests.
- **Progress feedback.** Steps unlock in sequence within a guide, each finished
  guide awards a trophy and a badge, and the profile shows overall progress.
- **A path-choice guide.** The driving-licence guide branches into two routes
  (exchange a Polish/EU licence, or learn from scratch); each route tracks its own
  progress and completes independently.
- **An admin role.** Administrators can manage accounts, change roles, deactivate
  accounts with a recorded reason, and message users; these actions are written to
  an audit log. Access is enforced by Firestore security rules, not just hidden in
  the interface.

## Running it

```bash
npm install
npm run dev                 # development server
```

Then open http://localhost:3000.


Without these keys the app still runs, in a local **preview mode** (guides work,
progress is kept on the device, accounts are disabled). The security rules used by
Firestore are in `firestore.rules` and must be published to the Firebase project.

To test the offline / installable PWA behaviour, use a production build:

```bash
npm run build && npm start
```

## Project structure

- `data/guides/*.js` — the guide content; each guide is a plain object with a
  title, summary, steps, official source and prerequisites. `index.js` orders the
  guides and provides the progress/completion helpers.
- `lib/ui-strings.js` — all interface text, each string paired in English and
  Polish.
- `components/*.jsx` — the language provider and toggle, navigation, the home
  view and ring, the guide view (including the path chooser), and the
  authentication form.
- `app/*` — the layout, home page, profile, admin page, the dynamic guide route,
  the Firebase setup and progress hook, and service-worker registration.
- `firestore.rules` — the database access rules.
- `public/` — the service worker, web manifest and icons.
