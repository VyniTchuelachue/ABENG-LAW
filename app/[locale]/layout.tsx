import type { Metadata } from "next";
import { Playfair_Display, Public_Sans, IBM_Plex_Mono, Pinyon_Script } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const common = getContent("common", locale);
  return {
    title: {
      default: common.siteName,
      template: `%s | ${common.siteName}`,
    },
    icons: {
      icon: "/icon.png",
    },
  };
}

// Prevents a flash of the wrong theme by applying `.dark` before first paint.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const common = getContent("common", locale);
  const contact = getContent("contact", locale);

  return (
    <html
      lang={locale}
      className={`${playfairDisplay.variable} ${publicSans.variable} ${ibmPlexMono.variable} ${pinyonScript.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-body min-h-screen flex flex-col antialiased">
        <Header locale={locale} common={common} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} common={common} contact={contact} />
      </body>
    </html>
  );
}
