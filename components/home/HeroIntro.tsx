import { AgentConsole } from "@/components/AgentConsole";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { heroBadges } from "@/lib/home";
import { cx } from "@/lib/cx";
import sec from "./section.module.scss";
import s from "./HeroIntro.module.scss";

// 2. Hero content: headline, CTAs and the agent console.
export function HeroIntro() {
  return (
    <section id="hero" className={s.hero}>
      <div aria-hidden className={cx("hero-glow", sec.glow60)} />
      <div className={s.grid}>
        <div>
          <Reveal>
            <Eyebrow dark>Advanced AI data intelligence</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className={s.h1}>
              We build AI agents and data platforms, with your team{" "}
              <span className={s.accent}>in the loop</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={s.lead}>
              Our engineers design, build and run production-grade AI for your business: data
              platforms, ML systems and agents, with people approving the decisions that matter and
              accessibility by default.
            </p>
          </Reveal>
          <Reveal delay={0.3} className={s.ctas}>
            <Button href="/contact">Book a demo</Button>
            <Button href="/accelerators" variant="secondary" dark>
              Explore accelerators
            </Button>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className={s.badges}>
              {heroBadges.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <AgentConsole />
        </Reveal>
      </div>
    </section>
  );
}
