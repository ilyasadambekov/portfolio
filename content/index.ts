import type { Locale } from "@/i18n/routing";
import { en } from "./en";
import { facts, type ProjectFactsEntry } from "./facts";
import { ru } from "./ru";
import type { Content, ContactLink, Project, ProjectSlug, Todo } from "./types";

const content: Record<Locale, Content> = { en, ru };

export { facts };
export type { ContactLink, Content, Project, ProjectSlug };

export type ProjectView = ProjectFactsEntry & Project;

export function getContent(locale: Locale): Content {
  return content[locale];
}

export function getProjects(locale: Locale): ProjectView[] {
  return facts.projects.map((project) => ({
    ...project,
    ...content[locale].projects[project.slug],
  }));
}

export function getProject(
  locale: Locale,
  slug: string,
): ProjectView | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

export function isTodo(value: unknown): value is Todo {
  return typeof value === "string" && value.startsWith("[TODO");
}
