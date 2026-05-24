import Link from "next/link";
import { BarChart3, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Topbar } from "@/components/layout/topbar";

export const metadata = {
  title: "Makro Pro – Makroekonomi för börsen | Utdelning.nu",
  description:
    "Få koll på makroekonomi, räntor, likviditet, kreditstress och marknadsregim med Makro Pro från Utdelning.nu.",
};

export default function MakroPage() {
  return (
    <main className="min-h-dvh bg-slate-100 pb-20 text-slate-950 lg:pb-0">
      <div className="hidden lg:block">
        <Topbar />
      </div>

      <header className="flex h-14 items-center justify-center border-b border-slate-800 bg-slate-950 px-4 text-white lg:hidden">
        <Link href="/" className="text-lg font-black tracking-tight">
          <span className="text-emerald-500">utdelning</span>
          <span>.nu</span>
        </Link>
      </header>

      <section className="mx-auto max-w-[1180px] px-4 py-5 lg:px-8 lg:py-10">
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 text-white shadow-xl">
          <div className="px-5 py-8 lg:px-10 lg:py-12">
            <div className="max-w-4xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                <BarChart3 size={14} />
                Makro Pro
              </div>

              <h1 className="max-w-3xl text-3xl font-black tracking-tight lg:text-5xl">
                Få koll på makroekonomin bakom börsen
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 lg:text-base">
                Räntor, likviditet, kreditstress och marknadsregim påverkar
                börsen mer än många tror. Makro Pro sammanfattar signalerna i
                ett tydligt system så att du snabbare förstår marknadsläget.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/makro/pro"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-400"
                >
                  Se Makro Pro
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5 lg:p-6">
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div>
                  <h2 className="text-2xl font-black tracking-tight lg:text-3xl">
                    Varför Makroekonomi?
                  </h2>

                </div>

                <div className="grid gap-3">
                  <Reason text="Räntor påverkar värderingar och avkastningskrav." />
                  <Reason text="Likviditet påverkar riskviljan på marknaden." />
                  <Reason text="Kreditstress kan varna för svagare börsklimat." />
                  <Reason text="Makroregim hjälper dig förstå när risk/reward förändras." />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950 p-5 text-white shadow-xl lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-emerald-400">
                <Lock size={18} />
                <span className="text-sm font-black">Makro Pro</span>
              </div>

              <h2 className="text-2xl font-black lg:text-3xl">
                Gå till makrosystemet
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Få tillgång till makrostatus, indikatorer, signaler och en
                tydlig veckobedömning av marknadsläget.
              </p>
            </div>

            <Link
              href="/makro/pro"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-400"
            >
              Fortsätt
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <MobileBottomNav />
    </main>
  );
}

function Reason({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
      <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-400" size={19} />
      <p className="text-sm font-semibold leading-6 text-slate-200">{text}</p>
    </div>
  );
}
