import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import { getContent } from "@/content";
import type { Locale } from "@/i18n/routing";
import { ContactLedger } from "./contact-ledger";
import { Container } from "./container";

function order(index: number): CSSProperties {
  return { "--i": index } as CSSProperties;
}

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Hero" });
  const content = getContent(locale);
  const nameParts = content.name.split(" ");

  return (
    <section aria-labelledby="hero-title">
      <Container className="pb-16 pt-14 sm:pb-24 sm:pt-24 lg:pt-32">
        <p
          className="hero-item font-mono text-xs uppercase tracking-[0.14em] text-muted"
          style={order(0)}
        >
          {content.meta.join(" · ")}
        </p>
        <h1
          id="hero-title"
          className="mt-6 text-[clamp(3rem,11vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.045em]"
        >
          {nameParts.map((part, index) => (
            <span
              key={part}
              className="hero-item block"
              style={order(index + 1)}
            >
              {part}
            </span>
          ))}
        </h1>
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <p
              className="hero-item text-xl font-medium tracking-tight sm:text-2xl"
              style={order(3)}
            >
              {content.title}
            </p>
            <p
              className="hero-item mt-3 max-w-[38ch] text-lg leading-relaxed text-muted sm:text-xl"
              style={order(4)}
            >
              {content.pitch}
            </p>
          </div>
          <div className="hero-item lg:col-span-5 lg:self-end" style={order(5)}>
            <h2 className="sr-only">{t("linksLabel")}</h2>
            <ContactLedger locale={locale} auto startIndex={5} />
          </div>
        </div>
      </Container>
    </section>
  );
}
