import { getTranslations } from "next-intl/server";
import { getContent } from "@/content";
import type { Locale } from "@/i18n/routing";
import { Container } from "./container";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Footer" });
  const content = getContent(locale);

  return (
    <footer>
      <Container>
        <div className="flex flex-col gap-2 border-t border-line py-8 font-mono text-xs text-muted sm:flex-row sm:justify-between">
          <p className="tnum">
            {t("rights", {
              year: new Date().getFullYear(),
              name: content.name,
            })}
          </p>
          <p>{t("source")}</p>
        </div>
      </Container>
    </footer>
  );
}
