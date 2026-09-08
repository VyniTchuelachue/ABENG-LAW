import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/i18n";
import type { CommonContent } from "@/lib/content";
import type { getContent } from "@/lib/content";

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

  return (
    <footer className="bg-brand-dark">
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <Container className="py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <Image
            src="/images/logo.png"
            alt={`${common.siteName} crest`}
            width={56}
            height={51}
            className="h-12 w-auto mb-4"
          />
          <p className="font-heading text-base tracking-[0.02em] uppercase text-cream">
            {common.siteNameMark}
          </p>
          <p className="mt-2 text-sm text-cream-muted">{common.footer.description}</p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-4">
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
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-4">
            {common.footer.addressTitle}
          </p>
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

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-4">
            {common.footer.contactTitle}
          </p>
          <ul className="space-y-2 font-mono text-sm text-cream-muted">
            {contact.phones.map((phone) => (
              <li key={phone}>{phone}</li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-gold/15">
        <Container className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-muted">
          <p>
            © {year} {common.siteName}. {common.footer.rights}
          </p>
          <p>{common.footer.ohadaNote}</p>
        </Container>
      </div>
    </footer>
  );
}
