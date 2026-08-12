// data/faqs.js
// FAQ content for UK Newcomer Guides.

export const faqCategories = [
  { id: "about",         en: "About this app",         pl: "O tej aplikacji" },
  { id: "before",        en: "Before you arrive",         pl: "Zanim przyjedziesz" },
  { id: "accommodation", en: "Accommodation & address",   pl: "Zakwaterowanie i adres" },
  { id: "bank",          en: "Bank account",              pl: "Konto bankowe" },
  { id: "nino",          en: "National Insurance number", pl: "Numer NINo" },
  { id: "nhs",           en: "NHS & GP registration",     pl: "NHS i rejestracja u lekarza" },
  { id: "driving",       en: "Driving licence",           pl: "Prawo jazdy" },
  { id: "using",         en: "Using the app",             pl: "Korzystanie z aplikacji" },
];

export const faqs = [
  // --- About / legal positioning ---
  {
    id: "about-advice",
    category: "about",
    question: {
      en: "Does this app give official immigration or legal advice?",
      pl: "Czy ta aplikacja udziela oficjalnych porad imigracyjnych lub prawnych?",
    },
    answer: {
      en: "No. This app provides general, informational guidance only, based on official public sources. It does not give regulated immigration advice. For immigration advice you must contact an adviser registered with the Immigration Advice Authority (IAA).",
      pl: "Nie. Ta aplikacja zapewnia wyłącznie ogólne informacje o charakterze orientacyjnym, oparte na oficjalnych źródłach publicznych. Nie stanowi ona regulowanej porady imigracyjnej. Aby uzyskać poradę imigracyjną, należy skontaktować się z doradcą zarejestrowanym w Immigration Advice Authority (IAA).",
    },
    guide: null,
    official: "https://www.gov.uk/find-an-immigration-adviser",
  },
  {
    id: "about-what",
    category: "about",
    question: {
      en: "What can this app help me with?",
      pl: "W czym może mi pomóc ta aplikacja?",
    },
    answer: {
      en: "This app guides you through the essential first steps of settling in the UK in a logical, sensible order. It helps you manage tasks like finding accommodation, opening a bank account, applying for a National Insurance number, and registering with a GP, all available in both English and Polish.",
      pl: "Aplikacja prowadzi Cię przez najważniejsze pierwsze kroki związane z osiedleniem się w Wielkiej Brytanii w logicznej, rozsądnej kolejności. Pomaga w załatwieniu takich spraw jak zakwaterowanie, założenie konta bankowego, wniosek o numer National Insurance czy rejestracja u lekarza rodzinnego (GP) – a wszystko to w języku angielskim i polskim.",
    },
    guide: null,
    official: null,
  },

  // --- Task categories ---
  {
    id: "nino-what",
    category: "nino",
    question: {
      en: "What is a National Insurance number and do I need one?",
      pl: "Co to jest numer National Insurance (NINo) i czy go potrzebuję?",
    },
    answer: {
      en: "A National Insurance (NI) number is a unique personal reference used to ensure your tax and National Insurance contributions are recorded correctly. You need one to work legally in the UK, claim benefits, or apply for a student loan. For a complete breakdown of the application process, check out our guide.",
      pl: "Numer National Insurance (NI) to unikalny numer identyfikacyjny, który gwarantuje, że Twoje podatki i składki na ubezpieczenie społeczne są prawidłowo rejestrowane. Jest on niezbędny, aby legalnie pracować w Wielkiej Brytanii, ubiegać się o zasiłki lub pożyczkę studencką. Szczegółowy opis procesu składania wniosku znajdziesz w naszym przewodniku.",
    },
    guide: "/guides/national-insurance",
    official: "https://www.gov.uk/apply-national-insurance-number",
  },
  {
    id: "bank-proof",
    category: "bank",
    question: {
      en: "Can I open a bank account without proof of address?",
      pl: "Czy mogę otworzyć konto bankowe bez potwierdzenia adresu?",
    },
    answer: {
      en: "Traditional high-street banks usually require a UK proof of address (like a utility bill or tenancy agreement) to open an account. Because this creates a 'chicken-and-egg' dilemma for newcomers, this app sequences tasks to help you secure housing first, or prompts you to explore digital-first banks that have alternative verification methods.",
      pl: "Tradycyjne banki zazwyczaj wymagają brytyjskiego potwierdzenia adresu (np. rachunku za media lub umowy najmu) do otwarcia konta. Ponieważ tworzy to sytuację bez wyjścia dla nowych osób, aplikacja porządkuje zadania tak, aby najpierw pomóc Ci w znalezieniu mieszkania, lub sugeruje sprawdzenie banków cyfrowych, które oferują alternatywne metody weryfikacji.",
    },
    guide: "/guides/bank-account",
    official: null,
  },
  {
    id: "nhs-register",
    category: "nhs",
    question: {
      en: "How do I register with a GP (doctor)?",
      pl: "Jak zarejestrować się u lekarza rodzinnego (GP)?",
    },
    answer: {
      en: "You can register with a local General Practitioner (GP) surgery by filling out a registration form online or in person. According to official NHS guidelines, you do not need proof of address, ID, or legal immigration status to register as a patient. See our guide for step-by-step instructions.",
      pl: "Możesz zarejestrować się w lokalnej przychodni lekarskiej (GP), wypełniając formularz rejestracyjny online lub osobiście. Zgodnie z oficjalnymi wytycznymi NHS, do rejestracji nie jest wymagane potwierdzenie adresu, dokument tożsamości ani status imigracyjny. Instrukcję krok po kroku znajdziesz w naszym przewodniku.",
    },
    guide: "/guides/nhs-registration",
    official: "https://www.nhs.uk/nhs-services/gps/how-to-register-with-a-gp-surgery/",
  },

  // --- Using the app ---
  {
    id: "using-language",
    category: "using",
    question: {
      en: "How do I switch between English and Polish?",
      pl: "Jak przełączyć język między angielskim a polskim?",
    },
    answer: {
      en: "You can easily switch the language at any time by clicking the language toggle (EN/PL) located in the main navigation bar at the top of the screen.",
      pl: "Możesz łatwo zmienić język w dowolnym momencie, klikając przełącznik języka (EN/PL) znajdujący się na głównym pasku nawigacyjnym u góry ekranu.",
    },
    guide: null,
    official: null,
  },
  {
    id: "using-offline",
    category: "using",
    question: {
      en: "Can I use the app offline?",
      pl: "Czy mogę korzystać z aplikacji w trybie offline?",
    },
    answer: {
      en: "Yes! This app is built as a Progressive Web App (PWA). Once you have loaded it in your browser with an internet connection, you can save it to your home screen and access all core guides and checklists even when you are offline.",
      pl: "Tak! Ta aplikacja została stworzona jako Progressive Web App (PWA). Po pierwszym uruchomieniu jej w przeglądarce z dostępem do internetu, możesz zapisać ją na ekranie głównym i korzystać ze wszystkich najważniejszych przewodników oraz list zadań nawet bez połączenia z siecią.",
    },
    guide: null,
    official: null,
  },
];