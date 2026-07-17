import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL as BASE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ["fr", "ar", "en"];
  const staticPaths = ["", "/properties", "/neighborhoods", "/blog", "/about", "/contact", "/valuation"];

  const [cities, properties, neighborhoods, posts] = await Promise.all([
    prisma.city.findMany({ select: { slug: true } }),
    prisma.property.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true, neighborhood: { select: { city: { select: { slug: true } } } } },
    }),
    prisma.neighborhood.findMany({ select: { slug: true, updatedAt: true, city: { select: { slug: true } } } }),
    prisma.blogPost.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({ url: `${BASE_URL}/${locale}/cities`, changeFrequency: "monthly" });

    for (const city of cities) {
      const base = `${BASE_URL}/${locale}/${city.slug}`;
      for (const path of staticPaths) {
        entries.push({ url: `${base}${path}`, changeFrequency: "weekly" });
      }
    }
    for (const p of properties) {
      entries.push({
        url: `${BASE_URL}/${locale}/${p.neighborhood.city.slug}/properties/${p.slug}`,
        lastModified: p.updatedAt,
      });
    }
    for (const n of neighborhoods) {
      entries.push({
        url: `${BASE_URL}/${locale}/${n.city.slug}/neighborhoods/${n.slug}`,
        lastModified: n.updatedAt,
      });
    }
    // Blog posts aren't city-scoped in content, but URLs still carry a
    // city segment for nav consistency — default to the first city.
    // Fine with 1 city; revisit if blog should be per-city with multiple.
    const primaryCitySlug = cities[0]?.slug ?? "casablanca";
    for (const post of posts) {
      entries.push({
        url: `${BASE_URL}/${locale}/${primaryCitySlug}/blog/${post.slug}`,
        lastModified: post.updatedAt,
      });
    }
  }

  return entries;
}
