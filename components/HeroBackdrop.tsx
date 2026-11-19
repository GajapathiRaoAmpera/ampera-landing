"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { hasWebGL } from "@/lib/webgl";
import { useEffect, useState } from "react";
import s from "./HeroBackdrop.module.scss";

// Three.js only loads on demand, so it never blocks the HTML/text.
const PyramidScene = dynamic(() => import("./PyramidScene"), { ssr: false });

// Static pyramid: server-rendered default and the reduced-motion / no-WebGL fallback.
function StaticPyramid() {
  return (
    <Image
      src="/images/home/8ugqiHw4GzdL44wjNwOob1KfLEU.png"
      alt=""
      width={836}
      height={470}
      priority
      className={s.pyramid}
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
    <div aria-hidden className={s.backdrop}>
      {animated ? <PyramidScene /> : <StaticPyramid />}
    </div>
  );
}
