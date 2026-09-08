import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import StatBadge from "@/components/StatBadge";
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

function Kicker({ index, text }: { index: string; text: string }) {
  return (
    <p className="font-mono text-xs tracking-[0.25em] uppercase text-gold-dark dark:text-gold">
      <span className="text-ink-muted/60 mr-2">{index}</span>
      {text}
    </p>
  );
}

function ViewAllLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-gold-dark dark:text-gold hover:underline underline-offset-4"
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
    </Link>
  );
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
  const expertise = getContent("expertise", locale);
  const industries = getContent("industries", locale);
  const experience = getContent("experience", locale);
  const insights = getContent("insights", locale);
  const international = getContent("international", locale);

  const featuredExpertise = expertise.items.slice(0, 3);
  const featuredIndustries = industries.items.slice(0, 3);
  const featuredExperience = experience.items.slice(0, 2);
  const featuredInsights = insights.items.slice(0, 2);
  const featuredGallery = international.gallery.slice(0, 3);

  const l = (href: string) => `/${locale}${href}`;

  return (
    <>
      {/* 01 — Hero */}
      <section className="relative overflow-hidden bg-ink-black">
        <Image
          src="/images/law-library-generic.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[80%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-black/95 via-ink-black/70 to-ink-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/80 via-transparent to-transparent" />
        <div
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[36rem] w-[36rem] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--gold), transparent 70%)" }}
        />

        <Container className="relative py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] items-center">
            <div>
              <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-gold-light">
                {home.hero.kicker}
              </p>
              <h1 className="mt-6 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-[1.08]">
                {home.hero.titlePrefix}{" "}
                <span className="text-gold-light">{home.hero.titleAccent}</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg text-cream-muted">
                {home.hero.subtitle}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href={l(home.hero.ctaPrimaryHref)}
                  className="inline-flex items-center justify-center bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-ink-black hover:bg-gold-light transition-colors"
                >
                  {home.hero.ctaPrimary}
                </Link>
                <Link
                  href={l(home.hero.ctaSecondaryHref)}
                  className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-cream hover:text-gold-light transition-colors underline underline-offset-4 decoration-cream/30 hover:decoration-gold-light"
                >
                  {home.hero.ctaSecondary}
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div className="relative aspect-[3/4] border border-gold/30">
                <Image
                  src="/images/roland-headshot.png"
                  alt={home.hero.founderName}
                  fill
                  sizes="(min-width: 1024px) 32vw, 80vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-dark to-transparent" />
                <div className="absolute left-5 right-5 bottom-6">
                  <p className="font-script text-3xl text-cream leading-none">{home.hero.founderName}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-light">
                    {home.hero.founderTitle}
                  </p>
                </div>
              </div>
              <StatBadge
                value={home.hero.badgeValue}
                label={home.hero.badgeLabel}
                className="absolute -bottom-6 -right-4 sm:-right-6"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — Statistics */}
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

      {/* 03 — The Firm */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/3] border border-line">
                <Image
                  src={home.firm.image}
                  alt={home.firm.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
              <StatBadge
                value={home.firm.badgeValue}
                label={home.firm.badgeLabel}
                className="absolute -bottom-6 -left-4 sm:-left-6"
              />
            </div>

            <div className="order-1 lg:order-2">
              <Kicker index="03" text={home.firm.kicker} />
              <h2 className="mt-4 font-heading text-3xl md:text-4xl font-medium text-brand dark:text-ink leading-tight">
                {home.firm.title}
              </h2>
              {/* DRAFT: pending Firm-approved copy */}
              <div className="mt-6 space-y-4 text-ink-muted">
                {home.firm.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8">
                <ViewAllLink href={l(home.firm.href)}>{home.firm.cta}</ViewAllLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 04 — Expertise */}
      <section className="py-20 md:py-32 bg-paper-raised">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Kicker index="04" text={home.expertiseSection.kicker} />
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-medium text-brand dark:text-ink">
              {home.expertiseSection.title}
            </h2>
            <p className="mt-4 text-ink-muted">{home.expertiseSection.lead}</p>
          </div>

          {/* DRAFT: pending Firm-approved copy (practice area descriptions) */}
          <div className="mt-14 grid gap-px bg-line border border-line md:grid-cols-3">
            {featuredExpertise.map((item) => (
              <div key={item.slug} className="bg-paper p-8">
                <span aria-hidden="true" className="block h-px w-8 bg-gold-dark dark:bg-gold mb-5" />
                <h3 className="font-heading text-lg text-brand dark:text-ink">{item.title}</h3>
                <p className="mt-3 text-sm text-ink-muted">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <ViewAllLink href={l(home.expertiseSection.href)}>{home.expertiseSection.cta}</ViewAllLink>
          </div>
        </Container>
      </section>

      {/* 05 — Industries */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Kicker index="05" text={home.industriesSection.kicker} />
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-medium text-brand dark:text-ink">
              {home.industriesSection.title}
            </h2>
            <p className="mt-4 text-ink-muted">{home.industriesSection.lead}</p>
          </div>

          <div className="mt-14 grid gap-px bg-line border border-line md:grid-cols-3">
            {featuredIndustries.map((item) => (
              <div key={item.slug} className="bg-paper p-8">
                <span aria-hidden="true" className="block h-px w-8 bg-gold-dark dark:bg-gold mb-5" />
                <h3 className="font-heading text-lg text-brand dark:text-ink">{item.title}</h3>
                <p className="mt-3 text-sm text-ink-muted">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <ViewAllLink href={l(home.industriesSection.href)}>{home.industriesSection.cta}</ViewAllLink>
          </div>
        </Container>
      </section>

      {/* 06 — Experience */}
      <section className="py-20 md:py-32 bg-paper-raised">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Kicker index="06" text={home.experienceSection.kicker} />
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-medium text-brand dark:text-ink">
              {home.experienceSection.title}
            </h2>
            <p className="mt-4 text-ink-muted">{home.experienceSection.lead}</p>
          </div>

          <div className="mt-14 grid gap-px bg-line border border-line md:grid-cols-2">
            {featuredExperience.map((item) => (
              <div key={item.title} className="bg-paper p-8">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-xs uppercase tracking-wide text-gold-dark dark:text-gold">
                    {item.sector}
                  </p>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted border border-line px-2 py-1">
                    {experience.placeholderBadge}
                  </span>
                </div>
                <h3 className="mt-3 font-heading text-lg text-brand dark:text-ink">{item.title}</h3>
                <p className="mt-3 text-sm text-ink-muted">{item.summary}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <ViewAllLink href={l(home.experienceSection.href)}>{home.experienceSection.cta}</ViewAllLink>
          </div>
        </Container>
      </section>

      {/* 07 — People */}
      <section className="py-20 md:py-32">
        <Container className="grid gap-10 md:grid-cols-[auto_1fr] items-center">
          <Image
            src="/images/roland-headshot.png"
            alt="Portrait of Barrister Abeng Roland, Managing Partner"
            width={160}
            height={179}
            className="w-40 h-auto border border-line"
          />
          <div>
            <Kicker index="07" text={home.peopleSection.kicker} />
            {/* DRAFT: pending Firm-approved copy */}
            <h2 className="mt-4 font-heading text-2xl md:text-3xl font-medium text-brand dark:text-ink">
              {home.peopleSection.title}
            </h2>
            <p className="mt-3 max-w-xl text-ink-muted">{home.peopleSection.body}</p>
            <div className="mt-6">
              <ViewAllLink href={l(home.peopleSection.href)}>{home.peopleSection.cta}</ViewAllLink>
            </div>
          </div>
        </Container>
      </section>

      {/* 08 — International */}
      <section className="relative overflow-hidden bg-ink-black py-20 md:py-32">
        <Container className="relative">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-gold">
              <span className="text-cream-muted/50 mr-2">08</span>
              {home.internationalSection.kicker}
            </p>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-medium text-cream">
              {home.internationalSection.title}
            </h2>
            <p className="mt-4 text-cream-muted">{home.internationalSection.lead}</p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {featuredGallery.map((photo) => (
              <figure key={photo.image}>
                <div className="relative aspect-[4/3] border border-gold/15">
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-cream-muted">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href={l(home.internationalSection.href)}
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-gold hover:underline underline-offset-4"
            >
              {home.internationalSection.cta}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* 09 — Insights */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Kicker index="09" text={home.insightsSection.kicker} />
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-medium text-brand dark:text-ink">
              {home.insightsSection.title}
            </h2>
            <p className="mt-4 text-ink-muted">{home.insightsSection.lead}</p>
          </div>

          <div className="mt-14 grid gap-px bg-line border border-line md:grid-cols-2">
            {featuredInsights.map((item) => (
              <div key={item.title} className="bg-paper p-8">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-xs uppercase tracking-wide text-gold-dark dark:text-gold">
                    {item.category}
                  </p>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted border border-line px-2 py-1">
                    {insights.placeholderBadge}
                  </span>
                </div>
                <h3 className="mt-3 font-heading text-lg text-brand dark:text-ink">{item.title}</h3>
                <p className="mt-3 text-sm text-ink-muted">{item.excerpt}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <ViewAllLink href={l(home.insightsSection.href)}>{home.insightsSection.cta}</ViewAllLink>
          </div>
        </Container>
      </section>

      {/* 10 — Careers (small, attractive) */}
      <section className="py-16 md:py-20 bg-paper-raised">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-line p-8 md:p-10">
            <div>
              <Kicker index="10" text={home.careersSection.kicker} />
              <h2 className="mt-3 font-heading text-xl md:text-2xl font-medium text-brand dark:text-ink">
                {home.careersSection.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-ink-muted">{home.careersSection.body}</p>
            </div>
            <Link
              href={l(home.careersSection.href)}
              className="inline-flex items-center justify-center border border-gold-dark dark:border-gold px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-gold-dark dark:text-gold hover:bg-gold hover:text-ink-black hover:border-gold transition-colors shrink-0"
            >
              {home.careersSection.cta}
            </Link>
          </div>
        </Container>
      </section>

      {/* 11 — Contact (large final CTA) */}
      <section className="relative overflow-hidden bg-ink-black py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--gold)_0%,_transparent_60%)] opacity-[0.12]" />
        <Container className="relative text-center max-w-2xl mx-auto">
          <span aria-hidden="true" className="mx-auto block h-px w-10 bg-gold mb-6" />
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-cream-muted/60">11 — {common.nav.contact}</p>
          <h2 className="mt-4 font-heading text-3xl md:text-4xl font-medium text-cream">
            {home.cta.title}
          </h2>
          <p className="mt-3 text-cream-muted">{home.cta.body}</p>
          <Link
            href={l(home.cta.href)}
            className="mt-8 inline-flex items-center justify-center bg-gold px-8 py-3.5 text-sm font-medium tracking-wide text-ink-black hover:bg-gold-light transition-colors"
          >
            {home.cta.button}
          </Link>
        </Container>
      </section>
    </>
  );
}
