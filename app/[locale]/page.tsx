import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Icon from "@/components/Icons";
import AfricaMap from "@/components/AfricaMap";
import { getContent, getTeamMembers } from "@/lib/content";
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

function Kicker({ text, onDark = false }: { text: string; onDark?: boolean }) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.2em] ${
        onDark ? "text-gold" : "text-gold-dark dark:text-gold"
      }`}
    >
      {text}
    </p>
  );
}

function Arrow() {
  return (
    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
      →
    </span>
  );
}

function ViewAllLink({
  href,
  children,
  onDark = false,
}: {
  href: string;
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] hover:underline underline-offset-4 ${
        onDark ? "text-gold" : "text-gold-dark dark:text-gold"
      }`}
    >
      {children}
      <Arrow />
    </Link>
  );
}

function OutlineButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 border border-gold-dark dark:border-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-gold-dark dark:text-gold hover:bg-gold hover:text-ink-black hover:border-gold transition-colors"
    >
      {children}
      <Arrow />
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
  const contact = getContent("contact", locale);
  const expertise = getContent("expertise", locale);
  const industries = getContent("industries", locale);
  const experience = getContent("experience", locale);
  const insights = getContent("insights", locale);
  const international = getContent("international", locale);

  const expertiseBySlug = new Map(expertise.items.map((item) => [item.slug, item]));
  const featuredExpertise = home.expertiseSection.featured
    .map((slug) => expertiseBySlug.get(slug))
    .filter((item) => item !== undefined);
  const expertiseImages: Record<string, string> = home.expertiseSection.cardImages;
  const featuredIndustries = industries.items.slice(0, 6);
  const featuredExperience = experience.items.slice(0, 4);
  const [leadInsight, ...otherInsights] = insights.items.slice(0, 3);
  const featuredGallery = international.gallery;

  const people = getContent("people", locale);
  const teamPreview = getTeamMembers(locale).slice(0, 5);
  const managingPartner = getTeamMembers(locale).find(
    (member) => member.slug === home.managingPartnerSection.memberSlug
  );
  const partnerAreas = (managingPartner?.practiceAreas ?? [])
    .map((slug) => expertiseBySlug.get(slug))
    .filter((item) => item !== undefined);

  const l = (href: string) => `/${locale}${href}`;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-black">
        <div className="absolute inset-y-0 right-0 hidden lg:block w-[58%]">
          <Image
            src="/images/roland-headshot.jpg"
            alt={home.hero.founderName}
            fill
            priority
            sizes="58vw"
            className="object-cover object-[50%_18%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-black via-ink-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-black/85 to-transparent" />
        </div>

        <Container className="relative">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] lg:min-h-[640px]">
            <div className="pt-14 pb-10 md:py-24 lg:py-28 lg:pr-6 self-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-light">
                {home.hero.kicker}
              </p>
              <h1 className="mt-6 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-[1.08]">
                {home.hero.titlePrefix}{" "}
                <span className="text-gold-light">{home.hero.titleAccent}</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg text-cream-muted">{home.hero.subtitle}</p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href={l(home.hero.ctaPrimaryHref)}
                  className="group inline-flex items-center gap-2 bg-gold px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-black hover:bg-gold-light transition-colors"
                >
                  {home.hero.ctaPrimary}
                  <Arrow />
                </Link>
                <Link
                  href={l(home.hero.ctaSecondaryHref)}
                  className="group inline-flex items-center gap-2 border border-cream/40 px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-cream hover:border-gold-light hover:text-gold-light transition-colors"
                >
                  {home.hero.ctaSecondary}
                  <Arrow />
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute left-10 bottom-12">
                <p className="font-script text-4xl text-cream leading-none">{home.hero.founderName}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                  {home.hero.founderTitle}
                </p>
              </div>
              <HeroBadge
                value={home.hero.badgeValue}
                label={home.hero.badgeLabel}
                note={home.hero.badgeNote}
                className="absolute right-0 bottom-36"
              />
            </div>
          </div>
        </Container>

        {/* Portrait for small screens, stacked beneath the headline */}
        <div className="relative lg:hidden aspect-[4/3] sm:aspect-[16/10]">
          <Image
            src="/images/roland-headshot.jpg"
            alt={home.hero.founderName}
            fill
            sizes="100vw"
            className="object-cover object-[50%_20%]"
          />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-black to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-black to-transparent" />
          <div className="absolute left-6 bottom-6">
            <p className="font-script text-3xl text-cream leading-none">{home.hero.founderName}</p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light">
              {home.hero.founderTitle}
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="border-b border-line bg-paper-raised">
        <Container className="py-8 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 md:divide-x md:divide-line">
          {home.stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4 md:justify-center md:px-4">
              <Icon name={stat.icon} className="h-9 w-9 shrink-0 text-gold-dark dark:text-gold" />
              <div>
                <p className="font-heading text-2xl md:text-3xl font-semibold text-brand dark:text-ink leading-none">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-xs text-ink-muted">{stat.label}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* The Firm */}
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[520px]">
          <Image
            src={home.firm.image}
            alt={home.firm.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center px-6 py-16 md:px-12 lg:px-16 xl:px-20">
          <div className="max-w-xl">
            <Kicker text={home.firm.kicker} />
            <h2 className="mt-4 font-heading text-3xl md:text-[2.6rem] font-semibold text-brand dark:text-ink leading-tight">
              {home.firm.title}
            </h2>
            {/* DRAFT: pending Firm-approved copy */}
            <div className="mt-6 space-y-4 text-ink-muted">
              {home.firm.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8">
              <OutlineButton href={l(home.firm.href)}>{home.firm.cta}</OutlineButton>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="relative overflow-hidden bg-ink-black py-20 md:py-28">
        <div className="absolute inset-y-0 left-0 w-full md:w-1/2">
          <Image
            src={home.expertiseSection.backgroundImage}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-[35%_30%] opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-black/20 via-ink-black/60 to-ink-black" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink-black/70 via-ink-black/30 to-ink-black/90" />
        <Container className="relative">
          <div className="max-w-2xl mx-auto text-center">
            <Kicker text={home.expertiseSection.kicker} onDark />
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-semibold text-cream">
              {home.expertiseSection.title}
            </h2>
            <p className="mt-4 text-cream-muted">{home.expertiseSection.lead}</p>
          </div>

          {/* DRAFT: pending Firm-approved copy (practice area descriptions) */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredExpertise.map((item) => (
              <Link
                key={item.slug}
                href={l(`/expertise#${item.slug}`)}
                className="group relative flex min-h-[400px] flex-col justify-end overflow-hidden border border-gold/30 p-7 hover:border-gold transition-colors"
              >
                {expertiseImages[item.slug] ? (
                  <Image
                    src={expertiseImages[item.slug]}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-ink-black/70 to-ink-black/5" />
                <div className="relative">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-ink-black/50 text-gold">
                    <Icon name={item.slug} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-semibold text-cream leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-cream-muted">{item.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                    {common.actions.learnMore}
                    <Arrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <ViewAllLink href={l(home.expertiseSection.href)} onDark>
              {home.expertiseSection.cta}
            </ViewAllLink>
          </div>
        </Container>
      </section>

      {/* Experience */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <Kicker text={home.experienceSection.kicker} />
              <h2 className="mt-4 font-heading text-3xl md:text-4xl font-semibold text-brand dark:text-ink">
                {home.experienceSection.title}
              </h2>
              <p className="mt-4 text-ink-muted">{home.experienceSection.lead}</p>
            </div>
            <ViewAllLink href={l(home.experienceSection.href)}>{home.experienceSection.cta}</ViewAllLink>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredExperience.map((item, index) => (
              <article key={item.title} className="group flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-paper-raised">
                  {home.experienceSection.cardImages[index] ? (
                    <Image
                      src={home.experienceSection.cardImages[index]}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}
                  <span className="absolute left-3 top-3 bg-ink-black/75 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-cream">
                    {experience.placeholderBadge}
                  </span>
                </div>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark dark:text-gold">
                  {item.sector}
                </p>
                <h3 className="mt-2 font-heading text-lg font-semibold text-brand dark:text-ink leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">{item.summary}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Managing Partner */}
      {managingPartner ? (
        <section className="grid lg:grid-cols-2 bg-paper-raised">
          <div className="relative min-h-[420px] sm:min-h-[520px] lg:min-h-[600px]">
            <Image
              src={home.managingPartnerSection.image}
              alt={home.managingPartnerSection.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[50%_15%]"
            />
          </div>
          <div className="flex items-center px-6 py-16 md:px-12 lg:px-16 xl:px-20">
            <div className="max-w-xl">
              <Kicker text={home.managingPartnerSection.kicker} />
              <h2 className="mt-4 font-heading text-3xl md:text-4xl font-semibold text-brand dark:text-ink">
                {managingPartner.name}
              </h2>
              <p className="mt-2 text-ink-muted">{managingPartner.role}</p>
              {/* DRAFT: pending Firm-approved copy */}
              <div className="mt-6 space-y-4 text-ink-muted">
                {managingPartner.bio?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {partnerAreas.length > 0 ? (
                <ul className="mt-8 grid grid-cols-2 sm:grid-cols-4 border-y border-line">
                  {partnerAreas.map((area) => (
                    <li
                      key={area.slug}
                      className="flex flex-col items-start gap-2 py-4 pr-3 sm:[&:not(:first-child)]:pl-3 sm:[&:not(:first-child)]:border-l sm:border-line"
                    >
                      <Icon name={area.slug} className="h-6 w-6 text-gold-dark dark:text-gold" />
                      <span className="text-xs leading-snug text-ink-muted">{area.title}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-8">
                <OutlineButton href={l(`/people/${managingPartner.slug}`)}>
                  {home.managingPartnerSection.cta}
                </OutlineButton>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Industries */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-start">
            <div>
              <Kicker text={home.industriesSection.kicker} />
              <h2 className="mt-4 font-heading text-3xl md:text-4xl font-semibold text-brand dark:text-ink">
                {home.industriesSection.title}
              </h2>
              <p className="mt-4 text-ink-muted">{home.industriesSection.lead}</p>
              <div className="mt-8">
                <ViewAllLink href={l(home.industriesSection.href)}>{home.industriesSection.cta}</ViewAllLink>
              </div>
            </div>
            <ul className="grid sm:grid-cols-2 gap-px bg-line border border-line">
              {featuredIndustries.map((item) => (
                <li key={item.slug} className="bg-paper p-6">
                  <span aria-hidden="true" className="block h-px w-8 bg-gold-dark dark:bg-gold mb-4" />
                  <p className="font-heading text-lg font-semibold text-brand dark:text-ink">{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* International */}
      <section className="relative overflow-hidden bg-ink-black py-20 md:py-28">
        <Container className="relative">
          <div className="grid gap-14 xl:gap-10 lg:grid-cols-[1.05fr_0.95fr] xl:grid-cols-[0.7fr_1fr_0.95fr] items-center">
            <AfricaMap className="hidden xl:block w-full max-w-sm -ml-6" />
            <div>
              <Kicker text={home.internationalSection.kicker} onDark />
              <h2 className="mt-4 font-heading text-3xl md:text-[2.6rem] font-semibold text-cream leading-tight">
                {home.internationalSection.title}
              </h2>
              <p className="mt-5 max-w-xl text-cream-muted">{home.internationalSection.lead}</p>
              <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
                {home.internationalSection.pillars.map((pillar, index) => (
                  <li key={pillar} className="flex items-center gap-3 text-sm text-cream">
                    <Icon
                      name={["location", "global", "network"][index] ?? "global"}
                      className="h-6 w-6 text-gold"
                    />
                    {pillar}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <ViewAllLink href={l(home.internationalSection.href)} onDark>
                  {home.internationalSection.cta}
                </ViewAllLink>
              </div>
            </div>

            <div className="grid gap-5">
              {featuredGallery.map((photo) => (
                <figure key={photo.image} className="relative aspect-[16/9] border border-gold/20">
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-black/90 to-transparent px-4 pb-3 pt-10 text-xs text-cream">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Insights */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <Kicker text={home.insightsSection.kicker} />
              <h2 className="mt-4 font-heading text-3xl md:text-4xl font-semibold text-brand dark:text-ink">
                {home.insightsSection.title}
              </h2>
              <p className="mt-4 text-ink-muted">{home.insightsSection.lead}</p>
            </div>
            <ViewAllLink href={l(home.insightsSection.href)}>{home.insightsSection.cta}</ViewAllLink>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr_1fr]">
            {leadInsight ? (
              <article className="group relative flex flex-col overflow-hidden bg-ink-black p-8 md:p-10 min-h-[360px]">
                {home.insightsSection.cardImages[0] ? (
                  <Image
                    src={home.insightsSection.cardImages[0]}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-ink-black/75 to-ink-black/20" />
                <div className="relative flex items-center gap-3">
                  <span className="bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-black">
                    {home.insightsSection.featuredLabel}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
                    {leadInsight.category}
                  </span>
                </div>
                <h3 className="relative mt-auto pt-10 font-heading text-2xl font-semibold text-cream leading-snug">
                  {leadInsight.title}
                </h3>
                <p className="relative mt-3 text-sm text-cream-muted">{leadInsight.excerpt}</p>
                <span className="relative mt-5 self-start text-[10px] uppercase tracking-[0.12em] text-cream-muted border border-cream/20 px-2 py-1">
                  {insights.placeholderBadge}
                </span>
              </article>
            ) : null}
            {otherInsights.map((item, index) => (
              <article key={item.title} className="group flex flex-col overflow-hidden border border-line bg-paper-raised">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {home.insightsSection.cardImages[index + 1] ? (
                    <Image
                      src={home.insightsSection.cardImages[index + 1]}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(min-width: 1024px) 25vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark dark:text-gold">
                    {item.category}
                  </p>
                  <h3 className="mt-3 font-heading text-lg font-semibold text-brand dark:text-ink leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-ink-muted">{item.excerpt}</p>
                  <span className="mt-auto pt-5 self-start text-[10px] uppercase tracking-[0.12em] text-ink-muted border border-line px-2 py-1">
                    {insights.placeholderBadge}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Team */}
      <section className="py-20 md:py-28 bg-paper-raised">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <Kicker text={home.peopleSection.kicker} />
              {/* DRAFT: pending Firm-approved copy */}
              <h2 className="mt-4 font-heading text-3xl md:text-4xl font-semibold text-brand dark:text-ink">
                {home.peopleSection.title}
              </h2>
              <p className="mt-4 text-ink-muted">{home.peopleSection.body}</p>
            </div>
            <ViewAllLink href={l(home.peopleSection.href)}>{home.peopleSection.cta}</ViewAllLink>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {teamPreview.map((member, index) => {
              const card = (
                <>
                  <div className="relative aspect-[4/5] overflow-hidden bg-ink-black">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.imageAlt ?? member.name ?? member.role}
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-ink-black-raised to-ink-black">
                        <Image
                          src="/images/logo.png"
                          alt=""
                          aria-hidden="true"
                          width={72}
                          height={66}
                          className="h-16 w-auto opacity-35 grayscale"
                        />
                      </div>
                    )}
                  </div>
                  <p className="mt-3 font-heading text-base font-semibold text-brand dark:text-ink leading-snug">
                    {member.name ?? member.role}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {member.name ? member.role : people.labels.pendingShort}
                  </p>
                </>
              );
              return (
                <li key={member.slug ?? `${member.role}-${index}`}>
                  {member.slug ? (
                    <Link href={l(`/people/${member.slug}`)} className="group block">
                      {card}
                    </Link>
                  ) : (
                    <div className="group">{card}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Careers */}
      <section className="py-14 md:py-16">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-line p-8 md:p-10">
            <div>
              <Kicker text={home.careersSection.kicker} />
              <h2 className="mt-3 font-heading text-2xl font-semibold text-brand dark:text-ink">
                {home.careersSection.title}
              </h2>
              <p className="mt-2 max-w-xl text-ink-muted">{home.careersSection.body}</p>
            </div>
            <div className="shrink-0">
              <OutlineButton href={l(home.careersSection.href)}>{home.careersSection.cta}</OutlineButton>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section className="relative overflow-hidden bg-maroon py-20 md:py-24">
        <Image
          src="/images/law-library-generic.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-15 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon via-maroon/90 to-maroon/60" />
        <Container className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <Kicker text={home.cta.kicker} onDark />
            <h2 className="mt-4 font-heading text-3xl md:text-[2.6rem] font-semibold text-cream leading-tight">
              {home.cta.title}
            </h2>
            <p className="mt-4 max-w-xl text-cream/80">{home.cta.body}</p>
            <Link
              href={l(home.cta.href)}
              className="group mt-8 inline-flex items-center gap-2 bg-gold px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-black hover:bg-gold-light transition-colors"
            >
              {home.cta.button}
              <Arrow />
            </Link>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:border-l lg:border-cream/15 lg:pl-12">
            <li className="flex gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold-light">
                <Icon name="phone" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-light">
                  {contact.phonesTitle}
                </p>
                {contact.phones.map((phone) => (
                  <p key={phone} className="mt-1 text-sm text-cream">
                    {phone}
                  </p>
                ))}
              </div>
            </li>
            <li className="flex gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold-light">
                <Icon name="location" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-light">
                  {contact.officeTitle}
                </p>
                <p className="mt-1 text-sm text-cream">{contact.address.line2}</p>
                <p className="text-sm text-cream">{contact.address.line3}</p>
              </div>
            </li>
          </ul>
        </Container>
      </section>
    </>
  );
}

function HeroBadge({
  value,
  label,
  note,
  className = "",
}: {
  value: string;
  label: string;
  note?: string;
  className?: string;
}) {
  return (
    <div
      className={`border border-gold/50 bg-ink-black/75 backdrop-blur-sm px-6 py-5 max-w-[14rem] ${className}`}
    >
      <p className="font-heading text-4xl md:text-5xl font-semibold text-gold-light leading-none">{value}</p>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream">{label}</p>
      {note ? <p className="mt-3 text-xs leading-relaxed text-cream-muted">{note}</p> : null}
    </div>
  );
}
