import { getContent } from "@/content";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function About({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const [lead, ...rest] = content.about;

  return (
    <Section id="about" number="01" title={content.sections.about}>
      <Reveal>
        <p className="max-w-[30ch] text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
          {lead}
        </p>
      </Reveal>
      <div className="mt-8 grid gap-6 text-muted sm:grid-cols-2 sm:gap-8">
        {rest.map((paragraph, index) => (
          <Reveal key={paragraph} index={index + 1}>
            <p className="leading-relaxed">{paragraph}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
