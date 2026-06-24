export const accommodation = {
  slug: "accommodation",
  order: 1,
  phase: "after-arrival",
  category: "essential",
  title:   { en: "Find accommodation and a UK address", pl: "Znajdź zakwaterowanie i brytyjski adres" },
  summary: { en: "Get somewhere to live and an address you can use for everything else.", pl: "Znajdź miejsce do życia i adres, którego możesz użyć do wszystkich innych formalności." },
  prerequisites: [],
  note: { en: "A confirmed UK address unlocks most other steps, so this usually comes first - even a temporary address helps. Renting rules in England changed under the Renters' Rights Act 2025, so always check the latest GOV.UK guidance.", pl: "Potwierdzony brytyjski adres odblokowuje większość kolejnych kroków, dlatego zazwyczaj jest to priorytet - pomocny jest nawet adres tymczasowy. Przepisy dotyczące wynajmu w Anglii uległy zmianie na mocy ustawy Renters' Rights Act 2025, dlatego zawsze sprawdzaj najnowsze wytyczne na stronie GOV.UK." },
  source: "https://www.gov.uk/private-renting", // verify current
  lastUpdated: "2026-06-16",
  disclaimer: { en: "Informational only - not official or legal advice. Check the source link for current guidance.", pl: "Materiał wyłącznie o charakterze informacyjnym - nie stanowi oficjalnej ani prawnej porady. Sprawdź link źródłowy, aby zapoznać się z aktualnymi wytycznymi." },
  steps: [
    {
      heading: { en: "Decide where and what to rent", pl: "Zdecyduj, gdzie i co chcesz wynająć" },
      body: { en: "Choose an area and a type of home that fits your budget - a room in a shared house, a studio or a flat. A temporary or short-term address is fine to get you started.", pl: "Wybierz okolicę oraz rodzaj lokum dopasowany do Twojego budżetu - pokój w dzielonym domu (tzw. shared house), kawalerkę lub mieszkanie. Na start w zupełności wystarczy adres tymczasowy lub krótkoterminowy." },
    },
    {
      heading: { en: "Prepare your Right to Rent proof", pl: "Przygotuj potwierdzenie prawa do wynajmu (Right to Rent)" },
      body: { en: "Landlords in England must check you have the right to live in the UK before renting to you. Be ready to prove your status, usually with a passport or an online share code from your eVisa.", pl: "Wynajmujący w Anglii mają obowiązek sprawdzić, czy masz prawo mieszkać w Wielkiej Brytanii, zanim podpiszą z Tobą umowę. Przygotuj się na potwierdzenie swojego statusu - zazwyczaj za pomocą paszportu lub internetowego kodu dostępu (share code) z Twojej eVisy." },
    },
    {
      heading: { en: "Know the upfront costs", pl: "Poznaj koszty początkowe" },
      body: { en: "A holding deposit (to reserve a property) is capped at one week's rent, and a tenancy deposit at five weeks' rent (six weeks for higher-rent homes). Budget for your first month's rent too.", pl: "Opłata rezerwacyjna (holding deposit) nie może przekraczać równowartości tygodniowego czynszu, a kaucja (tenancy deposit) - czynszu za 5 tygodni (6 tygodni w przypadku droższych nieruchomości). Uwzględnij w budżecie również opłatę za pierwszy miesiąc z góry." },
    },
    {
      heading: { en: "Check your deposit is protected", pl: "Upewnij się, że Twoja kaucja jest chroniona" },
      body: { en: "Within 30 days of paying it, your landlord must protect your deposit in a government-approved scheme and give you the details in writing.", pl: "W ciągu 30 dni od wpłaty wynajmujący musi zabezpieczyć Twoją kaucję w jednym z zatwierdzonych przez rząd programów ochrony (deposit protection scheme) i przekazać Ci potwierdzenie tego faktu na piśmie." },
    },
    {
      heading: { en: "Get the documents you are owed", pl: "Odbierz dokumenty, które Ci się należą" },
      body: { en: "At the start of a tenancy your landlord must give you the official 'How to Rent' guide, an Energy Performance Certificate (EPC), and gas and electrical safety records.", pl: "Na początku najmu właściciel musi przekazać Ci oficjalny przewodnik „How to Rent”, świadectwo charakterystyki energetycznej (EPC) oraz aktualne protokoły bezpieczeństwa instalacji gazowej i elektrycznej." },
    },
  ],
};
