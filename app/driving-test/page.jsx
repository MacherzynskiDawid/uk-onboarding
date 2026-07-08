"use client";

// app/driving-test/page.jsx
// Practice quiz for the driving-licence guide. Reads questions from
// data/driving-tests.js. Practice only, not the real test.
// A trophy is awarded and SAVED (like guide completion) on an 80% pass.

import { useState, useMemo } from "react";
import Link from "next/link";
import { drivingTests } from "@/data/driving-tests";
import { useLanguage } from "@/components/LanguageProvider";
import { useProgress } from "@/app/hooks/useProgress";
import Trophy from "@/components/Trophy";

const LETTERS = ["A", "B", "C", "D"];

export default function DrivingTestPage() {
  const { lang } = useLanguage();
  const t = (en, pl) => (lang === "en" ? en : pl);

  const { progress, toggleStep } = useProgress();

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

  const passMark = test ? Math.ceil(test.questions.length * 0.8) : 8; // 80%
  const passed = submitted && test && score >= passMark;

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
  function checkAnswers() {
    setSubmitted(true);
    // Save the badge (once) if they passed : same mechanism as guide steps.
    const key = `driving-test-${test.id}`;
    if (score >= passMark && !(progress[key] || []).includes(0)) {
      toggleStep(key, 0);
    }
  }

  // ---- Test picker ----
  if (!test) {
    return (
      <main className="quiz-wrap">
        <p style={{ marginBottom: "16px" }}>
          <Link href="/guides/driving-licence" className="quiz-back" style={{ display: "inline-block", textDecoration: "none" }}>
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
          {drivingTests.map((x) => {
            const earned = (progress[`driving-test-${x.id}`] || []).includes(0);
            return (
              <li key={x.id}>
                <button className="quiz-start" onClick={() => start(x.id)}>
                  <span>
                    {x.title[lang]}{" "}
                    <span className="quiz-count">({x.questions.length} {t("questions", "pytań")})</span>
                  </span>
                  {earned && <span className="quiz-earned" aria-label={t("Passed", "Zaliczony")}>{"\u2713"}</span>}
                </button>
              </li>
            );
          })}
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
      <button className="quiz-back" onClick={reset}>&larr; {t("All tests", "Wszystkie testy")}</button>
      <h1>{test.title[lang]}</h1>

      {submitted && (
        <>
          <div className="quiz-result" role="status">
            {t("You scored", "Twój wynik")} <strong>{score}/{test.questions.length}</strong>.{" "}
            {t("Review the answers below.", "Sprawdź odpowiedzi poniżej.")}
          </div>

          {passed ? (
            <Trophy
              label={t("Test passed!", "Test zaliczony!")}
              sub={`${test.title[lang]} (${score}/${test.questions.length})`}
            />
          ) : (
            <p className="quiz-encourage">
              {t("Almost there — review the answers below and try again.", "Już prawie — przejrzyj odpowiedzi poniżej i spróbuj ponownie.")}
            </p>
          )}
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
          onClick={checkAnswers}
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
