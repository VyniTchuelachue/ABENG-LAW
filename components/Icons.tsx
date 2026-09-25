/**
 * Thin line icons (1.5px stroke, currentColor) used for the stats strip,
 * practice-area cards and contact details. Kept as inline SVG so they
 * inherit the surrounding text colour in both light and dark themes.
 */
import type { ReactNode } from "react";

const paths: Record<string, ReactNode> = {
  founded: (
    <>
      <path d="M4 20h16M5 20V10M19 20V10M9 20v-7M15 20v-7M3 10l9-6 9 6H3z" />
    </>
  ),
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
  "corporate-ohada": (
    <>
      <rect x="3.5" y="7.5" width="17" height="12" rx="1" />
      <path d="M9 7.5V5.5a1 1 0 011-1h4a1 1 0 011 1v2M3.5 12.5h17" />
    </>
  ),
  "banking-finance": (
    <>
      <path d="M3 10l9-5 9 5M4 20h16M6 10v7M10 10v7M14 10v7M18 10v7" />
    </>
  ),
  "tax-customs": (
    <>
      <path d="M7 3.5h8l3 3V20.5H7z" />
      <path d="M15 3.5v3h3M10 11h5M10 14.5h5M10 18h3" />
    </>
  ),
  "litigation-arbitration": (
    <>
      <rect x="9.5" y="6.5" width="10" height="5" rx="1" transform="rotate(45 14.5 9)" />
      <path d="M12.7 10.8L4 19.5M12 21h8" />
    </>
  ),
  "mergers-acquisitions": (
    <>
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
    </>
  ),
  "regulatory-competition": (
    <>
      <path d="M12 3.5l7.5 3v5c0 4.5-3.2 8-7.5 9-4.3-1-7.5-4.5-7.5-9v-5z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  phone: (
    <>
      <path d="M5 4h3.5l1.5 4.5-2 1.5a11 11 0 006 6l1.5-2 4.5 1.5V19a1.5 1.5 0 01-1.5 1.5C10.5 20.5 3.5 13.5 3.5 5.5A1.5 1.5 0 015 4z" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5.5" r="2" />
      <circle cx="5.5" cy="18" r="2" />
      <circle cx="18.5" cy="18" r="2" />
      <path d="M11 7.3l-4.5 8.9M13 7.3l4.5 8.9M7.5 18h9" />
    </>
  ),
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
      {paths[name] ?? paths.practice}
    </svg>
  );
}
