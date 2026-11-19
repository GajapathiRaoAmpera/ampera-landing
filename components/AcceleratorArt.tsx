import type { CSSProperties, ReactNode } from "react";
import { CardArt } from "@/components/CardArt";
import s from "./AcceleratorArt.module.scss";

// One small animated scene per accelerator that shows what it does (CSS-only, decorative).
// Animation classes live in styles/_animations.scss; reduced motion leaves each scene in its finished state.
const L = "#e9b3e7"; // light brand purple for strokes on ink
const ISSUE = "#fb7185";
const v = (o: Record<string, string | number>) => o as CSSProperties;
const d = (s: number) => ({ animationDelay: `${s}s` });

const Check = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <g className="fix-b" style={d(delay)}>
    <circle cx={x} cy={y} r={7} fill={L} />
    <path d={`M${x - 3} ${y} l2 2.5 l4 -5`} stroke="#050505" strokeWidth={1.8} fill="none" />
  </g>
);
const Issue = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <circle className="fix-a" style={d(delay)} cx={x} cy={y} r={6} fill={ISSUE} />
);
const Window = ({ x = 30, w = 260 }: { x?: number; w?: number }) => (
  <>
    <rect
      x={x}
      y={14}
      width={w}
      height={124}
      rx={10}
      fill="#fff"
      fillOpacity={0.05}
      stroke="#fff"
      strokeOpacity={0.15}
    />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={x + 12 + i * 9} cy={24} r={2.5} fill="#fff" fillOpacity={0.25} />
    ))}
  </>
);

const SCENES: Record<string, ReactNode> = {
  // Radar: sweeping the market, signals blip as they're detected.
  "market-intelligence": (
    <>
      {[22, 42, 62].map((r) => (
        <circle key={r} cx={160} cy={75} r={r} fill="none" stroke="#fff" strokeOpacity={0.15} />
      ))}
      <path d="M95 75h130M160 10v130" stroke="#fff" strokeOpacity={0.1} />
      <g className="sweep" style={{ transformOrigin: "160px 75px" }}>
        <path d="M160 75 L160 13 A62 62 0 0 1 213.7 44 Z" fill="#9c369a" fillOpacity={0.45} />
      </g>
      {[
        [190, 50],
        [130, 100],
        [205, 92],
        [125, 52],
        [172, 118],
      ].map(([x, y], i) => (
        <circle key={i} className="blip" style={d(i * 0.8)} cx={x} cy={y} r={4} fill={L} />
      ))}
    </>
  ),
  // Chat: a question, the assistant thinks, an answer arrives with a cited document.
  "knowledge-assistant": (
    <>
      <g className="seq">
        <rect x={150} y={18} width={140} height={28} rx={14} fill="#9c369a" />
        <rect x={164} y={29} width={90} height={6} rx={3} fill="#fff" fillOpacity={0.8} />
      </g>
      <g className="seq" style={d(0.6)}>
        <rect x={30} y={56} width={58} height={24} rx={12} fill="#fff" fillOpacity={0.1} />
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            className="blink"
            style={d(i * 0.2)}
            cx={47 + i * 12}
            cy={68}
            r={3}
            fill={L}
          />
        ))}
      </g>
      <g className="seq" style={d(1.4)}>
        <rect
          x={30}
          y={90}
          width={190}
          height={44}
          rx={14}
          fill="#fff"
          fillOpacity={0.1}
          stroke="#fff"
          strokeOpacity={0.15}
        />
        <rect x={44} y={102} width={150} height={6} rx={3} fill="#fff" fillOpacity={0.6} />
        <rect x={44} y={116} width={110} height={6} rx={3} fill="#fff" fillOpacity={0.4} />
        <rect x={232} y={98} width={34} height={28} rx={6} fill="none" stroke={L} />
        <path d="M240 106h18M240 112h18M240 118h12" stroke={L} strokeWidth={1.5} />
      </g>
    </>
  ),
  // Funnel: many signals in, the few that matter come out as priorities.
  "sales-enablement": (
    <>
      {[
        [60, 260, 18],
        [90, 230, 52],
        [120, 200, 86],
      ].map(([a, b, y]) => (
        <path
          key={y}
          d={`M${a} ${y}h${b - a}l-14 28h-${b - a - 28}z`}
          fill="#fff"
          fillOpacity={0.05}
          stroke="#fff"
          strokeOpacity={0.2}
        />
      ))}
      {[80, 120, 160, 200, 240].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={10}
          r={4}
          fill={L}
          className="packet"
          style={v({ "--dx": `${160 - x}px`, "--dy": "118px", animationDelay: `${i * 0.6}s` })}
        />
      ))}
      <circle cx={160} cy={134} r={7} fill="#9c369a" className="node-pulse" />
    </>
  ),
  // Price chart: our line draws in, a competitor change is flagged, a pricing action follows.
  "price-intelligence": (
    <>
      {[40, 75, 110].map((y) => (
        <path key={y} d={`M20 ${y}h280`} stroke="#fff" strokeOpacity={0.1} />
      ))}
      <path
        d="M20 108 H80 V90 H140 V96 H200 V64 H300"
        fill="none"
        stroke="#fff"
        strokeOpacity={0.3}
        strokeDasharray="4 4"
      />
      <path
        d="M20 112 L70 104 L110 106 L150 80 L200 84 L240 56 L300 48"
        pathLength={1}
        fill="none"
        stroke={L}
        strokeWidth={2.5}
        className="draw"
      />
      <circle className="blip" style={d(1.2)} cx={200} cy={64} r={6} fill={ISSUE} />
      <g className="seq" style={d(1.8)}>
        <path d="M250 14h44v24h-44l-10-12z" fill="#9c369a" />
        <circle cx={250} cy={26} r={3} fill="#050505" />
        <rect x={258} y={23} width={28} height={6} rx={3} fill="#fff" fillOpacity={0.8} />
      </g>
    </>
  ),
  // Page scan: a scanner passes, barriers are flagged, then fixed.
  "ai-powered-digital-accessibility": (
    <>
      <Window x={60} w={200} />
      <rect x={76} y={38} width={110} height={10} rx={3} fill="#fff" fillOpacity={0.3} />
      <rect x={76} y={56} width={70} height={46} rx={6} fill="#fff" fillOpacity={0.1} />
      <rect x={156} y={58} width={88} height={6} rx={3} fill="#fff" fillOpacity={0.2} />
      <rect x={156} y={72} width={70} height={6} rx={3} fill="#fff" fillOpacity={0.2} />
      <rect x={76} y={112} width={60} height={14} rx={7} fill="#fff" fillOpacity={0.2} />
      <rect
        x={60}
        y={32}
        width={200}
        height={2}
        fill={L}
        className="packet"
        style={v({ "--dx": "0px", "--dy": "100px" })}
      />
      {[
        [186, 43, 0],
        [146, 79, 1],
        [136, 119, 2],
      ].map(([x, y, t]) => (
        <g key={t}>
          <Issue x={x} y={y} delay={t} />
          <Check x={x} y={y} delay={t} />
        </g>
      ))}
    </>
  ),
  // CMS editor with the plugin panel: the checked block hops, panel checks tick one by one.
  "ampera-aem-accessibility-accelerator": (
    <>
      <Window x={20} w={280} />
      <rect x={34} y={36} width={150} height={20} rx={4} fill="#fff" fillOpacity={0.15} />
      <rect x={34} y={64} width={150} height={30} rx={4} fill="#fff" fillOpacity={0.1} />
      <rect x={34} y={102} width={150} height={24} rx={4} fill="#fff" fillOpacity={0.15} />
      <rect
        x={31}
        y={33}
        width={156}
        height={26}
        rx={6}
        fill="none"
        stroke={L}
        strokeWidth={2}
        className="hop"
        style={v({
          "--x1": "0px",
          "--y1": "30px",
          "--x2": "0px",
          "--y2": "68px",
          "--x3": "0px",
          "--y3": "30px",
        })}
      />
      <rect x={198} y={32} width={92} height={98} rx={6} fill="#fff" fillOpacity={0.1} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x={206}
            y={42 + i * 22}
            width={12}
            height={12}
            rx={3}
            fill="none"
            stroke={L}
            strokeOpacity={0.5}
          />
          <rect
            x={224}
            y={45 + i * 22}
            width={56}
            height={6}
            rx={3}
            fill="#fff"
            fillOpacity={0.3}
          />
          <Check x={212} y={48 + i * 22} delay={i * 0.7} />
        </g>
      ))}
    </>
  ),
  // Issue dataset streams into a structured report, which gets signed off.
  "vpat-generator": (
    <>
      {Array.from({ length: 16 }, (_, i) => (
        <rect
          key={i}
          x={24 + (i % 4) * 22}
          y={30 + Math.floor(i / 4) * 22}
          width={18}
          height={18}
          rx={3}
          fill="#fff"
          fillOpacity={0.15}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={116}
          y={46 + i * 22}
          width={20}
          height={6}
          rx={3}
          fill={L}
          className="packet"
          style={v({ "--dx": "80px", "--dy": "0px", animationDelay: `${i * 0.5}s` })}
        />
      ))}
      <rect
        x={210}
        y={14}
        width={90}
        height={124}
        rx={6}
        fill="#fff"
        fillOpacity={0.1}
        stroke={L}
        strokeOpacity={0.4}
      />
      <rect x={210} y={14} width={90} height={16} rx={6} fill="#9c369a" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          className="seq"
          style={d(i * 0.35)}
          x={222}
          y={42 + i * 14}
          width={i % 2 ? 50 : 66}
          height={6}
          rx={3}
          fill="#ffffff"
          fillOpacity={0.6}
        />
      ))}
      <Check x={284} y={122} delay={2} />
    </>
  ),
  // Batch of PDFs: a scan beam passes, each document gets fixed in turn.
  "document-remediation": (
    <>
      {[60, 130, 200].map((x, i) => (
        <g key={x}>
          <path
            d={`M${x} 30h44l16 16v76h-60z`}
            fill="#fff"
            fillOpacity={0.1}
            stroke="#fff"
            strokeOpacity={0.25}
          />
          <path d={`M${x + 44} 30v16h16`} fill="none" stroke="#fff" strokeOpacity={0.25} />
          <rect x={x + 8} y={56} width={24} height={8} rx={2} fill="#9c369a" />
          <rect x={x + 8} y={72} width={44} height={5} rx={2.5} fill="#fff" fillOpacity={0.3} />
          <rect x={x + 8} y={84} width={36} height={5} rx={2.5} fill="#fff" fillOpacity={0.3} />
          <rect x={x + 8} y={96} width={40} height={5} rx={2.5} fill="#fff" fillOpacity={0.3} />
          <Issue x={x + 56} y={32} delay={i * 0.8} />
          <Check x={x + 56} y={32} delay={i * 0.8} />
        </g>
      ))}
      <rect
        x={52}
        y={22}
        width={3}
        height={108}
        fill={L}
        className="packet"
        style={v({ "--dx": "220px", "--dy": "0px" })}
      />
    </>
  ),
  // Keyboard navigation: the focus ring tabs through links, a button and a field.
  "web-accessibility": (
    <>
      <Window x={40} w={240} />
      <rect x={56} y={36} width={52} height={14} rx={4} fill="#fff" fillOpacity={0.2} />
      <rect x={118} y={36} width={52} height={14} rx={4} fill="#fff" fillOpacity={0.2} />
      <rect x={180} y={36} width={52} height={14} rx={4} fill="#fff" fillOpacity={0.2} />
      <rect x={56} y={62} width={140} height={8} rx={4} fill="#fff" fillOpacity={0.15} />
      <rect x={56} y={100} width={52} height={20} rx={10} fill="#9c369a" />
      <rect
        x={118}
        y={100}
        width={110}
        height={20}
        rx={4}
        fill="#fff"
        fillOpacity={0.1}
        stroke="#fff"
        strokeOpacity={0.25}
      />
      <rect
        x={52}
        y={32}
        width={60}
        height={22}
        rx={7}
        fill="none"
        stroke={L}
        strokeWidth={2.5}
        className="hop"
        style={v({
          "--x1": "62px",
          "--y1": "0px",
          "--x2": "0px",
          "--y2": "66px",
          "--x3": "62px",
          "--y3": "66px",
        })}
      />
      <g className="seq" style={d(0.4)}>
        <rect
          x={240}
          y={110}
          width={30}
          height={18}
          rx={4}
          fill="#fff"
          fillOpacity={0.1}
          stroke="#fff"
          strokeOpacity={0.3}
        />
        <path d="M248 119h14m-4-4l4 4-4 4" stroke={L} strokeWidth={1.5} fill="none" />
      </g>
    </>
  ),
};

export function AcceleratorArt({ path }: { path: string }) {
  const scene = SCENES[path.split("/").pop()!];
  if (!scene) return <CardArt path={path} />;
  return (
    <div aria-hidden className={s.art}>
      <div className={s.glow} />
      <svg viewBox="0 0 320 150" className={s.svg}>
        {scene}
      </svg>
    </div>
  );
}
