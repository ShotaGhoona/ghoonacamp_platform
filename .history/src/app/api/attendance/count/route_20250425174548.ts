import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ユーザーの出席回数を取得
    const userAttendanceCount = await prisma.attendanceLog.count({
      where: {
        user: {
          clerkId: userId,
        },
        status: 'PRESENT',
      },
    });

    // 全ユーザーの総数を取得
    const totalUsers = await prisma.user.count({
      where: {
        status: 'ACTIVE',
      },
    });

    return NextResponse.json({
      count: userAttendanceCount,
      totalUsers,
    });
  } catch (error) {
    console.error('Error fetching attendance count:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 