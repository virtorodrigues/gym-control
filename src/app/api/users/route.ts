import { prismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { ICreateUser } from "./types";
import { treatments } from "./treatments";

export async function POST(request: NextRequest) {
  const data: ICreateUser = await request.json();

  const {
    password,
    repeatPassword,
    isVerifyExistsPassword,
    company,
    student,
    name,
    cel,
    email,
    role,
  } = data;

  try {
    await treatments({
      password,
      repeatPassword,
      isVerifyExistsPassword,
      company,
      student,
      name,
      cel,
      email,
      role,
    });

    let user = null;

    if (role == "admin" && company) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await prismaClient.user.create({
        data: {
          email,
          name,
          hashedPassword,
          role,
          company: {
            create: {
              email,
              name,
              document: company.document,
              cel,
            },
          },
        },
        include: {
          company: true,
        },
      });
    } else {

      const admin = await prismaClient.company.findUnique({
        where: {
          email: student?.companyEmail,
        },
      });

      if (!admin) {
        return NextResponse.json(
          { ok: false, message: "Empresa não encontrada para registrar seu aluno!" },
          { status: 400 },
        );
      }

      user = await prismaClient.user.create({
        data: {
          email,
          name,
          role,
          student: {
            create: {
              email,
              name,
              document: student?.document,
              birthday: student?.birthday,
              cel,
              company: {
                connect: {
                  id: admin?.id
                }
              }
            },
          },
        },
        include: {
          student: true,
        },
      });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error?.message },
      { status: 400 },
    );
  }
}
