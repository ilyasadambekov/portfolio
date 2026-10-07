"use client";

type ThemeToggleProps = {
  label: string;
};

function applyTheme() {
  const root = document.documentElement;
  const isDark =
    root.classList.contains("dark") ||
    (!root.classList.contains("light") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  const next = isDark ? "light" : "dark";
  root.classList.remove("light", "dark");
  root.classList.add(next);
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

export function ThemeToggle({ label }: ThemeToggleProps) {
  function toggle() {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!reduce && typeof document.startViewTransition === "function") {
      document.startViewTransition(applyTheme);
    } else {
      applyTheme();
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative inline-flex size-9 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-fg"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="theme-icon theme-icon-sun absolute size-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="theme-icon theme-icon-moon absolute size-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      >
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
    </button>
  );
}
