import { cx } from "@/lib/cx";
import s from "./Reveal.module.scss";

// Fade-up on scroll, pure CSS (scroll-driven animation): no JavaScript, so nothing to hydrate.
// Browsers without `animation-timeline` and reduced-motion users just see the content.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={cx(s.reveal, className)} style={{ "--delay": delay } as React.CSSProperties}>
      {children}
    </div>
  );
}
