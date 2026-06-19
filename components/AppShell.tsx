"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import {
  LayoutGrid,
  Clock,
  ScrollText,
  Cpu,
  DollarSign,
  Users,
  Search,
  HelpCircle,
  ShieldCheck,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { Avatar } from "./ui";

const groups: {
  label: string;
  items: { href: string; label: string; icon: LucideIcon }[];
}[] = [
  {
    label: "Monitor",
    items: [
      { href: "/", label: "Overview", icon: LayoutGrid },
      { href: "/attendance", label: "Attendance", icon: Clock },
      { href: "/logs", label: "Access Logs", icon: ScrollText },
      { href: "/devices", label: "Devices", icon: Cpu },
    ],
  },
  {
    label: "Payroll",
    items: [
      { href: "/payouts", label: "Payouts", icon: DollarSign },
      { href: "/employees", label: "Employees", icon: Users },
    ],
  },
  {
    label: "System",
    items: [{ href: "/audit", label: "Audit Log", icon: ShieldCheck }],
  },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const isActive = (href: string) =>
    href === "/" ? path === "/" : path.startsWith(href);

  const today = new Date(2026, 5, 19);
  const dd = today.getDate();
  const wd = today.toLocaleDateString("en-US", { weekday: "short" });
  const mo = today.toLocaleDateString("en-US", { month: "long" });

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col px-4 py-5 lg:flex">
        <Link href="/" className="flex items-center px-1">
          <Image
            src="/mercury-logo.png"
            alt="Mercury — Empowering you with technology"
            width={329}
            height={61}
            priority
            className="h-auto w-[190px]"
          />
        </Link>

        <div className="mt-6 flex items-center gap-2.5 rounded-xl2 bg-card px-4 py-3 shadow-card">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-soft text-accent">
            <HelpCircle size={16} />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-ink">Need help?</div>
            <div className="text-xs text-muted">Just ask me anything!</div>
          </div>
        </div>

        <nav className="mt-6 flex-1 space-y-6 overflow-y-auto">
          {groups.map((g) => (
            <div key={g.label}>
              <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                {g.label}
              </div>
              <div className="space-y-1">
                {g.items.map((it) => {
                  const active = isActive(it.href);
                  const Icon = it.icon;
                  return (
                    <Link
                      key={it.href}
                      href={it.href}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                        active
                          ? "bg-navy font-semibold text-white"
                          : "text-muted hover:bg-card hover:text-ink"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={active ? "text-accent" : ""}
                      />
                      {it.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Contact developer */}
        <div className="mt-4 overflow-hidden rounded-xl2 bg-gradient-to-br from-navy to-slate2 p-4 text-white">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Mail size={15} className="text-accent" /> Contact developer
          </div>
          <p className="mt-1 text-xs text-white/70">
            Found a bug or need a new feature? Reach the dev team.
          </p>
          <a
            href="mailto:dev@mercury.co.ug?subject=Mercury%20Biometrics%20support"
            className="mt-3 block rounded-full bg-accent px-3 py-2 text-center text-xs font-semibold text-white"
          >
            dev@mercury.co.ug
          </a>
        </div>
      </aside>

      {/* Right column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center gap-4 px-6 py-4">
          <div className="hidden flex-1 items-center gap-2 rounded-full border border-line bg-card px-4 py-2.5 text-sm text-muted shadow-card md:flex">
            <Search size={16} />
            <input
              className="w-full bg-transparent outline-none"
              placeholder="Search people, devices, transactions…"
            />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 shadow-card">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-canvas text-sm font-bold text-ink">
                {dd}
              </span>
              <div className="pr-1 text-xs leading-tight">
                <div className="font-semibold text-ink">{wd},</div>
                <div className="text-muted">{mo}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-full border border-line bg-card py-1 pl-1 pr-3 shadow-card">
              <Avatar name="A Kessler" color="#1f2a3c" size={30} />
              <div className="leading-tight">
                <div className="text-[13px] font-semibold text-ink">A. Kessler</div>
                <div className="text-[11px] text-muted">Security Admin</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 pb-10">{children}</main>
      </div>
    </div>
  );
}
