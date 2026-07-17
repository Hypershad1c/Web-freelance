import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { DeleteBlogPostButton } from "@/components/forms/DeleteBlogPostButton";

export default async function DashboardBlogPage({ params }: { params: { locale: string } }) {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl text-primary">Blog</h1>
        <Link
          href={`/${params.locale}/dashboard/blog/new`}
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-accent hover:text-primary transition-colors"
        >
          + Nouvel article
        </Link>
      </div>
      <div className="rounded-2xl bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-stone-500 text-left">
            <tr>
              <th className="px-4 py-3">Titre (FR)</th>
              <th className="px-4 py-3">Catégorie</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => {
              const t = (p.translations as any)?.fr;
              return (
                <tr key={p.id} className="border-t border-stone-100">
                  <td className="px-4 py-3">{t?.title ?? "—"}</td>
                  <td className="px-4 py-3">{p.category ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-stone-100 px-2 py-1 text-xs">
                      {p.published ? "Publié" : "Brouillon"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link href={`/${params.locale}/dashboard/blog/${p.id}/edit`} className="text-accent hover:underline">
                        Modifier
                      </Link>
                      <DeleteBlogPostButton postId={p.id} title={t?.title ?? p.slug} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {posts.length === 0 && (
          <p className="p-8 text-center text-stone-500">Aucun article pour le moment.</p>
        )}
      </div>
    </div>
  );
}
