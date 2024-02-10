import { prismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const students = await prismaClient.student.findMany();
    return NextResponse.json({ ok: true, students }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error?.message },
      { status: 400 },
    );
  }
}
