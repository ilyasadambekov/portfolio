import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path}`;
}

export function languageAlternates(path = ""): Record<string, string> {
  const entries = routing.locales.map(
    (locale) => [locale, absoluteUrl(`/${locale}${path}`)] as const,
  );
  return {
    ...Object.fromEntries(entries),
    "x-default": absoluteUrl(`/${routing.defaultLocale}${path}`),
  };
}

const monthYearCache = new Map<Locale, Intl.DateTimeFormat>();

export function formatMonthYear(locale: Locale, value: string): string {
  let formatter = monthYearCache.get(locale);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
    monthYearCache.set(locale, formatter);
  }
  const parts = formatter.formatToParts(new Date(`${value}-01T00:00:00Z`));
  const month = parts.find((part) => part.type === "month")?.value ?? "";
  const year = parts.find((part) => part.type === "year")?.value ?? "";
  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`;
}
