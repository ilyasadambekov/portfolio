import { getTranslations } from "next-intl/server";
import { facts, getContent, isTodo } from "@/content";
import type { Locale } from "@/i18n/routing";
import { ContactLedger } from "./contact-ledger";
import { Reveal } from "./reveal";
import { Section } from "./section";

export async function Contact({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Contact" });
  const content = getContent(locale);
  const email = facts.links.find((link) => link.id === "email");

  return (
    <Section id="contact" number="05" title={content.sections.contact}>
      <Reveal>
        <p className="max-w-[24ch] text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
          {t("lead")}
        </p>
      </Reveal>
      {email ? (
        <Reveal index={1} className="mt-8">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            {t("emailLabel")}
          </p>
          {isTodo(email.href) ? (
            <p className="mt-2 text-3xl font-medium tracking-tight text-muted sm:text-5xl">
              {email.display}
            </p>
          ) : (
            <a
              href={email.href}
              className="link-draw mt-2 inline-block text-[clamp(1.5rem,7vw,3rem)] font-medium tracking-tight [overflow-wrap:anywhere]"
            >
              {email.display}
            </a>
          )}
        </Reveal>
      ) : null}
      <Reveal index={2} className="mt-12 max-w-xl">
        <ContactLedger locale={locale} exclude="email" />
      </Reveal>
    </Section>
  );
}
