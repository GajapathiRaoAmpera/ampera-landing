import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Tag } from "@/components/Tag";
import { services } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Eyebrow dark>Advanced AI data intelligence</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-5xl font-light leading-tight sm:text-6xl">
            AI agents that turn your data into decisions
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            We design, build and run production-grade agents, data platforms and ML systems, with
            humans in the loop and accessibility by default.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact">Book a demo</Button>
            <Button href="/accelerators" variant="secondary" dark>
              Explore agents
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-3 text-sm">
            {["ISO certified", "Human-in-the-loop", "Accessibility by default"].map((b) => (
              <li key={b} className="rounded-pill border border-white/40 px-3 py-1">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <Eyebrow>What we offer</Eyebrow>
        <h2 className="mt-4 text-4xl font-normal text-purple">Five services, one platform</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.href} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-xl font-medium">
                <a className="hover:underline" href={s.href}>
                  {s.name}
                </a>
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
