import enCommon from "@/content/en/common.json";
import frCommon from "@/content/fr/common.json";
import enHome from "@/content/en/home.json";
import frHome from "@/content/fr/home.json";
import enAbout from "@/content/en/about.json";
import frAbout from "@/content/fr/about.json";
import enPeople from "@/content/en/people.json";
import frPeople from "@/content/fr/people.json";
import enExpertise from "@/content/en/expertise.json";
import frExpertise from "@/content/fr/expertise.json";
import enIndustries from "@/content/en/industries.json";
import frIndustries from "@/content/fr/industries.json";
import enExperience from "@/content/en/experience.json";
import frExperience from "@/content/fr/experience.json";
import enInternational from "@/content/en/international.json";
import frInternational from "@/content/fr/international.json";
import enInsights from "@/content/en/insights.json";
import frInsights from "@/content/fr/insights.json";
import enCareers from "@/content/en/careers.json";
import frCareers from "@/content/fr/careers.json";
import enContact from "@/content/en/contact.json";
import frContact from "@/content/fr/contact.json";

import type { Locale } from "./i18n";

/**
 * Static, per-locale content registry. This is the single point where
 * marketing copy is swapped in from JSON today and would be swapped for a
 * CMS client later, without touching any page component.
 */
const registry = {
  common: { en: enCommon, fr: frCommon },
  home: { en: enHome, fr: frHome },
  about: { en: enAbout, fr: frAbout },
  people: { en: enPeople, fr: frPeople },
  expertise: { en: enExpertise, fr: frExpertise },
  industries: { en: enIndustries, fr: frIndustries },
  experience: { en: enExperience, fr: frExperience },
  international: { en: enInternational, fr: frInternational },
  insights: { en: enInsights, fr: frInsights },
  careers: { en: enCareers, fr: frCareers },
  contact: { en: enContact, fr: frContact },
} as const;

export type Page = keyof typeof registry;

export function getContent<P extends Page>(
  page: P,
  locale: Locale
): (typeof registry)[P][Locale] {
  return registry[page][locale];
}

export type CommonContent = ReturnType<typeof getContent<"common">>;

/**
 * The `people.json` `members` array mixes one fully-populated entry with
 * several all-`null` placeholder entries. TypeScript infers a JSON array
 * like that as a union of distinct per-element literal shapes rather than
 * one shape with per-field unions, which breaks straightforward narrowing
 * (e.g. `if (member.image) { member.name }` can resolve to `never`). This
 * explicit type is what every member object actually conforms to, so
 * consumers get real per-field nullability instead of that literal-union
 * inference.
 */
export interface TeamMember {
  slug: string | null;
  name: string | null;
  role: string;
  image: string | null;
  imageAlt: string | null;
  linkedinUrl: string | null;
  bio: string[] | null;
  practiceAreasNote: string | null;
  practiceAreas: string[] | null;
  qualifications: string[] | null;
  barAdmission: string | null;
  experience: string[] | null;
  memberships: string[] | null;
  publications: string[] | null;
  languages: string[] | null;
}

export function getTeamMembers(locale: Locale): TeamMember[] {
  return getContent("people", locale).members as TeamMember[];
}
