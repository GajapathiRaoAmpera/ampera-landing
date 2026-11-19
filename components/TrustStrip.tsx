import Image from "next/image";
import { LuBadgeCheck } from "react-icons/lu";
import { SiDatabricks, SiSnowflake } from "react-icons/si";
import { img } from "@/lib/images";
import { Eyebrow } from "@/components/Eyebrow";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";

// Microsoft has no Simple Icons glyph; its mark is four squares.
const MicrosoftMark = () => (
  <span aria-hidden className="grid size-7 grid-cols-2 gap-0.5">
    <span className="bg-[#f25022]" />
    <span className="bg-[#7fba00]" />
    <span className="bg-[#00a4ef]" />
    <span className="bg-[#ffb900]" />
  </span>
);

const partners = [
  { name: "Microsoft", logo: <MicrosoftMark /> },
  { name: "Databricks", logo: <SiDatabricks aria-hidden className="size-7 text-[#ff3621]" /> },
  { name: "Snowflake", logo: <SiSnowflake aria-hidden className="size-7 text-[#29b5e8]" /> },
];

// Trust band: ISO + partners once, then the delivery principles as a ticker.
export function TrustStrip({ principles }: { principles: string[] }) {
  return (
    <section
      aria-labelledby="trust-h"
      className="relative overflow-hidden border-b border-black/10 bg-white"
    >
      <div aria-hidden className="trust-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-[auto_1fr] lg:gap-16">
        <Reveal>
          <div className="flex items-center gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/10">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={img.iso}
                width={88}
                height={108}
                alt="ISO 27001 certification mark, Intertek"
              />
              <span aria-hidden className="sheen" />
            </div>
            <div>
              <p className="flex items-center gap-2 font-medium text-navy">
                <span className="relative flex size-6 items-center justify-center">
                  <span
                    aria-hidden
                    className="absolute inset-0 animate-ping rounded-full bg-purple/30 [animation-iteration-count:3]"
                  />
                  <LuBadgeCheck aria-hidden className="relative size-6 text-purple" />
                </span>
                ISO certified
              </p>
              <p className="mt-1 text-sm text-zinc-600">Audited by Intertek</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal delay={0.1}>
            <Eyebrow>Built on</Eyebrow>
            <h2 id="trust-h" className="mt-3 text-3xl font-normal text-balance text-purple">
              Certified, and built on the platforms you already run
            </h2>
          </Reveal>
          <div className="relative mt-8">
            <svg
              aria-hidden
              className="absolute inset-x-0 top-1/2 hidden h-px w-full overflow-visible sm:block"
            >
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                className="flow stroke-purple/40"
                strokeWidth="1.5"
              />
            </svg>
            <ul className="relative grid gap-4 sm:grid-cols-3">
              {partners.map((p, i) => (
                <li key={p.name}>
                  <Reveal delay={0.2 + i * 0.12}>
                    <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-5 py-4 transition duration-300 hover:border-purple/40 hover:shadow-lg hover:shadow-purple/10 motion-safe:hover:-translate-y-1">
                      {p.logo}
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-sm text-zinc-600">Technology partner</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="relative border-t border-black/10">
        <Marquee items={principles} />
      </div>
    </section>
  );
}
