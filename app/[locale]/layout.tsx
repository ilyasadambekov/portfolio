import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PersonJsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeSync } from "@/components/theme-sync";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";
import { absoluteUrl, languageAlternates, siteUrl } from "@/lib/site";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const themeScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")d.classList.add(t)}catch(e){}})()`;

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0e" },
  ],
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Meta" });
  const otherLocales = routing.locales.filter((code) => code !== locale);
  const alternateOgLocales = await Promise.all(
    otherLocales.map(async (code) =>
      (await getTranslations({ locale: code, namespace: "Meta" }))("ogLocale"),
    ),
  );

  return {
    metadataBase: new URL(siteUrl),
    title: { default: t("homeTitle"), template: t("titleTemplate") },
    description: t("homeDescription"),
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: languageAlternates(),
    },
    openGraph: {
      type: "profile",
      siteName: t("homeTitle"),
      title: t("homeTitle"),
      description: t("homeDescription"),
      url: absoluteUrl(`/${locale}`),
      locale: t("ogLocale"),
      alternateLocale: alternateOgLocales,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Nav" });

  return (
    <html
      lang={locale}
      dir="ltr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <ThemeSync />
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-fg px-4 py-2 text-sm text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
        >
          {t("skip")}
        </a>
        <SiteHeader locale={locale} />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter locale={locale} />
        <PersonJsonLd locale={locale} />
      </body>
    </html>
  );
}
