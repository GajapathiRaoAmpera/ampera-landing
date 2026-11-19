import { LuLayers, LuMessagesSquare, LuShieldCheck, LuSparkles, LuTarget } from "react-icons/lu";
import { Reveal } from "@/components/Reveal";

const icons = [LuSparkles, LuTarget, LuMessagesSquare, LuLayers, LuShieldCheck];

// Delivery principles as static cards: all text visible, motion is only a one-time reveal + hover.
export function Principles({ items }: { items: [string, string][] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map(([title, body], i) => {
        const Icon = icons[i % icons.length];
        return (
          <li key={title}>
            <Reveal delay={i * 0.08} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-black/10 bg-ivory p-5 transition duration-300 hover:border-purple/40 hover:shadow-lg hover:shadow-purple/10 motion-safe:hover:-translate-y-1">
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-1 w-10 bg-purple transition-all duration-500 group-hover:w-full"
                />
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-purple/10 text-purple transition-colors duration-300 group-hover:bg-purple group-hover:text-white">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span aria-hidden className="font-mono text-sm text-zinc-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">{body}</p>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
