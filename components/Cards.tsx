import Link from "next/link";
import type { Item } from "@/lib/listing";

export function Cards({ items, label }: { items: Item[]; label: string }) {
  return (
    <ul aria-label={label} className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <li key={i.path} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h3 className="text-xl font-medium">
            <Link href={i.path} className="hover:underline">
              {i.title}
            </Link>
          </h3>
          <p className="mt-2">{i.summary}</p>
        </li>
      ))}
    </ul>
  );
}
