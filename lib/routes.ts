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
