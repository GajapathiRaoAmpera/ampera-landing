// Decorative-but-readable diagrams: real text in the SVG (crawlable), animated flow lines, no stats.
const FLOWS: Record<string, string[]> = {
  "/services/genai-llms": ["Documents", "Vector search", "LLM", "Answer"],
  "/services/data-science-machine-learning": ["Data", "Pipeline", "Model", "Prediction"],
  "/services/cloud-data-engineering": ["Sources", "Pipelines", "Lakehouse", "MLOps"],
  "/services/digital-accessibility": ["Audit", "Remediate", "VPAT", "Monitor"],
};
const HUB = ["Tools", "Workflow", "Human review", "Governance"];

const box = "fill-white stroke-purple";
const label = {
  textAnchor: "middle",
  className: "fill-ink text-[13px]",
  dominantBaseline: "middle",
} as const;

export function ServiceVisual({ href }: { href: string }) {
  const flow = FLOWS[href];
  if (!flow && href !== "/services/agentic-autonomous-ai") return null;

  if (flow)
    return (
      <svg
        viewBox="0 0 480 100"
        role="img"
        aria-label={`Diagram: ${flow.join(" to ")}`}
        className="h-auto w-full max-w-xl"
      >
        {flow.map((t, i) => (
          <g key={t}>
            <rect
              x={i * 130}
              y={30}
              width={90}
              height={40}
              rx={20}
              strokeWidth={1.5}
              className={box}
            />
            <text x={i * 130 + 45} y={50} {...label}>
              {t}
            </text>
            {i < flow.length - 1 && (
              <>
                <line
                  x1={i * 130 + 94}
                  y1={50}
                  x2={i * 130 + 122}
                  y2={50}
                  strokeWidth={2}
                  className="flow stroke-navy"
                />
                <polygon
                  points={`${i * 130 + 130},50 ${i * 130 + 122},45 ${i * 130 + 122},55`}
                  className="fill-navy"
                />
              </>
            )}
          </g>
        ))}
      </svg>
    );

  const nodes: [number, number][] = [
    [10, 10],
    [380, 10],
    [10, 114],
    [380, 114],
  ];
  return (
    <svg
      viewBox="0 0 480 160"
      role="img"
      aria-label={`Diagram: an agent connected to ${HUB.join(", ")}`}
      className="h-auto w-full max-w-xl"
    >
      {nodes.map(([x, y], i) => (
        <line
          key={HUB[i]}
          x1={240}
          y1={80}
          x2={x + 45}
          y2={y + 18}
          strokeWidth={2}
          className="flow stroke-navy"
        />
      ))}
      <rect x={190} y={58} width={100} height={44} rx={22} className="fill-purple" />
      <text
        x={240}
        y={80}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-white text-[14px] font-medium"
      >
        Agent
      </text>
      {nodes.map(([x, y], i) => (
        <g key={HUB[i]}>
          <rect x={x} y={y} width={110} height={36} rx={18} strokeWidth={1.5} className={box} />
          <text x={x + 55} y={y + 18} {...label}>
            {HUB[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}
