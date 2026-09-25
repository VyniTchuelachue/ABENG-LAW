import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import Icon from "./Icons";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/i18n";
import { getContent, type CommonContent } from "@/lib/content";

export default function Footer({
  locale,
  common,
  contact,
}: {
  locale: Locale;
  common: CommonContent;
  contact: ReturnType<typeof getContent<"contact">>;
}) {
  const year = new Date().getFullYear();
  const practiceAreas = getContent("expertise", locale).items.slice(0, 6);

  return (
    <footer className="bg-ink-black">
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <Container className="py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt={`${common.siteName} crest`}
              width={56}
              height={51}
              className="h-12 w-auto"
            />
            <span className="flex flex-col leading-none">
              <span className="font-heading text-base font-semibold tracking-[0.02em] uppercase text-cream">
                {common.siteNameMark}
              </span>
              <span className="mt-1.5 text-[10px] tracking-[0.22em] uppercase text-gold">
                {common.estLabel}
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm text-cream-muted">{common.footer.description}</p>
          <p className="mt-3 max-w-xs text-xs text-cream-muted/70">{common.footer.ohadaNote}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
            {common.footer.navTitle}
          </p>
          <ul className="space-y-2">
            {routes.map((route) => (
              <li key={route.key}>
                <Link
                  href={route.slug ? `/${locale}/${route.slug}` : `/${locale}`}
                  className="text-sm text-cream-muted hover:text-gold-light transition-colors"
                >
                  {common.nav[route.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
            {common.footer.practiceTitle}
          </p>
          <ul className="space-y-2">
            {practiceAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/${locale}/expertise#${area.slug}`}
                  className="text-sm text-cream-muted hover:text-gold-light transition-colors"
                >
                  {area.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
            {common.footer.contactTitle}
          </p>
          <div className="flex gap-3">
            <Icon name="location" className="h-5 w-5 shrink-0 text-gold" />
            <address className="not-italic text-sm text-cream-muted leading-relaxed">
              {contact.address.line1}
              <br />
              {contact.address.line2}
              <br />
              {contact.address.line3}
              <br />
              {contact.address.poBox}
            </address>
          </div>
          <div className="mt-4 flex gap-3">
            <Icon name="phone" className="h-5 w-5 shrink-0 text-gold" />
            <ul className="space-y-1 text-sm text-cream-muted">
              {contact.phones.map((phone) => (
                <li key={phone}>{phone}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-gold/15">
        <Container className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-muted">
          <p>
            © {year} {common.siteName}. {common.footer.rights}
          </p>
          <Link href={`/${locale}/contact`} className="hover:text-gold-light transition-colors">
            {common.nav.contact}
          </Link>
        </Container>
      </div>
    </footer>
  );
}
