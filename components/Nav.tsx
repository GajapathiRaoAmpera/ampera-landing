import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import { nav } from "@/lib/site";

// Floating glass bar: blurred, translucent ink (60% keeps white text above 4.5:1 over ivory too).
export function Nav() {
  return (
    <header className="sticky top-3 z-40 h-0 px-3 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/30 glass px-5 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.35)] md:rounded-pill">
        <Link href="/" aria-label="Ampera Technologies, home" className="shrink-0">
          <Image
            src="/brand/ampera-logo.png"
            alt="Ampera"
            width={810}
            height={226}
            priority
            className="h-9 w-auto"
          />
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-1 text-base">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="py-2 hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button href="/contact">Book a demo</Button>
      </div>
    </header>
  );
}
