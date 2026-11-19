"use server";
import { headers } from "next/headers";
import { submitApplication } from "@/lib/campus-hire/client";
import { site } from "@/lib/site";

export type ApplyState = {
  status: "idle" | "success" | "error";
  errors: Record<string, string>;
  values: Record<string, string>;
  message?: string;
};

const MAX_PDF = 5 * 1024 * 1024;
const text = (f: FormData, k: string) => String(f.get(k) ?? "").trim();

const API_ERRORS: Record<number, string> = {
  404: "This role is no longer open for applications.",
  409: "You have already applied for this role.",
  403: "We could not verify you are human. Please try again.",
  429: "Too many attempts. Please wait a few minutes and try again.",
  422: "Some details were not accepted. Check the fields and try again.",
};

export async function applyAction(_prev: ApplyState, form: FormData): Promise<ApplyState> {
  const slug = text(form, "slug");
  const values = {
    full_name: text(form, "full_name"),
    email: text(form, "email").toLowerCase(),
    phone: text(form, "phone"),
    linkedin_url: text(form, "linkedin_url"),
  };
  const errors: Record<string, string> = {};

  if (!/^[a-z0-9-]+$/.test(slug))
    return { status: "error", errors, values, message: API_ERRORS[404] };
  if (values.full_name.length < 1 || values.full_name.length > 120)
    errors.full_name = "Enter your full name (up to 120 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Enter a valid email address.";
  if (values.phone.length > 20) errors.phone = "Phone number must be 20 characters or fewer.";
  if (values.linkedin_url && !/^https:\/\/\S+$/.test(values.linkedin_url))
    errors.linkedin_url = "Enter a link starting with https://";

  const resume = form.get("resume");
  if (!(resume instanceof File) || resume.size === 0)
    errors.resume = "Attach your resume as a PDF.";
  else if (resume.size > MAX_PDF) errors.resume = "The PDF must be 5 MB or smaller.";
  else if (Buffer.from(await resume.slice(0, 5).arrayBuffer()).toString("latin1") !== "%PDF-")
    errors.resume = "The file must be a PDF.";

  if (form.get("consent") !== "on")
    errors.consent = "Tick the box to consent to us processing your application.";
  const token = text(form, "cf-turnstile-response");
  if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !token)
    errors.turnstile = "Complete the verification check.";

  if (Object.keys(errors).length) return { status: "error", errors, values };

  const out = new FormData();
  out.set("full_name", values.full_name);
  out.set("email", values.email);
  if (values.phone) out.set("phone", values.phone);
  if (values.linkedin_url) out.set("linkedin_url", values.linkedin_url);
  out.set("resume", resume as File);
  out.set("consent", "true");
  out.set("consent_version", site.consentVersion);
  out.set("turnstile_token", token);

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() ?? "";
  const res = await submitApplication(slug, out, ip);
  if (res.ok) return { status: "success", errors: {}, values: {} };
  return {
    status: "error",
    errors: {},
    values,
    message: `${API_ERRORS[res.status] ?? "We could not submit your application."} If this keeps happening, email your resume to ${site.email}.`,
  };
}
