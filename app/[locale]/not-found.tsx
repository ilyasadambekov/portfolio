import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { localePath } from "@/i18n/routing";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "NotFound" });

  return (
    <Container className="py-24 sm:py-32">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        404
      </p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-muted">{t("body")}</p>
      <Link
        href={localePath(locale)}
        className="link-draw mt-8 inline-flex gap-2"
      >
        <span aria-hidden="true" className="arrow-back">
          ←
        </span>
        {t("back")}
      </Link>
    </Container>
  );
}
