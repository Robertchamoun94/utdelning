import {
  BarChart3,
  Calendar,
  Coins,
  TrendingUp,
} from "lucide-react";
import type { Dividend } from "@/types/dividend";

interface DividendStatsProps {
  dividends: Dividend[];
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function DividendStats({ dividends }: DividendStatsProps) {
  const sortedDividends = [...dividends].sort(
    (a, b) => new Date(a.xDate).getTime() - new Date(b.xDate).getTime()
  );
  const nextDividend = sortedDividends[0];
  const averageAmount =
    dividends.length > 0
      ? dividends.reduce((sum, dividend) => sum + dividend.amount, 0) / dividends.length
      : 0;
  const totalAmount = dividends.reduce((sum, dividend) => sum + dividend.amount, 0);

  return (
    <div className="hidden shrink-0 grid-cols-4 gap-0 border-t border-slate-200 bg-white px-6 py-3 lg:grid">
      <div className="flex items-center gap-4 border-r border-slate-200 px-8">
        <Calendar className="text-slate-400" size={24} />

        <div>
          <p className="text-xs text-slate-500">
            Nästa utdelning
          </p>

          <p className="text-sm font-bold">
            {nextDividend ? formatDate(nextDividend.xDate) : "-"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 border-r border-slate-200 px-8">
        <BarChart3 className="text-slate-400" size={24} />

        <div>
          <p className="text-xs text-slate-500">
            Antal utdelningar
          </p>

          <p className="text-sm font-bold">
            {dividends.length} st
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 border-r border-slate-200 px-8">
        <TrendingUp className="text-slate-400" size={24} />

        <div>
          <p className="text-xs text-slate-500">
            Snittutdelning
          </p>

          <p className="text-sm font-bold">
            {averageAmount.toLocaleString("sv-SE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            kr
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 px-8">
        <Coins className="text-slate-400" size={24} />

        <div>
          <p className="text-xs text-slate-500">
            Total utdelning nästa 30 dagar
          </p>

          <p className="text-sm font-bold">
            {totalAmount.toLocaleString("sv-SE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            kr
          </p>
        </div>
      </div>
    </div>
  );
}
