import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function resolveLocale(value: string): Locale {
  if (!hasLocale(routing.locales, value)) notFound();
  return value;
}

export function localeOrDefault(value: string | undefined): Locale {
  return hasLocale(routing.locales, value) ? value : routing.defaultLocale;
}
