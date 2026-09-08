import Image from "next/image";
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
  const common = getContent("common", locale);

  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            number={international.eyebrowNumber}
            title={international.title}
            lead={international.lead}
            articleWord={common.articleWord}
          />

          {/* DRAFT: pending Firm-approved copy */}
          <p className="mt-6 max-w-2xl text-ink-muted">{international.narrative}</p>

          <div className="mt-12 grid gap-px bg-line border border-line md:grid-cols-3">
            {international.recognitions.map((item) => (
              <div key={item.name} className="group bg-paper hover:bg-paper-raised transition-colors p-8">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-dark dark:text-gold">
                  {item.type}
                </p>
                <h3 className="mt-2 font-heading text-xl text-brand dark:text-ink">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm text-ink-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-paper-raised">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {international.gallery.map((photo) => (
              <figure key={photo.image} className="border border-line bg-paper">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-4 font-mono text-xs uppercase tracking-[0.1em] text-ink-muted">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
