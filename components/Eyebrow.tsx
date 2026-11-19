export function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-2 text-sm font-medium uppercase tracking-[0.3em] ${dark ? "text-white" : "text-navy"}`}
    >
      <span aria-hidden className="size-2 rounded-full bg-purple" />
      {children}
    </p>
  );
}
