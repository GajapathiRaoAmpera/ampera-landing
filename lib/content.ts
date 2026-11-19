import { readFileSync } from "node:fs";
import { join } from "node:path";

export type Page = { path: string; title: string; description: string; body: string };

const dir = join(process.cwd(), "content");
export const paths: string[] = JSON.parse(readFileSync(join(dir, "paths.json"), "utf8"));

export function getPage(path: string): Page | null {
  if (!paths.includes(path)) return null;
  return JSON.parse(
    readFileSync(join(dir, "pages", `${path.slice(1).replace(/\//g, "__")}.json`), "utf8"),
  );
}
