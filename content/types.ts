import type { StaticImageData } from "next/image";

export type Todo = `[TODO${string}]`;

export type YearMonth =
  `${number}-${"01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12"}`;

export type ProjectSlug =
  "nimble" | "infinity-flowers" | "zakazbuketov" | "priglos";

export type ContactId = "linkedin" | "github" | "telegram" | "email" | "cv";

export type ContactLink = {
  id: ContactId;
  href: string | Todo;
  display: string | Todo;
};

export type MediaAsset =
  | { kind: "image"; image: StaticImageData }
  | { kind: "video"; poster: StaticImageData; mp4: string; webm?: string };

export type MediaSlot = {
  device: "desktop" | "phone";
  asset: MediaAsset | null;
};

export type ProjectMedia =
  | { layout: "phones"; slots: readonly MediaSlot[] }
  | { layout: "desktop+phone"; slots: readonly [MediaSlot, MediaSlot] };

export type ProjectFacts = {
  slug: ProjectSlug;
  name: string;
  live: { href: string; display: string } | Todo;
  stack: readonly string[];
  media: ProjectMedia;
};

export type RoleFacts = {
  company: string;
  start: YearMonth;
  end: YearMonth | null;
};

export type Facts = {
  name: string;
  links: readonly ContactLink[];
  roles: readonly RoleFacts[];
  projects: readonly ProjectFacts[];
};

export type Role = {
  title: string;
  product: string;
  highlights: readonly string[];
};

export type Project = {
  summary: string;
  market: string;
  kind: string;
  roleTitle: string;
  company: string;
  problem: string;
  role: string;
  related?: { slug: ProjectSlug; text: string };
  featuresIntro?: string;
  features: readonly string[];
  coverAlt: string;
  mediaAlt: readonly string[];
};

export type SkillGroup = {
  title: string;
  items: readonly string[];
};

export type ContactLabels = Record<ContactId, string>;

export type Content = {
  name: string;
  title: string;
  city: string;
  pitch: string;
  meta: readonly string[];
  about: readonly string[];
  roles: readonly Role[];
  projects: Record<ProjectSlug, Project>;
  skills: readonly SkillGroup[];
  contactLabels: ContactLabels;
  sections: {
    about: string;
    experience: string;
    projects: string;
    skills: string;
    contact: string;
  };
  knowsAbout: readonly string[];
};
