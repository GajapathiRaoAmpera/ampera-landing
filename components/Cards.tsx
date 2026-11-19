import Image from "next/image";
import Link from "next/link";
import { coverFor } from "@/lib/images";
import type { Item } from "@/lib/listing";

export function Cards({ items, label }: { items: Item[]; label: string }) {
  return (
    <ul aria-label={label} className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <li
          key={i.path}
          className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
        >
          {coverFor(i.path) && (
            <Image
              src={coverFor(i.path)!}
              width={640}
              height={360}
              sizes="(min-width: 1024px) 352px, (min-width: 768px) 50vw, 100vw"
              alt=""
              className="aspect-video w-full object-cover"
            />
          )}
          <div className="p-6">
            <h3 className="text-xl font-medium">
              <Link href={i.path} className="hover:underline">
                {i.title}
              </Link>
            </h3>
            <p className="mt-2">{i.summary}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
