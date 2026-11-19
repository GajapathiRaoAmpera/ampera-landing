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
import { cx } from "@/lib/cx";
import s from "./AgentConsole.module.scss";

const LABEL: Record<Status, string> = {
  done: "Done",
  running: "Running",
  queued: "Queued",
  approval: "Needs approval",
};
const COLOR: Record<Status, string> = {
  done: s.done,
  running: s.running,
  queued: s.queued,
  approval: s.approval,
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
      className={s.console}
    >
      <div className={s.bar}>
        <span aria-hidden className={s.lights}>
          <i />
          <i />
          <i />
        </span>
        <div role="tablist" aria-label="Example agents" className={s.tabs}>
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
              className={cx(s.tab, active === i && s.tabActive)}
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
            className={s.play}
          >
            {finished ? <LuRotateCcw /> : playing ? <LuPause /> : <LuPlay />}
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
            className={s.panel}
          >
            <p className={s.prompt}>
              <span aria-hidden className={s.running}>
                ${" "}
              </span>
              <span className="sr-only">Prompt: </span>“{prompt}
              {typing && <span aria-hidden className="caret" />}
              {!typing && "”"}
            </p>
            <ol className={s.steps}>
              {a.steps.map((step, j) => {
                const st = isActive ? statusOf(j) : step.status;
                const person = step.status === "approval";
                const label =
                  person && st === "done" && cursor !== null
                    ? "Approved by a person"
                    : st === "approval" && cursor !== null
                      ? "Waiting for a person"
                      : LABEL[st];
                return (
                  <li
                    key={step.label}
                    className={cx(s.step, st === "queued" ? s.waiting : "line-in")}
                  >
                    <span aria-hidden className={s.status}>
                      {st === "running" ? (
                        <span className="spinner" />
                      ) : (
                        <span key={st} className={cx("pop", COLOR[st])}>
                          {st === "done" ? (
                            <LuCheck />
                          ) : st === "approval" ? (
                            <LuUser />
                          ) : (
                            <LuCircle className={s.small} />
                          )}
                        </span>
                      )}
                    </span>
                    <span className={st === "queued" ? undefined : s.live}>{step.label}</span>
                    <span className={cx(s.label, COLOR[st])}>{label}</span>
                  </li>
                );
              })}
            </ol>
            {isActive && finished && (
              <p className={cx("line-in", s.finished)}>
                <LuCircleCheck aria-hidden className={s.finishedIcon} />
                Finished, with a person approving the key step.
              </p>
            )}
          </div>
        );
      })}
      <p role="status" className="sr-only">
        {announce}
      </p>
      <p className={s.note}>
        Illustrative example of an agent our team builds for clients, with a person approving key
        steps. Not live data.
      </p>
    </section>
  );
}
