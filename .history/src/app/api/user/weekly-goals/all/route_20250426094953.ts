import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 全ユーザーの目標を取得（公開されているもののみ）
    const users = await prisma.user.findMany({
      where: {
        status: 'ACTIVE',
      },
      select: {
        id: true,
        userName: true,
        weeklyGoals: {
          where: {
            isPublic: true,
            week: {
              gte: new Date(new Date().setDate(new Date().getDate() - 7)), // 過去1週間の目標のみ
            },
          },
          select: {
            id: true,
            content: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    // 目標を持つユーザーのみをフィルタリング
    const usersWithGoals = users.filter(user => user.weeklyGoals.length > 0);

    return NextResponse.json(usersWithGoals);
  } catch (error) {
    console.error('Error fetching all member goals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch member goals' },
      { status: 500 }
    );
  }
} 