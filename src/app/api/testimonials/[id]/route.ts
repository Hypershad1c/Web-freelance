import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const testimonialUpdateSchema = z.object({
  clientName: z.string().min(2),
  quoteFr: z.string().min(10),
  rating: z.number().int().min(1).max(5),
  isGoogleReview: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const parsed = testimonialUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  const existing = await prisma.testimonial.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  const existingTranslations = existing.translations as any;
  const translations = { ...existingTranslations, fr: { quote: data.quoteFr } };

  await prisma.testimonial.update({
    where: { id: params.id },
    data: {
      clientName: data.clientName,
      rating: data.rating,
      isGoogleReview: data.isGoogleReview,
      featured: data.featured,
      translations,
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const existing = await prisma.testimonial.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  await prisma.testimonial.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
