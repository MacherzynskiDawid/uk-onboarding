# UK-Onboarding : Bilingual PWA for UK Migrant Integration

> **Solent University : QHO634 Dissertation Artefact** > **Author:** Dawid Ireneusz Macherzynski (Student ID: 10299429)  
> **Live Application:** [uk-newcomer-guides.vercel.app](https://uk-newcomer-guides.vercel.app)

---

## Overview

**UK-Onboarding** is a mobile-first, bilingual Progressive Web Application (PWA) designed to support Polish newcomers navigating essential administrative setup tasks in the United Kingdom (e.g., obtaining a National Insurance Number, registering with a GP, opening a bank account, and securing housing).

Built with **Next.js 15 (App Router)** in plain JavaScript/JSX and backed by **Cloud Firestore**, the platform addresses digital exclusion and administrative fragmentation through dependency-sequenced task guidance, natively authored parallel translations, and a dual-gate Retrieval-Augmented Generation (RAG) assistant enforcing Section 84 statutory signposting boundaries.

---

## Key Features & Architecture

* **Bilingual Native Authoring (EN / PL)**: Parallel English and Polish guides authored specifically for clarity and plain-language comprehension, verified against official GOV.UK sources with source links and last-reviewed timestamps.
* **Dependency-Sequenced Guidance**: Within-guide step-locking enforces prerequisite task ordering (`RingNav.jsx`), paired with advisory inter-guide recommendations. Includes a manual step override (*"Mark prior steps complete"*, commit `b24319f`) to accommodate external prior completion.
* **Dual-Gate Corpus-Restricted RAG Assistant**: AI signposting assistant bounded by strict structural guardrails under Section 84 of the Immigration and Asylum Act 1999:
  * **Gate 1**: IDF-weighted lexical coverage against the verified corpus.
  * **Gate 2**: Prompt grounding and legal signposting constraint verification.
  * Achieves **0 false groundings** and **100% off-corpus refusal accuracy**.
* **Cross-Device State Synchronisation**: Offline-first progress persistence using Browser LocalStorage, seamlessly synced to Cloud Firestore upon authentication via `useProgress.js`.
* **Mobile-First PWA**: Service Worker caching (`sw.js`) and Web Application Manifest (`manifest.webmanifest`) enabling installability and offline access to core guides.
* **High Usability & Accessibility**: Achieves Google Lighthouse scores of **99 (Desktop)**, **89 (Mobile Performance)**, and **100 (Accessibility)**, with a composite System Usability Scale (SUS) benchmark of **98.4**.

---

## Technical Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router, JavaScript / JSX) |
| **Styling** | Tailwind CSS / Mobile-First Responsive Design |
| **Database & Auth** | Firebase / Cloud Firestore |
| **PWA & Offline** | Service Workers, Web App Manifest |
| **AI Assistant** | RAG Architecture via OpenRouter (`openai/gpt-oss-120b` provider abstraction) |
| **Deployment** | Vercel Continuous Deployment Pipeline |

---

## Project Structure

```text
.
├── app/                      # Next.js 15 App Router pages & API routes
│   ├── api/assistant/        # Dual-gate RAG inference endpoint
│   ├── guides/               # Dynamic guide route handlers
│   ├── layout.jsx            # Root layout, PWA providers, & language state
│   ├── page.jsx              # Main dashboard and guide index
│   └── offline/              # Fallback offline page
├── components/               # UI components
│   ├── AssistantChat.jsx     # Dual-gate RAG AI chat widget
│   ├── LanguageToggle.jsx    # EN/PL language switcher
│   ├── RingNav.jsx           # Circular progress & step-locking UI
│   └── StepList.jsx          # Interactive guide steps & manual override
├── data/                     # Authoritative content sets
│   ├── guides/               # EN/PL structured guides (NIN, GP, Banking, etc.)
│   ├── faqs.js               # Verified FAQ corpus
│   └── glossary.js           # Administrative terms (GP, HMO, NIN)
├── lib/                      # Core business logic & providers
│   ├── assistant/            # Provider abstraction & dual-gate validation
│   ├── firebase.js           # Firebase app & Firestore initialization
│   ├── useProgress.js        # State sync engine (LocalStorage <-> Firestore)
│   └── ui-strings.js         # Centralised bilingual UI strings
├── public/                   # Static assets, icons, manifest, & SW
│   ├── manifest.webmanifest  # Web application manifest
│   └── sw.js                 # Service worker caching strategy
└── README.md