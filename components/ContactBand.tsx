import Image from "next/image";
import Container from "./Container";
import Icon from "./Icons";
import { ButtonLink, Eyebrow } from "./ui";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

/**
 * The burgundy band that closes a page: one invitation to get in touch,
 * with the Firm's telephone numbers and office beside it. It is the only
 * large burgundy surface on the site, so it reads as the end of the page.
 */
export default function ContactBand({ locale }: { locale: Locale }) {
  const { cta } = getContent("home", locale);
  const contact = getContent("contact", locale);

  return (
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
          <Eyebrow onDark>{cta.kicker}</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl md:text-[2.6rem] font-semibold text-cream leading-tight">
            {cta.title}
          </h2>
          <p className="mt-4 max-w-xl text-cream/80">{cta.body}</p>
          <ButtonLink href={`/${locale}${cta.href}`} className="mt-8">
            {cta.button}
          </ButtonLink>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:border-l lg:border-cream/15 lg:pl-12">
          <li className="flex gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold-light">
              <Icon name="phone" className="h-5 w-5" />
            </span>
            <div>
              <p className="eyebrow text-gold-light">{contact.phonesTitle}</p>
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
              <p className="eyebrow text-gold-light">{contact.officeTitle}</p>
              <p className="mt-1 text-sm text-cream">{contact.address.line2}</p>
              <p className="text-sm text-cream">{contact.address.line3}</p>
            </div>
          </li>
        </ul>
      </Container>
    </section>
  );
}
