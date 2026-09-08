import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PersonCard from "@/components/PersonCard";
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
  const people = getContent("people", locale);
  return buildMetadata({ locale, path: "people", title: people.meta.title, description: people.meta.description });
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-dark dark:text-gold">{title}</p>
      <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
        {items.map((item, index) => (
          <li
            key={index}
            className={item.startsWith("[") ? "italic text-ink-muted/70" : undefined}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function PeoplePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const people = getContent("people", locale);
  const expertise = getContent("expertise", locale);

  const expertiseTitleBySlug = new Map(expertise.items.map((item) => [item.slug, item.title]));
  const practiceAreaTitles = people.founder.practiceAreas.map(
    (slug) => expertiseTitleBySlug.get(slug) ?? slug
  );

  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title={people.title}
            lead={people.lead}
          />
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="border border-line grid md:grid-cols-[280px_1fr]">
            <div className="relative aspect-[4/5] md:aspect-auto">
              <Image
                src={people.founder.image}
                alt={people.founder.imageAlt}
                fill
                sizes="(min-width: 768px) 280px, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="p-8 md:p-10">
              <h2 className="font-heading text-2xl text-brand dark:text-ink">
                {people.founder.name}
              </h2>
              <p className="mt-1 font-mono text-sm uppercase tracking-[0.1em] text-gold-dark dark:text-gold">
                {people.founder.role}
              </p>

              {/* DRAFT: pending Firm-approved copy */}
              <div className="mt-5 space-y-4 text-ink-muted">
                {people.founder.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <p className="mt-5 text-sm text-ink-muted">{people.founder.practiceAreasNote}</p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <DetailList title={people.labels.qualifications} items={people.founder.qualifications} />
                <DetailList title={people.labels.barAdmission} items={[people.founder.barAdmission]} />
                <DetailList title={people.labels.practiceAreas} items={practiceAreaTitles} />
                <DetailList title={people.labels.experience} items={people.founder.experience} />
                <DetailList title={people.labels.memberships} items={people.founder.memberships} />
                <DetailList title={people.labels.publications} items={people.founder.publications} />
                <DetailList title={people.labels.languages} items={people.founder.languages} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-paper-raised">
        <Container>
          <h2 className="font-heading text-2xl text-brand dark:text-ink">
            {people.teamIntro.title}
          </h2>
          <p className="mt-2 max-w-xl text-ink-muted">{people.teamIntro.body}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {people.placeholderRoles.map((role, index) => (
              <PersonCard key={index} role={role} placeholderNote={people.placeholderNote} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
