"use client";
import { motion, useReducedMotion } from "framer-motion";

type Layer = { name: string; href: string; chips: string[] };

// Platform layers slide in bottom-up; accessibility then sweeps across all of them.
export function StackLayers({ layers }: { layers: Layer[] }) {
  const reduce = useReducedMotion();
  const rows = [...layers].reverse(); // list top-down: Agentic first, data at the base
  return (
    <div className="relative mt-8">
      <ol className="space-y-3 pr-4 md:pr-10">
        {rows.map((l, i) => (
          <motion.li
            key={l.name}
            initial={reduce ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={reduce ? undefined : { x: 8 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (rows.length - 1 - i) * 0.12 }}
            className="rounded-2xl border border-navy/30 bg-white p-5 shadow-sm"
            style={{ marginLeft: `${i * 1.25}rem` }}
          >
            <a href={l.href} className="text-xl font-medium hover:underline">
              {l.name}
            </a>
            <ul className="mt-3 flex flex-wrap gap-2">
              {l.chips.map((c) => (
                <li key={c} className="rounded-pill bg-navy/5 px-3 py-1 font-mono text-xs">
                  {c}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
      <motion.p
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-3 origin-left rounded-xl bg-purple px-5 py-3 text-lg text-white"
      >
        Digital Accessibility across every layer
      </motion.p>
    </div>
  );
}
