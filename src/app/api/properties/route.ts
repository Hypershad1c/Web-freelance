import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const propertyCreateSchema = z.object({
  reference: z.string().min(3),
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
  images: z.array(z.string().url()).default([]),
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
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = propertyCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

  const existing = await prisma.property.findUnique({ where: { reference: data.reference } });
  if (existing) {
    return NextResponse.json(
      { error: { formErrors: [`La référence ${data.reference} existe déjà.`] } },
      { status: 409 }
    );
  }

  const slug = `${slugify(data.titleFr)}-${data.reference.toLowerCase()}`;

  const property = await prisma.property.create({
    data: {
      slug,
      reference: data.reference,
      type: data.type,
      status: "PUBLISHED",
      price: data.price,
      surfaceM2: data.surfaceM2,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      hasPool: data.hasPool,
      hasParking: data.hasParking,
      hasGarden: data.hasGarden,
      neighborhoodId: data.neighborhoodId,
      featured: data.featured,
      agentId: (session.user as any).id,
      // Only French is filled from this quick-add form. AR/EN translations
      // are left empty on purpose — do NOT auto-fill Darija here, it needs
      // a native speaker's pass, not a placeholder that looks legitimate.
      translations: {
        fr: { title: data.titleFr, description: data.descriptionFr, amenities: [] },
        ar: { title: "", description: "", amenities: [] },
        en: { title: "", description: "", amenities: [] },
      },
      images: {
        create: data.images.map((url, position) => ({ url, position })),
      },
    },
  });

  return NextResponse.json({ property }, { status: 201 });
}

export async function GET() {
  const properties = await prisma.property.findMany({
    include: { neighborhood: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ properties });
}
