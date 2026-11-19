"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Connect → Compose → Govern → Operate. The rail fills as you scroll; each step lights up in turn.
export function Pipeline({ steps }: { steps: string[][] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div className="relative mt-10">
      <div
        aria-hidden
        className="absolute left-0 right-0 top-[7px] hidden h-px bg-navy/20 md:block"
      >
        <motion.div
          className="h-full origin-left bg-purple"
          style={{ scaleX: reduce ? 1 : fill }}
        />
      </div>
      <ol ref={ref} className="grid gap-8 md:grid-cols-4">
        {steps.map(([t, d], i) => (
          <Step key={t} i={i} n={steps.length} p={scrollYProgress} reduce={!!reduce} title={t}>
            {d}
          </Step>
        ))}
      </ol>
    </div>
  );
}

function Step({
  i,
  n,
  p,
  reduce,
  title,
  children,
}: {
  i: number;
  n: number;
  p: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
  title: string;
  children: React.ReactNode;
}) {
  const at = i / (n - 1);
  const dot = useTransform(p, [Math.max(at - 0.05, 0), at], ["#ffffff", "#9c369a"]);
  const lift = useTransform(p, [Math.max(at - 0.2, 0), at], [0.45, 1]);
  return (
    <li>
      <motion.span
        aria-hidden
        className="relative z-10 mb-4 block size-4 rounded-full border-2 border-purple"
        style={{ backgroundColor: reduce ? "#9c369a" : dot }}
      />
      <motion.div style={{ opacity: reduce ? 1 : lift }}>
        <p className="font-mono text-sm text-navy">0{i + 1}</p>
        <h3 className="mt-1 text-2xl font-medium text-purple">{title}</h3>
        <p className="mt-2">{children}</p>
      </motion.div>
    </li>
  );
}
