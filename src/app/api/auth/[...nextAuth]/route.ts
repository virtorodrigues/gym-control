import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const handler = NextAuth({
  ...authOptions,
});

export { handler as GET, handler as PoST };
