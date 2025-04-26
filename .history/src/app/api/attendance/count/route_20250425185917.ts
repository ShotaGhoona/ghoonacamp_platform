import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    console.log('API: Received userId from auth:', userId);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ユーザーの存在確認
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    console.log('API: Found user:', user);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // ユーザーの出席回数を取得
    const userAttendanceCount = await prisma.attendanceLog.count({
      where: {
        userId: user.id,
        status: 'PRESENT',
      },
    });
    console.log('API: Attendance count:', userAttendanceCount);

    // 全ユーザーの総数を取得
    const totalUsers = await prisma.user.count({
      where: {
        status: 'ACTIVE',
      },
    });
    console.log('API: Total users:', totalUsers);

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