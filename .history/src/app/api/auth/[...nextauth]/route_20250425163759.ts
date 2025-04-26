import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, Prisma } from "@prisma/client";
import NextAuth, { AuthOptions } from "next-auth";
import type { User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
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
    async signIn({ user, account, profile }: { 
      user: User,
      account: any,
      profile: {
        email?: string,
        name?: string,
        sub?: string,
        picture?: string,
      } | undefined
    }) {
      if (account?.provider === "google" && profile) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: profile.email! },
          });

          if (!existingUser) {
            const userData: Prisma.UserCreateInput = {
              email: profile.email!,
              fullName: profile.name!,
              googleSub: profile.sub,
              avatarUrl: profile.picture,
              username: profile.name!.toLowerCase().replace(/\s+/g, '_'),
              role: "USER",
              status: "ACTIVE",
            };
            await prisma.user.create({ data: userData });
          } else if (!existingUser.googleSub) {
            const updateData: Prisma.UserUpdateInput = {
              googleSub: profile.sub,
            };
            await prisma.user.update({
              where: { id: existingUser.id },
              data: updateData,
            });
          }
        } catch (error) {
          console.error("Error during sign in:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }: { 
      session: any,
      token: JWT
    }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          status: token.status,
          username: token.username,
          fullName: token.fullName,
          googleSub: token.googleSub,
          discordId: token.discordId,
          avatarUrl: token.avatarUrl,
          tagline: token.tagline,
        },
      };
    },
    async jwt({ token, user }: {
      token: JWT,
      user: User | null
    }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
        token.username = user.username;
        token.fullName = user.fullName;
        token.googleSub = user.googleSub;
        token.discordId = user.discordId;
        token.avatarUrl = user.avatarUrl;
        token.tagline = user.tagline;
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