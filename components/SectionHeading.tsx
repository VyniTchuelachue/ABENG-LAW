/**
 * The primary heading for a page section: an optional short kicker label,
 * the heading itself (rendered as the page's H1 when it opens the page),
 * and an optional lead paragraph.
 */
export default function SectionHeading({
  title,
  lead,
  kicker,
  align = "left",
}: {
  title: string;
  lead?: string;
  kicker?: string;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {kicker ? (
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold-dark dark:text-gold">
          {kicker}
        </p>
      ) : null}
      <h1 className="mt-3 font-heading text-3xl md:text-4xl font-medium text-brand dark:text-ink">
        {title}
      </h1>
      {lead ? (
        <p className="mt-4 text-base md:text-lg text-ink-muted">{lead}</p>
      ) : null}
    </div>
  );
}
