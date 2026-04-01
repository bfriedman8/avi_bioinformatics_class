import { motion } from "framer-motion";
import { RotateCcw, Trophy, BookOpen } from "lucide-react";

const TIERS = [
  { min: 9, label: "Genomics Expert", desc: "You understand the mechanistic nuances of both datasets and how they integrate.", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  { min: 7, label: "Strong Foundation", desc: "You grasp the key distinctions. A few edge cases still to master.", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
  { min: 5, label: "Getting There", desc: "You have the core concepts. Review the explanations to sharpen the details.", color: "text-violet-600", bg: "bg-violet-50 border-violet-200" },
  { min: 0, label: "Keep Exploring", desc: "These datasets have real depth. Re-read the explanations — they're worth it.", color: "text-muted-foreground", bg: "bg-muted border-border" },
];

export default function GameResults({ score, answers, onRestart }) {
  const total = answers.length;
  const pct = Math.round((score / total) * 100);
  const tier = TIERS.find((t) => score >= t.min);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-16 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {/* Score hero */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center mx-auto mb-5 shadow-lg"
          >
            <Trophy className="w-11 h-11 text-primary-foreground" />
          </motion.div>
          <div className="text-6xl font-bold text-foreground mb-1">
            {score}<span className="text-3xl text-muted-foreground font-normal">/{total}</span>
          </div>
          <div className="text-muted-foreground text-base mb-5">{pct}% correct</div>
          <div className={`inline-block px-5 py-2.5 rounded-xl border text-sm font-semibold ${tier.bg} ${tier.color}`}>
            {tier.label}
          </div>
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">{tier.desc}</p>
        </div>

        {/* Per-question review */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">Question Review</span>
          </div>
          <div className="space-y-3">
            {answers.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className={`rounded-xl border px-5 py-4 ${
                  a.isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`mt-0.5 text-sm font-bold ${a.isCorrect ? "text-green-600" : "text-red-500"}`}>
                    {a.isCorrect ? "✓" : "✗"}
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">
                      {a.question.round}
                    </div>
                    <div className="text-sm font-medium text-foreground leading-snug">
                      {a.question.prompt || a.question.question || a.question.scenario?.slice(0, 80) + "…"}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </button>
        </div>
      </motion.div>
    </div>
  );
}