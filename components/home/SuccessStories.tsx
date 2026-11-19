import { Button } from "@/components/Button";
import { Cards } from "@/components/Cards";
import { Eyebrow } from "@/components/Eyebrow";
import { caseStudies } from "@/lib/home";
import { cx } from "@/lib/cx";
import sec from "./section.module.scss";

// 7. Agents in production: every case study, not just two.
export function SuccessStories() {
  return (
    <section className={cx("cv-auto", sec.plain)}>
      <Eyebrow>Agents in production</Eyebrow>
      <h2 className={sec.h2}>Success stories</h2>
      <Cards label="Case studies" items={caseStudies} />
      <div className={sec.mt8}>
        <Button href="/projects" variant="secondary">
          All success stories
        </Button>
      </div>
    </section>
  );
}
