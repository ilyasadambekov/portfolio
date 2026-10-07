"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition, type MouseEvent } from "react";
import type { Locale } from "@/i18n/routing";

type LocaleOption = {
  code: Locale;
  name: string;
};

type LocaleSwitcherProps = {
  current: Locale;
  options: readonly LocaleOption[];
  label: string;
};

function swapLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") || `/${locale}`;
}

export function LocaleSwitcher({
  current,
  options,
  label,
}: LocaleSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState(current);
  const [, startTransition] = useTransition();
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.code === active),
  );

  function onSelect(event: MouseEvent<HTMLAnchorElement>, code: Locale) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    if (code === active) return;
    setActive(code);
    startTransition(() => {
      router.push(swapLocale(pathname, code), { scroll: false });
    });
  }

  return (
    <nav aria-label={label}>
      <div className="relative rounded-full border border-line p-0.5">
        <span
          aria-hidden="true"
          className="locale-pill pointer-events-none absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-fg"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
        <ul className="relative grid grid-cols-2">
          {options.map((option) => {
            const isActive = option.code === active;
            return (
              <li key={option.code} className="relative">
                <a
                  href={swapLocale(pathname, option.code)}
                  hrefLang={option.code}
                  lang={option.code}
                  aria-label={option.name}
                  aria-current={option.code === current ? "page" : undefined}
                  onClick={(event) => onSelect(event, option.code)}
                  className={`block rounded-full px-2.5 py-1 text-center font-mono text-[11px] uppercase tracking-wider ${
                    isActive ? "text-bg" : "text-muted hover:text-fg"
                  }`}
                >
                  {option.code}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
