"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { hasWebGL } from "@/lib/webgl";

// Three.js loads on demand, after the HTML list is already readable.
const StackScene = dynamic(() => import("./StackScene"), { ssr: false });

type Layer = { name: string; href: string; chips: string[] };
const ALL = -1; // "Digital Accessibility": every layer at once

// Layered architecture: a highlight climbs L1 → L4 while in view (data building up the stack),
// pauses on hover/focus, and the 3D stack mirrors it. Reduced motion: no auto-cycle, no slide.
export function StackLayers({ layers }: { layers: Layer[] }) {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const near = useInView(ref, { once: true, margin: "400px 0px" }); // don't fetch three.js until close
  const [user, setUser] = useState<number | null>(null);
  const [auto, setAuto] = useState(0);
  const [gl, setGl] = useState(false);

  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px)");
    const webgl = hasWebGL();
    const update = () => setGl(mq.matches && webgl);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduce || !inView || user !== null) return;
    const t = setInterval(() => setAuto((a) => (a + 1) % layers.length), 2600);
    return () => clearInterval(t);
  }, [reduce, inView, user, layers.length]);

  const active = user ?? (reduce ? null : auto);
  const rows = [...layers].reverse(); // top-down: Agentic first, data at the base
  const plate = (i: number) => rows.length - 1 - i; // plate 0 is the base
  const on = (p: number) => active === p || active === ALL;
  const bind = (p: number) => ({
    onMouseEnter: () => setUser(p),
    onMouseLeave: () => setUser(null),
    onFocus: () => setUser(p),
    onBlur: () => setUser(null),
  });

  return (
    <div ref={ref} className="mt-10 grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
      <div
        className={`relative rounded-3xl border border-dashed p-3 pt-9 transition-colors duration-300 ${
          active === ALL ? "border-[#e9b3e7]" : "border-[#e9b3e7]/35"
        }`}
      >
        <p
          {...bind(ALL)}
          className="absolute -top-4 left-6 rounded-pill bg-purple px-4 py-1.5 text-sm font-medium text-white shadow-lg shadow-purple/30"
        >
          Digital Accessibility across every layer
        </p>
        <div aria-hidden className="absolute top-14 bottom-10 left-[2.15rem] w-px bg-white/15">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="rail-flow absolute -left-[3px] size-[7px] rounded-full bg-[#e9b3e7] shadow-[0_0_10px_#e9b3e7]"
              style={{ animationDelay: `${i * 1.1}s` }}
            />
          ))}
        </div>
        <ol className="relative space-y-2">
          {rows.map((l, i) => {
            const p = plate(i);
            return (
              <li key={l.name} {...bind(p)} className="relative rounded-2xl py-4 pr-5 pl-16">
                {active === p && (
                  <motion.div
                    layoutId="layer-highlight"
                    transition={
                      reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30 }
                    }
                    className="absolute inset-0 rounded-2xl bg-white/[0.06] ring-1 ring-[#e9b3e7]/50"
                  />
                )}
                <span
                  aria-hidden
                  className={`absolute top-4 left-4 grid size-9 place-items-center rounded-full border font-mono text-xs transition-colors duration-300 ${
                    on(p)
                      ? "border-purple bg-purple text-white shadow-[0_0_18px_rgb(156_54_154/0.7)]"
                      : "border-white/25 bg-ink text-zinc-300"
                  }`}
                >
                  L{p + 1}
                </span>
                <a
                  href={l.href}
                  className="relative text-xl font-medium text-white hover:underline focus-visible:outline-[#e9b3e7]"
                >
                  {l.name}
                </a>
                <ul className="relative mt-3 flex flex-wrap gap-2">
                  {l.chips.map((c) => (
                    <li
                      key={c}
                      className={`rounded-pill border px-3 py-1 font-mono text-xs transition-colors duration-300 ${
                        on(p) ? "border-[#e9b3e7]/60 text-white" : "border-white/15 text-zinc-300"
                      }`}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
      <div aria-hidden className="relative hidden h-[32rem] lg:block">
        <div className="absolute inset-10 rounded-full bg-purple/25 blur-3xl" />
        {gl && near && <StackScene active={active} still={reduce || !inView} />}
      </div>
    </div>
  );
}
