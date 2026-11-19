import { LuArrowDown } from "react-icons/lu";
import { HeroBio } from "@/components/HeroBio";
import { HeroLine } from "@/components/HeroLine";
import { services } from "@/lib/site";
import s from "./OpeningHero.module.scss";

// 1. Opening screen: tagline + the AI -> DNA animation, labelled with what we do.
export function OpeningHero() {
  return (
    <section aria-label="Ampera" className={s.opening}>
      <div aria-hidden className="hero-glow" />
      <div aria-hidden className="blueprint" />
      <HeroBio />
      <div className={s.line}>
        <HeroLine />
      </div>
      {/* The 3D callouts are decorative; this gives the same "what we do" to screen readers. */}
      <ul className="sr-only">
        {services.map((sv) => (
          <li key={sv.href}>{sv.name}</li>
        ))}
      </ul>
      <a href="#hero" className={s.cue}>
        See what we build <LuArrowDown aria-hidden className="scroll-cue" />
      </a>
    </section>
  );
}
