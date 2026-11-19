import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { headshot } from "@/lib/images";
import { leaders } from "@/lib/home";
import { cx } from "@/lib/cx";
import sec from "./section.module.scss";
import s from "./WhoWeAre.module.scss";

// 8. Who we are: the mission, tied to accessibility, and the leadership team.
export function WhoWeAre() {
  return (
    <section className={cx("cv-auto", sec.white)}>
      <div className={sec.inner}>
        <Eyebrow>Who we are</Eyebrow>
        <h2 className={sec.h2}>
          Opportunity for skilled professionals, including people with disabilities
        </h2>
        <p className={sec.lead}>
          Our founders bring 30+ years of digital experience. Our mission is to create opportunities
          for skilled professionals, including persons with disabilities, and it is why
          accessibility is built into everything we ship.
        </p>
        <ul className={s.grid}>
          {leaders.map((l, i) => {
            const photo = headshot(l.path);
            return (
              <li key={l.path}>
                <Reveal delay={(i % 3) * 0.08} className={s.full}>
                  <div className={cx("card-lift", s.card)}>
                    {photo && (
                      <Image src={photo} width={64} height={64} alt="" className={s.photo} />
                    )}
                    <div className={s.text}>
                      <Link className={cx("stretched-link", s.name)} href={l.path}>
                        {l.title}
                      </Link>
                      <p className={s.role}>{l.role}</p>
                    </div>
                    <LuArrowUpRight aria-hidden className={s.arrow} />
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
