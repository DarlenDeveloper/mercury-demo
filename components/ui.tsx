import { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl2 bg-card shadow-card ${className}`}>{children}</div>
  );
}

export function CardHead({
  title,
  icon,
  right,
  subtitle,
}: {
  title: string;
  icon?: ReactNode;
  right?: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 px-5 pt-5">
      <div className="flex items-center gap-2.5">
        {icon && (
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent-soft text-accent">
            {icon}
          </span>
        )}
        <div>
          <h3 className="text-[15px] font-semibold leading-tight text-ink">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
        </div>
      </div>
      {right}
    </div>
  );
}

export function Avatar({
  name,
  color,
  size = 32,
}: {
  name: string;
  color?: string;
  size?: number;
}) {
  const initials =
    name === "Unknown"
      ? "?"
      : name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();
  return (
    <span
      className="grid place-items-center rounded-full font-semibold text-white"
      style={{
        width: size,
        height: size,
        background: color ?? "#2f3c52",
        fontSize: size * 0.36,
      }}
    >
      {initials}
    </span>
  );
}

const tones: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-600",
  orange: "bg-accent-soft text-accent",
  red: "bg-rose-50 text-rose-500",
  amber: "bg-amber-50 text-amber-600",
  slate: "bg-slate-100 text-slate-500",
  blue: "bg-blue-50 text-blue-600",
};

export function Badge({
  children,
  tone = "slate",
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function SegTabs({ tabs, active }: { tabs: string[]; active: string }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-canvas p-1">
      {tabs.map((t) => (
        <button
          key={t}
          className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
            t === active
              ? "bg-navy text-white shadow-sm"
              : "text-muted hover:text-ink"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
