"use client";

import Link from "next/link";
import { useLayoutEffect, type ReactNode } from "react";

const storageKey = "return-to-section";

type BackLinkProps = {
  href: string;
  section: string;
  className?: string;
  children: ReactNode;
};

export function SectionBackLink({
  href,
  section,
  className,
  children,
}: BackLinkProps) {
  return (
    <Link
      href={href}
      scroll={false}
      transitionTypes={["nav-back"]}
      className={className}
      onNavigate={() => {
        try {
          sessionStorage.setItem(storageKey, section);
        } catch {}
      }}
    >
      {children}
    </Link>
  );
}

export function SectionRestore() {
  useLayoutEffect(() => {
    let section: string | null = null;
    try {
      section = sessionStorage.getItem(storageKey);
      sessionStorage.removeItem(storageKey);
    } catch {}
    if (section) {
      document.getElementById(section)?.scrollIntoView({ behavior: "instant" });
    }
  }, []);

  return null;
}
