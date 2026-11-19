// Homepage data, read at build time. Copy is from the live amperatech.ai homepage (CLAUDE.md §2).
import { getPage } from "@/lib/content";
import { list } from "@/lib/listing";
import { services } from "@/lib/site";

export const heroBadges = ["ISO certified", "Human-in-the-loop", "Accessibility by default"];

export const principles: [string, string][] = [
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

export const steps = [
  ["Connect", "Cloud data engineering and pipelines feed the agent."],
  ["Compose", "Agent architecture, orchestration and tool integration."],
  ["Govern", "Human-in-the-loop controls, model evaluation, safety and compliance."],
  ["Operate", "MLOps and production deployment, with continuous support."],
];

// Stack layers, bottom to top; Digital Accessibility spans all of them.
const layerNames = [
  "Cloud / Data Engineering",
  "Data Science / Machine Learning",
  "GenAI & LLMs",
  "Agentic & Autonomous AI",
];
const norm = (n: string) => n.replace(/ ?\/ ?/g, "/");
export const stackLayers = layerNames.map((n) => {
  const sv = services.find((x) => norm(x.name) === norm(n))!;
  return { name: sv.name, href: sv.href, chips: sv.tags.slice(0, 3) };
});

// Agent catalog: grouping as on the live accelerator pages.
const accelerators = list("/accelerators");
const subAccelerators = list("/sub-accelerators");
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
export const catalog = [
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

export const leaders = list("/about/leadership-team").map((l) => ({
  ...l,
  role: getPage(l.path)!.title.split(" – ")[1] ?? "",
}));

export const caseStudies = list("/projects");
