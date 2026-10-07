"use client";

import { useLayoutEffect } from "react";

export function ThemeSync() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") root.classList.add(stored);
    } catch {}
  }, []);

  return null;
}
