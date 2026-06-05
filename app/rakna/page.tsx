import type { Metadata } from "next";
import { ReturnCalculator } from "@/components/calculators/return-calculator";

const siteUrl = "https://utdelning.nu";

export const metadata: Metadata = {
  title: "Räkna avkastning - kalkylator för ränta på ränta",
  description:
    "Räkna avkastning på sparande, aktier och månadssparande. Testa startkapital, årlig avkastning och tid i Utdelning.nu:s ränta på ränta-kalkylator.",
  keywords: [
    "räkna avkastning",
    "avkastningskalkylator",
    "ränta på ränta",
    "ränta på ränta kalkylator",
    "aktie avkastning",
    "månadssparande kalkylator",
    "sparande kalkylator",
    "beräkna avkastning",
  ],
  alternates: {
    canonical: "/rakna",
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: `${siteUrl}/rakna`,
    siteName: "Utdelning.nu",
    title: "Räkna avkastning - ränta på ränta-kalkylator",
    description:
      "Beräkna hur ditt sparande kan växa över tid med startkapital, månadssparande och årlig avkastning.",
  },
  twitter: {
    card: "summary",
    title: "Räkna avkastning - ränta på ränta-kalkylator",
    description:
      "Testa Utdelning.nu:s kalkylator för avkastning, sparande och ränta på ränta.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Räkna avkastning",
  url: `${siteUrl}/rakna`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  inLanguage: "sv-SE",
  description:
    "En svensk kalkylator för att beräkna avkastning, månadssparande och ränta på ränta över tid.",
  publisher: {
    "@type": "Organization",
    name: "Utdelning.nu",
    url: siteUrl,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "SEK",
  },
};

export default function RaknaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <ReturnCalculator />
    </>
  );
}
