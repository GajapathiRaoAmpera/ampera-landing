import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { cx } from "@/lib/cx";
import s from "./Button.module.scss";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  dark?: boolean;
};

export function Button({ href, children, variant = "primary", dark }: Props) {
  return (
    <Link href={href} className={cx(s.button, s[variant], dark && s.dark)}>
      {children}
      {variant === "primary" && (
        <span aria-hidden className={s.arrow}>
          <LuArrowUpRight />
        </span>
      )}
    </Link>
  );
}
