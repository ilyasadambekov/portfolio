import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getContent } from "@/content";
import { localePath, routing, type Locale } from "@/i18n/routing";
import { Container } from "./container";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

const sectionIds = [
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
] as const;

export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const content = getContent(locale);
  const localeOptions = routing.locales.map((code) => ({
    code,
    name: t(`Language.${code}`),
  }));

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] backdrop-blur-md"
    >
      <Container className="flex h-14 items-center justify-between gap-4">
        <Link
          href={localePath(locale)}
          className="min-w-0 truncate text-sm font-medium tracking-tight"
        >
          {content.name}
        </Link>
        <nav aria-label={t("Nav.label")} className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm text-muted">
            {sectionIds.map((id) => (
              <li key={id}>
                <Link
                  href={`${localePath(locale)}#${id}`}
                  className="link-draw hover:text-fg"
                >
                  {t(`Nav.${id}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <LocaleSwitcher
            key={locale}
            current={locale}
            options={localeOptions}
            label={t("Header.languageLabel")}
          />
          <ThemeToggle label={t("Header.themeToggle")} />
        </div>
      </Container>
    </header>
  );
}
