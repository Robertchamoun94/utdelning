"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

interface TopbarProps {
  search?: string;
  onSearchChange?: (value: string) => void;
}

export function Topbar({ search = "", onSearchChange }: TopbarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Utdelningskalender",
      href: "/",
    },
    {
      label: "Nyheter",
      href: "/nyheter",
    },
    {
      label: "Räkna avkastning",
      href: "/rakna",
    },
  ];

  return (
    <header className="sticky top-0 z-[90] h-14 border-b border-slate-800 bg-slate-950 lg:h-16">
      <div className="mx-auto flex h-full max-w-[1520px] items-center justify-center gap-4 px-4 lg:justify-between lg:px-7">
        <Link
          href="/"
          className="shrink-0 text-lg font-black tracking-tight lg:text-2xl"
        >
          <span className="text-emerald-500">utdelning</span>
          <span className="text-white">.nu</span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center gap-6 pl-10 lg:flex">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href === "/" && pathname === "/utdelningskalender") ||
              (item.href === "/nyheter" &&
                (pathname.startsWith("/nyheter") ||
                  pathname.startsWith("/makro")));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative whitespace-nowrap text-sm font-semibold transition ${
                  active ? "text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}

                {active && (
                  <span className="absolute -bottom-5 left-0 h-0.5 w-full rounded-full bg-emerald-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <div className="flex h-10 w-[360px] items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 xl:w-[420px]">
            <input
              type="text"
              value={search}
              onChange={(event) => onSearchChange?.(event.target.value)}
              placeholder="Sök aktie, bolag eller ISIN..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />

            <Search size={18} className="text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
