"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { CompoundChart } from "@/components/charts/compound-chart";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Topbar } from "@/components/layout/topbar";

function formatSek(value: number) {
  return value.toLocaleString("sv-SE") + " kr";
}

export default function RaknaPage() {
  const [startCapital, setStartCapital] = useState<number | "">(100000);
  const [monthlySaving, setMonthlySaving] = useState<number | "">(5000);
  const [returnRate, setReturnRate] = useState<number | "">(10);
  const [years, setYears] = useState<number | "">(20);

  const startCapitalValue = startCapital === "" ? 0 : startCapital;
  const monthlySavingValue = monthlySaving === "" ? 0 : monthlySaving;
  const returnRateValue = returnRate === "" ? 0 : returnRate;
  const yearsValue = years === "" ? 0 : years;

  const data = useMemo(() => {
    const chart = [];
    let invested = startCapitalValue;
    let saved = startCapitalValue;

    for (let year = 0; year <= yearsValue; year++) {
      chart.push({
        year,
        invested: Math.round(invested),
        saved: Math.round(saved),
      });

      invested = invested * (1 + returnRateValue / 100) + monthlySavingValue * 12;
      saved += monthlySavingValue * 12;
    }

    return chart;
  }, [startCapitalValue, monthlySavingValue, returnRateValue, yearsValue]);

  const finalInvested = data[data.length - 1]?.invested ?? 0;
  const finalSaved = data[data.length - 1]?.saved ?? 0;
  const difference = finalInvested - finalSaved;
  const totalDeposits = startCapitalValue + monthlySavingValue * 12 * yearsValue;

  return (
    <main className="h-dvh overflow-hidden bg-slate-100 text-slate-950">
      <div className="hidden lg:block">
        <Topbar />
      </div>

      <header className="relative flex h-10 items-center justify-center bg-slate-950 px-4 text-white lg:hidden">
        <Link
          href="/"
          aria-label="Tillbaka till utdelningar"
          className="absolute left-4 flex items-center justify-center text-white transition hover:text-emerald-400"
        >
          <ArrowLeft size={18} />
        </Link>

        <h1 className="text-sm font-black">
          Räkna avkastning
        </h1>
      </header>

      <section className="h-[calc(100dvh-40px)] overflow-y-auto px-2 py-2 pb-[62px] lg:mx-auto lg:h-[calc(100dvh-64px)] lg:max-w-[1520px] lg:overflow-hidden lg:p-4">
        <div className="grid gap-2 lg:h-full lg:grid-cols-[300px_1fr] lg:gap-4">
          <aside className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm lg:h-full lg:p-4">
            <div className="hidden lg:block">
              <h1 className="text-lg font-black">
                Räkna avkastning
              </h1>

              <p className="mt-1 text-xs text-slate-500">
                Se effekten av ränta på ränta över tid
              </p>
            </div>

            <div className="space-y-1.5 lg:mt-4 lg:space-y-3">
              <InputRow
                label="Startkapital"
                suffix="kr"
                value={startCapital}
                onChange={setStartCapital}
              />

              <InputRow
                label="Månadssparande"
                suffix="kr"
                value={monthlySaving}
                onChange={setMonthlySaving}
              />

              <InputRow
                label="Årlig avkastning"
                suffix="%"
                value={returnRate}
                onChange={setReturnRate}
              />

              <InputRow
                label="Antal år"
                suffix="år"
                value={years}
                onChange={setYears}
              />
            </div>
          </aside>

          <section className="grid gap-2 lg:h-full lg:grid-cols-[1fr_260px] lg:grid-rows-[1fr_auto] lg:gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm lg:p-3">
              <h2 className="text-[15px] font-black lg:text-lg">
                Dina pengar i en graf
              </h2>

              <div className="mt-1.5 flex gap-3 text-[9px] font-semibold text-slate-500 lg:text-xs">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Med avkastning
                </span>

                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  Utan avkastning
                </span>
              </div>

              <div className="mt-1 h-[240px] sm:h-[300px] lg:h-[calc(100%-46px)] lg:min-h-[300px]">
                <CompoundChart data={data} />
              </div>
            </div>

            <aside className="hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:block">
              <h2 className="text-base font-black">
                Resultat efter {yearsValue} år
              </h2>

              <div className="mt-5 space-y-4">
                <ResultLine
                  label="Slutvärde"
                  value={formatSek(finalInvested)}
                  green
                />

                <ResultLine
                  label="Bara sparat"
                  value={formatSek(finalSaved)}
                />

                <ResultLine
                  label="Total insättning"
                  value={formatSek(totalDeposits)}
                />

                <ResultLine
                  label="Genomsnittlig avkastning"
                  value={`${returnRateValue.toLocaleString("sv-SE")} %/år`}
                />
              </div>
            </aside>

            <div className="grid grid-cols-2 gap-2 lg:col-span-2 lg:grid-cols-4 lg:gap-3">
              <MobileResult
                title="Med avkastning"
                value={formatSek(finalInvested)}
                green
              />

              <MobileResult
                title="Insättning"
                value={formatSek(totalDeposits)}
              />

              <MobileResult
                title="Utan avkastning"
                value={formatSek(finalSaved)}
              />

              <MobileResult
                title="Skillnad"
                value={"+" + formatSek(difference)}
                green
              />
            </div>

            <div className="hidden rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm lg:col-span-2 lg:block">
              <p className="text-xs text-slate-500">
                Skillnad efter {yearsValue} år
              </p>

              <p className="mt-0.5 text-lg font-black text-emerald-600">
                +{formatSek(difference)} mer med avkastning
              </p>
            </div>
          </section>
        </div>
      </section>

      <MobileBottomNav />
    </main>
  );
}

function InputRow({
  label,
  suffix,
  value,
  onChange,
}: {
  label: string;
  suffix: string;
  value: number | "";
  onChange: (value: number | "") => void;
}) {
  return (
    <label className="flex items-center justify-between gap-2 lg:block">
      <span className="text-[10px] font-bold text-slate-700 lg:text-xs">
        {label}
      </span>

      <div className="flex h-7 w-[120px] items-center rounded-md border border-slate-200 bg-white px-2 lg:mt-1 lg:h-10 lg:w-full lg:rounded-lg lg:px-3">
        <input
          type="number"
          inputMode="decimal"
          value={value === "" ? "" : value}
          onChange={(e) => {
            const nextValue = e.target.value;
            onChange(nextValue === "" ? "" : Number(nextValue));
          }}
          className="w-full bg-transparent text-right text-[11px] font-bold text-slate-950 outline-none lg:text-left lg:text-base"
        />

        <span className="ml-1 text-[9px] font-semibold text-slate-500 lg:text-xs">
          {suffix}
        </span>
      </div>
    </label>
  );
}

function MobileResult({
  title,
  value,
  green = false,
}: {
  title: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm lg:p-3">
      <p className="text-[10px] font-medium text-slate-500 lg:text-xs">
        {title}
      </p>

      <p
        className={`mt-0.5 text-[13px] font-black leading-tight lg:text-base ${
          green ? "text-emerald-600" : "text-slate-950"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function ResultLine({
  label,
  value,
  green = false,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs font-medium text-slate-500">
        {label}
      </span>

      <span
        className={`text-right text-sm font-black ${
          green ? "text-emerald-600" : "text-slate-950"
        }`}
      >
        {value}
      </span>
    </div>
  );
}