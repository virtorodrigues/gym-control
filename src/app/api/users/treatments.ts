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
    throw new Error("Dados inválidos passados pelo usuário!");
  }

  if (password !== repeatPassword) {
    throw new Error("As senhas precisam ser iguais!");
  }

  const isUserExists = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isUserExists) {
    throw new Error("Usuário já existe na base de dados!");
  }
};
