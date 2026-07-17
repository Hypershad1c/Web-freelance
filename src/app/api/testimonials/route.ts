import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const testimonialSchema = z.object({
  clientName: z.string().min(2),
  quoteFr: z.string().min(10),
  rating: z.number().int().min(1).max(5).default(5),
  isGoogleReview: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const parsed = testimonialSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  const testimonial = await prisma.testimonial.create({
    data: {
      clientName: data.clientName,
      rating: data.rating,
      isGoogleReview: data.isGoogleReview,
      featured: data.featured,
      translations: {
        fr: { quote: data.quoteFr },
        ar: { quote: "" },
        en: { quote: "" },
      },
    },
  });

  return NextResponse.json({ testimonial }, { status: 201 });
}
