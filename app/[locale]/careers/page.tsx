import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icons";
import { ButtonLink } from "@/components/ui";
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
    <>
      <PageHero title={careers.title} lead={careers.lead} />
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-brand dark:text-ink">
                {careers.why.title}
              </h2>
              <ul className="mt-6 space-y-5">
                {careers.why.points.map((point) => (
                  <li key={point} className="flex gap-4">
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold-dark/50 text-gold-dark dark:border-gold/50 dark:text-gold">
                      <Icon name="check" className="h-4 w-4" />
                    </span>
                    <span className="text-ink-muted">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-line bg-paper-raised p-8 md:p-10">
              <h2 className="font-heading text-2xl font-semibold text-brand dark:text-ink">
                {careers.openPositions.title}
              </h2>

              <ul className="mt-6 space-y-3">
                {careers.openPositions.items.map((item) => (
                  <li key={item.title} className="border border-line bg-paper p-5">
                    <p className="font-medium text-ink">{item.title}</p>
                    <p className="mt-1 text-xs text-ink-muted">{item.type}</p>
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-sm text-ink-muted">{careers.openPositions.emptyState}</p>

              <div className="mt-8 border-t border-line pt-8">
                <h3 className="font-heading text-lg font-semibold text-brand dark:text-ink">
                  {careers.application.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">{careers.application.body}</p>
                <ButtonLink href={`/${locale}/contact`} variant="outline" className="mt-6">
                  {common.nav.contact}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
