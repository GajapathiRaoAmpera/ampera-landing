"use client";
import { useState } from "react";
import { LuDiamond, LuPause, LuPlay } from "react-icons/lu";

// Slow proof-point ticker. Real text, pausable (WCAG 2.2.2); static when motion is reduced.
export function Marquee({ items }: { items: string[] }) {
  const [paused, setPaused] = useState(false);
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-10 pr-10">
      {items.map((t) => (
        <li key={t} className="whitespace-nowrap font-mono text-sm uppercase tracking-widest">
          <LuDiamond
            aria-hidden
            className="mr-3 inline size-3 fill-current align-baseline text-purple"
          />
          {t}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-5">
      <div className="marquee-mask relative flex-1 overflow-hidden">
        <div className="marquee-track flex w-max" data-paused={paused}>
          {row(false)}
          {row(true)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play scrolling proof points" : "Pause scrolling proof points"}
        title={paused ? "Play" : "Pause"}
        className="grid size-11 shrink-0 place-items-center rounded-full text-navy hover:bg-navy/5"
      >
        {paused ? <LuPlay className="size-4" /> : <LuPause className="size-4" />}
      </button>
    </div>
  );
}
