import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import ContactBand from "@/components/ContactBand";
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
  const expertise = getContent("expertise", locale);
  return buildMetadata({
    locale,
    path: "expertise",
    title: expertise.meta.title,
    description: expertise.meta.description,
  });
}

export default async function ExpertisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const expertise = getContent("expertise", locale);

  return (
    <>
      <PageHero title={expertise.title} lead={expertise.lead} />
      <section className="py-16 md:py-24">
        <Container>
          {/* DRAFT: pending Firm-approved copy (practice area descriptions) */}
          <FeatureGrid items={expertise.items} columns={4} />
        </Container>
      </section>
      <ContactBand locale={locale} />
    </>
  );
}
