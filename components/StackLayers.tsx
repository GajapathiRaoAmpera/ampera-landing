"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { hasWebGL } from "@/lib/webgl";
import { cx } from "@/lib/cx";
import s from "./StackLayers.module.scss";

// Three.js loads on demand, after the HTML list is already readable.
const StackScene = dynamic(() => import("./StackScene"), { ssr: false });

type Layer = { name: string; href: string; chips: string[] };
const ALL = -1; // "Digital Accessibility": every layer at once

// Layered architecture: a highlight climbs L1 → L4 while in view (data building up the stack),
// pauses on hover/focus, and the 3D stack mirrors it. Reduced motion: no auto-cycle, no slide.
export function StackLayers({ layers }: { layers: Layer[] }) {
  const reduce = useReducedMotion();
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
    <div ref={ref} className={s.layout}>
      <div className={cx(s.frame, active === ALL && s.frameAll)}>
        <p {...bind(ALL)} className={s.across}>
          Digital Accessibility across every layer
        </p>
        <div aria-hidden className={s.rail}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cx("rail-flow", s.packet)}
              style={{ animationDelay: `${i * 1.1}s` }}
            />
          ))}
        </div>
        <ol className={s.rows}>
          {rows.map((l, i) => {
            const p = plate(i);
            return (
              <li key={l.name} {...bind(p)} className={s.row}>
                {active === p && <div className={s.highlight} />}
                <span aria-hidden className={cx(s.level, on(p) && s.on)}>
                  L{p + 1}
                </span>
                <a href={l.href} className={s.name}>
                  {l.name}
                </a>
                <ul className={s.chips}>
                  {l.chips.map((c) => (
                    <li key={c} className={cx(s.chip, on(p) && s.on)}>
                      {c}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
      <div aria-hidden className={s.scene}>
        <div className={s.sceneGlow} />
        {gl && near && <StackScene active={active} still={reduce || !inView} />}
      </div>
    </div>
  );
}
