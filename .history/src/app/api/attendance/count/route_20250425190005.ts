import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized: ユーザーが認証されていません' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found: ユーザーが見つかりません' },
        { status: 404 }
      );
    }

    const attendanceCount = await prisma.attendance.count({
      where: {
        userId: user.id,
        status: 'ATTENDED',
      },
    });

    return NextResponse.json({
      totalAttendance: attendanceCount,
    });
  } catch (error) {
    console.error('Error in attendance count API:', error);
    return NextResponse.json(
      { error: '出席回数の取得中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 