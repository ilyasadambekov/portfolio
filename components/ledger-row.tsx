import type { CSSProperties, ReactNode } from "react";

type LedgerRowProps = {
  label: ReactNode;
  value: ReactNode;
  auto?: boolean;
  index?: number;
  className?: string;
};

export function LedgerRow({
  label,
  value,
  auto = false,
  index = 0,
  className = "",
}: LedgerRowProps) {
  return (
    <div
      className={`flex items-baseline ${className}`}
      style={{ "--i": index } as CSSProperties}
    >
      <span className="shrink-0">{label}</span>
      <span
        aria-hidden="true"
        className={auto ? "leader leader-auto" : "leader"}
      />
      <span className="min-w-0 shrink-0 text-right">{value}</span>
    </div>
  );
}
