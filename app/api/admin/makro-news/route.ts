import {
  createMakroNewsPost,
  getMakroNewsPosts,
  hasPersistentMakroNewsStorage,
  saveMakroNewsImage,
  type MakroNewsStatus,
} from "@/lib/makro-news";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const unauthorized = authorize(request);
  if (unauthorized) return unauthorized;

  if (!hasPersistentMakroNewsStorage()) {
    return Response.json(
      {
        error:
          "Live-lagring saknas. Lägg till BLOB_READ_WRITE_TOKEN i Vercel innan du publicerar från mobilen.",
      },
      { status: 503 }
    );
  }

  const posts = await getMakroNewsPosts({ includeDrafts: true });
  return Response.json({ posts });
}

export async function POST(request: Request) {
  const unauthorized = authorize(request);
  if (unauthorized) return unauthorized;

  const formData = await request.formData();
  const title = getFormValue(formData, "title");
  const excerpt = getFormValue(formData, "excerpt");
  const category = getFormValue(formData, "category");
  const publishedAt = getFormValue(formData, "publishedAt");
  const author = getFormValue(formData, "author");
  const imageAlt = getFormValue(formData, "imageAlt");
  const content = getFormValue(formData, "content");
  const status = getFormValue(formData, "status") as MakroNewsStatus;
  let imageUrl = getFormValue(formData, "imageUrl");
  const image = formData.get("image");

  if (!title || !excerpt || !category || !content) {
    return Response.json(
      { error: "Titel, ingress, kategori och innehåll krävs." },
      { status: 400 }
    );
  }

  try {
    if (image instanceof File && image.size > 0) {
      if (image.size > 4_000_000) {
        return Response.json(
          { error: "Bilden är för stor. Max 4 MB efter komprimering." },
          { status: 400 }
        );
      }

      imageUrl = await saveMakroNewsImage(image, title);
    }

    const post = await createMakroNewsPost({
      title,
      excerpt,
      category,
      publishedAt,
      author,
      imageUrl,
      imageAlt,
      content,
      status: status === "draft" ? "draft" : "published",
    });

    return Response.json({ post }, { status: 201 });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Nyheten kunde inte sparas.",
      },
      { status: 500 }
    );
  }
}

function authorize(request: Request) {
  const configuredPassword = process.env.MAKRO_ADMIN_PASSWORD;
  const localPassword =
    process.env.NODE_ENV === "development" ? "utdelning-admin" : "";
  const expectedPassword = configuredPassword || localPassword;
  const providedPassword = request.headers.get("x-admin-password");

  if (!expectedPassword || providedPassword !== expectedPassword) {
    return Response.json({ error: "Obehörig." }, { status: 401 });
  }

  return null;
}

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}
