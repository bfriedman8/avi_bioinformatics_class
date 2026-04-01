import { useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function TriageQuestion({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (choice) => {
    if (selected) return;
    setSelected(choice.label);
    const isCorrect = choice.label === question.answer;
    onAnswer(isCorrect, question.explanation);
  };

  const getStyle = (label) => {
    if (selected === null)
      return "border-border bg-muted/40 hover:bg-muted text-foreground hover:border-primary/30";
    if (label === question.answer) return "border-green-400 bg-green-50 text-green-800";
    if (selected === label) return "border-red-300 bg-red-50 text-red-700";
    return "border-border bg-muted/20 text-muted-foreground";
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-7 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        Triage the Case
      </div>

      {/* Scenario box */}
      <div className="bg-muted/60 border border-border rounded-xl p-5 mb-6 flex gap-3">
        <FileText className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-sm text-foreground leading-relaxed">{question.scenario}</p>
      </div>

      <p className="text-base font-semibold text-foreground mb-5">{question.question}</p>

      <div className="space-y-3">
        {question.choices.map((choice, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: selected ? 1 : 1.01 }}
            whileTap={{ scale: selected ? 1 : 0.99 }}
            onClick={() => handleSelect(choice)}
            className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${getStyle(choice.label)}`}
          >
            <div className="font-semibold text-sm">{choice.label}</div>
            <div className="text-xs mt-0.5 opacity-70">{choice.reason}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}