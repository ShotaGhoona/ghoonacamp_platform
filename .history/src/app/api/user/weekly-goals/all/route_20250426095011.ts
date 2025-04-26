import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 今週の月曜日の0時0分0秒を取得（JSTで計算）
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    monday.setHours(0, 0, 0, 0);

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
            weekStart: {
              gte: monday, // 今週の目標のみ
            },
            isPast: false,
          },
          select: {
            id: true,
            content: true,
            weekStart: true,
          },
          orderBy: {
            weekStart: 'desc',
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