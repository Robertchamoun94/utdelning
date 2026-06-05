"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COOKIE_KEY = "utdelning_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_KEY);

    if (!savedConsent) {
      window.setTimeout(() => setVisible(true), 0);
    }
  }, []);

  function acceptCookies() {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  }

  function declineCookies() {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-[9999] mx-auto max-w-xl rounded-2xl border border-slate-800 bg-slate-950 p-4 text-white shadow-2xl lg:bottom-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-black">Cookies på Utdelning.nu</h2>

          <p className="mt-1 text-xs leading-5 text-slate-300">
            Vi använder cookies för att förbättra upplevelsen och förstå hur
            sidan används. Du kan godkänna eller neka cookies.{" "}
            <Link
              href="/integritetspolicy"
              className="font-black text-emerald-400 underline-offset-4 hover:underline"
            >
              Läs mer
            </Link>
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={declineCookies}
            className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-black text-slate-200 transition hover:bg-slate-900"
          >
            Neka
          </button>

          <button
            type="button"
            onClick={acceptCookies}
            className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-black text-slate-950 transition hover:bg-emerald-400"
          >
            Godkänn
          </button>
        </div>
      </div>
    </div>
  );
}
