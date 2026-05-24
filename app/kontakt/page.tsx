import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Topbar } from "@/components/layout/topbar";

export const metadata = {
  title: "Kontakt | Utdelning.nu",
  description:
    "Kontakta Utdelning.nu vid frågor om utdelningar, Makro Pro eller webbplatsen.",
};

export default function KontaktPage() {
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

      <section className="mx-auto max-w-[880px] px-4 py-5 lg:px-8 lg:py-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5 text-white shadow-xl lg:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-300">
            <Mail size={14} />
            Kontakt
          </div>

          <h1 className="text-3xl font-black tracking-tight lg:text-5xl">
            Kontakta oss
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 lg:text-base">
            Har du frågor om Utdelning.nu, utdelningskalendern eller Makro Pro?
            Kontakta oss gärna via e-post.
          </p>

          <a
            href="mailto:Utdelning.nu@outlook.com"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-400"
          >
            <Mail size={18} />
            Utdelning.nu@outlook.com
          </a>
        </div>
      </section>

      <MobileBottomNav />
    </main>
  );
}