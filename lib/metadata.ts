import type { Metadata } from "next";
import type { Locale } from "./i18n";

/**
 * Builds page metadata including hreflang alternates that point at the exact
 * counterpart of this page in the other locale (same slug, different
 * `/en/` or `/fr/` prefix), not just the other homepage.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const normalizedPath = path === "" ? "" : `/${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${normalizedPath}`,
      languages: {
        en: `/en${normalizedPath}`,
        fr: `/fr${normalizedPath}`,
      },
    },
  };
}
