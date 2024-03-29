import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prismaClient } from "@/lib/prisma";
import { NextConfig } from "next";
import { URL_LOGIN_COMPANY, URL_LOGIN_STUDENT } from "@/constants/urls";

export const authOptions: NextConfig = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    CredentialsProvider({
      id: "admin-credentials",
      name: "admin credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password", type: "password", placeholder: "senha" },
      },
      async authorize(credentials, req): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Dados do usuário são necessários");
        }

        const user = await prismaClient.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("Email do usuário não cadastrado!");
        }

        if (user.role !== "admin") {
          throw new Error("O usuário não é um admin!");
        }

        const matchPassword = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword as string,
        );

        if (!matchPassword) {
          throw new Error("Senha incorreta!");
        }

        return user;
      },
    }),
    CredentialsProvider({
      id: "user-credentials",
      name: "user credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password", type: "password", placeholder: "senha" },
      },
      async authorize(credentials, req): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Dados do usuário são necessários");
        }

        const user = await prismaClient.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("Email do usuário não cadastrado!");
        }

        if (user.role !== "user") {
          throw new Error("O usuário não possui permissão!");
        }

        const matchPassword = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword as string,
        );

        if (!matchPassword) {
          throw new Error("Senha incorreta!");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }: any) => {
      if (user) {
        return {
          ...token,
          user: {
            role: user?.role,
            name: user?.name,
            email: user?.email,
          },
        };
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      return {
        ...session,
        user: {
          name: token.user.name,
          email: token.user.email,
          role: token.user.role,
        },
      };
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
  // redirect: false,
  // pages: {
  //   signIn: "admin" ? URL_LOGIN_COMPANY : URL_LOGIN_STUDENT,
  // },
  // },
  //   signIn: URL_LOGIN_COMPANY,
  // },
};
