import "server-only";
import { createSign } from "node:crypto";
import { site } from "./site";

const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");

// Pings the Google Indexing API. No-op when GOOGLE_INDEXING_SA_JSON is unset. Never throws.
export async function pingIndexing(
  path: string,
  type: "URL_UPDATED" | "URL_DELETED",
): Promise<string> {
  const raw = process.env.GOOGLE_INDEXING_SA_JSON;
  if (!raw) return "skipped";
  try {
    const sa = JSON.parse(raw) as { client_email: string; private_key: string };
    const now = Math.floor(Date.now() / 1000);
    const claim = b64({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/indexing",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    });
    const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${claim}`;
    const jwt = `${unsigned}.${createSign("RSA-SHA256").update(unsigned).sign(sa.private_key, "base64url")}`;
    const tok = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    });
    if (!tok.ok) return "failed";
    const { access_token } = await tok.json();
    const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
      method: "POST",
      headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ url: site.url + path, type }),
    });
    return res.ok ? "ok" : "failed";
  } catch {
    return "failed";
  }
}
