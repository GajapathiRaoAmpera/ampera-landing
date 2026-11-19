import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { CardArt } from "@/components/CardArt";
import { Reveal } from "@/components/Reveal";
import { coverFor } from "@/lib/images";
import type { Item } from "@/lib/listing";
import { cx } from "@/lib/cx";
import s from "./Cards.module.scss";

// Whole card is one link (stretched ::after), art is code-built, text stays server HTML.
// `heading`: h2 when the cards sit directly under the page <h1> (listing pages), h3 under a section h2.
export function Cards({
  items,
  label,
  heading: H = "h3",
}: {
  items: Item[];
  label: string;
  heading?: "h2" | "h3";
}) {
  return (
    <ul aria-label={label} className={s.grid}>
      {items.map((i, n) => (
        <li key={i.path} className={s.item}>
          <Reveal delay={(n % 3) * 0.08} className={s.full}>
            <div className={cx("card-lift", s.card)}>
              {/* Same pages that used to carry a stock image now get generated art. */}
              {coverFor(i.path) && <CardArt path={i.path} />}
              <div className={s.body}>
                <H className={s.title}>
                  <Link href={i.path} className={cx("stretched-link", s.link)}>
                    {i.title}
                  </Link>
                </H>
                <p className={s.summary}>{i.summary}</p>
                <span aria-hidden className={s.more}>
                  Read more
                  <LuArrowUpRight className={s.arrow} />
                </span>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
