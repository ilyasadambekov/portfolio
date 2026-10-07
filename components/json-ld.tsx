import { facts, getContent, isTodo } from "@/content";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site";

export function PersonJsonLd({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const sameAs = facts.links
    .filter((link) => ["linkedin", "github", "telegram"].includes(link.id))
    .map((link) => link.href)
    .filter((href) => !isTodo(href));
  const current = facts.roles.find((role) => role.end === null);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.name,
    alternateName: facts.name,
    jobTitle: content.title,
    description: content.about[0],
    url: absoluteUrl(`/${locale}`),
    image: absoluteUrl(`/${locale}/opengraph-image/card`),
    sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: content.city,
      addressCountry: "KZ",
    },
    ...(current
      ? { worksFor: { "@type": "Organization", name: current.company } }
      : {}),
    knowsAbout: content.knowsAbout,
    knowsLanguage: ["en", "ru"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
