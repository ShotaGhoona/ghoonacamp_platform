import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { JWT } from "next-auth/jwt";

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
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && profile) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: profile.email! },
          });

          if (!existingUser) {
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
    async session({ session, token }) {
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
    async jwt({ token, user }) {
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