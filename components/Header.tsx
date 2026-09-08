"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "./Container";
import LocaleToggle from "./LocaleToggle";
import { routes, headerRoutes } from "@/lib/routes";
import type { Locale } from "@/lib/i18n";
import type { CommonContent } from "@/lib/content";

export default function Header({
  locale,
  common,
}: {
  locale: Locale;
  common: CommonContent;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ink-black/95 backdrop-blur supports-[backdrop-filter]:bg-ink-black/90 border-b border-gold/15">
      <div className="h-[3px] bg-gradient-to-r from-gold-dark via-gold to-gold-dark" />
      <Container className="flex h-20 md:h-24 items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 md:gap-3 shrink-0 min-w-0"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo.png"
            alt={`${common.siteName} crest`}
            width={52}
            height={48}
            className="h-11 md:h-12 w-auto shrink-0"
            priority
          />
          <span aria-hidden="true" className="hidden sm:block h-9 w-px bg-cream/15" />
          <span className="flex flex-col leading-none min-w-0">
            <span className="font-heading text-base md:text-lg font-semibold tracking-[0.02em] text-cream uppercase truncate">
              {common.siteNameMark}
            </span>
            <span className="hidden sm:block mt-1.5 font-mono text-[10px] tracking-[0.22em] uppercase text-gold">
              {common.estLabel}
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {headerRoutes.map((route) => {
            const href = `/${locale}/${route.slug}`;
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={route.key}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`relative whitespace-nowrap py-1 text-[13px] font-medium tracking-wide transition-colors hover:text-gold ${
                  isActive ? "text-gold" : "text-cream-muted"
                } after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:bg-gold after:origin-left after:transition-transform after:duration-200 ${
                  isActive ? "after:scale-x-100" : "after:scale-x-0"
                }`}
              >
                {common.nav[route.key]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-6 shrink-0">
          <LocaleToggle locale={locale} />
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center bg-gold px-5 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-ink-black hover:bg-gold-light transition-colors"
          >
            {common.headerContactCta}
          </Link>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <LocaleToggle locale={locale} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-cream/20 text-cream shrink-0"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open ? (
        <div className="lg:hidden border-t border-cream/10 bg-ink-black">
          <Container className="py-6 flex flex-col gap-5">
            <nav className="flex flex-col gap-4" aria-label="Primary">
              {routes.map((route) => {
                const href = route.slug ? `/${locale}/${route.slug}` : `/${locale}`;
                const isActive =
                  pathname === href || (route.slug !== "" && pathname.startsWith(`${href}/`));
                return (
                  <Link
                    key={route.key}
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-base font-medium ${isActive ? "text-gold" : "text-cream-muted"}`}
                  >
                    {common.nav[route.key]}
                  </Link>
                );
              })}
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
