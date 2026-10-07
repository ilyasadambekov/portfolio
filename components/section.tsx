import type { ReactNode } from "react";
import { Container } from "./container";
import { Reveal } from "./reveal";

type SectionProps = {
  id: string;
  number: string;
  title: string;
  wide?: boolean;
  children: ReactNode;
};

export function Section({
  id,
  number,
  title,
  wide = false,
  children,
}: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <Container>
        <div className="grid gap-8 border-t border-line py-16 sm:py-24 lg:grid-cols-12 lg:gap-6">
          <Reveal
            className={
              wide
                ? "lg:col-span-12"
                : "lg:sticky lg:top-24 lg:col-span-3 lg:self-start"
            }
          >
            <h2
              id={`${id}-title`}
              className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.14em] text-muted"
            >
              <span className="tnum">{number}</span>
              <span className="text-fg">{title}</span>
            </h2>
          </Reveal>
          <div
            className={
              wide ? "min-w-0 lg:col-span-12" : "min-w-0 lg:col-span-9"
            }
          >
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
