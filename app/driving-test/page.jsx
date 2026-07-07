"use client";

// app/driving-test/page.jsx
// Practice quiz for the driving-licence guide. Reads questions from
// data/driving-tests.js. Practice only, not the real test.

import { useState, useMemo } from "react";
import Link from "next/link";
import { drivingTests } from "@/data/driving-tests";
import { useLanguage } from "@/components/LanguageProvider";
import { ui } from "@/lib/ui-strings";
import Trophy from "@/components/Trophy"; // Imported your existing Trophy component

const LETTERS = ["A", "B", "C", "D"];

export default function DrivingTestPage() {
  const { lang } = useLanguage();
  const t = (en, pl) => (lang === "en" ? en : pl);

  const [testId, setTestId] = useState(null);   // which mock test is active
  const [answers, setAnswers] = useState({});   // { questionId: chosenIndex }
  const [submitted, setSubmitted] = useState(false);

  const test = useMemo(
    () => drivingTests.find((x) => x.id === testId) || null,
    [testId]
  );

  const score = useMemo(() => {
    if (!test) return 0;
    return test.questions.reduce(
      (n, q) => (answers[q.id] === q.correct ? n + 1 : n),
      0
    );
  }, [test, answers]);

  function start(id) {
    setTestId(id);
    setAnswers({});
    setSubmitted(false);
  }
  function choose(qid, idx) {
    if (submitted) return;
    setAnswers((a) => ({ ...a, [qid]: idx }));
  }
  function reset() {
    setTestId(null);
    setAnswers({});
    setSubmitted(false);
  }

  // ---- Test picker ----
  if (!test) {
    return (
      <main className="quiz-wrap">
        <p style={{ marginBottom: "16px" }}>
          <Link href="/guides/driving-licence" className="quiz-back" style={{ display: 'inline-block', textDecoration: 'none' }}>
            &larr; {t("Back to guide", "Wróć do przewodnika")}
          </Link>
        </p>

        <h1>{t("Practice theory tests", "Testy próbne")}</h1>
        <p className="quiz-intro">
          {t(
            "Want to try your knowledge before the test? These are practice questions based on the Highway Code, not the official DVLA test.",
            "Chcesz sprawdzić swoją wiedzę przed egzaminem? To pytania ćwiczeniowe oparte na Highway Code, nie są to oficjalne pytania DVLA."
          )}
        </p>
        <ul className="quiz-picker">
          {drivingTests.map((x) => (
            <li key={x.id}>
              <button className="quiz-start" onClick={() => start(x.id)}>
                {x.title[lang]} <span>({x.questions.length} {t("questions", "pytań")})</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="quiz-official">
          {t("Book the official theory test at ", "Zarezerwuj oficjalny egzamin teoretyczny na ")}
          <a href="https://www.gov.uk/book-theory-test" target="_blank" rel="noopener noreferrer">gov.uk</a>.
        </p>
      </main>
    );
  }

  // ---- Active test ----
  const allAnswered = test.questions.every((q) => answers[q.id] !== undefined);

  return (
    <main className="quiz-wrap">
      <button className="quiz-back" onClick={reset}>← {t("All tests", "Wszystkie testy")}</button>
      <h1>{test.title[lang]}</h1>

      {submitted && (
        <>
          <div className="quiz-result" role="status">
            {t("You scored", "Twój wynik")} <strong>{score}/{test.questions.length}</strong>.{" "}
            {t("Review the answers below.", "Sprawdź odpowiedzi poniżej.")}
          </div>
          
          {/* Completion badge matching your core guide structures */}
          <Trophy 
            label={t("Practice Test Completed!", "Test próbny ukończony!")} 
            sub={`${test.title[lang]} (${score}/${test.questions.length})`} 
          />
        </>
      )}

      <ol className="quiz-list">
        {test.questions.map((q, qi) => (
          <li key={q.id} className="quiz-q">
            <p className="quiz-q-text">{qi + 1}. {q.question[lang]}</p>
            <ul className="quiz-options">
              {q.options.map((opt, idx) => {
                const chosen = answers[q.id] === idx;
                const correct = idx === q.correct;
                let cls = "quiz-opt";
                if (chosen) cls += " chosen";
                if (submitted && correct) cls += " correct";
                if (submitted && chosen && !correct) cls += " wrong";
                return (
                  <li key={idx}>
                    <button
                      className={cls}
                      onClick={() => choose(q.id, idx)}
                      aria-pressed={chosen}
                      disabled={submitted}
                    >
                      <span className="quiz-letter">{LETTERS[idx]}</span>
                      <span>{opt[lang]}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {submitted && (
              <p className="quiz-explain">
                <strong>{t("Answer", "Odpowiedź")}: {LETTERS[q.correct]}.</strong> {q.explanation[lang]}
              </p>
            )}
          </li>
        ))}
      </ol>

      {!submitted ? (
        <button
          className="quiz-submit"
          onClick={() => setSubmitted(true)}
          disabled={!allAnswered}
        >
          {allAnswered
            ? t("Check my answers", "Sprawdź moje odpowiedzi")
            : t("Answer all questions first", "Najpierw odpowiedz na wszystkie pytania")}
        </button>
      ) : (
        <div className="quiz-actions">
          <button className="quiz-submit" onClick={() => start(test.id)}>
            {t("Try again", "Spróbuj ponownie")}
          </button>
          <Link href="/guides/driving-licence" className="quiz-link">
            {t("Back to the driving guide", "Wróć do przewodnika")}
          </Link>
        </div>
      )}
    </main>
  );
}