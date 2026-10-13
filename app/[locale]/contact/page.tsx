import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icons";
import MapEmbed from "@/components/MapEmbed";
import ContactForm from "@/components/ContactForm";
import { Eyebrow } from "@/components/ui";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

function IconBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-dark/50 text-gold-dark dark:border-gold/50 dark:text-gold">
      <Icon name={name} className="h-5 w-5" />
    </span>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const contact = getContent("contact", locale);
  return buildMetadata({
    locale,
    path: "contact",
    title: contact.meta.title,
    description: contact.meta.description,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const contact = getContent("contact", locale);

  return (
    <>
      <PageHero title={contact.title} lead={contact.lead} />
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div className="space-y-10">
              <div className="flex gap-4">
                <IconBadge name="location" />
                <div>
                  <Eyebrow>{contact.officeTitle}</Eyebrow>
                  <address className="mt-2 not-italic leading-relaxed text-ink">
                    {contact.address.line1}
                    <br />
                    {contact.address.line2}
                    <br />
                    {contact.address.line3}
                    <br />
                    {contact.address.poBox}
                  </address>
                </div>
              </div>

              <div className="flex gap-4">
                <IconBadge name="phone" />
                <div>
                  <Eyebrow>{contact.phonesTitle}</Eyebrow>
                  <ul className="mt-2 space-y-1 text-ink">
                    {contact.phones.map((phone) => (
                      <li key={phone}>{phone}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs italic text-ink-muted">{contact.phoneConfirmNote}</p>
                </div>
              </div>

              <div>
                <Eyebrow className="mb-3">{contact.mapTitle}</Eyebrow>
                <MapEmbed
                  lat={contact.mapCoordinates.lat}
                  lng={contact.mapCoordinates.lng}
                  title={contact.mapTitle}
                />
              </div>
            </div>

            <div className="border border-line bg-paper-raised p-8 md:p-10">
              <h2 className="font-heading text-2xl font-semibold text-brand dark:text-ink">
                {contact.form.title}
              </h2>
              <p className="mt-4 mb-8 border-l-2 border-gold-dark pl-4 text-sm text-ink-muted dark:border-gold">
                {contact.disclaimer}
              </p>
              <ContactForm form={contact.form} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
