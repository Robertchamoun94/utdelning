import { dividends } from "@/data/dividends";
import type { Dividend } from "@/types/dividend";

function parseDateOnly(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getTodayDateOnly() {
  const stockholmDate = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Stockholm",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  return parseDateOnly(stockholmDate);
}

function isUpcomingDividend(dividend: Dividend) {
  return parseDateOnly(dividend.xDate) >= getTodayDateOnly();
}

function sortByXDate(a: Dividend, b: Dividend) {
  return parseDateOnly(a.xDate).getTime() - parseDateOnly(b.xDate).getTime();
}

export async function fetchUpcomingDividends(): Promise<Dividend[]> {
  return dividends
    .filter(isUpcomingDividend)
    .sort(sortByXDate);
}
