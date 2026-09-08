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
  const experience = getContent("experience", locale);
  return buildMetadata({
    locale,
    path: "experience",
    title: experience.meta.title,
    description: experience.meta.description,
  });
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const experience = getContent("experience", locale);
  const common = getContent("common", locale);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          kicker={common.nav.experience}
          title={experience.title}
          lead={experience.lead}
        />

        <div className="mt-14 grid gap-px bg-line border border-line md:grid-cols-2">
          {experience.items.map((item) => (
            <div key={item.title} className="group bg-paper hover:bg-paper-raised transition-colors p-7">
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-xs uppercase tracking-wide text-gold-dark dark:text-gold">
                  {item.sector}
                </p>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted border border-line px-2 py-1">
                  {experience.placeholderBadge}
                </span>
              </div>
              <h3 className="mt-3 font-heading text-lg text-brand dark:text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-ink-muted">{item.summary}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
