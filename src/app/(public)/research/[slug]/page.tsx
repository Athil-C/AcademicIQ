import { redirect } from "next/navigation";

export default async function ResearchSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/research-papers/${slug}`);
}
