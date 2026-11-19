import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  dark?: boolean;
};

export function Button({ href, children, variant = "primary", dark }: Props) {
  const base =
    "inline-flex min-h-11 items-center gap-3 rounded-pill px-6 py-2 text-base font-medium transition-colors";
  const style =
    variant === "primary"
      ? "bg-purple text-white hover:bg-[#832a81]"
      : dark
        ? "border border-white text-white hover:bg-white/10"
        : "border border-purple text-purple hover:bg-purple/5";
  return (
    <Link href={href} className={`${base} ${style}`}>
      {children}
      {variant === "primary" && (
        <span
          aria-hidden
          className="grid size-7 place-items-center rounded-full bg-white text-purple"
        >
          ↗
        </span>
      )}
    </Link>
  );
}
