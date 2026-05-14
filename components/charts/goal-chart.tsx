"use client";

import { useSyncExternalStore } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface GoalChartProps {
  data: {
    year: number;
    capital: number;
    goal: number;
  }[];
}

interface ChartTooltipPayload {
  dataKey?: string;
  value?: number | string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayload[];
  label?: number | string;
}

function formatSek(value: number) {
  return value.toLocaleString("sv-SE") + " kr";
}

function formatCompact(value: number) {
  if (value >= 1_000_000) {
    return `${Number((value / 1_000_000).toFixed(1))
      .toString()
      .replace(".", ",")}M`;
  }

  if (value >= 1_000) {
    return `${Math.round(value / 1_000)}K`;
  }

  return `${value}`;
}

function CustomTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const capital = payload.find((item) => item.dataKey === "capital")?.value;

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-[10px] shadow-lg">
      <p className="font-bold text-slate-950">År {label}</p>
      <p className="mt-1 font-semibold text-emerald-600">
        Kapital: {formatSek(Number(capital))}
      </p>
    </div>
  );
}

function subscribeToResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function subscribeToHydration(callback: () => void) {
  const timer = window.setTimeout(callback, 0);
  return () => window.clearTimeout(timer);
}

export function GoalChart({ data }: GoalChartProps) {
  const isMobile = useSyncExternalStore(
    subscribeToResize,
    () => window.innerWidth < 768,
    () => false
  );
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );

  const maxYear = data[data.length - 1]?.year ?? 20;
  const goal = data[0]?.goal ?? 0;
  const ticks = isMobile ? [0, Math.round(maxYear / 2), maxYear] : data.map((item) => item.year);

  if (!mounted) {
    return <div className="h-full w-full" />;
  }

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: isMobile ? 6 : 12,
            right: isMobile ? 12 : 28,
            bottom: isMobile ? 0 : 8,
            left: isMobile ? -8 : 4,
          }}
        >
          <XAxis
            dataKey="year"
            type="number"
            domain={[0, "dataMax"]}
            ticks={ticks}
            interval={0}
            tick={{ fontSize: isMobile ? 9 : 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value} år`}
          />

          <YAxis
            tick={{ fontSize: isMobile ? 9 : 11 }}
            axisLine={false}
            tickLine={false}
            width={isMobile ? 42 : 54}
            tickFormatter={(value) =>
              isMobile
                ? `${formatCompact(Number(value))} kr`
                : formatCompact(Number(value))
            }
          />

          <Tooltip content={<CustomTooltip />} />

          <ReferenceLine
            y={goal}
            stroke="#94a3b8"
            strokeDasharray="5 5"
          />

          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />

          <Line
            type="monotone"
            dataKey="capital"
            stroke="#10b981"
            strokeWidth={isMobile ? 2.5 : 3}
            strokeLinecap="round"
            dot={false}
            activeDot={{ r: isMobile ? 3 : 4 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
