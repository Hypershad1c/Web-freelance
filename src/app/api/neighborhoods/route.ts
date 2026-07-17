import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const neighborhoodSchema = z.object({
  name: z.string().min(2),
  cityId: z.string(),
  descriptionFr: z.string().min(10),
  lifestyleFr: z.string().optional(),
  avgPriceM2: z.number().int().positive().optional(),
  demandLevel: z.enum(["high", "medium", "low"]).optional(),
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
  const parsed = neighborhoodSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  let slug = slugify(data.name);
  const existing = await prisma.neighborhood.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: { formErrors: [`Un quartier nommé "${data.name}" existe déjà.`] } },
      { status: 409 }
    );
  }

  const neighborhood = await prisma.neighborhood.create({
    data: {
      slug,
      name: data.name,
      cityId: data.cityId,
      avgPriceM2: data.avgPriceM2,
      demandLevel: data.demandLevel,
      // AR/EN left empty on purpose, same rule as everywhere else in this project.
      translations: {
        fr: { description: data.descriptionFr, lifestyle: data.lifestyleFr ?? "", nearbyServices: [] },
        ar: { description: "", lifestyle: "", nearbyServices: [] },
        en: { description: "", lifestyle: "", nearbyServices: [] },
      },
    },
  });

  return NextResponse.json({ neighborhood }, { status: 201 });
}
