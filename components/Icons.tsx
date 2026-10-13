/**
 * Thin line icons (1.4px stroke, currentColor) for the stats strip, practice
 * areas, industries and contact details. Kept as inline SVG so they inherit
 * the surrounding text colour in both light and dark themes.
 *
 * Icons are looked up by name; practice-area and industry slugs from the
 * content files are valid names, either directly or through `aliases`.
 */
import type { ReactNode } from "react";

const paths: Record<string, ReactNode> = {
  // General
  founded: <path d="M4 20h16M5 20V10M19 20V10M9 20v-7M15 20v-7M3 10l9-6 9 6H3z" />,
  practice: (
    <>
      <path d="M12 4v16M8 20h8M5 7h14" />
      <path d="M5 7l-2.5 6a2.5 2.5 0 005 0L5 7zM19 7l-2.5 6a2.5 2.5 0 005 0L19 7z" />
    </>
  ),
  industries: (
    <>
      <path d="M3 20h18M5 20V9l5 3V9l5 3V5h4v15" />
      <path d="M8 16h1M12 16h1M16 16h1" />
    </>
  ),
  global: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.5 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.5-3.5-8.5s1-6 3.5-8.5z" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  phone: (
    <path d="M5 4h3.5l1.5 4.5-2 1.5a11 11 0 006 6l1.5-2 4.5 1.5V19a1.5 1.5 0 01-1.5 1.5C10.5 20.5 3.5 13.5 3.5 5.5A1.5 1.5 0 015 4z" />
  ),
  network: (
    <>
      <circle cx="12" cy="5.5" r="2" />
      <circle cx="5.5" cy="18" r="2" />
      <circle cx="18.5" cy="18" r="2" />
      <path d="M11 7.3l-4.5 8.9M13 7.3l4.5 8.9M7.5 18h9" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.6 13.4L7 20.5l5-2.5 5 2.5-1.6-7.1" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,

  // Practice areas
  "corporate-ohada": (
    <>
      <rect x="3.5" y="7.5" width="17" height="12" rx="1" />
      <path d="M9 7.5V5.5a1 1 0 011-1h4a1 1 0 011 1v2M3.5 12.5h17" />
    </>
  ),
  "mergers-acquisitions": (
    <>
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
    </>
  ),
  "banking-finance": <path d="M3 10l9-5 9 5M4 20h16M6 10v7M10 10v7M14 10v7M18 10v7" />,
  "energy-infrastructure": <path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z" />,
  "tax-customs": (
    <>
      <path d="M7 3.5h8l3 3V20.5H7z" />
      <path d="M15 3.5v3h3M10 11h5M10 14.5h5M10 18h3" />
    </>
  ),
  "regulatory-competition": (
    <>
      <path d="M12 3.5l7.5 3v5c0 4.5-3.2 8-7.5 9-4.3-1-7.5-4.5-7.5-9v-5z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  "compliance-investigations": (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3l5.2 5.2M7.8 10.6l1.9 1.9 3.3-3.6" />
    </>
  ),
  "data-protection-tech": (
    <>
      <rect x="5.5" y="10.5" width="13" height="9.5" rx="1" />
      <path d="M8.5 10.5V8a3.5 3.5 0 017 0v2.5" />
      <circle cx="12" cy="15.2" r="1.2" />
    </>
  ),
  "employment-immigration": (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19.5c.6-3.3 2.8-5 5.5-5s4.9 1.7 5.5 5" />
      <circle cx="16.8" cy="9" r="2.3" />
      <path d="M16.2 14.6c2.3.1 3.9 1.5 4.3 4.4" />
    </>
  ),
  "litigation-arbitration": (
    <>
      <rect x="9.5" y="6.5" width="10" height="5" rx="1" transform="rotate(45 14.5 9)" />
      <path d="M12.7 10.8L4 19.5M12 21h8" />
    </>
  ),
  "debt-recovery-restructuring": (
    <>
      <path d="M4.5 12a7.5 7.5 0 0113-5.1M19.5 12a7.5 7.5 0 01-13 5.1" />
      <path d="M17.6 3.4v3.6H14M6.4 20.6V17H10" />
    </>
  ),
  "intellectual-property": (
    <>
      <path d="M12 3.5a6 6 0 00-3.6 10.8c.6.5.9 1.1.9 1.9v1.3h5.4v-1.3c0-.8.3-1.4.9-1.9A6 6 0 0012 3.5z" />
      <path d="M10 20.5h4" />
    </>
  ),
  "real-estate-construction": <path d="M4 11l8-6.5 8 6.5M6 10v9.5h12V10M10 19.5v-5h4v5" />,
  "environment-health-esg": (
    <path d="M5 19c0-8 5-13 14.5-13.5C19.5 14 15 19 7.5 19H5zM5 19c2.5-4.5 5.5-7 9.5-8.5" />
  ),
  "maritime-transport": (
    <>
      <circle cx="12" cy="5.5" r="2" />
      <path d="M12 7.5v13M8 11h8M4.5 14c.5 4 3.5 6.5 7.5 6.5s7-2.5 7.5-6.5" />
    </>
  ),
  "private-client-succession": (
    <path d="M12 20s-7-4.4-7-9.6A3.9 3.9 0 0112 8a3.9 3.9 0 017 2.4c0 5.2-7 9.6-7 9.6z" />
  ),

  // Industries without a matching practice-area icon
  "oil-gas": <path d="M12 3.5s6 6.3 6 10.5a6 6 0 01-12 0c0-4.2 6-10.5 6-10.5z" />,
  "mining-natural-resources": <path d="M3 19.5l6-10 3.5 5.5 2.5-3.5 6 8H3z" />,
  "telecoms-technology": (
    <>
      <circle cx="12" cy="9" r="1.6" />
      <path d="M12 10.6v9.9M8.2 5.7a5 5 0 000 6.6M15.8 5.7a5 5 0 010 6.6M5.5 3.5a8.5 8.5 0 000 11M18.5 3.5a8.5 8.5 0 010 11" />
    </>
  ),
  "infrastructure-construction": (
    <path d="M3 17.5h18M5 17.5V8M19 17.5V8M5 8c2.5 5 11.5 5 14 0M9 17.5v-4.7M12 17.5v-4M15 17.5v-4.7" />
  ),
  agriculture: (
    <path d="M12 20.5v-9M12 11.5C12 8 9.5 6 5.5 6c0 3.8 2.3 5.5 6.5 5.5zM12 14c0-3 2.3-5 6.5-5 0 3.6-2.3 5-6.5 5z" />
  ),
  healthcare: <path d="M9.5 4.5h5v5h5v5h-5v5h-5v-5h-5v-5h5z" />,
};

const aliases: Record<string, string> = {
  "energy-power": "energy-infrastructure",
  "banking-financial-services": "banking-finance",
  "maritime-logistics": "maritime-transport",
  "real-estate": "real-estate-construction",
  manufacturing: "industries",
  "international-trade-investment": "global",
};

export default function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name] ?? paths[aliases[name]] ?? paths.practice}
    </svg>
  );
}
