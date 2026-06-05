import { permanentRedirect } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function LegacyMakroArticlePage({ params }: PageProps) {
  const { slug } = await params;
  permanentRedirect(`/nyheter/${slug}`);
}
