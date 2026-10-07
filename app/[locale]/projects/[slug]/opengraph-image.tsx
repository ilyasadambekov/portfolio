import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { facts, getProject } from "@/content";
import { routing } from "@/i18n/routing";
import { localeOrDefault, resolveLocale } from "@/lib/locale";
import { ogSize, renderOgCard } from "@/lib/og";

export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    facts.projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = localeOrDefault(rawLocale);
  const project = getProject(locale, slug);
  const t = await getTranslations({ locale, namespace: "Meta" });
  return [
    {
      id: "card",
      alt: project
        ? t("titleTemplate").replace("%s", project.name)
        : t("homeTitle"),
      size: ogSize,
      contentType,
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const project = getProject(locale, slug);
  if (!project) notFound();
  const t = await getTranslations({ locale, namespace: "CaseStudy" });

  return renderOgCard({
    eyebrow: `${project.kind} · ${project.market}`,
    title: project.name,
    body: project.summary,
    rows: [[t("stack"), project.stack.slice(0, 4).join(" · ")]],
  });
}
