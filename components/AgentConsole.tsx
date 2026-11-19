"use client";
import { useRef, useState } from "react";
import { agents, type Status } from "@/lib/console";

const LABEL: Record<Status, string> = {
  done: "Done",
  running: "Running",
  queued: "Queued",
  approval: "Needs approval",
};
const ICON: Record<Status, string> = { done: "✓", running: "●", queued: "○", approval: "!" };
const COLOR: Record<Status, string> = {
  done: "text-emerald-300",
  running: "text-fuchsia-300",
  queued: "text-zinc-300",
  approval: "text-amber-300",
};

export function AgentConsole() {
  const [active, setActive] = useState(0);
  // Per-agent overrides when a person approves a step (human-in-the-loop demo).
  const [approved, setApproved] = useState<Record<string, number[]>>({});
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n =
      e.key === "ArrowRight"
        ? i + 1
        : e.key === "ArrowLeft"
          ? i - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? agents.length - 1
              : null;
    if (n === null) return;
    e.preventDefault();
    const next = (n + agents.length) % agents.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      aria-label="Agent console example"
      className="rounded-2xl border border-white/15 bg-[#0d0d12] text-white shadow-2xl"
    >
      <div
        role="tablist"
        aria-label="Example agents"
        className="flex flex-wrap gap-1 border-b border-white/15 p-2"
      >
        {agents.map((a, i) => (
          <button
            key={a.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`tab-${a.id}`}
            aria-selected={active === i}
            aria-controls={`panel-${a.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={`min-h-11 rounded-pill px-4 text-sm ${active === i ? "bg-purple text-white" : "text-zinc-200 hover:bg-white/10"}`}
          >
            {a.tab}
          </button>
        ))}
      </div>

      {agents.map((a, i) => {
        const ok = approved[a.id] ?? [];
        const steps = a.steps.map((s, j) => ({
          ...s,
          status: ok.includes(j) ? ("done" as Status) : s.status,
        }));
        return (
          // All panels are in the HTML (hidden attr) so crawlers read every example without JavaScript.
          <div
            key={a.id}
            role="tabpanel"
            id={`panel-${a.id}`}
            aria-labelledby={`tab-${a.id}`}
            hidden={active !== i}
            className="p-5"
          >
            <p className="font-mono text-sm text-zinc-300">Prompt</p>
            <p className="mt-1 text-lg">“{a.prompt}”</p>
            <ol className="mt-5 space-y-2">
              {steps.map((s, j) => (
                <li
                  key={s.label}
                  className="flex flex-wrap items-center gap-3 rounded-lg bg-white/5 px-3 py-2"
                >
                  <span
                    aria-hidden
                    className={`w-4 text-center ${COLOR[s.status]} ${s.status === "running" ? "animate-pulse" : ""}`}
                  >
                    {ICON[s.status]}
                  </span>
                  <span className="font-mono text-sm">{s.label}</span>
                  <span className={`ml-auto text-sm ${COLOR[s.status]}`}>{LABEL[s.status]}</span>
                  {s.status === "approval" && (
                    <button
                      type="button"
                      onClick={() =>
                        setApproved((p) => ({ ...p, [a.id]: [...(p[a.id] ?? []), j] }))
                      }
                      className="min-h-8 rounded-pill border border-amber-300 px-3 text-sm text-amber-300 hover:bg-amber-300/10"
                    >
                      Approve<span className="sr-only"> {s.label}</span>
                    </button>
                  )}
                </li>
              ))}
            </ol>
          </div>
        );
      })}
      <p className="border-t border-white/15 px-5 py-3 text-sm text-zinc-300">
        Illustrative example of an agent our team builds for clients, with a person approving key steps. Not live data.
      </p>
    </section>
  );
}
