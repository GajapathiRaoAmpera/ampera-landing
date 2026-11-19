import { LuPlug, LuRocket, LuShieldCheck, LuWorkflow } from "react-icons/lu";
import { cx } from "@/lib/cx";
import s from "./Pipeline.module.scss";

const ICONS = [LuPlug, LuWorkflow, LuShieldCheck, LuRocket];

// Connect → Compose → Govern → Operate. The rail fills as you scroll and each step's dot lights up
// in turn: CSS scroll-driven animation, no JavaScript. Without support (or with reduced motion)
// the rail is full and every dot is lit.
export function Pipeline({ steps }: { steps: string[][] }) {
  return (
    <div className={s.pipeline}>
      <div aria-hidden className={s.rail}>
        <div className={s.fill} />
      </div>
      <ol className={s.steps}>
        {steps.map(([title, body], i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <li key={title} className={s.step}>
              <span aria-hidden className={s.dot} />
              {/* Cards stay fully opaque: dimmed text would fail WCAG contrast while scrolling. */}
              <div className={cx("card-lift", s.card)}>
                <div className={s.head}>
                  <span className={s.icon}>
                    <Icon aria-hidden />
                  </span>
                  <p className={s.num}>0{i + 1}</p>
                </div>
                <h3 className={s.title}>{title}</h3>
                <p className={s.body}>{body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
