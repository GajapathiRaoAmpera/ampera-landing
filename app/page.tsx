import Image from "next/image";
import { coverFor, headshot, img } from "@/lib/images";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { AgentConsole } from "@/components/AgentConsole";
import { ServiceVisual } from "@/components/ServiceVisual";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Marquee } from "@/components/Marquee";
import { Pipeline } from "@/components/Pipeline";
import { Reveal } from "@/components/Reveal";
import { StackLayers } from "@/components/StackLayers";
import { Tag } from "@/components/Tag";
import { Cards } from "@/components/Cards";
import { list } from "@/lib/listing";
import { getPage } from "@/lib/content";
import { services, site } from "@/lib/site";

const layers = [
  "Cloud / Data Engineering",
  "Data Science / Machine Learning",
  "GenAI & LLMs",
  "Agentic & Autonomous AI",
];
const steps = [
  ["Connect", "Cloud data engineering and pipelines feed the agent."],
  ["Compose", "Agent architecture, orchestration and tool integration."],
  ["Govern", "Human-in-the-loop controls, model evaluation, safety and compliance."],
  ["Operate", "MLOps and production deployment, with continuous support."],
];
const principles = [
  "AI-Driven Results",
  "Business Delivery",
  "Clear Communication",
  "Built to Scale",
  "Production Reliability",
];
const leaders = list("/about/leadership-team").map((l) => ({
  ...l,
  role: getPage(l.path)!.title.split(" – ")[1] ?? "",
}));

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden className="blueprint pointer-events-none absolute inset-0" />
        <HeroBackdrop />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow dark>Advanced AI data intelligence</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-5xl font-light leading-tight sm:text-6xl">
              We build AI agents and data platforms, with your team in the loop
            </h1>
            <p className="mt-6 max-w-2xl text-lg">
              Our engineers design, build and run production-grade AI for your business: data
              platforms, ML systems and agents, with people approving the decisions that matter and
              accessibility by default.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact">Book a demo</Button>
              <Button href="/accelerators" variant="secondary" dark>
                Explore accelerators
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
          <AgentConsole />
        </div>
      </section>

      <section aria-label="Built on" className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-4 py-6">
          <Image
            src={img.iso}
            width={56}
            height={69}
            alt="ISO 27001 certification mark, Intertek"
          />
          <p className="text-base">
            ISO certified (Intertek) · Technology partners: Microsoft, Databricks, Snowflake
          </p>
          <Image src={img.microsoft} width={110} height={30} alt="Microsoft" className="rounded" />
        </div>
      </section>

      <section aria-label="Proof points" className="border-b border-black/10">
        <Marquee
          items={[
            "ISO certified (Intertek)",
            "Microsoft partner",
            "Databricks partner",
            "Snowflake partner",
            ...principles,
          ]}
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <Eyebrow>Agent catalog</Eyebrow>
        <h2 className="mt-4 text-4xl font-normal text-purple">Accelerators you can deploy</h2>
        <Cards
          label="Accelerators"
          items={[...list("/accelerators"), ...list("/sub-accelerators")]}
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <Eyebrow>Platform stack</Eyebrow>
        <h2 className="mt-4 text-4xl font-normal text-purple">Five services, one platform</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.href} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              {coverFor(s.href) && (
                <Image
                  src={coverFor(s.href)!}
                  width={640}
                  height={360}
                  sizes="(min-width: 768px) 520px, 100vw"
                  alt=""
                  className="mb-4 aspect-video w-full rounded-xl object-cover"
                />
              )}
              <ServiceVisual href={s.href} />
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

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <Eyebrow>Stack layers</Eyebrow>
        <StackLayers
          layers={layers.map((n) => {
            const sv = services.find(
              (x) => x.name.replace(/ ?\/ ?/g, "/") === n.replace(/ ?\/ ?/g, "/"),
            )!;
            return { name: sv.name, href: sv.href, chips: sv.tags.slice(0, 3) };
          })}
        />
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Eyebrow>How we ship AI</Eyebrow>
          <Pipeline steps={steps} />
          <ul className="mt-8 flex flex-wrap gap-2">
            {principles.map((p) => (
              <Tag key={p}>{p}</Tag>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <Eyebrow>Agents in production</Eyebrow>
        <h2 className="mt-4 text-4xl font-normal text-purple">Success stories</h2>
        <Cards label="Case studies" items={list("/projects")} />
        <div className="mt-8">
          <Button href="/projects" variant="secondary">
            All success stories
          </Button>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="mt-4 text-4xl font-normal text-purple">
            Opportunity for skilled professionals, including people with disabilities
          </h2>
          <p className="mt-4 max-w-3xl text-lg">
            Our founders bring 30+ years of digital experience. Our mission is to create
            opportunities for skilled professionals, including persons with disabilities, and it is
            why accessibility is built into everything we ship.
          </p>
          <Image
            src={img.team}
            width={1200}
            height={798}
            sizes="(min-width: 1152px) 1088px, 100vw"
            alt=""
            className="mt-8 h-64 w-full rounded-2xl object-cover"
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((l) => (
              <li key={l.path} className="flex items-center gap-4">
                {headshot(l.path) && (
                  <Image
                    src={headshot(l.path)!}
                    width={64}
                    height={64}
                    alt=""
                    className="size-16 rounded-full object-cover object-[50%_25%]"
                  />
                )}
                <div>
                  <a className="font-medium hover:underline" href={l.path}>
                    {l.title}
                  </a>
                  <p>{l.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-light">Put your first AI system into production</h2>
          {/* TODO: work-email form (server action + Resend) once approved; link for now. */}
          <p className="mt-4 text-lg">
            Tell us your goal. Write to{" "}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            or book a demo.
          </p>
          <div className="mt-6">
            <Button href="/contact">Book a demo</Button>
          </div>
        </div>
      </section>
    </>
  );
}
