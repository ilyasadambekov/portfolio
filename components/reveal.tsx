"use client";

import {
  useId,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";

type RevealTag = "div" | "li" | "article" | "section" | "header";

type RevealProps = {
  as?: RevealTag;
  index?: number;
  className?: string;
  children: ReactNode;
};

const seen = new Set<string>();
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target as HTMLElement;
        target.setAttribute("data-in-view", "");
        const key = target.dataset.revealKey;
        if (key) seen.add(key);
        observer?.unobserve(target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  return observer;
}

export function Reveal({
  as = "div",
  index = 0,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const key = useId();

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (seen.has(key)) {
      element.setAttribute("data-in-view", "");
      return;
    }
    const io = getObserver();
    io.observe(element);
    return () => io.unobserve(element);
  }, [key]);

  const Tag = as;

  return (
    <Tag
      ref={ref as Ref<never>}
      className={className}
      data-reveal=""
      data-reveal-key={key}
      style={{ "--i": index } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
