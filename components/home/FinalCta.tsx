import { Button } from "@/components/Button";
import { site } from "@/lib/site";
import { cx } from "@/lib/cx";
import sec from "./section.module.scss";
import s from "./FinalCta.module.scss";

// 9. Final CTA.
export function FinalCta() {
  return (
    <section className={cx("cv-auto", sec.dark)}>
      <div className={sec.inner}>
        <h2 className={s.h2}>Put your first AI system into production</h2>
        {/* TODO: work-email form (server action + Resend) once approved; link for now. */}
        <p className={sec.lead}>
          Tell us your goal. Write to{" "}
          <a className={s.underline} href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          or book a demo.
        </p>
        <div className={sec.mt6}>
          <Button href="/contact">Book a demo</Button>
        </div>
      </div>
    </section>
  );
}
