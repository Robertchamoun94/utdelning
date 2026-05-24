import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { dividends } from "@/data/dividends";
import { stockContent } from "@/data/stock-content";
import { relatedStocks } from "@/data/related-stocks";
import { stockYields } from "@/data/stock-yields";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Topbar } from "@/components/layout/topbar";
import type { Dividend } from "@/types/dividend";

const SITE_URL = "https://utdelning.nu";

function createStockSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function formatAmount(amount: number, currency: string) {
  return `${amount.toLocaleString("sv-SE", {
    minimumFractionDigits: amount < 1 ? 3 : 2,
    maximumFractionDigits: amount < 1 ? 3 : 2,
  })} ${currency}`;
}

function getStockYield(slug: string) {
  const yieldAliases: Record<string, string> = {
    "h-and-m-b": "hochm-b",
  };

  return stockYields[slug] ?? stockYields[yieldAliases[slug]];
}

function formatDividendYield(slug: string) {
  const stockYield = getStockYield(slug);

  if (!stockYield) {
    return "—";
  }

  return `${stockYield.dividendYield.toLocaleString("sv-SE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} %`;
}


function isLogoUrl(logo: string) {
  return logo.startsWith("http");
}

function getStockEvents(slug: string) {
  return dividends
    .filter((dividend) => createStockSlug(dividend.company) === slug)
    .sort((a, b) => new Date(a.xDate).getTime() - new Date(b.xDate).getTime());
}

export function generateStaticParams() {
  const uniqueSlugs = Array.from(
    new Set(dividends.map((dividend) => createStockSlug(dividend.company)))
  );

  return uniqueSlugs.map((ticker) => ({
    ticker,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ticker: string }>;
}): Promise<Metadata> {
  const { ticker } = await params;
  const stockEvents = getStockEvents(ticker);
  const stock = stockEvents[0];

  if (!stock) {
    return {
      title: "Aktie hittades inte | Utdelning.nu",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${stock.company} utdelning 2026 – X-datum och belopp | Utdelning.nu`;
  const description = `Se ${stock.company} utdelning 2026. Här hittar du X-datum, utdelningsbelopp, direktavkastning och kommande utdelningar för ${stock.ticker}.`;
  const url = `/aktie/${ticker}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${url}`,
      siteName: "Utdelning.nu",
      locale: "sv_SE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function AktiePage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const stockEvents = getStockEvents(ticker);
  const stock = stockEvents[0];
  const content = stockContent[ticker];
  const related = relatedStocks[ticker] ?? [];
  const dividendYield = formatDividendYield(ticker);
  const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: `När är X-datum för ${stock.company}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `X-datum för ${stock.company} är dagen då aktien handlas utan rätt till kommande utdelning. För att ha rätt till utdelningen behöver aktien normalt ägas innan X-datum.`,
      },
    },
    {
      "@type": "Question",
      name: `Hur fungerar utdelningen i ${stock.company}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `Utdelningen i ${stock.company} beslutas vanligtvis av bolagsstämman och påverkas av bolagets lönsamhet, kassaflöde och framtida kapitalbehov.`,
      },
    },
    {
      "@type": "Question",
      name: `Vad påverkar utdelningen i ${stock.company}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `Utdelningsnivån påverkas bland annat av bolagets resultat, kassaflöde, investeringar, skuldsättning och styrelsens kapitalallokering.`,
      },
    },
  ],
};

  if (!stock) {
    notFound();
  }

  return (
    <main className="min-h-dvh bg-slate-100 pb-20 text-slate-950 lg:pb-0">
      <div className="hidden lg:block">
        <Topbar />
      </div>

      <header className="relative flex h-12 items-center justify-center border-b border-slate-800 bg-slate-950 px-4 text-white lg:hidden">
        <Link
          href="/"
          aria-label="Tillbaka till utdelningar"
          className="absolute left-4 flex items-center justify-center text-white transition hover:text-emerald-400"
        >
          <ArrowLeft size={20} />
        </Link>

        <span className="text-sm font-black">Utdelning.nu</span>
      </header>

      <section className="mx-auto max-w-[1100px] px-3 py-3 lg:px-6 lg:py-8">
        <Link
          href="/"
          className="mb-4 hidden w-fit items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-emerald-600 lg:flex"
        >
          <ArrowLeft size={16} />
          Tillbaka till utdelningar
        </Link>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-4 py-5 lg:px-8 lg:py-7">
            <div className="flex items-center gap-4">
              <StockLogo dividend={stock} />

              <div className="min-w-0">
                <h1 className="truncate text-2xl font-black tracking-tight lg:text-4xl">
                  {stock.company} utdelning 2026
                </h1>

                <p className="mt-1 text-sm font-bold text-slate-400 lg:text-base">
                  {stock.ticker}
                </p>
              </div>
            </div>

            <div className="mt-5 max-w-3xl space-y-3 text-sm leading-6 text-slate-600 lg:text-base">
  <p>
    {content?.description ??
      `Här hittar du kommande utdelning för ${stock.company}, inklusive X-datum och utdelningsbelopp. Informationen används för att snabbt se när aktien handlas utan rätt till utdelning.`}
  </p>

  {content?.dividendComment && <p>{content.dividendComment}</p>}
</div>
          </div>

          <div className="grid gap-3 p-4 lg:grid-cols-3 lg:p-8">
            <InfoCard label="Nästa X-datum" value={formatDate(stock.xDate)} green />
            <InfoCard label="Utdelning per aktie" value={formatAmount(stock.amount, stock.currency)} />
            <InfoCard label="Direktavkastning" value={dividendYield} green={dividendYield !== "—"} />
          </div>

          <div className="border-t border-slate-200 p-4 lg:p-8">
            <h2 className="text-lg font-black lg:text-2xl">Kommande utdelningar</h2>

            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="px-4 py-3 text-xs font-bold uppercase text-slate-500">X-datum</th>
                    <th className="px-4 py-3 text-right text-xs font-bold uppercase text-slate-500">Utdelning</th>
                  </tr>
                </thead>

                <tbody>
                  {stockEvents.map((event) => (
                    <tr key={event.id} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-black text-emerald-700">{formatDate(event.xDate)}</td>
                      <td className="px-4 py-3 text-right font-black">{formatAmount(event.amount, event.currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <h2 className="text-base font-black">Vad betyder X-datum?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                X-datum är den första dagen aktien handlas utan rätt till den
                kommande utdelningen. För att ha rätt till utdelningen behöver
                du normalt äga aktien innan X-datum.
              </p>
            </div>
            {content?.businessModel && (
  <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
    <h2 className="text-base font-black">
      Om {stock.company}
    </h2>

    <p className="mt-2 text-sm leading-6 text-slate-600">
      {content.businessModel}
    </p>
  </div>
)}
<div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
  <h2 className="text-lg font-black">
    Vanliga frågor om {stock.company}
  </h2>

  <div className="mt-4 space-y-5">
    <div>
      {related.length > 0 && (
  <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
    <h2 className="text-lg font-black">
      Liknande utdelningsaktier
    </h2>

    <div className="mt-4 flex flex-wrap gap-3">
      {related.map((slug) => (
        <Link
          key={slug}
          href={`/aktie/${slug}`}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100"
        >
          {slug
            .split("-")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ")}
        </Link>
      ))}
    </div>
  </div>
)}
      <h3 className="font-semibold">
        När är X-datum för {stock.company}?
      </h3>

      <p className="mt-1 text-sm leading-6 text-slate-600">
        X-datum för {stock.company} är dagen då aktien handlas utan rätt
        till kommande utdelning. För att ha rätt till utdelningen behöver
        aktien normalt ägas innan X-datum.
      </p>
    </div>

    <div>
      <h3 className="font-semibold">
        Hur fungerar utdelningen i {stock.company}?
      </h3>

      <p className="mt-1 text-sm leading-6 text-slate-600">
        Utdelningen i {stock.company} beslutas vanligtvis av bolagsstämman
        och påverkas av bolagets lönsamhet, kassaflöde och framtida
        kapitalbehov.
      </p>
    </div>

    <div>
      <h3 className="font-semibold">
        Vad påverkar utdelningen i {stock.company}?
      </h3>

      <p className="mt-1 text-sm leading-6 text-slate-600">
        Utdelningsnivån påverkas bland annat av bolagets resultat,
        kassaflöde, investeringar, skuldsättning och styrelsens beslut
        kring kapitalallokering.
      </p>
    </div>
  </div>
</div>
          </div>
        </div>
      </section>

      <MobileBottomNav />
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(faqSchema),
  }}
/>
    </main>
  );
}

function StockLogo({ dividend }: { dividend: Dividend }) {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:h-16 lg:w-16">
      {isLogoUrl(dividend.logo) ? (
        <img src={dividend.logo} alt={`${dividend.company} logotyp`} className="h-full w-full object-contain p-2" />
      ) : (
        <span className="text-lg font-black text-slate-900">{dividend.logo}</span>
      )}
    </div>
  );
}

function InfoCard({ label, value, green = false }: { label: string; value: string; green?: boolean }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
      <p className={`mt-2 text-lg font-black lg:text-xl ${green ? "text-emerald-700" : "text-slate-950"}`}>
        {value}
      </p>
    </div>
  );
}
