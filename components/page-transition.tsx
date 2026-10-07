import { ViewTransition, type ReactNode } from "react";

const directions = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
};

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={directions} exit={directions} default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
