import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function requireCity(citySlug: string) {
  const city = await prisma.city.findUnique({ where: { slug: citySlug } });
  if (!city) notFound();
  return city;
}
