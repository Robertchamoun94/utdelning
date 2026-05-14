import type { Metadata } from "next";
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Utdelning.nu – Kommande utdelningar och X-datum",
    description:
      "Se kommande utdelningar, X-datum och utdelningsbelopp för svenska aktier.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
