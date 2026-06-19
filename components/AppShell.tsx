"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Avatar } from "./ui";

const nav = [
  { href: "/", label: "Dashboard" },
  { href: "/employees", label: "Employees" },
  { href: "/attendance", label: "Attendance" },
  { href: "/logs", label: "Access Logs" },
  { href: "/payouts", label: "Payouts" },
  { href: "/devices", label: "Devices" },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const isActive = (href: string) =>
    href === "/" ? path === "/" : path.startsWith(href);

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-line/70 bg-canvas/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-6 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-amber-400 text-white">
              ◉
            </span>
            <span className="text-[17px] font-bold tracking-tight text-ink">
              Mercury
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-full px-3.5 py-1.5 text-sm transition ${
                  isActive(n.href)
                    ? "font-semibold text-ink"
                    : "text-muted hover:text-ink"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <button className="rounded-full border border-line bg-card px-3.5 py-1.5 text-sm text-muted hover:text-ink">
              🔔 Alerts
            </button>
            <div className="flex items-center gap-2.5 rounded-full border border-line bg-card py-1 pl-1 pr-3">
              <Avatar name="A Kessler" color="#1f2a3c" size={28} />
              <div className="leading-tight">
                <div className="text-[13px] font-semibold text-ink">A. Kessler</div>
                <div className="text-[11px] text-muted">Security Admin</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-6">{children}</main>
    </div>
  );
}
