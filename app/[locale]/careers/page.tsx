import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const careers = getContent("careers", locale);
  return buildMetadata({
    locale,
    path: "careers",
    title: careers.meta.title,
    description: careers.meta.description,
  });
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const careers = getContent("careers", locale);
  const common = getContent("common", locale);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          kicker={common.nav.careers}
          title={careers.title}
          lead={careers.lead}
        />

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="font-heading text-xl text-brand dark:text-ink">
              {careers.why.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {careers.why.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-ink-muted">
                  <span className="font-mono text-gold-dark dark:text-gold shrink-0">—</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-line p-8">
            <h3 className="font-heading text-xl text-brand dark:text-ink">
              {careers.openPositions.title}
            </h3>

            <div className="mt-5 space-y-4">
              {careers.openPositions.items.map((item) => (
                <div key={item.title} className="border border-line p-4">
                  <p className="font-medium text-ink">{item.title}</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-gold-dark dark:text-gold">
                    {item.type}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm text-ink-muted">{careers.openPositions.emptyState}</p>

            <div className="mt-6 pt-6 border-t border-line">
              <p className="font-heading text-base text-brand dark:text-ink">
                {careers.application.title}
              </p>
              <p className="mt-2 text-sm text-ink-muted">{careers.application.body}</p>
              <Link
                href={`/${locale}/contact`}
                className="mt-4 inline-block font-mono text-sm uppercase tracking-[0.15em] text-gold-dark dark:text-gold hover:underline"
              >
                {common.nav.contact} →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
