import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PersonCard from "@/components/PersonCard";
import ContactBand from "@/components/ContactBand";
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
    <>
      <PageHero title={people.title} lead={people.lead} />
      <section className="py-16 md:py-24">
        <Container>
          <div className="space-y-16">
            {people.groups.map((group) => {
              const groupMembers = members.filter((member) => member.group === group.key);
              if (groupMembers.length === 0) return null;
              return (
                <div key={group.key}>
                  <div className="flex items-center gap-4">
                    <h2 className="font-heading text-2xl font-semibold text-brand dark:text-ink">
                      {group.title}
                    </h2>
                    <span aria-hidden="true" className="h-px flex-1 bg-line" />
                  </div>
                  <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {groupMembers.map((member) => {
                      const tags = (
                        member.focusAreas ??
                        member.practiceAreas?.map((slug) => expertiseTitleBySlug.get(slug) ?? slug)
                      )?.slice(0, 2);

                      return (
                        <PersonCard
                          key={member.slug ?? member.role}
                          locale={locale}
                          slug={member.slug}
                          name={member.name}
                          role={member.role}
                          image={member.image}
                          imageAlt={member.imageAlt}
                          linkedinUrl={member.linkedinUrl}
                          linkedinAria={people.labels.linkedinAria}
                          tags={tags}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
      <ContactBand locale={locale} />
    </>
  );
}
