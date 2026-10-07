import type { MetadataRoute } from "next";
import { facts } from "@/content";
import { routing } from "@/i18n/routing";
import { absoluteUrl, languageAlternates } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    ...facts.projects.map((project) => `/projects/${project.slug}`),
  ];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${path}`),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
