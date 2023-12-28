import { prismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { password, repeatPassword, name, cel, document, email, logo, role } =
    data;

  if (
    !password ||
    !repeatPassword ||
    !name ||
    !cel ||
    !document ||
    !email ||
    !role //||
    //!logo
  ) {
    return NextResponse.json(
      { ok: false, message: "Dados inválidos passados pelo usuário!" },
      { status: 400 },
    );
  }

  const isUserExists = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isUserExists) {
    return NextResponse.json(
      { ok: false, message: "Usuário já existe na base de dados!" },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prismaClient.user.create({
    data: {
      name,
      cel,
      document,
      email,
      hashedPassword,
      role,
    },
  });

  return NextResponse.json(user);
}
