import Link from "next/link";
import { ShieldCheck, Cookie, Mail, ArrowLeft } from "lucide-react";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Topbar } from "@/components/layout/topbar";

export const metadata = {
  title: "Integritetspolicy och cookies | Utdelning.nu",
  alternates: {
    canonical: "/integritetspolicy",
  },
  description:
    "Läs om hur Utdelning.nu hanterar personuppgifter, cookies, analys och externa tjänster.",
};

export default function IntegritetspolicyPage() {
  return (
    <main className="min-h-dvh bg-slate-100 pb-20 text-slate-950 lg:pb-0">
      <div className="hidden lg:block">
        <Topbar />
      </div>

      <header className="relative flex h-14 items-center justify-center border-b border-slate-800 bg-slate-950 px-4 text-white lg:hidden">
        <Link
          href="/"
          aria-label="Tillbaka"
          className="absolute left-4 text-white transition hover:text-emerald-400"
        >
          <ArrowLeft size={21} />
        </Link>

        <span className="text-lg font-black">
          <span className="text-emerald-500">utdelning</span>.nu
        </span>
      </header>

      <section className="mx-auto max-w-[980px] px-4 py-5 lg:px-8 lg:py-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5 text-white shadow-xl lg:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-300">
            <ShieldCheck size={14} />
            Integritet & cookies
          </div>

          <h1 className="text-3xl font-black tracking-tight lg:text-5xl">
            Integritetspolicy och cookies
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 lg:text-base">
            Här beskriver vi hur Utdelning.nu hanterar information, cookies och
            externa tjänster. Sidan kan uppdateras när nya funktioner,
            analysverktyg eller betallösningar läggs till.
          </p>
        </div>

        <div className="mt-6 grid gap-5">
          <PolicyCard title="Vilka uppgifter behandlas?">
            <p>
              Utdelning.nu är i grunden en informationssida som visar
              utdelningsdata, aktiesidor, kalkylatorer och makrorelaterat
              innehåll. När du besöker sidan kan teknisk information behandlas,
              till exempel webbläsare, enhetstyp, tidpunkt, sidvisningar och
              ungefärlig användning av webbplatsen.
            </p>

            <p>
              Om du kontaktar oss eller använder externa tjänster, till exempel
              Patreon, kan uppgifter som namn, e-postadress eller
              betalningsrelaterad information behandlas av respektive tjänst.
            </p>
          </PolicyCard>

          <PolicyCard title="Cookies">
            <p>
              Cookies och liknande tekniker kan användas för att förbättra
              upplevelsen, komma ihåg inställningar och förstå hur webbplatsen
              används.
            </p>

            <p>
              Nödvändiga cookies kan användas för att webbplatsen ska fungera
              korrekt. Andra cookies, till exempel analys- eller
              marknadsföringscookies, ska endast användas efter att du har
              godkänt dem.
            </p>

            <p>
              Du kan godkänna eller neka cookies i cookiebaren. Ditt val sparas
              i webbläsaren. Om du vill ändra ditt val kan du rensa
              webbplatsdata/localStorage i din webbläsare och ladda om sidan.
            </p>
          </PolicyCard>

          <PolicyCard title="Analys och statistik">
            <p>
              Utdelning.nu kan i framtiden använda analysverktyg för att förstå
              hur sidan används, vilka funktioner som är mest relevanta och hur
              användarupplevelsen kan förbättras.
            </p>

            <p>
              Om sådana verktyg används ska de kopplas till ditt cookieval, så
              att icke-nödvändig analys inte laddas innan du har godkänt
              cookies.
            </p>
          </PolicyCard>

          <PolicyCard title="Patreon och externa länkar">
            <p>
              Makro Pro kan marknadsföras på Utdelning.nu och länka vidare till
              Patreon för prenumeration, betalning och åtkomst till
              medlemsinnehåll.
            </p>

            <p>
              När du klickar vidare till Patreon gäller Patreons egna villkor,
              integritetspolicy och betalningshantering. Utdelning.nu hanterar
              inte kortuppgifter eller betalningsinformation direkt.
            </p>
          </PolicyCard>

          <PolicyCard title="Hur länge sparas uppgifter?">
            <p>
              Tekniska uppgifter och cookieval sparas endast så länge det är
              nödvändigt för syftet. Cookieval sparas lokalt i din webbläsare
              tills du själv rensar webbplatsdata eller tills funktionen
              ändras.
            </p>
          </PolicyCard>

          <PolicyCard title="Kontakt">
            <p>
              Om du har frågor om integritet, cookies eller hur webbplatsen
              fungerar kan du kontakta oss.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-700">
              <Mail size={17} />
              Utdelning.nu@outlook.com
            </div>
          </PolicyCard>

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5 text-white shadow-xl lg:p-8">
            <div className="flex items-start gap-3">
              <Cookie className="mt-1 shrink-0 text-emerald-400" size={22} />

              <div>
                <h2 className="text-xl font-black">
                  Vill du ändra ditt cookieval?
                </h2>

                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Rensa webbplatsdata/localStorage i din webbläsare och ladda om
                  sidan. Då visas cookiebaren igen och du kan göra ett nytt val.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MobileBottomNav />
    </main>
  );
}

function PolicyCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:p-7">
      <h2 className="text-xl font-black tracking-tight">{title}</h2>

      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600 lg:text-base">
        {children}
      </div>
    </section>
  );
}
