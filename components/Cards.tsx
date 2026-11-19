import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { CardArt } from "@/components/CardArt";
import { Reveal } from "@/components/Reveal";
import { coverFor } from "@/lib/images";
import type { Item } from "@/lib/listing";

// Whole card is one link (stretched ::after), art is code-built, text stays server HTML.
export function Cards({
  items,
  label,
  className = "mt-8 md:grid-cols-2 lg:grid-cols-3",
}: {
  items: Item[];
  label: string;
  className?: string;
}) {
  return (
    <ul aria-label={label} className={`grid gap-6 ${className}`}>
      {items.map((i, n) => (
        <li key={i.path}>
          <Reveal delay={(n % 3) * 0.08} className="h-full">
            <div className="card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-navy">
              {/* Same pages that used to carry a stock image now get generated art. */}
              {coverFor(i.path) && <CardArt path={i.path} />}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-medium">
                  <Link
                    href={i.path}
                    className="after:absolute after:inset-0 focus-visible:outline-none group-hover:text-purple"
                  >
                    {i.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-4 text-zinc-700">{i.summary}</p>
                <span
                  aria-hidden
                  className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-purple"
                >
                  Read more
                  <LuArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
