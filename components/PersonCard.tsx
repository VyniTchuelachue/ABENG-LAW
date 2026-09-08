import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM.24 8.25h4.5V23h-4.5V8.25zM8.5 8.25h4.31v2.01h.06c.6-1.13 2.07-2.33 4.26-2.33 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V23H8.5V8.25z" />
    </svg>
  );
}

function PersonIconPlaceholder() {
  return (
    <div className="h-20 w-20 rounded-full border border-line bg-paper-raised flex items-center justify-center text-ink-muted transition-colors">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4.5 20c1.5-4 4.5-6 7.5-6s6 2 7.5 6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function PersonCard({
  locale,
  slug,
  name,
  role,
  image,
  imageAlt,
  linkedinUrl,
  linkedinAria,
  practiceAreaTags,
  pendingNote,
}: {
  locale: Locale;
  slug: string | null;
  name: string | null;
  role: string;
  image?: string | null;
  imageAlt?: string | null;
  linkedinUrl?: string | null;
  linkedinAria: string;
  practiceAreaTags?: string[];
  pendingNote: string;
}) {
  const href = slug ? `/${locale}/people/${slug}` : null;

  return (
    <div
      className={`group relative border border-line p-6 flex flex-col gap-4 bg-paper transition-colors ${
        href ? "hover:border-gold" : ""
      }`}
    >
      {href ? (
        <Link
          href={href}
          className="absolute inset-0 z-0"
          aria-label={name ? `${name} — ${role}` : role}
        />
      ) : null}

      <div className="relative pointer-events-none flex flex-col gap-4">
        {image ? (
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-line transition-colors group-hover:border-gold-dark dark:group-hover:border-gold">
            <Image src={image} alt={imageAlt ?? name ?? role} fill sizes="80px" className="object-cover" />
          </div>
        ) : (
          <PersonIconPlaceholder />
        )}

        <div>
          <p className="font-heading text-lg text-brand dark:text-ink">{name ?? role}</p>
          {name ? (
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-gold-dark dark:text-gold">
              {role}
            </p>
          ) : (
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-gold-dark dark:text-gold">
              {pendingNote}
            </p>
          )}

          {practiceAreaTags && practiceAreaTags.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {practiceAreaTags.map((tag) => (
                <li
                  key={tag}
                  className="border border-line px-2 py-1 text-[11px] text-ink-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {linkedinUrl ? (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={linkedinAria}
          className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-muted hover:border-gold-dark hover:text-gold-dark dark:hover:border-gold dark:hover:text-gold transition-colors"
        >
          <LinkedInIcon />
        </a>
      ) : null}
    </div>
  );
}
