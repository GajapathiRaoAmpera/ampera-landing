import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { ServiceVisual } from "@/components/ServiceVisual";
import { Tag } from "@/components/Tag";
import { services } from "@/lib/site";
import { cx } from "@/lib/cx";
import sec from "./section.module.scss";
import tag from "@/components/Tag.module.scss";
import s from "./PlatformStack.module.scss";

// 5. Platform stack: the five services; Digital Accessibility spans the full row (it spans every layer).
export function PlatformStack() {
  return (
    <section className={cx("cv-auto", sec.plainTight)}>
      <Eyebrow>Platform stack</Eyebrow>
      <h2 className={sec.h2}>Five services, one platform</h2>
      <ul className={s.grid}>
        {services.map((sv, i) => {
          const wide = sv.href === "/services/digital-accessibility";
          return (
            <li key={sv.href} className={wide ? s.wideItem : undefined}>
              <Reveal delay={(i % 2) * 0.1} className={s.full}>
                <div className={cx("card-lift", s.card, wide && s.wide)}>
                  <div className={s.visual}>
                    <ServiceVisual href={sv.href} />
                  </div>
                  <div className={s.text}>
                    {wide && <p className={s.across}>Across every layer</p>}
                    <h3 className={s.title}>
                      <a className={cx("stretched-link", s.link)} href={sv.href}>
                        {sv.name}
                      </a>
                    </h3>
                    <ul className={cx(tag.list, s.tags)}>
                      {sv.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
