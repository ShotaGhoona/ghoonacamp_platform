import { auth } from "@clerk/nextjs";
import { prisma } from "./prisma";
import { User } from '@prisma/client';

export async function getUser(): Promise<User | null> {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return null;
    }

    // 新規ユーザーの場合、Clerkから取得したデータを保存
    return await prisma.user.create({
      data: {
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
        role: 'USER',
        status: 'ACTIVE',
      },
    });
  }

  return user;
}