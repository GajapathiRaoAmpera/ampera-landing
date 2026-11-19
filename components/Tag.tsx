import { cx } from "@/lib/cx";
import s from "./Tag.module.scss";

export function Tag({ children, mono }: { children: React.ReactNode; mono?: boolean }) {
  return <li className={cx(s.tag, mono && s.mono)}>{children}</li>;
}
