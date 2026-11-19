import Markdown from "react-markdown";
import s from "./Prose.module.scss";

// Migrated content is plain markdown; styled with brand tokens, body text stays weight 400.
export function Prose({ children }: { children: string }) {
  return (
    <div className={s.prose}>
      <Markdown>{children}</Markdown>
    </div>
  );
}
