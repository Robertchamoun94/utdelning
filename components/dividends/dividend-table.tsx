import Link from "next/link";
import type { Dividend } from "@/types/dividend";
import { stockYields } from "@/data/stock-yields";

interface DividendTableProps {
  dividends: Dividend[];
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatAmount(amount: number, currency: string) {
  return `${amount.toLocaleString("sv-SE", {
    minimumFractionDigits: amount < 1 ? 3 : 2,
    maximumFractionDigits: amount < 1 ? 3 : 2,
  })} ${currency}`;
}

function isLogoUrl(logo: string) {
  return logo.startsWith("http");
}

export function createStockSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getStockYield(company: string) {
  const slug = createStockSlug(company);

  const yieldAliases: Record<string, string> = {
    "h-and-m-b": "hochm-b",
  };

  return stockYields[slug] ?? stockYields[yieldAliases[slug]];
}

function formatDividendYield(company: string) {
  const stockYield = getStockYield(company);

  if (!stockYield) {
    return "—";
  }

  return `${stockYield.dividendYield.toLocaleString("sv-SE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} %`;
}


function StockLogo({ dividend }: { dividend: Dividend }) {
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition group-hover:border-emerald-200 group-hover:shadow-md lg:h-9 lg:w-9 lg:rounded-lg">
      {isLogoUrl(dividend.logo) ? (
        <img
          src={dividend.logo}
          alt={`${dividend.company} logotyp`}
          className="h-full w-full object-contain p-1"
          loading="lazy"
        />
      ) : (
        <span className="text-[10px] font-black text-slate-900 lg:text-xs">
          {dividend.logo}
        </span>
      )}
    </div>
  );
}

function SeoTextBlock() {
  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:mt-8 lg:p-8">
      <div className="max-w-5xl">
        <h2 className="text-xl font-black tracking-tight text-slate-950 lg:text-2xl">
          Utdelningskalender för svenska aktier
        </h2>

        <div className="mt-4 grid gap-4 text-sm leading-7 text-slate-600 lg:grid-cols-2 lg:text-base">
          <div>
            <p>
              Här hittar du kommande utdelningar, X-datum och utdelningsbelopp
              för svenska aktier. Tabellen är byggd för att snabbt visa vilka
              bolag som delar ut inom den närmaste tiden och göra det enklare
              att planera utdelningar i portföljen.
            </p>
          </div>

          <div>
            <p>
              X-datum är den första dagen då aktien handlas utan rätt till den
              kommande utdelningen. För att ha rätt till utdelningen behöver du
              normalt äga aktien innan X-datum. Utdelningsdatumet är dagen då
              pengarna vanligtvis betalas ut till aktieägarna.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="font-black text-slate-950">X-datum</div>
            <p className="mt-1">Datumet då aktien handlas utan utdelning.</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="font-black text-slate-950">Utdelning</div>
            <p className="mt-1">Beloppet per aktie som bolaget delar ut.</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="font-black text-slate-950">Aktiesida</div>
            <p className="mt-1">Klicka på en aktie för mer information.</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="font-black text-slate-950">Planering</div>
            <p className="mt-1">Se vilka utdelningar som ligger närmast.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DividendTable({ dividends }: DividendTableProps) {
  const sortedDividends = [...dividends].sort(
    (a, b) => new Date(a.xDate).getTime() - new Date(b.xDate).getTime()
  );

  if (sortedDividends.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-slate-200 bg-white">
        <div className="text-center">
          <p className="text-sm font-bold text-slate-700">
            Inga utdelningar hittades
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Testa att ändra sökning eller filter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-full w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="h-full overflow-auto">
          <table className="w-full table-fixed border-collapse text-xs lg:table-auto lg:text-sm">
            <thead className="sticky top-0 z-20 bg-slate-50 shadow-[0_1px_0_0_rgba(226,232,240,1)]">
              <tr className="text-left">
                <th className="w-[82px] px-2 py-2 text-[10px] font-bold uppercase text-slate-500 lg:w-[170px] lg:px-4 lg:py-3 lg:text-sm">
                  X-datum
                </th>

                <th className="px-2 py-2 text-[10px] font-bold uppercase text-slate-500 lg:w-[420px] lg:px-4 lg:py-3 lg:text-sm">
                  Aktie
                </th>

                <th className="hidden w-[130px] px-2 py-2 text-[10px] font-bold uppercase text-slate-500 sm:table-cell lg:w-[170px] lg:px-4 lg:py-3 lg:text-sm">
                  Direktavk.
                </th>

                <th className="w-[96px] px-2 py-2 text-right text-[10px] font-bold uppercase text-slate-500 lg:w-[180px] lg:px-4 lg:py-3 lg:text-left lg:text-sm">
                  Utdelning
                </th>
              </tr>
            </thead>

            <tbody>
              {sortedDividends.map((dividend) => {
                const href = `/aktie/${createStockSlug(dividend.company)}`;

                return (
                  <tr
                    key={dividend.id}
                    className="group border-b border-slate-100 transition-all duration-200 hover:bg-emerald-50/40"
                  >
                    <td className="whitespace-nowrap px-2 py-2 lg:px-4 lg:py-3">
                      <Link
                        href={href}
                        aria-label={`Visa aktiesida för ${dividend.company}`}
                        className="block cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                      >
                        <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-black text-emerald-700 transition group-hover:bg-emerald-100 lg:px-3 lg:py-1.5 lg:text-base">
                          {formatDate(dividend.xDate)}
                        </span>
                      </Link>
                    </td>

                    <td className="min-w-0 px-2 py-2 lg:px-4 lg:py-3">
                      <Link
                        href={href}
                        className="flex min-w-0 cursor-pointer items-center gap-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 lg:gap-3"
                      >
                        <StockLogo dividend={dividend} />

                        <div className="min-w-0">
                          <div className="truncate text-xs font-black leading-tight text-slate-950 transition group-hover:text-emerald-800 lg:text-base">
                            {dividend.company}
                          </div>
                          <div className="truncate text-[10px] font-medium leading-tight text-slate-400 lg:text-xs">
                            {dividend.ticker}
                          </div>

                          <div className="mt-1 w-fit rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-black text-emerald-700 sm:hidden">
  Direkt avkastning: {formatDividendYield(dividend.company)}
</div>
                        </div>
                      </Link>
                    </td>

                    <td className="hidden whitespace-nowrap px-2 py-2 sm:table-cell lg:px-4 lg:py-3">
                      <Link
                        href={href}
                        aria-label={`Visa aktiesida för ${dividend.company}`}
                        className="block cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                      >
                        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-black text-emerald-700 transition group-hover:bg-emerald-100 group-hover:shadow-sm lg:px-3 lg:py-1.5 lg:text-base">
                          {formatDividendYield(dividend.company)}
                        </span>
                      </Link>
                    </td>

                    <td className="whitespace-nowrap px-2 py-2 text-right lg:px-4 lg:py-3 lg:text-left">
                      <Link
                        href={href}
                        aria-label={`Visa aktiesida för ${dividend.company}`}
                        className="block cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                      >
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-black text-slate-950 transition group-hover:bg-white group-hover:shadow-sm lg:px-3 lg:py-1.5 lg:text-base">
                          {formatAmount(dividend.amount, dividend.currency)}
                        </span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <SeoTextBlock />
    </>
  );
}
