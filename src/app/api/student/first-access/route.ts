import { prismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      throw new Error("Dados inválidos passados pelo usuário!");
    }

    const student = await prismaClient.user.findFirst({
      where: {
        email: email,
        role: "user",
        hashedPassword: null,
      },
    });

    if (!student) {
      throw new Error("Email não cadastrado!");
    }
    return NextResponse.json({ ok: true, student }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error?.message },
      { status: 400 },
    );
  }
}
