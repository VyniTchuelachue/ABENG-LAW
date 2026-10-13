import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import ContactBand from "@/components/ContactBand";
import { ArrowLink } from "@/components/ui";
import { getContent, getTeamMembers, isPendingPlaceholder } from "@/lib/content";
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
  const founder = getTeamMembers(locale).find((member) => member.group === "partners");

  return (
    <>
      <PageHero title={about.title} lead={about.lead} />

      <section className="py-16 md:py-24">
        <Container>
          {/* DRAFT: pending Firm-approved copy */}
          <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-brand dark:text-ink">
                {about.history.title}
              </h2>
              <div className="mt-6 space-y-4 text-ink-muted">
                {about.history.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <aside className="bg-ink-black p-8 md:p-10">
              {founder?.image ? (
                <div className="relative h-24 w-24 overflow-hidden rounded-full border border-gold/50">
                  <Image
                    src={founder.image}
                    alt={founder.imageAlt ?? about.founder.title}
                    fill
                    sizes="96px"
                    className="object-cover object-top"
                  />
                </div>
              ) : null}
              <h2 className="mt-6 font-heading text-xl font-semibold text-cream">{about.founder.title}</h2>
              <p className="mt-3 text-cream-muted">{about.founder.body}</p>
              <div className="mt-6">
                <ArrowLink href={`/${locale}${about.founder.href}`} onDark>
                  {about.founder.cta}
                </ArrowLink>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-paper-raised py-16 md:py-20">
        <Container>
          <ul className="grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
            {about.values.map((value) => (
              <li key={value.title} className="md:px-10 md:first:pl-0 md:last:pr-0">
                <span aria-hidden="true" className="block h-0.5 w-10 bg-gold-dark dark:bg-gold" />
                <h2 className="mt-5 font-heading text-xl font-semibold text-brand dark:text-ink">
                  {value.title}
                </h2>
                <p className="mt-3 text-sm text-ink-muted">{value.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* One landscape and one portrait photograph, cropped from the top so
          faces are never cut off. Captions the Firm has not confirmed yet
          (bracketed in the content file) are not shown. */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-[1.55fr_1fr]">
            {about.gallery.map((photo, index) => (
              <figure key={photo.image}>
                <div
                  className={`relative bg-ink-black md:aspect-auto md:h-[460px] ${
                    index === 0 ? "aspect-[3/2]" : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover object-top photo-grade"
                  />
                </div>
                {isPendingPlaceholder(photo.caption) ? null : (
                  <figcaption className="mt-3 text-sm text-ink-muted">{photo.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <ContactBand locale={locale} />
    </>
  );
}
