import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && profile) {
        try {
          // ユーザーが存在するか確認
          const existingUser = await prisma.user.findUnique({
            where: { email: profile.email! },
          });

          if (!existingUser) {
            // 新規ユーザーを作成
            await prisma.user.create({
              data: {
                email: profile.email!,
                username: profile.name!,
                fullName: profile.name!,
                googleSub: profile.sub,
                avatarUrl: profile.picture,
                role: "USER",
                status: "ACTIVE",
              },
            });
          } else if (!existingUser.googleSub) {
            // 既存ユーザーのGoogleサブIDを更新
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { googleSub: profile.sub },
            });
          }
        } catch (error) {
          console.error("Error during sign in:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email! },
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            status: true,
            avatarUrl: true,
          },
        });

        if (dbUser) {
          session.user = {
            ...session.user,
            id: dbUser.id,
            username: dbUser.username,
            role: dbUser.role,
            status: dbUser.status,
          };
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 