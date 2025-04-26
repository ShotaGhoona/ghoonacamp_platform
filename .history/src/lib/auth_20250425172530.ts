import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function getUser() {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    // 新規ユーザーの場合、基本データのみを保存
    return await prisma.user.create({
      data: {
        id: userId,
        role: 'USER',
        status: 'ACTIVE',
      },
    });
  }

  return user;
} 