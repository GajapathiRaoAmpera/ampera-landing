import Markdown from "react-markdown";
import s from "./Prose.module.scss";

type MdNode = { type: string; depth?: number; data?: Record<string, unknown>; children?: MdNode[] };

// Migrated content uses headings for looks (#### as eyebrows), which skips levels. Renumber so
// levels never skip (screen-reader outline, axe heading-order) and keep the original look as a class.
// `after`: the heading level already on the page above this block (0 = none).
const headingOrder = (after: number) => () => (tree: MdNode) => {
  let prev = after;
  for (const node of tree.children ?? []) {
    if (node.type !== "heading" || !node.depth) continue;
    const look = node.depth;
    node.depth = Math.min(look, prev + 1);
    prev = node.depth;
    node.data = { ...node.data, hProperties: { className: `look-${look}` } };
  }
};

// Migrated content is plain markdown; styled with brand tokens, body text stays weight 400.
export function Prose({ children, after = 0 }: { children: string; after?: number }) {
  return (
    <div className={s.prose}>
      <Markdown remarkPlugins={[headingOrder(after)]}>{children}</Markdown>
    </div>
  );
}
