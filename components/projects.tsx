import { getTranslations } from "next-intl/server";
import { getContent, getProjects } from "@/content";
import type { Locale } from "@/i18n/routing";
import { ProjectCard } from "./project-card";
import { Reveal } from "./reveal";
import { Section } from "./section";

export async function Projects({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Projects" });
  const content = getContent(locale);
  const projects = getProjects(locale);

  return (
    <Section id="projects" number="03" title={content.sections.projects}>
      <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal
            as="li"
            key={project.slug}
            index={index % 2}
            className="h-full"
          >
            <ProjectCard
              locale={locale}
              project={project}
              openLabel={t("open")}
              slotLabel={t("screenshotTodo")}
            />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
