import Icon from "./Icons";

/**
 * A ruled grid of icon cards, used for practice areas and industries.
 * Each card carries its slug as an id so other pages can link straight to
 * it (`/expertise#tax-customs`); the linked card is tinted on arrival.
 *
 * Pick `columns` so the item count divides evenly at desktop width —
 * a ruled grid shows any empty last cell.
 */
export default function FeatureGrid({
  items,
  columns,
}: {
  items: { slug: string; title: string; description: string }[];
  columns: 3 | 4;
}) {
  const desktopColumns = columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <ul className={`grid gap-px border border-line bg-line sm:grid-cols-2 ${desktopColumns}`}>
      {items.map((item) => (
        <li
          key={item.slug}
          id={item.slug}
          className="scroll-mt-32 bg-paper p-7 transition-colors hover:bg-paper-raised target:bg-paper-raised"
        >
          <Icon name={item.slug} className="h-8 w-8 text-gold-dark dark:text-gold" />
          <h2 className="mt-5 font-heading text-lg font-semibold leading-snug text-brand dark:text-ink">
            {item.title}
          </h2>
          <p className="mt-3 text-sm text-ink-muted">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
