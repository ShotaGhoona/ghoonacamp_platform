import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';

export async function getUser() {
  const { userId } = auth();
  
  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    // 新規ユーザーの場合、基本データのみを保存
    return await prisma.user.create({
      data: {
        clerkId: userId,
        role: 'USER',
        status: 'ACTIVE',
      },
    });
  }

  return user;
} 