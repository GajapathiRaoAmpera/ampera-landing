import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { AcceleratorArt } from "@/components/AcceleratorArt";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { catalog } from "@/lib/home";
import { cx } from "@/lib/cx";
import sec from "./section.module.scss";
import s from "./AcceleratorCatalog.module.scss";

// 4. Agent catalog: one uniform grid; suites are the dark cards.
export function AcceleratorCatalog() {
  return (
    <section className={cx("cv-auto", sec.plain)}>
      <Eyebrow>Agent catalog</Eyebrow>
      <h2 className={sec.h2}>Accelerators you can deploy</h2>
      <ul aria-label="Accelerators" className={s.grid}>
        {catalog.map(({ item, chip, suite }, i) => (
          <li key={item.path}>
            <Reveal delay={(i % 3) * 0.08} className={s.full}>
              <div className={cx("card-lift", s.card, suite && s.suite)}>
                <AcceleratorArt path={item.path} />
                <div className={s.body}>
                  <p className={s.chip}>{chip}</p>
                  <h3 className={s.title}>
                    <Link href={item.path} className={cx("stretched-link", s.link)}>
                      {item.title}
                    </Link>
                  </h3>
                  <p className={s.summary}>{item.summary}</p>
                  <span aria-hidden className={s.more}>
                    {suite ? "Explore the suite" : "Read more"}
                    <LuArrowUpRight className={s.arrow} />
                  </span>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
