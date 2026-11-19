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
import { cx } from "@/lib/cx";
import s from "./CardArt.module.scss";

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
    <div aria-hidden className={cx(s.art, s[size])}>
      <svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice" className={s.svg}>
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
              {...(i % 3
                ? { stroke: "#fff", strokeOpacity: 0.15 }
                : { className: "flow", stroke: "#e9b3e7", strokeOpacity: 0.5 })}
            />
          );
        })}
        {nodes.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 4 ? 2 : 3.5}
            {...(i % 4
              ? { fill: "#fff", fillOpacity: 0.4 }
              : { className: "node-pulse", fill: "#e9b3e7" })}
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        ))}
      </svg>
      <span className={s.icon}>
        <Icon />
      </span>
    </div>
  );
}
