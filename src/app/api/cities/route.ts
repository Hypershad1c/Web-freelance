import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const citySchema = z.object({
  name: z.string().min(2),
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
  const parsed = citySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const slug = slugify(parsed.data.name);
  const existing = await prisma.city.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: { formErrors: [`Une ville nommée "${parsed.data.name}" existe déjà.`] } },
      { status: 409 }
    );
  }

  const city = await prisma.city.create({ data: { slug, name: parsed.data.name } });
  return NextResponse.json({ city }, { status: 201 });
}
