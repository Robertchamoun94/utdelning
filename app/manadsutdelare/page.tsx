"use client";

import { useMemo, useState } from "react";
import { dividends } from "@/data/dividends";
import { DividendFilters } from "@/components/dividends/dividend-filters";
import { DividendTable } from "@/components/dividends/dividend-table";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Topbar } from "@/components/layout/topbar";
import type { CountryCode, DividendType } from "@/types/dividend";

export default function ManadsutdelarePage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<"Alla" | CountryCode>("Alla");
  const [type, setType] = useState<"Alla" | DividendType>("Alla");
  const [sector, setSector] = useState("Alla");

  const monthlyDividends = useMemo(() => {
    return dividends.filter((dividend) => dividend.monthlyDividend);
  }, []);

  const sectors = useMemo(() => {
    return Array.from(
      new Set(monthlyDividends.map((dividend) => dividend.sector))
    ).sort();
  }, [monthlyDividends]);

  const filteredDividends = useMemo(() => {
    return monthlyDividends.filter((dividend) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        query.length === 0 ||
        dividend.company.toLowerCase().includes(query) ||
        dividend.ticker.toLowerCase().includes(query) ||
        dividend.isin?.toLowerCase().includes(query);

      const matchesCountry = country === "Alla" || dividend.country === country;
      const matchesType = type === "Alla" || dividend.dividendType === type;
      const matchesSector = sector === "Alla" || dividend.sector === sector;

      return matchesSearch && matchesCountry && matchesType && matchesSector;
    });
  }, [search, country, type, sector, monthlyDividends]);

  return (
    <main className="h-dvh overflow-hidden overflow-x-hidden bg-slate-100 text-slate-950">
      <Topbar search={search} onSearchChange={setSearch} />

      <section className="mx-auto flex h-[calc(100dvh-56px)] max-w-[1520px] flex-col overflow-hidden px-2 py-2 pb-16 lg:h-[calc(100dvh-64px)] lg:px-4 lg:py-4 lg:pb-4">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="shrink-0 border-b border-slate-200 px-4 py-4 lg:px-6 lg:py-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-black leading-tight tracking-tight lg:text-3xl">
                  Månadsutdelare
                </h1>

                <p className="mt-1 text-sm text-slate-500 lg:text-base">
                  Aktier som delar ut varje månad
                </p>
              </div>

              <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 lg:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Visar {filteredDividends.length} av {monthlyDividends.length}
              </div>
            </div>

            <DividendFilters
              search={search}
              country={country}
              type={type}
              sector={sector}
              monthlyOnly={true}
              sectors={sectors}
              onSearchChange={setSearch}
              onCountryChange={setCountry}
              onTypeChange={setType}
              onSectorChange={setSector}
              onMonthlyOnlyChange={() => {}}
            />
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