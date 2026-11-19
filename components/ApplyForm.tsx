"use client";
import Link from "next/link";
import Script from "next/script";
import { useActionState, useEffect, useRef } from "react";
import { applyAction, type ApplyState } from "@/app/careers/[slug]/actions";
import { cx } from "@/lib/cx";
import b from "./Button.module.scss";
import s from "./ApplyForm.module.scss";

const initial: ApplyState = { status: "idle", errors: {}, values: {} };
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type TurnstileWindow = Window & { turnstile?: { reset: () => void } };

export function ApplyForm({ slug, email }: { slug: string; email: string }) {
  const [state, action, pending] = useActionState(applyAction, initial);
  const summary = useRef<HTMLDivElement>(null);
  const done = useRef<HTMLHeadingElement>(null);
  const errs = Object.entries(state.errors);

  useEffect(() => {
    if (state.status === "error") {
      summary.current?.focus();
      (window as TurnstileWindow).turnstile?.reset(); // tokens are single-use
    }
    if (state.status === "success") done.current?.focus();
  }, [state]);

  if (state.status === "success")
    return (
      <div className={s.success}>
        <h2 ref={done} tabIndex={-1} className={s.successTitle}>
          Application received
        </h2>
        <p className={s.successBody}>Thank you. We have sent a confirmation to your email address.</p>
      </div>
    );

  const field = (
    name: string,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
    hint?: string,
  ) => (
    <div>
      <label htmlFor={name} className={s.label}>
        {label}
      </label>
      {hint && (
        <p id={`${name}-hint`} className={s.hint}>
          {hint}
        </p>
      )}
      <input
        id={name}
        name={name}
        defaultValue={state.values[name]}
        aria-invalid={!!state.errors[name]}
        aria-describedby={
          [state.errors[name] && `${name}-err`, hint && `${name}-hint`].filter(Boolean).join(" ") ||
          undefined
        }
        className={s.input}
        {...props}
      />
      {state.errors[name] && (
        <p id={`${name}-err`} className={s.error}>
          {state.errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form action={action} className={s.form} noValidate>
      <input type="hidden" name="slug" value={slug} />
      <div ref={summary} tabIndex={-1} role={errs.length || state.message ? "alert" : undefined}>
        {(errs.length > 0 || state.message) && (
          <div className={s.summary}>
            <h2 className={s.summaryTitle}>There is a problem</h2>
            {state.message && <p>{state.message}</p>}
            <ul className={s.summaryList}>
              {errs.map(([k, m]) => (
                <li key={k}>
                  <a className={s.underline} href={`#${k === "turnstile" ? "turnstile" : k}`}>
                    {m}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {field("full_name", "Full name", { required: true, maxLength: 120, autoComplete: "name" })}
      {field("email", "Email", { type: "email", required: true, autoComplete: "email" })}
      {field("phone", "Phone (optional)", { type: "tel", maxLength: 20, autoComplete: "tel" })}
      {field(
        "linkedin_url",
        "LinkedIn profile (optional)",
        { type: "url", autoComplete: "url" },
        "Starts with https://",
      )}
      {field(
        "resume",
        "Resume (PDF, up to 5 MB)",
        { type: "file", accept: "application/pdf", required: true, defaultValue: undefined },
        "Attach the file again if you resubmit.",
      )}

      <div>
        <label className={s.consent}>
          <input
            type="checkbox"
            name="consent"
            id="consent"
            aria-invalid={!!state.errors.consent}
            aria-describedby={state.errors.consent ? "consent-err" : undefined}
            className={s.checkbox}
          />
          <span>
            I consent to Ampera Technologies processing my application data, as described in the{" "}
            <Link href="/privacy" className={s.link}>
              privacy notice
            </Link>
            .
          </span>
        </label>
        {state.errors.consent && (
          <p id="consent-err" className={s.error}>
            {state.errors.consent}
          </p>
        )}
      </div>

      {siteKey && (
        <div id="turnstile">
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
          <div className="cf-turnstile" data-sitekey={siteKey} />
          {state.errors.turnstile && <p className={s.error}>{state.errors.turnstile}</p>}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className={cx(b.button, b.primary, s.submit)}
      >
        {pending ? "Sending…" : "Submit application"}
      </button>
      <p className={s.hint}>
        Having trouble uploading? Email your resume to{" "}
        <a className={s.underline} href={`mailto:${email}`}>
          {email}
        </a>
        .
      </p>
    </form>
  );
}
