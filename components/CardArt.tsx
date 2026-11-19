import type { IconType } from "react-icons";
import {
  LuAccessibility,
  LuActivity,
  LuBlocks,
  LuBookOpen,
  LuChartLine,
  LuCpu,
  LuDatabase,
  LuFileCheck,
  LuFileText,
  LuGlobe,
  LuGraduationCap,
  LuLanguages,
  LuMessageSquareText,
  LuRadar,
  LuShieldCheck,
  LuSparkles,
  LuTag,
  LuTrendingUp,
  LuUmbrella,
  LuUsers,
} from "react-icons/lu";

// Keyed by the last URL segment of accelerator / case-study pages.
const ICONS: Record<string, IconType> = {
  "market-intelligence": LuRadar,
  "ai-powered-digital-accessibility": LuAccessibility,
  "ampera-aem-accessibility-accelerator": LuBlocks,
  "vpat-generator": LuFileCheck,
  "document-remediation": LuFileText,
  "web-accessibility": LuGlobe,
  "knowledge-assistant": LuBookOpen,
  "sales-enablement": LuTrendingUp,
  "price-intelligence": LuTag,
  "engineering-analytics": LuActivity,
  "automation-global-security": LuShieldCheck,
  "pricing-intelligence": LuTag,
  "community-college-network": LuGraduationCap,
  "global-multilingual-content-provider": LuLanguages,
  "learning-platform-provider": LuBookOpen,
  "insurance-quote-intelligence": LuUmbrella,
  "global-electronics-test-measurement": LuCpu,
  "content-analytics-knowledge-assistant": LuMessageSquareText,
  hsri: LuAccessibility,
  "customer-data-platform": LuDatabase,
  "google-analytics": LuChartLine,
  "member-conversion": LuUsers,
};

// Tiny seeded PRNG so each card gets its own, stable graph (same on server and every build).
function rng(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

// Code-built card header replacing stock/AI imagery: an agent graph around the item's icon.
export function CardArt({ path, size = "md" }: { path: string; size?: "md" | "lg" }) {
  const slug = path.split("/").pop()!;
  const Icon = ICONS[slug] ?? LuSparkles;
  const r = rng(slug);
  const nodes = Array.from({ length: 12 }, () => [20 + r() * 360, 14 + r() * 132] as const);
  const id = `ca-${slug}`;
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden bg-ink ${size === "lg" ? "min-h-56 flex-1" : "h-36"}`}
    >
      <svg
        viewBox="0 0 400 160"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <defs>
          <radialGradient id={id} cx={0.3 + r() * 0.4} cy="0.5" r="0.8">
            <stop offset="0" stopColor="#9c369a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#050505" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="160" fill={`url(#${id})`} />
        {nodes.map(([x, y], i) => {
          const [x2, y2] = i ? nodes[i - 1] : [200, 80];
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={x2}
              y2={y2}
              strokeWidth={1}
              className={i % 3 ? "stroke-white/15" : "flow stroke-[#e9b3e7]/50"}
            />
          );
        })}
        {nodes.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 4 ? 2 : 3.5}
            className={i % 4 ? "fill-white/40" : "node-pulse fill-[#e9b3e7]"}
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        ))}
      </svg>
      <span className="card-art-icon absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-transform duration-500">
        <Icon className="size-7" />
      </span>
    </div>
  );
}
