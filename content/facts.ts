import infinityFlowersDesktop from "@/assets/projects/infinity-flowers-desktop.png";
import infinityFlowersMobile from "@/assets/projects/infinity-flowers-mobile.png";
import nimble1 from "@/assets/projects/nimble1.png";
import nimble2 from "@/assets/projects/nimble2.png";
import nimble3 from "@/assets/projects/nimble3.png";
import priglos1 from "@/assets/projects/priglos1.png";
import priglos2 from "@/assets/projects/priglos2.png";
import priglos3 from "@/assets/projects/priglos3.png";
import zakazbuketovDesktop from "@/assets/projects/zakazbuketov-desktop.png";
import zakazbuketovMobile from "@/assets/projects/zakazbuketov-mobile.png";
import type { Facts } from "./types";

export const facts = {
  name: "Ilyas Adambekov",
  links: [
    {
      id: "linkedin",
      href: "https://www.linkedin.com/in/ilyasadambekov",
      display: "linkedin.com/in/ilyasadambekov",
    },
    {
      id: "github",
      href: "https://github.com/ilyasadambekov",
      display: "github.com/ilyasadambekov",
    },
    { id: "telegram", href: "https://t.me/mrcssxx", display: "t.me/mrcssxx" },
    {
      id: "email",
      href: "mailto:adambekover@gmail.com",
      display: "adambekover@gmail.com",
    },
    {
      id: "cv",
      href: "/cv/cv.pdf",
    },
  ],
  roles: [
    { company: "Nimble", start: "2025-12", end: null },
    { company: "Miracalyze", start: "2023-12", end: "2026-09" },
    { company: "Geeko Invest", start: "2022-06", end: "2023-12" },
  ],
  projects: [
    {
      slug: "nimble",
      name: "Nimble",
      live: { href: "https://nimblepay.co", display: "nimblepay.co" },
      stack: ["React", "TypeScript", "TanStack Query", "Valtio", "i18next"],
      media: {
        layout: "phones",
        slots: [
          { device: "phone", asset: { kind: "image", image: nimble1 } },
          { device: "phone", asset: { kind: "image", image: nimble2 } },
          { device: "phone", asset: { kind: "image", image: nimble3 } },
        ],
      },
    },
    {
      slug: "infinity-flowers",
      name: "Infinity Flowers",
      live: {
        href: "https://infinityflowers.ae",
        display: "infinityflowers.ae",
      },
      stack: [
        "Next.js",
        "TypeScript",
        "TanStack Query",
        "Zustand",
        "Tailwind CSS",
      ],
      media: {
        layout: "desktop+phone",
        slots: [
          {
            device: "desktop",
            asset: { kind: "image", image: infinityFlowersDesktop },
          },
          {
            device: "phone",
            asset: { kind: "image", image: infinityFlowersMobile },
          },
        ],
      },
    },
    {
      slug: "zakazbuketov",
      name: "ZakazBuketov.kz",
      live: { href: "https://zakazbuketov.kz", display: "zakazbuketov.kz" },
      stack: [
        "Next.js",
        "TypeScript",
        "TanStack Query",
        "Zustand",
        "Tailwind CSS",
      ],
      media: {
        layout: "desktop+phone",
        slots: [
          {
            device: "desktop",
            asset: { kind: "image", image: zakazbuketovDesktop },
          },
          {
            device: "phone",
            asset: { kind: "image", image: zakazbuketovMobile },
          },
        ],
      },
    },
    {
      slug: "priglos",
      name: "Priglos.kz",
      live: { href: "https://priglos.kz", display: "priglos.kz" },
      stack: ["React", "TypeScript", "Vite", "MobX", "i18next"],
      media: {
        layout: "phones",
        slots: [
          { device: "phone", asset: { kind: "image", image: priglos1 } },
          { device: "phone", asset: { kind: "image", image: priglos2 } },
          { device: "phone", asset: { kind: "image", image: priglos3 } },
        ],
      },
    },
  ],
} as const satisfies Facts;

export type ProjectFactsEntry = (typeof facts.projects)[number];
