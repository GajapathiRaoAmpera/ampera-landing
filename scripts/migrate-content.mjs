// One-off: split ampera-content-backup.md into content/pages/*.json. Re-runnable; backup stays the source of truth.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";

const raw = readFileSync("ampera-content-backup.md", "utf8");
const BUTTONS =
  /^(learn more|read more|know more|submit|get in touch|download case study|elevate now|get started|build with genai|start automation)$/i;
const GENERIC = /^Advanced AI Data Intelligence \| Amperatech$/;
const clean = (s) =>
  s
    .replace(/\s*\|\s*\w*tech(\.ai)?\s*$/i, "")
    .replace(/Cloud\/Data Engineering/g, "Cloud / Data Engineering")
    .trim();

rmSync("content/pages", { recursive: true, force: true });
mkdirSync("content/pages", { recursive: true });

const pages = raw.split(/^=====PAGE /m).slice(1);
const index = [];
for (const chunk of pages) {
  const [pathLine, ...rest] = chunk.split("\n");
  const path = pathLine.trim();
  if (path === "/") continue; // homepage is hand-built
  let title = "",
    description = "";
  const lines = [];
  for (const l of rest) {
    if (l.startsWith("TITLE: ")) title = l.slice(7).trim();
    else if (l.startsWith("DESCRIPTION: ")) description = l.slice(13).trim();
    else lines.push(l);
  }
  const out = [];
  let seenH1 = false;
  for (let l of lines) {
    l = l.replace(/<\/?[a-z][^>]*>?/gi, "").trimEnd(); // stray "</li" fragments
    if (!l.trim() || /^\[image:/.test(l) || /^- Next project/i.test(l) || BUTTONS.test(l.trim()))
      continue;
    l = l.replace(/Cloud\/Data Engineering/g, "Cloud / Data Engineering");
    if (/^#{1,6} (WHAT WE OFFER|AI Accelerators|Leadership team)$/i.test(l)) continue; // eyebrow labels
    if (path.startsWith("/sub-accelerators/") && !seenH1 && /^#{1,6} (Market Intelligence|AI Powered Digital Accessibility)$/.test(l)) continue; // category eyebrow
    l = l.replace(/^- (\d)(?=[A-Z])/, "- $1. ");
    const h = l.match(/^(#{1,6}) (.*)/);
    if (h) {
      // exactly one h1: first heading becomes h1, later ones sit below it
      l = !seenH1 ? `# ${h[2]}` : `${"#".repeat(Math.max(2, h[1].length))} ${h[2]}`;
      seenH1 = true;
    }
    out.push(l);
  }
  // blank line between plain lines so each becomes its own paragraph; list items stay tight
  let body = "";
  out.forEach((l, i) => {
    const isList = /^- /.test(l),
      prevList = i > 0 && /^- /.test(out[i - 1]);
    body += (i === 0 ? "" : isList && prevList ? "\n" : "\n\n") + l;
  });
  const h1 = (body.match(/^# (.*)/m) ?? [, path])[1];
  title = GENERIC.test(title) || !title ? h1 : clean(title);
  if (GENERIC.test(description) || !description) {
    const p = out.find((l) => !/^[#-]/.test(l) && l.length > 60) ?? h1;
    description = p.length > 155 ? p.slice(0, 152).replace(/\s+\S*$/, "") + "…" : p;
  }
  const file = path.slice(1).replace(/\//g, "__");
  writeFileSync(
    `content/pages/${file}.json`,
    JSON.stringify({ path, title, description, body }, null, 1),
  );
  index.push(path);
}
writeFileSync("content/paths.json", JSON.stringify(index, null, 1));
console.log(index.length, "pages");
