import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
