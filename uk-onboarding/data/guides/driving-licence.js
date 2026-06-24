export const drivingLicence = {
  slug: "driving-licence",
  order: 5,
  phase: "after-arrival",
  category: "extra",
  title:   { en: "Get a UK driving licence", pl: "Uzyskaj brytyjskie prawo jazdy" },
  summary: { en: "Exchange your Polish licence, or learn to drive from scratch.", pl: "Wymień polskie prawo jazdy na brytyjskie lub naucz się jeździć od zera." },
  prerequisites: ["accommodation"],
  note: { en: "Driving-licence rules depend on where your licence was issued. This guide is for holders of a Polish (EU) licence and for new drivers. Always check the latest GOV.UK guidance, as fees and rules change.", pl: "Zasady dotyczące praw jazdy zależą od kraju ich wydania. Ten przewodnik jest przeznaczony dla posiadaczy polskiego (unijnego) prawa jazdy oraz dla nowych kierowców. Zawsze sprawdzaj najnowsze wytyczne na stronie GOV.UK, ponieważ opłaty i przepisy ulegają zmianom." },
  source: "https://www.gov.uk/exchange-foreign-driving-licence", // verify current
  lastUpdated: "2026-06-16",
  disclaimer: { en: "Informational only - not official or legal advice. Check the source link for current guidance.", pl: "Materiał wyłącznie o charakterze informacyjnym - nie stanowi oficjalnej ani prawnej porady. Sprawdź link źródłowy, aby zapoznać się z aktualnymi wytycznymi." },
  pathChoice: true,
  choosePrompt: { en: "Which describes you?", pl: "Który opis pasuje do Ciebie?" },
  sections: [
    {
      title: { en: "I have a Polish driving licence", pl: "Posiadam polskie prawo jazdy" },
      blurb: { en: "Exchange your EU licence for a UK one - no driving test needed.", pl: "Wymień swoje unijne prawo jazdy na brytyjskie - bez konieczności zdawania egzaminu." },
      steps: [
        {
          heading: { en: "Check how long you can use your Polish licence", pl: "Sprawdź, jak długo możesz korzystać z polskiego prawa jazdy" },
          body: { en: "As an EU licence holder you can usually drive in Great Britain on your Polish licence until you are 70 (or for three years after becoming resident if you are 67 or older). No UK test is needed to exchange it.", pl: "Mając unijne prawo jazdy, możesz zazwyczaj prowadzić pojazdy w Wielkiej Brytanii na podstawie polskiego dokumentu do ukończenia 70. roku życia (lub przez trzy lata od momentu uzyskania statusu rezydenta, jeśli masz 67 lat lub więcej). Do jego wymiany nie jest wymagany żaden brytyjski egzamin." },
        },
        {
          heading: { en: "Decide when to exchange it", pl: "Zdecyduj, kiedy je wymienić" },
          body: { en: "You can exchange your Polish licence for a UK one at any time. Exchanging early is useful because a UK photocard licence also works as everyday proof of identity.", pl: "Polskie prawo jazdy możesz wymienić na brytyjskie w dowolnym momencie. Wczesna wymiana bywa przydatna, ponieważ brytyjskie prawo jazdy ze zdjęciem służy również jako codzienny dokument tożsamości." },
        },
        {
          heading: { en: "Apply using form D1", pl: "Złóż wniosek za pomocą formularza D1" },
          body: { en: "Exchange using DVLA form D1 (for cars and motorcycles), available from a Post Office or GOV.UK. There is a fee (around \u00A343 - check the current amount) and it usually takes about three weeks.", pl: "Wymiany dokonasz za pomocą formularza DVLA D1 (dla samochodów osobowych i motocykli), dostępnego na poczcie (Post Office) lub na stronie GOV.UK. Procedura wiąże się z opłatą (około \u00A343 - sprawdź aktualną kwotę) i trwa zazwyczaj około trzech tygodni." },
        },
        {
          heading: { en: "Send your documents to DVLA", pl: "Wyślij dokumenty do DVLA" },
          body: { en: "Send the completed form with your Polish licence and the identity documents DVLA asks for. You can keep driving while you wait, within the period you are allowed.", pl: "Wyślij wypełniony formularz wraz z polskim prawem jazdy oraz dokumentami tożsamości wymaganymi przez DVLA. W okresie oczekiwania możesz nadal prowadzić pojazdy (w ramach przysługującego Ci limitu czasu)." },
        },
      ],
    },
    {
      title: { en: "I am learning to drive from scratch", pl: "Uczę się jeździć od zera" },
      blurb: { en: "Get a provisional licence, then pass the theory and practical tests.", pl: "Uzyskaj tymczasowe prawo jazdy (provisional licence), a następnie zdaj egzamin teoretyczny i praktyczny." },
      steps: [
        {
          heading: { en: "Apply for a provisional licence", pl: "Złóż wniosek o tymczasowe prawo jazdy (provisional licence)" },
          body: { en: "You must be at least 17, be a GB resident and meet the eyesight rules. Apply for a provisional driving licence on GOV.UK.", pl: "Musisz mieć ukończone co najmniej 17 lat, mieszkać w Wielkiej Brytanii i spełniać wymogi dotyczące wzroku. Wniosek o tymczasowe prawo jazdy złożysz na stronie GOV.UK." },
        },
        {
          heading: { en: "Learn to drive and read the Highway Code", pl: "Ucz się jeździć i poznaj brytyjski kodeks drogowy (Highway Code)" },
          body: { en: "Take lessons with an approved driving instructor and practise. Read the Highway Code, which sets the rules of the road in the UK.", pl: "Weź lekcje u licencjonowanego instruktora nauki jazdy i ćwicz. Przeczytaj Highway Code, czyli oficjalny zbiór przepisów ruchu drogowego w Wielkiej Brytanii." },
        },
        {
          heading: { en: "Pass the theory test", pl: "Zdaj egzamin teoretyczny" },
          body: { en: "Book and pass the theory test (multiple-choice questions and a hazard-perception part) through GOV.UK.", pl: "Zarezerwuj i zdaj egzamin teoretyczny (składający się z pytań testowych wielokrotnego wyboru oraz części sprawdzającej dostrzeganie zagrożeń na drodze - hazard perception) za pośrednictwem GOV.UK." },
        },
        {
          heading: { en: "Pass the practical test", pl: "Zdaj egzamin praktyczny" },
          body: { en: "Book and pass the practical driving test. When you pass, DVLA sends you your full UK driving licence.", pl: "Zarezerwuj i zdaj praktyczny egzamin na prawo jazdy. Po zdaniu egzaminu DVLA prześle Ci pełne brytyjskie prawo jazdy." },
        },
      ],
    },
  ],
};
