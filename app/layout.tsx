import { Footer } from "@/components/layout/footer";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { CookieBanner } from "@/components/cookie-banner";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { defaultShareImage, defaultTwitterImage } from "@/lib/share-metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://utdelning.nu"),
  title: {
    default: "Utdelning.nu – Kommande utdelningar och X-datum för svenska aktier",
    template: "%s | Utdelning.nu",
  },
  description:
    "Se kommande utdelningar, X-datum och utdelningsbelopp för svenska aktier. Enkel utdelningskalender för dig som vill följa aktier som snart delar ut.",
  keywords: [
    "utdelning",
    "utdelningar",
    "kommande utdelningar",
    "x-datum",
    "utdelningsaktier",
    "svenska utdelningsaktier",
    "utdelningskalender",
    "aktier med utdelning",
    "nästa utdelning",
  ],
  authors: [{ name: "Utdelning.nu" }],
  creator: "Utdelning.nu",
  publisher: "Utdelning.nu",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://utdelning.nu",
    siteName: "Utdelning.nu",
    title: "Utdelning.nu – Kommande utdelningar och X-datum",
    description:
      "Följ kommande utdelningar, X-datum och utdelningsbelopp för svenska aktier i en enkel utdelningskalender.",
    images: [defaultShareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Utdelning.nu – Kommande utdelningar och X-datum",
    description:
      "Se kommande utdelningar, X-datum och utdelningsbelopp för svenska aktier.",
    images: [defaultTwitterImage],
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
  category: "finance",
};

export const viewport: Viewport = {
  themeColor: "#020617",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="h-full antialiased">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>

      <body className="min-h-full flex flex-col bg-white text-slate-950">
        {children}
        <Footer />
        <MobileMenu />
        <CookieBanner />
      </body>
    </html>
  );
}
