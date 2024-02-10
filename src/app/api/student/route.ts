import { prismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const comapny = await prismaClient.user.findUniqueOrThrow();

  return NextResponse.json(comapny);
}
