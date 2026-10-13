import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icons";
import ContactBand from "@/components/ContactBand";
import { Eyebrow } from "@/components/ui";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const recognitionIcons: Record<string, string> = {
  "Chambers Global": "award",
  TagLaw: "network",
  TRACE: "regulatory-competition",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const international = getContent("international", locale);
  return buildMetadata({
    locale,
    path: "international",
    title: international.meta.title,
    description: international.meta.description,
  });
}

export default async function InternationalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const international = getContent("international", locale);

  return (
    <>
      <PageHero title={international.title} lead={international.lead} />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* DRAFT: pending Firm-approved copy */}
            <p className="font-heading text-2xl font-medium leading-snug text-brand dark:text-ink">
              {international.narrative}
            </p>

            <ul className="border-t border-line">
              {international.recognitions.map((item) => (
                <li key={item.name} className="flex gap-5 border-b border-line py-6">
                  <Icon
                    name={recognitionIcons[item.name] ?? "global"}
                    className="mt-1 h-8 w-8 shrink-0 text-gold-dark dark:text-gold"
                  />
                  <div>
                    <Eyebrow>{item.type}</Eyebrow>
                    <h2 className="mt-1 font-heading text-xl font-semibold text-brand dark:text-ink">
                      {item.name}
                    </h2>
                    <p className="mt-2 text-sm text-ink-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-ink-black py-16 md:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {international.gallery.map((photo) => (
              <figure key={photo.image} className="relative aspect-[4/3] border border-gold/20">
                <Image
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover photo-grade"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-black/90 to-transparent px-5 pb-4 pt-12 text-sm text-cream">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <ContactBand locale={locale} />
    </>
  );
}
