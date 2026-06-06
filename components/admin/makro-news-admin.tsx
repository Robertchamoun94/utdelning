"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  ImagePlus,
  Lock,
  Pencil,
  Send,
  Trash2,
  X,
} from "lucide-react";
import type { MakroNewsPost } from "@/lib/makro-news";

type FormState = {
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  author: string;
  imageUrl: string;
  imageAlt: string;
  content: string;
  status: "published" | "draft";
};

const initialForm: FormState = {
  title: "",
  excerpt: "",
  category: "Makroekonomi",
  publishedAt: new Date().toISOString().slice(0, 16),
  author: "Utdelning.nu",
  imageUrl: "",
  imageAlt: "",
  content: "",
  status: "published",
};

export function MakroNewsAdmin() {
  const [password, setPassword] = useState("");
  const [form, setForm] = useState<FormState>(initialForm);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [posts, setPosts] = useState<MakroNewsPost[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageProcessing, setImageProcessing] = useState(false);

  const canPublish = useMemo(
    () =>
      Boolean(
        password &&
          form.title.trim() &&
          form.excerpt.trim() &&
          form.category.trim() &&
          form.content.trim()
      ),
    [form, password]
  );

  async function loadPosts(activePassword = password) {
    if (!activePassword) return;

    const response = await fetch("/api/admin/makro-news", {
      headers: {
        "x-admin-password": activePassword,
      },
    });

    if (!response.ok) {
      setMessage("Kunde inte hämta nyheter. Kontrollera lösenordet.");
      return;
    }

    const data = (await response.json()) as { posts: MakroNewsPost[] };
    setPosts(data.posts);
    setMessage("");
  }

  async function submitPost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canPublish) return;

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (editingPostId) {
      formData.append("id", editingPostId);
    }

    if (image) {
      formData.append("image", image);
    }

    const response = await fetch("/api/admin/makro-news", {
      method: editingPostId ? "PUT" : "POST",
      headers: {
        "x-admin-password": password,
      },
      body: formData,
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      setMessage(data?.error || "Nyheten kunde inte sparas.");
      return;
    }

    const data = (await response.json()) as { post: MakroNewsPost };

    setPosts((currentPosts) => {
      if (editingPostId) {
        return currentPosts.map((post) =>
          post.id === data.post.id ? data.post : post
        );
      }

      return [data.post, ...currentPosts];
    });

    resetForm();
    setMessage(
      editingPostId
        ? "Nyheten är uppdaterad."
        : "Nyheten är publicerad och ligger överst på nyhetssidan."
    );
  }

  function resetForm() {
    setForm({
      ...initialForm,
      publishedAt: new Date().toISOString().slice(0, 16),
    });
    setEditingPostId(null);
    setImage(null);
  }

  function startEditing(post: MakroNewsPost) {
    setEditingPostId(post.id);
    setImage(null);
    setMessage("Redigerar vald nyhet.");
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      publishedAt: toDateTimeLocal(post.publishedAt),
      author: post.author,
      imageUrl: post.imageUrl,
      imageAlt: post.imageAlt,
      content: post.content,
      status: post.status,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deletePost(post: MakroNewsPost) {
    if (!password) return;

    const confirmed = window.confirm(
      `Vill du ta bort nyheten "${post.title}"? Detta kan inte ångras.`
    );

    if (!confirmed) return;

    setLoading(true);
    setMessage("");

    const response = await fetch("/api/admin/makro-news", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ id: post.id }),
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      setMessage(data?.error || "Nyheten kunde inte tas bort.");
      return;
    }

    setPosts((currentPosts) =>
      currentPosts.filter((currentPost) => currentPost.id !== post.id)
    );

    if (editingPostId === post.id) {
      resetForm();
    }

    setMessage("Nyheten är borttagen.");
  }

  async function handleImageChange(file: File | null) {
    if (!file) {
      setImage(null);
      return;
    }

    setImageProcessing(true);
    setMessage("");

    try {
      const preparedImage = await prepareImageForUpload(file);
      setImage(preparedImage);

      if (preparedImage.size !== file.size) {
        setMessage("Bilden komprimerades automatiskt för mobilpublicering.");
      }
    } catch (error) {
      setImage(null);
      setMessage(
        error instanceof Error
          ? error.message
          : "Bilden kunde inte förberedas för uppladdning."
      );
    } finally {
      setImageProcessing(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <form
        onSubmit={submitPost}
        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:p-8"
      >
        <div className="mb-6 flex items-center gap-2 text-emerald-600">
          <Send size={18} />
          <h1 className="text-2xl font-black tracking-tight">
            {editingPostId ? "Redigera nyhet" : "Skapa nyhet"}
          </h1>
        </div>

        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Adminlösenord
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
              <Lock size={16} className="text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={(event) => void loadPosts(event.currentTarget.value)}
                className="h-11 w-full bg-transparent text-sm outline-none"
                placeholder="Lokalt: utdelning-admin"
              />
            </div>
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Titel
            <input
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500"
              placeholder="Ex. Räntor och likviditet styr marknaden"
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-700">
            SEO-ingress
            <textarea
              value={form.excerpt}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  excerpt: event.target.value,
                }))
              }
              rows={3}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm leading-6 outline-none focus:border-emerald-500"
              placeholder="Skriv 1-2 meningar som sammanfattar nyheten."
            />
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Kategori
              <input
                value={form.category}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    category: event.target.value,
                  }))
                }
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Publiceringsdatum
              <input
                type="datetime-local"
                value={form.publishedAt}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    publishedAt: event.target.value,
                  }))
                }
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Status
              <select
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    status:
                      event.target.value === "draft" ? "draft" : "published",
                  }))
                }
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500"
              >
                <option value="published">Publicerad</option>
                <option value="draft">Utkast</option>
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Bild-URL
            <input
              value={form.imageUrl}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  imageUrl: event.target.value,
                }))
              }
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500"
              placeholder="/api/news-image/makro/images/bild.jpg"
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Ladda upp ny bild
            <div className="flex min-h-24 items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
              <ImagePlus className="shrink-0 text-slate-400" size={22} />
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) =>
                  void handleImageChange(
                    event.target.files ? event.target.files[0] : null
                  )
                }
                className="text-sm text-slate-600"
              />
            </div>
            {image && (
              <p className="text-xs font-semibold text-slate-500">
                Vald bild: {image.name} ({formatFileSize(image.size)})
              </p>
            )}
            {imageProcessing && (
              <p className="text-xs font-semibold text-emerald-700">
                Förbereder bild...
              </p>
            )}
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Bildbeskrivning
            <input
              value={form.imageAlt}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  imageAlt: event.target.value,
                }))
              }
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500"
              placeholder="Beskriv bilden kort för Google och skärmläsare."
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Artikeltext
            <textarea
              value={form.content}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  content: event.target.value,
                }))
              }
              rows={12}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm leading-7 outline-none focus:border-emerald-500"
              placeholder="Skriv nyheten. Gör ny paragraf med en tom rad."
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={!canPublish || loading || imageProcessing}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            {loading
              ? editingPostId
                ? "Sparar..."
                : "Publicerar..."
              : editingPostId
                ? "Spara ändringar"
                : "Publicera nyhet"}
            <ArrowRight size={18} />
          </button>

          {editingPostId && (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Avbryt
              <X size={18} />
            </button>
          )}

          {message && (
            <p className="text-sm font-semibold text-slate-600">{message}</p>
          )}
        </div>
      </form>

      <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
        <div className="mb-4 flex items-center gap-2 text-emerald-600">
          <Eye size={18} />
          <h2 className="text-sm font-black uppercase tracking-[0.16em]">
            Senaste poster
          </h2>
        </div>

        <div className="grid gap-3">
          {posts.length === 0 && (
            <p className="text-sm leading-6 text-slate-500">
              Logga in för att se publicerade nyheter.
            </p>
          )}

          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-600">
                    {post.category}
                  </p>
                  <h3 className="mt-2 text-sm font-black leading-5">
                    {post.title}
                  </h3>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-[10px] font-black uppercase ${
                    post.status === "published"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {post.status === "published" ? "Publicerad" : "Utkast"}
                </span>
              </div>

              <p className="mt-2 text-xs font-semibold text-slate-500">
                {new Date(post.publishedAt).toLocaleDateString("sv-SE")}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <Link
                  href={`/nyheter/${post.slug}`}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 text-xs font-black text-slate-700 transition hover:border-emerald-400"
                >
                  Visa
                </Link>
                <button
                  type="button"
                  onClick={() => startEditing(post)}
                  className="inline-flex h-10 items-center justify-center gap-1 rounded-xl border border-slate-200 text-xs font-black text-slate-700 transition hover:border-emerald-400"
                >
                  <Pencil size={14} />
                  Ändra
                </button>
                <button
                  type="button"
                  onClick={() => void deletePost(post)}
                  className="inline-flex h-10 items-center justify-center gap-1 rounded-xl border border-red-100 bg-red-50 text-xs font-black text-red-700 transition hover:border-red-200"
                >
                  <Trash2 size={14} />
                  Ta bort
                </button>
              </div>
            </article>
          ))}
        </div>
      </aside>
    </div>
  );
}

async function prepareImageForUpload(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Filen måste vara en bild.");
  }

  if (file.type === "image/webp" && file.size <= 3_500_000) {
    return file;
  }

  const bitmap = await createImageBitmap(file);
  const maxWidth = 1600;
  const scale = Math.min(1, maxWidth / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Kunde inte läsa bilden.");
  }

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", 0.82);
  });

  if (!blob) {
    throw new Error("Kunde inte komprimera bilden.");
  }

  if (blob.size > 4_000_000) {
    throw new Error(
      "Bilden är fortfarande för stor. Välj en mindre bild eller beskär den i telefonen."
    );
  }

  return new File([blob], `${stripExtension(file.name)}.jpg`, {
    type: "image/jpeg",
  });
}

function toDateTimeLocal(value: string) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60_000);
  return localDate.toISOString().slice(0, 16);
}

function stripExtension(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "") || "nyhetsbild";
}

function formatFileSize(size: number) {
  if (size < 1_000_000) {
    return `${Math.round(size / 1000)} KB`;
  }

  return `${(size / 1_000_000).toFixed(1)} MB`;
}
