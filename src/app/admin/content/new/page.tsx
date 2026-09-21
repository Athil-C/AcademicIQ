import { DynamicContentForm } from "@/components/admin/DynamicContentForm";
import { ContentType } from "@/types";

export default async function NewContentPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const initialType = params.type as ContentType | undefined;

  return (
    <div className="py-2">
      <DynamicContentForm initialType={initialType} />
    </div>
  );
}
