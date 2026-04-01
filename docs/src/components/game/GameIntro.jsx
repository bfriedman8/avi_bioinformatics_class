import { motion } from "framer-motion";
import { Dna, ArrowRight, Brain, FlaskConical } from "lucide-react";

export default function GameIntro({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-2xl w-full text-center"
      >
        {/* Icon cluster */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg"
          >
            <FlaskConical className="w-7 h-7 text-primary-foreground" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="w-5 h-0.5 bg-border rounded-full"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="w-14 h-14 rounded-2xl bg-muted border border-border flex items-center justify-center shadow"
          >
            <Dna className="w-7 h-7 text-foreground" />
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight"
        >
          GTEx vs UDN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-lg text-muted-foreground mb-3 leading-relaxed"
        >
          A challenge in genomic literacy
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="text-base text-muted-foreground mb-12 leading-relaxed max-w-lg mx-auto"
        >
          Test your understanding of how these two landmark datasets differ in scale, resolution,
          and biological interpretation — and how they work together.
        </motion.p>

        {/* Round previews */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12"
        >
          {[
            { label: "Sort It", desc: "Classify statements" },
            { label: "Define It", desc: "Key terminology" },
            { label: "Triage the Case", desc: "Clinical scenarios" },
            { label: "True or False?", desc: "Conceptual nuance" },
            { label: "Integration", desc: "Synthesis challenge" },
          ].map((r, i) => (
            <div
              key={i}
              className="bg-muted/60 border border-border rounded-xl px-4 py-3 text-left"
            >
              <div className="text-xs font-semibold text-foreground mb-0.5">{r.label}</div>
              <div className="text-xs text-muted-foreground">{r.desc}</div>
            </div>
          ))}
          <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-left flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            <div className="text-xs font-semibold text-primary">10 questions</div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl text-base font-semibold shadow-lg hover:opacity-90 transition-opacity"
        >
          Begin Challenge
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}