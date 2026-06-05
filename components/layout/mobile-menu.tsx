"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    label: "Nyheter",
    href: "/",
  },
  {
    label: "Utdelningskalender",
    href: "/utdelningskalender",
  },
  {
    label: "Räkna avkastning",
    href: "/rakna",
  },
  {
    label: "Integritetspolicy",
    href: "/integritetspolicy",
  },
  {
    label: "Kontakt",
    href: "/kontakt",
  },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Öppna meny"
        className="fixed right-4 top-3 z-[95] flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-slate-950 text-white shadow-lg lg:hidden"
      >
        <Menu size={20} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm lg:hidden">
          <div className="absolute right-4 top-4 w-[calc(100%-2rem)] max-w-sm rounded-3xl border border-slate-800 bg-slate-950 p-5 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-lg font-black tracking-tight"
              >
                <span className="text-emerald-500">utdelning</span>
                <span>.nu</span>
              </Link>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Stäng meny"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mt-6 grid gap-2">
              {navItems.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href === "/" &&
                    (pathname === "/" || pathname.startsWith("/makro")));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-sm font-black transition ${
                      active
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-slate-900 text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
