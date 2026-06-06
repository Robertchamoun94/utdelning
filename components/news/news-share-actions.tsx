"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

type NewsShareActionsProps = {
  title: string;
  excerpt: string;
  url: string;
};

export function NewsShareActions({ title, excerpt, url }: NewsShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title,
        text: excerpt,
        url,
      });
      return;
    }

    await copyUrl();
  }

  async function copyUrl() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section
      aria-label="Dela nyheten"
      className="mt-6 flex flex-col gap-3 border-y border-slate-200 py-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-xs font-black uppercase text-slate-500">Dela nyheten</p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-emerald-700"
        >
          <Share2 size={16} />
          Dela
        </button>

        <button
          type="button"
          onClick={copyUrl}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
          aria-label="Kopiera länk"
          title="Kopiera länk"
        >
          {copied ? <Check size={17} /> : <Copy size={17} />}
        </button>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
          aria-label="Dela på Facebook"
          title="Facebook"
        >
          f
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
          aria-label="Dela på LinkedIn"
          title="LinkedIn"
        >
          in
        </a>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-black text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
          aria-label="Dela på X"
          title="X"
        >
          X
        </a>
      </div>
    </section>
  );
}
