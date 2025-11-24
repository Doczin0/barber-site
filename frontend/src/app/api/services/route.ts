import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const defaults = [
  { name: "Corte Social", description: "Clássico limpo", priceCents: 4000, durationMinutes: 30 },
  { name: "Degradê + Barba", description: "Acabamento com navalha", priceCents: 6500, durationMinutes: 45 },
  { name: "Barba Completa", description: "Toalha quente e hidratação", priceCents: 3000, durationMinutes: 25 },
];

export async function GET() {
  const services = await prisma.service.findMany({ where: { active: true }, orderBy: { name: "asc" } });

  if (services.length === 0) {
    await prisma.service.createMany({ data: defaults });
    return NextResponse.json(defaults);
  }

  return NextResponse.json(services);
}
