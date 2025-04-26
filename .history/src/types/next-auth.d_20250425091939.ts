import "next-auth";
import { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface User extends PrismaUser {}

  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string;
      username: string;
      role: string;
      status: string;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    role: string;
    status: string;
  }
} 