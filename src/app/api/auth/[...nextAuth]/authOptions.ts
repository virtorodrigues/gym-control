import NextAuthConfig from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prismaClient } from "@/lib/prisma";
import { debug } from "console";
import { pages } from "next/dist/build/templates/app-page";
import { any } from "zod";
import { NextConfig } from "next";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface IAuthUser {
  email: string;
  name: string;
  role: "admin" | "user";
}

export const authOptions: NextConfig = {
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

        const payload = {
          name: user.name,
          email: user.email,
          role: user.role,
        };
        const secretOrPrivateKey = process.env.SECRET!; //process.env.SECRET;
        const expiresIn = "30 days";
        const tokenEncoded = jwt.sign(payload, secretOrPrivateKey, {
          //  algorithm: "RS256",
          expiresIn: "30 days",
        });

        //  console.log(tokenEncoded);
        const cookiesExpiresInSeconds = 60 * 60 * 24 * 30; // a month

        cookies().set({
          name: "token",
          value: tokenEncoded,
          maxAge: cookiesExpiresInSeconds,
          path: "/",
        });
        // headers: {
        //   'Set-Cookie': `token=${token}; Path=/; max-age=${cookiesExpiresInSeconds}`,
        // },

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
  pages: {
    signIn: "/login",
  },
};
