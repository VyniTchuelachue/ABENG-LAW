import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PersonCard from "@/components/PersonCard";
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
  const people = getContent("people", locale);
  return buildMetadata({ locale, path: "people", title: people.meta.title, description: people.meta.description });
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
  const members = getTeamMembers(locale);
  const expertise = getContent("expertise", locale);

  const expertiseTitleBySlug = new Map(expertise.items.map((item) => [item.slug, item.title]));

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading title={people.title} lead={people.lead} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => {
            const tags = member.practiceAreas
              ?.slice(0, 2)
              .map((slug) => expertiseTitleBySlug.get(slug) ?? slug);

            return (
              <PersonCard
                key={member.slug ?? `${member.role}-${index}`}
                locale={locale}
                slug={member.slug}
                name={member.name}
                role={member.role}
                image={member.image}
                imageAlt={member.imageAlt}
                linkedinUrl={member.linkedinUrl}
                linkedinAria={people.labels.linkedinAria}
                practiceAreaTags={tags}
                pendingNote={people.labels.pendingNote}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
