import { get, put } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import { getPlainNewsTitle } from "@/lib/news-title-formatting";

export type MakroNewsStatus = "draft" | "published";

export type MakroNewsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  imageUrl: string;
  imageAlt: string;
  content: string;
  status: MakroNewsStatus;
};

export type MakroNewsInput = {
  title: string;
  excerpt: string;
  category: string;
  publishedAt?: string;
  author?: string;
  imageUrl?: string;
  imageAlt?: string;
  content: string;
  status?: MakroNewsStatus;
};

const NEWS_FILE = path.join(process.cwd(), "data", "makro-news.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "makro");
const BLOB_NEWS_PATH = "makro/posts.json";
const BLOB_IMAGE_PATH = "makro/images";
const SITE_URL = "https://utdelning.nu";

export async function getMakroNewsPosts(options?: {
  includeDrafts?: boolean;
}) {
  const posts = await readNewsFile();

  return posts
    .filter((post) => options?.includeDrafts || post.status === "published")
    .sort(
      (first, second) =>
        new Date(second.publishedAt).getTime() -
        new Date(first.publishedAt).getTime()
    );
}

export async function getMakroNewsPost(slug: string) {
  const posts = await getMakroNewsPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function createMakroNewsPost(input: MakroNewsInput) {
  const posts = await readNewsFile();
  const now = new Date().toISOString();
  const publishedAt = input.publishedAt
    ? new Date(input.publishedAt).toISOString()
    : now;
  const plainTitle = getPlainNewsTitle(input.title);
  const baseSlug = createSlug(plainTitle);
  const slug = createUniqueSlug(baseSlug, posts);

  const post: MakroNewsPost = {
    id: `${publishedAt.slice(0, 10)}-${slug}`,
    slug,
    title: cleanText(input.title),
    excerpt: cleanText(input.excerpt),
    category: cleanText(input.category),
    publishedAt,
    updatedAt: now,
    author: cleanText(input.author || "Utdelning.nu"),
    imageUrl: input.imageUrl?.trim() || "",
    imageAlt: cleanText(input.imageAlt || plainTitle),
    content: input.content.trim(),
    status: input.status || "published",
  };

  await writeNewsFile([post, ...posts]);
  return post;
}

export async function updateMakroNewsPost(
  id: string,
  input: MakroNewsInput
) {
  const posts = await readNewsFile();
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return null;
  }

  const existingPost = posts[postIndex];
  const plainTitle = getPlainNewsTitle(input.title);
  const publishedAt = input.publishedAt
    ? new Date(input.publishedAt).toISOString()
    : existingPost.publishedAt;

  const updatedPost: MakroNewsPost = {
    ...existingPost,
    title: cleanText(input.title),
    excerpt: cleanText(input.excerpt),
    category: cleanText(input.category),
    publishedAt,
    updatedAt: new Date().toISOString(),
    author: cleanText(input.author || "Utdelning.nu"),
    imageUrl: input.imageUrl?.trim() || "",
    imageAlt: cleanText(input.imageAlt || plainTitle),
    content: input.content.trim(),
    status: input.status || "published",
  };

  posts[postIndex] = updatedPost;
  await writeNewsFile(posts);
  return updatedPost;
}

export async function deleteMakroNewsPost(id: string) {
  const posts = await readNewsFile();
  const nextPosts = posts.filter((post) => post.id !== id);

  if (nextPosts.length === posts.length) {
    return false;
  }

  await writeNewsFile(nextPosts);
  return true;
}

export async function saveMakroNewsImage(file: File, slugSource: string) {
  if (!file.size) return "";

  const extension = getSafeImageExtension(file);
  if (!extension) {
    throw new Error("Bilden måste vara JPG, PNG, WebP eller GIF.");
  }

  const slug = createSlug(slugSource || "makro-nyhet");
  const fileName = `${slug}-${Date.now()}.${extension}`;

  if (hasBlobStorage()) {
    const pathname = `${BLOB_IMAGE_PATH}/${fileName}`;

    await put(pathname, file, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType: file.type,
      cacheControlMaxAge: 31536000,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return `/api/news-image/${pathname}`;
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const targetPath = path.join(UPLOAD_DIR, fileName);
  const bytes = Buffer.from(await file.arrayBuffer());

  await fs.writeFile(targetPath, bytes);

  return `/uploads/makro/${fileName}`;
}

export function hasPersistentMakroNewsStorage() {
  return hasBlobStorage() || process.env.NODE_ENV === "development";
}

export function getAbsoluteUrl(pathOrUrl: string) {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export function createArticleJsonLd(post: MakroNewsPost) {
  const url = `${SITE_URL}/nyheter/${post.slug}`;
  const image = getAbsoluteUrl(post.imageUrl);

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: getPlainNewsTitle(post.title),
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Utdelning.nu",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(image ? { image: [image] } : {}),
  };
}

export function splitContentIntoParagraphs(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function createUniqueSlug(slug: string, posts: MakroNewsPost[]) {
  const existingSlugs = new Set(posts.map((post) => post.slug));
  let candidate = slug || "makro-nyhet";
  let counter = 2;

  while (existingSlugs.has(candidate)) {
    candidate = `${slug}-${counter}`;
    counter += 1;
  }

  return candidate;
}

function createSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

async function readNewsFile(): Promise<MakroNewsPost[]> {
  if (hasBlobStorage()) {
    return readNewsBlob();
  }

  try {
    const content = await fs.readFile(NEWS_FILE, "utf8");
    return JSON.parse(content) as MakroNewsPost[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function writeNewsFile(posts: MakroNewsPost[]) {
  if (hasBlobStorage()) {
    await put(BLOB_NEWS_PATH, `${JSON.stringify(posts, null, 2)}\n`, {
      access: "private",
      allowOverwrite: true,
      contentType: "application/json; charset=utf-8",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return;
  }

  await fs.mkdir(path.dirname(NEWS_FILE), { recursive: true });
  await fs.writeFile(NEWS_FILE, `${JSON.stringify(posts, null, 2)}\n`, "utf8");
}

async function readNewsBlob() {
  const blob = await get(BLOB_NEWS_PATH, {
    access: "private",
    useCache: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  if (!blob?.stream) {
    return [];
  }

  const response = new Response(blob.stream);
  return (await response.json()) as MakroNewsPost[];
}

function hasBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function getSafeImageExtension(file: File) {
  const mimeMap: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };

  return mimeMap[file.type] || "";
}
