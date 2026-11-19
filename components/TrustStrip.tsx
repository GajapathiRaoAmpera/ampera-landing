import Image from "next/image";
import { LuBadgeCheck } from "react-icons/lu";
import { SiDatabricks, SiSnowflake } from "react-icons/si";
import { img } from "@/lib/images";
import { Eyebrow } from "@/components/Eyebrow";
import { Principles } from "@/components/Principles";
import { Reveal } from "@/components/Reveal";
import s from "./TrustStrip.module.scss";

// Microsoft has no Simple Icons glyph; its mark is four squares.
const MicrosoftMark = () => (
  <span aria-hidden className={s.msMark}>
    <span />
    <span />
    <span />
    <span />
  </span>
);

const partners = [
  { name: "Microsoft", logo: <MicrosoftMark /> },
  { name: "Databricks", logo: <SiDatabricks aria-hidden className={s.databricks} /> },
  { name: "Snowflake", logo: <SiSnowflake aria-hidden className={s.snowflake} /> },
];

// Trust band: ISO + partners, then the delivery principles.
export function TrustStrip({ principles }: { principles: [string, string][] }) {
  return (
    <section aria-labelledby="trust-h" className={s.band}>
      <div aria-hidden className={s.glow} />
      <div className={s.top}>
        <Reveal>
          <div className={s.iso}>
            <div className={s.isoMark}>
              <Image
                src={img.iso}
                width={88}
                height={108}
                alt="ISO 27001 certification mark, Intertek"
              />
              <span aria-hidden className="sheen" />
            </div>
            <div>
              <p className={s.isoTitle}>
                <span className={s.badge}>
                  <span aria-hidden className={s.ping} />
                  <LuBadgeCheck aria-hidden className={s.badgeIcon} />
                </span>
                ISO certified
              </p>
              <p className={s.muted}>Audited by Intertek</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal delay={0.1}>
            <Eyebrow>Built on</Eyebrow>
            <h2 id="trust-h" className={s.heading}>
              ISO certified (Intertek) · Technology partners: Microsoft, Databricks, Snowflake
            </h2>
          </Reveal>
          <div className={s.partners}>
            <svg aria-hidden className={s.line}>
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                className="flow"
                stroke="#9c369a"
                strokeOpacity={0.4}
                strokeWidth="1.5"
              />
            </svg>
            <ul className={s.partnerList}>
              {partners.map((p, i) => (
                <li key={p.name}>
                  <Reveal delay={0.2 + i * 0.12}>
                    <div className={s.partner}>
                      {p.logo}
                      <div>
                        <p className={s.partnerName}>{p.name}</p>
                        <p className={s.muted}>Technology partner</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={s.principles}>
        <Principles items={principles} />
      </div>
    </section>
  );
}
