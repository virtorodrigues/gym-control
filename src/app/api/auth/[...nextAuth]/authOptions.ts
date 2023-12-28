import NextAuthConfig from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prismaClient } from "@/lib/prisma";
import { debug } from "console";
import { pages } from "next/dist/build/templates/app-page";
import { any } from "zod";

interface IAuthUser {
  email: string;
  name: string;
  role: "admin" | "user";
}

export const authOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    CredentialsProvider({
      name: "credentials",
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
    jwt: (data: any) => {
      console.log(data.user);
      return {
        ...data,
      };
    },
    session: async ({ session, user, token }: any) => {
      return {
        ...session,
        user: {
          role: token.token.user.role,
          email: token.token.user.email,
          name: token.token.user.name,
        },
      };
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
};
