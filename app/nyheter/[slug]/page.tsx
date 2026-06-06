import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Topbar } from "@/components/layout/topbar";
import { FormattedNewsTitle } from "@/components/news/formatted-news-title";
import { NewsShareActions } from "@/components/news/news-share-actions";
import { getPlainNewsTitle } from "@/lib/news-title-formatting";
import { defaultShareImage, defaultTwitterImage } from "@/lib/share-metadata";
import {
  createArticleJsonLd,
  getAbsoluteUrl,
  getMakroNewsPost,
  splitContentIntoParagraphs,
} from "@/lib/makro-news";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getMakroNewsPost(slug);

  if (!post) {
    return {
      title: "Nyhet saknas",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const url = `/nyheter/${post.slug}`;
  const image = getAbsoluteUrl(post.imageUrl);
  const plainTitle = getPlainNewsTitle(post.title);
  const shareImage = image
    ? {
        url: image,
        alt: post.imageAlt || plainTitle,
      }
    : defaultShareImage;

  return {
    title: plainTitle,
    description: post.excerpt,
    authors: [{ name: post.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      locale: "sv_SE",
      url,
      siteName: "Utdelning.nu",
      title: plainTitle,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: plainTitle,
      description: post.excerpt,
      images: [image ?? defaultTwitterImage],
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
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getMakroNewsPost(slug);

  if (!post) {
    notFound();
  }

  const paragraphs = splitContentIntoParagraphs(post.content);
  const jsonLd = createArticleJsonLd(post);
  const plainTitle = getPlainNewsTitle(post.title);
  const articleUrl = `https://utdelning.nu/nyheter/${post.slug}`;

  return (
    <main className="min-h-dvh bg-slate-100 pb-20 text-slate-950 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="hidden lg:block">
        <Topbar />
      </div>

      <header className="sticky top-0 z-[90] flex h-14 items-center justify-center border-b border-slate-800 bg-slate-950 px-4 text-white lg:hidden">
        <Link href="/" className="text-lg font-black tracking-tight">
          <span className="text-emerald-500">utdelning</span>
          <span>.nu</span>
        </Link>
      </header>

      <article className="mx-auto max-w-[920px] px-4 py-5 lg:px-8 lg:py-10">
        <Link
          href="/nyheter"
          className="mb-5 inline-flex items-center gap-2 text-sm font-black text-slate-600 transition hover:text-emerald-700"
        >
          <ArrowLeft size={17} />
          Till nyheter
        </Link>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {post.imageUrl && (
            <div className="relative h-72 w-full lg:h-96">
              <Image
                src={post.imageUrl}
                alt={post.imageAlt || getPlainNewsTitle(post.title)}
                fill
                priority
                sizes="(min-width: 1024px) 920px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="p-5 lg:p-10">
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1">
                <CalendarDays size={14} />
                {new Date(post.publishedAt).toLocaleDateString("sv-SE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock3 size={14} />
                {Math.max(2, Math.ceil(post.content.split(/\s+/).length / 220))}{" "}
                min läsning
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-tight lg:text-5xl">
              <FormattedNewsTitle title={post.title} />
            </h1>

            <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">
              {post.excerpt}
            </p>

            <NewsShareActions
              title={plainTitle}
              excerpt={post.excerpt}
              url={articleUrl}
            />

            <div className="mt-8 grid gap-5 border-t border-slate-200 pt-8">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-slate-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </article>

      <MobileBottomNav />
    </main>
  );
}
