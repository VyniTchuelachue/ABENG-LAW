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
  const common = getContent("common", locale);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          number={expertise.eyebrowNumber}
          title={expertise.title}
          lead={expertise.lead}
          articleWord={common.articleWord}
        />

        {/* DRAFT: pending Firm-approved copy (practice area descriptions) */}
        <div className="mt-14 grid gap-px bg-line border border-line sm:grid-cols-2 lg:grid-cols-3">
          {expertise.items.map((item, index) => (
            <div key={item.slug} className="group bg-paper hover:bg-paper-raised transition-colors p-7">
              <p className="font-mono text-xs text-gold-dark dark:text-gold">
                {common.articleWord} {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-heading text-lg text-brand dark:text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-ink-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
