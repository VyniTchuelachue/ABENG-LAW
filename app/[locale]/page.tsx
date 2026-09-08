import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
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
  const home = getContent("home", locale);
  return buildMetadata({ locale, path: "", title: home.meta.title, description: home.meta.description });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const home = getContent("home", locale);
  const common = getContent("common", locale);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-dark">
        <Image
          src="/images/law-library-generic.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.22] mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark/95 to-brand/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
        <Container className="relative py-24 md:py-32">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-gold-light">
            {home.hero.kicker}
          </p>
          <h1 className="mt-6 max-w-3xl font-heading text-4xl md:text-6xl font-medium text-cream leading-[1.08]">
            {home.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-cream-muted">
            {home.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={`/${locale}${home.hero.ctaPrimaryHref}`}
              className="inline-flex items-center justify-center bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-brand-dark hover:bg-gold-light transition-colors"
            >
              {home.hero.ctaPrimary}
            </Link>
            <Link
              href={`/${locale}${home.hero.ctaSecondaryHref}`}
              className="inline-flex items-center justify-center border border-cream/30 px-7 py-3.5 text-sm font-medium tracking-wide text-cream hover:border-gold hover:text-gold-light transition-colors"
            >
              {home.hero.ctaSecondary}
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper-raised">
        <Container className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {home.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-mono text-3xl md:text-4xl text-brand dark:text-gold">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          {/* DRAFT: pending Firm-approved copy */}
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl md:text-3xl text-brand dark:text-ink">
              {home.intro.title}
            </h2>
            <p className="mt-4 text-base md:text-lg text-ink-muted">{home.intro.body}</p>
          </div>

          <div className="mt-14 grid gap-px bg-line md:grid-cols-3 border border-line">
            {home.pillars.map((pillar) => (
              <Link
                key={pillar.title}
                href={`/${locale}${pillar.href}`}
                className="group bg-paper p-8 hover:bg-paper-raised transition-colors"
              >
                <span aria-hidden="true" className="block h-px w-8 bg-gold-dark dark:bg-gold mb-5" />
                <h3 className="font-heading text-xl text-brand dark:text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm text-ink-muted">{pillar.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-gold-dark dark:text-gold group-hover:gap-2.5 transition-all">
                  {common.actions.learnMore}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-paper-raised">
        <Container className="grid gap-10 md:grid-cols-[auto_1fr] items-center">
          <Image
            src="/images/roland-headshot.png"
            alt="Portrait of Barrister Abeng Roland, Managing Partner"
            width={160}
            height={179}
            className="w-40 h-auto border border-line"
          />
          <div>
            {/* DRAFT: pending Firm-approved copy */}
            <h2 className="font-heading text-2xl md:text-3xl text-brand dark:text-ink">
              {home.peopleTeaser.title}
            </h2>
            <p className="mt-3 max-w-xl text-ink-muted">{home.peopleTeaser.body}</p>
            <Link
              href={`/${locale}${home.peopleTeaser.href}`}
              className="mt-5 inline-block font-mono text-sm uppercase tracking-[0.15em] text-gold-dark dark:text-gold hover:underline"
            >
              {home.peopleTeaser.cta} →
            </Link>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-brand-dark py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--brand)_0%,_transparent_60%)] opacity-40" />
        <Container className="relative text-center max-w-2xl mx-auto">
          <span aria-hidden="true" className="mx-auto block h-px w-10 bg-gold mb-6" />
          <h2 className="font-heading text-2xl md:text-3xl text-cream">
            {home.cta.title}
          </h2>
          <p className="mt-3 text-cream-muted">{home.cta.body}</p>
          <Link
            href={`/${locale}${home.cta.href}`}
            className="mt-8 inline-flex items-center justify-center bg-gold px-8 py-3.5 text-sm font-medium tracking-wide text-brand-dark hover:bg-gold-light transition-colors"
          >
            {home.cta.button}
          </Link>
        </Container>
      </section>
    </>
  );
}
