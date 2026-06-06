"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator,
  CalendarClock,
  Newspaper,
} from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();

  const items = [
    {
      label: "Utdelningskalender",
      href: "/",
      icon: CalendarClock,
    },
    {
      label: "Nyheter",
      href: "/nyheter",
      icon: Newspaper,
    },
    {
      label: "Räkna Avkastning",
      href: "/rakna",
      icon: Calculator,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950 lg:hidden">
      <div className="grid h-16 grid-cols-3">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href === "/" && pathname === "/utdelningskalender") ||
            (item.href === "/nyheter" &&
              (pathname.startsWith("/nyheter") || pathname.startsWith("/makro")));
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 text-[11px] font-semibold transition ${
                active ? "text-emerald-500" : "text-slate-300"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
