"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
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
    <Image
      src="/images/home/8ugqiHw4GzdL44wjNwOob1KfLEU.png"
      alt=""
      width={836}
      height={470}
      priority
      className="h-full w-full object-contain mix-blend-screen [mask-image:radial-gradient(closest-side,#000_55%,transparent)]"
    />
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
