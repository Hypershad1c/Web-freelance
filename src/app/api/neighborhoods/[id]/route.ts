import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const neighborhoodUpdateSchema = z.object({
  descriptionFr: z.string().min(10),
  lifestyleFr: z.string().optional(),
  avgPriceM2: z.number().int().positive().optional(),
  demandLevel: z.enum(["high", "medium", "low"]).optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const parsed = neighborhoodUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  const existing = await prisma.neighborhood.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  const existingTranslations = existing.translations as any;
  const translations = {
    ...existingTranslations,
    fr: { ...existingTranslations.fr, description: data.descriptionFr, lifestyle: data.lifestyleFr ?? existingTranslations.fr?.lifestyle ?? "" },
  };

  await prisma.neighborhood.update({
    where: { id: params.id },
    data: {
      avgPriceM2: data.avgPriceM2,
      demandLevel: data.demandLevel,
      translations,
    },
  });

  return NextResponse.json({ success: true });
}
