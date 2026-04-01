import { useState } from "react";
import { motion } from "framer-motion";

export default function MCQQuestion({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (choice) => {
    if (selected) return;
    setSelected(choice);
    const isCorrect = choice === question.answer;
    onAnswer(isCorrect, question.explanation);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-7 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        Multiple Choice
      </div>
      <p className="text-base sm:text-lg font-semibold text-foreground leading-snug mb-7">
        {question.prompt}
      </p>
      <div className="space-y-3">
        {question.choices.map((choice, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: selected ? 1 : 1.01 }}
            whileTap={{ scale: selected ? 1 : 0.99 }}
            onClick={() => handleSelect(choice)}
            className={`w-full text-left px-5 py-4 rounded-xl border text-sm leading-snug transition-all font-medium
              ${
                selected === null
                  ? "border-border bg-muted/40 hover:bg-muted hover:border-primary/30 text-foreground"
                  : choice === question.answer
                  ? "border-green-400 bg-green-50 text-green-800"
                  : selected === choice
                  ? "border-red-300 bg-red-50 text-red-700"
                  : "border-border bg-muted/20 text-muted-foreground"
              }`}
          >
            <span className="mr-3 text-muted-foreground font-normal">
              {String.fromCharCode(65 + i)}.
            </span>
            {choice}
          </motion.button>
        ))}
      </div>
    </div>
  );
}