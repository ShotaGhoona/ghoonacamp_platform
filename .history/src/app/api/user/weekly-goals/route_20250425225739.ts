import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const { userId } = await auth();
    console.log('API - ClerkのユーザーID:', userId);
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized: ユーザーが認証されていません' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    console.log('API - 取得したユーザー:', user);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found: ユーザーが見つかりません' },
        { status: 404 }
      );
    }

    // 今週の月曜日の0時0分0秒を取得
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    monday.setHours(0, 0, 0, 0);
    console.log('API - 検索対象の月曜日:', monday);

    const weeklyGoals = await prisma.weeklyGoal.findMany({
      where: {
        userId: user.id,
        weekStart: monday,
        isPast: false,
      },
      orderBy: {
        id: 'asc',
      },
    });
    console.log('API - 取得した週間目標:', weeklyGoals);
    console.log('API - 検索条件:', {
      userId: user.id,
      weekStart: monday,
      isPast: false
    });

    return NextResponse.json(weeklyGoals);
  } catch (error) {
    console.error('Error in weekly goals API:', error);
    return NextResponse.json(
      { error: '週間目標の取得中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 