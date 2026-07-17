import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const blogCreateSchema = z.object({
  titleFr: z.string().min(3),
  excerptFr: z.string().min(10),
  bodyFr: z.string().min(50),
  category: z.string().optional(),
  published: z.boolean().default(false),
});

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const parsed = blogCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  let slug = slugify(data.titleFr);
  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now().toString(36)}`;

  const post = await prisma.blogPost.create({
    data: {
      slug,
      category: data.category,
      published: data.published,
      publishedAt: data.published ? new Date() : null,
      // Same rule as properties: AR/EN left empty, not machine-translated.
      translations: {
        fr: { title: data.titleFr, excerpt: data.excerptFr, body: data.bodyFr },
        ar: { title: "", excerpt: "", body: "" },
        en: { title: "", excerpt: "", body: "" },
      },
    },
  });

  return NextResponse.json({ post }, { status: 201 });
}
