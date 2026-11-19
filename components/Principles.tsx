import { LuLayers, LuMessagesSquare, LuShieldCheck, LuSparkles, LuTarget } from "react-icons/lu";
import { Reveal } from "@/components/Reveal";
import s from "./Principles.module.scss";

const icons = [LuSparkles, LuTarget, LuMessagesSquare, LuLayers, LuShieldCheck];

// Delivery principles as static cards: all text visible, motion is only a one-time reveal + hover.
export function Principles({ items }: { items: [string, string][] }) {
  return (
    <ul className={s.grid}>
      {items.map(([title, body], i) => {
        const Icon = icons[i % icons.length];
        return (
          <li key={title}>
            <Reveal delay={i * 0.08} className={s.full}>
              <div className={s.card}>
                <span aria-hidden className={s.bar} />
                <div className={s.head}>
                  <span className={s.icon}>
                    <Icon aria-hidden />
                  </span>
                  <span aria-hidden className={s.num}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className={s.title}>{title}</h3>
                <p className={s.body}>{body}</p>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
