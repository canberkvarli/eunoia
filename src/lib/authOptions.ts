import { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      name: "Google",
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      name: "Github",
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async session({
      session,
      user,
    }: {
      session: DefaultSession;
      user: { id: string };
    }): Promise<DefaultSession> {
      if (session.user) {
        (session.user as { id: string }).id = user.id;
      }
      return session;
    },
  },
};
