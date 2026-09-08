export default function PersonCard({
  role,
  placeholderNote,
}: {
  role: string;
  placeholderNote: string;
}) {
  return (
    <div className="group border border-line p-6 flex flex-col gap-4 bg-paper transition-colors hover:border-gold">
      <div className="h-20 w-20 rounded-full border border-line bg-paper-raised flex items-center justify-center text-ink-muted transition-colors group-hover:border-gold-dark dark:group-hover:border-gold">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M4.5 20c1.5-4 4.5-6 7.5-6s6 2 7.5 6" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <p className="font-heading text-lg text-brand dark:text-ink">{role}</p>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-gold-dark dark:text-gold">
          {placeholderNote}
        </p>
      </div>
    </div>
  );
}
