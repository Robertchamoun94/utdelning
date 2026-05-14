export type CountryCode = "SE";

export type MarketSegment = "Sverige";

export type DividendType = "Utdelning";

export type DividendStatus = "confirmed" | "estimated" | "unknown";

export interface DividendEvent {
  id: number;
  company: string;
  ticker: string;
  xDate: string;
  payoutDate: string;
  amount: number;
  dividendType: DividendType;

  status?: DividendStatus;
  source?: string;
  lastUpdated?: string;
}

export interface Dividend {
  id: number;
  company: string;
  ticker: string;
  isin?: string;

  country: CountryCode;
  countryLabel: string;
  flag: string;

  market: MarketSegment;
  sector: string;

  xDate: string;
  payoutDate: string;

  amount: number;
  currency: "SEK";
  dividendType: DividendType;

  status: DividendStatus;
  source: string;
  lastUpdated: string;

  monthlyDividend: boolean;
  logo: string;
}