import { dividends } from "@/data/dividends";
import type { Dividend } from "@/types/dividend";

function isUpcomingDividend(dividend: Dividend) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const xDate = new Date(dividend.xDate);
  xDate.setHours(0, 0, 0, 0);

  return xDate >= today;
}

function sortByXDate(a: Dividend, b: Dividend) {
  return new Date(a.xDate).getTime() - new Date(b.xDate).getTime();
}

export async function fetchUpcomingDividends(): Promise<Dividend[]> {
  return dividends
    .filter(isUpcomingDividend)
    .sort(sortByXDate);
}