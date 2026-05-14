"use client";

import { useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import type { DividendType } from "@/types/dividend";

interface DividendFiltersProps {
  search: string;
  type: "Alla" | DividendType;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: "Alla" | DividendType) => void;
}

const filterOptions: Array<"Alla" | DividendType> = [
  "Alla",
  "Utdelning",
];

function getLabel(value: "Alla" | DividendType) {
  if (value === "Alla") return "Alla typer";
  return value;
}

export function DividendFilters({
  search,
  type,
  onSearchChange,
  onTypeChange,
}: DividendFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3 space-y-2 lg:mt-4">
      <div className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 lg:hidden">
        <Search size={15} className="text-slate-400" />

        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Sök aktie..."
          className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="relative w-fit">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-9 min-w-[150px] items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-800 shadow-sm transition hover:border-emerald-300 hover:bg-slate-50"
        >
          <span>{getLabel(type)}</span>
          <ChevronDown
            size={16}
            className={`text-slate-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute left-0 top-11 z-50 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-xl">
            {filterOptions.map((option) => {
              const active = option === type;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onTypeChange(option);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-bold transition ${
                    active
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{getLabel(option)}</span>

                  {active && <Check size={16} className="text-emerald-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}