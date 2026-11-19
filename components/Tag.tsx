export function Tag({ children, mono }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <li
      className={`rounded-pill border border-navy px-3 py-1 text-sm text-navy ${mono ? "font-mono" : ""}`}
    >
      {children}
    </li>
  );
}
