export const routes = [
  { slug: "", key: "home" },
  { slug: "about", key: "about" },
  { slug: "people", key: "people" },
  { slug: "expertise", key: "expertise" },
  { slug: "industries", key: "industries" },
  { slug: "experience", key: "experience" },
  { slug: "international", key: "international" },
  { slug: "insights", key: "insights" },
  { slug: "careers", key: "careers" },
  { slug: "contact", key: "contact" },
] as const;

export type NavKey = (typeof routes)[number]["key"];

/**
 * The persistent header nav is intentionally short (a premium-firm pattern):
 * the remaining pages (People, Experience, International, Contact) stay
 * reachable from the homepage's own section-by-section narrative and from
 * the footer's full sitemap.
 */
export const headerRoutes = [
  { slug: "about", key: "about" },
  { slug: "expertise", key: "expertise" },
  { slug: "industries", key: "industries" },
  { slug: "insights", key: "insights" },
  { slug: "careers", key: "careers" },
] as const satisfies readonly (typeof routes)[number][];
