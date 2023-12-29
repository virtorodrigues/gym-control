import { prismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { ICreateUser } from "./types";
import { treatments } from "./treatments";
import error from "next/error";

export async function POST(request: NextRequest) {
  const data: ICreateUser = await request.json();

  const { password, repeatPassword, name, cel, document, email, role } = data;

  try {
    await treatments({
      password,
      repeatPassword,
      name,
      cel,
      document,
      email,
      role,
    });
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismaClient.user.create({
      data: {
        email,
        name,
        hashedPassword,
        role,
        company: {
          create: {
            email,
            name,
            document,
            cel,
          },
        },
      },
      include: {
        company: true,
      },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error?.message },
      { status: 400 },
    );
  }
}
