import Image from "next/image";
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
  const about = getContent("about", locale);
  return buildMetadata({ locale, path: "about", title: about.meta.title, description: about.meta.description });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const about = getContent("about", locale);
  const common = getContent("common", locale);

  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            kicker={common.nav.about}
            title={about.title}
            lead={about.lead}
          />

          {/* DRAFT: pending Firm-approved copy */}
          <div className="mt-14 grid gap-12 md:grid-cols-[1fr_1fr]">
            <div>
              <h3 className="font-heading text-xl text-brand dark:text-ink">
                {about.history.title}
              </h3>
              <div className="mt-4 space-y-4 text-ink-muted">
                {about.history.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="border border-line p-8">
              <h3 className="font-heading text-xl text-brand dark:text-ink">
                {about.founder.title}
              </h3>
              <p className="mt-4 text-ink-muted">{about.founder.body}</p>
              <Link
                href={`/${locale}${about.founder.href}`}
                className="mt-5 inline-block font-mono text-sm uppercase tracking-[0.15em] text-gold-dark dark:text-gold hover:underline"
              >
                {about.founder.cta} →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-paper-raised">
        <Container>
          <div className="grid gap-px bg-line border border-line md:grid-cols-3">
            {about.values.map((value) => (
              <div key={value.title} className="bg-paper p-8">
                <span aria-hidden="true" className="block h-px w-8 bg-gold-dark dark:bg-gold mb-5" />
                <h3 className="font-heading text-lg text-brand dark:text-ink">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm text-ink-muted">{value.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {about.gallery.map((photo) => (
              <figure key={photo.image} className="border border-line">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
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
