"use client";
import { motion, useReducedMotion } from "framer-motion";

const WORDS = ["The", "DNA", "of", "intelligent", "business"];

// Opening tagline: words rise in one by one (Motion). Real text, so crawlers and screen readers get it.
export function HeroLine() {
  const reduce = useReducedMotion();
  const word = (w: string, i: number, accent = false) => (
    <motion.span
      key={w}
      className={`inline-block ${accent ? "bg-gradient-to-r from-[#e9b3e7] to-fuchsia-400 bg-clip-text text-transparent" : ""}`}
      initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {w}
    </motion.span>
  );
  return (
    <div className="text-center">
      <p className="text-4xl font-light tracking-tight sm:text-6xl">
        {WORDS.map((w, i) => (
          <span key={w}>
            {word(w, i, w === "DNA" || w === "intelligent")}
            {i < WORDS.length - 1 && " "}
          </span>
        ))}
      </p>
      <motion.p
        className="mx-auto mt-5 max-w-xl text-lg text-zinc-200"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        Data, AI and people, engineered to work as one.
      </motion.p>
    </div>
  );
}
