"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Three.js only loads on demand, so it never blocks the HTML/text.
const PyramidScene = dynamic(() => import("./PyramidScene"), { ssr: false });

function hasWebGL() {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

// Static pyramid: server-rendered default and the reduced-motion / no-WebGL fallback.
function StaticPyramid() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <defs>
        <radialGradient id="glow" cx="50%" cy="55%" r="50%">
          <stop offset="0" stopColor="#9c369a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#9c369a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="110" r="90" fill="url(#glow)" />
      <polygon points="100,30 40,150 100,170" fill="#9c369a" />
      <polygon points="100,30 100,170 165,145" fill="#6f2570" />
      <polygon
        points="100,30 40,150 100,170 165,145"
        fill="none"
        stroke="#e9b3e7"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeroBackdrop() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimated(!mq.matches && hasWebGL());
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Decoration only: hidden from assistive tech, no pointer events, headline stays real HTML.
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -left-24 top-1/2 size-[32rem] -translate-y-1/2 opacity-35"
    >
      {animated ? <PyramidScene /> : <StaticPyramid />}
    </div>
  );
}
