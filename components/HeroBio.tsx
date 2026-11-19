"use client";
import dynamic from "next/dynamic";
import { useInView, useReducedMotion } from "framer-motion";
import { hasWebGL } from "@/lib/webgl";
import { useEffect, useRef, useState } from "react";

// Three.js loads on demand, so it never blocks the HTML.
const BioScene = dynamic(() => import("./BioScene"), { ssr: false });

// What we do (CLAUDE.md §2), pinned to points in the scene like blueprint callouts.
// x/y are BioScene world units; up = label above the point.
const SERVICES = [
  { text: "Cloud / Data Engineering", x: -6.3, y: 1.1, up: true },
  { text: "Data Science / Machine Learning", x: -3.5, y: -1.2, up: false },
  { text: "GenAI & LLMs", x: 0.2, y: 0, up: true },
  { text: "Agentic & Autonomous AI", x: 3.2, y: -0.95, up: false },
  { text: "Digital Accessibility", x: 6, y: 0.95, up: true },
];
// BioScene camera: z=8, fov 35 -> world height visible at z=0.
const VIEW_H = 2 * 8 * Math.tan((17.5 * Math.PI) / 180);


// Decoration only: hidden from assistive tech (the page has an sr-only list of the services).
export function HeroBio() {
  const reduce = useReducedMotion();
  const [gl, setGl] = useState(false);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref); // stop the render loop once scrolled past

  useEffect(() => {
    const id = requestAnimationFrame(() => setGl(hasWebGL()));
    const ro = new ResizeObserver(([e]) =>
      setBox({ w: e.contentRect.width, h: e.contentRect.height }),
    );
    if (ref.current) ro.observe(ref.current);
    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
    };
  }, []);

  // Same projection as BioScene's group scale, so callouts sit on their points.
  const project = (x: number, y: number) => {
    const { w, h } = box!;
    const s = Math.min((VIEW_H * w) / h / 15.5, VIEW_H / 4);
    const k = h / VIEW_H;
    return { left: w / 2 + x * s * k, top: h / 2 - y * s * k };
  };

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-1/3 bottom-16 isolate"
    >
      {gl && <BioScene animate={!reduce && inView} />}
      {gl &&
        box &&
        SERVICES.map((c, i) => (
          <div
            key={c.text}
            className={`rise absolute hidden -translate-x-1/2 sm:flex items-center ${c.up ? "-translate-y-full flex-col" : "flex-col-reverse"}`}
            style={{ ...project(c.x, c.y), "--i": i + 6 } as React.CSSProperties}
          >
            <span className="rounded-pill border border-fuchsia-300/40 bg-ink/80 px-3 py-1 font-mono text-sm whitespace-nowrap text-white">
              {c.text}
            </span>
            <span className="h-8 w-px bg-gradient-to-b from-fuchsia-300/70 to-fuchsia-300/10" />
            <span className="size-2 rounded-full bg-fuchsia-300 shadow-[0_0_10px_#f0abfc]" />
          </div>
        ))}
    </div>
  );
}
