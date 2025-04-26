import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account"
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
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
                fullName: profile.name!,
                googleSub: profile.sub,
                avatarUrl: profile.picture,
                username: profile.name!.toLowerCase().replace(/\s+/g, '_'),
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
            role: true,
            status: true,
          },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.username = dbUser.username;
          session.user.role = dbUser.role;
          session.user.status = dbUser.status;
        }
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: User | null }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.status = user.status;
      }
      return token;
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