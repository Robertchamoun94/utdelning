import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";

dotenv.config({ path: ".env.local" });

const token = process.env.EODHD_API_TOKEN;

if (!token) {
  console.error("Saknar EODHD_API_TOKEN i .env.local");
  process.exit(1);
}

const ROOT = process.cwd();
const DIVIDENDS_FILE = path.join(ROOT, "data", "dividends.ts");
const OUTPUT_FILE = path.join(ROOT, "data", "stock-yields.ts");

const MANUAL_SYMBOL_OVERRIDES = {
  "tele2-a": "TEL2-A.ST",
  "tele2-b": "TEL2-B.ST",
  "investor-a": "INVE-A.ST",
  "investor-b": "INVE-B.ST",
  "atlas-copco-a": "ATCO-A.ST",
  "atlas-copco-b": "ATCO-B.ST",
  "assa-abloy-b": "ASSA-B.ST",
  "nibe-industrier-b": "NIBE-B.ST",
  "telia-company": "TELIA.ST",
  "axfood": "AXFO.ST",
};

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/é/g, "e")
    .replace(/ü/g, "u")
    .replace(/&/g, "och")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function tickerToEodhdSymbol(ticker) {
  return `${ticker.trim().replace(/\s+/g, "-")}.ST`;
}

function parseDividendEvents(source) {
  const events = [];
  const objectMatches = source.matchAll(/\{[^{}]*?company:\s*"([^"]+)"[^{}]*?ticker:\s*"([^"]+)"[^{}]*?xDate:\s*"([^"]+)"[^{}]*?amount:\s*([0-9.]+)[^{}]*?\}/g);

  for (const match of objectMatches) {
    const [, company, ticker, xDate, amountRaw] = match;

    events.push({
      company,
      ticker,
      xDate,
      amount: Number(amountRaw),
      slug: slugify(company),
    });
  }

  return events;
}

function summarizeDividends(events) {
  const bySlug = new Map();

  for (const event of events) {
    const existing = bySlug.get(event.slug);

    if (!existing) {
      bySlug.set(event.slug, {
        slug: event.slug,
        company: event.company,
        ticker: event.ticker,
        annualDividend: event.amount,
        dividendEvents: 1,
      });

      continue;
    }

    existing.annualDividend += event.amount;
    existing.dividendEvents += 1;
  }

  return [...bySlug.values()].sort((a, b) =>
    a.company.localeCompare(b.company, "sv")
  );
}

async function fetchLatestPrice(symbol) {
  const url = `https://eodhd.com/api/eod/${symbol}?api_token=${token}&fmt=json&period=d&order=d&limit=1`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Ingen kursdata");
  }

  const latest = data[0];
  const close = Number(latest.adjusted_close ?? latest.close);

  if (!Number.isFinite(close) || close <= 0) {
    throw new Error("Ogiltig kurs");
  }

  return {
    date: latest.date,
    price: close,
  };
}

function round(value, decimals = 2) {
  return Number(value.toFixed(decimals));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const source = await fs.readFile(DIVIDENDS_FILE, "utf8");
  const dividendEvents = parseDividendEvents(source);

  if (dividendEvents.length === 0) {
    console.error("Hittade inga utdelningshändelser i data/dividends.ts");
    process.exit(1);
  }

  const stocks = summarizeDividends(dividendEvents);

  console.log(`Hittade ${dividendEvents.length} utdelningshändelser.`);
  console.log(`Hittade ${stocks.length} unika aktier.\n`);

  const results = {};
  const failed = [];

  for (const stock of stocks) {
    const symbol =
      MANUAL_SYMBOL_OVERRIDES[stock.slug] ?? tickerToEodhdSymbol(stock.ticker);

    try {
      const latest = await fetchLatestPrice(symbol);
      const dividendYield = (stock.annualDividend / latest.price) * 100;

      results[stock.slug] = {
        company: stock.company,
        ticker: stock.ticker,
        eodhdSymbol: symbol,
        price: round(latest.price, 4),
        annualDividend: round(stock.annualDividend, 6),
        dividendYield: round(dividendYield, 2),
        priceDate: latest.date,
        dividendEvents: stock.dividendEvents,
      };

      console.log(
        `OK ${stock.company} (${symbol}) → ${round(dividendYield, 2)}%`
      );
    } catch (error) {
      failed.push({
        company: stock.company,
        ticker: stock.ticker,
        slug: stock.slug,
        symbol,
        error: error.message,
      });

      console.log(`FEL ${stock.company} (${symbol}) → ${error.message}`);
    }

    await sleep(150);
  }

  const generatedAt = new Date().toISOString();

  const output = `// AUTO-GENERERAD FIL.
// Kör: node scripts/update-stock-yields.mjs
// Uppdaterad: ${generatedAt}

export type StockYield = {
  company: string;
  ticker: string;
  eodhdSymbol: string;
  price: number;
  annualDividend: number;
  dividendYield: number;
  priceDate: string;
  dividendEvents: number;
};

export const stockYields: Record<string, StockYield> = ${JSON.stringify(
    results,
    null,
    2
  )};

export const stockYieldsMeta = {
  generatedAt: "${generatedAt}",
  source: "EODHD",
  successful: ${Object.keys(results).length},
  failed: ${failed.length},
  failedSymbols: ${JSON.stringify(failed, null, 2)}
};
`;

  await fs.writeFile(OUTPUT_FILE, output, "utf8");

  console.log("\nKlar.");
  console.log(`Lyckades: ${Object.keys(results).length}`);
  console.log(`Misslyckades: ${failed.length}`);
  console.log(`Skapade: data/stock-yields.ts`);

  if (failed.length > 0) {
    console.log("\nMisslyckade symboler:");
    for (const item of failed) {
      console.log(
        `- ${item.company} | ticker: ${item.ticker} | symbol: ${item.symbol} | slug: ${item.slug}`
      );
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});