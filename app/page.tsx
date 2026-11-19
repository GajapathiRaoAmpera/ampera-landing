import Image from "next/image";
import Link from "next/link";
import { LuArrowDown, LuArrowUpRight } from "react-icons/lu";
import { headshot } from "@/lib/images";
import { AcceleratorArt } from "@/components/AcceleratorArt";
import { HeroBio } from "@/components/HeroBio";
import { HeroLine } from "@/components/HeroLine";
import { AgentConsole } from "@/components/AgentConsole";
import { ServiceVisual } from "@/components/ServiceVisual";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { TrustStrip } from "@/components/TrustStrip";
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
const accelerators = list("/accelerators");
const subAccelerators = list("/sub-accelerators");
// Grouping as on the live accelerator pages.
const suites = [
  {
    path: "/accelerators/market-intelligence",
    subs: ["knowledge-assistant", "sales-enablement", "price-intelligence"],
  },
  {
    path: "/accelerators/ai-powered-digital-accessibility",
    subs: [
      "ampera-aem-accessibility-accelerator",
      "vpat-generator",
      "document-remediation",
      "web-accessibility",
    ],
  },
];
// Anything new in content/ that isn't grouped yet still shows up.
const unsuited = [...accelerators, ...subAccelerators].filter(
  (x) => !suites.some((g) => g.path === x.path || g.subs.some((sl) => x.path.endsWith("/" + sl))),
);
// Suite first, then its accelerators (labelled with the suite), then anything ungrouped.
const catalog = [
  ...suites.flatMap(({ path, subs }) => {
    const suite = accelerators.find((x) => x.path === path)!;
    return [
      { item: suite, chip: `Suite · ${subs.length} accelerators`, suite: true },
      ...subs.map((sl) => ({
        item: subAccelerators.find((x) => x.path.endsWith("/" + sl))!,
        chip: suite.title.replace(/^AI Powered /, ""),
        suite: false,
      })),
    ];
  }),
  ...unsuited.map((item) => ({ item, chip: "Accelerator", suite: false })),
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

      <TrustStrip principles={principles} />

      <section className="cv-auto mx-auto max-w-6xl px-4 py-20">
        <Eyebrow>Agent catalog</Eyebrow>
        <h2 className="mt-4 text-4xl font-normal text-purple">Accelerators you can deploy</h2>
        {/* One uniform grid: every card the same size; suites are the dark cards. */}
        <ul
          aria-label="Accelerators"
          className="mt-10 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {catalog.map(({ item, chip, suite }, i) => (
            <li key={item.path}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <div
                  className={`card-lift group relative flex h-full flex-col overflow-hidden rounded-3xl ring-1 focus-within:ring-2 ${
                    suite
                      ? "bg-ink text-white ring-white/10 focus-within:ring-[#e9b3e7]"
                      : "bg-white shadow-sm ring-black/5 focus-within:ring-navy"
                  }`}
                >
                  <AcceleratorArt path={item.path} />
                  <div className="flex flex-1 flex-col p-6">
                    <p
                      className={`font-mono text-xs tracking-widest uppercase ${suite ? "text-[#e9b3e7]" : "text-purple"}`}
                    >
                      {chip}
                    </p>
                    <h3 className="mt-2 text-xl font-medium">
                      <Link
                        href={item.path}
                        className={`after:absolute after:inset-0 focus-visible:outline-none ${suite ? "" : "group-hover:text-purple"}`}
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className={`mt-2 line-clamp-3 ${suite ? "text-zinc-300" : "text-zinc-700"}`}>
                      {item.summary}
                    </p>
                    <span
                      aria-hidden
                      className={`mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium ${suite ? "" : "text-purple"}`}
                    >
                      {suite ? "Explore the suite" : "Read more"}
                      <LuArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="cv-auto mx-auto max-w-6xl px-4 pb-20">
        <Eyebrow>Platform stack</Eyebrow>
        <h2 className="mt-4 text-4xl font-normal text-purple">Five services, one platform</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            // Accessibility spans every layer, so it spans the full row.
            const wide = s.href === "/services/digital-accessibility";
            return (
              <li key={s.href} className={wide ? "md:col-span-2" : ""}>
                <Reveal delay={(i % 2) * 0.1} className="h-full">
                  <div
                    className={`card-lift group relative h-full rounded-3xl p-6 shadow-sm ring-1 focus-within:ring-2 focus-within:ring-navy ${wide ? "bg-[linear-gradient(120deg,#ffffff,#f8ecf8)] ring-purple/25 md:grid md:grid-cols-[1.3fr_1fr] md:items-center md:gap-10 md:p-8" : "bg-white ring-black/5"}`}
                  >
                    <div className="rounded-2xl bg-ivory p-4 ring-1 ring-black/5">
                      <ServiceVisual href={s.href} />
                    </div>
                    <div className={wide ? "mt-5 md:mt-0" : "mt-5"}>
                      {wide && (
                        <p className="mb-2 font-mono text-xs tracking-widest text-purple uppercase">
                          Across every layer
                        </p>
                      )}
                      <h3 className="text-xl font-medium">
                        <a
                          className="after:absolute after:inset-0 group-hover:text-purple focus-visible:outline-none"
                          href={s.href}
                        >
                          {s.name}
                        </a>
                      </h3>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="cv-auto relative overflow-hidden bg-ink py-24 text-white">
        <div aria-hidden className="blueprint pointer-events-none absolute inset-0" />
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4">
          <Eyebrow dark>Stack layers</Eyebrow>
          <StackLayers
            layers={layers.map((n) => {
              const sv = services.find(
                (x) => x.name.replace(/ ?\/ ?/g, "/") === n.replace(/ ?\/ ?/g, "/"),
              )!;
              return { name: sv.name, href: sv.href, chips: sv.tags.slice(0, 3) };
            })}
          />
        </div>
      </section>

      <section className="cv-auto bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Eyebrow>How we ship AI</Eyebrow>
          <Pipeline steps={steps} />
          <ul className="mt-8 flex flex-wrap gap-2">
            {principles.map(([p]) => (
              <Tag key={p}>{p}</Tag>
            ))}
          </ul>
        </div>
      </section>

      <section className="cv-auto mx-auto max-w-6xl px-4 py-20">
        <Eyebrow>Agents in production</Eyebrow>
        <h2 className="mt-4 text-4xl font-normal text-purple">Success stories</h2>
        <Cards label="Case studies" items={list("/projects")} />
        <div className="mt-8">
          <Button href="/projects" variant="secondary">
            All success stories
          </Button>
        </div>
      </section>

      <section className="cv-auto bg-white py-20">
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
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((l, i) => (
              <li key={l.path}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <div className="card-lift group relative flex h-full items-center gap-4 rounded-2xl border border-black/10 bg-ivory p-4 focus-within:ring-2 focus-within:ring-navy">
                    {headshot(l.path) && (
                      <Image
                        src={headshot(l.path)!}
                        width={64}
                        height={64}
                        alt=""
                        className="size-16 shrink-0 rounded-full object-cover object-[50%_25%] ring-2 ring-white transition-shadow group-hover:ring-purple"
                      />
                    )}
                    <div className="min-w-0">
                      <Link
                        className="font-medium after:absolute after:inset-0 group-hover:text-purple focus-visible:outline-none"
                        href={l.path}
                      >
                        {l.title}
                      </Link>
                      <p className="text-sm text-zinc-700">{l.role}</p>
                    </div>
                    <LuArrowUpRight
                      aria-hidden
                      className="ml-auto size-4 shrink-0 text-purple opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cv-auto bg-ink py-20 text-white">
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
