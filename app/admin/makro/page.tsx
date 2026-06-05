import type { Metadata } from "next";
import Link from "next/link";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Topbar } from "@/components/layout/topbar";
import { MakroNewsAdmin } from "@/components/admin/makro-news-admin";

export const metadata: Metadata = {
  title: "Admin Nyheter",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminMakroPage() {
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
        <MakroNewsAdmin />
      </section>

      <MobileBottomNav />
    </main>
  );
}
