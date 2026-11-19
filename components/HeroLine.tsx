const WORDS = ["The", "DNA", "of", "intelligent", "business"];

// Opening tagline: words rise in one by one with the CSS `.rise` stagger, so it plays on first
// paint without waiting for JS. Reduced motion is handled in globals.css.
export function HeroLine() {
  return (
    <div className="text-center">
      <p className="text-4xl font-light tracking-tight sm:text-6xl">
        {WORDS.map((w, i) => (
          <span key={w}>
            <span
              className={`rise inline-block ${w === "DNA" || w === "intelligent" ? "bg-gradient-to-r from-[#e9b3e7] to-fuchsia-400 bg-clip-text text-transparent" : ""}`}
              style={{ "--i": i + 1 } as React.CSSProperties}
            >
              {w}
            </span>
            {i < WORDS.length - 1 && " "}
          </span>
        ))}
      </p>
      {/* Not animated: this is the LCP element, so it must paint on first frame. */}
      <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-200">
        Data, AI and people, engineered to work as one.
      </p>
    </div>
  );
}
