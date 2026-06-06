import { get } from "@vercel/blob";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    pathname: string[];
  }>;
};

export async function GET(request: Request, { params }: RouteContext) {
  const { pathname } = await params;
  const blobPath = pathname.join("/");

  if (!blobPath.startsWith("makro/images/")) {
    return new Response("Not found", { status: 404 });
  }

  const ifNoneMatch = request.headers.get("if-none-match") || undefined;

  const blob = await get(blobPath, {
    access: "private",
    ifNoneMatch,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  if (!blob) {
    return new Response("Not found", { status: 404 });
  }

  if (blob.statusCode === 304) {
    return new Response(null, {
      status: 304,
      headers: {
        ETag: blob.blob.etag,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  }

  return new Response(blob.stream, {
    headers: {
      "Content-Type": blob.blob.contentType,
      "Content-Length": String(blob.blob.size),
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      ETag: blob.blob.etag,
    },
  });
}
