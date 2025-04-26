import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import { User } from '@prisma/client';

export async function getUser(): Promise<User | null> {
  const auth_result = await auth();
  const userId = auth_result.userId;

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  return user;
}

export async function createUser(userId: string): Promise<User> {
  return await prisma.user.create({
    data: {
      clerkId: userId,
      email: "",
      firstName: null,
      lastName: null,
      first_name: null,
      last_name: null,
      image_url: null,
    },
  });
}