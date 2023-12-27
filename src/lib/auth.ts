import GitHub from "next-auth/providers/github";

import type { NextAuthConfig } from "next-auth";
import CredentialProvider from "@auth/core/providers/credentials";
import { CredentialsConfig } from "next-auth/providers";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "./prisma";

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GitHub,
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "senha", type: "text" },
      },
      async authorize(credntials, req): Promise<any> {
        const user = { email: "teste@email.com", password: "123123123" };

        return user;
      },
    }) as CredentialsConfig,
  ],
  session: { strategy: "jwt" },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
};
