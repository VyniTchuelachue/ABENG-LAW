import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Small shared building blocks, so labels, links and buttons look and
 * behave the same on every page. `onDark` switches gold to the brighter
 * tone used on the navy and burgundy bands.
 */

const goldText = (onDark: boolean) => (onDark ? "text-gold" : "text-gold-dark dark:text-gold");

export function Eyebrow({
  children,
  onDark = false,
  className = "",
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return <p className={`eyebrow ${goldText(onDark)} ${className}`}>{children}</p>;
}

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`transition-transform motion-reduce:transition-none ${
        back ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
      }`}
    >
      {back ? "←" : "→"}
    </span>
  );
}

/** Text link with a travelling arrow — "View all", "Read his full profile". */
export function ArrowLink({
  href,
  children,
  onDark = false,
  back = false,
}: {
  href: string;
  children: ReactNode;
  onDark?: boolean;
  back?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group eyebrow inline-flex items-center gap-2 underline-offset-4 hover:underline ${goldText(onDark)}`}
    >
      {back ? <Arrow back /> : null}
      {children}
      {back ? null : <Arrow />}
    </Link>
  );
}

const buttonBase =
  "group eyebrow inline-flex items-center justify-center gap-2 px-6 py-4 transition-colors";

const buttonVariants = {
  /** The primary action. Gold, on any surface. */
  solid: "bg-gold text-ink-black hover:bg-gold-light",
  /** Secondary action on ivory or stone. */
  outline:
    "border border-gold-dark text-gold-dark hover:border-gold hover:bg-gold hover:text-ink-black dark:border-gold dark:text-gold",
  /** Secondary action on a navy or burgundy band. */
  outlineOnDark: "border border-cream/40 text-cream hover:border-gold-light hover:text-gold-light",
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  className?: string;
}) {
  return (
    <Link href={href} className={`${buttonBase} ${buttonVariants[variant]} ${className}`}>
      {children}
      <Arrow />
    </Link>
  );
}

/** Small outlined marker, e.g. the "Illustrative example" note on sample content. */
export function Tag({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <span
      className={`self-start justify-self-start whitespace-nowrap border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${
        onDark ? "border-cream/20 text-cream-muted" : "border-line text-ink-muted"
      }`}
    >
      {children}
    </span>
  );
}

/** The heading block that opens a section: label, title and optional lead. */
export function SectionIntro({
  eyebrow,
  title,
  lead,
  onDark = false,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  onDark?: boolean;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  const heading = (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow> : null}
      <h2
        className={`mt-4 font-heading text-3xl md:text-4xl font-semibold leading-tight ${
          onDark ? "text-cream" : "text-brand dark:text-ink"
        }`}
      >
        {title}
      </h2>
      {lead ? <p className={`mt-4 ${onDark ? "text-cream-muted" : "text-ink-muted"}`}>{lead}</p> : null}
    </div>
  );
  if (!action) return heading;
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      {heading}
      {action}
    </div>
  );
}
