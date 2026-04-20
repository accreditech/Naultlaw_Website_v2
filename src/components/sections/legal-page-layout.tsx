type LegalPageLayoutProps = {
  title: string;
  summary?: string;
  paragraphs: readonly string[];
};

export function LegalPageLayout({ title, summary, paragraphs }: LegalPageLayoutProps) {
  return (
    <>
      <section className="section-padding bg-muted/30 border-b border-border">
        <div className="container-shell max-w-3xl">
          <p className="eyebrow text-muted-foreground">Legal</p>
          <h1 className="mt-3 font-heading text-4xl tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          {summary && (
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              {summary}
            </p>
          )}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-shell max-w-3xl">
          <div className="editorial-stack">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-8 text-foreground">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
