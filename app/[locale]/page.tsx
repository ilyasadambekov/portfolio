import { setRequestLocale } from "next-intl/server";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { ExperienceLedger } from "@/components/experience-ledger";
import { Hero } from "@/components/hero";
import { PageTransition } from "@/components/page-transition";
import { Projects } from "@/components/projects";
import { SectionRestore } from "@/components/section-return";
import { Skills } from "@/components/skills";
import { resolveLocale } from "@/lib/locale";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);

  return (
    <PageTransition>
      <SectionRestore />
      <Hero locale={locale} />
      <About locale={locale} />
      <ExperienceLedger locale={locale} />
      <Projects locale={locale} />
      <Skills locale={locale} />
      <Contact locale={locale} />
    </PageTransition>
  );
}
