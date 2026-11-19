import { Eyebrow } from "@/components/Eyebrow";
import { Pipeline } from "@/components/Pipeline";
import { Tag } from "@/components/Tag";
import { principles, steps } from "@/lib/home";
import { cx } from "@/lib/cx";
import sec from "./section.module.scss";
import tag from "@/components/Tag.module.scss";

// 6. How we ship: Connect → Compose → Govern → Operate, with the delivery principles as tags.
export function HowWeShip() {
  return (
    <section className={cx("cv-auto", sec.white)}>
      <div className={sec.inner}>
        <Eyebrow>How we ship AI</Eyebrow>
        <Pipeline steps={steps} />
        <ul className={cx(tag.list, sec.mt8)}>
          {principles.map(([p]) => (
            <Tag key={p}>{p}</Tag>
          ))}
        </ul>
      </div>
    </section>
  );
}
