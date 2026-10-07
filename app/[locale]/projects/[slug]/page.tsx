import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { CSSProperties } from "react";
import { PageTransition } from "@/components/page-transition";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { ProjectMedia } from "@/components/project-media";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SectionBackLink } from "@/components/section-return";
import { facts as allFacts, getProject, getProjects, isTodo } from "@/content";
import { localePath } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";
import { absoluteUrl, languageAlternates } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return allFacts.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const project = getProject(locale, slug);
  if (!project) notFound();
  const path = `/projects/${project.slug}`;

  return {
    title: project.name,
    description: project.summary,
    alternates: {
      canonical: absoluteUrl(`/${locale}${path}`),
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "article",
      title: project.name,
      description: project.summary,
      url: absoluteUrl(`/${locale}${path}`),
    },
  };
}

function order(index: number): CSSProperties {
  return { "--i": index } as CSSProperties;
}

export default async function ProjectPage({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  setRequestLocale(locale);
  const project = getProject(locale, slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "CaseStudy" });
  const live = isTodo(project.live) ? null : project.live;
  const related = project.related;
  const label = "font-mono text-xs uppercase tracking-[0.14em] text-muted";
  const facts: { key: string; label: string; value: string; todo: boolean }[] =
    [
      {
        key: "role",
        label: t("roleLabel"),
        value: project.roleTitle,
        todo: false,
      },
      {
        key: "company",
        label: t("company"),
        value: project.company,
        todo: false,
      },
      { key: "market", label: t("market"), value: project.market, todo: false },
    ];
  const projects = getProjects(locale);
  const next =
    projects[
      (projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length
    ];

  return (
    <PageTransition>
      <ScrollToTop />
      <article>
        <Container className="pt-10 sm:pt-16">
          <div className="hero-item" style={order(0)}>
            <SectionBackLink
              href={localePath(locale)}
              section="projects"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg"
            >
              <span aria-hidden="true" className="arrow-back">
                ←
              </span>
              {t("back")}
            </SectionBackLink>
          </div>

          <header className="mt-10 sm:mt-14">
            <p
              className="hero-item font-mono text-xs uppercase tracking-[0.14em] text-muted"
              style={order(1)}
            >
              {project.kind} · {project.market}
            </p>
            <h1 className="mt-4 w-fit text-[clamp(2.5rem,8vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.04em]">
              {project.name}
            </h1>
            <p
              className="hero-item mt-6 max-w-[48ch] text-lg leading-relaxed text-muted sm:text-xl"
              style={order(2)}
            >
              {project.summary}
            </p>
          </header>

          <div className="mt-10 sm:mt-14">
            <ProjectMedia
              media={project.media}
              alts={project.mediaAlt}
              fallbackAlt={project.coverAlt}
              labels={{ desktop: t("slotDesktop"), phone: t("slotPhone") }}
            />
          </div>
        </Container>

        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
            <Reveal className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
              <dl className="font-mono text-sm">
                {facts.map((fact) => (
                  <div
                    key={fact.key}
                    className="flex items-baseline border-b border-line py-2.5"
                  >
                    <dt className="shrink-0 text-muted">{fact.label}</dt>
                    <dd className="flex min-w-0 flex-1 items-baseline justify-end">
                      <span aria-hidden="true" className="leader" />
                      <span
                        className={`tnum text-right ${fact.todo ? "text-muted" : ""}`}
                      >
                        {fact.value}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
              {live ? (
                <a
                  href={live.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity duration-(--dur-fast) hover:opacity-85"
                >
                  {t("visit")}
                  <span aria-hidden="true" className="arrow">
                    ↗
                  </span>
                  <span className="sr-only"> ({live.display})</span>
                </a>
              ) : null}
            </Reveal>

            <div className="space-y-14 lg:col-span-8">
              <Reveal as="section">
                <h2 className={label}>{t("problem")}</h2>
                <p className="mt-4 text-xl leading-relaxed tracking-tight sm:text-2xl">
                  {project.problem}
                </p>
              </Reveal>
              <Reveal as="section">
                <h2 className={label}>{t("role")}</h2>
                <p className="mt-4 leading-relaxed">{project.role}</p>
                {related ? (
                  <p className="mt-4 text-sm">
                    <Link
                      href={localePath(locale, `/projects/${related.slug}`)}
                      transitionTypes={["nav-forward"]}
                      className="link-draw inline-flex gap-1.5 text-muted hover:text-fg"
                    >
                      {related.text}
                      <span aria-hidden="true" className="arrow">
                        →
                      </span>
                    </Link>
                  </p>
                ) : null}
              </Reveal>
              <Reveal as="section">
                <h2 className={label}>{t("features")}</h2>
                {project.featuresIntro ? (
                  <p className="mt-4 leading-relaxed text-muted">
                    {project.featuresIntro}
                  </p>
                ) : null}
                <ol className="mt-4">
                  {project.features.map((feature, index) => (
                    <li
                      key={feature}
                      className="flex gap-4 border-b border-line py-3 leading-relaxed"
                    >
                      <span
                        aria-hidden="true"
                        className="tnum pt-0.5 font-mono text-xs text-muted"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
              <Reveal as="section">
                <h2 className={label}>{t("stack")}</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-3 py-1 font-mono text-xs"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>

        {next ? (
          <Container>
            <Link
              href={localePath(locale, `/projects/${next.slug}`)}
              transitionTypes={["nav-forward"]}
              className="card group flex flex-col gap-2 border-t border-line py-10 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {t("next")}
              </span>
              <span className="text-3xl font-medium tracking-tight sm:text-4xl">
                {next.name}{" "}
                <span aria-hidden="true" className="arrow">
                  →
                </span>
              </span>
            </Link>
          </Container>
        ) : null}
      </article>
    </PageTransition>
  );
}
