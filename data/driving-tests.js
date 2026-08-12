export const drivingTests = [
  {
    id: 1,
    title: {
      en: "Test 1: Road Signs & Alertness",
      pl: "Test 1: Znaki drogowe i czujność",
    },
    description: {
      en: "Focuses on identifying common UK road signs, managing distractions, and maintaining awareness.",
      pl: "Skupia się na identyfikowaniu typowych znaków drogowych, zarządzaniu rozpraszaniem i utrzymaniu świadomości."
    },
    questions: [
      {
        id: "q1_1",
        question: {
          en: "You are driving behind a large vehicle. Why should you drop back further than your normal following distance?",
          pl: "Jest to związane z utrzymaniem bezpiecznej odległości i zapewnieniem lepszego widzenia drogi przed Tobą."
        },
        options: [
          { en: "To allow cars behind you to overtake safely.", pl: "Aby pozwolić samochodom za Tobą na bezpieczne przejechanie." },
          { en: "To give yourself a better view of the road ahead and ensure the lorry driver can see you in their mirrors.", pl: "Aby uzyskać lepszy widok drogi przed Tobą i zapewnić kierowcy ciężarówki, że widzi Cię w lusterkach." },
          { en: "To reduce the wind resistance acting on your car.", pl: "Aby zmniejszyć opór wiatru działający na Twój samochód." },
          { en: "To prevent your vehicle from overheating.", pl: "Aby zapobiec przegrzaniu Twojego pojazdu." }
        ],
        correct: 1,
        explanation: {
          en: "Dropping back from a large vehicle improves your forward vision and keeps you out of the driver's blind spots (the 'no-zone'). If you can't see their mirrors, they can't see you.",
          pl: "Oddalenie się od dużego pojazdu poprawia Twoje widzenie w przód i utrzymuje Cię poza strefami ślepej widoczności kierowcy (tzw. 'no-zone'). Jeśli nie możesz zobaczyć ich luster, to oni nie mogą Cię zobaczyć."
        }
      },
      {
        id: "q1_2",
        question: {
          en: "What does a circular road sign with a red border and a plain white center mean?",
          pl: "Co oznacza okrągły znak drogowy z czerwonym obramowaniem i białym środkiem?"
        },
        options: [
          { en: "No entry for all vehicles.", pl: "Zakaz wjazdu dla wszystkich pojazdów." },
          { en: "End of all speed restrictions.", pl: "Koniec wszystkich ograniczeń prędkości." },
          { en: "No vehicles (except non-mechanically propelled vehicles).", pl: "Zakaz ruchu pojazdów (z wyjątkiem pojazdów nieporuszanych mechanicznie)." },
          { en: "No vehicles except bicycles.", pl: "Zakaz ruchu pojazdów (z wyjątkiem rowerów)." }
        ],
        correct: 2,
        explanation: {
          en: "A circular sign with a red border means prohibition. A plain white center with a red border indicates 'No vehicles'. This is distinct from a 'No Entry' sign, which is a solid red circle with a horizontal white bar.",
          pl: "Okrągły znak z czerwonym obramowaniem oznacza zakaz. Biały środek z czerwonym obramowaniem wskazuje na 'Zakaz ruchu pojazdów'. Jest to inne niż znak 'Zakaz wjazdu', który jest czerwonym kołem z poziomą białą kreską."
        }
      },
      {
        id: "q1_3",
        question: {
          en: "You are driving on a wet road. What is the recommended safe following distance from the vehicle ahead?",
          pl: "Jest to związane z utrzymaniem bezpiecznej odległości i zapewnieniem lepszego widzenia drogi przed Tobą."
        },
        options: [
          { en: "At least one second.", pl: "Przynajmniej jeden sekundę." },
          { en: "At least two seconds.", pl: "Przynajmniej dwa sekundy." },
          { en: "At least four seconds.", pl: "Przynajmniej cztery sekundy." },
          { en: "At least six seconds.", pl: "Przynajmniej sześć sekund." }
        ],
        correct: 2,
        explanation: {
          en: "While the normal safe gap on a dry road is two seconds (the 'two-second rule'), stopping distances double on wet roads, meaning you should allow a gap of at least four seconds.",
          pl: "Podczas gdy normalna bezpieczna odległość na suchym drodze to dwa sekundy (tzw. 'reguła dwóch sekund'), odległość hamowania podwaja się na mokrych dróg, co oznacza, że powinieneś zachować odstęp co najmniej czterech sekund."
        }
      },
      {
        id: "q1_4",
        question: {
          en: "What should you do if you miss your exit on a busy motorway?",
          pl: "Co powinieneś zrobić, jeśli przegapisz swój wyjazd na zajętej autostradzie?"
        },
        options: [
          { en: "Carefully reverse back along the hard shoulder.", pl: "Ostrożnie cofnij się wzdłuż pasu awaryjnego." },
          { en: "Perform a U-turn across the central reservation channels.", pl: "Wykonaj U-wyjazd przez centralne kanały rezerwacyjne." },
          { en: "Pull over and wait for the traffic to clear.", pl: "Zatrzymaj się i zaczekaj, aż ruch się uspokoi." },
          { en: "Continue to the next exit and look for an alternative route.", pl: "Kontynuuj do następnego wyjazdu i poszukaj alternatywnego szlaku." }
        ],
        correct: 3,
        explanation: {
          en: "You must never reverse, reverse down a slip road, or attempt a U-turn on a motorway. Always proceed safely to the next junction.",
          pl: "Nigdy nie można cofać się, cofać się wzdłuż drogi zjazdowej lub próbować wykonać U-wyjazd na autostradzie. Zawsze bezpiecznie kontynuuj jazdę do następnego złącza."
        }
      },
      {
        id: "q1_5",
        question: {
          en: "Which of the following is most likely to cause a serious distraction while driving?",
          pl: "Która z poniższych opcji jest najbardziej prawdopodobna do powstawania poważnych rozpraszających sytuacji podczas prowadzenia pojazdu?"
        },
        options: [
          { en: "Using a hands-free phone system to quickly check a route.", pl: "Używanie systemu telefonu bez rączki do szybkiego sprawdzania trasy." },
          { en: "Adjusting your door mirrors before moving off.", pl: "Dostosowywanie lusterek przed wyjazdem." },
          { en: "Glancing at your speedometer regularly.", pl: "Regularne spojrzenie na predkościomierz." },
          { en: "Composing a text message on a handheld mobile phone.", pl: "Pisanie wiadomości tekstowych na telefonie komórkowym." }
        ],
        correct: 3,
        explanation: {
          en: "Using a handheld mobile phone draws your hands, eyes, and mind away from driving. It is both highly dangerous and illegal.",
          pl: "Używanie telefonu komórkowego w ręku przyciąga Twoje ręce, oczy i umysł od prowadzenia pojazdu. Jest to zarówno bardzo niebezpieczne, jak i nielegalne."
        }
      },
      {
        id: "q1_6",
        question: {
          en: "What does a blue circular sign containing a white arrow pointing diagonally down and left mean?",
          pl: "Co oznacza niebieski znak okrągły zawierający białą strzałkę wskazującą na ukos w dół i w lewo?"
        },
        options: [
          { en: "No left turn permitted.", pl: "Zabronione skręcanie w lewo." },
          { en: "Turn left ahead.", pl: "Skreśl w lewo." },
          { en: "One-way street ahead.", pl: "Jednokierunkowa droga." },
          { en: "Keep left.", pl: "Trzymaj się lewej strony." }
        ],
        correct: 3,
        explanation: {
          en: "Blue circles give positive mandatory instructions. A diagonal arrow pointing down and left means you must 'Keep left' of an obstacle or traffic island. (A horizontal arrow would mean 'Turn left').",
          pl: "Niebieskie okręgi dają pozytywne obowiązujące instrukcje. Strzałka skośna w dół i w lewo oznacza, że musisz 'Trzymać się lewej strony' obok przeszkody lub wyspy ruchu. (Strzałka pozioma oznacza 'Skręć w lewo')."
        }
      },
      {
        id: "q1_7",
        question: {
          en: "You are approaching a zebra crossing. What should you do if a pedestrian is waiting to cross?",
          pl: "Zbliżasz się do przejścia dla pieszych. Co powinieneś zrobić, jeśli pieszy czeka na przejście?"
        },
        options: [
          { en: "Wave them across to show it is safe.", pl: "Machaj im, aby pokazać, że jest to bezpieczne." },
          { en: "Sound your horn to alert them to your presence.", pl: "Dźwiękownica, aby zwrócić uwagę na swoje obecność." },
          { en: "Be prepared to slow down and stop to let them cross.", pl: "Bądź gotowy, aby zwolnić i zatrzymać się, aby im pozwolić przejść." },
          { en: "Maintain your speed unless they step onto the road.", pl: "Utrzymanie prędkości, chyba że kroczą na drogę." }
        ],
        correct: 2,
        explanation: {
          en: "According to the Highway Code, you should look out for pedestrians waiting to cross and be ready to slow down and stop to give way.",
          pl: "Zgodnie z Kodeksem Drogowym, powinieneś szukać pieszych czekających na przejście i być gotowym do zwolnienia i zatrzymania się, aby im ustąpić."
        }
      },
      {
        id: "q1_8",
        question: {
          en: "What color are the reflective studs between a motorway slip road and the main carriageway?",
          pl: "Jakiego koloru są lusterka odblaskowe między drogą szybką a główną drogą?"
        },
        options: [
          { en: "Green", pl: "Zielony" },
          { en: "Red", pl: "Czerwony" },
          { en: "White", pl: "Biały" },
          { en: "Amber", pl: "Pomarańczowy" }
        ],
        correct: 0,
        explanation: {
          en: "Green studs mark the edge of main carriageways at slip roads and lay-bys. (Red marks the left breakdown shoulder, amber marks the central reservation, and white marks lanes).",
          pl: "Zielone lusterka odblaskowe oznaczają krawędź głównych dróg na drogach zjazdowych i postoju. (Czerwone oznaczają lewy pas awaryjny, pomarańczowe oznaczają centralną rezerwę, a białe oznaczają pasa.)"
        }
      },
      {
        id: "q1_9",
        question: {
          en: "According to the Highway Code, when are you allowed to flash your headlights at another road user?",
          pl: "Według Kodeksu Drogowego, kiedy możesz migać światłami drogowymi do innego użytkownika drogi?"
        },
        options: [
          { en: "To show that you are giving way to them.", pl: "Aby pokazać, że ustępujesz im." },
          { en: "Only to let other road users know that you are there.", pl: "Tylko aby poinformować innych użytkowników drogi, że jesteś tam." },
          { en: "To tell them they can pull out of a junction.", pl: "Aby powiedzieć im, że mogą wyjechać z skrzyżowania." },
          { en: "To express your annoyance at their driving.", pl: "Aby wyrazić swoje zaniepokojenie z powodu ich jazdy." }
        ],
        correct: 1,
        explanation: {
          en: "Highway Code Rules 110 and 111 state you should only flash your headlights to let other road users know you are there, never to signal instructions, invite them to proceed, or show aggression.",
          pl: "Zgodnie z regulaminem Kodeksu Drogowego, powinieneś migać światłami drogowymi tylko wtedy, gdy chcesz poinformować innych użytkowników drogi, że jesteś tam, nigdy nie do sygnalizowania instrukcji, zachęcania ich do kontynuowania jazdy lub pokazywania agresji."
        }
      },
      {
        id: "q1_10",
        question: {
          en: "You feel drowsy while driving on a long motorway journey. What should you do?",
          pl: "Czujesz się zmęczony podczas jazdy na długiej drodze szybkiej. Co powinieneś zrobić?"
        },
        options: [
          { en: "Open the window and speed up to reach your destination faster.", pl: "Otwórz okno i przyspiesz, aby dotrzeć do miejsca docelowego szybciej." },
          { en: "Turn the radio up to maximum volume.", pl: "Zwiększ głośność radia." },
          { en: "Pull over on the hard shoulder for a brief rest.", pl: "Zatrzymaj się na pasie awaryjnym na krótki czas." },
          { en: "Leave at the next exit or services, find a safe spot, and rest.", pl: "Opuść drogę na najbliższym wyjeździe lub stacji benzynowej, znajdź bezpieczne miejsce i odpocznij." }
        ],
        correct: 3,
        explanation: {
          en: "Never use the hard shoulder for rest. Exit the motorway or pull into a service station, take a break, and consider having a caffeinated drink.",
          pl: "Nigdy nie używaj pasa awaryjnego do odpoczynku. Opuść autostradę lub wjedź na stację benzynową, zrób przerwę i rozważ wypicie kawy."
        }
      }
    ]
  },
  {
    id: 2,
    title: {
      en: "Test 2: Vehicle Safety & Road Rules",
      pl: "Test 2: Bezpieczeństwo pojazdów i zasady ruchu"
    },
    description: {
      en: "Covers mechanical safety checks, speed limits, and appropriate lane discipline.",
      pl: "Obejmuje kontrole bezpieczeństwa mechanicznego, ograniczenia prędkości i odpowiednią dyscyplinę pasów ruchu."
    },
    questions: [
      {
        id: "q2_1",
        question: {
          en: "Unless otherwise signed, what is the national speed limit for a car on a single carriageway road?",
          pl: "Jeśli nie jest to zaznaczone inaczej, jaki jest krajowy limit prędkości dla samochodu na drodze jednokierunkowej?"
        },
        options: [
          { en: "50 mph", pl: "50 mph" },
          { en: "60 mph", pl: "60 mph" },
          { en: "70 mph", pl: "70 mph" },
          { en: "40 mph", pl: "40 mph" }
        ],
        correct: 1,
        explanation: {
          en: "The national speed limit for cars and motorcycles on a single carriageway road is 60 mph. On a dual carriageway or motorway, it is 70 mph.",
          pl: "Krajowy limit prędkości dla samochodów i motocykli na drodze jednokierunkowej to 60 mph. Na drodze dwukierunkowej lub autostradzie, to 70 mph."
        }
      },
      {
        id: "q2_2",
        question: {
          en: "What is the legal minimum tread depth for car tires in the UK?",
          pl: "Jaka jest legalna minimalna głębokość bieżnika dla opon samochodowych w Wielkiej Brytanii?"
        },
        options: [
          { en: "1.0 mm", pl: "1.0 mm" },
          { en: "1.6 mm", pl: "1.6 mm" },
          { en: "2.5 mm", pl: "2.5 mm" },
          { en: "4.0 mm", pl: "4.0 mm" }
        ],
        correct: 1,
        explanation: {
          en: "The legal minimum tread depth for car and light trailer tires is 1.6 mm across the central three-quarters of the tread, all the way around.",
          pl: "Legalna minimalna głębokość bieżnika dla opon samochodowych i lekkich przyczep w Wielkiej Brytanii to 1.6 mm na centralnych trzech czwartych bieżnika, w całości."
        }
      },
      {
        id: "q2_3",
        question: {
          en: "When should you check your car's tire pressures?",
          pl: "Kiedy powinieneś sprawdzić ciśnienie w oponach swojego samochodu?"
        },
        options: [
          { en: "After a long, fast motorway drive.", pl: "Po długim, szybkim jazdzie po autostradzie." },
          { en: "While the tires are cold.", pl: "Podczas gdy opony są zimne." },
          { en: "Only when the vehicle is heavily loaded.", pl: "Tylko gdy pojazd jest ciężko załadowany." },
          { en: "Every time you stop to refuel.", pl: "Za każdym razem, gdy zatrzymujesz się na tankowanie." }
        ],
        correct: 1,
        explanation: {
          en: "Tire pressures should be checked when they are cold to get an accurate reading. Driving heats up tires, which increases the air pressure inside and skews results.",
          pl: "Ciśnienie w oponach powinno być sprawdzane, gdy są zimne, aby uzyskać dokładny wynik. Jazda nagrzewa opony, co zwiększa ciśnienie powietrza wewnątrz i skutkuje błędami."
        }
      },
      {
        id: "q2_4",
        question: {
          en: "What does a single yellow line along the side of the road indicate?",
          pl: "Co oznacza pojedyncza żółta linia biegnąca wzdłuż krawędzi drogi?"
        },
        options: [
          { en: "No parking at any time whatsoever.", pl: "Brak parkowania w żadnym przypadku." },
          { en: "Waiting restrictions apply at certain times, shown on nearby signs.", pl: "Ograniczenia oczekiwania obowiązują w określonych godzinach, jak pokazano na pobliskich znakach." },
          { en: "You can park there whenever you want.", pl: "Możesz tam parkować, gdy chcesz." },
          { en: "It is a designated loading bay for commercial vehicles.", pl: "To wyznaczony bay załadunkowy dla pojazdów komercyjnych." }
        ],
        correct: 1,
        explanation: {
          en: "Single yellow lines mean waiting restrictions apply at specific times. Check the nearby mini-timetables or zone entry signs for rules.",
          pl: "Pojedyncze żółte linie oznaczają, że obowiązują ograniczenia oczekiwania w określonych godzinach. Sprawdź pobliskie mini-rozklady lub znaki wejścia do strefy, aby poznać zasady."
        }
      },
      {
        id: "q2_5",
        question: {
          en: "When driving through a dynamic smart motorway, what does a red 'X' displayed above a lane mean?",
          pl: "Co oznacza czerwone 'X' wyświetlane nad pasem ruchu na inteligentnej autostradzie?"
        },
        options: [
          { en: "The speed limit in that lane is temporarily reduced.", pl: "Limit prędkości w tym pasie jest tymczasowo obniżony." },
          { en: "You must not drive in that lane.", pl: "Nie możesz jechać w tym pasie." },
          { en: "The lane is open only to high-occupancy vehicles.", pl: "Pass is open only to high-occupancy vehicles." },
          { en: "Breakdown assistance is waiting ahead in that lane.", pl: "Pomoc techniczna czeka naprzeciwko w tym pasie." }
        ],
        correct: 1,
        explanation: {
          en: "A red 'X' means the lane is closed due to an incident or broken-down vehicle ahead. Driving in it is illegal and highly dangerous.",
          pl: "Czerwone 'X' oznacza, że pas jest zamknięty z powodu zdarzenia lub zniszczonego pojazdu naprzeciwko. Jazda w nim jest nielegalna i bardzo niebezpieczna."
        }
      },
      {
        id: "q2_6",
        question: {
          en: "In which of these situations should you avoid overtaking?",
          pl: "W których z tych sytuacji powinieneś unikać przekraczania?"
        },
        options: [
          { en: "On a one-way street with multiple lanes.", pl: "Na jednokierunkowej drodze z wieloma pasami." },
          { en: "Approaching the brow of a hill or a sharp bend.", pl: "Podczas zbliżania się do wierzchołka wzgórza lub ostrego zakrętu." },
          { en: "On a dual carriageway with a 70 mph limit.", pl: "Na dwurolniczej drodze z limitem 70 mph." },
          { en: "When passing a cyclist traveling at 5 mph.", pl: "Podczas mijania rowerzysty poruszającego się z prędkością 5 mph." }
        ],
        correct: 1,
        explanation: {
          en: "Never attempt to overtake if your view ahead is blocked, such as by a dip, a sharp bend, or the crest of a hill.",
          pl: "Nigdy nie próbuj przekraczać, jeśli widok naprzeciwko jest zablokowany, np. przez wypukłość, ostry zakręt lub wierzchołek wzgórza."
        }
      },
      {
        id: "q2_7",
        question: {
          en: "What fluid level should be topped up to prevent your brakes from failing?",
          pl: "Jaki poziom cieczy powinien być uzupełniony, aby zapobiec awarii hamulców?"
        },
        options: [
          { en: "Engine oil", pl: "Olej silnika" },
          { en: "Coolant fluid", pl: "Ciecz chłodząca" },
          { en: "Brake fluid", pl: "Ciecz hamulcowa" },
          { en: "Power steering fluid", pl: "Ciecz do układu kierownicy" }
        ],
        correct: 2,
        explanation: {
          en: "Low brake fluid can let air enter the hydraulic braking system, leading to a spongy pedal feel or total loss of stopping power.",
          pl: "Niski poziom cieczy hamulcowej może pozwolić powietrzu wejść do układu hydraulicznego hamulców, co prowadzi do miękkiego odczucia pedału lub całkowitego utraty mocy hamowania."
        }
      },
      {
        id: "q2_8",
        question: {
          en: "When entering a roundabout, who generally has priority?",
          pl: "Kto ogólnie ma priorytet przy wjeżdżaniu na rondo?"
        },
        options: [
          { en: "Traffic approaching from your right.", pl: "Ruch zbliżający się z twojej prawej strony." },
          { en: "Traffic approaching from your left.", pl: "Ruch zbliżający się z twojej lewej strony." },
          { en: "Larger vehicles already waiting to enter.", pl: "Większe pojazdy już czekające na wjazd." },
          { en: "Vehicles that blink their indicators first.", pl: "Pojazdy, które najpierw mrugają sygnałami kierunkowymi." }
        ],
        correct: 0,
        explanation: {
          en: "Unless signs or lane markings say otherwise, give priority to traffic already on the roundabout coming from your right.",
          pl: "O ile znaki drogowe lub oznaczenia nie mówią inaczej, nadaj priorytet ruchowi już na rondzie, który nadjeżdża z twojej prawej strony."
        }
      },
      {
        id: "q2_9",
        question: {
          en: "What does it mean if your vehicle begins to 'aquaplane' on a wet road?",
          pl: "Co oznacza, gdy twój pojazd zaczyna 'aquaplanować' na mokrej drodze?"
        },
        options: [
          { en: "Your brakes have locked up completely.", pl: "Twoje hamulce są całkowicie zablokowane." },
          { en: "Your steering becomes stiff and hard to turn.", pl: "Twoja kierownica staje się sztywna i trudna do obracenia." },
          { en: "Your tires lose contact with the road surface and ride on a thin film of water.", pl: "Opony tracą kontakt z powierzchnią drogi i jadą na cienkiej warstwie wody." },
          { en: "Your exhaust is emitting excessive water vapor.", pl: "Wydech emuluje nadmiar pary wodnej." }
        ],
        correct: 2,
        explanation: {
          en: "Aquaplaning happens when surface water builds up faster than the tire tread can clear it, causing the car to slide on water. Ease off the accelerator to regain control.",
          pl: "Aquaplanowanie dzieje się, gdy woda powierzchniowa zbiera się szybciej niż poręcz opon może ją usunąć, co powoduje ślizganie się samochodu po wodzie. Zmniejsz pedał gazu, aby odzyskać kontrolę."
        }
      },
      {
        id: "q2_10",
        question: {
          en: "You are parking downhill next to a kerb. How should you position your front wheels to secure the vehicle?",
          pl: "Kiedy parkujesz w dół poza krawędzią, jak powinieneś ustawić przednie koła, aby zabezpieczyć pojazd?"
        },
        options: [
          { en: "Keep them pointing straight ahead.", pl: "Zachowaj ich kierunek prosto do przodu." },
          { en: "Turn them sharply towards the kerb.", pl: "Obróć je ostro w stronę krawędzi." },
          { en: "Turn them sharply away from the kerb.", pl: "Obróć je ostro w stronę od krawędzi." },
          { en: "It doesn't matter as long as the handbrake is tight.", pl: "Nie ma znaczenia, o ile hamulec ręczny jest dobrze założony." }
        ],
        correct: 1,
        explanation: {
          en: "Turning your wheels towards the kerb means that if your handbrake fails, the tyre will roll into the kerb and stop the car, rather than letting it roll out into the road.",
          pl: "Obracanie koła w stronę krawędzi oznacza, że jeśli twój hamulec ręczny zawiedzie, opona zjeżdży na krawędź i zatrzyma samochód, zamiast pozwolić mu zjechać na drogę."
        }
      }
    ]
  },
  {
    id: 3,
    title: {
      en: "Test 3: Vulnerable Road Users & Hazards",
      pl: "Test 3: Wrażliwe Użytkowniki Drogowych i zagrożenia"
    },
    description: {
      en: "Focuses on safely sharing the road with pedestrians, cyclists, horses, and navigating bad weather.",
      pl: "Skupia się na bezpiecznym dzieleniu drogi z pieszymi, rowerzystami, końmi i poruszaniu się w złych warunkach pogodowych."
    },
    questions: [
      {
        id: "q3_1",
        question: {
          en: "You want to overtake a cyclist on a wide road. How much room should you give them?",
          pl: "Chcesz przejechać rowerzystę na szerokiej drodze. Ile miejsca powinieneś im dać?"
        },
        options: [
          { en: "At least 0.5 metres.", pl: "Przynajmniej 0.5 metra." },
          { en: "At least 1.5 metres.", pl: "Przynajmniej 1.5 metra." },
          { en: "Just enough space to pass without clipping them.", pl: "Wystarczająco dużo miejsca, aby przejechać bez dotykania ich." },
          { en: "Cyclists should always give way to cars.", pl: "Rowerzyści zawsze powinni ustąpić drogi samochodom." }
        ],
        correct: 1,
        explanation: {
          en: "The Highway Code requires you to give cyclists at least 1.5 metres of space when overtaking at speeds up to 30 mph, and more at higher speeds.",
          pl: "Kodeks Drogowy wymaga, abyś dał rowerzystom przynajmniej 1.5 metra przestrzeni podczas mijania przy prędkościach do 48 km/h, a więcej przy wyższych prędkościach."
        }
      },
      {
        id: "q3_2",
        question: {
          en: "Why should you take extra care when passing a horse and rider on a country lane?",
          pl: "Dlaczego powinieneś być szczególnie ostrożny podczas mijania konia i jeźdźca na wsi?"
        },
        options: [
          { en: "Horses are unpredictable and can easily spook if startled by noise or speed.", pl: "Koń jest nieprzewidywalny i może łatwo przestraszyć się hałasem lub prędkością." },
          { en: "The rider might not see you coming.", pl: "Jezdca może nie zauważyć, że się zbliżasz." },
          { en: "Horses always have the absolute legal right of way on all lanes.", pl: "Koń zawsze ma bezwzględną legalną prawo jazdy na wszystkich pasach." },
          { en: "The mud from the horse's hooves could crack your windscreen.", pl: "Muł z kopyt konia może przysłużyć do rozbicia szyby." }
        ],
        correct: 0,
        explanation: {
          en: "Horses are large, easily startled animals. Pass them slowly (under 10 mph) and give them plenty of space (at least 2 metres).",
          pl: "Koń jest dużym, łatwo przestraszonym zwierzęciem. Przejeżdżaj obok nich powoli (poniżej 16 km/h) i dawaj im dużo miejsca (przynajmniej 2 metry)."
        }
      },
      {
        id: "q3_3",
        question: {
          en: "When driving in dense fog, when should you switch on your rear fog lights?",
          pl: "Kiedy powinieneś włączyć tylnie światła mgły podczas jazdy w gestej mgle?"
        },
        options: [
          { en: "Whenever it starts raining lightly.", pl: "Zawsze, gdy zaczyna lekko padać." },
          { en: "When visibility drops below 100 metres.", pl: "Gdy widoczność spada poniżej 100 metrów." },
          { en: "Only when driving on motorways at night.", pl: "Tylko podczas jazdy na autostradach w nocy." },
          { en: "As soon as daylight fades.", pl: "Jak tylko światło dnia zaczyna zanikać." }
        ],
        correct: 1,
        explanation: {
          en: "Rear fog lights should only be used when visibility is seriously reduced, defined as less than 100 metres (328 feet). Switch them off when visibility improves.",
          pl: "Tylnie światła mgły powinny być używane tylko wtedy, gdy widoczność jest poważnie ograniczona, zdefiniowane jako mniej niż 100 metrów (1097 stóp). Wyłącz je, gdy widoczność się poprawi."
        }
      },
      {
        id: "q3_4",
        question: {
          en: "You see a pedestrian carrying a white cane with a red band around it. What does this indicate?",
          pl: "Co to oznacza, gdy widzisz osoby bezpieczne z białą laską z czerwonym pasem wokół?"
        },
        options: [
          { en: "The pedestrian is a regular commuter.", pl: "Osoba bezpieczna jest zwykłym pasażerem." },
          { en: "The pedestrian is visually impaired.", pl: "Osoba bezpieczna jest osłabioną wzrokiem." },
          { en: "The pedestrian is deaf.", pl: "Osoba bezpieczna jest głuchym." },
          { en: "The pedestrian is both deaf and visually impaired.", pl: "Osoba bezpieczna jest zarówno głuchym, jak i osłabioną wzrokiem." }
        ],
        correct: 3,
        explanation: {
          en: "A plain white cane shows a pedestrian is visually impaired. A cane with a red reflective band indicates that they are both deaf and visually impaired.",
          pl: "Biała laska pokazuje, że pieszy jest osłabiony wzrokiem. Laska z czerwonym odblaskowym pasem wskazuje, że są zarówno głusi, jak i osłabieni wzrokiem."
        }
      },
      {
        id: "q3_5",
        question: {
          en: "What is coasting, and why can it be a hazardous practice?",
          pl: "Co to jest 'coasting' i dlaczego może być niebezpieczne?"
        },
        options: [
          { en: "Driving with your headlights switched off at night.", pl: "Jazda z wyłączonymi światłami w nocy." },
          { en: "Traveling in neutral or with the clutch held down, reducing your control over the vehicle.", pl: "Podróżowanie w stanie neutralnym lub z przytrzymanym pedałem sprzęgła, redukując kontrolę nad pojazdem." },
          { en: "Cruising at a steady speed on a clear motorway.", pl: "Jazda z stałym prędkością na czystej autostradzie." },
          { en: "Relying purely on your parking brake to slow down.", pl: "Zależność wyłącznie od hamulca ręcznego do zwolnienia." }
        ],
        correct: 1,
        explanation: {
          en: "Coasting removes engine braking, which means the car can quickly pick up speed on downhills and your braking response changes.",
          pl: "Coasting usuwa hamowanie silnika, co oznacza, że auto może szybko zwiększyć prędkość na zjazdach i Twoja reakcja hamowania ulega zmianie."
        }
      },
      {
        id: "q3_6",
        question: {
          en: "You are following a cyclist approaching a roundabout. What should you expect them to do?",
          pl: "Co powinieneś oczekiwać, że zrobą rowerzyści zbliżający się do ronda?"
        },
        options: [
          { en: "Dismount and walk their bike across the entries.", pl: "Zsiąść i iść pieszo na rowerze przez wejścia." },
          { en: "Signal and stay in the left-hand lane even if they intend to turn right.", pl: "Zasinalizować i pozostać w lewym pasie, nawet jeśli mają zamiar skręcić w prawo." },
          { en: "Use the middle of the road to cut through the lanes.", pl: "Użyć środka drogi, aby przejechać przez pasy." },
          { en: "Always signal left and exit at the first opportunity.", pl: "Zawsze sygnalizować lewo i opuścić na pierwszej okazji." }
        ],
        correct: 1,
        explanation: {
          en: "Cyclists may stay in the left lane of a roundabout for safety reasons, even when turning right. Give them plenty of room to navigate.",
          pl: "Rowerzyści mogą pozostać w lewym pasie ronda z powodów bezpieczeństwa, nawet gdy skręcają w prawo. Daj im wystarczająco dużo miejsca do poruszania się."
        }
      },
      {
        id: "q3_7",
        question: {
          en: "What does an amber flashing light on top of a vehicle mean?",
          pl: "Co oznacza pomarańczowy migający sygnał na górze pojazdu?"
        },
        options: [
          { en: "An emergency services vehicle responding to a call.", pl: "Pojazd służb awaryjnych odpowiadający na wezwanie." },
          { en: "A high-speed police chase is underway.", pl: "Trwa gonięcie policyjne na dużych prędkościach." },
          { en: "A slow-moving or stationary maintenance vehicle.", pl: "Wolno poruszający się lub nieruchomy pojazd serwisowy." },
          { en: "A school bus dropping off passengers.", pl: "Autobus szkolny wysyłający pasażerów." }
        ],
        correct: 2,
        explanation: {
          en: "Amber flashing beacons warn you of a slow-moving, wide, or stationary vehicle, such as a recovery truck, tractor, or road maintenance crew.",
          pl: "Pomarańczowe migające sygnały ostrzegają o wolno poruszającym się, szerokim lub nieruchomym pojeździe, takim jak ciężarówka ratunkowa, combine lub ekipa serwisowa drogowa."
        }
      },
      {
        id: "q3_8",
        question: {
          en: "What should you do before moving off from a parked position behind another car?",
          pl: "Co powinieneś zrobić przed wyjściem z postoju za innym pojazdem?"
        },
        options: [
          { en: "Flash your lights to alert the driver in front.", pl: "Migaj światłami, aby ostrzec kierowcę przed sobą." },
          { en: "Check all your mirrors and perform a physical blind-spot look over your shoulder.", pl: "Sprawdź wszystkie lustra i przeprowadź fizyczny check w strefie niewidoczności nad ramą samochodu." },
          { en: "Sound your horn to warn passing pedestrians.", pl: "Zadźwięcznij klaksonem, aby ostrzec przechodzących." },
          { en: "Signal right and pull out immediately to claim your lane.", pl: "Zasinalizuj prawo i natychmiast wyjeżdżaj, aby zająć swój pas." }
        ],
        correct: 1,
        explanation: {
          en: "Mirrors don't show everything. You must perform a physical over-the-shoulder check into your blind spot to ensure no cyclists, bikes, or cars are overtaking you.",
          pl: "Lustra nie pokazują wszystkiego. Musisz przeprowadzić fizyczny check w strefie niewidoczności nad ramą samochodu, aby upewnić się, że żadne rowerzysty, rowery lub samochody nie mijają cię."
        }
      },
      {
        id: "q3_9",
        question: {
          en: "You are driving at night. When must you dip your high-beam headlights?",
          pl: "Gdy jadiesz w nocy, kiedy musisz zgasnąć światła długie?"
        },
        options: [
          { en: "When you enter a built-up area with streetlights.", pl: "Gdy wchodzisz do obszaru zabudowanego z ulicznymi światłami." },
          { en: "When you are following closely behind another vehicle or meeting oncoming traffic.", pl: "Gdy śledzisz closely za innym pojazdem lub spotykasz ruch w przeciwnym kierunku." },
          { en: "Only when another driver flashes their lights at you.", pl: "Tylko gdy inny kierowca migający światłami na ciebie." },
          { en: "Both A and B are correct.", pl: "Oboth A and B are correct." }
        ],
        correct: 3,
        explanation: {
          en: "You must dip your headlights in built-up areas with street lighting, and also when meeting oncoming vehicles or trailing behind another driver to avoid dazzling them.",
          pl: "Powinieneś zgasnąć światła w obszarach zabudowanych z oświetleniem ulicznym, a także podczas spotykania nadjeżdżających pojazdów lub podążania za innym kierowcą, aby ich nie oślepiać."
        }
      },
      {
        id: "q3_10",
        question: {
          en: "What should you do if your car breaks down on a smart motorway with no hard shoulder?",
          pl: "Co powinieneś zrobić, jeśli twój samochód ulegnie awarii na smart motorway bez stałego pasu awaryjnego?"
        },
        options: [
          { en: "Stop in whichever lane you are in and put your hazards on immediately.", pl: "Zatrzymaj się w dowolnym pasie, w którym się znajdujesz, i włącz sygnały awaryjne natychmiast." },
          { en: "Try to get the vehicle to an Emergency Area (EA), exit, or slip road if possible.", pl: "Spróbuj dostarczyć pojazd do Zaznaczonego Obszaru Awaryjnego (EA), wyjścia lub drogi zjazdowej, jeśli to możliwe." },
          { en: "Step out into the running lane to wave down other drivers.", pl: "Wyjdź na pas ruchu, aby zatrzymać innych kierowców." },
          { en: "Stay inside the car without hazards and call a private mechanic.", pl: "Zostań w samochodzie bez sygnałów awaryjnych i zadzwoń do prywatnego mechanika." }
        ],
        correct: 1,
        explanation: {
          en: "If you run into trouble on a smart motorway without a permanent hard shoulder, try to make it to a marked Emergency Area, an exit slip road, or the far left lane before stopping.",
          pl: "Jeśli napotkasz kłopot na smart motorway bez stałego pasu awaryjnego, spróbuj dotrzeć do oznaczonego Obszaru Awaryjnego, drogi zjazdowej lub lewego pasa przed zatrzymaniem."
        }
      }
    ]
  }
];