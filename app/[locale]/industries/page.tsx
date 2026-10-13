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
  const industries = getContent("industries", locale);
  return buildMetadata({
    locale,
    path: "industries",
    title: industries.meta.title,
    description: industries.meta.description,
  });
}

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const industries = getContent("industries", locale);

  return (
    <>
      <PageHero title={industries.title} lead={industries.lead} />
      <section className="py-16 md:py-24">
        <Container>
          {/* DRAFT: pending Firm-approved copy (industry descriptions) */}
          <FeatureGrid items={industries.items} columns={3} />
        </Container>
      </section>
      <ContactBand locale={locale} />
    </>
  );
}
