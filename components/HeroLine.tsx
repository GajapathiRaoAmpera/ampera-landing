import { cx } from "@/lib/cx";
import s from "./HeroLine.module.scss";

const WORDS = ["The", "DNA", "of", "intelligent", "business"];
const ACCENT = new Set(["DNA", "intelligent"]);

// Opening tagline: words rise in one by one with the CSS `.rise` stagger, so it plays on first
// paint without waiting for JS. Reduced motion is handled in styles/_base.scss.
export function HeroLine() {
  return (
    <div className={s.wrap}>
      <p className={s.line}>
        {WORDS.map((w, i) => (
          <span key={w}>
            <span
              className={cx("rise", s.word, ACCENT.has(w) && s.accent)}
              style={{ "--i": i + 1 } as React.CSSProperties}
            >
              {w}
            </span>
            {i < WORDS.length - 1 && " "}
          </span>
        ))}
      </p>
      {/* Not animated: this is the LCP element, so it must paint on first frame. */}
      <p className={s.sub}>Data, AI and people, engineered to work as one.</p>
    </div>
  );
}
