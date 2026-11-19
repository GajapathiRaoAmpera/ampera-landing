import { cx } from "@/lib/cx";
import s from "./Eyebrow.module.scss";

export function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={cx(s.eyebrow, dark && s.dark)}>
      <span aria-hidden className={s.dot} />
      {children}
    </p>
  );
}
