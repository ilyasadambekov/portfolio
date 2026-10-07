import { getTranslations } from "next-intl/server";
import { facts, getContent } from "@/content";
import type { Locale } from "@/i18n/routing";
import { formatMonthYear } from "@/lib/site";
import { LedgerRow } from "./ledger-row";
import { Reveal } from "./reveal";
import { Section } from "./section";

export async function ExperienceLedger({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Experience" });
  const content = getContent(locale);

  return (
    <Section id="experience" number="02" title={content.sections.experience}>
      <ol>
        {facts.roles.map((role, index) => {
          const text = content.roles[index];
          const isCurrent = role.end === null;
          const start = formatMonthYear(locale, role.start);
          const end = role.end
            ? formatMonthYear(locale, role.end)
            : t("present");

          return (
            <Reveal
              as="li"
              key={role.company}
              index={index}
              className="border-b border-line py-8 first:pt-0"
            >
              <LedgerRow
                label={
                  <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
                    {role.company}
                  </h3>
                }
                value={
                  <span className="pill tnum inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted sm:text-xs">
                    <span>
                      {start} — {end}
                    </span>
                    {isCurrent ? (
                      <>
                        <span aria-hidden="true" className="live-dot" />
                        <span className="sr-only">{t("current")}</span>
                      </>
                    ) : null}
                  </span>
                }
              />
              <p className="mt-2 text-muted">
                <span className="text-fg">{text.title}</span> · {text.product}
              </p>
              <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {text.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 leading-relaxed">
                    <span aria-hidden="true" className="font-mono text-muted">
                      —
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
