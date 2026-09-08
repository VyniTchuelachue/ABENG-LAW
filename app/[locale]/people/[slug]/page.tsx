import Image from "next/image";
import Container from "@/components/Container";
import { getContent, getTeamMembers } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const members = getTeamMembers("en");
  return members
    .map((member) => member.slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

function findMember(locale: Locale, slug: string) {
  return getTeamMembers(locale).find((member) => member.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const member = findMember(locale, slug);
  if (!member) return {};
  return buildMetadata({
    locale,
    path: `people/${slug}`,
    title: `${member.name} – ${member.role}`,
    description: member.bio?.[0] ?? member.role,
  });
}

function AccordionSection({
  label,
  items,
}: {
  label: string;
  items: string[] | null;
}) {
  if (!items || items.length === 0) return null;
  return (
    <details className="group border-b border-line py-5">
      <summary className="flex cursor-pointer items-center justify-between gap-4 list-none font-mono text-xs uppercase tracking-[0.15em] text-gold-dark dark:text-gold">
        {label}
        <span aria-hidden="true" className="shrink-0 transition-transform duration-200 group-open:rotate-45">
          +
        </span>
      </summary>
      <ul className="mt-4 space-y-1.5 text-sm text-ink-muted">
        {items.map((item, index) => (
          <li key={index} className={item.startsWith("[") ? "italic text-ink-muted/70" : undefined}>
            {item}
          </li>
        ))}
      </ul>
    </details>
  );
}

export default async function PersonProfilePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const member = findMember(locale, slug);
  if (!member) notFound();

  const people = getContent("people", locale);
  const expertise = getContent("expertise", locale);
  const expertiseTitleBySlug = new Map(expertise.items.map((item) => [item.slug, item.title]));
  const practiceAreaTitles = member.practiceAreas?.map((s) => expertiseTitleBySlug.get(s) ?? s) ?? null;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="border border-line grid md:grid-cols-[280px_1fr] items-start">
          <div className="relative aspect-[4/5] bg-paper-raised">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.imageAlt ?? member.name ?? member.role}
                fill
                sizes="(min-width: 768px) 280px, 100vw"
                className="object-cover"
                priority
              />
            ) : null}
          </div>
          <div className="p-8 md:p-10">
            <h1 className="font-heading text-2xl text-brand dark:text-ink">
              {member.name ?? member.role}
            </h1>
            <p className="mt-1 font-mono text-sm uppercase tracking-[0.1em] text-gold-dark dark:text-gold">
              {member.role}
            </p>

            {/* DRAFT: pending Firm-approved copy */}
            {member.bio ? (
              <div className="mt-5 space-y-4 text-ink-muted">
                {member.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {member.linkedinUrl ? (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center border border-gold-dark dark:border-gold px-5 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-gold-dark dark:text-gold hover:bg-gold hover:text-ink-black hover:border-gold transition-colors"
              >
                {people.labels.linkedinCta}
              </a>
            ) : null}

            {member.practiceAreasNote ? (
              <p className="mt-6 text-sm text-ink-muted">{member.practiceAreasNote}</p>
            ) : null}

            <div className="mt-6">
              <AccordionSection label={people.labels.qualifications} items={member.qualifications} />
              <AccordionSection
                label={people.labels.barAdmission}
                items={member.barAdmission ? [member.barAdmission] : null}
              />
              <AccordionSection label={people.labels.practiceAreas} items={practiceAreaTitles} />
              <AccordionSection label={people.labels.experience} items={member.experience} />
              <AccordionSection label={people.labels.memberships} items={member.memberships} />
              <AccordionSection label={people.labels.publications} items={member.publications} />
              <AccordionSection label={people.labels.languages} items={member.languages} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
