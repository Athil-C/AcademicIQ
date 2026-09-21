import { notFound } from "next/navigation";
import { getContentRepository } from "@/lib/data";
import { DynamicContentForm } from "@/components/admin/DynamicContentForm";

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const repository = getContentRepository();
  const item = await repository.getContentById(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="py-2">
      <DynamicContentForm initialData={item} />
    </div>
  );
}
