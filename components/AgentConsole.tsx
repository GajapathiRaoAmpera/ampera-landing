"use client";
import { useEffect, useRef, useState } from "react";
import { agents, type Status } from "@/lib/console";
import {
  LuCheck,
  LuCircle,
  LuCircleCheck,
  LuPause,
  LuPlay,
  LuRotateCcw,
  LuUser,
} from "react-icons/lu";

const LABEL: Record<Status, string> = {
  done: "Done",
  running: "Running",
  queued: "Queued",
  approval: "Needs approval",
};
const COLOR: Record<Status, string> = {
  done: "text-emerald-300",
  running: "text-fuchsia-300",
  queued: "text-zinc-300",
  approval: "text-amber-300",
};
const TYPE_MS = 30; // per typed character
const STEP_MS = 1100; // a step "runs"
const APPROVE_MS = 2200; // a person "reviews" (auto-plays; visitors never have to click)
const NEXT_MS = 4500; // hold the finished story before the next agent

export function AgentConsole() {
  const [active, setActive] = useState(0);
  // cursor: -1 = typing the prompt, 0..n-1 = step in progress, n = finished, null = static view
  // (server HTML, no-JS, reduced motion).
  const [cursor, setCursor] = useState<number | null>(null);
  const [typed, setTyped] = useState(0);
  const [motion, setMotion] = useState(false);
  const [playing, setPlaying] = useState(true);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const root = useRef<HTMLElement>(null);

  const agent = agents[active];
  const n = agent.steps.length;
  const finished = cursor !== null && cursor >= n;

  const start = () => {
    setTyped(0);
    setCursor(-1);
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setMotion(!mq.matches);
      if (mq.matches) setCursor(null);
      else start();
    };
    // Story starts the first time the console scrolls into view.
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        update();
      },
      { threshold: 0.4 },
    );
    if (root.current) io.observe(root.current);
    mq.addEventListener("change", update);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!motion || !playing || cursor === null) return;
    if (cursor === -1) {
      const len = agent.prompt.length;
      const t = setTimeout(
        () => (typed >= len ? setCursor(0) : setTyped(typed + 1)),
        typed >= len ? 500 : TYPE_MS,
      );
      return () => clearTimeout(t);
    }
    if (finished) {
      const t = setTimeout(() => {
        setActive((a) => (a + 1) % agents.length);
        start();
      }, NEXT_MS);
      return () => clearTimeout(t);
    }
    const wait = agent.steps[cursor].status === "approval" ? APPROVE_MS : STEP_MS;
    const t = setTimeout(() => setCursor(cursor + 1), wait);
    return () => clearTimeout(t);
  }, [motion, playing, cursor, typed, finished, agent]);

  const select = (i: number) => {
    setActive(i);
    if (motion) start();
    else setCursor(null);
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const t =
      e.key === "ArrowRight"
        ? i + 1
        : e.key === "ArrowLeft"
          ? i - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? agents.length - 1
              : null;
    if (t === null) return;
    e.preventDefault();
    const next = (t + agents.length) % agents.length;
    select(next);
    tabs.current[next]?.focus();
  };

  const statusOf = (j: number): Status => {
    if (cursor === null) return agent.steps[j].status;
    if (j < cursor) return "done";
    if (j === cursor) return agent.steps[j].status === "approval" ? "approval" : "running";
    return "queued";
  };

  const now = cursor !== null && cursor >= 0 && !finished ? agent.steps[cursor] : null;
  const announce = finished
    ? `${agent.tab} agent finished. A person approved the key step.`
    : now?.status === "approval"
      ? `${now.label}: waiting for a person to approve.`
      : "";

  return (
    <section
      ref={root}
      aria-label="Agent console example"
      className="rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.09] to-white/[0.02] text-white shadow-[0_0_90px_-20px_rgba(156,54,154,0.7)] backdrop-blur"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-0 border-b border-white/10 px-5 pt-3">
        <span aria-hidden className="flex gap-1.5">
          <i className="size-3 rounded-full bg-red-400/80" />
          <i className="size-3 rounded-full bg-amber-300/80" />
          <i className="size-3 rounded-full bg-emerald-400/80" />
        </span>
        <div
          role="tablist"
          aria-label="Example agents"
          className="order-last flex w-full flex-wrap gap-x-2"
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
              onClick={() => select(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`min-h-11 border-b-2 px-2 text-sm transition-colors ${active === i ? "border-fuchsia-300 text-white" : "border-transparent text-zinc-300 hover:text-white"}`}
            >
              {a.tab}
            </button>
          ))}
        </div>
        {motion && (
          <button
            type="button"
            onClick={() => {
              if (finished) {
                start();
                setPlaying(true);
              } else setPlaying((p) => !p);
            }}
            aria-label={
              finished ? "Replay example" : playing ? "Pause animation" : "Play animation"
            }
            title={finished ? "Replay example" : playing ? "Pause animation" : "Play animation"}
            className="ml-auto grid size-11 place-items-center rounded-full text-zinc-300 hover:bg-white/10 hover:text-white"
          >
            {finished ? (
              <LuRotateCcw className="size-4" />
            ) : playing ? (
              <LuPause className="size-4" />
            ) : (
              <LuPlay className="size-4" />
            )}
          </button>
        )}
      </div>

      {agents.map((a, i) => {
        const isActive = i === active;
        const typing = isActive && cursor === -1;
        const prompt =
          isActive && cursor !== null && cursor < 0 ? a.prompt.slice(0, typed) : a.prompt;
        return (
          // All panels are in the HTML (hidden attr) so crawlers read every example without JavaScript.
          <div
            key={a.id}
            role="tabpanel"
            id={`panel-${a.id}`}
            aria-labelledby={`tab-${a.id}`}
            hidden={!isActive}
            className="min-h-[19rem] px-5 py-5 font-mono"
          >
            <p className="text-base leading-relaxed">
              <span aria-hidden className="text-fuchsia-300">
                ${" "}
              </span>
              <span className="sr-only">Prompt: </span>“{prompt}
              {typing && <span aria-hidden className="caret" />}
              {!typing && "”"}
            </p>
            <ol className="mt-5 space-y-3 text-sm">
              {a.steps.map((s, j) => {
                const st = isActive ? statusOf(j) : s.status;
                const person = s.status === "approval";
                const label =
                  person && st === "done" && cursor !== null
                    ? "Approved by a person"
                    : st === "approval" && cursor !== null
                      ? "Waiting for a person"
                      : LABEL[st];
                return (
                  <li
                    key={s.label}
                    className={`flex items-center gap-3 transition-opacity duration-500 ${st === "queued" ? "opacity-60" : "line-in"}`}
                  >
                    <span aria-hidden className="grid size-5 shrink-0 place-items-center">
                      {st === "running" ? (
                        <span className="spinner" />
                      ) : (
                        <span key={st} className={`pop ${COLOR[st]}`}>
                          {st === "done" ? (
                            <LuCheck className="size-4" />
                          ) : st === "approval" ? (
                            <LuUser className="size-4" />
                          ) : (
                            <LuCircle className="size-3" />
                          )}
                        </span>
                      )}
                    </span>
                    <span className={st === "queued" ? "" : "text-white"}>{s.label}</span>
                    <span className={`ml-auto text-right ${COLOR[st]}`}>{label}</span>
                  </li>
                );
              })}
            </ol>
            {isActive && finished && (
              <p className="line-in mt-5 rounded-lg border border-emerald-300/40 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-200">
                <LuCircleCheck aria-hidden className="mr-2 inline size-4 align-[-3px]" />
                Finished, with a person approving the key step.
              </p>
            )}
          </div>
        );
      })}
      <p role="status" className="sr-only">
        {announce}
      </p>
      <p className="border-t border-white/10 px-5 py-3 text-sm text-zinc-300">
        Illustrative example of an agent our team builds for clients, with a person approving key
        steps. Not live data.
      </p>
    </section>
  );
}
