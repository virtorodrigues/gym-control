import { prismaClient } from "@/lib/prisma";
import { ICreateUser } from "./types";

export const treatments = async ({
  password,
  repeatPassword,
  name,
  cel,
  email,
  role,
  isVerifyExistsPassword,
  company,
  student,
}: ICreateUser) => {
  const document = company ? company.document : student?.document;

  if (
    (isVerifyExistsPassword && !password) ||
    (isVerifyExistsPassword && !repeatPassword) ||
    !name ||
    !document ||
    !cel ||
    !email ||
    !role
  ) {
    throw new Error("Dados inválidos passados pelo usuário!");
  }

  if (student && !student.birthday) {
    throw new Error("Dados inválidos passados pelo usuário!");
  }

  if (isVerifyExistsPassword && password !== repeatPassword) {
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
