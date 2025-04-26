import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      status: string;
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    role: string;
    status: string;
  }
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role,
          status: user.status,
        },
      };
    },
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
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 