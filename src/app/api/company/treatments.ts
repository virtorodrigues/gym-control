import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ICreateUser } from "./types";
import bcrypt from "bcrypt";

export const treatments = async ({
  password,
  repeatPassword,
  name,
  cel,
  document,
  email,
  role,
}: ICreateUser) => {
  if (
    !password ||
    !repeatPassword ||
    !name ||
    !cel ||
    !document ||
    !email ||
    !role
  ) {
    return NextResponse.json(
      { ok: false, message: "Dados inválidos passados pelo usuário!" },
      { status: 400 },
    );
  }

  if (password !== repeatPassword) {
    return NextResponse.json(
      { ok: false, message: "As senhas precisam ser iguais!" },
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
};
