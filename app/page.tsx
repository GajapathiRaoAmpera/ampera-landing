import Image from "next/image";
import { LuArrowDown } from "react-icons/lu";
import { coverFor, headshot, img } from "@/lib/images";
import { HeroBio } from "@/components/HeroBio";
import { HeroLine } from "@/components/HeroLine";
import { AgentConsole } from "@/components/AgentConsole";
import { ServiceVisual } from "@/components/ServiceVisual";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { TrustStrip } from "@/components/TrustStrip";
import { Pipeline } from "@/components/Pipeline";
import { Principles } from "@/components/Principles";
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
// Copy from the live amperatech.ai homepage.
const principles: [string, string][] = [
  [
    "AI-Driven Results",
    "We convert data signals into actionable strategies using AI and machine learning.",
  ],
  [
    "Business Delivery",
    "We align every solution to your goals, timelines, and measurable outcomes.",
  ],
  [
    "Clear Communication",
    "We simplify complexity and keep stakeholders aligned from start to launch.",
  ],
  ["Built to Scale", "We design secure, reliable systems that grow with your data and needs."],
  [
    "Production Reliability",
    "We add monitoring and safeguards to keep AI systems accurate and dependable.",
  ],
];
const leaders = list("/about/leadership-team").map((l) => ({
  ...l,
  role: getPage(l.path)!.title.split(" – ")[1] ?? "",
}));

export default function Home() {
  return (
    <>
      {/* 1. Opening screen: tagline + the AI -> DNA animation, labelled with what we do. */}
      <section
        aria-label="Ampera"
        className="relative flex h-[85svh] min-h-[34rem] flex-col items-center overflow-hidden bg-ink px-4 text-white sm:h-[100svh]"
      >
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
        <div aria-hidden className="blueprint pointer-events-none absolute inset-0" />
        <HeroBio />
        <div className="relative mt-32 sm:mt-36">
          <HeroLine />
        </div>
        {/* The 3D callouts are decorative; this gives the same "what we do" to screen readers. */}
        <ul className="sr-only">
          {services.map((s) => (
            <li key={s.href}>{s.name}</li>
          ))}
        </ul>
        <a
          href="#hero"
          className="relative mt-auto mb-8 inline-flex min-h-11 items-center gap-2 rounded-pill border border-white/40 px-5 text-sm hover:bg-white/10"
        >
          See what we build <LuArrowDown aria-hidden className="scroll-cue size-4" />
        </a>
      </section>

      {/* 2. Hero content: headline, CTAs and the agent console, revealed on scroll (Motion). */}
      <section id="hero" className="relative scroll-mt-20 overflow-hidden bg-ink text-white">
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <Eyebrow dark>Advanced AI data intelligence</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 max-w-3xl text-4xl font-light text-balance leading-[1.1] tracking-tight sm:text-5xl">
                We build AI agents and data platforms, with your team{" "}
                <span className="text-[#e9b3e7]">in the loop</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-200">
                Our engineers design, build and run production-grade AI for your business: data
                platforms, ML systems and agents, with people approving the decisions that matter
                and accessibility by default.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact">Book a demo</Button>
              <Button href="/accelerators" variant="secondary" dark>
                Explore accelerators
              </Button>
            </Reveal>
            <Reveal delay={0.4}>
              <ul className="mt-10 flex flex-wrap gap-3 text-sm">
                {["ISO certified", "Human-in-the-loop", "Accessibility by default"].map((b) => (
                  <li key={b} className="rounded-pill border border-white/40 px-3 py-1">
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <AgentConsole />
          </Reveal>
        </div>
      </section>

      <TrustStrip />

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
          <h3 id="principles" className="mt-16 scroll-mt-24 text-xl font-normal text-navy">
            Delivery principles
          </h3>
          <Principles items={principles} />
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
