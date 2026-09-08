/**
 * The "Art. 01 / Art. 02…" numbering device used on every section header — a
 * nod to OHADA Uniform Act / civil-code article numbering.
 */
export default function SectionHeading({
  number,
  title,
  lead,
  articleWord = "Art.",
  align = "left",
}: {
  number: number;
  title: string;
  lead?: string;
  articleWord?: string;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const ruleClass = align === "center" ? "mx-auto" : "";
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <span aria-hidden="true" className={`h-px w-8 bg-gold-dark dark:bg-gold ${ruleClass}`} />
        <p className="font-mono text-sm tracking-[0.2em] uppercase text-gold-dark dark:text-gold">
          {articleWord} {String(number).padStart(2, "0")}
        </p>
      </div>
      <h2 className="mt-4 font-heading text-3xl md:text-4xl font-medium text-brand dark:text-ink">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 text-base md:text-lg text-ink-muted">{lead}</p>
      ) : null}
    </div>
  );
}
