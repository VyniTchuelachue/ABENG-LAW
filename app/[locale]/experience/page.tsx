import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import ContactBand from "@/components/ContactBand";
import { Eyebrow, Tag } from "@/components/ui";
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

  return (
    <>
      <PageHero title={experience.title} lead={experience.lead} />
      <section className="py-16 md:py-24">
        <Container>
          <ul className="border-t border-line">
            {experience.items.map((item) => (
              <li
                key={item.title}
                className="grid gap-4 border-b border-line py-8 md:grid-cols-[14rem_1fr_auto] md:items-start md:gap-10"
              >
                <Eyebrow className="md:pt-1.5">{item.sector}</Eyebrow>
                <div>
                  <h2 className="font-heading text-xl font-semibold text-brand dark:text-ink">{item.title}</h2>
                  <p className="mt-2 max-w-2xl text-ink-muted">{item.summary}</p>
                </div>
                <Tag>{experience.placeholderBadge}</Tag>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <ContactBand locale={locale} />
    </>
  );
}
