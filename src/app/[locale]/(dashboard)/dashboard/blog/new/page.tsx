import { BlogCreateForm } from "@/components/forms/BlogCreateForm";

export default function NewBlogPostPage({ params }: { params: { locale: string } }) {
  return (
    <div>
      <h1 className="font-heading text-2xl text-primary mb-6">Nouvel article</h1>
      <BlogCreateForm locale={params.locale} />
    </div>
  );
}
