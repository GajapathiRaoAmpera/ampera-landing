import Link from "next/link";
import { Button } from "./Button";
import { nav } from "@/lib/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-semibold">
          Ampera
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
