// Small pause / play / replay glyphs for the motion toggles (WCAG 2.2.2). Decorative: the button carries the label.
export function MediaIcon({ kind }: { kind: "pause" | "play" | "replay" }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="currentColor">
      {kind === "pause" && (
        <>
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </>
      )}
      {kind === "play" && (
        <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
      )}
      {kind === "replay" && <path d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7Z" />}
    </svg>
  );
}
