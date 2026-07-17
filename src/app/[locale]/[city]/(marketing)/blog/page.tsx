import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string; city: string } }): Promise<Metadata> {
  const t = getDictionary(params.locale);
  const url = `${SITE_URL}/${params.locale}/${params.city}/blog`;
  return { title: `${t.pages.blogTitle} | Domify`, alternates: { canonical: url }, openGraph: { url } };
}

export default async function BlogIndexPage({ params }: { params: { locale: string; city: string } }) {
  const t = getDictionary(params.locale);
  const posts = await prisma.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } });

  return (
    <div className="mx-auto max-w-5xl px-6 pt-12 pb-24">
      <p className="text-xs tracking-[0.3em] text-accent uppercase mb-3">{t.nav.blog}</p>
      <h1 className="font-heading text-3xl md:text-4xl text-primary mb-10">{t.pages.blogTitle}</h1>

      {posts.length === 0 ? (
        <p className="text-stone-500">{t.pages.noArticles}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => {
            const localeT = (post.translations as any)?.[params.locale];
            const pt = localeT?.title ? localeT : (post.translations as any)?.fr;
            return (
              <Link
                key={post.id}
                href={`/${params.locale}/${params.city}/blog/${post.slug}`}
                className="rounded-2xl border border-stone-100 p-6 hover:border-accent transition-colors"
              >
                {post.category && (
                  <p className="text-xs text-accent uppercase tracking-wide mb-2">{post.category}</p>
                )}
                <h2 className="font-heading text-xl text-primary">{pt?.title}</h2>
                {pt?.excerpt && <p className="mt-2 text-sm text-stone-600">{pt.excerpt}</p>}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
