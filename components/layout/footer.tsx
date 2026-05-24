import Link from "next/link";

export function Footer() {
  return (
    <footer className="hidden border-t border-slate-800 bg-slate-950 text-white lg:block">
      <div className="mx-auto flex max-w-[1520px] items-center justify-between px-7 py-6">
        <Link href="/" className="text-lg font-black tracking-tight">
          <span className="text-emerald-500">utdelning</span>
          <span>.nu</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-semibold text-slate-300">
          <Link href="/" className="transition hover:text-white">
            Hem
          </Link>

          <Link href="/rakna" className="transition hover:text-white">
            Räkna avkastning
          </Link>

          <Link href="/makro" className="transition hover:text-white">
            Makro Ekonomi
          </Link>

          <Link href="/integritetspolicy" className="transition hover:text-white">
            Integritetspolicy
          </Link>

          <Link href="/kontakt" className="transition hover:text-white">
            Kontakt
          </Link>
        </nav>
      </div>
    </footer>
  );
}