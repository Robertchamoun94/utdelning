"use client";

import { useMemo, useState } from "react";
import { DividendTable } from "@/components/dividends/dividend-table";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Topbar } from "@/components/layout/topbar";
import type { Dividend } from "@/types/dividend";

interface DividendDashboardProps {
  dividends: Dividend[];
}

export function DividendDashboard({ dividends }: DividendDashboardProps) {
  const [search, setSearch] = useState("");

  const filteredDividends = useMemo(() => {
    return dividends.filter((dividend) => {
      const query = search.toLowerCase().trim();

      return (
        query.length === 0 ||
        dividend.company.toLowerCase().includes(query) ||
        dividend.ticker.toLowerCase().includes(query) ||
        dividend.isin?.toLowerCase().includes(query)
      );
    });
  }, [dividends, search]);

  return (
    <main className="h-dvh overflow-hidden overflow-x-hidden bg-slate-100 text-slate-950">
      <Topbar search={search} onSearchChange={setSearch} />

      <section className="mx-auto flex h-[calc(100dvh-56px)] max-w-[1520px] flex-col overflow-hidden px-2 py-2 pb-16 lg:h-[calc(100dvh-64px)] lg:px-4 lg:py-4 lg:pb-4">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="shrink-0 border-b border-slate-200 bg-white px-4 py-3 lg:px-6 lg:py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-black leading-tight tracking-tight lg:text-2xl">
                  Kommande utdelningar
                </h1>

                <p className="mt-1 text-xs text-slate-500 lg:text-sm">
                  Alla aktier som delar ut inom närmaste tiden
                </p>
              </div>

              <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 lg:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Visar {filteredDividends.length} av {dividends.length}
              </div>
            </div>

            <div className="mt-3 flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 lg:hidden">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Sök aktie..."
                className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden px-3 pb-3 pt-3 lg:px-6 lg:pb-4">
            <DividendTable dividends={filteredDividends} />
          </div>
        </div>
      </section>

      <MobileBottomNav />
    </main>
  );
}