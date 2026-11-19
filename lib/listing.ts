import { getPage, paths } from "./content";

export type Item = { path: string; title: string; summary: string };

// Build cards from the real child pages (the migrated index pages lost most of their cards).
export function list(prefix: string): Item[] {
  return paths
    .filter((p) => p.startsWith(prefix + "/"))
    .map((p) => getPage(p)!)
    .map((pg) => {
      const paras = pg.body.split("\n\n");
      const scope = paras.indexOf("Scope");
      const summary =
        prefix === "/projects" && scope >= 0
          ? paras[scope + 1]
          : prefix === "/blogs"
            ? pg.description
            : (
                paras.find((l, i) => i > 0 && !/^[#-]/.test(l) && l.length > 60) ?? pg.description
              ).replace(/^#+ /, "");
      return { path: pg.path, title: pg.body.match(/^# (.*)/m)?.[1] ?? pg.title, summary };
    });
}
