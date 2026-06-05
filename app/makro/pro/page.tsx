import Link from "next/link";
import {
  ArrowLeft,
  Lock,
  Gauge,
  LineChart,
  ShieldAlert,
  TrendingUp,
  Activity,
  CheckCircle2,
  Zap,
  AlertTriangle,
  Target,
  BarChart3,
} from "lucide-react";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Topbar } from "@/components/layout/topbar";

export const metadata = {
  title: "Makro Pro Dashboard | Utdelning.nu",
  description:
    "Makro Pro visar makrostatus, ledande indikatorer, kreditstress, likviditet och entry-signaler samlat i en tydlig dashboard.",
};

const PATREON_URL = "https://www.patreon.com/utdelningnu";

const summary = [
  {
    label: "Snabb Makro",
    value: "0,145",
    status: "Neutral",
    detail: "Svag bias",
    color: "emerald",
  },
  {
    label: "Lagg Makro",
    value: "0,25",
    status: "Neutral",
    detail: "Ekonomin växer, selektiv risk",
    color: "amber",
  },
  {
    label: "Total Score",
    value: "0,187",
    status: "Neutral",
    detail: "Balanserad makrobild",
    color: "yellow",
  },
];

const position = [
  { label: "Position", value: "60–80% – Neutral risk", icon: Target },
  { label: "Varnings signaler", value: "Ingen varning", icon: CheckCircle2 },
];

const marketStatus = [
  "Neutral / bullish bias – förbättring",
  "Expansion – stabil tillväxt",
  "Transition – chop market, selektiv risk",
  "Bullish bias – upptrend dominerar",
];

const snabbIndicators = [
  {
    name: "Realräntor / likviditet",
    value: "0,26",
    score: "2",
    status: "Strong Risk-On",
    comment: "Låga realräntor och stödjande likviditet.",
    tone: "green",
  },
  {
    name: "DXY global funding",
    value: "0,73",
    score: "-1",
    status: "Risk-Off",
    comment: "Starkare dollar kan strama åt global likviditet.",
    tone: "orange",
  },
  {
    name: "Financial Conditions",
    value: "-0,044",
    score: "0",
    status: "Neutral",
    comment: "Stabila finansiella förhållanden.",
    tone: "yellow",
  },
  {
    name: "MOVE Bond Volatility",
    value: "8,55",
    score: "-2",
    status: "Strong Risk-Off",
    comment: "Kraftig volatilitet i räntemarknaden.",
    tone: "red",
  },
  {
    name: "VIX Equity Volatility",
    value: "-2,22",
    score: "0",
    status: "Neutral",
    comment: "Ingen tydlig signal från aktievolatilitet.",
    tone: "yellow",
  },
  {
    name: "Yield Curve / Policy turn",
    value: "0,27",
    score: "2",
    status: "Strong Risk-On",
    comment: "Förbättrad policy- och tillväxtförväntan.",
    tone: "green",
  },
    {
    name: "HY OAS Spreads Kreditrisk",
    value: "-0,06",
    score: "0",
    status: "Neutral",
    comment: "Stabil kredit miljö. Ingen tydlig signal",
    tone: "yellow",
  },
      {
    name: "FED Futures Policy Expectations",
    value: "-1,24",
    score: "0",
    status: "Neutral",
    comment: "Små förändringar i policyförväntan.",
    tone: "yellow",
  },
  {
    name: "Global Liquidity",
    value: "0,44",
    score: "0",
    status: "Neutral",
    comment: "Stabil global likviditet, ingen tydlig impuls.",
    tone: "yellow",
  },
  {
    name: "China Credit Impulse",
    value: "-36,9",
    score: "-2",
    status: "Strong Risk-Off",
    comment: "Kreditkontraktion i Kina ökar global risk.",
    tone: "red",
  },
    {
    name: "U.S Treasury RRP+TGA",
    value: "-$33B",
    score: "0",
    status: "Neutral",
    comment: "Svag likviditetsinjektion, Svag riskON bias.",
    tone: "yellow",
  },
  {
    name: "ETF inflows",
    value: "38,98",
    score: "2",
    status: "Strong Risk-On",
    comment: "Starka inflöden visar hög riskaptit.",
    tone: "green",
  },
  {
    name: "CoT positioning",
    value: "-140",
    score: "2",
    status: "Strong Risk-On",
    comment: "Extrem positionering kan skapa squeeze-risk.",
    tone: "green",
  },
    {
    name: "FED-Balance sheet",
    value: "$10B",
    score: "0",
    status: "Neutral",
    comment: "Liten likviditetseffekt i FED-Balansräkningen.",
    tone: "yellow",
  },
];


const laggIndicators = [
  {
    category: "Tillväxt & Aktivitet",
    name: "GDP QoQ",
    value: "2",
    score: "2",
    status: "Risk On",
    comment: "Bra för marknaden – signalerar starkare ekonomisk aktivitet.",
    tone: "green",
  },
  {
    category: "Tillväxt & Aktivitet",
    name: "Retail Sales MoM",
    value: "0,5",
    score: "1",
    status: "Risk On",
    comment: "Positiv konsumtionssignal som stödjer konjunkturbilden.",
    tone: "green",
  },
  {
    category: "Tillväxt & Aktivitet",
    name: "LEI 6m trend",
    value: "-0,6",
    score: "-1",
    status: "Risk Neutral",
    comment: "Svagare ledande indikator – avvakta tydligare förbättring.",
    tone: "yellow",
  },
  {
    category: "Tillväxt & Aktivitet",
    name: "ISM Manufacturing PMI",
    value: "52,7",
    score: "2",
    status: "Risk On",
    comment: "Tillverkningsaktiviteten ligger på en nivå som stödjer risk.",
    tone: "green",
  },
  {
    category: "Tillväxt & Aktivitet",
    name: "ISM Services PMI",
    value: "53,6",
    score: "2",
    status: "Risk On",
    comment: "Tjänstesektorn visar styrka och stödjer tillväxtbilden.",
    tone: "green",
  },
  {
    category: "Tillväxt & Aktivitet",
    name: "ISM Employment",
    value: "46,4",
    score: "-2",
    status: "Risk Off",
    comment: "Svag sysselsättningskomponent – ökar risken i makrobilden.",
    tone: "red",
  },
  {
    category: "Tillväxt & Aktivitet",
    name: "NFP",
    value: "115 000",
    score: "1",
    status: "Risk On",
    comment: "Positiv arbetsmarknadssignal, men inte extremt stark.",
    tone: "green",
  },
  {
    category: "Inflation",
    name: "CPI MoM",
    value: "0,6",
    score: "-2",
    status: "Risk Off",
    comment: "Högre inflation pressar räntesänkningar och riskaptit.",
    tone: "red",
  },
  {
    category: "Inflation",
    name: "Core CPI MoM",
    value: "0,4",
    score: "-2",
    status: "Risk Off",
    comment: "Kärninflationen är för hög och håller policytrycket uppe.",
    tone: "red",
  },
  {
    category: "Inflation",
    name: "Core PCE MoM",
    value: "0,3",
    score: "-1",
    status: "Risk Neutral",
    comment: "Fortfarande något trögt inflationsläge – avvakta.",
    tone: "yellow",
  },
  {
    category: "Inflation",
    name: "PPI MoM",
    value: "1,4",
    score: "-2",
    status: "Risk Off",
    comment: "Producentpriserna signalerar fortsatt inflationsrisk.",
    tone: "red",
  },
  {
    category: "Inflation",
    name: "ISM Prices",
    value: "84,6",
    score: "-2",
    status: "Risk Off",
    comment: "Prisindex ligger högt och är negativt för riskaptit.",
    tone: "red",
  },
  {
    category: "Inflation",
    name: "Inflation Expectations",
    value: "4,5",
    score: "-2",
    status: "Risk Off",
    comment: "Höga inflationsförväntningar är negativt för börsen.",
    tone: "red",
  },
  {
    category: "Inflation",
    name: "Wage AHE YoY",
    value: "3,6",
    score: "-1",
    status: "Risk Neutral",
    comment: "Lönetillväxten är svagt negativ för policybilden.",
    tone: "yellow",
  },
  {
    category: "Inflation",
    name: "Wage ECI QoQ",
    value: "0,8",
    score: "2",
    status: "Risk On",
    comment: "Mer balanserad lönebild ger positiv policytolkning.",
    tone: "green",
  },
  {
    category: "Arbetsmarknad",
    name: "Unemployment",
    value: "4,3",
    score: "1",
    status: "Risk Neutral",
    comment: "Arbetsmarknaden är svagare men inte i tydlig stress.",
    tone: "yellow",
  },
  {
    category: "Arbetsmarknad",
    name: "Initial Jobless Claims",
    value: "211 000",
    score: "2",
    status: "Risk On",
    comment: "Låga ansökningar stödjer en stabil arbetsmarknad.",
    tone: "green",
  },
  {
    category: "Arbetsmarknad",
    name: "JOLTS Openings",
    value: "0,46",
    score: "2",
    status: "Risk On",
    comment: "Jobböppningar stödjer bilden av fortsatt arbetsmarknadsstyrka.",
    tone: "green",
  },
  {
    category: "Arbetsmarknad",
    name: "Continuing Claims",
    value: "1 782 000",
    score: "1",
    status: "Risk On",
    comment: "Stabil nivå utan tydlig stressignal.",
    tone: "green",
  },
  {
    category: "Risk & Stress",
    name: "VIX",
    value: "18,43",
    score: "1",
    status: "Risk Neutral",
    comment: "Volatiliteten är inte extrem men bör bevakas.",
    tone: "yellow",
  },
  {
    category: "Risk & Stress",
    name: "HY Spreads",
    value: "2,82",
    score: "2",
    status: "Risk On",
    comment: "Kreditspreadar visar låg stress och stödjer risk.",
    tone: "green",
  },
  {
    category: "Risk & Stress",
    name: "Yield Curve",
    value: "0,5",
    score: "1",
    status: "Risk Neutral",
    comment: "Räntekurvan ger en neutral till svagt positiv signal.",
    tone: "yellow",
  },
  {
    category: "Risk & Stress",
    name: "Chicago Fed NFCI",
    value: "-0,524",
    score: "2",
    status: "Risk On",
    comment: "Finansiella förhållanden är stödjande för marknaden.",
    tone: "green",
  },
  {
    category: "Likviditet & Policy",
    name: "M2 YoY",
    value: "4,57",
    score: "1",
    status: "Risk On",
    comment: "Likviditeten förbättras, men signalen är inte maximal.",
    tone: "green",
  },
  {
    category: "Likviditet & Policy",
    name: "Fed Rate",
    value: "3,75",
    score: "-1",
    status: "Risk Neutral",
    comment: "Räntenivån är fortfarande en motvind för risk.",
    tone: "yellow",
  },
  {
    category: "Likviditet & Policy",
    name: "Stocks > 200MA",
    value: "50,89",
    score: "-2",
    status: "Risk Off",
    comment: "Marknadsbredden är svag och bör bevakas noggrant.",
    tone: "red",
  },
  {
    category: "Likviditet & Policy",
    name: "Shiller PE Ratio",
    value: "41,66",
    score: "-2",
    status: "Risk Off",
    comment: "Värderingen är mycket hög och begränsar risk/reward.",
    tone: "red",
  },
  {
    category: "Likviditet & Policy",
    name: "Buffett Indicator",
    value: "214",
    score: "-2",
    status: "Risk Off",
    comment: "Extrem värderingsnivå relativt ekonomin.",
    tone: "red",
  },
];

export default function MakroProPage() {
  return (
    <main className="min-h-dvh bg-slate-100 pb-20 text-slate-950 lg:pb-0">
      <div className="hidden lg:block">
        <Topbar />
      </div>

      <header className="relative flex h-14 items-center justify-center border-b border-slate-800 bg-slate-950 px-4 text-white lg:hidden">
        <Link
          href="/"
          aria-label="Tillbaka till nyheter"
          className="absolute left-4 text-white transition hover:text-emerald-400"
        >
          <ArrowLeft size={21} />
        </Link>

        <span className="text-lg font-black">
          <span className="text-emerald-500">Makro</span> Pro
        </span>
      </header>

      <section className="mx-auto max-w-[1240px] px-4 py-5 lg:px-8 lg:py-10">
        <Link
          href="/"
          className="mb-4 hidden w-fit items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-emerald-600 lg:flex"
        >
          <ArrowLeft size={16} />
          Tillbaka till Makro
        </Link>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5 text-white shadow-xl lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-300">
                <BarChart3 size={14} />
                Makro Dashboard
              </div>

              <h1 className="text-3xl font-black tracking-tight lg:text-5xl">
                Makrostatus för börsen
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 lg:text-base">
                En sammanvägd bild av totalt 50st ledande makro indikatorer.
                Syftet är att
                snabbt förstå om miljön stödjer risk, kräver försiktighet eller
                signalerar avvaktan.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
  {summary.map((item) => (
    <ScoreCard key={item.label} item={item} />
  ))}
</div>
            </div>

            <div className="grid gap-4 lg:gap-5">
            <details className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 lg:self-start">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 transition hover:bg-slate-800/60">
                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">
                    Aktuell marknadsbild
                  </p>

                  <h2 className="mt-1 whitespace-nowrap text-base font-black text-white sm:text-xl">
                    Marknadsstatus
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-300">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    Live
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-lg font-black text-white transition group-open:rotate-45">
                    +
                  </span>
                </div>
              </summary>

              <div className="border-t border-slate-800 p-5">
                <div className="grid gap-3">
                  {marketStatus.slice(0, 2).map((text) => (
                    <div
                      key={text}
                      className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950 p-3"
                    >
                      <CheckCircle2
                        className="mt-0.5 shrink-0 text-emerald-400"
                        size={18}
                      />

                      <p className="text-sm font-semibold leading-6 text-slate-200">
                        {text}
                      </p>
                    </div>
                  ))}

                  <div className="relative min-h-[260px] overflow-hidden rounded-xl border border-slate-800">
                    <div className="pointer-events-none select-none space-y-3 p-3 blur-[2px] opacity-50">
                      {marketStatus.slice(2).map((text) => (
                        <div
                          key={text}
                          className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950 p-3"
                        >
                          <CheckCircle2
                            className="mt-0.5 shrink-0 text-emerald-400"
                            size={18}
                          />

                          <p className="text-sm font-semibold leading-6 text-slate-200">
                            {text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <DarkLockedOverlay count={marketStatus.length - 2} />
                  </div>
                </div>
              </div>
            </details>

            <details className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 lg:self-start">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 transition hover:bg-slate-800/60">
                <div>
                  <p className="text-xs font-bold uppercase text-slate-400">
                    Aktuell bedömning
                  </p>

                  <h2 className="mt-1 whitespace-nowrap text-base font-black sm:text-xl">
                    Position & signaler
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-300">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    Live
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-lg font-black text-white transition group-open:rotate-45">
                    +
                  </span>
                </div>
              </summary>

              <div className="border-t border-slate-800 p-5">
                <div className="relative min-h-[260px] overflow-hidden rounded-xl border border-slate-800">
                  <div className="pointer-events-none select-none space-y-3 p-3 blur-[2px] opacity-50">
                    {position.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-3"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                            <Icon size={18} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-500">
                              {item.label}
                            </p>

                            <p className="truncate text-sm font-black text-white">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <DarkLockedOverlay count={position.length} />
                </div>
              </div>
            </details>
            </div>
          </div>
        </div>

        <div className="mt-6 grid min-w-0 gap-4">
          <div className="min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">Trendöversikt</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Utveckling av snabb och laggande makrotrend vecka för vecka.
                </p>
              </div>

              <span className="shrink-0 whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
  v21 2026
</span>
            </div>

            <div className="mt-6 w-full overflow-hidden">
              <div className="mx-auto w-full rounded-2xl bg-slate-50 p-3 sm:p-4 lg:max-w-[1060px]">
                <svg viewBox="0 0 720 320" className="h-auto w-full max-w-full">
                  {[40, 90, 140, 190, 240].map((y) => (
                    <line
                      key={y}
                      x1="60"
                      y1={y}
                      x2="680"
                      y2={y}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                  ))}

                  <line x1="60" y1="20" x2="60" y2="250" stroke="#94a3b8" />
                  <line x1="60" y1="250" x2="680" y2="250" stroke="#94a3b8" />

                  {[
                    { label: "1.5", y: 20 },
                    { label: "1.0", y: 75 },
                    { label: "0.5", y: 135 },
                    { label: "0", y: 195 },
                    { label: "-0.2", y: 245 },
                  ].map((item) => (
                    <text
                      key={item.label}
                      x="15"
                      y={item.y + 5}
                      fontSize="12"
                      fill="#64748b"
                    >
                      {item.label}
                    </text>
                  ))}

                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="70,206 116,206 162,206 208,200 254,160 300,158 346,151 392,82 438,40 484,105 530,77 576,88 622,154 668,178"
                  />

                  <polyline
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="70,206 116,206 162,206 208,206 254,206 300,190 346,184 392,175 438,179 484,182 530,182 576,145 622,166 668,166"
                  />

                  {[
                    { week: "v8", x: 70, snabbY: 206, laggY: 206 },
                    { week: "v9", x: 116, snabbY: 206, laggY: 206 },
                    { week: "v10", x: 162, snabbY: 206, laggY: 206 },
                    { week: "v11", x: 208, snabbY: 200, laggY: 206 },
                    { week: "v12", x: 254, snabbY: 160, laggY: 206 },
                    { week: "v13", x: 300, snabbY: 158, laggY: 190 },
                    { week: "v14", x: 346, snabbY: 151, laggY: 184 },
                    { week: "v15", x: 392, snabbY: 82, laggY: 175 },
                    { week: "v16", x: 438, snabbY: 40, laggY: 179 },
                    { week: "v17", x: 484, snabbY: 105, laggY: 182 },
                    { week: "v18", x: 530, snabbY: 77, laggY: 182 },
                    { week: "v19", x: 576, snabbY: 88, laggY: 145 },
                    { week: "v20", x: 622, snabbY: 154, laggY: 166 },
                    { week: "v21", x: 668, snabbY: 178, laggY: 166 },
                  ].map((item) => (
                    <g key={item.week}>
                      <circle cx={item.x} cy={item.snabbY} r="4" fill="#10b981" />
                      <circle cx={item.x} cy={item.laggY} r="4" fill="#f59e0b" />
                      <text x={item.x - 10} y="280" fontSize="12" fill="#64748b">
                        {item.week}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-5 text-sm font-bold text-slate-600">
              <span className="flex items-center gap-2">
                <span className="h-3 w-8 rounded-full bg-emerald-500" />
                Snabb Makro
              </span>

              <span className="flex items-center gap-2">
                <span className="h-3 w-8 rounded-full bg-amber-500" />
                Lagg Makro
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight">
                Indikatorer
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Makromodellen är uppdelad i snabb makro och laggande makro.
                Snabb makro fångar förändringar tidigt, medan laggande makro
                bekräftar den bredare konjunkturbilden.
              </p>
            </div>

            <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
              Färg = riskläge
            </span>
          </div>

          <div className="mt-5 grid gap-4">
            <MacroAccordion
  title="Snabb Makro"
  badge="Veckovis"
  count={14}
  previewLimit={3}
  description="Snabb makro består av indikatorer som rör sig relativt snabbt och kan hjälpa till att fånga förändringar i marknadens riskaptit tidigare. Syftet är att snabbare kunna tolka om marknaden börjar prisa in förbättring, stress eller ett skifte i likviditet och momentum."
  indicators={snabbIndicators}
/>

<MacroAccordion
  title="Lagg Makro"
  badge="Månadsvis"
  count={36}
  previewLimit={3}
  description="Laggande makro visar den bredare ekonomiska bilden genom data som ofta bekräftar konjunkturläget i efterhand. Den hjälper till att bedöma om tillväxt, inflation, arbetsmarknad, riskstress och policy stödjer eller motverkar börsens riktning."
  indicators={laggIndicators}
/>
          </div>
        </div>



        <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950 p-5 text-white shadow-xl lg:p-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-2xl font-black">
                Lås upp alla indikatorer
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Få hela makromodellen, alla signaler + Vecko & Månads bedömningen för{" "}
                <span className="font-black text-emerald-400">
                  49 kr/mån
                </span>{" "}
      
              </p>
            </div>

            <Link
              href={PATREON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-400"
            >
              Lås upp via Patreon
            </Link>
          </div>
        </div>
      </section>

      <MobileBottomNav />
    </main>
  );
}

function MacroAccordion({
  title,
  badge,
  count,
  previewLimit,
  description,
  indicators,
  defaultOpen = false,
}: {
  title: string;
  badge: string;
  count: number;
  previewLimit: number;
  description: string;
  indicators: {
    category?: string;
    name: string;
    value: string;
    score: string;
    status: string;
    comment: string;
    tone: string;
  }[];
  defaultOpen?: boolean;
}) {
  const accordionId =
    title === "Snabb Makro" ? "snabb-makro-accordion" : "lagg-makro-accordion";
  const visibleIndicators = indicators.slice(0, previewLimit);
  const lockedIndicators = indicators.slice(previewLimit);

  return (
    <div
      id={`${accordionId}-top`}
      className="macro-accordion scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm [&:has(input:checked)_.accordion-plus]:rotate-45"
    >
      <input
        id={accordionId}
        type="checkbox"
        defaultChecked={defaultOpen}
        className="peer hidden"
      />

      <label
        htmlFor={accordionId}
        className="flex cursor-pointer list-none items-center justify-between gap-4 bg-slate-50 px-4 py-4 transition hover:bg-slate-100"
      >
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-black">{title}</h3>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
              {badge}
            </span>
          </div>

          <p className="mt-1 text-xs font-semibold text-slate-500">
            Klicka för att visa {count} indikatorer
          </p>
        </div>

        <span className="accordion-plus flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-lg font-black text-white transition-transform duration-300">
          +
        </span>
      </label>

      <div className="grid grid-rows-[0fr] border-t-0 border-slate-200 transition-all duration-300 ease-out peer-checked:grid-rows-[1fr] peer-checked:border-t">
        <div className="min-h-0 overflow-hidden p-0 peer-checked:px-5 peer-checked:py-4 sm:peer-checked:px-6">
        <p className="max-w-4xl text-sm leading-7 text-slate-600">
  {description}
</p>

        <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black text-emerald-900">
                Preview-läge
              </p>
              <p className="mt-1 text-xs font-semibold leading-5 text-emerald-800">
                De tre första indikatorerna visas gratis. Resterande indikatorer
                och hela veckobedömningen låses upp via Patreon.
              </p>
            </div>

            <Link
              href={PATREON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-xs font-black text-slate-950 transition hover:bg-emerald-400"
            >
              Lås upp 49 kr/mån
            </Link>
          </div>
        </div>

        <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 lg:block">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-3 text-xs font-black uppercase text-slate-500">
                  Grupp
                </th>
                <th className="px-4 py-3 text-xs font-black uppercase text-slate-500">
                  Indikator
                </th>
                <th className="px-4 py-3 text-xs font-black uppercase text-slate-500">
                  Värde
                </th>
                <th className="px-4 py-3 text-xs font-black uppercase text-slate-500">
                  Poäng
                </th>
                <th className="px-4 py-3 text-xs font-black uppercase text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {visibleIndicators.map((item) => (
                <tr key={`${title}-${item.name}`} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-xs font-black text-slate-500">
                    {item.category ?? "Snabb Makro"}
                  </td>
                  <td className="px-4 py-3 font-bold">{item.name}</td>
                  <td className="px-4 py-3">
                    <ToneBadge tone={item.tone}>{item.value}</ToneBadge>
                  </td>
                  <td className="px-4 py-3 font-black">{item.score}</td>
                  <td className="px-4 py-3">
                    <p className="font-black">{item.status}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {item.comment}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {lockedIndicators.length > 0 && (
            <div className="relative border-t border-slate-200">
              <div className="pointer-events-none select-none blur-[2px] opacity-50">
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    {lockedIndicators.slice(0, 8).map((item) => (
                      <tr
                        key={`${title}-locked-${item.name}`}
                        className="border-t border-slate-100"
                      >
                        <td className="px-4 py-3 text-xs font-black text-slate-500">
                          {item.category ?? "Snabb Makro"}
                        </td>
                        <td className="px-4 py-3 font-bold">{item.name}</td>
                        <td className="px-4 py-3">
                          <ToneBadge tone={item.tone}>{item.value}</ToneBadge>
                        </td>
                        <td className="px-4 py-3 font-black">{item.score}</td>
                        <td className="px-4 py-3">
                          <p className="font-black">{item.status}</p>
                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {item.comment}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <LockedOverlay count={lockedIndicators.length} />
            </div>
          )}
        </div>

        <div className="mt-5 grid gap-3 lg:hidden">
          {visibleIndicators.map((item) => (
            <IndicatorCard key={`${title}-${item.name}`} item={item} />
          ))}

          {lockedIndicators.length > 0 && (
            <div className="relative min-h-[340px] overflow-hidden rounded-2xl border border-slate-200">
              <div className="pointer-events-none select-none space-y-3 p-3 blur-[2px] opacity-50">
                {lockedIndicators.slice(0, 4).map((item) => (
                  <IndicatorCard key={`${title}-locked-${item.name}`} item={item} />
                ))}
              </div>

              <LockedOverlay count={lockedIndicators.length} />
            </div>
          )}
        </div>

        <a href={`#${accordionId}-top`} className="block">
          <label
            htmlFor={accordionId}
            className="mt-5 flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-100"
          >
            Stäng {title}
          </label>
        </a>
        </div>
      </div>
    </div>
  );
}

function IndicatorCard({
  item,
}: {
  item: {
    category?: string;
    name: string;
    value: string;
    score: string;
    status: string;
    comment: string;
    tone: string;
  };
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          {item.category && (
            <p className="mb-1 text-[11px] font-black uppercase text-slate-400">
              {item.category}
            </p>
          )}
          <h3 className="font-black">{item.name}</h3>
          <p className="mt-1 text-xs font-bold text-slate-500">
            Poäng: {item.score}
          </p>
        </div>

        <ToneBadge tone={item.tone}>{item.value}</ToneBadge>
      </div>

      <p className="mt-3 text-sm font-black">{item.status}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        {item.comment}
      </p>
    </div>
  );
}

function LockedOverlay({ count }: { count: number }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/75 p-4 backdrop-blur-[3px]">
      <div className="max-w-sm rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xl">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white">
          <Lock size={18} />
        </div>

        <h4 className="mt-3 text-base font-black">
          {count} indikatorer är låsta
        </h4>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Lås upp hela Makro Pro, alla indikatorer och veckobedömningen via
          Patreon.
        </p>

        <Link
          href={PATREON_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-xs font-black text-slate-950 transition hover:bg-emerald-400"
        >
          Lås upp för 49 kr/mån
        </Link>
      </div>
    </div>
  );
}

function DarkLockedOverlay({ count }: { count: number }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-[3px]">
      <div className="max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center shadow-xl sm:p-5">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white">
          <Lock size={18} />
        </div>

        <h4 className="mt-3 text-base font-black text-white">
          {count} signaler är låsta
        </h4>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          Lås upp hela Makro Pro via Patreon för att se den fullständiga
          bedömningen.
        </p>

        <Link
          href={PATREON_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-xs font-black text-slate-950 transition hover:bg-emerald-400"
        >
          Lås upp för 49 kr/mån
        </Link>
      </div>
    </div>
  );
}


function ScoreCard({
  item,
}: {
  item: {
    label: string;
    value: string;
    status: string;
    detail: string;
    color: string;
  };
}) {
  const colorClass =
    item.color === "emerald"
      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
      : item.color === "amber"
      ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
      : "bg-yellow-500/10 text-yellow-300 border-yellow-500/30";

  return (
    <div className={`rounded-2xl border p-3 sm:p-4 lg:p-5 ${colorClass}`}>
      <p className="whitespace-nowrap text-[9px] font-black uppercase leading-tight sm:text-xs">
  {item.label}
</p>

      <p className="mt-1.5 text-xl font-black leading-none sm:text-2xl">
  {item.value}
</p>

      <p className="mt-2 truncate text-xs font-black sm:text-sm">
        {item.status}
      </p>

      <p className="mt-1 hidden text-xs font-bold opacity-80 sm:block">
        {item.detail}
      </p>
    </div>
  );
}

function ToneBadge({
  tone,
  children,
}: {
  tone: string;
  children: React.ReactNode;
}) {
  const classes =
    tone === "green"
      ? "bg-emerald-100 text-emerald-800"
      : tone === "red"
      ? "bg-red-100 text-red-800"
      : tone === "orange"
      ? "bg-orange-100 text-orange-800"
      : "bg-yellow-100 text-yellow-800";

  return (
  <span
    className={`inline-flex min-w-[82px] shrink-0 justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-black ${classes}`}
  >
    {children}
  </span>
);
}
