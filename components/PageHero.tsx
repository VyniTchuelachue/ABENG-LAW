import Image from "next/image";
import Container from "./Container";

/**
 * The dark title band that opens every inner page: an optional kicker,
 * the page's H1 and an optional lead, over the decorative library image
 * used in the home hero (uncaptioned — it is a generic stock image, not
 * the Firm's office).
 */
export default function PageHero({
  title,
  lead,
  kicker,
}: {
  title: string;
  lead?: string;
  kicker?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-black">
      <Image
        src="/images/law-library-generic.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[75%_30%] opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-black via-ink-black/85 to-ink-black/40" />
      <Container className="relative py-16 md:py-24">
        <div className="max-w-3xl">
          {kicker ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{kicker}</p>
          ) : null}
          <h1 className="mt-4 font-heading text-4xl md:text-5xl font-bold text-cream leading-tight">
            {title}
          </h1>
          {lead ? <p className="mt-5 max-w-2xl text-lg text-cream-muted">{lead}</p> : null}
          <span aria-hidden="true" className="mt-8 block h-px w-16 bg-gold" />
        </div>
      </Container>
    </section>
  );
}
