import Link from "next/link";
import type { ProjectView } from "@/content";
import { localePath, type Locale } from "@/i18n/routing";
import { ProjectCover } from "./project-cover";

type ProjectCardProps = {
  locale: Locale;
  project: ProjectView;
  openLabel: string;
  slotLabel: string;
};

export function ProjectCard({
  locale,
  project,
  openLabel,
  slotLabel,
}: ProjectCardProps) {
  return (
    <article className="card relative h-full cursor-pointer">
      <div className="card-lift flex h-full flex-col">
        <ProjectCover
          media={project.media}
          alt={project.coverAlt}
          label={slotLabel}
        />
        <p className="mt-5 flex items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <span>{project.kind}</span>
          <span className="text-right">{project.market}</span>
        </p>
        <h3 className="mt-2 text-2xl font-medium tracking-tight">
          <Link
            href={localePath(locale, `/projects/${project.slug}`)}
            transitionTypes={["nav-forward"]}
            className="before:absolute before:inset-0 before:z-10 before:content-['']"
          >
            <span className="link-draw">{project.name}</span>
          </Link>
        </h3>
        <p className="mt-2 leading-relaxed text-muted">{project.summary}</p>
        <p aria-hidden="true" className="mt-auto pt-6 text-sm font-medium">
          {openLabel} <span className="arrow">→</span>
        </p>
      </div>
    </article>
  );
}
