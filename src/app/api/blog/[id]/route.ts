import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const blogUpdateSchema = z.object({
  titleFr: z.string().min(3),
  excerptFr: z.string().min(10),
  bodyFr: z.string().min(50),
  category: z.string().optional(),
  published: z.boolean().default(false),
});

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const parsed = blogUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  const existing = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  const existingTranslations = existing.translations as any;
  const translations = {
    ...existingTranslations,
    fr: { title: data.titleFr, excerpt: data.excerptFr, body: data.bodyFr },
  };

  const wasPublished = existing.published;

  await prisma.blogPost.update({
    where: { id: params.id },
    data: {
      category: data.category,
      published: data.published,
      // Only stamp publishedAt the first time a post goes live — don't
      // bump it on every subsequent edit, which would break chronological
      // ordering on the blog index.
      publishedAt: !wasPublished && data.published ? new Date() : existing.publishedAt,
      translations,
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const existing = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  await prisma.blogPost.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
