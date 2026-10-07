import { getContent } from "@/content";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function Skills({ locale }: { locale: Locale }) {
  const content = getContent(locale);

  return (
    <Section id="skills" number="04" title={content.sections.skills} wide>
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {content.skills.map((group, index) => (
          <Reveal key={group.title} index={index}>
            <h3 className="flex items-baseline justify-between border-b border-fg pb-2 font-mono text-xs uppercase tracking-[0.14em]">
              <span>{group.title}</span>
              <span className="tnum text-muted">×{group.items.length}</span>
            </h3>
            <ul>
              {group.items.map((item) => (
                <li key={item} className="border-b border-line py-2.5">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
