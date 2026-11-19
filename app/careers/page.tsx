import type { Metadata } from "next";
import s from "@/styles/page.module.scss";
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
    <div className={s.page}>
      <Eyebrow>Careers</Eyebrow>
      <h1 className={`${s.title} ${s.mt4}`}>Open roles</h1>
      {failed ? (
        <p className={s.lead}>
          Roles are temporarily unavailable. Please try again later or write to{" "}
          <a className={s.underline} href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      ) : openings.length === 0 ? (
        <p className={s.lead}>
          There are no open roles right now. You can still write to{" "}
          <a className={s.underline} href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      ) : (
        <ul className={s.grid2}>
          {openings.map((o) => (
            <li key={o.id} className={s.card}>
              <h2 className={s.cardTitle}>
                <Link href={`/careers/${o.slug}`}>
                  {o.title}
                </Link>
              </h2>
              <p className={s.meta}>{meta(o).join(" · ")}</p>
              <p className={s.mt2}>{o.summary}</p>
            </li>
          ))}
        </ul>
      )}
      <h2 className={s.subhead}>Campus drives</h2>
      <p className={s.body}>
        Campus drives are by invitation only. Students: please contact your college placement cell.
      </p>
    </div>
  );
}
