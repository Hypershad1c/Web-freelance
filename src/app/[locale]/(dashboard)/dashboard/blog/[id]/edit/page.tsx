import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogEditForm } from "@/components/forms/BlogEditForm";

export default async function EditBlogPostPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  const t = (post.translations as any)?.fr ?? { title: "", excerpt: "", body: "" };

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary mb-6">Modifier l'article</h1>
      <BlogEditForm
        locale={params.locale}
        postId={post.id}
        initial={{
          titleFr: t.title ?? "",
          excerptFr: t.excerpt ?? "",
          bodyFr: t.body ?? "",
          category: post.category ?? undefined,
          published: post.published,
        }}
      />
    </div>
  );
}
