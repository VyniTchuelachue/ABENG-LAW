"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

/**
 * Compact "EN | FR" toggle: both codes are always shown, the active one
 * emphasized. Each option swaps only the leading `/en` or `/fr` segment, so
 * it always links to the exact counterpart of the current page — never just
 * the other homepage.
 */
export default function LocaleToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div className="flex items-center gap-1.5 font-mono text-xs tracking-wide" aria-label="Language">
      {locales.map((code, index) => {
        const href = rest ? `/${code}/${rest}` : `/${code}`;
        const isActive = code === locale;
        return (
          <span key={code} className="flex items-center gap-1.5">
            {index > 0 ? <span className="text-line" aria-hidden="true">|</span> : null}
            {isActive ? (
              <span aria-current="true" className="uppercase text-gold-dark dark:text-gold">
                {code}
              </span>
            ) : (
              <Link
                href={href}
                hrefLang={code}
                className="uppercase text-ink-muted hover:text-gold-dark dark:hover:text-gold transition-colors"
                aria-label={code === "en" ? "Switch to English" : "Passer en français"}
              >
                {code}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
