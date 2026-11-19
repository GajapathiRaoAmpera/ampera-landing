import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { getOpenings } from "@/lib/campus-hire/client";
import { meta } from "@/lib/campus-hire/format";
import type { Opening } from "@/lib/campus-hire/types";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at Ampera Technologies. Join a team building production-grade AI agents and accessible digital experiences.",
  alternates: { canonical: "/careers" },
};

export default async function Careers() {
  let openings: Opening[] = [];
  let failed = false;
  try {
    openings = await getOpenings();
  } catch {
    failed = true;
  }
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Eyebrow>Careers</Eyebrow>
      <h1 className="mt-4 text-4xl font-light text-purple sm:text-5xl">Open roles</h1>
      {failed ? (
        <p className="mt-6 text-lg">
          Roles are temporarily unavailable. Please try again later or write to{" "}
          <a className="underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      ) : openings.length === 0 ? (
        <p className="mt-6 text-lg">
          There are no open roles right now. You can still write to{" "}
          <a className="underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      ) : (
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {openings.map((o) => (
            <li key={o.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="text-xl font-medium">
                <Link className="hover:underline" href={`/careers/${o.slug}`}>
                  {o.title}
                </Link>
              </h2>
              <p className="mt-1 text-navy">{meta(o).join(" · ")}</p>
              <p className="mt-2">{o.summary}</p>
            </li>
          ))}
        </ul>
      )}
      <h2 className="mt-12 text-2xl font-medium">Campus drives</h2>
      <p className="mt-2 max-w-3xl text-lg">
        Campus drives are by invitation only. Students: please contact your college placement cell.
      </p>
    </div>
  );
}
