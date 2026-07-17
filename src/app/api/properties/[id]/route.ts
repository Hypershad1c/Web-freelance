import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const propertyUpdateSchema = z.object({
  type: z.enum(["APARTMENT", "VILLA", "RIVAD", "PENTHOUSE", "LAND", "OFFICE", "COMMERCIAL"]),
  price: z.number().int().positive(),
  surfaceM2: z.number().int().positive(),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  hasPool: z.boolean().default(false),
  hasParking: z.boolean().default(false),
  hasGarden: z.boolean().default(false),
  neighborhoodId: z.string(),
  titleFr: z.string().min(3),
  descriptionFr: z.string().min(10),
  featured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED", "UNDER_OFFER", "SOLD", "ARCHIVED"]),
  newImages: z.array(z.string().url()).default([]),
  removedImageIds: z.array(z.string()).default([]),
});

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const existing = await prisma.property.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  // Hard delete cascades to PropertyImage via the schema's onDelete: Cascade.
  // Leads referencing this property use Prisma's default behavior for an
  // optional relation (SetNull) — propertyId becomes null on delete rather
  // than the lead being deleted, so lead history survives a listing removal.
  await prisma.property.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: { images: { orderBy: { position: "asc" } } },
  });
  if (!property) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json({ property });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const parsed = propertyUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  const existing = await prisma.property.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  // Preserve AR/EN translations — this form only edits French. Overwriting
  // the whole `translations` object here would silently wipe any Arabic/
  // English content a translator had already filled in.
  const existingTranslations = existing.translations as any;
  const translations = {
    ...existingTranslations,
    fr: { ...existingTranslations.fr, title: data.titleFr, description: data.descriptionFr },
  };

  const currentImageCount = await prisma.propertyImage.count({ where: { propertyId: params.id } });

  await prisma.$transaction([
    ...(data.removedImageIds.length > 0
      ? [prisma.propertyImage.deleteMany({ where: { id: { in: data.removedImageIds } } })]
      : []),
    ...data.newImages.map((url, i) =>
      prisma.propertyImage.create({
        data: { propertyId: params.id, url, position: currentImageCount + i },
      })
    ),
    prisma.property.update({
      where: { id: params.id },
      data: {
        type: data.type,
        status: data.status,
        price: data.price,
        surfaceM2: data.surfaceM2,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        hasPool: data.hasPool,
        hasParking: data.hasParking,
        hasGarden: data.hasGarden,
        neighborhoodId: data.neighborhoodId,
        featured: data.featured,
        translations,
      },
    }),
  ]);

  return NextResponse.json({ success: true });
}
