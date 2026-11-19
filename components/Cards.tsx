import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { CardArt } from "@/components/CardArt";
import { Reveal } from "@/components/Reveal";
import { coverFor } from "@/lib/images";
import type { Item } from "@/lib/listing";
import { cx } from "@/lib/cx";
import s from "./Cards.module.scss";

// Whole card is one link (stretched ::after), art is code-built, text stays server HTML.
export function Cards({ items, label }: { items: Item[]; label: string }) {
  return (
    <ul aria-label={label} className={s.grid}>
      {items.map((i, n) => (
        <li key={i.path}>
          <Reveal delay={(n % 3) * 0.08} className={s.full}>
            <div className={cx("card-lift", s.card)}>
              {/* Same pages that used to carry a stock image now get generated art. */}
              {coverFor(i.path) && <CardArt path={i.path} />}
              <div className={s.body}>
                <h3 className={s.title}>
                  <Link href={i.path} className={cx("stretched-link", s.link)}>
                    {i.title}
                  </Link>
                </h3>
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
