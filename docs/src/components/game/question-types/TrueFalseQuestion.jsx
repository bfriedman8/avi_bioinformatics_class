import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export default function TrueFalseQuestion({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (value) => {
    if (selected !== null) return;
    setSelected(value);
    const isCorrect = value === question.answer;
    onAnswer(isCorrect, question.explanation);
  };

  const getStyle = (value) => {
    if (selected === null) {
      return "border-border bg-muted/40 hover:bg-muted text-foreground hover:border-primary/30";
    }
    if (value === question.answer) return "border-green-400 bg-green-50 text-green-800";
    if (selected === value) return "border-red-300 bg-red-50 text-red-700";
    return "border-border bg-muted/20 text-muted-foreground";
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-7 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        True or False
      </div>
      <p className="text-base sm:text-lg font-semibold text-foreground leading-snug mb-8">
        {question.prompt}
      </p>
      <div className="grid grid-cols-2 gap-4">
        {[true, false].map((val) => (
          <motion.button
            key={String(val)}
            whileHover={{ scale: selected !== null ? 1 : 1.02 }}
            whileTap={{ scale: selected !== null ? 1 : 0.97 }}
            onClick={() => handleSelect(val)}
            className={`flex flex-col items-center justify-center gap-2 py-8 rounded-2xl border font-semibold text-lg transition-all ${getStyle(val)}`}
          >
            {val ? (
              <CheckCircle2 className="w-7 h-7" />
            ) : (
              <XCircle className="w-7 h-7" />
            )}
            {val ? "True" : "False"}
          </motion.button>
        ))}
      </div>
    </div>
  );
}