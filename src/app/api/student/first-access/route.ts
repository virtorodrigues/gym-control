import bcrypt from "bcrypt";
import { prismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import { IUpdateStudentFirstAccess } from "../types";

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

export async function PUT(request: NextRequest) {
  try {
    const { email, password, repeatPassword }: IUpdateStudentFirstAccess =
      await request.json();

    if (!password || !repeatPassword || !email) {
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
      throw new Error("Usuário não apto para criar senha!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = await prismaClient.user.update({
      data: {
        hashedPassword,
      },
      where: {
        email: email,
      },
    });

    return NextResponse.json(
      { ok: true, student: newStudent },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error?.message },
      { status: 400 },
    );
  }
}
