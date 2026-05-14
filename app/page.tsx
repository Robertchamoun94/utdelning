import { DividendDashboard } from "@/components/dividends/dividend-dashboard";
import { fetchUpcomingDividends } from "@/lib/api/dividends";

const siteUrl = "https://utdelning.nu";

const faqItems = [
  {
    question: "Vad är X-datum?",
    answer:
      "X-datum är den första dagen då en aktie handlas utan rätt till den kommande utdelningen. För att ha rätt till utdelningen behöver du normalt äga aktien innan X-datumet.",
  },
  {
    question: "När får man utdelning?",
    answer:
      "Utdelningen betalas vanligtvis ut på bolagets utdelningsdag. Utdelningsdagen infaller normalt några bankdagar efter X-datumet, men datumet kan variera mellan olika bolag.",
  },
  {
    question: "Vad visar en utdelningskalender?",
    answer:
      "En utdelningskalender visar kommande utdelningar, X-datum, utdelningsdag och utdelningsbelopp för aktier. Den hjälper investerare att snabbt se vilka bolag som snart delar ut pengar.",
  },
  {
    question: "Är utdelningsbelopp alltid garanterade?",
    answer:
      "Nej. Utdelningar kan ändras, sänkas, höjas eller ställas in. Kontrollera alltid den senaste informationen från bolaget innan du fattar investeringsbeslut.",
  },
];

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Utdelning.nu",
  url: siteUrl,
  description:
    "Utdelningskalender för svenska aktier med kommande utdelningar, X-datum och utdelningsdagar.",
  inLanguage: "sv-SE",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Utdelning.nu",
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default async function HomePage() {
  const dividends = await fetchUpcomingDividends();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <DividendDashboard dividends={dividends} />

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-2 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-sm sm:p-7">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">
              Utdelningsguide
            </p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Vanliga frågor om utdelningar
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Här hittar du korta svar på de vanligaste frågorna om X-datum,
              utdelningsdag och hur en utdelningskalender används.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <article
                key={item.question}
                className="rounded-xl border border-white/10 bg-black/20 p-4 sm:p-5"
              >
                <h3 className="text-sm font-semibold text-white sm:text-base">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
