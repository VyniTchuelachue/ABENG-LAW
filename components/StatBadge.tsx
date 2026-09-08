/**
 * The floating numeral badge that overlaps a photo's corner — used in the
 * hero and "The Firm" section for an editorial, layered composition.
 * Burgundy background with a gold numeral, echoing the crest's palette
 * without competing with the gold CTA buttons nearby.
 */
export default function StatBadge({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`bg-maroon px-6 py-5 max-w-[11rem] ${className}`}>
      <p className="font-mono text-3xl md:text-4xl font-medium text-gold-light leading-none">
        {value}
      </p>
      <p className="mt-2 text-[11px] uppercase tracking-wide text-cream/85 leading-snug">
        {label}
      </p>
    </div>
  );
}
