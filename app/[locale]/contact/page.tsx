import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import MapEmbed from "@/components/MapEmbed";
import ContactForm from "@/components/ContactForm";
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
  const common = getContent("common", locale);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          number={contact.eyebrowNumber}
          title={contact.title}
          lead={contact.lead}
          articleWord={common.articleWord}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-dark dark:text-gold">
                {contact.officeTitle}
              </p>
              <address className="mt-3 not-italic text-ink leading-relaxed">
                {contact.address.line1}
                <br />
                {contact.address.line2}
                <br />
                {contact.address.line3}
                <br />
                {contact.address.poBox}
              </address>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-dark dark:text-gold">
                {contact.phonesTitle}
              </p>
              <ul className="mt-3 space-y-1 font-mono text-ink">
                {contact.phones.map((phone) => (
                  <li key={phone}>{phone}</li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-ink-muted italic">{contact.phoneConfirmNote}</p>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-dark dark:text-gold mb-3">
                {contact.mapTitle}
              </p>
              <MapEmbed
                lat={contact.mapCoordinates.lat}
                lng={contact.mapCoordinates.lng}
                title={contact.mapTitle}
              />
            </div>
          </div>

          <div>
            <div className="border border-gold-dark/40 bg-paper-raised p-5 text-sm text-ink-muted mb-8">
              {contact.disclaimer}
            </div>

            <div className="border border-line p-8">
              <h2 className="font-heading text-xl text-brand dark:text-ink mb-6">
                {contact.form.title}
              </h2>
              <ContactForm form={contact.form} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
