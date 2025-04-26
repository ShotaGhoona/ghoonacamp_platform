import { prisma } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import { User } from '@prisma/client';

export async function getUser(): Promise<User | null> {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { clerk_id: userId },
  });

  if (!user) {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return null;
    }

    // 新規ユーザーの場合、Clerkから取得したデータを保存
    return await prisma.user.create({
      data: {
        clerk_id: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        first_name: clerkUser.firstName,
        last_name: clerkUser.lastName,
        image_url: clerkUser.imageUrl,
        role: 'USER',
        status: 'ACTIVE',
      },
    });
  }

  return user;
}