export const bankAccount = {
  slug: "bank-account",
  order: 2,
  phase: "after-arrival",
  category: "essential",
  title:   { en: "Open a UK bank account", pl: "Otwórz konto bankowe w Wielkiej Brytanii" },
  summary: { en: "Set up an account so you can be paid and pay bills.", pl: "Załóż konto, aby móc otrzymywać wynagrodzenie i opłacać rachunki." },
  prerequisites: ["accommodation"],
  note: { en: "If you do not yet have proof of a UK address, app-based and digital banks often have lighter requirements - a common way to get started.", pl: "Jeśli nie posiadasz jeszcze potwierdzenia brytyjskiego adresu, banki mobilne (w aplikacji) i cyfrowe często mają mniejsze wymagania - to popularny sposób na start." },
  source: "https://www.moneyhelper.org.uk/en/everyday-money/banking",
  lastUpdated: "2026-06-16",
  disclaimer: { en: "Informational only - not official or financial advice. Check the source link for current guidance.", pl: "Materiał wyłącznie o charakterze informacyjnym - nie stanowi oficjalnej ani finansowej porady. Sprawdź link źródłowy, aby zapoznać się z aktualnymi wytycznymi." },
  steps: [
    {
      heading: { en: "Choose the right account for you", pl: "Wybierz odpowiednie konto dla siebie" },
      body: { en: "Compare basic, current and digital accounts. Independent guidance from MoneyHelper lets you compare options without sales pressure.", pl: "Porównaj konta podstawowe (basic), bieżące (current) i cyfrowe. Niezależne porady od MoneyHelper pozwalają na bezstronne porównanie dostępnych opcji." },
    },
    {
      heading: { en: "Gather your documents", pl: "Przygotuj dokumenty" },
      body: { en: "By law, banks must check your identity and address. You will usually need one ID document (such as a passport) and one proof of address (such as a tenancy agreement, utility bill or council-tax letter).", pl: "Zgodnie z prawem banki muszą zweryfikować Twoją tożsamość i adres. Zazwyczaj będziesz potrzebować jednego dokumentu tożsamości (np. paszportu) oraz jednego potwierdzenia adresu (np. umowy najmu, rachunku za media lub pisma dotyczącego podatku lokalnego Council Tax)." },
    },
    {
      heading: { en: "No proof of address yet?", pl: "Nie masz jeszcze potwierdzenia adresu?" },
      body: { en: "App-based or digital banks, basic bank accounts, and accounts designed for newcomers may accept you with lighter requirements. A letter from an employer or university can sometimes help too.", pl: "Banki mobilne/cyfrowe, podstawowe konta bankowe oraz konta stworzone z myślą o nowo przybyłych mogą zaakceptować Twój wniosek przy mniejszych wymaganiach formalnych. Pomocne bywa również oficjalne pismo od pracodawcy lub z uniwersytetu." },
    },
    {
      heading: { en: "Apply and verify your identity", pl: "Złóż wniosek i potwierdź tożsamość" },
      body: { en: "Apply online or in a branch. You may verify your identity using the bank's app, or by showing original documents in person.", pl: "Złóż wniosek przez internet lub w oddziale. Tożsamość możesz zweryfikować w aplikacji bankowej lub okazując oryginalne dokumenty osobiście." },
    },
    {
      heading: { en: "Start using your account", pl: "Zacznij korzystać z konta" },
      body: { en: "Once approved, you will receive your account details and a debit card, and can have your wages paid in and set up your bills.", pl: "Po zatwierdzeniu otrzymasz dane konta i kartę debetową. Od tego momentu możesz otrzymywać wynagrodzenie i skonfigurować płatności za rachunki." },
    },
  ],
};
