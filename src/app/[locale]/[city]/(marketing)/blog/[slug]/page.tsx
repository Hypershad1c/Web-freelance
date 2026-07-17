import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getDictionary } from "@/i18n/dictionaries";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; city: string; slug: string };
}): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return {};
  const translations = post.translations as any;
  const t = translations[params.locale]?.title ? translations[params.locale] : translations.fr;
  const url = `${SITE_URL}/${params.locale}/${params.city}/blog/${params.slug}`;
  return {
    title: `${t.title} | Domify Blog`,
    description: t.excerpt?.slice(0, 155),
    alternates: { canonical: url },
    openGraph: { title: t.title, description: t.excerpt?.slice(0, 155), url },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { locale: string; city: string; slug: string };
}) {
  const dict = getDictionary(params.locale);
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post || !post.published) notFound();

  const translations = post.translations as any;
  const localeT = translations[params.locale];
  const t = localeT?.title ? localeT : translations.fr;
  const base = `/${params.locale}/${params.city}`;
  const pageUrl = `${SITE_URL}${base}/blog/${params.slug}`;

  return (
    <article className="mx-auto max-w-3xl px-6 pt-12 pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: t.title,
          description: t.excerpt,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          author: { "@type": "Organization", name: SITE_NAME },
          publisher: { "@type": "Organization", name: SITE_NAME },
          mainEntityOfPage: pageUrl,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: dict.nav.blog, item: `${SITE_URL}${base}/blog` },
            { "@type": "ListItem", position: 2, name: t.title, item: pageUrl },
          ],
        }}
      />

      <Breadcrumbs items={[{ label: dict.nav.blog, href: `${base}/blog` }, { label: t.title }]} />

      {post.category && (
        <p className="text-xs text-accent uppercase tracking-wide mb-3">{post.category}</p>
      )}
      <h1 className="font-heading text-3xl md:text-4xl text-primary mb-6">{t.title}</h1>
      <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed whitespace-pre-wrap">
        {t.body}
      </div>
    </article>
  );
}
