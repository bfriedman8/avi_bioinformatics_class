import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUESTIONS } from "./questions";
import SortQuestion from "./question-types/SortQuestion";
import MCQQuestion from "./question-types/MCQQuestion";
import TriageQuestion from "./question-types/TriageQuestion";
import TrueFalseQuestion from "./question-types/TrueFalseQuestion";

export default function GamePlay({ onFinish }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(null);
  const [lastExplanation, setLastExplanation] = useState("");

  const question = QUESTIONS[currentIdx];
  const progress = ((currentIdx) / QUESTIONS.length) * 100;

  const handleAnswer = (isCorrect, explanation) => {
    const points = isCorrect ? 1 : 0;
    setScore((s) => s + points);
    setLastCorrect(isCorrect);
    setLastExplanation(explanation);
    setAnswers((prev) => [
      ...prev,
      { question, isCorrect },
    ]);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setLastCorrect(null);
    if (currentIdx + 1 >= QUESTIONS.length) {
      onFinish(score + (lastCorrect ? 1 : 0), [...answers, { question, isCorrect: lastCorrect }]);
    } else {
      setCurrentIdx((i) => i + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-10 bg-background">
      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span className="font-medium text-foreground">{question.round}</span>
          <span>{currentIdx + 1} / {QUESTIONS.length}</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        {!showFeedback && (
          <motion.div
            key={`q-${currentIdx}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-2xl"
          >
            {question.type === "sort" && (
              <SortQuestion question={question} onAnswer={handleAnswer} />
            )}
            {question.type === "mcq" && (
              <MCQQuestion question={question} onAnswer={handleAnswer} />
            )}
            {question.type === "triage" && (
              <TriageQuestion question={question} onAnswer={handleAnswer} />
            )}
            {question.type === "truefalse" && (
              <TrueFalseQuestion question={question} onAnswer={handleAnswer} />
            )}
          </motion.div>
        )}

        {showFeedback && (
          <motion.div
            key={`feedback-${currentIdx}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            <div
              className={`rounded-2xl border p-7 ${
                lastCorrect
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div className={`text-lg font-bold mb-3 ${lastCorrect ? "text-green-700" : "text-red-700"}`}>
                {lastCorrect ? "✓ Correct" : "✗ Not quite"}
              </div>
              <p className="text-sm leading-relaxed text-foreground">
                {lastExplanation}
              </p>
              <button
                onClick={handleNext}
                className="mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                {currentIdx + 1 >= QUESTIONS.length ? "See Results →" : "Next Question →"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}