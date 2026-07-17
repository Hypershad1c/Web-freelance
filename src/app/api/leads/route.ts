import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const lead = await prisma.lead.create({
    data: {
      ...parsed.data,
      // syncedToCrm defaults to false — an Odoo sync worker (not built yet,
      // per current scope) would pick these up via `WHERE syncedToCrm = false`.
    },
  });

  return NextResponse.json({ lead }, { status: 201 });
}

export async function GET(req: NextRequest) {
  // Dashboard consumption — add auth check via getServerSession before
  // wiring this into the /dashboard/leads page.
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ leads });
}
