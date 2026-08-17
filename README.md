# UK-Onboarding : Bilingual PWA for UK Migrant Integration

> **Solent University : QHO634 Dissertation Artefact**  
> **Author:** Dawid Ireneusz Macherzynski (Student ID: 10299429)  
> **Live Application:** [uk-newcomer-guides.vercel.app](https://uk-newcomer-guides.vercel.app)

---

## Overview

**UK-Onboarding** is a mobile-first, bilingual Progressive Web Application (PWA) designed to support Polish newcomers navigating essential administrative setup tasks in the United Kingdom (e.g. obtaining a National Insurance Number, registering with a GP, opening a bank account, and securing housing).

Built with **Next.js 15 (App Router)** in plain JavaScript/JSX and backed by **Cloud Firestore**, the platform addresses digital exclusion and administrative fragmentation through dependency-sequenced task guidance, natively authored parallel translations, interactive civic infrastructure mapping via **Leaflet**, a UK driving theory mock test module, and a dual-gate Retrieval-Augmented Generation (RAG) assistant enforcing Section 84 statutory signposting boundaries.

---

## Key Features & Architecture

- **Bilingual Native Authoring (EN / PL)**: Parallel English and Polish guides authored specifically for clarity and plain-language comprehension, verified against official GOV.UK sources with source links and last-reviewed timestamps.

- **Dependency-Sequenced Guidance**: Sequential frontier step-locking within `GuideView.jsx` enforces prerequisite task ordering, paired with advisory inter-guide recommendations and visual progress rings (`RingNav.jsx`). Includes a manual step override (*"Mark prior steps complete"*, commit `b24319f`) implemented in `app/hooks/useProgress.js` to accommodate external prior task completion.

- **Dual-Gate Corpus-Restricted RAG Assistant**: AI signposting assistant bounded by strict structural guardrails under Section 84 of the Immigration and Asylum Act 1999:
  - **Gate 1**: Lexical IDF-weighted coverage against the verified site corpus (`data/guides/`, `data/faqs.js`).
  - **Gate 2**: Structural JSON schema validation enforcing strict grounding and off-corpus refusal bounds (documented in the accompanying dissertation, Section 5.8 and Appendix K).
  - Demonstrates **0 false groundings (0/25)** and **100% off-corpus refusal accuracy (5/5)**. *(Note: empirical evaluation was conducted on `llama-3.3-70b-versatile` prior to endpoint migration to `openai/gpt-oss-120b` via Groq.)*

- **Interactive Civic Services Map**: Leaflet-powered geolocation map (`ServicesMap.jsx`) categorising essential UK administrative infrastructure: Post Office branches, Biometrics centres (UKVCAS), and Jobcentre Plus locations.

- **UK Driving Theory Module**: Interactive bilingual practice test engine (`app/driving-test/`) designed to support road rule familiarisation for new arrivals.

- **State Persistence & User Sessions**: Supports anonymous pre-arrival progress via LocalStorage and authenticated cloud sync via Cloud Firestore (`app/hooks/useProgress.js`). *(Note: anonymous LocalStorage state is maintained independently of authenticated Firestore user accounts, as documented in the accompanying dissertation, Section 7.3, Limitation 6.)*

- **Mobile-First PWA**: Service Worker caching (`public/sw.js`) and Web Application Manifest (`public/manifest.webmanifest`) enabling installability and offline access to core guides.

- **High Usability & Accessibility**: Built with custom CSS design tokens for WCAG 2.2 AA compliance. Achieves Google Lighthouse scores of **99 (Desktop)**, **89 (Mobile Performance)**, and **100 (Accessibility)**, with a composite System Usability Scale (SUS) score of **98.4** (interpreted alongside potential acquiescence bias within a small purposive community sample).

---

## Technical Stack & Dependencies

- **Framework**: Next.js 15 (App Router, JavaScript / JSX)
- **Core Dependencies**: `next`, `react`, `react-dom`, `firebase`, `leaflet`
- **Styling**: Custom CSS design tokens and variable architecture (vanilla CSS)
- **Database & Auth**: Cloud Firestore and Firebase Authentication (`app/firebase/setup.js`)
- **AI Provider**: Groq API (`https://api.groq.com/openai/v1/chat/completions`) using model `openai/gpt-oss-120b` via provider abstraction (`lib/assistant/provider.js`)
- **Deployment**: Vercel continuous deployment pipeline

---

## Repository Structure

```text
.
├── app/                      # Next.js 15 App Router routes & API endpoints
│   ├── admin/                # Guide & map marker management interface
│   ├── api/assistant/        # Dual-gate RAG inference endpoint
│   ├── driving-test/         # UK driving theory practice module
│   ├── faq/                  # Searchable administrative FAQ directory
│   ├── firebase/
│   │   └── setup.js          # Firebase app & Cloud Firestore initialisation
│   ├── glossary/             # UK administrative terms & jargon glossary
│   ├── guides/               # Dynamic guide execution interface
│   ├── hooks/
│   │   └── useProgress.js    # LocalStorage & Firestore state hook
│   ├── login/                # User login interface
│   ├── map/                  # Leaflet interactive civic services map
│   ├── offline/              # Fallback offline PWA page
│   ├── profile/              # User progress & account management page
│   ├── register/             # User account registration page
│   ├── layout.jsx            # Root layout, AuthProvider, & language state
│   └── page.jsx              # Main dashboard entry point
├── components/               # UI components
│   ├── AssistantWidget.jsx   # Dual-gate RAG AI chat widget
│   ├── AuthProvider.jsx      # Firebase Auth context provider
│   ├── DeleteAccount.jsx     # Account deletion & data management UI
│   ├── Footer.jsx            # Footer with statutory Section 84 disclaimers
│   ├── GuideEditor.jsx       # Admin guide authoring interface
│   ├── GuideView.jsx         # Guide renderer, sequential frontier, & StepList
│   ├── HomeView.jsx          # Dashboard, guide directory, & user progress
│   ├── LanguageToggle.jsx    # EN/PL language switcher
│   ├── MarkerEditor.jsx      # Civic service coordinate editor
│   ├── Nav.jsx               # Primary application navigation bar
│   ├── RingNav.jsx           # Circular SVG progress ring
│   ├── ServicesMap.jsx       # Interactive Leaflet map for local services
│   └── Trophy.jsx            # Milestone reward & progress badge component
├── data/                     # Verified administrative content
│   ├── guides/               # EN/PL structured guides (NIN, GP, Banking, Housing)
│   ├── faqs.js               # Verified FAQ corpus
│   └── glossary.js           # UK administrative terms (GP, HMO, NIN)
├── lib/                      # Core business logic & provider abstraction
│   ├── assistant/            # Groq API provider & dual-gate validation
│   ├── guide-overrides.js    # Admin content override fetching & deep-merge logic
│   ├── markers.js            # Civic infrastructure coordinates & categories
│   └── ui-strings.js         # Centralised bilingual UI strings
├── public/                   # Static assets, map markers, manifest, & SW
│   ├── manifest.webmanifest  # Web application manifest
│   └── sw.js                 # Service worker offline caching strategy
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.x or v20.x
- **npm**: v9.x or higher

### Environment Setup

Create a `.env.local` file in the root directory using the template below:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# AI Assistant API Key (Groq)
GROQ_API_KEY=your_groq_api_key
```

> **Note on preview mode:** If `.env.local` is omitted or unconfigured, the core PWA, guides, interactive map, driving theory module, and LocalStorage state persistence remain fully functional in local preview mode. The AI assistant requires a valid `GROQ_API_KEY` to execute live RAG queries; without it, the assistant fails closed in accordance with Section 84 safety guardrails.

### Quick Start (Local Development)

1. Clone the repository:

```bash
git clone https://github.com/MacherzynskiDawid/uk-onboarding.git
cd uk-onboarding
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables by creating `.env.local` in the root directory using the keys listed above.

4. Start the development server:

```bash
npm run dev
```

5. Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## Evaluation & Benchmarks

The platform underwent empirical evaluation through unmoderated behavioural testing via Maze (N = 20), the System Usability Scale (N = 20), semi-structured qualitative interviews (n = 5), and an automated 25-item RAG evaluation harness.

- **System Usability Scale (SUS)**: 98.4 / 100 (interpreted alongside potential acquiescence bias within a small purposive community sample)
- **Task sequence retention**: 95%
- **Lighthouse audits**: Performance 99 (Desktop) / 89 (Mobile), Accessibility 100, Best Practices 100, SEO 100
- **AI assistant guardrails**: 100% off-corpus refusal accuracy (5/5), 0 false groundings (0/25), BLEU 0.5879, ROUGE-1 0.7522

> Assistant metrics were measured on `llama-3.3-70b-versatile` prior to the Groq model decommission and subsequent migration to `openai/gpt-oss-120b`. They have not been re-measured against the current model.

---

## License & Academic Attribution

This repository is submitted as the practical dissertation artefact for module QHO634 at Solent University. All rights reserved.

Designed and developed by Dawid Ireneusz Macherzynski (Student ID: 10299429). Administrative content verified against official statutory guidance published on GOV.UK.
