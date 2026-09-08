"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { otherLocale, type Locale } from "@/lib/i18n";

/**
 * Swaps only the leading `/en` or `/fr` segment, so it always links to the
 * exact counterpart of the current page in the other locale — never just
 * the other homepage.
 */
export default function LanguageSwitcher({
  locale,
  switchToLabel,
}: {
  locale: Locale;
  switchToLabel: string;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const target = otherLocale(locale);
  const rest = pathname.split("/").slice(2).join("/");
  const href = rest ? `/${target}/${rest}` : `/${target}`;

  return (
    <Link
      href={href}
      hrefLang={target}
      className="font-mono text-xs md:text-sm uppercase tracking-[0.15em] text-ink-muted hover:text-gold-dark dark:hover:text-gold transition-colors"
    >
      {switchToLabel}
    </Link>
  );
}
