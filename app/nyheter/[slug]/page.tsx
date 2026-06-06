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
import {
  parseNewsContent,
  type NewsContentBlock,
} from "@/lib/news-content-formatting";
import { defaultShareImage, defaultTwitterImage } from "@/lib/share-metadata";
import {
  createArticleJsonLd,
  getAbsoluteUrl,
  getMakroNewsPost,
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

  const contentBlocks = parseNewsContent(post.content);
  const jsonLd = createArticleJsonLd(post);
  const plainTitle = getPlainNewsTitle(post.title);
  const articleUrl = `https://www.utdelning.nu/nyheter/${post.slug}`;

  return (
    <main className="min-h-dvh bg-white pb-20 text-slate-950 lg:pb-0">
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

      <article className="mx-auto max-w-[780px] px-4 py-5 lg:px-8 lg:py-10">
        <Link
          href="/nyheter"
          className="mb-5 inline-flex items-center gap-2 text-sm font-black text-slate-600 transition hover:text-emerald-700"
        >
          <ArrowLeft size={17} />
          Till nyheter
        </Link>

        {post.imageUrl && (
          <div className="relative -mx-4 h-72 overflow-hidden bg-slate-100 sm:mx-0 sm:rounded-xl lg:h-96">
            <Image
              src={post.imageUrl}
              alt={post.imageAlt || getPlainNewsTitle(post.title)}
              fill
              priority
              sizes="(min-width: 1024px) 780px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500">
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

        <h1 className="mt-5 text-3xl font-black leading-[1.05] tracking-tight lg:text-5xl">
          <FormattedNewsTitle title={post.title} />
        </h1>

        <p className="mt-5 text-lg font-bold leading-8 text-slate-700 lg:text-xl lg:leading-9">
          {post.excerpt}
        </p>

        <NewsShareActions
          title={plainTitle}
          excerpt={post.excerpt}
          url={articleUrl}
        />

        <div className="mt-7 border-t border-slate-200 pt-7">
          <NewsArticleBody blocks={contentBlocks} />
        </div>
      </article>

      <MobileBottomNav />
    </main>
  );
}

function NewsArticleBody({ blocks }: { blocks: NewsContentBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2
              key={`${block.text}-${index}`}
              className="pt-3 text-2xl font-black leading-tight tracking-tight text-slate-950"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={`list-${index}`}
              className="list-disc space-y-2 pl-5 text-[17px] leading-8 text-slate-800"
            >
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "facts") {
          return <FactBox key={`${block.title}-${index}`} block={block} />;
        }

        return (
          <p
            key={`${block.text}-${index}`}
            className="text-[17px] leading-8 text-slate-800"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

function FactBox({
  block,
}: {
  block: Extract<NewsContentBlock, { type: "facts" }>;
}) {
  return (
    <section className="my-6 border-y-4 border-slate-950 bg-slate-50 py-4">
      <h2 className="text-base font-black uppercase tracking-[0.12em] text-slate-950">
        {block.title}
      </h2>

      <dl className="mt-4 divide-y divide-slate-200">
        {block.rows.map((row) => (
          <div
            key={`${row.label}-${row.value}`}
            className="grid grid-cols-[minmax(110px,0.85fr)_1fr] gap-4 py-3"
          >
            <dt className="text-sm font-black text-slate-600">{row.label}</dt>
            <dd className="text-sm font-black text-slate-950">{row.value}</dd>
          </div>
        ))}
      </dl>

      {block.note && (
        <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">
          {block.note}
        </p>
      )}
    </section>
  );
}
