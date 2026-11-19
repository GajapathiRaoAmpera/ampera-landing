import Markdown from "react-markdown";

// Migrated content is plain markdown; styled here with brand tokens, body text stays weight 400.
export function Prose({ children }: { children: string }) {
  return (
    <Markdown
      components={{
        h1: (p) => <h1 className="text-4xl font-light text-purple sm:text-5xl" {...p} />,
        h2: (p) => <h2 className="mt-12 text-3xl font-normal text-purple" {...p} />,
        h3: (p) => <h3 className="mt-8 text-2xl font-medium" {...p} />,
        h4: (p) => <h4 className="mt-6 text-lg font-medium text-navy" {...p} />,
        h5: (p) => <h5 className="mt-4 font-medium" {...p} />,
        p: (p) => <p className="mt-4 max-w-3xl text-lg leading-relaxed" {...p} />,
        ul: (p) => <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-6 text-lg" {...p} />,
        a: (p) => <a className="text-purple underline" {...p} />,
      }}
    >
      {children}
    </Markdown>
  );
}
