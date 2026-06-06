import Link from "next/link";
import Image from "next/image";
import { permanentRedirect } from "next/navigation";
import { CalendarDays, Clock3, TrendingUp } from "lucide-react";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Topbar } from "@/components/layout/topbar";
import { FormattedNewsTitle } from "@/components/news/formatted-news-title";
import { getMakroNewsPosts, type MakroNewsPost } from "@/lib/makro-news";
import { getPlainNewsTitle } from "@/lib/news-title-formatting";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Nyheter | Utdelning.nu",
  description:
    "Nyheter och analyser om makroekonomi, räntor, inflation, likviditet och marknadsläge från Utdelning.nu.",
  alternates: {
    canonical: "/nyheter",
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://utdelning.nu/nyheter",
    siteName: "Utdelning.nu",
    title: "Nyheter | Utdelning.nu",
    description:
      "Följ nyheter och analyser om räntor, inflation, likviditet, kreditstress och marknadsläge.",
  },
};

export default function MakroPage() {
  permanentRedirect("/nyheter");
}

export async function NewsIndexPage() {
  const posts = await getMakroNewsPosts();
  const [leadArticle, secondArticle, thirdArticle, ...feedArticles] = posts;
  const latestArticles = posts.slice(0, 6);
  const mostReadArticles = posts.slice(0, 5);

  return (
    <main className="min-h-dvh bg-[#f2f4f3] pb-20 text-slate-950 lg:pb-0">
      <div className="hidden lg:block">
        <Topbar />
      </div>

      <header className="sticky top-0 z-[90] flex h-14 items-center justify-center border-b border-slate-800 bg-slate-950 px-4 text-white lg:hidden">
        <Link href="/" className="text-lg font-black tracking-tight">
          <span className="text-emerald-500">utdelning</span>
          <span>.nu</span>
        </Link>
      </header>

      <section className="mx-auto max-w-[1180px] px-4 py-4 lg:px-8 lg:py-6">
        {leadArticle ? (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_330px]">
            <div className="grid gap-4">
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
                <LeadArticle article={leadArticle} />

                <div className="grid gap-4">
                  {secondArticle && <SecondaryArticle article={secondArticle} />}
                  {thirdArticle && <SecondaryArticle article={thirdArticle} />}
                </div>
              </div>

              <section className="border border-slate-200 bg-white">
                <SectionHeader title="Senaste nyheterna" />
                <div className="divide-y divide-slate-200">
                  {feedArticles.length > 0 ? (
                    feedArticles.map((article) => (
                      <NewsRow key={article.id} article={article} />
                    ))
                  ) : (
                    <p className="p-4 text-sm font-semibold text-slate-500">
                      Fler nyheter visas här när du publicerar nya inlägg.
                    </p>
                  )}
                </div>
              </section>
            </div>

            <aside className="grid content-start gap-4">
              <LatestPanel articles={latestArticles} />
              <MostReadPanel articles={mostReadArticles} />
            </aside>
          </div>
        ) : (
          <section className="border border-slate-200 bg-white p-5 lg:p-8">
            <h2 className="text-2xl font-black tracking-tight">
              Inga nyheter publicerade ännu
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              När du publicerar en ny nyhet i adminpanelen visas den automatiskt
              högst upp här.
            </p>
          </section>
        )}
      </section>

      <MobileBottomNav />
    </main>
  );
}

function LeadArticle({ article }: { article: MakroNewsPost }) {
  return (
    <article className="border border-slate-200 bg-white">
      {article.imageUrl && (
        <Link href={`/nyheter/${article.slug}`} aria-label={getPlainNewsTitle(article.title)}>
          <ArticleImage article={article} className="h-64 lg:h-[360px]" priority />
        </Link>
      )}

      <div className="p-4 lg:p-5">
        <ArticleMeta article={article} />

        <Link href={`/nyheter/${article.slug}`} className="block">
          <h2 className="mt-3 text-3xl font-black leading-[1.02] tracking-tight transition hover:text-emerald-700 lg:text-5xl">
            <FormattedNewsTitle title={article.title} />
          </h2>

          <p className="mt-4 text-base font-semibold leading-7 text-slate-700 transition hover:text-emerald-700">
            {article.excerpt}
          </p>
        </Link>
      </div>
    </article>
  );
}

function SecondaryArticle({ article }: { article: MakroNewsPost }) {
  return (
    <article className="border border-slate-200 bg-white">
      {article.imageUrl && (
        <Link href={`/nyheter/${article.slug}`} aria-label={getPlainNewsTitle(article.title)}>
          <ArticleImage article={article} className="h-40" />
        </Link>
      )}

      <div className="p-4">
        <ArticleMeta article={article} compact />

        <Link href={`/nyheter/${article.slug}`} className="block">
          <h3 className="mt-3 text-2xl font-black leading-tight tracking-tight transition hover:text-emerald-700">
            <FormattedNewsTitle title={article.title} />
          </h3>

          <p className="mt-3 line-clamp-3 text-sm font-semibold leading-6 text-slate-600 transition hover:text-emerald-700">
            {article.excerpt}
          </p>
        </Link>
      </div>
    </article>
  );
}

function NewsRow({ article }: { article: MakroNewsPost }) {
  return (
    <article
      className={`grid gap-3 p-4 transition hover:bg-slate-50 ${
        article.imageUrl ? "sm:grid-cols-[140px_1fr]" : ""
      }`}
    >
      {article.imageUrl && (
        <Link href={`/nyheter/${article.slug}`} aria-label={getPlainNewsTitle(article.title)}>
          <ArticleImage article={article} className="h-28 sm:h-24" />
        </Link>
      )}

      <div>
        <ArticleMeta article={article} compact />

        <Link href={`/nyheter/${article.slug}`} className="block">
          <h3 className="mt-2 text-xl font-black leading-tight tracking-tight transition hover:text-emerald-700">
            <FormattedNewsTitle title={article.title} />
          </h3>

          <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-600 transition hover:text-emerald-700">
            {article.excerpt}
          </p>
        </Link>
      </div>
    </article>
  );
}

function LatestPanel({ articles }: { articles: MakroNewsPost[] }) {
  return (
    <section className="border border-slate-200 bg-white">
      <SectionHeader title="Just nu" dark />
      <ol className="divide-y divide-slate-200">
        {articles.map((article) => (
          <li key={article.id}>
            <Link
              href={`/nyheter/${article.slug}`}
              className="grid gap-1 p-3 transition hover:bg-slate-50"
            >
              <span className="text-xs font-black text-emerald-700">
                {formatTime(article.publishedAt)}
              </span>
              <span className="text-sm font-black leading-5">
                <FormattedNewsTitle title={article.title} />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

function MostReadPanel({ articles }: { articles: MakroNewsPost[] }) {
  return (
    <section className="border border-slate-200 bg-white">
      <SectionHeader title="Mest läst" />
      <ol className="divide-y divide-slate-200">
        {articles.map((article, index) => (
          <li key={article.id}>
            <Link
              href={`/nyheter/${article.slug}`}
              className="grid grid-cols-[34px_1fr] gap-3 p-3 transition hover:bg-slate-50"
            >
              <span className="text-2xl font-black leading-none text-emerald-600">
                {index + 1}
              </span>
              <span className="text-sm font-black leading-5">
                <FormattedNewsTitle title={article.title} />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

function SectionHeader({ title, dark }: { title: string; dark?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between border-b px-3 py-2 ${
        dark
          ? "border-slate-800 bg-slate-950 text-white"
          : "border-slate-200 bg-white text-slate-950"
      }`}
    >
      <h2 className="text-sm font-black uppercase tracking-[0.14em]">
        {title}
      </h2>
      <TrendingUp
        size={16}
        className={dark ? "text-emerald-400" : "text-emerald-600"}
      />
    </div>
  );
}

function ArticleImage({
  article,
  className,
  priority,
}: {
  article: MakroNewsPost;
  className: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-slate-200 ${className}`}>
      <Image
        src={article.imageUrl}
        alt={article.imageAlt || getPlainNewsTitle(article.title)}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 760px, 100vw"
        className="object-cover"
      />
    </div>
  );
}

function ArticleMeta({
  article,
  compact,
}: {
  article: MakroNewsPost;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs font-black text-slate-500">
      <span className="bg-emerald-100 px-2 py-1 text-emerald-800">
        {article.category}
      </span>
      <span className="inline-flex items-center gap-1">
        <CalendarDays size={13} />
        {new Date(article.publishedAt).toLocaleDateString("sv-SE", {
          day: "numeric",
          month: compact ? "short" : "long",
          year: "numeric",
        })}
      </span>
      {!compact && (
        <span className="inline-flex items-center gap-1">
          <Clock3 size={13} />
          {getReadTime(article)} min läsning
        </span>
      )}
    </div>
  );
}

function getReadTime(article: MakroNewsPost) {
  return Math.max(2, Math.ceil(article.content.split(/\s+/).length / 220));
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
