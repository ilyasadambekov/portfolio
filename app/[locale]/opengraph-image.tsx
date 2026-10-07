import { getTranslations } from "next-intl/server";
import { getContent } from "@/content";
import { routing } from "@/i18n/routing";
import { localeOrDefault, resolveLocale } from "@/lib/locale";
import { ogSize, renderOgCard } from "@/lib/og";

export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = localeOrDefault((await params).locale);
  const t = await getTranslations({ locale, namespace: "Meta" });
  return [{ id: "card", alt: t("homeTitle"), size: ogSize, contentType }];
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const content = getContent(locale);

  return renderOgCard({
    eyebrow: `${content.title} · ${content.city}`,
    title: content.name,
    body: content.pitch,
    rows: [[content.meta[1] ?? content.title, content.meta[0] ?? ""]],
  });
}
