export const nhsRegistration = {
  slug: "nhs-gp-registration",
  order: 4,
  phase: "after-arrival",
  category: "extra",
  title:   { en: "Register with a GP (NHS)", pl: "Zarejestruj się w przychodni GP (NHS)" },
  summary: { en: "Sign up with a local doctor so you can access healthcare.", pl: "Zapisz się do lokalnego lekarza rodzinnego, aby uzyskać dostęp do opieki medycznej." },
  prerequisites: ["accommodation"],
  note: { en: "You do not need ID, proof of address or immigration status to register, though some surgeries may ask for documents to help find your records.", pl: "Do rejestracji nie potrzebujesz dokumentu tożsamości, potwierdzenia adresu ani statusu imigracyjnego, choć niektóre przychodnie mogą o nie poprosić, aby ułatwić odnalezienie Twojej dokumentacji medycznej." },
  source: "https://www.nhs.uk/nhs-services/gps/how-to-register-with-a-gp-surgery/", // verify current
  lastUpdated: "2026-06-16",
  disclaimer: { en: "Informational only - not official or medical advice. Check the source link for current guidance.", pl: "Materiał wyłącznie o charakterze informacyjnym - nie stanowi oficjalnej ani medycznej porady. Sprawdź link źródłowy, aby zapoznać się z aktualnymi wytycznymi." },
  steps: [
    {
      heading: { en: "Find a GP surgery", pl: "Znajdź przychodnię GP" },
      body: { en: "Use the NHS website to find a surgery near where you live or work, and check that it is accepting new patients.", pl: "Skorzystaj ze strony internetowej NHS, aby znaleźć przychodnię w pobliżu miejsca zamieszkania lub pracy i upewnij się, że przyjmuje ona nowych pacjentów." },
    },
    {
      heading: { en: "Register - for free", pl: "Zarejestruj się - to bezpłatne" },
      body: { en: "Register online through the 'Register with a GP surgery' service, fill in the surgery's own form, or take a paper form to reception. You only need basic details: name, date of birth and address.", pl: "Zarejestruj się online za pomocą usługi „Register with a GP surgery”, wypełnij formularz wewnętrzny przychodni lub zanieś papierowy formularz do rejestracji. Potrzebujesz jedynie podstawowych danych: imienia, nazwiska, daty urodzenia i adresu." },
    },
    {
      heading: { en: "No fixed address?", pl: "Brak stałego adresu?" },
      body: { en: "If you do not have a permanent address, you can still register using a temporary address or the address of the GP surgery itself.", pl: "Jeśli nie posiadasz stałego adresu, nadal możesz się zarejestrować, podając adres tymczasowy lub adres samej przychodni GP." },
    },
    {
      heading: { en: "Set up the NHS App", pl: "Skonfiguruj aplikację NHS App" },
      body: { en: "Once registered, download the NHS App to book appointments, order repeat prescriptions and view your medical record.", pl: "Po zarejestrowaniu się pobierz aplikację NHS App, aby rezerwować wizyty, zamawiać powtórne recepty (repeat prescriptions) i mieć wgląd w swoją historię choroby." },
    },
  ],
};
