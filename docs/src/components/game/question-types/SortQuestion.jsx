import { useState } from "react";
import { motion } from "framer-motion";

export default function SortQuestion({ question, onAnswer }) {
  const [assignments, setAssignments] = useState({}); // itemId -> category
  const [submitted, setSubmitted] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const unassigned = question.items.filter((item) => !assignments[item.id]);
  const allAssigned = unassigned.length === 0;

  const handleAssign = (itemId, category) => {
    if (submitted) return;
    setAssignments((prev) => ({ ...prev, [itemId]: category }));
    setActiveItem(null);
  };

  const handleUnassign = (itemId) => {
    if (submitted) return;
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  };

  const handleSubmit = () => {
    let correct = 0;
    question.items.forEach((item) => {
      if (assignments[item.id] === item.answer) correct++;
    });
    const isCorrect = correct === question.items.length;
    setSubmitted(true);
    onAnswer(
      isCorrect,
      isCorrect
        ? "Perfect — all statements correctly assigned."
        : `You got ${correct}/${question.items.length} correct. Review: GTEx is population-scale, common variants, statistical associations. UDN is individual-level, rare variants, large individual effects.`
    );
  };

  const getItemStyle = (item) => {
    if (!submitted) return "bg-muted border-border text-foreground hover:border-primary/40 cursor-pointer";
    if (assignments[item.id] === item.answer) return "bg-green-50 border-green-400 text-green-800";
    return "bg-red-50 border-red-300 text-red-700";
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-7 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        Sort It
      </div>
      <p className="text-base font-semibold text-foreground mb-6">{question.prompt}</p>

      {/* Tap-to-assign UI */}
      {!submitted && unassigned.length > 0 && (
        <div className="mb-6">
          <p className="text-xs text-muted-foreground mb-3">
            {activeItem
              ? "Now tap a column to assign it →"
              : "Tap a statement to select it, then tap a column to assign it."}
          </p>
          <div className="space-y-2">
            {unassigned.map((item) => (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all font-medium
                  ${activeItem === item.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "bg-muted/40 border-border text-foreground hover:bg-muted"
                  }`}
              >
                {item.text}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Columns */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {question.categories.map((cat) => {
          const assigned = question.items.filter((item) => assignments[item.id] === cat);
          return (
            <div key={cat}>
              <motion.button
                whileTap={{ scale: activeItem ? 0.98 : 1 }}
                onClick={() => {
                  if (activeItem) handleAssign(activeItem, cat);
                }}
                className={`w-full mb-3 px-4 py-2 rounded-xl text-sm font-bold transition-all border
                  ${activeItem
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : cat === "GTEx"
                    ? "border-blue-200 bg-blue-50 text-blue-800"
                    : "border-purple-200 bg-purple-50 text-purple-800"
                  }`}
              >
                {cat} {activeItem ? "← assign here" : ""}
              </motion.button>
              <div className="min-h-20 space-y-2">
                {assigned.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className={`px-3 py-2.5 rounded-xl border text-xs leading-snug font-medium ${getItemStyle(item)}`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span>{item.text}</span>
                      {!submitted && (
                        <button
                          onClick={() => handleUnassign(item.id)}
                          className="text-muted-foreground hover:text-foreground ml-1 shrink-0 text-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    {submitted && (
                      <div className="text-xs mt-1 opacity-60">
                        Correct: {item.answer}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {!submitted && (
        <button
          disabled={!allAssigned}
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          {allAssigned ? "Submit Answers" : `Assign all ${unassigned.length} remaining statement(s)`}
        </button>
      )}
    </div>
  );
}