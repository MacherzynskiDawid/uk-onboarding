export const nationalInsurance = {
  slug: "national-insurance",
  order: 3,
  phase: "after-arrival",
  category: "essential",
  title:   { en: "Apply for a National Insurance number", pl: "Złóż wniosek o numer National Insurance (NINo)" },
  summary: { en: "Get the number you need to work and pay tax in the UK.", pl: "Uzyskaj numer niezbędny do podjęcia pracy i opłacania podatków w Wielkiej Brytanii." },
  prerequisites: ["accommodation"],
  note: { en: "You can usually start work before your number arrives - tell your employer it has been applied for, as long as you can prove your right to work.", pl: "Zazwyczaj możesz rozpocząć pracę przed otrzymaniem numeru - poinformuj pracodawcę, że wniosek został już złożony, o ile jesteś w stanie udokumentować swoje prawo do pracy." },
  source: "https://www.gov.uk/apply-national-insurance-number", // verify current
  lastUpdated: "2026-06-16",
  disclaimer: { en: "Informational only - not official or legal advice. Check the source link for current guidance.", pl: "Materiał wyłącznie o charakterze informacyjnym - nie stanowi oficjalnej ani prawnej porady. Sprawdź link źródłowy, aby zapoznać się z aktualnymi wytycznymi." },
  steps: [
    {
      heading: { en: "Check you can apply", pl: "Sprawdź, czy możesz złożyć wniosek" },
      body: { en: "You can apply once you are in the UK, are 16 or over, have the right to work, and do not already have a National Insurance number.", pl: "Możesz złożyć wniosek, jeśli przebywasz już w Wielkiej Brytanii, masz ukończone 16 lat, posiadasz prawo do pracy i nie masz jeszcze przyznanego numeru National Insurance." },
    },
    {
      heading: { en: "Apply online - it is free", pl: "Złóż wniosek online - to bezpłatne" },
      body: { en: "Apply through the official GOV.UK service. It is free; avoid third-party websites that charge a fee for it.", pl: "Wniosek złóż przez oficjalny serwis GOV.UK. Usługa jest całkowicie darmowa; unikaj zewnętrznych stron internetowych, które pobierają za to opłaty." },
    },
    {
      heading: { en: "Give your details", pl: "Podaj swoje dane" },
      body: { en: "You will provide personal, contact and identity details, including your passport and immigration status. You can use an eVisa share code where asked.", pl: "Podasz dane osobowe, kontaktowe oraz informacje potwierdzające tożsamość, w tym dane paszportu i statusu imigracyjnego. W odpowiednim miejscu możesz użyć kodu dostępu eVisa (share code)." },
    },
    {
      heading: { en: "Prove your identity", pl: "Potwierdź swoją tożsamość" },
      body: { en: "This is usually done online - for example with the GOV.UK ID Check app, scanning your document and taking a selfie - or by sending documents if you cannot use the app.", pl: "Zazwyczaj odbywa się to online - na przykład za pomocą aplikacji GOV.UK ID Check, poprzez zeskanowanie dokumentu i zrobienie sobie zdjęcia (selfie) - lub poprzez wysłanie dokumentów pocztą, jeśli nie możesz skorzystać z aplikacji." },
    },
    {
      heading: { en: "Wait for your number", pl: "Oczekuj na przyznanie numeru" },
      body: { en: "You will get an email with a reference number. Your National Insurance number then arrives by post, often within about four weeks of proving your identity, though it can take longer.", pl: "Otrzymasz wiadomość e-mail z numerem referencyjnym. Twój właściwy numer National Insurance zostanie wysłany pocztą tradycyjną, zazwyczaj w ciągu około czterech tygodni od momentu potwierdzenia tożsamości, choć czasami może to potrwać dłużej." },
    },
  ],
};
