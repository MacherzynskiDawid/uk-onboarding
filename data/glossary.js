// data/glossary.js
// Plain-language explanations of confusing UK terms (GP, HMO, NINo, etc.).
//

export const glossary = [
  {
    id: "gp",
    term: "GP",
    full: { en: "General Practitioner", pl: "Lekarz pierwszego kontaktu (GP)" },
    definition: {
      en: "A local family doctor. Your first point of contact for most health concerns; you register with a GP surgery near where you live.",
      pl: "Lekarz rodzinny. Twój pierwszy punkt kontaktu w większości spraw zdrowotnych; rejestrujesz się w przychodni (GP surgery) w pobliżu miejsca zamieszkania.",
    },
  },
  {
    id: "hmo",
    term: "HMO",
    full: { en: "House in Multiple Occupation", pl: "Dom wielorodzinny / Dom współdzielony" },
    definition: {
      en: "A property rented by several people who are not from one household (for example, sharing a house with other tenants). HMOs have specific safety rules landlords must follow.",
      pl: "Nieruchomość wynajmowana przez kilka osób, które nie tworzą jednego gospodarstwa domowego (np. współdzielenie domu z innymi najemcami). Domy typu HMO muszą spełniać szczególne wymogi bezpieczeństwa, których właściciele mają obowiązek przestrzegać.",
    },
  },
  {
    id: "nino",
    term: "NINo",
    full: { en: "National Insurance number", pl: "Numer ubezpieczenia społecznego (NINo)" },
    definition: {
      en: "A personal reference number that tracks your tax and National Insurance contributions. You need it to work and to claim certain benefits.",
      pl: "Twój indywidualny numer identyfikacyjny, służący do rozliczania podatków i składek na ubezpieczenie społeczne. Jest niezbędny do podjęcia legalnej pracy oraz ubiegania się o niektóre zasiłki.",
    },
  },
  {
    id: "proof-of-address",
    term: "Proof of address",
    full: { en: "Proof of address", pl: "Potwierdzenie adresu zamieszkania" },
    definition: {
      en: "A document showing where you live (e.g. a tenancy agreement or a bill), often needed to open a bank account",
      pl: "Dokument potwierdzający Twoje miejsce zamieszkania (np. umowa najmu lub rachunek), często wymagany do otwarcia konta w banku.",
    },
  },
  {
    id: "council-tax",
    term: "Council Tax",
    full: { en: "Council Tax", pl: "Podatek lokalny (Council Tax)" },
    definition: {
      en: "A local tax paid to your council for local services like waste collection and street lighting.",
      pl: "Podatek lokalny płacony na rzecz władz dzielnicy lub miasta (council) na utrzymanie lokalnych usług, takich jak wywóz śmieci czy oświetlenie ulic.",
    },
  },
  // Add more terms here.
];

// Quick lookup by id, handy if you want inline definitions inside guides later.
export const glossaryById = Object.fromEntries(glossary.map((g) => [g.id, g]));