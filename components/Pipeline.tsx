"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { LuPlug, LuRocket, LuShieldCheck, LuWorkflow } from "react-icons/lu";
import { cx } from "@/lib/cx";
import s from "./Pipeline.module.scss";

const ICONS = [LuPlug, LuWorkflow, LuShieldCheck, LuRocket];

// Connect → Compose → Govern → Operate. The rail fills as you scroll; each step's dot lights up in turn.
export function Pipeline({ steps }: { steps: string[][] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div className={s.pipeline}>
      <div aria-hidden className={s.rail}>
        <motion.div className={s.fill} style={{ scaleX: reduce ? 1 : fill }} />
      </div>
      <ol ref={ref} className={s.steps}>
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
  const Icon = ICONS[i % ICONS.length];
  const dot = useTransform(p, [Math.max(at - 0.05, 0), at], ["#ffffff", "#9c369a"]);
  return (
    <li className={s.step}>
      <motion.span
        aria-hidden
        className={s.dot}
        style={{ backgroundColor: reduce ? "#9c369a" : dot }}
      />
      {/* Cards stay fully opaque: dimmed text would fail WCAG contrast while scrolling. */}
      <div className={cx("card-lift", s.card)}>
        <div className={s.head}>
          <span className={s.icon}>
            <Icon aria-hidden />
          </span>
          <p className={s.num}>0{i + 1}</p>
        </div>
        <h3 className={s.title}>{title}</h3>
        <p className={s.body}>{children}</p>
      </div>
    </li>
  );
}
